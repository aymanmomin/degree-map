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
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [userType, setUserType] = useState(""); // Empty initially, set on login

  const handleLogout = () => {
    setUserType(""); // Clear user type on logout
  };

  return (
    <Router>
      {userType === "admin" ? (
        <AdminBar onLogout={handleLogout} />
      ) : userType === "student" ? (
        <Navbar onLogout={handleLogout} />
      ) : null}
      <Routes>
        {/* Redirect to Dashboard after Login */}
        {userType === "" ? (
          <Route path="*" element={<Navigate to="/" replace />} />
        ) : userType === "admin" ? (
          <>
            {/* Admin Default Route */}
            <Route
              path="/"
              element={<Navigate to="/admin-dashboard" replace />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-programs" element={<ManageProgramForm />} />
            <Route path="/manage-courses" element={<ManageCoursesForm />} />
            <Route
              path="/manage-instructors"
              element={<ManageInstructorsForm />}
            />
            <Route path="/manage-students" element={<ManageStudentsForm />} />
            {/* Redirect Unauthorized Student Routes */}
            <Route path="/view-profile" element={<NotFound />} />
            <Route path="/manage-interests" element={<NotFound />} />
            <Route path="/degree-planner" element={<NotFound />} />
            <Route path="/dashboard" element={<NotFound />} />
            <Route path="/courses" element={<NotFound />} />
          </>
        ) : (
          <>
            {/* Student Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-profile" element={<Profile />} />
            <Route path="/manage-interests" element={<ManageInterests />} />
            <Route path="/degree-planner" element={<ProgramGuide />} />
            <Route path="/courses" element={<Courses />} />
            {/* Redirect Unauthorized Admin Routes */}
            <Route path="/admin-dashboard" element={<NotFound />} />
            <Route path="/manage-programs" element={<NotFound />} />
            <Route path="/manage-courses" element={<NotFound />} />
            <Route path="/manage-instructors" element={<NotFound />} />
            <Route path="/manage-students" element={<NotFound />} />
          </>
        )}
        {/* Login Route */}
        <Route path="/" element={<Login setUserType={setUserType} />} />
        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
