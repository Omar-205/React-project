import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {NutritionProgress} from "../components/NutritionProgress";
import {Target} from "lucide-react";
import {TodayMeal} from "../components/TodayMeal";
import {MealPlans} from "../components/MealPlans";
import {FoodLibrary} from "../components/FoodLibrary";
import NavTabs from "../components/NavTabs";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store";
import {saveUserData} from "../services/DatabaseServices";
import {useEffect} from "react";
import {mealPlans} from "../types/mealPlansData";
import {getToady} from "../utils/helper.ts";


export default function Nutrition() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const authData = useSelector((state: RootState) => state.Authantication);
  useEffect(() => {
    //access the user data inwhich the nutrition exists
    const userData = authData.user;
    //hanlde any missing fields
    if (!userData?.nutritionData || !userData?.nutritionData?.selectedPlan || !userData?.nutritionData.history || !Object.keys(mealPlans).includes(userData.nutritionData.selectedPlan)) {
      saveUserData(authData.uid as string, { nutritionData: { selectedPlan: userData?.nutritionData?.selectedPlan || Object.keys(mealPlans)[0], history: userData?.nutritionData?.history || {} } })
      return;
    }
    

  }, [])

  const styles = {
    pathColor: "#FF6E00",
    textColor: theme === "dark" ? "#f1f5f9" : "#000",
  };
  // consumption data
  const tabsNames = ["Today's Meal", "Meal Plans", "Food Library"];
  const tabs = [<TodayMeal />, <MealPlans />, <FoodLibrary />];
  const selectedPlan = authData.user?.nutritionData?.selectedPlan;
  const plan = selectedPlan ? mealPlans[selectedPlan] : mealPlans[Object.keys(mealPlans)[0]];


  const today = getToady();
  const todayHistory = authData.user?.nutritionData.history?.[today] || {};
  const consumedCalories = plan.meals
    .filter(meal => todayHistory[meal.name as keyof typeof todayHistory])
    .reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const consumedProtein = plan.meals
    .filter(meal => todayHistory[meal.name as keyof typeof todayHistory])
    .reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const consumedCarbs = plan.meals
    .filter(meal => todayHistory[meal.name as keyof typeof todayHistory])
    .reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const consumedFats = plan.meals
    .filter(meal => todayHistory[meal.name as keyof typeof todayHistory])
    .reduce((sum, meal) => sum + (meal.fat || 0), 0);
 
  let caloriesBurned = 0;
  const todayStamp = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
  const todayWorkout = authData.user?.workoutData.history?.[todayStamp];
  if (todayWorkout) caloriesBurned += todayWorkout.caloriesBurned || 0;
  return <div className="w-full md:max-w-[1000px] text-[#727680] bg-transparent mt-8 px-4 md:px-0">
  <h2>Nutrition</h2>
  <p>Track your meals and reach your nutrition goals</p>

  <div className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border rounded-lg py-4 px-6 mt-6">
    <h3>Today's Nutrition</h3>
    <h4>{consumedCalories}/{plan.dailyCalories} calories consumed</h4>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      {/* Calories Circle */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-40 h-40">
          <CircularProgressbar
            value={consumedCalories / plan.dailyCalories * 100}
            text={`${Math.floor(consumedCalories / plan.dailyCalories * 100)}%`}
            styles={buildStyles(styles)}
          />
        </div>
        <h5 className="text-center mt-3">Calories</h5>
        <p className="text-center">{plan.dailyCalories - consumedCalories} left</p>
      </div>

      {/* Macro Progress */}
      <div className="space-y-4">
        <NutritionProgress title="Protein" total={plan.protein} progress={consumedProtein} color="#00BC7D" />
        <NutritionProgress title="Carbs" total={plan.carbs} progress={consumedCarbs} color="#2B7FFF" />
        <NutritionProgress title="Fat" total={plan.fat} progress={consumedFats} color="#AB46FF" />
      </div>

      {/* Net Calories */}
      <div className="flex justify-center md:justify-end">
        <div className="bg-[#EFF6FE] p-5 text-[#6379B4] rounded-xl w-full md:w-auto">
          <h5 className="flex items-center">
            <Target color="#70A0FF" className="mr-1" /> Net Calories
          </h5>
          <p className="text-3xl font-semibold mt-2 mb-1">{consumedCalories - caloriesBurned}</p>
          <p className="text-sm">Intake - Exercise</p>
        </div>
      </div>

    </div>
  </div>

  <div className="p-2 md:p-4">
    <NavTabs titles={tabsNames} components={tabs} />
  </div>
</div>


}