import React, { useState } from 'react';
import '../styles/PhotoUploader.css';

function PhotoUploader(){
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result && typeof result === 'string') {
          setImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="frame">
      <div className="center">
        <div className="title">Drop File to Upload</div>
        <label htmlFor="file-input" className="file-label">
          <span className="dropzone">
            {imagePreview ? (
              <img src={imagePreview} alt="Uploaded" className="preview-image" />
            ) : (
              <img src="https://100dayscss.com/codepen/upload.svg" alt="Upload Icon" />
            )}
          </span>
          <input id="file-input" type="file" onChange={handleFileChange} required />
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
