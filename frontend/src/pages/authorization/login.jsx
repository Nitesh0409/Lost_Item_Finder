// src/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './auth.css';

export default function LoginPage() {
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
        alert(data.message || "Login failed");
        console.error(data);
        return;
      }

      alert("Login successful!");
      console.log("User Logged In:", data);

      // Optional: Save token to localStorage for future auth
      localStorage.setItem("token", data.token); // if you return token in response

      // Reset form
      setFormData({
        email: "",
        password: "",
      });

      // Optional: Redirect to dashboard or homepage
      // navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong during login.");
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
