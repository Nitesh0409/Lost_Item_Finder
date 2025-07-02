import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 

import PhotoUploader from "../../../components/items/imageUpload";
import { useToaster } from "../../../components/ui/Toaster";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UploadIcon = () => <span className="icon-large">⬆️</span>;

export default function ReportClaimPage() {
  const navigate = useNavigate();
  const toast = useToaster();
  
  const [proof, setProof] = useState(null);

  const [searchParams] = useSearchParams();

  const itemId = searchParams.get("itemId");
  const itemType = searchParams.get("itemType");
  const authorId = searchParams.get("authorId");

  const [formData, setFormData] = useState({
    description: "",
    contactInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      form.append("itemId", itemId);
      form.append("itemType", itemType);
      form.append("description", formData.description);
      form.append("contactInfo", formData.contactInfo);
      form.append("authorId", authorId);

      if (proof) {
        form.append("proof", proof);
      }

      const response = await fetch(
        "http://localhost:8080/api/claim/createClaim",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!response.ok) {
        toast("Submission failed","error");
      }

      const data = await response.json();
      toast(
        `${data.message || "Claim submitted"} — you will get a response soon.`,
        "success"
      );
      

      setFormData({
        description: "",
        contactInfo: "",
      });

      setProof(null);

      setTimeout(() => {
        navigate(
          `/details/${itemId}?type=${itemType == "LostItem" ? "lost" : "found"}`
        );
      }, 3000);
      
      
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
            <h1 className="found-title">Claim a Found Item</h1>
            <p className="found-subtitle">
              Please provide a detailed description and any supporting proof to
              claim the item.
            </p>
          </div>

          <div className="card shadow">
            <div className="card-header">
              <div className="card-title">Claim Details</div>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form-space">
                <div className="form-group">
                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Explain why you believe it belongs to you"
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
                    <label htmlFor="contactInfo">
                      Contact Information (optional)
                    </label>
                    <input
                      id="contactInfo"
                      placeholder="Enter your email or phone number"
                      value={formData.contactInfo}
                      onChange={(e) =>
                        handleInputChange("contactInfo", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group-image">
                  <PhotoUploader onImageSelect={setProof} />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Claim"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  
}
