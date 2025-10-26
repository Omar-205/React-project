import { useSelector } from "react-redux";
import WeeklyExcercise from "./WeeklyExcercise";
import type { RootState } from "../store/store";
import { saveUserData } from "../services/DatabaseServices";
import { useEffect } from "react";

export function WeeklyPlan() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const userData = authData.user;
  const workoutData = userData?.workoutData;


  const today = (new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24)
  const lastFriday = today - today % 7 + 1;

  return <div className="w-full shadow-xl rounded-lg p-4 bg-white dark:bg-primary-dark">
    <h3 className="text-prof-text dark:text-text-dark text-lg">This Week's Plan</h3>
    <p className=" dark:text-text-dark">Your Structured Workout Schedule</p>
    <WeeklyExcercise day={0} />
    <WeeklyExcercise day={1} />
    <WeeklyExcercise day={2} />
    <WeeklyExcercise day={3} />
    <WeeklyExcercise day={4} />
    <WeeklyExcercise day={5} />
    <WeeklyExcercise day={6} />
  </div>;
}