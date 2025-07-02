import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./claimDetails.css"; 

import { useToaster } from "../../components/ui/Toaster";

export default function ClaimDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const verification = location.state?.verification;

  const toast = useToaster();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    const fetchPendingDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:8080/api/claim/getAllDetailsPendingVerification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              matchedLostItems: verification.matchedLostItems,
            }),
          }
        );

        const data = await response.json();
        setDetails(data.matchedDetails || []);
        setSelectedClaim(data.matchedDetails?.[0] || null); // auto-select first
      } catch (err) {
        toast("Failed to fetch claim details:", "error");
        console.error("Failed to fetch claim details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDetails(); // ✅ Call the function
  }, [verification]);

  console.log(selectedClaim);

  if (!verification) {
    return <p>No verification data received.</p>;
  }

  if (loading) {
    return <p>Loading pending verification details...</p>;
  }

  return (
    <div className="claims-hub-container">
      <div className="text-center mb-8">
        <h1 className="title-gradient">Claim Hub</h1>
        <p className="subtitle">Advanced claims management system</p>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          {/* Left-top: Item info */}
          <div className="item-details-claim">
            <h2 className="item-details-title">{verification.title}</h2>
            <div className="item-details-image">
              <img
                src={`http://localhost:8080/${verification.image.path.replace("\\", "/")}`}
                alt="Verification item"
              />
            </div>
            <button
              className="btn-primary"
              onClick={() =>
                navigate(`/details/${verification._id}?type=found`)
              }
            >
              GET DETAILS
            </button>
          </div>

          <div className="listUsers">
            <h2>Active Claims</h2>
            {details.map((item) => {
              const claimant = item.claimId.claimantId;
              const date = new Date(
                item.claimId.createdAt
              ).toLocaleDateString();
              const initials = claimant.userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={item.claimId._id}
                  className={`claim-item ${
                    selectedClaim?.claimId._id === item.claimId._id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setSelectedClaim(item)}
                >
                  <div className="avatar">{initials}</div>
                  <div>
                    <h3>{claimant.userName}</h3>
                    <p>{item.claimId.itemType}</p>
                    <p className="claim-date">{date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {selectedClaim ? (
          <main className="claim-details-section">
            <div className="claim-details-header">
              <h2>Claim Details</h2>
            </div>

            <div className="claim-card">
              <div className="claimant-info">
                {/* Placeholder for avatar */}
                <div className="claimant-text">
                  <h3>{selectedClaim.claimId.claimantId.userName}</h3>
                  <div className="status-tag rejected">
                    {selectedClaim.claimId.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <div className="claim-info-item">
                  <span className="icon">📧</span>
                  <p>Email</p>
                  <p>{selectedClaim.claimId.claimantId.email}</p>
                </div>
                <div className="claim-info-item">
                  <span className="icon">📞</span>
                  <p>Phone</p>
                  <p>{selectedClaim.claimId?.contactInfo}</p>
                </div>
                <div className="claim-info-item">
                  <span className="icon">🗓️</span>
                  <p>Date</p>
                  <p>
                    {new Date(
                      selectedClaim.claimId.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="claim-info-item">
                  <span className="icon">💰</span>
                  <p>Amount</p>
                  <p>{selectedClaim.claimId?.prize} Add LATER</p>
                </div>
              </div>

              <div className="location-info">
                <span className="icon">📍</span>
                <p>Location</p>
                <p>Residential Area, Block A</p>
              </div>

              <div className="description-section">
                <span className="icon">📄</span>
                <p>Description</p>
                <p>{selectedClaim.claimId.description}</p>
              </div>

              <div className="evidence">
                <p>Proof images</p>
                <img
                  className="evidence-image"
                  src={selectedClaim.claimId.proof}
                  alt="Proof"
                />
              </div>
            </div>
          </main>
        ) : null}
      </div>
    </div>
  );
};
