import { ChefHat } from "lucide-react";
import { mealPlans } from "../types/mealPlansData";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { saveUserData } from "../services/DatabaseServices";
import { useDispatch } from "react-redux";
import { setNutritionPlan } from "../store/slices/authSlice";

export function MealPlans() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const dispatch = useDispatch();
  const userData = authData.user;
  function handleSelectPlan(planName: string) {
    saveUserData(authData.uid as string, { nutritionData: { selectedPlan: planName, history: userData?.nutritionData?.history || {} } })
    dispatch(setNutritionPlan(planName))
  }
  return <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    {Object.keys(mealPlans).map((planName, idx) => {
      const planInfo = mealPlans[planName];
      const isCurrentPlan = planName == userData?.nutritionData?.selectedPlan;
      return (
        <div key={idx} className="text-slate-300 bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      flex flex-col justify-between max-w-70 xl:max-w-full dark:border-gray-700 dark:bg-primary-dark">
          <div>
            <ChefHat style={{ padding: "7px", background: "#CCF8DF", borderRadius: "5px" }} fill="#CCF8DF" color="#2CAD7D" size={35} />

            <h3 className="my-3 text-text font-semibold text-xl">{planName}</h3>
            <p className="pb text-slate-400">{planInfo.description}</p>
          </div>
          <div className="space-y-1 mt-2 text-text">
            <div className="flex justify-between"><p className="font-semibold">Daily Calories: </p> <p>{planInfo.dailyCalories}cal</p></div>
            <div className="flex justify-between"><p className="font-semibold">Protein: </p> <p>{planInfo.protein}g</p></div>
            <div className="flex justify-between"><p className="font-semibold">Carbs: </p> <p>{planInfo.carbs}g</p></div>
            <div className="flex justify-between"><p className="font-semibold">Fat: </p> <p>{planInfo.fat}g</p></div>
            <button className={`bg-black ${isCurrentPlan ? "text-[#65656F]" : "text-white"} text-center w-full rounded-sm py-1 cursor-pointer hover:bg-slate-700`}
              disabled={isCurrentPlan}
              onClick={() => {
                handleSelectPlan(planName);
              }}
            >{isCurrentPlan ? "Current Plan" : "Select Plan"}</button>
          </div>
        </div>
      )
    })}

  </div>;
}
