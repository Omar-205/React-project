
import profileData from "../profile/profileData";
import { useState } from "react";
export default function ProfileInput(props: { disabled: boolean, content: string | number, type: "text" | "email" | "number"  | "bio" | "select", profile: typeof profileData, setProfile: (value: typeof profileData) => void, field: keyof typeof profileData }) {
    const { disabled, content, type, profile, setProfile, field } = props;

    const [contentState, setContentState] = useState(content);
    const [numberState, setNumberState] = useState((content));




    const handleChange = (val: string | number) => { //show the written content amd save it
        if (type === "number") {
            setNumberState(val as string); // as string to enable writing decimal points
            const parsed = Number(val);
            if (!isNaN(parsed)) {
                setProfile({ ...profile, [field]: parsed }); 
            }
        } else {
            setContentState(val as string);
            setProfile({ ...profile, [field]: val });
        }
    };





    // show depending on disabled state
    if (disabled) { //if disabled, show the content without the ability to change it
        return (
            <div className={`bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full ${field === "bmi" ? 'text-green-500 font-bold' : 'text-neutral-500 dark:text-[#738899]'}`}>
                {type === "number" ? numberState : contentState}
            </div>
        )
    }
    else { //if not disabled, check the type passed from the parent and depending on it show the content with the ability to change it
        return (
            (type === "select" && field === "gender" && //gender select input
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>)
            || (type === "select" && field === "primaryGoals" && //primary goals select input
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select primary goal --</option>
                    <option value="Lose weight">Lose weight</option>
                    <option value="Build muscle">Build muscle</option>
                    <option value="Improve endurance">Improve endurance</option>
                    <option value="Enhance flexibility">Enhance flexibility</option>
                    <option value="General fitness">General fitness</option>
                </select>)
            || (type === "select" && field === "activityLevel" && //activity level select input
                <select className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full text-neutral-700 dark:text-text-dark h-[42px]" value={contentState} onChange={(e) => handleChange(e.target.value)} required>
                    <option value="" disabled>-- select activity level --</option>
                    <option value="Sedentary">Sedentary(1 day/week)</option>
                    <option value="Lightly active">Lightly active(1-3 days/week)</option>
                    <option value="Moderately active">Moderately active(3-5 days/week)</option>
                    <option value="Very active">Very active(5-7 days/week)</option>
                </select>)
            || (type === "number" && //number input
                <input type="number" step="any" className={`bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 ${field === "bmi" ? 'text-green-500 font-bold' : 'text-neutral-700 dark:text-text-dark'}`} value={numberState} onChange={(e) => handleChange(Number(e.target.value))} required />
            )
            || (type === "bio" && //bio textarea input
                <textarea
                    className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 text-neutral-700 resize-none dark:text-text-dark"
                    rows={3}
                    value={contentState}
                    maxLength={150}
                    onChange={(e) => handleChange(e.target.value)}
                />
            )
            || ((type === "email" || type === "text") && //text and email input
                <input type={type} className="bg-input dark:bg-input-dark border border-gray-300 rounded px-3 py-2 w-full min-w-0 text-neutral-700 dark:text-text-dark" value={contentState} onChange={(e) => handleChange(e.target.value)} required />
            )
        )
    }
}



