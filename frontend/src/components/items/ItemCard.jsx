import React from "react";
import { MapPin, Calendar, DollarSign } from "react-feather";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import "./ItemCard.css";

export default function ItemCard({ item, type }) {
  const navigate = useNavigate();

  const date = new Date(
    type === "lost" ? item.dateLost : item.dateFound
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateLabel = type === "lost" ? "Lost on" : "Found on";

  const token = localStorage.getItem("token");
  let currUser = null;
  if (token) {
    const decode = jwtDecode(token);
    currUser = decode.userId;
  }

  const isOwner = item.userId === currUser;

  const imageUrl = item.image?.path
    ? `http://localhost:8080/${item.image.path.replace("\\", "/")}`
    : "fallback-image-url.png";

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          src={imageUrl}
          alt={item.title}
          style={{ maxWidth: "100%", objectFit: "inherit" }}
          className="card-image"
        />
        <div className="badge badge-category">{item.category}</div>
        <div
          className={`badge badge-status ${
            item.status === "active" ? "badge-active" : "badge-inactive"
          }`}
        >
          {item.status}
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.description}</p>

        <div className="card-info">
          <div className="info-item">
            <MapPin size={16} />
            <span>{item.location}</span>
          </div>

          <div className="info-item">
            <Calendar size={16} />
            <span>
              {dateLabel} {date}
            </span>
          </div>

          {item.reward && type === "lost" && (
            <div className="info-item reward">
              <DollarSign size={16} />
              <span>${item.reward} reward</span>
            </div>
          )}
        </div>

        <div className="card-actions">
          <button
            className="detailsBtn"
            onClick={() => navigate(`/details/${item._id}?type=${type}`)}
          >
            {" "}
            Details
          </button>

          {/* {!isOwner && (
            <button
              className={`btn-primary ${
                type === "lost" ? "btn-lost" : "btn-found"
              }`}
            >
              {type === "lost" ? "Claim finding" : "Claim Item"}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
