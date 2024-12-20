import React, { useState, useEffect } from "react";

function ManageCoursesForm() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      departmentCode: "CPSC",
      courseNumber: "471",
      courseCode: "CPSC 471",
      courseTitle: "DBMS",
      courseDescription: "Database Management Systems",
      keywords: ["DBMS", "Database"],
    },
    {
      id: 2,
      departmentCode: "CPSC",
      courseNumber: "481",
      courseCode: "CPSC 481",
      courseTitle: "HCI",
      courseDescription: "Human-Computer Interaction",
      keywords: ["HCI", "UI/UX", "Human Computer"],
    },
  ]);

  const [formData, setFormData] = useState({
    departmentCode: "",
    courseNumber: "",
    courseCode: "",
    courseTitle: "",
    courseDescription: "",
    keywords: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [keywordInput, setKeywordInput] = useState("");

  const departmentCodes = ["CPSC", "SENG", "FREN", "ECON", "MATH", "PHYS"];
  const courseNumbers = Array.from({ length: 700 }, (_, i) =>
    (100 + i).toString()
  );

  useEffect(() => {
    if (selectedCourse) {
      setFormData(selectedCourse);
    }
  }, [selectedCourse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeywordAdd = () => {
    if (keywordInput && !formData.keywords.includes(keywordInput)) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput],
      });
      setKeywordInput("");
    }
  };

  const handleKeywordRemove = (keywordToRemove) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((kw) => kw !== keywordToRemove),
    });
  };

  const handleSave = () => {
    const courseNumberInt = parseInt(formData.courseNumber, 10);
    if (
      !formData.departmentCode ||
      !formData.courseTitle ||
      !formData.courseDescription ||
      isNaN(courseNumberInt) ||
      courseNumberInt < 100 ||
      courseNumberInt > 799
    ) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    const courseCode = `${formData.departmentCode} ${formData.courseNumber}`;
    const updatedFormData = { ...formData, courseCode };

    if (selectedCourse) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourse.id
            ? { ...updatedFormData, id: course.id }
            : course
        )
      );
    } else {
      setCourses([...courses, { ...updatedFormData, id: Date.now() }]);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      departmentCode: "",
      courseNumber: "",
      courseCode: "",
      courseTitle: "",
      courseDescription: "",
      keywords: [],
    });
    setSelectedCourse(null);
    const modal = document.getElementById("courseModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  const handleDelete = () => {
    if (selectedCourse) {
      setCourses((prev) =>
        prev.filter((course) => course.id !== selectedCourse.id)
      );
      clearForm();
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = () => {
    const modal = document.getElementById("courseModal");
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

  const handleCourseNumberChange = (e) => {
    const value = e.target.value;
    const isValid = /^[1-7][0-9]{2}$/.test(value) || value === "";
    if (isValid) {
      setFormData({ ...formData, courseNumber: value });
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container mt-5">
        {/* Section 1: Form */}
        <div id="section1Form" className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Course</h2>
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
                <option value="">Select</option>
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
                type="number"
                list="courseNumbers"
                className="form-control"
                id="courseNumber"
                name="courseNumber"
                value={formData.courseNumber}
                onChange={handleInputChange}
                placeholder="Course Number"
                required
              />

              <datalist id="courseNumbers">
                {courseNumbers.map((num) => (
                  <option key={num} value={num} />
                ))}
              </datalist>
              <label htmlFor="courseNumber">Course Number</label>
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
                id="courseDescription"
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleInputChange}
                placeholder="Course Description"
                required
              ></textarea>
              <label htmlFor="courseDescription">Course Description</label>
            </div>
            <div className="mb-3">
              <label className="form-label">Keywords</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Add a keyword"
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
                {formData.keywords.map((keyword, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {keyword}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Remove"
                      onClick={() => handleKeywordRemove(keyword)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            {/* <button type="submit" className="btn btn-primary">
              {selectedCourse ? "Update Course" : "Save Course"}
            </button> */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedCourse ? "Update Course" : "Save Course"}
              </button>
              {selectedCourse && (
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
          <h3 className="text-primary">Courses List</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search courses by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseTitle}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#courseModal"
                      onClick={() => setSelectedCourse(course)}
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
                {selectedCourse && (
                  <>
                    <p>
                      <strong>Course Code:</strong> {selectedCourse.courseCode}
                    </p>
                    <p>
                      <strong>Title:</strong> {selectedCourse.courseTitle}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedCourse.courseDescription}
                    </p>
                    <p>
                      <strong>Keywords:</strong>{" "}
                      {selectedCourse.keywords.join(", ")}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  Edit
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
