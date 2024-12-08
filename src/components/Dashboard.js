import React, { useState } from "react";
import SummaryCard from "./SummaryCard";
import CourseList from "./CourseList";
import CourseDetail from "./CourseDetail";

const Dashboard = () => {
  // State to manage the active course details
  const [activeCourse, setActiveCourse] = useState("CPSC 233");

  // Sample course data
  const courses = [
    {
      code: "CPSC 231",
      title: "Introduction to Computer Science for Computer Science Majors I",
      description: "Introduction to problem solving, the analysis and design of small-scale computational systems, and implementation using a procedural programming language. For computer science majors.",
      units: 3,
      taken: false,
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

  // Function to handle course card click
  const handleCourseClick = (course) => {
    setActiveCourse(course);
  };

  // Find the active course details
  const activeCourseDetails = courses.find((course) => course.code === activeCourse);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        {/* Section 1: Summary Cards */}
        <div className="row">
          <SummaryCard title="Degree completion" value="0%" />
          <SummaryCard title="Year" value="1" />
          <SummaryCard title="Credits" value="12" />
          <SummaryCard title="Courses completed" value="4" />
        </div>

        {/* Section 2: Course List and Details */}
        <div className="row mt-4">
          <div className="col-md-2">
            <CourseList courses={courses} activeCourse={activeCourse} handleCourseClick={handleCourseClick} />
          </div>
          <div className="col-md-10">
            <div className="row">
              <CourseDetail course={activeCourseDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;