import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Page.css";

// Icon placeholders (replace with SVG or react-icons as needed)
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

export default function ReportLostPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    tags: "",
    dateLost: "",
    contactInfo: "",
    reward: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = ({ title, description }) => {
    alert(`${title}\n${description}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = formData.tags
    ? formData.tags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0)
    : [];

    //api call 
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/items/lost/addLostItem",
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
              "https://cdn.britannica.com/79/20279-050-ECDF21A7/mountain-gorilla-Virunga-National-Park-Democratic-Republic.jpg",
            dateLost: formData.dateLost,
            contactInfo: formData.contactInfo,
            reward: formData.reward,
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
        tags:"",
        image:"",
        dateLost: "",
        contactInfo: "",
        reward: "",
      });
    } catch (err) {
      toast({ title: "Error", description: err.message });
    }
    

    setIsSubmitting(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      tags:"",
      location: "",
      dateLost: "",
      contactInfo: "",
      reward: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="lost-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="lost-title">Report Lost Item</h1>
            <p className="lost-subtitle">
              Help us help you find your lost item by providing detailed
              information
            </p>
          </div>

          <div className="card shadow">
            <div className="card-header">
              <div className="card-title">Lost Item Details</div>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form-space">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Item Title *</label>
                    <input
                      id="title"
                      placeholder="e.g., iPhone 14 Pro"
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
                    <label htmlFor="location">Last Known Location *</label>
                    <div className="relative">
                      <span className="icon-abs">
                        <MapPinIcon />
                      </span>
                      <input
                        id="location"
                        placeholder="e.g., Central Park, NYC"
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
                    <label htmlFor="dateLost">Date Lost *</label>
                    <div className="relative">
                      <span className="icon-abs">
                        <CalendarIcon />
                      </span>
                      <input
                        id="dateLost"
                        type="date"
                        value={formData.dateLost}
                        onChange={(e) =>
                          handleInputChange("dateLost", e.target.value)
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
                    <label htmlFor="reward">Reward (Optional)</label>
                    <input
                      id="reward"
                      placeholder="e.g., $50"
                      value={formData.reward}
                      onChange={(e) =>
                        handleInputChange("reward", e.target.value)
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
                  {isSubmitting ? "Submitting..." : "Report Lost Item"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
