import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component

// Sample courses data structure
const sampleCourses = {
  "Year 1": [
    { code: "CPSC 231", title: "Introduction to Computer Science for Computer Science Majors I" },
    { code: "CPSC 233", title: "Introduction to Computer Science for Computer Science Majors II" },
    { code: "CPSC 251", title: "Theoretical Foundations of Computer Science I" },
    { code: "MATH 211", title: "Linear Methods I" },
    { code: "MATH 249", title: "Introductory Calculus" },
    { code: "PHIL 279", title: "Logic I" },
  ],
  "Year 2": [
    { code: "CPSC 331", title: "Data Structures, Algorithms, and Their Analysis" },
    { code: "CPSC 351", title: "Theoretical Foundations of Computer Science II" },
    { code: "CPSC 355", title: "Computing Machinery I" },
    { code: "SENG 300", title: "Introduction to Software Engineering" },
    { code: "PHIL 314", title: "Information Technology Ethics" },
  ],
  "Year 3": [
    { code: "CPSC 413", title: "Design and Analysis of Algorithms I" },
    { code: "CPSC 449", title: "Programming Paradigms" },
    { code: "CPSC 457", title: "Principles of Operating Systems" },
  ],
  "Year 4": [
    { code: "CPSC 461", title: "Information Structures" },
    { code: "CPSC 471", title: "Data Base Management Systems" },
    { code: "CPSC 481", title: "Human-Computer Interaction I" },
  ],
};

export default function ProgramGuide({ addToCurrentSemester }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setModalShow(true);
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Section 1: Year-wise Course Details */}
        <div className="row">
          {Object.keys(sampleCourses).map((year) => (
            <div className="col-md-3" key={year}>
              <div className="card text-center">
                <h5 className="card-header">{year}</h5>
                <div className="card-body">
                  <ul className="list-group">
                    {sampleCourses[year].map((course) => (
                      <li
                        key={course.code}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {course.code}
                        <button
                          className="badge bg-primary"
                          onClick={() => handleCourseClick(course)}
                        >
                          Options
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">Note: Students may complete CPSC 217 and 219 in place of CPSC 231 and 233, but it is not recommended for degree progression</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Information Hub */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>Information Hub:</h2>
            <p>
              • The program must contain at least 120 units with a maximum of 48 units at the Junior Level (200 level courses). <br />
              • A Non-Major Field Option is any option NOT in the field of Computer Science. <br />
              • A Non-Science Option is any course from faculties other than the Faculty of Science, excluding courses in Table 1. <br />
              • An Open Option is any course offered by any Faculty. <br />
              • A link to courses/course descriptions is available in the Academic Calendar.
            </p>
            <p>
              <a className="btn btn-primary" href="https://science.ucalgary.ca/sites/default/files/teams/1/USC/program-guides/F24-CPSC-Guide.pdf">
                More details »
              </a>
            </p>
          </div>
        </div>

        {/* Modal */}
        <Modal
          show={modalShow}
          handleClose={() => setModalShow(false)}
          course={selectedCourse}
          addToCurrentSemester={() => {
            addToCurrentSemester(selectedCourse);
            setModalShow(false);
          }}
        />
      </div>
    </div>
  );
}