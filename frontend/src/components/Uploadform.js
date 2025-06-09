import React, { useState } from "react";
import "./Uploadform.css";

const Uploadform = ({ onFileUpload, uploadedFileName }) => {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (!file) return;

  // Use the prop from App.js to handle the upload
   onFileUpload(file);
};


  
  return (
    <div className="header-container">
      {/* Left: Logo */}
      <div className="logo-section">
        <img src="/ai-planet-logo.png" alt="AI Planet Logo" className="logo" />
      </div>

      <div className="spacer" />

      {/* Right: Upload Button */}
      <div className="upload-section">
        {uploadedFileName && (
          <span className="filename">{uploadedFileName}</span>
        )}
        <label htmlFor="file-upload" className="upload-button">
          <span className="plus-icon">＋</span> Upload PDF
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          hidden
        />
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Uploadform;
