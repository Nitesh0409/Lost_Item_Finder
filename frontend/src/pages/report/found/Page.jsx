import React, { useState , useEffect, useRef} from "react";
import { motion } from "framer-motion";
import PhotoUploader from "../../../components/items/imageUpload";
import { useToaster } from "../../../components/ui/Toaster";
import "./Page.css";

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

const predefinedLocations = [
  { name: "Knowledge Tree", coordinates: [26.474, 73.113] },
  { name: "Lecture Hall Complex (LHC)", coordinates: [26.4746, 73.1135] },
  { name: "Academic Block", coordinates: [26.4748, 73.1145] },
  { name: "Main Gate", coordinates: [26.4729, 73.1115] },
  { name: "Central Library", coordinates: [26.4743, 73.1142] },
  { name: "Mess Block", coordinates: [26.4752, 73.1122] },
  { name: "Hostels Area", coordinates: [26.4755, 73.111] },
  { name: "Sports Complex", coordinates: [26.4732, 73.1155] },
  { name: "SAC (Student Activity Centre)", coordinates: [26.4747, 73.1121] },
  { name: "Shopping Complex", coordinates: [26.4741, 73.1119] },
  { name: "Guest House", coordinates: [26.4736, 73.1107] },
  { name: "Admin Block", coordinates: [26.474, 73.1137] },
];


export default function ReportFoundPage() {
  const [imageFile, setImageFile] = useState(null);

  const toast = useToaster();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    coordinates: [],
    tags:"",
    dateFound: "",
    contactInfo: "",
    safeLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = formData.tags
      ? formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("location", formData.location);
      form.append("coordinates", JSON.stringify(formData.coordinates));
      form.append("tags", JSON.stringify(tagsArray));
      form.append("dateFound", formData.dateFound);
      form.append("contactInfo", formData.contactInfo);
      form.append("safeLocation", formData.safeLocation);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const response = await fetch(
        "http://localhost:8080/api/items/found/addFoundItem",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!response.ok) toast("Submission failed","error");

      const data = await response.json();

      toast(
        `${
          data.message || "Claim submitted"
        } — We'll notify you if someone finds a matching item.`,
        "success"
      );

      setTimeout(() => {
        navigate("/found-items");
      }, 3510);

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        coordinates: [],
        tags: "",
        dateFound: "",
        contactInfo: "",
        safeLocation: "",
      });
      setImageFile(null);

    } catch (err) {
      toast("not able to submit","error");
    }

    setIsSubmitting(false);
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
                      <select
                        id="location"
                        className="input input-icon"
                        value={formData.location}
                        onChange={(e) => {
                          const selectedName = e.target.value;
                          const selected = predefinedLocations.find(
                            (loc) => loc.name === selectedName
                          );
                          if (selected) {
                            handleInputChange("location", selected.name);
                            handleInputChange(
                              "coordinates",
                              selected.coordinates
                            );
                          }
                        }}
                        required
                      >
                        <option value="">Select location</option>
                        {predefinedLocations.map((loc, index) => (
                          <option key={index} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
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

                <div className="form-group-image">
                  <PhotoUploader onImageSelect={setImageFile} />
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
