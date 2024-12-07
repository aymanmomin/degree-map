import React, { useState, useEffect } from "react";
import { getAllInstructors } from "../api/instructorsApi";

function ManageInstructorForm() {
  const [instructors, setInstructors] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    teaches: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [courseInput, setCourseInput] = useState("");

  useEffect(() => {
    //fetch instructors from the backend 
    const fetchInstructors = async () => {
      try {
        const data = await getAllInstructors(); //  API function
        console.log("Fetched instructors:", data);
        setInstructors(data); //update state with courses
        console.log("instructors:", instructors);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchInstructors();
  }, [instructors]);

  useEffect(() => {
    if (selectedInstructor) {
      setFormData(selectedInstructor);
    }
  }, [selectedInstructor]);

  const formattedInstructors = instructors.map((instructor) => ({
    id: instructor.EmployeeID || "", //map EmployeeID to id
    firstName: instructor.GivenName || "", //map GivenName to firstName
    lastName: instructor.LastName || "", //map LastName to lastName
    email: instructor.Email || "", //map Email to email
    teaches: [], //leave  teaches empty for now
  }));
  console.log("formatted instructors:", formattedInstructors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseAdd = () => {
    if (courseInput && !formData.teaches.includes(courseInput)) {
      setFormData({
        ...formData,
        teaches: [...formData.teaches, courseInput],
      });
      setCourseInput("");
    }
  };

  const handleCourseRemove = (courseToRemove) => {
    setFormData({
      ...formData,
      teaches: formData.teaches.filter((course) => course !== courseToRemove),
    });
  };

  const handleSave = () => {
    const { firstName, lastName, email, teaches } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName || !lastName || !email || !emailRegex.test(email)) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    if (selectedInstructor) {
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.id === selectedInstructor.id
            ? { ...formData, id: instructor.id }
            : instructor
        )
      );
    } else {
      setInstructors([
        ...instructors,
        { ...formData, id: Date.now(), email, teaches },
      ]);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      teaches: [],
    });
    setSelectedInstructor(null);
    const modal = document.getElementById("instructorModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  const handleDelete = () => {
    if (selectedInstructor) {
      setInstructors((prev) =>
        prev.filter((instructor) => instructor.id !== selectedInstructor.id)
      );
      clearForm();
    }
  };

  const filteredInstructors = formattedInstructors.filter(
    (instructor) =>
      instructor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = () => {
    const modal = document.getElementById("instructorModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
    document
      .getElementById("section1Form")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="py-5 bg-light">
      <div className="container mt-5">
        {/* Section 1: Form */}
        <div id="section1Form" className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Instructor</h2>
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
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="mb-3">
              <label className="form-label">Teaches</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={courseInput}
                  onChange={(e) => setCourseInput(e.target.value)}
                  placeholder="Add a course"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCourseAdd}
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {formData.teaches.map((course, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {course}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Remove"
                      onClick={() => handleCourseRemove(course)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedInstructor ? "Update Instructor" : "Save Instructor"}
              </button>
              {selectedInstructor && (
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
          <h3 className="text-primary">Instructors List</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search instructors by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>UCEID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td>{instructor.id}</td>
                  <td>{instructor.firstName}</td>
                  <td>{instructor.lastName}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#instructorModal"
                      onClick={() => setSelectedInstructor(instructor)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructor Modal */}
        <div
          className="modal fade"
          id="instructorModal"
          tabIndex="-1"
          aria-labelledby="instructorModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="instructorModalLabel">
                  Instructor Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {selectedInstructor && (
                  <>
                    <p>
                      <strong>UCEID:</strong> {selectedInstructor.id}
                    </p>
                    <p>
                      <strong>First Name:</strong>{" "}
                      {selectedInstructor.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {selectedInstructor.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedInstructor.email}
                    </p>
                    <p>
                      <strong>Teaches:</strong>
                    </p>
                    <ul>
                      {selectedInstructor.teaches.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete Instructor
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  Edit Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageInstructorForm;
