import React, { useState , useEffect} from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { Menu, Search, User, Moon, Sun, LogIn,LogOut } from "react-feather";
import "./Navbar.css";

const allNavigation = [
  { name: "Home", href: "/" },
  { name: "Report Lost", href: "/report-lost" },
  { name: "Report Found", href: "/report-found" },
  { name: "Lost Items", href: "/lost-items" },
  { name: "Found Items", href: "/found-items" },
  { name: "Claim Center", href: "/claim-center" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[location])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.toggle("dark-theme");
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout
      const confirmLogout = window.confirm("Are you sure you want to log out?");

      if (confirmLogout) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
      } 
    } else {
      // Login
      navigate("/login"); 
    }
  };

  //it filter out navigation based on login or not
  const navigation = allNavigation.filter((item) => {
    const publicRoutes = ["/", "/login"];
    return isLoggedIn || publicRoutes.includes(item.href);
  });

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

          {isLoggedIn && (
            <Link to="/profile">
              <button className="icon-btn">
                <User size={20} color="#2563eb" />
              </button>
            </Link>
          )}

          <button
            className="icon-btn"
            onClick={handleAuthClick}
            title={isLoggedIn ? "Logout" : "Login"}
          >
            {isLoggedIn ? (
              <LogOut size={20} color="#10b981" />
            ) : (
              <LogIn size={20} color="#10b984" />
            )}
          </button>

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
