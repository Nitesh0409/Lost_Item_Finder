// src/Login.jsx
import React, { useState, useEffect , useRef} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './auth.css';
import { useAuth } from "../../contexts/AuthContext";

import { useToaster } from "../../components/ui/Toaster";

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToaster();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (location.state?.from && !hasShownToast.current) {
      toast("You must log in to access that page", "warning");
      hasShownToast.current = true;
    }
  }, [location.state, toast]);

  console.log(location);

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
      login();

      setFormData({
        email: "",
        password: "",
      });

      // navigate("/");
      const from = location.state?.from || "/";
      navigate(from, { replace: true });

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
