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

        // 1️⃣ Build new daily meal object
        const todayMeals = {
            ...((user.nutritionData.history?.[today] ?? {}) as Record<string, boolean>),
            [mealName]: true,
        };

        // 2️⃣ Build full new nutrition history object
        const updatedHistory = {
            ...user.nutritionData.history,
            [today]: todayMeals,
        };

        // 3️⃣ Dispatch updateUser → saves to Firebase + Redux
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
        // 1️⃣ Update local UI
        setConsumed(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });

        // 2️⃣ Save to Redux + Firebase
        await updateMealHistory(mealName);
    };

    return (
        <div className="mb-14">
            {meals.map((meal, index) => {
                const [open, setOpen] = useState(false);
                return (
                    <div key={index} className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg p-4 mt-2">
                        <div className="flex justify-between items-center ">
                            <div className="flex items-center gap-5">
                                {icons[index]}
                                <div className="flex flex-col ">
                                    <p className="text-lg">{meal.name}</p>
                                    <span><Clock className="inline" size={18} /> {meal.time}</span>
                                </div>
                                {/* Consume Button (green + disabled after click) */}
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
                            <div>
                                <div className="font-semibold">{meal.calories} Cal</div>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="text-sm text-primary mt-2 font-semibold cursor-pointer"
                                >
                                    {open ? "Hide Details" : "Show Details ⇓"}
                                </button>
                            </div>
                        </div>

                        {open && <p className="mt-4 font-semibold">{meal.content}</p>}
                    </div>
                );
            })}


        </div>
    )
}