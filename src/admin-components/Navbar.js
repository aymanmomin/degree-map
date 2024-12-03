import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                <a className="nav-link" aria-current="page" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-programs">
                  Manage Programs
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Manage Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Manage Instructors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Manage Students
                </a>
              </li>
            </ul>
            <div className="d-flex navbar-nav mb-2 mb-lg-0">
              <div className="dropdown-center">
                <a
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
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li>
                    <a className="dropdown-item disabled" href="#">
                      UCAID: 10192494
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign Out
                    </a>
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
