import React from "react";

const CourseList = ({ courses, activeCourse, handleCourseClick, completeCourse, removeCourse }) => {
  return (
    <div className="card">
      {courses.map((course) => (
        <div key={course.code} className="card-body">
          <div className="mr-2" onClick={() => handleCourseClick(course.code)}>
            <h5 className="card-title">{course.code}</h5>
            <small>{course.title}</small>
          </div>
          <div className="card-text">
            <button
              type="button"
              className={`btn btn-sm ${course.taken ? "btn-success" : "btn-primary"} mr-2`}
              onClick={() => completeCourse(course.code)}
              disabled={course.taken}
            >
              {course.taken ? "Completed" : "Complete"}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger mr-2"
              onClick={() => removeCourse(course.code)}
              disabled={course.taken}
            >
              Remove
            </button>
            <button
              type="button"
              className="btn btn-sm btn-info"
              onClick={() => handleCourseClick(course.code)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;