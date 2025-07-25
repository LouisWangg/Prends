import React, { useState, useEffect } from "react";

import "./ProfileImageSwitcher.css";

const ProfileImageSwitcher = ({ images }) => {
  // Normalize input: if not array, make it an array
  const normalizedImages = Array.isArray(images) ? images : [images];

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (normalizedImages?.length > 0) {
      setSelectedImage(normalizedImages[0]);
    }
  }, [images]);

  if (!selectedImage) return null;

  return (
    <div>
      {/* Top Large Image */}
      <div className="selectedImage">
        <img src={getImageSrc(selectedImage)} alt="Selected" />
      </div>

      {/* Bottom Thumbnails */}
      {normalizedImages.length > 1 && (
        <div className="listImages">
          {normalizedImages.map((img, index) => (
            <div key={index} onClick={() => setSelectedImage(img)}>
              <img src={getImageSrc(img)} alt={`Thumb ${index}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper to handle base64 or static imports
const getImageSrc = (img) => {
  if (!img) return "";
  return img.startsWith("data:") || img.startsWith("http")
    ? img
    : `data:image/jpeg;base64,${img}`;
};

export default ProfileImageSwitcher;
