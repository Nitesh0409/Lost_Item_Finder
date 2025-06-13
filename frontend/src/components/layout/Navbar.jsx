import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, User, Moon, Sun } from "react-feather";
import "./Navbar.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "SignUp", href: "/sign-up" },
  { name: "Report Lost", href: "/report-lost" },
  { name: "Report Found", href: "/report-found" },
  { name: "Lost Items", href: "/lost-items" },
  { name: "Found Items", href: "/found-items" },
  { name: "Claim Center", href: "/claim-center" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.toggle("dark-theme");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Search size={20} color="#fff" />
          </div>
          <span className="logo-text">Lost & Found</span>
        </Link>

        <div className="nav-links">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${
                location.pathname === item.href ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/profile">
            <button className="icon-btn">
              <User size={20} />
            </button>
          </Link>

          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`mobile-nav-link ${
                location.pathname === item.href ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
