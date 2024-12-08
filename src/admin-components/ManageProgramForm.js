import React, { useState, useEffect } from "react";
import { createProgram, deleteProgram, getAllPrograms, updateProgram } from "../api/programsApi";

function ManageProgramsForm() {
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    programName: "",
    programDescription: "",
    programType: "",
    requiredUnits: "",
    faculty: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const faculties = [
    "Engineering",
    "Arts",
    "Science",
    "Business",
    "Law",
    "Medicine",
  ];
  const programTypes = ["Bachelors", "Masters", "PhD"];
  const requiredUnitsOptions = [30, 60, 120, 150];
  // Add this inside the component, before rendering the table

  useEffect(() => {
    //fetch courses from the backend 
    const fetchPrograms = async () => {
      try {
        const data = await getAllPrograms(); //API function
        setPrograms(data); //update state with courses
        
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchPrograms();
  }, [programs]);

  const formattedPrograms = programs.map((program) => ({
    id: program.programID || "", 
    programName: program.Name || "", //map "Name" to "programName"
    programDescription: program.Description || "", //map "Description" to "programDescription"
    programType: program.Type || "", //map "Type" to "programType"
    requiredUnits: program.RequiredUnits || "", //map "RequiredUnits" to "requiredUnits"
    faculty: program.OfferedByFaculty || "", //map "OfferedByFaculty" to "faculty"
  }));

  const filteredPrograms = formattedPrograms.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    // Reset modal form data when a program is selected
    if (selectedProgram) {
      console.log("Selected Program ID:", selectedProgram.id);
      setFormData(selectedProgram);
    }
  }, [selectedProgram]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    return (
      formData.id &&
      formData.programName &&
      formData.programDescription &&
      formData.programType &&
      formData.requiredUnits &&
      formData.faculty
    );
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      if (selectedProgram) {
        //update an existing program
        console.log("Sending PUT request:", {
          url: `/api/programs/${selectedProgram.id}`,
          data: formData,
        });
        const response = await updateProgram(
          `/api/programs/${selectedProgram.id}`, //backend expects ProgramID as :id
          formData
        );
        console.log("Program updated:", response.data);
  
        //update state with the updated program
        setPrograms((prev) =>
          prev.map((program) =>
            program.id === selectedProgram.id ? response.data : program
          )
        );
      } else {
        //create a new program
        const response = await createProgram("/api/programs", formData);
        console.log("Program created:", response.data);
  
        //add the new program to the state
        setPrograms([...programs, response.data]);
      }
  
      clearForm();
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save the program. Please try again.");
    }
  };

  const clearForm = () => {
    setFormData({
      programID: "",
      programName: "",
      programDescription: "",
      programType: "",
      requiredUnits: "",
      faculty: "",
    });
    setSelectedProgram(null);

    const modal = document.getElementById("programModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal); // Use window.bootstrap
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  const handleDeleteProgram = async () => {
    try {
      //send DELETE request to backend
      console.log("Selected Program ID:", selectedProgram.id);
      await deleteProgram(`/api/programsApi/${selectedProgram.id}`);
  
      //filter out the deleted program in the frontend
      setPrograms(programs.filter((program) => program.id !== selectedProgram.id));
      setShowConfirmation(false);
  
      //close the program details modal using Bootstrap JS
      const programModal = document.getElementById("programModal");
      const modalInstance = window.bootstrap.Modal.getInstance(programModal);
      modalInstance.hide(); //close the modal
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete the program. Please try again.");
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container mt-5">
        {/* Section 1: Form */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Program</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="programName"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                placeholder="Program Name"
                required
              />
              <label htmlFor="programName">Program Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="programDescription"
                name="programDescription"
                value={formData.programDescription}
                onChange={handleInputChange}
                placeholder="Program Description"
                style={{ height: "100px" }}
                required
              />
              <label htmlFor="programDescription">Program Description</label>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="programType"
                    name="programType"
                    value={formData.programType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    {programTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="programType">Program Type</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    {faculties.map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="faculty">Faculty</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="requiredUnits"
                    name="requiredUnits"
                    value={formData.requiredUnits}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    {requiredUnitsOptions.map((units) => (
                      <option key={units} value={units}>
                        {units}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="requiredUnits">Required Units</label>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedProgram ? "Update Program" : "Save Program"}
              </button>
              {selectedProgram && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Section 2: Table */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Program List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search programs by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Program Name</th>
                <th>Program Type</th>
                <th>Faculty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program) => (
                <tr key={program.programID}>
                  <td>{program.programName}</td>
                  <td>{program.programType}</td>
                  <td>{program.faculty}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#programModal"
                      onClick={() => setSelectedProgram(program)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Program Modal */}
        <div
          className="modal fade"
          id="programModal"
          tabIndex="-1"
          aria-labelledby="programModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="programModalLabel">
                  Program Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Program Name:</strong> {formData.programName}
                </p>
                <p>
                  <strong>Description:</strong> {formData.programDescription}
                </p>
                <p>
                  <strong>Program Type:</strong> {formData.programType}
                </p>
                <p>
                  <strong>Faculty:</strong> {formData.faculty}
                </p>
                <p>
                  <strong>Required Units:</strong> {formData.requiredUnits}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowConfirmation(true)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {}}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <div
          className={`modal fade ${showConfirmation ? "show" : ""}`}
          id="confirmationModal"
          tabIndex="-1"
          aria-labelledby="confirmationModalLabel"
          aria-hidden="true"
          style={{ display: showConfirmation ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmationModalLabel">
                  Are you sure?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  This action cannot be undone. Are you sure you want to delete
                  this program?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteProgram}
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProgramsForm;
