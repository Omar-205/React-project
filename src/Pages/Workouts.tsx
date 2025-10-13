import { useSelector } from "react-redux";
import { History } from "../components/History";
import NavTabs from "../components/NavTabs";
import { Programs } from "../components/Programs";
import { TodaysWorkout } from "../components/TodaysWorkout";
import { WeeklyPlan } from "../components/WeeklyPlan";

export default function Workouts() {
  const titles = ["Today's Workout", "Weekly Plan", "Programs", "History"];
  const components = [
    <TodaysWorkout />,
    <WeeklyPlan />,
    <Programs />,
    <History />,
  ];
  return <div className="flex flex-col gap-4 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h3 className="font-bold text-3xl md:text-3xl mb-2 dark:text-[#f1f5f9]">Workouts
      <p className="text-slate-400  text-lg md:text-lg  dark:text-[#94a3b8]">Track your training and build strength  </p>
    </h3>
    <div className="p-4">
      <NavTabs titles={titles} components={components} />
    </div>

  </div>
}