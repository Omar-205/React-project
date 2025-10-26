import { useState } from "react";
import { mealPlans } from "../types/mealPlansData";
import { Apple, Clock, Coffee, Moon, Utensils } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/slices/authSlice";
import { saveUserData } from "../services/DatabaseServices";

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

    const authData = useSelector((state: RootState) => state.Authantication);
    //saveUserData(auttData.uid as string, { "targetWeight": [81].toString() })


    const selectedPlanName = "Weight Loss Plan";
    const plan = mealPlans[selectedPlanName];
    const meals = plan.meals;
    return (
        <div className="mb-14">
            {meals.map((meal, index) => {
                const [open, setOpen] = useState(false);
                return (
                    <div key={index} className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg p-4 mt-2">
                        <div className="flex justify-between items-center ">

                            <div className="flex items-center">
                                {icons[index]}
                                <div className="flex flex-col ">
                                    <p className="text-lg">{meal.name}</p>
                                    <span><Clock className="inline" size={18} /> {meal.time}</span>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">{meal.calories} Cal</div>
                                <button onClick={() => setOpen(!open)}
                                    className="text-sm text-primary mt-2 font-semibold cursor-pointer">
                                    {open ? "Hide Details" : "Show Details ⇓"}
                                </button>
                            </div>
                        </div>

                        {open && <p className="mt-4 font-semibold">{meal.content}</p>}
                    </div>
                )
            })}
        </div>
    )
}