import React from "react";

const CourseList = ({ courses, activeCourse, handleCourseClick }) => {
  return (
    <div id="card-738138">
      {courses.map((course) => (
        <div className="card" key={course.code}>
          <div className="card-header">
            <a
              className={`card-link ${activeCourse === course.code ? "" : "collapsed"}`}
              data-toggle="collapse"
              data-parent="#card-738138"
              href={`#card-element-${course.code}`}
              onClick={() => handleCourseClick(course.code)}
            >
              {course.code}
            </a>
          </div>
          <div
            id={`card-element-${course.code}`}
            className={`collapse ${activeCourse === course.code ? "show" : ""}`}
          >
            <div className="card-body">
              {course.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;