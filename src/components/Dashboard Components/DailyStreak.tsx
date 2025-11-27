import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";

export default function DailyStreak() {
    const { statement, icon } = { statement: "Day streak", icon: <i className="fa-solid fa-bolt text-orange-500"></i> };
    let streakCounter = 0;
    const [streak] = useState(calculate());

    function calculate() {
        try {
            const userData = useSelector((state: RootState) => state.Authantication.user);
            const historyData = userData?.workoutData?.history;
            const history = historyData ? Object.keys(historyData).map(dateStr => parseInt(dateStr)).sort((a, b) => b - a) : [];
            const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
            if (history.length > 0 && history[0] == today) {
                streakCounter = 1;
                for (let i = 1; i < history.length; i++) {
                    if (history[i] == history[i - 1] - 1) {
                        streakCounter += 1;
                    }
                }
            }
            return (streakCounter);
        } catch (error) {
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