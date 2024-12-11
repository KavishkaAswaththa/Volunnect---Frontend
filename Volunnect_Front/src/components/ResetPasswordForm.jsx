import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResetPasswordForm.css"; // Updated CSS file for consistent styling

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Popup visibility
  const [isEmailStage, setIsEmailStage] = useState(true); // Stage: email or password reset
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const email = urlParams.get("email");
    if (email) {
      setFormData((prevData) => ({ ...prevData, email }));
      setIsEmailStage(false);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:8080/api/users/forgot-password", { email: formData.email });
      alert("Email verification has been sent. Please check your inbox.");
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred.";
      alert(errorMessage);
      setMessage(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/reset-password", formData);
      setMessage(response.data);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="background-container">
      {isPopupVisible && (
        <div className="modal-overlay.show">
          <div className="form-boxreset">
            <h2 className="form-title">{isEmailStage ? "Forgot Password" : "Reset Password"}</h2>
            {isEmailStage ? (
              <form onSubmit={handleSendResetEmail} className="form-content">
                <div className="input-containerreset">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-inputreset"
                    required
                  />
                </div>
                <button type="submit" className="form-buttonreset">
                  Verify Email
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="form-content">
                <div className="input-containerreset">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-inputreset"
                    disabled
                  />
                </div>
                <div className="input-containerreset">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-inputreset"
                    required
                  />
                </div>
                <div className="input-containerreset">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-inputreset"
                    required
                  />
                </div>
                <button type="submit" className="form-buttonreset">
                  Reset Password
                </button>
              </form>
            )}
            {message && <p className="form-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
