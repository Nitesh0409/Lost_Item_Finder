import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Page.css";

const Clock = () => <span className="claim-icon">🕒</span>;
const CheckCircle = () => <span className="claim-icon">✅</span>;
const AlertCircle = () => <span className="claim-icon">⚠️</span>;
const MessageSquare = () => <span className="claim-icon">💬</span>;

const mockClaims = [
  {
    id: 1,
    itemTitle: "iPhone 14 Pro",
    status: "pending",
    submittedDate: "2024-01-15",
    matchedItem: "Black iPhone found at Central Park",
    finderContact: "john.doe@email.com",
  },
  {
    id: 2,
    itemTitle: "Black Leather Wallet",
    status: "approved",
    submittedDate: "2024-01-10",
    matchedItem: "Wallet with ID cards found at Times Square",
    finderContact: "jane.smith@email.com",
  },
  {
    id: 3,
    itemTitle: "Blue Backpack",
    status: "rejected",
    submittedDate: "2024-01-08",
    matchedItem: "Backpack found at subway station",
    finderContact: "mike.wilson@email.com",
  },
];

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
  const [claims] = useState(mockClaims);
  const [tab, setTab] = useState("my-claims");

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
                          <div className="card-title">{claim.itemTitle}</div>
                          <p className="card-date">
                            Submitted on {claim.submittedDate}
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
                          <h4 className="section-title">Matched Item:</h4>
                          <p>{claim.matchedItem}</p>
                        </div>
                        <div>
                          <h4 className="section-title">Finder Contact:</h4>
                          <p>{claim.finderContact}</p>
                        </div>
                        <div className="card-actions">
                          <button className="btn-outline">
                            <MessageSquare /> Message Finder
                          </button>
                          {claim.status === "approved" && (
                            <button className="btn-green">
                              Arrange Pickup
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "pending-verification" && (
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
            )}

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
