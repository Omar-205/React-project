// src/components/ProgressPhotos/ProgressPhotos.tsx
import React, { useState } from "react";
import { progressPhotos, tipsText } from "../types/progressPhotoData";
import PhotoPair from "./PhotoPair";

const ProgressPhotos: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <div className="p-6 bg-white dark:bg-primary-dark rounded-2xl shadow-xl transition-colors duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-prof-text dark:text-text-dark">
            Progress Photos
          </h2>
          <p className="text-sm text-prof-text-secondary dark:text-text-secondary-dark">
            Visual documentation of your transformation
          </p>
        </div>
        <button
          onClick={toggleEdit}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
            isEditing
              ? "bg-success text-white"
              : "bg-black text-white hover:bg-hover dark:bg-secondary-dark dark:hover:bg-hover"
          }`}
        >
          {isEditing ? "Save Photos" : "+ Add Photos"}
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {progressPhotos.map((entry) => (
          <div
            key={entry.month}
            className="bg-light-bg dark:bg-secondary-dark p-4 rounded-xl border border-light-border dark:border-input-dark transition-colors duration-300"
          >
            <h3 className="text-center font-semibold text-primary dark:text-text-dark mb-3">
              {entry.month}
            </h3>
            <PhotoPair
              frontPhoto={entry.frontPhoto}
              sidePhoto={entry.sidePhoto}
            />
          </div>
        ))}
      </div>

      {/* Tips Rectangle */}
      <div className="bg-secondary dark:bg-secondary-dark border border-light-border dark:border-input-dark rounded-xl mt-8 p-4 transition-colors duration-300">
        <h3 className="font-semibold text-primary dark:text-text-dark mb-2">
          Tips for Progress Photos
        </h3>
        <p className="text-sm text-prof-text dark:text-text-dark">{tipsText}</p>
      </div>
    </div>
  );
};

export default ProgressPhotos;
