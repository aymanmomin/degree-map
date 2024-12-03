import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark  " data-bs-theme="dark">
        <div className="container-fluid">
          <a
            className="navbar-brand pe-none"
            tabindex="-1"
            aria-disabled="true"
            href="#"
          >
            DegreeMap
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/degree-planner">
                  Degree Planner
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/courses">
                  Course Catalogue
                </Link>
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
                  Ayman M
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li>
                    <a className="dropdown-item disabled" href="#">
                      UCID: 30192494
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manage-interests">
                      Mange Interests
                    </Link>
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
