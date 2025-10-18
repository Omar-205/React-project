import type { TraineeData } from "../types/TraineeData";
export default function EditProfileButton(props: { disabled: boolean, setDisabled: (value: boolean) => void, user: TraineeData }) {
    const { disabled, setDisabled, user } = props;

    return (

        <button
            className={`mt-6 text-white px-6 py-2 rounded-lg font-medium duration-200 ${(!user.gender || !user.primaryGoal || !user.activityLevel) && !disabled
                    ? "opacity-50 cursor-not-allowed bg-primary"
                    : "hover:bg-primary-dark bg-black" // show depending on disabled state
                }`}
            onClick={() => {
                // toggle between edit and save mode
                if (!disabled) {
                    if (!user.gender || !user.primaryGoal || !user.activityLevel) return;
                    console.log("user data saved");
                    
                    setDisabled(true);
                } else {
                    console.log("editing profile");
                    setDisabled(false);
                }
            }}
            disabled={!disabled && (!user.gender || !user.primaryGoal || !user.activityLevel)}
        >
            {disabled ? "Edit Profile" : "Save Changes"}
        </button>

    )



}



