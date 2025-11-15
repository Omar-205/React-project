import React, { useState } from "react";
import PhotoPair from "./PhotoPair";
import { uploadImageToImgbb } from "../utils/helper";
import AlertCard from "./AlertCard";
import ImagePopup from "./imagePopup";
import { useDispatch, useSelector} from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addProgressPhoto } from "../store/slices/progressSlice";
import { updateUser } from "../store/slices/authSlice";

interface ProgressEntry {
  date: string;
  frontPhoto: string;
  sidePhoto: string;
}

const ProgressPhotos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const progress = useSelector((state: RootState) => state.Authantication.user?.progress);
  const uid = useSelector((state: RootState) => state.Authantication.uid);
  const dispatch = useDispatch<AppDispatch>();
  const tipsText = `1. Consistency is Key: Take photos at regular intervals, such as weekly or monthly, to accurately track your progress over time.`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!frontPhoto || !sidePhoto || !date) {
      setAlert({ message: "Please fill all fields and upload both photos.", variant: "error" });
      return;
    }
  
    try {
      setIsUploading(true);
  
      const [frontUrl, sideUrl] = await Promise.all([
        uploadImageToImgbb(frontPhoto),
        uploadImageToImgbb(sidePhoto),
      ]);
  
      const newEntry: ProgressEntry = {
        date: date.trim(),
        frontPhoto: frontUrl,
        sidePhoto: sideUrl,
      };
      
      console.log("New Progress Entry:", newEntry);
      // 👉 Save locally in Redux
      dispatch(addProgressPhoto(newEntry));

      dispatch(updateUser({ 
        uid: uid as string, 
        data: { 
          progress: { 
            progressPhotos: [...(progress?.progressPhotos || []), newEntry],
            progRecData: progress?.progRecData || null, // Provide default or existing data
            weightData: progress?.weightData || null, // Provide default or existing data
            weightStats: progress?.weightStats || null,// Provide default or existing data
            weeklyProgressData: progress?.weeklyProgressData || null // Provide default or existing data
          } 
        } 
      }));
  
  
      setAlert({ message: "Photos uploaded successfully!", variant: "success" });
      setIsModalOpen(false);
  
      setFrontPhoto(null);
      setSidePhoto(null);
      setDate("");
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to upload photos. Please try again.", variant: "error" });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
  
    const dateObj = new Date(value);
  
    const formattedDate = dateObj.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  
    setDate(formattedDate);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-primary-dark rounded-2xl shadow-xl transition-colors duration-300 relative">
      {/* Alert */}
      {alert && (
        <div className="absolute top-4 right-4 z-50">
          <AlertCard
            variant={alert.variant}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Header */}
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
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 bg-black text-white hover:bg-hover dark:bg-secondary-dark dark:hover:bg-hover"
        >
          + Add Photos
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {(progress?.progressPhotos ?? []).map((entry) => (
          <div
            key={entry.date}
            className="bg-light-bg dark:bg-secondary-dark p-4 rounded-xl border border-light-border dark:border-input-dark transition-colors duration-300"
          >
            <h3 className="text-center font-semibold text-primary dark:text-text-dark mb-3">
              {entry.date}
            </h3>
            {entry.frontPhoto && entry.sidePhoto && (
              <PhotoPair frontPhoto={entry.frontPhoto} sidePhoto={entry.sidePhoto} />
            )}
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

      {/* Popup Modal */}
      <ImagePopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Progress Photos"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo Date
            </label>
            <input
              type="date"
              onChange={handleDateChange}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-transparent"
              required
            />
            {date && (
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Selected: {date}
              </p>
            )}
          </div>



          {/* Front Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Front Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFrontPhoto(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              required
            />
          </div>

          {/* Side Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Side Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSidePhoto(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-hover"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Photos"}
            </button>
          </div>
        </form>
      </ImagePopup>
    </div>
  );
};

export default ProgressPhotos;
