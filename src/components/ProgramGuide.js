import React from "react";

// courses added and removed from list 
export default function ProgramGuide() {
  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Section 1: Year-wise Course Details */}
        <div className="row">
          <div className="col-md-3">
            <div className="card text-center">
              <h5 className="card-header">Year 1</h5>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CPSC 231
                    <button className="badge bg-primary rounded-pill">3 units</button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    ...
                  </li>
                </ul>
              </div>
              <div className="card-footer">Note: Students...</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <h5 className="card-header">Year 2</h5>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CPSC 331
                    <button className="badge bg-primary rounded-pill">3 units</button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    ...
                  </li>
                </ul>
              </div>
              <div className="card-footer">Note: Lis...</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <h5 className="card-header">Year 3</h5>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CPSC 481
                    <button className="badge bg-primary rounded-pill">3 units</button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    ...
                  </li>
                </ul>
              </div>
              <div className="card-footer">Note: Lis...</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <h5 className="card-header">Year 4</h5>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CPSC 583
                    <button className="badge bg-primary rounded-pill">3 units</button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    ...
                  </li>
                </ul>
              </div>
              <div className="card-footer">Note: Lis...</div>
            </div>
          </div>
        </div>

        {/* Section 2: Information Hub */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>Information Hub:</h2>
            <p>• The program must contain at least 120 units with a maximum of 48 units at the Junior Level (200 level courses). 
            <br/>• A Non-Major Field Option is any option NOT in the field of Computer Science. 
            <br/>• A Non-Science Option is any course from faculties other than the Faculty of Science, excluding courses in Table 1.
            <br/>• An Open Option is any course offered by any Faculty.
            <br/>• A link to courses/course descriptions is available in the Academic Calendar.
            </p>
            <p>
              <a className="btn" href="#">
                More details »
              </a>
            </p>
            <button type="button" className="btn btn-md btn-primary btn-block">
              Switch to honors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}