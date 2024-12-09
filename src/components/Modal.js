import React from "react";

const Modal = ({ show, handleClose, course, addToCurrentSemester, addToNextSemester, addToWaitlist }) => {
  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Course Options</h5>
          </div>
          <div className="modal-body">
            <p>{course ? course.title : "No course selected"}</p>
            <div className="btn-group d-flex justify-content-between">
              <button type="button" className="btn btn-primary" onClick={addToCurrentSemester}>
                Add to Current Semester
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;