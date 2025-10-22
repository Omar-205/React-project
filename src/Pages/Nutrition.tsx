import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { NutritionProgress } from "../components/NutritionProgress";
import { Target } from "lucide-react";
import { useState } from "react";
import { TodayMeal } from "../components/TodayMeal";
import { MealPlans } from "../components/MealPlans";
import { FoodLibrary } from "../components/FoodLibrary";
import NavTabs from "../components/NavTabs";


const styles = {
  pathColor: "#FF6E00",
  textColor: '#000',

}
export default function Nutrition() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsNames = ["Today's Meal", "Meal Plans", "Food Library"];
  const tabs = [<TodayMeal />, <MealPlans />, <FoodLibrary />];

  return <div className="max-w-[1000px] text-[#727680] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h2>Nutrition</h2>
    <p>Track Yout meals and reach your nutrition goals</p>

    <div className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg py-2 px-6 mt-6">
      <h3>Today's Nutrition</h3>
      <h4>{1650}/2200 calories consumed</h4>
      <div className="grid grid-cols-3 m-3 gap-[2%]">

        <div className="w-32 flex flex-col items-center content-center">
          <CircularProgressbar value={75} text={"75%"} styles={buildStyles(styles)} />
          <h5 className="text-center">Calories</h5>
          <p className="text-center">550 left</p>
        </div>

        <div>
          <NutritionProgress title="Protien" total={165} progress={120} color={"#00BC7D"} />
          <NutritionProgress title="Carbs" total={275} progress={180} color={"#2B7FFF"} />
          <NutritionProgress title="Fat" total={73} progress={58} color={"#AB46FF"} />
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