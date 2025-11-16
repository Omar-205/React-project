import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";

export default function ThisWeek() {
    const { statement, icon } = { statement: "This week", icon: <i className="fa-solid fa-calendar-week text-blue-500"></i> };
    let streakCounter = 0;
    const [streak] = useState(calculate());

    function calculate() {
        try {
            const userData = useSelector((state: RootState) => state.Authantication.user);
            const historyData = userData?.workoutData?.history;
            const history = historyData ? Object.keys(historyData).map(dateStr => parseInt(dateStr)).sort((a, b) => b - a) : [];
            const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
            const lastFriday = today - today % 7 + 1;
            if (history.length > 0) {
                streakCounter = 1;
                for (let i = 1; i < 7; i++) {
                    if (history[i] >= lastFriday) {
                        streakCounter += 1;
                    }
                }
            }
            return (streakCounter);
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