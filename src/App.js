import "./App.css";
import Login from "./components/Login";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProgramGuide from "./components/ProgramGuide";
import Courses from "./components/Courses";
import Profile from "./components/Profile";
import ManageInterests from "./components/ManageInterests";

import AdminBar from "./admin-components/Navbar";
import AdminDashboard from "./admin-components/Dashboard";
import ManageProgramForm from "./admin-components/ManageProgramForm";
import ManageCoursesForm from "./admin-components/ManageCoursesForm";
import ManageInstructorsForm from "./admin-components/ManageInstructorsForm";
import ManageStudentsForm from "./admin-components/ManageStudentsForm";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userType, setUserType] = useState("");

  const handleLogout = () => {
    setUserType(""); // Clear user type to return to login
  };

  return (
    <>
      <Router>
        {userType === "admin" ? (
          <AdminBar onLogout={handleLogout} />
        ) : userType === "student" ? (
          <Navbar onLogout={handleLogout} />
        ) : null}
        <Routes>
          {userType === "" ? (
            <Route path="/" element={<Login setUserType={setUserType} />} />
          ) : userType === "admin" ? (
            <>
              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-programs" element={<ManageProgramForm />} />
              <Route path="/manage-courses" element={<ManageCoursesForm />} />
              <Route
                path="/manage-instructors"
                element={<ManageInstructorsForm />}
              />
              <Route path="/manage-students" element={<ManageStudentsForm />} />
            </>
          ) : (
            <>
              {/* Student Routes */}
              <Route path="/view-profile" element={<Profile />} />
              <Route path="/manage-interests" element={<ManageInterests />} />
              <Route path="/degree-planner" element={<ProgramGuide />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
