import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResetPasswordForm.css"; // Assuming you're using the same styles

const UpdatePasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState(""); // To store the token from the URL
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from the query parameters when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    if (!token) {
      alert("Invalid or missing token.");
    } else {
      setToken(token);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send request to update the password
      await axios.put(
        "http://localhost:8080/api/users/update-password?token=" + token, // Updated endpoint for PUT request
        {
          password: formData.password,
          confirmPassword: formData.password
        }
      );

      alert("Password updated successfully!"); // Display success message as a popup
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      // Handle errors and ensure only a string is passed to alert
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "An error occurred while updating the password.";
      alert(errorMessage);
    }
  };

  return (
    <div className="background-container">
      <div className="modal-overlay show">
        <div className="form-boxreset">
          <h2 className="form-title">Update Your Password</h2>
          <form className="update-password-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="form-button">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
