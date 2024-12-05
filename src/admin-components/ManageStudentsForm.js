import React, { useState, useEffect } from "react";

function ManageStudentForm() {
  const [students, setStudents] = useState([
    {
      ucid: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@ucalgary.ca",
      DOB: "10/02/2003",
      academicYear: 2,
      major: "Computer Science",
      minor: "",
      concentration: "",
      coursesTaken: [
        {
          courseCode: "CPSC 217",
          semester: "Fall 23",
          status: "Transfer Credit",
        },
        {
          courseCode: "CPSC 219",
          semester: "Fall 23",
          status: "Completed",
        },
      ],
    },
    {
      ucid: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@ucalgary.ca",
      DOB: "11/03/2002", // mm-dd-yyyy
      academicYear: 3,
      major: "Software Engineering",
      minor: "Mathematics",
      concentration: "Data Science",
      coursesTaken: [
        {
          courseCode: "SENG 300",
          semester: "Winter 24",
          status: "In Progress",
        },
        {
          courseCode: "CPSC 329",
          semester: "Summer 24",
          status: "Waitlist",
        },
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    academicYear: "",
    major: "",
    minor: "",
    concentration: "",
    coursesTaken: [],
    departmentCode: "",
    courseNumber: "",
    semester: "",
    year: "",
    status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [departmentCodes] = useState([
    "CPSC",
    "SENG",
    "FREN",
    "ECON",
    "MATH",
    "PHYS",
  ]);
  const [courseNumbers] = useState(
    Array.from({ length: 700 }, (_, i) => (100 + i).toString())
  );
  const [semesterOptions] = useState(["Fall", "Winter", "Spring", "Summer"]);
  const [statusOptions] = useState([
    "Completed",
    "In Progress",
    "Waitlist",
    "Transfer Credit",
    "Wishlist",
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courseInput, setCourseInput] = useState("");
  const [semesterInput, setSemesterInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const majors = [
    "Computer Science",
    "Software Engineering",
    "Mathematics",
    "Physics",
  ];
  const minors = [
    "Computer Science",
    "Software Engineering",
    "Mathematics",
    "Physics",
  ];
  const concentrations = [
    "Computer Science",
    "Software Engineering",
    "Mathematics",
    "Physics",
  ];

  useEffect(() => {
    if (selectedStudent) {
      const formattedDOB = new Date(selectedStudent.DOB)
        .toISOString()
        .split("T")[0]; // Format as YYYY-MM-DD
      setFormData({
        ...selectedStudent,
        DOB: formattedDOB,
      });
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCourse = () => {
    const { departmentCode, courseNumber, semester, year, status } = formData;

    if (!departmentCode || !courseNumber || !semester || !year || !status) {
      alert("Please fill out all fields for the course.");
      return;
    }

    const newCourse = {
      courseCode: `${departmentCode} ${courseNumber}`,
      semester: `${semester} ${year}`,
      status,
    };

    setFormData((prev) => ({
      ...prev,
      coursesTaken: [...prev.coursesTaken, newCourse],
      departmentCode: "",
      courseNumber: "",
      semester: "",
      year: "",
      status: "",
    }));
  };

  const handleCourseRemove = (courseToRemove) => {
    setFormData({
      ...formData,
      coursesTaken: formData.coursesTaken.filter(
        (course) => course !== courseToRemove
      ),
    });
  };

  const validateForm = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.DOB &&
      formData.academicYear &&
      formData.major &&
      formData.coursesTaken.length > 0
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((student) =>
          student.ucid === selectedStudent.ucid
            ? { ...formData, ucid: student.ucid } // Keep the same UCID
            : student
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,
        { ...formData, ucid: students.length + 1 }, // Incremental UCID
      ]);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      DOB: "",
      academicYear: "",
      major: "",
      minor: "",
      concentration: "",
      coursesTaken: [],
    });
    setSelectedStudent(null);

    const modal = document.getElementById("studentModal");
    if (modal) {
      const bsModal = window.bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  const handleDeleteStudent = () => {
    // Filter out the deleted program
    setStudents(students.filter((student) => student !== selectedStudent));
    setShowConfirmation(false);

    // Close the program details modal using Bootstrap JS
    const studentModal = document.getElementById("studentModal");
    const modalInstance = window.bootstrap.Modal.getInstance(studentModal);
    modalInstance.hide(); // Close the modal
  };

  // const filteredStudents = students.filter(
  //   (student) =>
  //     student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredStudents = students.filter(
    (student) =>
      student.ucid.toString().includes(searchTerm.toLowerCase()) || // Search by UCID
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by first name
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by last name
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) // Search by email
  );

  return (
    <div className="py-5 bg-light">
      <div className="container mt-5">
        {/* Section 1: Form */}
        <div id="section1Form" className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Student</h2>
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
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                // placeholder="dd-mm-yyyy"
                required
              />
              <label htmlFor="DOB">Date of Birth</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Academic Year</option>
                {[1, 2, 3, 4, 5].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label htmlFor="academicYear">Academic Year</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Major</option>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
              <label htmlFor="major">Major</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="minor"
                name="minor"
                value={formData.minor}
                onChange={handleInputChange}
              >
                <option value="">Select Minor</option>
                {minors.map((minor) => (
                  <option key={minor} value={minor}>
                    {minor}
                  </option>
                ))}
              </select>
              <label htmlFor="minor">Minor</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="concentration"
                name="concentration"
                value={formData.concentration}
                onChange={handleInputChange}
              >
                <option value="">Select Concentration</option>
                {concentrations.map((concentration) => (
                  <option key={concentration} value={concentration}>
                    {concentration}
                  </option>
                ))}
              </select>
              <label htmlFor="concentration">Concentration</label>
            </div>

            {/* Courses Section */}
            <div className="mb-3">
              <h5>Courses Taken</h5>
              <div className="d-flex mb-3">
                <select
                  className="form-select me-2"
                  name="departmentCode"
                  value={formData.departmentCode}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {departmentCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  list="courseNumbers"
                  className="form-control me-2"
                  id="courseNumber"
                  name="courseNumber"
                  value={formData.courseNumber}
                  onChange={handleInputChange}
                  placeholder="Course Number"
                />

                <datalist id="courseNumbers">
                  {courseNumbers.map((num) => (
                    <option key={num} value={num} />
                  ))}
                </datalist>
                <select
                  className="form-select me-2"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="form-control me-2"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Year"
                />

                <select
                  className="form-select me-2"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-primary ms-2"
                  type="button"
                  onClick={handleAddCourse}
                >
                  Add Course
                </button>
              </div>

              <div>
                {formData.coursesTaken.map((course, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {course.courseCode} - ({course.semester} - {course.status}){" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      aria-label="Remove"
                      onClick={() => handleCourseRemove(course)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleSaveStudent}
              >
                {selectedStudent ? "Update Student" : "Add Student"}
              </button>
              {selectedStudent && (
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

        {/* Section 2: Students Table */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Students List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by name, email or UCID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>UCID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Academic Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.ucid}>
                  <td>{student.ucid}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.academicYear}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#studentModal"
                      onClick={() => setSelectedStudent(student)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Modal */}
        <div
          className="modal fade"
          id="studentModal"
          tabIndex="-1"
          aria-labelledby="studentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="studentModalLabel">
                  Student Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {selectedStudent && (
                  <>
                    <p>
                      <strong>First Name:</strong> {selectedStudent.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {selectedStudent.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {selectedStudent.DOB}
                    </p>
                    <p>
                      <strong>Academic Year:</strong>{" "}
                      {selectedStudent.academicYear}
                    </p>
                    <p>
                      <strong>Major:</strong> {selectedStudent.major}
                    </p>
                    <p>
                      <strong>Minor:</strong> {selectedStudent.minor}
                    </p>
                    <p>
                      <strong>Concentration:</strong>{" "}
                      {selectedStudent.concentration}
                    </p>
                    <p>
                      <strong>Courses Taken:</strong>
                      <ul>
                        {selectedStudent.coursesTaken.map((course, index) => (
                          <li key={index}>
                            {course.courseCode} - {course.semester} -{" "}
                            {course.status}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </>
                )}
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
                  onClick={handleDeleteStudent}
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

export default ManageStudentForm;
