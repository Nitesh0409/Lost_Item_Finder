import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.css";

const Search = () => <span className="icon">🔍</span>;
const MapPin = () => <span className="icon">📍</span>;
const Clock = () => <span className="icon">⏰</span>;
const Users = () => <span className="icon">👥</span>;
const ArrowRight = () => <span className="icon">➡️</span>;
const Star = () => <span className="icon">⭐</span>;

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;



  return (
    <div className="home-bg">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient" />
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center hero-text"
          >
            <h1 className="hero-title">Lost &amp; Found</h1>
            <p className="hero-subtitle">
              Reuniting people with their precious belongings through community
              collaboration
            </p>
            {isLoggedIn ? (
              <div className="hero-buttons">
                <a href="/report-lost">
                  <button className="btn btn-primary">
                    Report Lost Item <ArrowRight />
                  </button>
                </a>
                <a href="/report-found">
                  <button className="btn btn-outline">Report Found Item</button>
                </a>
              </div>
            ) : (
              <div className="hero-buttons">
                <a href="/login">
                  <button className="btn btn-primary">
                    Login<ArrowRight />
                  </button>
                </a>
                <a href="/sign-up">
                  <button className="btn btn-outline">Sign Up</button>
                </a>
              </div>
            )}
          </motion.div>
        </div>
        {/* Floating Elements */}
        <div className="float-elem blue" />
        <div className="float-elem purple" />
        <div className="float-elem green" />
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="stats-grid"
          >
            <div className="stat-card">
              <div className="stat-icon">
                <Users />
              </div>
              <h3 className="stat-value">1,247</h3>
              <p className="stat-label">Items Reunited</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <MapPin />
              </div>
              <h3 className="stat-value">50+</h3>
              <p className="stat-label">Cities Covered</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Clock />
              </div>
              <h3 className="stat-value">24/7</h3>
              <p className="stat-label">Active Community</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="how-title">How It Works</h2>
            <p className="how-subtitle">
              Simple steps to reunite with your belongings
            </p>
          </motion.div>
          <div className="how-grid">
            {[
              {
                title: "Report",
                description:
                  "Report your lost or found item with detailed information and photos",
                icon: <Search />,
                color: "blue",
              },
              {
                title: "Match",
                description:
                  "Our system helps match lost and found items automatically",
                icon: <Star />,
                color: "purple",
              },
              {
                title: "Reunite",
                description:
                  "Connect with the finder or owner to safely return the item",
                icon: <Users />,
                color: "green",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="how-card"
              >
                <div className={`how-icon how-icon-${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="how-step-title">{item.title}</h3>
                <p className="how-step-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join our community and help reunite people with their lost
              belongings
            </p>
            <div className="cta-buttons">
              <a href="/lost-items">
                <button className="btn btn-secondary">Browse Lost Items</button>
              </a>
              <a href="/found-items">
                <button className="btn btn-outline-white">
                  Browse Found Items
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
