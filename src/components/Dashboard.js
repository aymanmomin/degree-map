import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import CourseList from "./CourseList";
import CourseDetail from "./CourseDetail";
import SemesterSelector from "./SemesterSelector"; // New component for semester selection
import SummaryCard from "./SummaryCard";
import ProgramGuide from "./ProgramGuide";

const Dashboard = () => {
  const location = useLocation(); // Get the current location
  const programGuideRef = useRef(null); // Create a ref for the ProgramGuide section

  // State to manage the active course details
  const [activeCourse, setActiveCourse] = useState(null);

  // State to manage the active semester
  const [activeSemester, setActiveSemester] = useState("Fall");

  // Sample course data with semester information
  const [courses, setCourses] = useState([
    {
      semester: "Fall",
      courses: [
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
      ],
    },
    {
      semester: "Winter",
      courses: [
        {
          code: "CPSC 251",
          title: "Theoretical Foundations of Computer Science I",
          description: "Proof techniques. Recursion and iteration. Specification of algorithmic problems and fundamental proof techniques in Computer Science. Discrete structures such as graphs, trees, strings, functions, and their computer representation. Counting, permutations. Random events. Conditional events. Applications in Computer Science.",
          units: 3,
          taken: false,
        },
      ],
    },
  ]);

  // Total required credits for the degree
  const totalRequiredCredits = 120;

  // State to manage total credits and completed courses
  const [totalCredits, setTotalCredits] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);

  // State to manage degree completion percentage
  const [degreeCompletion, setDegreeCompletion] = useState(0);

  // Update total credits, completed courses, and degree completion percentage whenever courses change
  useEffect(() => {
    const totalCredits = courses
      .flatMap((semester) => semester.courses)
      .reduce((sum, course) => sum + (course.taken ? course.units : 0), 0);

    const completedCourses = courses
      .flatMap((semester) => semester.courses)
      .filter((course) => course.taken).length;

    const degreeCompletion = ((totalCredits / totalRequiredCredits) * 100).toFixed(2);

    setTotalCredits(totalCredits);
    setCompletedCourses(completedCourses);
    setDegreeCompletion(degreeCompletion);
  }, [courses, totalRequiredCredits]);

  // Handle course card click
  const handleCourseClick = (courseCode) => {
    setActiveCourse(courseCode);
  };

  // Handle semester selection
  const handleSemesterSelect = (semester) => {
    setActiveSemester(semester);
  };

  // Active course details
  const activeCourseDetails = courses
    .flatMap((semester) => semester.courses)
    .find((course) => course.code === activeCourse);

  // Filter courses based on the active semester
  const filteredCourses = courses
    .find((semester) => semester.semester === activeSemester)
    ?.courses || [];

  // Complete a course
  const completeCourse = (courseCode) => {
    setCourses((prevCourses) =>
      prevCourses.map((semester) => ({
        ...semester,
        courses: semester.courses.map((course) =>
          course.code === courseCode ? { ...course, taken: true } : course
        ),
      }))
    );
  };

  // Remove a course
  const removeCourse = (courseCode) => {
    setCourses((prevCourses) =>
      prevCourses.map((semester) => ({
        ...semester,
        courses: semester.courses.filter((course) => course.code !== courseCode),
      }))
    );
  };

  // Add a course to the current semester
  const addToCurrentSemester = (course) => {
    setCourses((prevCourses) =>
      prevCourses.map((semester) => {
        if (semester.semester === activeSemester) {
          return {
            ...semester,
            courses: [...semester.courses, { ...course, units: 3, taken: false }],
          };
        }
        return semester;
      })
    );
  };

  // Scroll to the ProgramGuide section if the hash is #program-guide
  useEffect(() => {
    if (location.hash === "#program-guide") {
      programGuideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        {/* Section 1: Summary Cards */}
        <div className="row">
          <SummaryCard title="Degree completion" value={`${degreeCompletion}%`} />
          <SummaryCard title="Year" value="1" />
          <SummaryCard title="Credits" value={`${totalCredits}`} />
          <SummaryCard title="Courses completed" value={`${completedCourses}`} />
        </div>

        {/* Section 2: Semester Selector */}
        <div className="row mt-4">
          <div className="col-md-12">
            <SemesterSelector
              semesters={courses.map((semester) => semester.semester)}
              activeSemester={activeSemester}
              handleSemesterSelect={handleSemesterSelect}
            />
          </div>
        </div>

        {/* Section 3: Course List and Details */}
        <div className="row mt-4">
          <div className="col-md-2">
            <CourseList
              courses={filteredCourses}
              activeCourse={activeCourse}
              handleCourseClick={handleCourseClick}
              completeCourse={completeCourse}
              removeCourse={removeCourse}
            />
          </div>
          <div className="col-md-10">
            <div className="row">
              <CourseDetail course={activeCourseDetails} />
            </div>
          </div>
        </div>

        {/* Section 4: Program Guide */}
        <div className="row mt-4" id="program-guide" ref={programGuideRef}>
        <h2>Degree Planner</h2>
          <div className="col-md-12">
            <ProgramGuide addToCurrentSemester={addToCurrentSemester} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;