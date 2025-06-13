import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./details.css";

function Icon({ name, className = "" }) {
  const icons = {
    arrowLeft: "←",
    calendar: "📅",
    clock: "⏰",
    dollar: "💲",
    mapPin: "📍",
    message: "💬",
    phone: "📞",
    star: "⭐",
    navigation: "🧭",
    eye: "👁️",
    share: "🔗",
  };
  return <span className={`icon ${className}`}>{icons[name] || "❔"}</span>;
}

export default function DetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [finder, setFinder] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState("details");
  const type = queryParams.get("type");

  const token = localStorage.getItem("token");

  let currUser = null;
  // console.log(token);
  if (token) {
    const decode = jwtDecode(token);
    currUser = decode.userId;
    // console.log(currUser);
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/items/${type}/${type}Item/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setItem(data.item);
      } catch (err) {
        console.error("Failed to fetch item details:", err);
      }
    };
    fetchItem();
  }, [id, type]);
  
  useEffect(() => {
    const fetchFinder = async () => {
      if (!item?.userId) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/user/getUser/${item.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // if (!res.ok) throw new Error("user not found");
        const data = await res.json();
        // console.log(data);
        setFinder(data.user);
      } catch (err) {
        console.error("Failed to fetch item details:", err);
      }
    };
    fetchFinder();
  }, [item]);

  if (!item) return <div className="lf-loading">Loading...</div>;

  // if (!finder) return <div className="lf-loading">Loading user...</div>;

  const isOwner = item.userId === currUser;


  const handleEdit = async () => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this item ?"
    );
    if (!confirmEdit) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/items/${type}/${type}Item/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update");
      }

      const result = await response.json();
      alert(result.message);
      window.location.href = `/${type}-items`;
    } catch (error) {
      console.error("Edit failed:", error.message);
      alert("Failed to Edit item.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/items/${type}/${type}Item/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete");
      }

      const result = await response.json();
      alert(result.message);
      window.location.href = `/${type}-items`;
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete item.");
    }
  };


  return (
    <div className="lf-item-bg">
      <div className="lf-item-content">
        {/* Main Content */}
        <div className="lf-main-section">
          {/* Item Image and Basic Info */}
          <div className="lf-details-card">
            <div className="lf-item-main-grid">
              <div className="lf-item-img-wrap">
                <div className="lf-item-img">
                  <img
                    src={
                      item.image || "https://placehold.co/400x400?text=No+Image"
                    }
                    alt={item.title}
                  />
                  <span className="lf-badge lf-badge-green lf-badge-abs">
                    {type === "lost" ? "Lost Item" : "Found Item"}
                  </span>
                </div>
              </div>
              <div className="lf-item-info">
                <h2 className="lf-item-title">{item.title}</h2>
                <p className="lf-item-desc">{item.description}</p>
                <div className="lf-item-meta-grid">
                  <div>
                    <Icon name="mapPin" className="lf-text-blue" />
                    <span>{item.location || "Unknown"}</span>
                  </div>
                  <div>
                    <Icon name="calendar" className="lf-text-purple" />
                    <span>
                      <span>
                        {new Date(
                          type === "lost" ? item.dateLost : item.dateFound
                        ).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                  <div>
                    <Icon name="clock" className="lf-text-orange" />
                    <span>2 days ago</span>
                  </div>
                  {type === "lost" && (
                    <div>
                      <Icon name="dollar" className="lf-text-yellow" />
                      <span className="lf-bold">
                        ${item.reward || 0} reward
                      </span>
                    </div>
                  )}
                </div>
                <div className="lf-item-btn-row">
                  <button className="lf-btn lf-btn-cyan">
                    <Icon name="message" className="lf-mr-2" />
                    {type === "lost" ? "Claim Finding" : "Claim Item"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="lf-details-card">
            <div className="lf-tabs">
              <button
                className={`lf-tab-btn${
                  activeTab === "details" ? " active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`lf-tab-btn${
                  activeTab === "location" ? " active" : ""
                }`}
                onClick={() => setActiveTab("location")}
              >
                Location & Map
              </button>
              <button
                className={`lf-tab-btn${
                  activeTab === "timeline" ? " active" : ""
                }`}
                onClick={() => setActiveTab("timeline")}
              >
                Timeline
              </button>
            </div>

            <div className="lf-tab-content">
              {activeTab === "details" && (
                <div>
                  <h3 className="lf-tab-title">Item Description</h3>
                  <p>
                    {item.description || "No detailed description available."}
                  </p>
                  <div className="lf-separator" />
                  <div className="lf-details-grid">
                    <div>
                      <h4>Category</h4>
                      <p>{item.category || "Unknown"}</p>
                    </div>
                    {/* <div>
                      <h4>Condition</h4>
                      <p>{item.condition || "Not specified"}</p>
                    </div>
                    <div>
                      <h4>Color</h4>
                      <p>{item.color || "N/A"}</p>
                    </div>
                    <div>
                      <h4>Size</h4>
                      <p>{item.size || "N/A"}</p>
                    </div> */}
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div>
                  <h3 className="lf-tab-title">Location Details</h3>
                  <div className="lf-meta-row">
                    <Icon name="mapPin" className="lf-text-blue" />
                    <span>Found at: {item.location}</span>
                  </div>
                  <div className="lf-meta-row">
                    <Icon name="navigation" className="lf-text-green" />
                    <span>Coordinates: {item.coordinates || "N/A"}</span>
                  </div>
                  <div className="lf-map-placeholder">
                    <Icon name="mapPin" className="lf-map-icon" />
                    <h4>Interactive Map</h4>
                    <p>Map integration coming soon...</p>
                    <div className="lf-map-info-row">
                      <div>
                        <div className="lf-bold">Distance</div>
                        <div>0.5 miles away</div>
                      </div>
                      <div>
                        <div className="lf-bold">Travel Time</div>
                        <div>~10 min walk</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div>
                  <h3 className="lf-tab-title">Item Timeline</h3>
                  <div className="lf-timeline">
                    <div className="lf-timeline-row">
                      <span className="lf-timeline-dot green"></span>
                      <div>
                        <div className="lf-bold">
                          {type === "lost" ? "Lost Item" : "Found Item"}
                        </div>
                        <div className="lf-timeline-date">
                          {new Date(
                            type === "lost" ? item.dateLost : item.dateFound
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div>
                          at {item.location}
                        </div>
                      </div>
                    </div>
                    <div className="lf-timeline-row">
                      <span className="lf-timeline-dot blue"></span>
                      <div>
                        <div className="lf-bold">Posted Online</div>
                        <div className="lf-timeline-date">
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                        <div>Listed on Lost & Found platform</div>
                      </div>
                    </div>
                    {type === "lost" && (
                      <div className="lf-timeline-row">
                        <span className="lf-timeline-dot yellow"></span>
                        <div>
                          <div className="lf-bold">Reward Offered</div>
                          <div className="lf-timeline-date">
                            {new Date(item.createdAt).toLocaleString()}
                          </div>
                          <div>${item.reward || 0} reward set by finder</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lf-sidebar">
          {/* Finder Information */}
          <div className="lf-details-card">
            <h3 className="lf-sidebar-title">Finder Information</h3>
            <div className="lf-finder-row">
              <div className="lf-avatar">
                {(() => {
                  if (!finder || !finder.userName) return "??";

                  const nameParts = finder.userName.trim().split(/\s+/);

                  if (nameParts.length >= 2) {
                    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
                  }

                  return nameParts[0].substring(0, 2).toUpperCase();
                })()}
              </div>
              <div>
                <p className="lf-bold">
                  {finder?.userName || "User not found"}
                </p>
                <div className="lf-finder-rating">
                  <Icon name="star" className="lf-text-yellow" />
                  <span>{finder?.rating}</span>
                </div>
              </div>
            </div>
            <div className="lf-finder-meta">
              <div>
                <span>Member since</span>
                <span className="lf-bold">
                  {new Date(finder?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span>Items found</span>
                <span className="lf-bold">
                  {finder?.itemsReportedFound?.length || 0}
                </span>
              </div>
              {/* <div>
                <span>Response time</span>
                <span className="lf-bold">~2 hours</span>
              </div> */}
            </div>
            <button className="lf-btn lf-btn-purple lf-w-full">
              <Icon name="message" className="lf-mr-2" />
              Message Finder
            </button>
          </div>

          {/* Quick Actions */}
          <div className="lf-details-card">
            <h3 className="lf-sidebar-title">Quick Actions</h3>
            {!isOwner && (
              <button className="lf-btn lf-btn-cyan lf-w-full">
                Claim This Item
              </button>
            )}
            <button className="lf-btn lf-btn-outline lf-w-full">
              Save to Favorites
            </button>
            <button className="lf-btn lf-btn-outline lf-w-full">
              Report Issue
            </button>
            {isOwner && (
              <button
                className="lf-btn lf-btn-alert lf-w-full"
                onClick={handleEdit}
              >
                Edit Item
              </button>
            )}
            {isOwner && (
              <button
                className="lf-btn lf-btn-alert lf-w-full"
                onClick={handleDelete}
              >
                Delete Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
