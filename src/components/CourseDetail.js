import React from "react";

const CourseDetail = ({ course }) => {
  if (!course) return null;

  return (
    <div className="col-md-4">
      <h2>{course.code}</h2>
      <p>{course.description}</p>
      <p>
        <a className="btn btn-primary" href="#" role="button">
          View details »
        </a>
      </p>
    </div>
  );
};

export default CourseDetail;