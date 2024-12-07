import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark  " data-bs-theme="dark">
        <div className="container-fluid">
          <a
            className="navbar-brand pe-none"
            tabIndex="-1"
            aria-disabled="true"
            href="#"
          >
            DegreeMap
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin-dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-programs">
                  Manage Programs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-courses">
                  Manage Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-instructors">
                  Manage Instructors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-students">
                  Manage Students
                </Link>
              </li>
            </ul>
            <div className="d-flex navbar-nav mb-2 mb-lg-0">
              <div className="dropdown-center">
                <span
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/63975056?s=48&v=4"
                    alt="profile pic"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />{" "}
                  Admin 1
                </span>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li>
                    <span className="dropdown-item disabled">
                      UCAID: 10192494
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
