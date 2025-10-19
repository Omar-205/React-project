import React from "react";
import { activityData } from "../types/activityData";
import ActivityItem from "./ActivityItem";

const Activity: React.FC = () => {
  return (
    <div className="w-full shadow-xl rounded-lg p-4 bg-white dark:bg-primary-dark">
      <h4 className="text-prof-text dark:text-text-dark text-lg mb-2">
        <i className="fa-solid fa-dumbbell mr-2"></i>Recent Activity
      </h4>
      <p className="text-prof-text-secondary dark:text-text-secondary-dark mb-4">
        Your workout and nutrition history
      </p>

      <div className="flex flex-col gap-4">
        {activityData.map((item, index) => (
          <ActivityItem key={index} activity={item} />
        ))}
      </div>
    </div>
  );
};

export default Activity;
