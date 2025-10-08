import ButtonsDash from "./ButtonsDash";
import Workouts from "../Pages/Workouts";
import Nutrition from "../Pages/Nutrition";
import Progress from "../Pages/Progress";
import { Routes, Route,Navigate } from "react-router-dom";
import StopWatches from "../Pages/StopWatches";

const quickActions = [
  { path: "workouts", label: "Start Workout", icon: "fa-dumbbell", bg: "bg-green-400", element: <Workouts /> },
  { path: "nutrition", label: "Log Meal", icon: "fa-fire", bg: "bg-red-500", element: <Nutrition /> },
  { path: "progress", label: "View Progress", icon: "fa-bullseye", bg: "bg-blue-400", element: <Progress /> },
  { path: "timer", label: "Set Timer", icon: "fa-stopwatch", bg: "bg-violet-500", element: <StopWatches /> },
];

export default function Quick() {
  return (
    <div
      className="bg-menu-white dark:bg-primary-dark
      border-light-border dark:border-transparent
      border-1 rounded-lg p-6 flex flex-col gap-4 w-full "
    >
      <h3 className="font-bold text-xl dark:text-white">Quick Actions</h3>
      <p className=" dark:text-text-dark">Jump to your most common tasks</p>

      {/* Buttons */}
      <ButtonsDash actions={quickActions} />

    </div>
  );
}
