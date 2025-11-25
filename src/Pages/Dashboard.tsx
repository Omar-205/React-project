import "react-circular-progressbar/dist/styles.css";
import RoundedProgressBar from "../components/RoundedProgressBar";
import Quick from "../components/Quick";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import DailyStreak from "../components/Dashboard Components/DailyStreak";
import ThisWeek from "../components/Dashboard Components/ThisWeek";
import CaloriesBurned from "../components/Dashboard Components/CaloriesBurned";
import { mealPlans } from "../types/mealPlansData";
import GoalAchieved from "../components/Dashboard Components/GoalAchieved";
import {getToady} from "../utils/helper.ts";



export default function Dashboard() {
  // check if today's workout is completed
  const userData = useSelector((state: RootState) => state.Authantication.user);
  const authData = useSelector((state: RootState) => state.Authantication);
  let todayWorkoutCompleted = true;
  const todayStamp = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
  if (!userData?.workoutData || !userData.workoutData?.history || !Object.keys(userData.workoutData.history).includes(todayStamp.toString())) {
    todayWorkoutCompleted = false;
  }
  // get the consumed calories from nutrition data
  const selectedPlan = authData.user?.nutritionData?.selectedPlan;
  const plan = selectedPlan ? mealPlans[selectedPlan] : mealPlans[Object.keys(mealPlans)[0]];
  const today = getToady()
  const todayHistory = authData.user?.nutritionData.history?.[today] || {};
  const consumedCalories = plan.meals
    .filter(meal => todayHistory[meal.name as keyof typeof todayHistory])
    .reduce((sum, meal) => sum + (meal.calories || 0), 0);

  const user = useSelector((state: RootState) => state.Authantication.user);
  const fullName = user?.fullName.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(' ')

  function Abs(value: number): number {
    return Math.abs(value);
  }

  return <div className="flex flex-col gap-8 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h3 className="font-bold text-3xl md:text-4xl mb-2 dark:text-[#f1f5f9]">Good morning, {fullName}! 👋</h3>
    <p className="text-slate-400 mb-6 dark:text-[#94a3b8]">Ready to crush your fitness goals today?</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1vw] gap-y-[3vw]">

      <RoundedProgressBar title="Daily Calories" total={plan.dailyCalories} progress={consumedCalories}
        type={"Kcal"} color="#FF6E00"
        svg={<i className="fa-solid fa-fire-flame-curved" style={{ color: "#FF6E00" }}></i>}
      />
      <RoundedProgressBar title="Today's Workout" total={1} progress={todayWorkoutCompleted ? 1 : 0}
        type={"Completed"} color="#00B97F"
        svg={<i className="fa-solid fa-dumbbell" style={{ color: "#00B97F" }}></i>}
      />
      <div className="sm:max-lg:col-span-full">
        <RoundedProgressBar title="Progress percentage" total={Abs(Number(userData?.targetWeight)-Number(userData?.startWeight))} progress={Math.abs(Number(userData?.startWeight)-Number(userData?.currentWeight))}
          type={"Kilo"} color="#217BFF"
          svg={<i className="fa-solid fa-heart-pulse" style={{ color: "#217BFF" }}></i>}
        />

      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full -my-4">
      <DailyStreak />
      <ThisWeek />
      <CaloriesBurned />
      <GoalAchieved />
    </div>
    <Quick />

  </div>
}