import "./App.css";
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
