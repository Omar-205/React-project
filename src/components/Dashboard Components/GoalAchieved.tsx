import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function GoalAchieved() {
    const userData = useSelector((state: RootState) => state.Authantication.user);

    return (
        <div
            className="bg-menu-white dark:bg-primary-dark
            border-light-border dark:border-transparent
            border-1 rounded-lg p-6 flex flex-row gap-4 items-center h-full"
        >
            {/* Icon */}
            <div className="text-xl">
                <i className="fa-solid fa-trophy text-green-500"></i>
            </div>

            {/* Text */}
            <div className="flex flex-col">
                <p className="font-bold text-2xl text-black dark:text-white">
                    {
                        Number(userData?.currentWeight) == Number(userData?.targetWeight)
                            ? "1"
                            : "0"
                    }
                </p>
                <p className="text-black dark:text-white">
                    Goal Achieved
                </p>
            </div>
        </div>
    );
}
