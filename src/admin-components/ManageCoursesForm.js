import React, { useState, useEffect } from "react";

function ManageCoursesForm() {
  const [courses, setCourses] = useState([
    {
      departmentCode: "CPSC",
      courseNumber: 471,
      courseCode: "CPSC 471",
      courseTitle: "DBMS",
      courseDescription: "Study of computing and programming.",
      keywords: ["DBMS", "Database"],
    },
  ]);

  const [formData, setFormData] = useState({
    departmentCode: "",
    courseNumber: "",
    courseCode: "",
    courseTitle: "",
    description: "",
    keywords: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const departmentCodes = ["CPSC", "SENG", "FREN", "ECON", "MATH", "PHYS"];
  const courseNumbers = Array.from({ length: 700 }, (_, i) => 100 + i); // Generate numbers from 100 to 799
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (formData.departmentCode && formData.courseNumber) {
      setFormData((prev) => ({
        ...prev,
        courseCode: `${formData.departmentCode} ${formData.courseNumber}`,
      }));
    }
  }, [formData.departmentCode, formData.courseNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeywordAdd = () => {
    if (keywordInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const handleKeywordRemove = (keyword) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((kw) => kw !== keyword),
    }));
  };

  const handleSave = () => {
    if (
      !formData.courseCode ||
      !formData.courseTitle ||
      !formData.description
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const existingIndex = courses.findIndex(
      (course) => course.courseCode === formData.courseCode
    );
    if (existingIndex !== -1) {
      const updatedCourses = [...courses];
      updatedCourses[existingIndex] = { ...formData };
      setCourses(updatedCourses);
    } else {
      setCourses([...courses, { ...formData }]);
    }

    clearForm();
  };

  const clearForm = () => {
    setFormData({
      departmentCode: "",
      courseNumber: "",
      courseCode: "",
      courseTitle: "",
      description: "",
      keywords: [],
    });

    const modal = document.getElementById("courseModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCourse = () => {
    setCourses(
      courses.filter((course) => course.courseCode !== formData.courseCode)
    );
    setShowConfirmation(false);
    clearForm();
  };

  return (
    <div className="py-5 bg-light">
      <div className="container mt-5">
        {/* Section 1: Form */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Courses</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="departmentCode"
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department Code</option>
                {departmentCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <label htmlFor="departmentCode">Department Code</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                list="courseNumberList"
                className="form-control"
                id="courseNumber"
                name="courseNumber"
                value={formData.courseNumber}
                onChange={handleInputChange}
                placeholder="Course Number"
                required
              />
              <datalist id="courseNumberList">
                {courseNumbers.map((number) => (
                  <option key={number} value={number} />
                ))}
              </datalist>
              <label htmlFor="courseNumber">Course Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="courseCode"
                name="courseCode"
                value={formData.courseCode}
                readOnly
                placeholder="Course Code"
              />
              <label htmlFor="courseCode">Course Code</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="courseTitle"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                placeholder="Course Title"
                required
              />
              <label htmlFor="courseTitle">Course Title</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                style={{ height: "100px" }}
                required
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>

            <div className="mb-3">
              <label className="form-label">Keywords</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Enter a keyword"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleKeywordAdd}
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {formData.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="badge bg-secondary me-2"
                    onClick={() => handleKeywordRemove(keyword)}
                    style={{ cursor: "pointer" }}
                  >
                    {keyword} &times;
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Save Course
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Table */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Course List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.courseCode}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseTitle}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#courseModal"
                      onClick={() => setFormData(course)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Course Modal */}
        <div
          className="modal fade"
          id="courseModal"
          tabIndex="-1"
          aria-labelledby="courseModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="courseModalLabel">
                  Course Details
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
                  <strong>Course Code:</strong> {formData.courseCode}
                </p>
                <p>
                  <strong>Title:</strong> {formData.courseTitle}
                </p>
                <p>
                  <strong>Description:</strong> {formData.description}
                </p>
                <p>
                  <strong>Keywords:</strong> {formData.keywords.join(", ")}
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
                  onClick={() => clearForm()}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <div
          className="modal fade"
          id="deleteConfirmationModal"
          tabIndex="-1"
          aria-labelledby="deleteConfirmationModalLabel"
          aria-hidden="true"
          style={{ display: showConfirmation ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmation(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this course?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteCourse}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCoursesForm;
