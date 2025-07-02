import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Page.css";

import { useToaster } from "../../components/ui/Toaster";

const SettingsIcon = () => <span className="icon">⚙️</span>;
const StarIcon = () => <span className="icon-star">⭐</span>;

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const toast = useToaster();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data.user);
      } catch (err) {
        console.error("Failed to fetch profile details:", err);
        toast("Failed to fetch profile details", "error");
      }
    };
    fetchProfile();
  }, []);


  const recentActivity = [
    {
      type: "reported",
      item: "iPhone 14 Pro",
      date: "2024-01-15",
      status: "active",
    },
    {
      type: "found",
      item: "Black Wallet",
      date: "2024-01-12",
      status: "claimed",
    },
    {
      type: "claimed",
      item: "Blue Backpack",
      date: "2024-01-10",
      status: "completed",
    },
  ];

  const [tab, setTab] = useState("activity");


  return (
    <div className="profile-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">
              Manage your account and track your community contributions
            </p>
          </div>

          <div className="profile-main">
            <div className="profile-side">
              {/* Profile Overview */}
              <div className="card shadow mb-6">
                <div className="card-content text-center">
                  <div className="avatar">
                    <div className="avatar-fallback">
                      {(() => {
                        if (!profile || !profile.userName) return "??";

                        const nameParts = profile.userName.trim().split(/\s+/);

                        if (nameParts.length >= 2) {
                          return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
                        }

                        return nameParts[0].substring(0, 2).toUpperCase();
                      })()}
                    </div>
                  </div>
                  <h2 className="profile-name">{profile?.userName}</h2>
                  <p className="profile-bio">{profile?.bio}</p>
                  <div className="profile-rating">
                    <StarIcon />
                    <span className="profile-rating-value">
                      {profile?.rating}
                    </span>
                    <span className="profile-rating-label">
                      Community Rating
                    </span>
                  </div>
                  <button className="btn-gradient full-width">
                    <SettingsIcon /> Edit Profile
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="card shadow">
                  <div className="card-content text-center">
                    <div className="stat-value indigo">
                      {profile?.itemsReportedLost?.length}
                    </div>
                    <div className="stat-label">Items Reported</div>
                  </div>
                </div>
                <div className="card shadow">
                  <div className="card-content text-center">
                    <div className="stat-value cyan">
                      {profile?.itemsReportedFound?.length}
                    </div>
                    <div className="stat-label">Items Found</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="profile-content">
              <div className="tabs">
                <div className="tabs-list">
                  <button
                    className={tab === "activity" ? "tab-active" : ""}
                    onClick={() => setTab("activity")}
                  >
                    Recent Activity
                  </button>
                  <button
                    className={tab === "settings" ? "tab-active" : ""}
                    onClick={() => setTab("settings")}
                  >
                    Account Settings
                  </button>
                  <button
                    className={tab === "notifications" ? "tab-active" : ""}
                    onClick={() => setTab("notifications")}
                  >
                    Notifications
                  </button>
                </div>

                {tab === "activity" && (
                  <div className="tab-content">
                    <div className="card shadow">
                      <div className="card-header">Recent Activity</div>
                      <div className="card-content">
                        <div className="activity-list">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="activity-row">
                              <div>
                                <p className="activity-type">
                                  {activity.type === "reported"
                                    ? "Reported"
                                    : activity.type === "found"
                                    ? "Found"
                                    : "Claimed"}
                                  : {activity.item}
                                </p>
                                <p className="activity-date">{activity.date}</p>
                              </div>
                              <span
                                className={`badge ${
                                  activity.status === "completed"
                                    ? "badge-default"
                                    : "badge-secondary"
                                }`}
                              >
                                {activity.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "settings" && (
                  <div className="tab-content">
                    <div className="card shadow">
                      <div className="card-header">Account Information</div>
                      <div className="card-content">
                        <div className="settings-grid">
                          <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                              id="name"
                              value={profile.userName}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className="profile-input"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="profile-input"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                              id="phone"
                              value={profile?.phone}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="profile-input"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                              id="location"
                              value={profile?.location}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  location: e.target.value,
                                }))
                              }
                              className="profile-input"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="bio">Bio</label>
                          <input
                            id="bio"
                            value={profile.bio}
                            onChange={(e) =>
                              setProfile((prev) => ({
                                ...prev,
                                bio: e.target.value,
                              }))
                            }
                            className="profile-input"
                          />
                        </div>
                        <button className="btn-gradient">Save Changes</button>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "notifications" && (
                  <div className="tab-content">
                    <div className="card shadow">
                      <div className="card-header">
                        Notification Preferences
                      </div>
                      <div className="card-content">
                        <div className="notification-list">
                          <div className="notification-row">
                            <div>
                              <h4 className="notification-title">
                                Email Notifications
                              </h4>
                              <p className="notification-desc">
                                Receive updates about your items and matches
                              </p>
                            </div>
                            <button className="btn-outline-sm">Enable</button>
                          </div>
                          <div className="notification-row">
                            <div>
                              <h4 className="notification-title">
                                SMS Notifications
                              </h4>
                              <p className="notification-desc">
                                Get instant alerts for urgent matches
                              </p>
                            </div>
                            <button className="btn-outline-sm">Enable</button>
                          </div>
                          <div className="notification-row">
                            <div>
                              <h4 className="notification-title">
                                Push Notifications
                              </h4>
                              <p className="notification-desc">
                                Browser notifications for real-time updates
                              </p>
                            </div>
                            <button className="btn-outline-sm">Enable</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
