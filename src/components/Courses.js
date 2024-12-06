import React, { useState } from "react";

export default function Courses() {
  // State for dropdown selection
  const [subjectCode, setSubjectCode] = useState("CPSC");
  const [courseLevel, setCourseLevel] = useState("");   
  const [showTaken, setShowTaken] = useState(false);

  // Sample course data
  const courses = [
    {
      code: "CPSC 231",
      title: "Introduction to Computer Science for Computer Science Majors I",
      description: "Introduction to problem solving, the analysis and design of small-scale computational systems, and implementation using a procedural programming language. For computer science majors.",
      units: 3,
      taken: true,
    },
    {
      code: "CPSC 233",
      title: "Introduction to Computer Science for Computer Science Majors II",
      description: "Continuation of Introduction to Computer Science for Computer Science Majors I. Emphasis on object-oriented analysis and design of small-scale computational systems and implementation using an object-oriented language. Issues of design, modularization, and programming style will be emphasized.\n\nPrerequisite(s): Computer Science 231 and admission to Computer Science, Bioinformatics, or Natural Science with a primary concentration in Computer Science.\n\nAntirequisite(s): Credit for Computer Science 233 and any of 219, 235, Electrical Engineering 497 or Computer Engineering 493 will not be allowed.",
      units: 3,
      taken: false,
    },
    {
      code: "CPSC 251",
      title: "Theoretical Foundations of Computer Science I",
      description: "Proof techniques. Recursion and iteration. Specification of algorithmic problems and fundamental proof techniques in Computer Science. Discrete structures such as graphs, trees, strings, functions, and their computer representation. Counting, permutations. Random events. Conditional events. Applications in Computer Science.",
      units: 3,
      taken: false,
    },
  ];

  // Filter courses based on subject code and course level
  const filteredCourses = courses.filter((course) => {
    if (showTaken && course.taken) return false;
    if (subjectCode !== "CPSC" && !course.code.startsWith(subjectCode)) return false;
    if (courseLevel && course.code.split(' ')[1] !== courseLevel) return false;
    return true;
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // other logic here
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            {/* Dropdown for subject code */}
            <div className="dropdown mb-3">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {subjectCode}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  className={`dropdown-item ${subjectCode === "CPSC" ? "disabled" : ""}`}
                  href="#"
                  onClick={() => setSubjectCode("CPSC")}
                >
                  CPSC
                </a>
              </div>
            </div>

            {/* Form for course level and show taken */}
            <form role="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="courseLevel">Course Level</label>
                <input
                  type="number"
                  className="form-control"
                  id="courseLevel"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showTaken}
                    onChange={(e) => setShowTaken(e.target.checked)}
                  />
                  Do not show taken
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-10">
            {/* List of courses */}
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action active">
                Home
              </a>
              {filteredCourses.map((course) => (
                <div key={course.code} className="list-group-item">
                  <h4 className="list-group-item-heading">
                    {course.code}
                    <span className="btn btn-light">{course.title}</span>
                  </h4>
                  <p className="list-group-item-text">
                    {course.description}
                    <br />
                    <br />
                    <span className="">{course.units} Units</span>
                  </p>
                </div>
              ))}
              <a href="#" className="list-group-item list-group-item-action active justify-content-between">
                Show more
              </a>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}