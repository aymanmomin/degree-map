import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NotFound({ redirectTo }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(redirectTo); // Redirect to respective dashboard
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">
        Oops! The page you're looking for doesn't exist or you don't have
        permission to access it.
      </p>
      <Link to="/" className="btn btn-primary mt-3" onClick={handleGoHome}>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
