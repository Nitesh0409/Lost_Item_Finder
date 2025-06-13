import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Page.css";

const UploadIcon = () => <span className="icon-large">⬆️</span>;
const MapPinIcon = () => <span className="icon">📍</span>;
const CalendarIcon = () => <span className="icon">📅</span>;

const categories = [
  "Electronics",
  "Documents",
  "Jewelry",
  "Clothing",
  "Bags",
  "Keys",
  "Pets",
  "Sports Equipment",
  "Other",
];

export default function ReportFoundPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    tags:"",
    dateFound: "",
    contactInfo: "",
    safeLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy toast (replace with your own toast library or alert)
  const toast = ({ title, description }) => {
    alert(`${title}\n${description}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = formData.tags
      ? formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];
    // API call
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/items/found/addFoundItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            location: formData.location,
            tags: tagsArray,
            image:
              "https://as1.ftcdn.net/jpg/03/13/09/10/1000_F_313091018_iMzn3eoJzYUFOSHMVMau41AuNiWfswAQ.jpg",
            dateFound: formData.dateFound,
            contactInfo: formData.contactInfo,
            safeLocation: formData.safeLocation,
          }),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      const data = await response.json();
      toast({
        title: data.message || "Lost item reported successfully!",
        description: "We'll notify you if someone finds a matching item.",
      });

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        tags: "",
        image: "",
        dateLost: "",
        contactInfo: "",
        safeLocation: "",
      });
    } catch (err) {
      toast({ title: "Error", description: err.message });
    }

    setIsSubmitting(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      tags: "",
      dateFound: "",
      contactInfo: "",
      safeLocation: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="found-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="form-wrapper"
        >
          <div className="text-center mb-8">
            <h1 className="found-title">Report Found Item</h1>
            <p className="found-subtitle">
              Help reunite someone with their lost item by reporting what you
              found
            </p>
          </div>

          <div className="card shadow">
            <div className="card-header">
              <div className="card-title">Found Item Details</div>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form-space">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Item Title *</label>
                    <input
                      id="title"
                      placeholder="e.g., Black Leather Wallet"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      required
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      required
                      className="input"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    placeholder="Provide detailed description including color, brand, model, distinctive features..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    required
                    className="input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Location Found *</label>
                    <div className="relative">
                      <span className="icon-abs">
                        <MapPinIcon />
                      </span>
                      <input
                        id="location"
                        placeholder="e.g., Times Square, NYC"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="input input-icon"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateFound">Date Found *</label>
                    <div className="relative">
                      <span className="icon-abs">
                        <CalendarIcon />
                      </span>
                      <input
                        id="dateFound"
                        type="date"
                        value={formData.dateFound}
                        onChange={(e) =>
                          handleInputChange("dateFound", e.target.value)
                        }
                        className="input input-icon"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags (Optional)</label>
                  <small className="text-muted">
                    Use commas to separate multiple tags
                  </small>
                  <input
                    id="tags"
                    placeholder="e.g., black, wallet, leather, brand name"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactInfo">Contact Information *</label>
                    <input
                      id="contactInfo"
                      placeholder="Email or phone number"
                      value={formData.contactInfo}
                      onChange={(e) =>
                        handleInputChange("contactInfo", e.target.value)
                      }
                      required
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="safeLocation">Safe Storage Location</label>
                    <input
                      id="safeLocation"
                      placeholder="Where is the item stored safely?"
                      value={formData.safeLocation}
                      onChange={(e) =>
                        handleInputChange("safeLocation", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Photos (Optional)</label>
                  <div className="photo-upload">
                    <UploadIcon />
                    <p className="photo-text">
                      Click to upload photos of the item
                    </p>
                    <p className="photo-subtext">PNG, JPG up to 10MB each</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Report Found Item"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
