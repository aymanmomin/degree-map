import React from "react";

const CourseDetail = ({ course }) => {
  if (!course) return null;

  return (
    <div className="col-md-4">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.units} Units</p>
    </div>
  );
};

export default CourseDetail;