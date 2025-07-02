import React, { useRef, useState, useEffect } from "react";

import { useToaster } from "../ui/Toaster";

const UploadIcon = () => <span className="icon-large">⬆️</span>;

export default function PhotoUploader({ onImageSelect }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const toast = useToaster();

  // Generate preview URL
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Clean up the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
        onImageSelect(file);
    } else {
      toast("File is too large (max 10MB)","error");
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  return (
    <div className="form-group">
      <label>Photos (Optional)</label>

      {!selectedFile && (
        <div
          className="photo-upload"
          onClick={handleDivClick}
          style={{ cursor: "pointer" }}
        >
          <UploadIcon />
          <p className="photo-text">Click to upload photos of the item</p>
          <p className="photo-subtext">PNG, JPG up to 10MB each</p>
        </div>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {selectedFile && preview && (
        <div
          className="previewImage"
          style={{
            marginTop: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "250px",
              maxHeight: "250px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            onClick={handleRemove}
            style={{
              marginTop: "12px",
              padding: "6px 12px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e04344")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
