import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";

export default function CaloriesBurned() {
    const { statement, icon } = { statement: "Calories burned", icon: <i className="fa-solid fa-fire text-red-500"></i> };
    let totalCaloriesBurned = 0;
    const [streak] = useState(calculate());

    function calculate() {
        try {
            const userData = useSelector((state: RootState) => state.Authantication.user);
            const historyData = userData?.workoutData?.history;
            const history = historyData ? Object.keys(historyData).map(dateStr => parseInt(dateStr)) : [];

            for (let day of history) {
                totalCaloriesBurned += historyData?.[day]?.caloriesBurned || 0;
            }
            return totalCaloriesBurned;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }


    return (
        <div className="bg-menu-white dark:bg-primary-dark
         border-light-border dark:border-transparent
         border-1 rounded-lg p-6 flex flex-row gap-4 align-center  h-full"
        >
            <div className="text-xl self-center">{icon}</div>
            <div className="flex flex-col">
                <p className="font-bold  text-2xl  text-black dark:text-white">{streak}</p>
                <p className="text-black dark:text-white">{statement}</p>
            </div>
        </div>
    );

}