import { ChefHat, DumbbellIcon } from "lucide-react";
import { mealPlans } from "../types/mealPlansData";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function MealPlans() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const userData = authData.user;

  return <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    {Object.keys(mealPlans).map((planName, idx) => {
      const planInfo = mealPlans[planName];
      const isCurrentPlan = planName == userData?.nutritionData?.selectedPlan;
      return (
        <div key={idx} className="text-text bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      flex flex-col justify-between max-w-70 xl:max-w-full">
          <div>
            <DumbbellIcon />

            <h3 className="mt-3 font-medium text-slate-700">{planName}</h3>
            <p className="pb">{planInfo.description}</p>
          </div>
          <div className="space-y-1 mt-4">
            <div className="flex justify-between"><p className="font-semibold">Duration: </p> <p>{planInfo.dailyCalories}cal</p></div>
            <div className="flex justify-between"><p className="font-semibold">Frequncy: </p> <p>{planInfo.fat}</p></div>
            {/* <div className="flex justify-between"><p className="font-semibold">Difficulty: </p> <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">{planInfo.difficulty}</p></div> */}
            <button className={`bg-black ${isCurrentPlan ? "text-[#65656F]" : "text-white"} text-center w-full rounded-sm py-1 cursor-pointer hover:bg-slate-700`}
              disabled={isCurrentPlan}
              onClick={() => {

              }}
            >{isCurrentPlan ? "Current Plan" : "Start Workout"}</button>
          </div>
        </div>
      )
    })}

  </div>;


  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //     {/* {mealPlans.map((plan, idx) => (
  //       <PlanCard key={idx} plan={plan} />
  //     ))} */}
  //   </div>
  // );
}
