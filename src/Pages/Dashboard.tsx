import "react-circular-progressbar/dist/styles.css";
import RoundedProgressBar from "../components/RoundedProgressBar";
import RecCard from "../components/RecCard";
import Quick from "../components/Quick";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import DailyStreak from "../components/Dashboard Components/DailyStreak";
import ThisWeek from "../components/Dashboard Components/ThisWeek";
import CaloriesBurned from "../components/Dashboard Components/CaloriesBurned";


interface RecData {
  given: number;
  statement: string;
  icon: JSX.Element;
}


const recData: RecData[] = [
  // { given: 0, statement: "Day streak", icon: <i className="fa-solid fa-bolt text-orange-500"></i> },
  //{ given: 0, statement: "This week", icon: <i className="fa-solid fa-calendar-week text-blue-500"></i> },
  // { given: 2400, statement: "Calories burned", icon: <i className="fa-solid fa-fire text-red-500"></i> },
  { given: 0, statement: "Goal achieved", icon: <i className="fa-solid fa-trophy text-green-500"></i> },
];


export default function Dashboard() {
  // check if today's workout is completed
  const userData = useSelector((state: RootState) => state.Authantication.user);
  let todayWorkoutCompleted = true;
  const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
  if (!userData?.workoutData || !userData.workoutData?.history || !Object.keys(userData.workoutData.history).includes(today.toString())) {
    todayWorkoutCompleted = false;
  }

  const user = useSelector((state: RootState) => state.Authantication.user);
  return <div className="flex flex-col gap-8 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h3 className="font-bold text-3xl md:text-4xl mb-2 dark:text-[#f1f5f9]">Good morning, {user?.fullName}! 👋</h3>
    <p className="text-slate-400 mb-6 dark:text-[#94a3b8]">Ready to crush your fitness goals today?</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1vw] gap-y-[3vw]">

      <RoundedProgressBar title="Daily Calories" total={2200} progress={1850}
        type={"Kcal"} color="#FF6E00"
        svg={<i className="fa-solid fa-fire-flame-curved" style={{ color: "#FF6E00" }}></i>}
      />
      <RoundedProgressBar title="Today's Workout" total={1} progress={todayWorkoutCompleted ? 1 : 0}
        type={"Completed"} color="#00B97F"
        svg={<i className="fa-solid fa-dumbbell" style={{ color: "#00B97F" }}></i>}
      />
      <div className="sm:max-lg:col-span-full">
        <RoundedProgressBar title="Daily Steps" total={10000} progress={8500}
          type={"steps"} color="#217BFF"
          svg={<i className="fa-solid fa-heart-pulse" style={{ color: "#217BFF" }}></i>}
        />

      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full ">
      <DailyStreak />
      <ThisWeek />
      <CaloriesBurned />
      {recData.map((item, index) => (
        <RecCard
          key={index}
          given={item.given}
          statement={item.statement}
          icon={item.icon}
        />
      ))}
    </div>
    <Quick />





  </div>
}