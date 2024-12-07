import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  // State for personal details
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    dob: "1995-06-15",
  });

  //   // State for user interests
  //   const [interests, setInterests] = useState({
  //     careerGoals: ["AI Researcher", "Entrepreneur"],
  //     likes: ["Web Development", "Gaming"],
  //     studyTopics: ["Data Science", "Machine Learning"],
  //   });
  // Static interests for display only
  const interests = ["AI", "Web Development", "Data Science"];

  // State for validation feedback and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(personalDetails);
  const [errors, setErrors] = useState({});

  // Security State
  const [currentPassword, setCurrentPassword] = useState("Current@123");
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Toggle edit mode for personal details
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormValues(personalDetails);
      setErrors({});
    }
  };

  // Save updated details after validation
  const handleSaveClick = () => {
    if (validateForm()) {
      setPersonalDetails(formValues);
      setIsEditing(false);
    }
  };

  // Handle input changes for personal details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Form validation logic for personal details
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formValues.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Enter a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password field changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  // Validate and update passwords
  const validatePasswords = () => {
    const errors = {};
    const {
      currentPassword: enteredCurrent,
      newPassword,
      confirmPassword,
    } = passwordFields;

    if (enteredCurrent !== currentPassword) {
      errors.currentPassword = "Current password does not match.";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword =
        "New password and confirm password do not match.";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(newPassword)) {
      errors.newPassword =
        "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number.";
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      setCurrentPassword(passwordFields.newPassword);
      alert("Password updated successfully!");
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // Handle removing an interest
  //   const handleRemoveInterest = (category, index) => {
  //     setInterests({
  //       ...interests,
  //       [category]: interests[category].filter((_, i) => i !== index),
  //     });
  //   };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Section 1: Program Information */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Program Information</h2>
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>Faculty Name:</strong> Science
              </p>
              <p>
                <strong>Program Name:</strong> Bachelor of Science
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>Major:</strong> Computer Science
              </p>
              <p>
                <strong>Minor:</strong> None
              </p>
              <p>
                <strong>Concentration:</strong> None
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>Current Year:</strong> 3rd Year
              </p>
              <p>
                <strong>Intake:</strong> Fall 2021
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Details */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">Personal Details</h2>
            <button
              className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <form className="mt-3">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="First Name"
                  />
                  <label>First Name</label>
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Last Name"
                  />
                  <label>Last Name</label>
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Email"
                  />
                  <label>Email</label>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formValues.dob}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Date of Birth"
                  />
                  <label>Date of Birth</label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Section 3: Interests */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">Interests</h2>
            <Link to="/manage-interests" className="btn btn-primary">
              Manage Interests
            </Link>
          </div>
          <div className="mt-2">
            {interests.map((interest, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Security */}
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <form onSubmit={handlePasswordUpdate}>
            <h2 className="text-primary">Security</h2>
            <div className="row g-3">
              {/* Current Password */}
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="password"
                    className={`form-control ${
                      passwordErrors.currentPassword ? "is-invalid" : ""
                    }`}
                    name="currentPassword"
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                  />
                  <label>Current Password</label>
                  {passwordErrors.currentPassword && (
                    <div className="invalid-feedback">
                      {passwordErrors.currentPassword}
                    </div>
                  )}
                </div>
              </div>
              {/* New Password */}
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="password"
                    className={`form-control ${
                      passwordErrors.newPassword ? "is-invalid" : ""
                    }`}
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                  />
                  <label>New Password</label>
                  {passwordErrors.newPassword && (
                    <div className="invalid-feedback">
                      {passwordErrors.newPassword}
                    </div>
                  )}
                </div>
              </div>
              {/* Confirm Password */}
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="password"
                    className={`form-control ${
                      passwordErrors.confirmPassword ? "is-invalid" : ""
                    }`}
                    name="confirmPassword"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm Password"
                  />
                  <label>Confirm Password</label>
                  {passwordErrors.confirmPassword && (
                    <div className="invalid-feedback">
                      {passwordErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
