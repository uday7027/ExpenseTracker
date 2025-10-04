import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth.css";

const Signup = () => {
  const { signup, loading, error, setError } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) errors.email = "Please enter a valid email";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    const result = await signup(formData.name.trim(), formData.email.trim(), formData.password);
    if (result.success) navigate("/dashboard");
    else console.error("Signup failed:", result.error);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        {error && <div className="auth-error">{String(error)}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="auth-field">
            <input
              type="text"
              name="name"
              className="auth-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label className="auth-label">Full Name</label>
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="auth-field">
            <input
              type="email"
              name="email"
              className="auth-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label className="auth-label">Email</label>
            {validationErrors.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-field">
            <input
              type="password"
              name="password"
              className="auth-input"
              value={formData.password}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label className="auth-label">Password</label>
            {validationErrors.password && (
              <span className="error-message">{validationErrors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="auth-field">
            <input
              type="password"
              name="confirmPassword"
              className="auth-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label className="auth-label">Confirm Password</label>
            {validationErrors.confirmPassword && (
              <span className="error-message">{validationErrors.confirmPassword}</span>
            )}
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
