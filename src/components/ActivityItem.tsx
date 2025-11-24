import React, { useState } from "react";
import type { ActivityType } from "../types/activityData";
import { Dumbbell } from "lucide-react";

interface ActivityItemProps {
  activity: ActivityType;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const [status, setStatus] = useState(activity.status);

  const toggleStatus = () => {
    const newStatus = status === "Completed" ? "Pending" : "Completed";
    setStatus(newStatus);
    console.log(`${activity.title} status changed to ${newStatus}`);
  };

  const isCompleted = status === "Completed";

  return (
    <div
      className={`flex justify-between items-center w-full border border-gray-300 rounded-lg p-4 transition-colors duration-300 
      ${
        isCompleted
          ? "bg-input dark:bg-input-unlocked-dark"
          : "bg-neutral-300 dark:bg-input-locked-dark"
      }`}
    >
      {/* Left side: icon + info */}
      <div className="flex items-center gap-3">
        <div className="bg-green-500/10 p-2 rounded-lg">
          <Dumbbell className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h5 className="font-bold text-prof-text dark:text-text-dark">
            {activity.title}
          </h5>
          <p className="text-sm text-prof-text-secondary dark:text-text-secondary-dark">
            {activity.date} • {activity.duration}
          </p>
        </div>
      </div>

      {/* Right side: calories + button */}
      <div className="flex flex-col items-center justify-between h-full">
        <p className="text-prof-text dark:text-text-dark font-semibold mb-2">
          {activity.calories} kcal
        </p>
        <button
          onClick={toggleStatus}
          className={`text-white rounded-lg px-4 py-1 text-sm font-medium transition-colors duration-200
            ${
              isCompleted
                ? "bg-green-500 dark:bg-green-500 hover:bg-green-600"
                : "bg-black dark:bg-primary hover:bg-slate-900"
            }`}
        >
          {isCompleted ? "Completed" : "Mark Done"}
        </button>
      </div>
    </div>
  );
};

export default ActivityItem;
