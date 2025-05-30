import React from "react";
import { Link } from "react-router-dom";
import { Search, Mail } from "react-feather";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and Description */}
          <div className="footer-section footer-logo">
            <Link to="/" className="footer-logo-link">
              <div className="logo-icon">
                <Search size={16} color="#fff" />
              </div>
              <span className="logo-text">Lost & Found</span>
            </Link>
            <p className="footer-description">
              Connecting communities to reunite people with their lost
              belongings through technology and compassion.
            </p>
            <div className="footer-contact">
              <Mail size={16} />
              <span>support@lostandfound.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li>
                <Link to="/report-lost" className="footer-link">
                  Report Lost
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="footer-link">
                  Report Found
                </Link>
              </li>
              <li>
                <Link to="/lost-items" className="footer-link">
                  Browse Lost
                </Link>
              </li>
              <li>
                <Link to="/found-items" className="footer-link">
                  Browse Found
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li>
                <Link to="/help" className="footer-link">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Lost & Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
