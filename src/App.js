import "./App.css";
import ManageInterests from "./components/ManageInterests";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

import AdminBar from "./admin-components/Navbar";
import AdminDashboard from "./admin-components/Dashboard";
import ManageProgramForm from "./admin-components/ManageProgramForm";
import ManageCoursesForm from "./admin-components/ManageCoursesForm";
import ManageInstructorsForm from "./admin-components/ManageInstructorsForm";
import ManageStudentsForm from "./admin-components/ManageStudentsForm";

import ProgramGuide from "./components/ProgramGuide";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userType, setUserType] = useState("admin"); // Change to 'admin' for admin views

  return (
    <>
      <Router>
        {userType === "admin" ? <AdminBar /> : <Navbar />}
        <Routes>
          {userType === "admin" ? (
            <>
              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />c
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
