import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { NutritionProgress } from "../components/NutritionProgress";
import { Target } from "lucide-react";
import { TodayMeal } from "../components/TodayMeal";
import { MealPlans } from "../components/MealPlans";
import { FoodLibrary } from "../components/FoodLibrary";
import NavTabs from "../components/NavTabs";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { saveUserData } from "../services/DatabaseServices";
import { useEffect } from "react";
import { mealPlans } from "../types/mealPlansData";


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
    // if the selected plan is found ?
    else {
      console.log('found');

    }
    console.log('done');

  }, [])

  const styles = {
    pathColor: "#FF6E00",
    textColor: theme === "dark" ? "#f1f5f9" : "#000",
  };

  const tabsNames = ["Today's Meal", "Meal Plans", "Food Library"];
  const tabs = [<TodayMeal />, <MealPlans />, <FoodLibrary />];
  const selectedPlan = authData.user?.nutritionData?.selectedPlan;
  const plan = selectedPlan ? mealPlans[selectedPlan] : mealPlans[Object.keys(mealPlans)[0]];
  const today = new Date().toISOString().split("T")[0];
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
    console.log(consumedProtein/ plan.protein * 100);

  return <div className="max-w-[1000px] text-[#727680] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h2>Nutrition</h2>
    <p>Track Yout meals and reach your nutrition goals</p>

    <div className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg py-2 px-6 mt-6">
      <h3>Today's Nutrition</h3>
      <h4>{consumedCalories}/{plan.dailyCalories} calories consumed</h4>
      <div className="grid grid-cols-3 m-3 gap-[2%]">

        <div className="w-32 flex flex-col items-center content-center">
          <CircularProgressbar value={consumedCalories / plan.dailyCalories * 100} text={`${Math.floor(consumedCalories / plan.dailyCalories * 100)} %`} styles={buildStyles(styles)} />
          <h5 className="text-center">Calories</h5>
          <p className="text-center">{plan.dailyCalories - consumedCalories} left</p>
        </div>

        <div>
          <NutritionProgress title="Protien" total={plan.protein} progress={consumedProtein} color={"#00BC7D"} />
          <NutritionProgress title="Carbs" total={plan.carbs} progress={consumedCarbs} color={"#2B7FFF"} />
          <NutritionProgress title="Fat" total={plan.fat} progress={consumedFats} color={"#AB46FF"} />
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-[#EFF6FE] p-5 text-[#6379B4] h-fit rounded-xl">
            <h5 className="flex"> <Target color="#70A0FF" className="mr-1" />  Net Calories</h5>
            <p className="text-2xl font-semibold mt-2 mb-1">{1300}</p>
            <p className="text-sm">Intake-Excercise</p>
          </div>
        </div>
      </div>

    </div>

    <div className="p-4">
      <NavTabs titles={tabsNames} components={tabs} />
    </div>


  </div>

}