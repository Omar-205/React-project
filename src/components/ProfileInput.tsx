import type { TraineeData } from "../types/TraineeData";
import { useState } from "react";
export default function ProfileInput(props: { disabled: boolean, content: string | number, type: "text" | "email" | "number" | "bio" | "select", profile: TraineeData, setProfile: (value: TraineeData) => void, field: keyof TraineeData }) {
    const { disabled, content, type, profile, setProfile, field } = props;

    const [contentState, setContentState] = useState(content);
    const [numberState, setNumberState] = useState((content));



    // Handle change for both text and number inputs
    const handleChange = (val: string | number) => {
        if (type === "number") {
            setNumberState(val as string);
            const parsed = Number(val);
            if (!isNaN(parsed)) {
                setProfile({ ...profile, [field]: parsed });
            }
        } else {
            setContentState(val as string);
            setProfile({ ...profile, [field]: val });
        }
    };

    // Render input based on disabled state
    if (disabled) {
        return (
            <div className={`bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full ${field === "bmi" ? 'text-green-500 font-bold' : 'text-neutral-500 dark:text-[#738899]'}`}>
                {type === "number" ? numberState : contentState}
            </div>
        )
    }
    else {
        return (
            // generate different input types based on the "type" prop

            // gender
            (type === "select" && field === "gender" &&
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>)
            
            // primary goal
            || (type === "select" && field === "primaryGoal" &&
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select primary goal --</option>
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Maintain Weight">Maintain Weight</option>
                    <option value="Gain Weight">Gain Weight</option>

                </select>)

            // activity level
            || (type === "select" && field === "activityLevel" &&
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select activity level --</option>
                    <option value="Sedentary">Sedentary(1 day/week)</option>
                    <option value="Lightly active">Lightly active(1-3 days/week)</option>
                    <option value="Moderately active">Moderately active(3-5 days/week)</option>
                    <option value="Very active">Very active(5-7 days/week)</option>
                </select>)

            // other number input types
            || (type === "number" &&
                <input type="number" step="any" className={`bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 ${field === "bmi" ? 'text-green-500 font-bold' : 'text-neutral-700 dark:text-text-dark'}`} value={numberState} onChange={(e) => handleChange(Number(e.target.value))} required />
            )

            // bio textarea
            || (type === "bio" &&
                <textarea
                    className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 text-neutral-700 resize-none dark:text-text-dark"
                    rows={3}
                    value={contentState}
                    maxLength={150}
                    onChange={(e) => handleChange(e.target.value)}
                />
            )
            
            // text and email input types
            || ((type === "email" || type === "text") &&
                <input type={type} className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 text-neutral-700 dark:text-text-dark" value={contentState} onChange={(e) => handleChange(e.target.value)} required />
            )
        )
    }
}



