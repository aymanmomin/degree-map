import React, { useState } from "react";

function ManageProgramForm() {
  const [formData, setFormData] = useState({
    programName: "",
    programDescription: "",
    programType: "",
    requiredUnits: "",
    faculty: "",
  });

  const [errors, setErrors] = useState({});

  const faculties = [
    "Engineering",
    "Arts",
    "Science",
    "Business",
    "Law",
    "Medicine",
    "Veterinary Medicine",
    "Architecture, Planning and Landscape",
    "Kinesiology",
    "Nursing",
    "Education",
    "Social Work",
    "Public Policy",
    "Graduate Studies",
  ];
  const programTypes = [
    "Bachelors",
    "Masters",
    "PhD",
    "High School",
    "Open Studies",
    "Exchange",
  ];
  const requiredUnitsOptions = [30, 60, 120, 150];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.programName)
      newErrors.programName = "Program Name is required.";
    if (!formData.programDescription)
      newErrors.programDescription = "Program Description is required.";
    if (!formData.programType)
      newErrors.programType = "Program Type is required.";
    if (!formData.requiredUnits)
      newErrors.requiredUnits = "Required Units is required.";
    if (!formData.faculty) newErrors.faculty = "Faculty is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      alert("Program saved successfully!");
      setFormData({
        programName: "",
        programDescription: "",
        programType: "",
        requiredUnits: "",
        faculty: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">Manage Program</h2>
          </div>
          <form className="mt-3" onSubmit={handleSubmit}>
            {/* Program Name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errors.programName ? "is-invalid" : ""
                }`}
                id="programName"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                placeholder="Program Name"
              />
              <label htmlFor="programName">Program Name</label>
              {errors.programName && (
                <div className="invalid-feedback">{errors.programName}</div>
              )}
            </div>

            {/* Program Description */}
            <div className="form-floating mb-3">
              <textarea
                className={`form-control ${
                  errors.programDescription ? "is-invalid" : ""
                }`}
                id="programDescription"
                name="programDescription"
                value={formData.programDescription}
                onChange={handleChange}
                placeholder="Program Description"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="programDescription">Program Description</label>
              {errors.programDescription && (
                <div className="invalid-feedback">
                  {errors.programDescription}
                </div>
              )}
            </div>

            {/* Program Type, Faculty, Required Units (Grouped in One Row) */}
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className={`form-select ${
                      errors.programType ? "is-invalid" : ""
                    }`}
                    id="programType"
                    name="programType"
                    value={formData.programType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {programTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="programType">Program Type</label>
                  {errors.programType && (
                    <div className="invalid-feedback">{errors.programType}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className={`form-select ${
                      errors.faculty ? "is-invalid" : ""
                    }`}
                    id="faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {faculties.map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="faculty">Faculty</label>
                  {errors.faculty && (
                    <div className="invalid-feedback">{errors.faculty}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className={`form-select ${
                      errors.requiredUnits ? "is-invalid" : ""
                    }`}
                    id="requiredUnits"
                    name="requiredUnits"
                    value={formData.requiredUnits}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {requiredUnitsOptions.map((units) => (
                      <option key={units} value={units}>
                        {units}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="requiredUnits">Required Units</label>
                  {errors.requiredUnits && (
                    <div className="invalid-feedback">
                      {errors.requiredUnits}
                    </div>
                  )}
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Program
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageProgramForm;
