import React, { useState, useEffect } from "react";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../api/coursesApi";
import {getAllDepartments} from "../api/departmentsApi";

function ManageCoursesForm() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
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

  const departmentCodes = [
    "CPSC",
    "SENG",
    "DATA",
    "FREN",
    "ECON",
    "MATH",
    "PHYS",
  ];
  const courseNumbers = Array.from({ length: 700 }, (_, i) =>
    (100 + i).toString()
  );

  const [message, setMessage] = useState(null);

const showMessage = (text, type = "success") => {
  setMessage({ text, type });
  setTimeout(() => setMessage(null), 3000); // Auto-hide after 3 seconds
};

const fetchDepartments = async () => {
  try {
    const data = await getAllDepartments(); // API function
    setDepartments(data);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses(); // API function
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        departmentCode: selectedCourse.departmentCode || "",
        courseNumber: selectedCourse.courseNumber || "",
        courseCode: selectedCourse.courseCode || "",
        courseTitle: selectedCourse.courseTitle || "",
        courseDescription: selectedCourse.courseDescription || "",
        keywords: selectedCourse.keywords || [],
      });
    }
  }, [selectedCourse]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "departmentCode" || name === "courseNumber") {
        updatedFormData.courseCode = `${updatedFormData.departmentCode}${
          updatedFormData.courseNumber
        }`;
      }
      console.log(updateCourse.courseCode);

      return updatedFormData;
    });
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

  const handleSave = async () => {
    console.log(formData);
    if (
      !formData.departmentCode ||
      !formData.courseTitle ||
      !formData.courseDescription ||
      !/^[1-7][0-9]{2}$/.test(formData.courseNumber)
    ) {
    console.log(formData);

      alert("Please complete all fields correctly.");
      return;
    }
  
    try {
      let response;
      if (selectedCourse) {
        response = await updateCourse(selectedCourse.courseCode, {
          ...formData,
          keywords: formData.keywords,  // Ensure keywords are included
        });
      } else {
        response = await createCourse({
          ...formData,
          keywords: formData.keywords,  // Include keywords during creation
        });
      }
  
      // Handle valid response
      if (response) {
        
        console.log(response);
        console.log(response.data);
        await fetchCourses(); // Refresh data
        clearForm();
        alert(selectedCourse ? "Course updated successfully!" : "Course added successfully!");
        showMessage(selectedCourse ? "Course updated successfully!" : "Course added successfully!");
      } else {
        throw new Error("Invalid response structure.");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course:", error);
      showMessage("Failed to save the course. Please try again.", "danger");
    }
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

  const handleDelete = async () => {
    if (!selectedCourse) return;

    // Confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this course?");
  if (!confirmDelete) return;

    try {
      await deleteCourse(`${selectedCourse.courseCode}`);
      console.log("Course deleted successfully.");
      await fetchCourses(); // Refresh data
    clearForm();
    alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course. Please try again.");
    }
  };

  const filteredCourses = courses
  .filter(
    (course) =>
      course && 
      course.courseTitle && 
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
      {message && (
  <div className={`alert alert-${message.type}`} role="alert">
    {message.text}
  </div>
)}

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
                      {/* {selectedCourse.keywords.join(", ")} */}
                      {Array.isArray(selectedCourse.keywords) 
                      ? selectedCourse.keywords.join(', ') 
                        : typeof selectedCourse.keywords === 'string'
                        ? selectedCourse.keywords
                        : 'No keywords available'}
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
