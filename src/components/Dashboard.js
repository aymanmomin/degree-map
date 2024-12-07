import React, { useState, useEffect } from "react";
import { getAllCourses } from "../api/coursesApi";

export default function Dashboard() {

  
  //state to manage the active course details
  const [activeCourse, setActiveCourse] = useState(null); //no default course
  const [courses, setCourses] = useState([]); //database courses 

  useEffect(() => {
    //fetch courses from the backend 
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses(); //  API function
        console.log("Fetched courses:", data);
        setCourses(data); //update state with courses
        console.log("Courses:", courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, [courses]);

  // Function to handle course card click
  const handleCourseClick = (course) => {
    setActiveCourse(course);
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        {/* Section 1: Summary Cards */}
        <div className="row">
          <div className="col-md-3">
            <div className="card text-white bg-primary text-center">
              <h5 className="card-header">0%</h5>
              <div className="card-body">
                <p className="card-text">Degree completion</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-primary text-center">
              <h5 className="card-header">1</h5>
              <div className="card-body">
                <p className="card-text">Year</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-primary text-center">
              <h5 className="card-header">12</h5>
              <div className="card-body">
                <p className="card-text">Credits</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-primary text-center">
              <h5 className="card-header">4</h5>
              <div className="card-body">
                <p className="card-text">Courses completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Course List and Details */}
        <div className="row mt-4">
          <div className="col-md-2">
            <div id="card-738138">
              {courses.map((course) => (
              <div className="card" key={course.courseCode}>
                <div className="card-header">
                  <a
                    className={`card-link ${activeCourse === course.courseCode ? "" : "collapsed"}`}
                    data-toggle="collapse"
                    data-parent="#card-738138"
                    href={`#card-element-${course.courseCode}`}
                    onClick={() => handleCourseClick(course.courseCode)}
                  >
                    {course.Title}
                  </a>
                </div>
                  <div
                  id={`card-element-${course.courseCode}`}
                  className={`collapse ${activeCourse === course.courseCode ? "show" : ""}`}
                >
                  <div className="card-body">
                    {course.DepartmentCode}
                  </div>
                </div>
              </div>
              ))}
              {/* <div className="card">
                <div className="card-header">
                  <a
                    className={`card-link ${activeCourse === "CPSC 233" ? "" : "collapsed"}`}
                    data-toggle="collapse"
                    data-parent="#card-738138"
                    href="#card-element-592565"
                    onClick={() => handleCourseClick("CPSC 233")}
                  >
                    CPSC 233
                  </a>
                </div>
                <div
                  id="card-element-592565"
                  className={`collapse ${activeCourse === "CPSC 233" ? "show" : ""}`}
                >
                  <div className="card-body">
                    Year 1...
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    className={`card-link ${activeCourse === "CPSC 251" ? "" : "collapsed"}`}
                    data-toggle="collapse"
                    data-parent="#card-738138"
                    href="#card-element-251"
                    onClick={() => handleCourseClick("CPSC 251")}
                  >
                    CPSC 251
                  </a>
                </div>
                <div
                  id="card-element-251"
                  className={`collapse ${activeCourse === "CPSC 251" ? "show" : ""}`}
                >
                  <div className="card-body">
                    Year 1...
                  </div>
                </div>
              </div>*/}
            </div>
          </div> 
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4">
                <h2>CPSC 231</h2>
                <p>
                  Introduction to problem solving, the analysis and design of small-scale computational systems, and implementation using a procedural programming language. For computer science majors.
                </p>
                <p>
                  <a className="btn btn-primary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <h2>CPSC 233</h2>
                <p>
                  Continuation of Introduction to Computer Science for Computer Science Majors I. Emphasis on object-oriented analysis and design of small-scale computational systems and implementation using an object-oriented language. Issues of design, modularization, and programming style will be emphasized.
                </p>
                <p>
                  <a className="btn btn-primary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <h2>CPSC 251</h2>
                <p>
                  Proof techniques. Recursion and iteration. Specification of algorithmic problems and fundamental proof techniques in Computer Science. Discrete structures such as graphs, trees, strings, functions, and their computer representation. Counting, permutations. Random events. Conditional events. Applications in Computer Science.
                </p>
                <p>
                  <a className="btn btn-primary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}