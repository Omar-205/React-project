import { DumbbellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms, workoutProgramsInfo } from "../types/weeklyPlans";
import { saveUserData } from "../services/DatabaseServices";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";


export function Programs() {
  // default workout plan
  const defaultWorkoutPlan = "beginnerFullBodyPlan";
  let [selectedWorkoutName, setSelectedWorkoutName] = useState(defaultWorkoutPlan);
  const authData = useSelector((state: RootState) => state.Authantication);
  useEffect(() => {
    //access the user data inwhich the workoutData exists
    const userData = authData.user;
    //hanlde workout name does not exist
    if (!userData?.workoutData || !userData.workoutData.selectedWorkout || !userData.workoutData.history || !Object.keys(workoutPrograms).includes(userData.workoutData.selectedWorkout)) {
      saveUserData(authData.uid as string, { workoutData: { selectedWorkout: userData?.workoutData?.selectedWorkout || defaultWorkoutPlan, history: userData?.workoutData?.history || {} } })
      return;
    }
    // if the selected plan is found ?
    else {
      setSelectedWorkoutName(userData.workoutData.selectedWorkout);
    }
  }, [])
  const dispatch = useDispatch()
  // console.log(selectedWorkoutName);
  // handle changing the plan
  function setPlan(planName: string) {
    saveUserData(authData.uid as string, { workoutData: { selectedWorkout: planName, history: authData.user?.workoutData?.history || {} } })
    if (authData.user) {
      dispatch(setUser(
        {
          ...authData.user,
          workoutData: {
            selectedWorkout: planName
            , history: authData.user?.workoutData.history || {}
          },
        }
      ));
    }
  }

  return <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    {workoutProgramsInfo.map((planInfo) => {
      return (
        <div key={planInfo.id} className="text-text bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      flex flex-col justify-between max-w-70 xl:max-w-full">
          <div>
            <DumbbellIcon style={{ background: planInfo.iconStyle.background, color: planInfo.iconStyle.color, padding: '8px', borderRadius: '8px' }}
              fill={planInfo.iconStyle.background} size={40} />

            <h3 className="mt-3 font-medium text-slate-700">{planInfo.title}</h3>
            <p className="pb">{planInfo.description}</p>
          </div>
          <div className="space-y-1 mt-4">
            <div className="flex justify-between"><p className="font-semibold">Duration: </p> <p>{planInfo.duration}</p></div>
            <div className="flex justify-between"><p className="font-semibold">Frequncy: </p> <p>{planInfo.frequency}</p></div>
            <div className="flex justify-between"><p className="font-semibold">Difficulty: </p> <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">{planInfo.difficulty}</p></div>
            <button className="bg-black text-[#65656F] text-center w-full rounded-sm py-1 cursor-pointer"
              onClick={() => {
                setPlan(planInfo.planName);
                setSelectedWorkoutName(planInfo.planName)
              }}
            >{planInfo.planName == selectedWorkoutName ? "Current Plan" : "Start Workout"}</button>
          </div>
        </div>
      )
    })}

  </div>;
}
