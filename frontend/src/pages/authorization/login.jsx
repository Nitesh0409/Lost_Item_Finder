// src/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './auth.css';

import { useToaster } from "../../components/ui/Toaster";

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToaster();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "Signup failed", "error");
        console.error(data);
        return;
      }

      toast("Login successful!", "info");

      localStorage.setItem("token", data.token);

      // Decode the JWT to get expiration time
      const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // convert to ms

      // Calculate time remaining until expiration
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      if (timeUntilExpiry > 0) {
        // Set timeout to remove token after it expires
        setTimeout(() => {
          localStorage.removeItem("token");
          toast("Session expired. Please log in again.", "warning");
          console.log("Token expired and removed from localStorage.");
          navigate("/login");
        }, timeUntilExpiry);
      }

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast("Something went wrong during login.","error");
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn-primary">
            Log In
          </button>
        </form>
        <p className="auth-link-text">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
        <p className="auth-link-text">
          <Link to ="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}
