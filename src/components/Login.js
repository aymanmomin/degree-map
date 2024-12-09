import React, { useState } from "react";

function Login({ setUserType }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // if (!/^\d{8}$/.test(id)) {
    //   setError("ID must be 8 digits.");
    //   return;
    // }

    // // Mock authentication
    // if (id === "10192494" && password === "admin123") {
    //   setUserType("admin");
    // } else if (id === "30192494" && password === "student123") {
    //   setUserType("student");
    // } else {
    //   setError("Invalid credentials. Please try again.");
    //   return;
    // }

    // setError(""); // Clear any previous errors

    setUserType("student");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your 8-digit ID"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div> */}
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;