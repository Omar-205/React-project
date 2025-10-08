
import profileData from "../profile/profileData";
export default function EditProfileButton(props: { disabled: boolean, setDisabled: (value: boolean) => void, profile: typeof profileData }) {
    const { disabled, setDisabled, profile } = props;


    return (

        <button
            className={`mt-6  text-white px-6 py-2 rounded-lg font-medium duration-200 ${(!profile.gender || !profile.primaryGoals || !profile.activityLevel) && !disabled
                    ? "opacity-50 cursor-not-allowed bg-primary"
                    : "hover:bg-primary-dark bg-black"  // show depending on disabled state
                }`}
            onClick={() => {  //toggle between edit and save mode
                if (!disabled) {
                    if (!profile.gender || !profile.primaryGoals || !profile.activityLevel) return;
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }}
            disabled={!disabled && (!profile.gender || !profile.primaryGoals || !profile.activityLevel)}
        >
            {disabled ? "Edit Profile" : "Save Changes"}
        </button>

    )

   
  
}



