// src/components/ProgressPhotos/PhotoPair.tsx
import React from "react";

interface PhotoPairProps {
  frontPhoto: string;
  sidePhoto: string;
}

const PhotoPair: React.FC<PhotoPairProps> = ({ frontPhoto, sidePhoto }) => {
  return (
    <div className="flex justify-around gap-3">
      <div className="flex flex-col items-center">
        <img
          src={frontPhoto}
          alt="Front"
          className="rounded-lg border border-[var(--color-light-border)] dark:border-[var(--color-input-dark)]"
        />
        <span className="text-xs text-[var(--color-text)] dark:text-[var(--color-text-dark)] mt-1">
          Front
        </span>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={sidePhoto}
          alt="Side"
          className="rounded-lg border border-[var(--color-light-border)] dark:border-[var(--color-input-dark)]"
        />
        <span className="text-xs text-[var(--color-text)] dark:text-[var(--color-text-dark)] mt-1">
          Side
        </span>
      </div>
    </div>
  );
};

export default PhotoPair;
