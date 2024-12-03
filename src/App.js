import "./App.css";
import ManageInterests from "./components/ManageInterests";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProgramGuide from "./components/ProgramGuide";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/view-profile" element={<Profile />} />
          <Route path="/manage-interests" element={<ManageInterests />} />
          <Route path="/degree-planner" element={<ProgramGuide />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
