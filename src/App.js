import "./App.css";
import ManageInterests from "./components/ManageInterests";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/view-profile" element={<Profile />} />
          <Route path="/manage-interests" element={<ManageInterests />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
