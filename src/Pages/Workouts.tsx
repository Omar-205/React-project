import { useSelector } from "react-redux";
import NavTabs from "../components/NavTabs";
import { Programs } from "../components/Programs";
import { TodaysWorkout } from "../components/TodaysWorkout";
import { WeeklyPlan } from "../components/WeeklyPlan";
import type { RootState } from "../store/store";
import { saveUserData } from "../services/DatabaseServices";
import { workoutPrograms } from "../types/weeklyPlans";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

export default function Workouts() {

  // fallback if some data is missing 
  const defaultWorkoutPlan = "beginnerFullBodyPlan";
  const authData = useSelector((state: RootState) => state.Authantication); // the user's data
  const dispatch = useDispatch();

  useEffect(() => {
    //access the user data inwhich the workoutData exists
    const userData = authData.user;
    //hanlde workout name does not exist
    if (!userData?.workoutData || !userData.workoutData.selectedWorkout || !userData.workoutData.history || !Object.keys(workoutPrograms).includes(userData.workoutData.selectedWorkout)) {
      saveUserData(authData.uid as string, { workoutData: { selectedWorkout: userData?.workoutData?.selectedWorkout || defaultWorkoutPlan, history: userData?.workoutData?.history || {} } })
      if (authData.user) {
        dispatch(setUser(
          {
            ...authData.user,
            workoutData: {
              selectedWorkout: defaultWorkoutPlan
              , history: authData.user?.workoutData.history || {}
            },
          }
        ));
      }
      return;
    }
    // if the selected plan is found ?
    else {
    }
  }, [])

  // subpages
  const titles = ["Today's Workout", "Weekly Plan", "Programs"];
  const components = [
    <TodaysWorkout />,
    <WeeklyPlan />,
    <Programs />,
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