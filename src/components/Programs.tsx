import { DumbbellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms, workoutProgramsInfo } from "../types/weeklyPlans";
import { saveUserData } from "../services/DatabaseServices";
import { setUser } from "../store/slices/authSlice";

export function Programs() {
  const defaultWorkoutPlan = "beginnerFullBodyPlan";
  const [selectedWorkoutName, setSelectedWorkoutName] = useState(defaultWorkoutPlan);
  const authData = useSelector((state: RootState) => state.Authantication);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = authData.user;
    if (
      !userData?.workoutData ||
      !userData.workoutData.selectedWorkout ||
      !userData.workoutData.history ||
      !Object.keys(workoutPrograms).includes(userData.workoutData.selectedWorkout)
    ) {
      saveUserData(authData.uid as string, {
        workoutData: { selectedWorkout: userData?.workoutData?.selectedWorkout || defaultWorkoutPlan, history: userData?.workoutData?.history || {} }
      });
      return;
    } else {
      setSelectedWorkoutName(userData.workoutData.selectedWorkout);
    }
  }, []);

  function setPlan(planName: string) {
    saveUserData(authData.uid as string, {
      workoutData: { selectedWorkout: planName, history: authData.user?.workoutData?.history || {} }
    });
    if (authData.user) {
      dispatch(
        setUser({
          ...authData.user,
          workoutData: { selectedWorkout: planName, history: authData.user?.workoutData.history || {} },
        })
      );
    }
  }

  // Styles
  const baseStyle =
    "w-full bg-gray-800 text-white px-10 py-3 rounded-sm flex justify-center items-center gap-2 m-2 transition-colors duration-200 hover:bg-secondary hover:text-primary hover:cursor-pointer dark:hover:bg-primary dark:hover:text-secondary";
  const activeStyle =
    "bg-primary text-primary font-bold dark:bg-primary dark:text-secondary rounded-sm";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {workoutProgramsInfo.map((planInfo) => {
        const isCurrentPlan = planInfo.planName === selectedWorkoutName;
        return (
          <div
            key={planInfo.id}
            className="text-slate-300 bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6 flex flex-col justify-between max-w-70 xl:max-w-full dark:border-gray-700 dark:bg-primary-dark"
          >
            <div>
              <DumbbellIcon
                style={{
                  background: planInfo.iconStyle.background,
                  color: planInfo.iconStyle.color,
                  padding: '8px',
                  borderRadius: '8px'
                }}
                fill={planInfo.iconStyle.background}
                size={40}
              />
              <h3 className="mt-3 font-semibold text-text">{planInfo.title}</h3>
              <p className="pb text-slate-400 font-semibold">{planInfo.description}</p>
            </div>

            <div className="space-y-1 mt-4 text-text">
              <div className="flex justify-between">
                <p className="font-semibold">Duration: </p> <p>{planInfo.duration}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Frequency: </p> <p>{planInfo.frequency}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Difficulty: </p>{" "}
                <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">
                  {planInfo.difficulty}
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className={`${baseStyle} ${isCurrentPlan ? activeStyle : ""}`}
                  disabled={isCurrentPlan}
                  onClick={() => {
                    setPlan(planInfo.planName);
                    setSelectedWorkoutName(planInfo.planName);
                  }}
                >
                  {isCurrentPlan ? "Current Plan" : "Start Workout"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
