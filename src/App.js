import "./App.css";
import ManageInterests from "./components/ManageInterests";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

import AdminBar from "./admin-components/Navbar";
import AdminDashboard from "./admin-components/Dashboard";

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
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route
                path="/manage-interests"
                element={<ManageInterests />} // Admin can also manage interests
              />
            </>
          ) : (
            <>
              {/* Student Routes */}
              <Route path="/view-profile" element={<Profile />} />
              <Route path="/manage-interests" element={<ManageInterests />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
