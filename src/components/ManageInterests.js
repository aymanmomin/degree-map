import React, { useState } from "react";

export default function ManageInterests() {
  // State for storing interests by question
  const [interests, setInterests] = useState({
    careerGoals: [],
    likes: [],
    studyTopics: [],
  });

  // State for input fields and errors
  const [currentInput, setCurrentInput] = useState({
    careerGoals: "",
    likes: "",
    studyTopics: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInput({ ...currentInput, [name]: value });
  };

  // Add interest to the list
  const handleAddInterest = (category) => {
    const trimmedValue = currentInput[category].trim();
    if (trimmedValue) {
      setInterests({
        ...interests,
        [category]: [...interests[category], trimmedValue],
      });
      setCurrentInput({ ...currentInput, [category]: "" });
      setErrors({ ...errors, [category]: "" });
    } else {
      setErrors({ ...errors, [category]: "This field cannot be empty." });
    }
  };

  // Remove an interest from the list
  const handleRemoveInterest = (category, index) => {
    setInterests({
      ...interests,
      [category]: interests[category].filter((_, i) => i !== index),
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if each category has at least one interest
    const newErrors = {};
    for (const category in interests) {
      if (interests[category].length === 0) {
        newErrors[category] = "Please add at least one interest.";
      }
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitted Interests:", interests);
      alert("Interests saved successfully!");
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Your Interests</h2>
          <p className="text-secondary">
            Answer the following questions to find topics you may want to study.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Career Goals */}
            <div className="mb-4">
              <h4>1. What are your career goals?</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.careerGoals ? "is-invalid" : ""
                  }`}
                  placeholder="Enter a career goal..."
                  name="careerGoals"
                  value={currentInput.careerGoals}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddInterest("careerGoals")}
                >
                  Add
                </button>
                {errors.careerGoals && (
                  <div className="invalid-feedback">{errors.careerGoals}</div>
                )}
              </div>
              <div className="mt-2">
                {interests.careerGoals.map((goal, index) => (
                  <span key={index} className="badge bg-primary me-2">
                    {goal}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      aria-label="Remove"
                      onClick={() => handleRemoveInterest("careerGoals", index)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Likes */}
            <div className="mb-4">
              <h4>2. What do you enjoy or like?</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.likes ? "is-invalid" : ""}`}
                  placeholder="Enter something you like..."
                  name="likes"
                  value={currentInput.likes}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddInterest("likes")}
                >
                  Add
                </button>
                {errors.likes && (
                  <div className="invalid-feedback">{errors.likes}</div>
                )}
              </div>
              <div className="mt-2">
                {interests.likes.map((like, index) => (
                  <span key={index} className="badge bg-success me-2">
                    {like}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      aria-label="Remove"
                      onClick={() => handleRemoveInterest("likes", index)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Study Topics */}
            <div className="mb-4">
              <h4>3. What topics do you want to study?</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.studyTopics ? "is-invalid" : ""
                  }`}
                  placeholder="Enter a topic..."
                  name="studyTopics"
                  value={currentInput.studyTopics}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddInterest("studyTopics")}
                >
                  Add
                </button>
                {errors.studyTopics && (
                  <div className="invalid-feedback">{errors.studyTopics}</div>
                )}
              </div>
              <div className="mt-2">
                {interests.studyTopics.map((topic, index) => (
                  <span key={index} className="badge bg-danger me-2">
                    {topic}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      aria-label="Remove"
                      onClick={() => handleRemoveInterest("studyTopics", index)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Interests
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
