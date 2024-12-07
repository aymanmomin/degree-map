import React, { useState } from "react";

export default function ManageInterests() {
  // State for storing current interests
  const [interests, setInterests] = useState([
    "Career Goals", // Example, can be dynamic or fetched from API
    "Likes", // Example, can be dynamic or fetched from API
  ]);

  // State for input fields and errors
  const [currentInput, setCurrentInput] = useState("");
  const [errors, setErrors] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Add interest to the list
  const handleAddInterest = () => {
    const trimmedValue = currentInput.trim();
    if (trimmedValue) {
      // Check if the interest already exists
      if (!interests.includes(trimmedValue)) {
        setInterests([...interests, trimmedValue]);
        setCurrentInput(""); // Clear the input field
        setErrors(""); // Reset errors
      } else {
        setErrors("This interest already exists.");
      }
    } else {
      setErrors("This field cannot be empty.");
    }
  };

  // Remove an interest from the list
  const handleRemoveInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests); // Update the interests list
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine all categories into a single list
    const newInterest = currentInput.trim();
    if (newInterest) {
      if (!interests.includes(newInterest)) {
        setInterests([...interests, newInterest]);
        setCurrentInput(""); // Clear the input field
        setErrors(""); // Reset errors
      } else {
        setErrors("This interest already exists.");
      }
    } else {
      setErrors("This field cannot be empty.");
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="p-4 mb-4 shadow-sm bg-white rounded">
          <h2 className="text-primary">Manage Your Interests</h2>

          {/* Your Interests Section */}
          <div className="mb-4">
            <h4>Your Interests:</h4>
            {interests.length > 0 ? (
              <div className="mt-2">
                {interests.map((interest, index) => (
                  <span key={index} className="badge bg-primary me-2">
                    {interest}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      aria-label="Remove"
                      onClick={() => handleRemoveInterest(index)}
                    ></button>
                  </span>
                ))}
              </div>
            ) : (
              <p>No interests added yet.</p>
            )}
          </div>

          <p className="text-secondary">
            Answer the following questions to find topics you may want to study.
            <ol>
              <li>What are your career goals?</li>
              <li>What do you enjoy or like?</li>
              <li>What topics do you want to study?</li>
            </ol>
          </p>

          {/* Add New Interest Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${errors ? "is-invalid" : ""}`}
                  placeholder="Enter an interest..."
                  value={currentInput}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddInterest}
                >
                  Add
                </button>
                {errors && <div className="invalid-feedback">{errors}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
