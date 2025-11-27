import ButtonsDash from "./ButtonsDash";
import Workouts from "../Pages/Workouts";
import Nutrition from "../Pages/Nutrition";
import Progress from "../Pages/Progress";
import Profile from "../Pages/Profile";

const quickActions = [
  { path: "trainee/workouts", label: "Start Workout", icon: "fa-dumbbell", bg: "bg-green-400", element: <Workouts /> },
  { path: "trainee/nutrition", label: "Log Meal", icon: "fa-fire", bg: "bg-orange-500", element: <Nutrition /> },
  { path: "trainee/progress", label: "View Progress", icon: "fa-bullseye", bg: "bg-blue-400", element: <Progress /> },
  { path: "trainee/profile", label: "View Profile", icon: "fa-user", bg: "bg-violet-500", element: <Profile /> },
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

      
      <ButtonsDash actions={quickActions} />

    </div>
  );
}
