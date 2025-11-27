import { useState } from "react";
import { mealPlans } from "../types/mealPlansData";
import { Apple, Clock, Coffee, Moon, Utensils } from "lucide-react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { updateUser } from "../store/slices/authSlice";


export function TodayMeal() {
    const icons = [
        <div className="bg-[#FFF1E6] p-2 rounded-xl mr-3">
            <Coffee color="#FE5700" style={{ backgroundColor: "#FFE9CE" }} />
        </div>,
        <div className="bg-[#CFF9E0] p-2 rounded-xl mr-3">
            <Utensils color="#0BA16C" style={{ backgroundColor: "#CFF9E0" }} />
        </div>,
        <div className="bg-[#D7E7FE] p-2 rounded-xl mr-3">
            <Apple color="#1E6BFF" style={{ backgroundColor: "#D7E7FE" }} />

        </div>,
        <div className="bg-[#F3D9FF] p-2 rounded-xl mr-3">
            <Moon color="#AA2DFD" style={{ backgroundColor: "#EEE2FF" }} />
        </div>
    ]
    const planSelected = useSelector((state: RootState) => state.Authantication.user?.nutritionData?.selectedPlan);
    const plan = planSelected !== undefined ? mealPlans[planSelected] : mealPlans[0];
    const meals = plan.meals;
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.Authantication.user);
    const uid = useSelector((state: RootState) => state.Authantication.uid);
    const today = new Date().toISOString().split("T")[0];
    const todayHistory = user?.nutritionData.history?.[today] || {};
    const [consumed, setConsumed] = useState<boolean[]>(
        meals.map(meal => Boolean(todayHistory?.[meal.name as keyof typeof todayHistory]))
    );

    const updateMealHistory = async (mealName: string) => {
        if (!uid || !user) return;

        const today = new Date().toISOString().split("T")[0];

        const todayMeals = {
            ...((user.nutritionData.history?.[today] ?? {}) as Record<string, boolean>),
            [mealName]: true,
        };

        const updatedHistory = {
            ...user.nutritionData.history,
            [today]: todayMeals,
        };

        dispatch(updateUser({
            uid,
            data: {
                nutritionData: {
                    ...user.nutritionData,
                    history: updatedHistory,
                }
            }
        }));
    };
    const handleConsume = async (index: number, mealName: string) => {
        setConsumed(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });

        await updateMealHistory(mealName);
    };

    return (
        <div className="mb-14">
            {meals.map((meal, index) => {
                const [open, setOpen] = useState(false);

                return (
                    <div
                        key={index}
                        className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border rounded-lg p-4 mt-3"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    {icons[index]}
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg font-semibold">{meal.name}</p>
                                    <span className="text-sm opacity-80 flex items-center">
                                        <Clock size={16} className="mr-1" /> {meal.time}
                                    </span>
                                </div>
                            </div>

                            <div className="sm:ml-auto">
                                <button
                                    onClick={() => handleConsume(index, meal.name)}
                                    disabled={consumed[index]}
                                    className={`px-4 py-1.5 rounded-full shadow-sm font-semibold transition
                      ${consumed[index]
                                            ? "bg-green-500 text-white cursor-not-allowed opacity-90"
                                            : "bg-primary text-white hover:opacity-90 active:scale-95"
                                        }`}
                                >
                                    {consumed[index] ? "Consumed ✓" : "Consume"}
                                </button>
                            </div>

                            <div className="flex flex-row justify-between sm:flex-col sm:items-end">
                                <div className="font-semibold">{meal.calories} Cal</div>

                                <button
                                    onClick={() => setOpen(!open)}
                                    className="text-sm text-primary font-semibold mt-1"
                                >
                                    {open ? "Hide Details ▲" : "Show Details ▼"}
                                </button>
                            </div>
                        </div>

                        {open && (
                            <p className="mt-4 font-medium leading-relaxed">
                                {meal.content}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>


    )
}