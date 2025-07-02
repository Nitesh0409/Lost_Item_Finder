import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Page.css";

import { useToaster } from "../../components/ui/Toaster";

const Clock = () => <span className="claim-icon">🕒</span>;
const CheckCircle = () => <span className="claim-icon">✅</span>;
const AlertCircle = () => <span className="claim-icon">⚠️</span>;
const MessageSquare = () => <span className="claim-icon">💬</span>;


const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "badge badge-pending";
    case "approved":
      return "badge badge-approved";
    case "rejected":
      return "badge badge-rejected";
    default:
      return "badge";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <Clock />;
    case "approved":
      return <CheckCircle />;
    case "rejected":
      return <AlertCircle />;
    default:
      return <Clock />;
  }
};


export default function ClaimCenterPage() {
  const [claims, setClaims] = useState([]);
  const [tab, setTab] = useState("my-claims");
  const [verifications, setVerifications] = useState([]);

  const toast = useToaster();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchClaims = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/claim/allClaims",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setClaims(data.claims);
    } catch (err) {
      console.error("Failed to fetch claims:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingVerifications = async(token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/claim/pendingVerification",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setVerifications(data.verifications);
    } catch (err) {
      console.error("Failed to fetch claims:", err);
      toast("Failed to fetch claims:", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (tab === "my-claims") {
      fetchClaims(token);
    }

    else if (tab === "pending-verification") {
      fetchPendingVerifications(token);
    }

  }, [tab]);


  return (
    <div className="claim-center-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="title-gradient">Claim Center</h1>
            <p className="subtitle">
              Track your item claims and manage communications with finders
            </p>
          </div>

          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={tab === "my-claims" ? "tab-active" : ""}
                onClick={() => setTab("my-claims")}
              >
                My Claims
              </button>
              <button
                className={tab === "pending-verification" ? "tab-active" : ""}
                onClick={() => setTab("pending-verification")}
              >
                Pending Verification
              </button>
              <button
                className={tab === "messages" ? "tab-active" : ""}
                onClick={() => setTab("messages")}
              >
                Messages
              </button>
            </div>

            {tab === "my-claims" && (
              <div className="claims-list">
                {claims.map((claim, index) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="card">
                      <div className="card-header">
                        <div>
                          <div className="card-title">{claim.itemId.title}</div>
                          <p className="card-date">
                            Submitted on{" "}
                            {new Date(claim.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={getStatusColor(claim.status)}>
                          {getStatusIcon(claim.status)}
                          {claim.status.charAt(0).toUpperCase() +
                            claim.status.slice(1)}
                        </span>
                      </div>
                      <div className="card-content">
                        <div>
                          <h4 className="section-title">
                            Matched Item's description:
                          </h4>
                          <p>{claim.itemId.description}</p>
                        </div>
                        {claim.itemId.image && (
                          <div className="claim-item-image">
                            <img src={claim.itemId.image} alt="Claim Item" />
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <h4 className="section-title">Finder Name:</h4>
                            <p>{claim.authorId.userName}</p>
                          </div>
                          <div>
                            <h4 className="section-title">Finder Contact:</h4>
                            <p>{claim.authorId.email}</p>
                          </div>
                        </div>
                        <div className="card-actions">
                          <button className="btn-outline">
                            <MessageSquare /> Message Finder
                          </button>
                          {claim.status === "approved" && (
                            <button className="btn-green">
                              Have you retrieved it?
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "pending-verification" &&
              (loading ? (
                <div>Loading...</div> // Optional: show loading spinner
              ) : verifications.length === 0 ? (
                <div className="card">
                  <div className="card-content text-center">
                    <AlertCircle className="icon-large yellow" />
                    <h3 className="card-title">No Pending Verifications</h3>
                    <p>
                      When someone claims your found item, verification requests
                      will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="verification-list">
                  {verifications.map((verification) => (
                    <div
                      key={verification._id}
                      className="card verification-card"
                    >
                      <div className="card-content">
                        <h4>Title: {verification.title}</h4>
                        <p>
                          claimed by : {verification.matchedLostItems.length}{" "}
                          users
                        </p>
                        {verification.image && (
                          <div className="item-image">
                            <img
                              src={
                                verification?.image?.path
                                  ? `http://localhost:8080/${verification.image.path.replace(
                                      /\\/g,
                                      "/"
                                    )}`
                                  : "fallback-image.png"
                              }
                              alt="verifications item"
                            />
                          </div>
                        )}
                        {/* Add "Show Details" button */}
                        <button
                          onClick={() =>
                            navigate(`/claim-details`, {
                              state: { verification },
                            })
                          }
                          className="btn btn-primary"
                        >
                          Show Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {tab === "messages" && (
              <div className="card">
                <div className="card-content text-center">
                  <MessageSquare className="icon-large blue" />
                  <h3 className="card-title">No Messages</h3>
                  <p>
                    Your conversations with finders and claimants will appear
                    here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
