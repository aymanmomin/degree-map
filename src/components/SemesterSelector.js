import React from "react";

const SemesterSelector = ({ semesters, activeSemester, handleSemesterSelect }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {semesters.map((semester) => (
        <button
          key={semester}
          type="button"
          className={`btn ${semester === activeSemester ? "btn-primary" : "btn-secondary"}`}
          onClick={() => handleSemesterSelect(semester)}
        >
          {semester}
        </button>
      ))}
    </div>
  );
};

export default SemesterSelector;