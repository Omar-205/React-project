import { useDispatch } from "react-redux";
import type { TraineeData } from "../types/TraineeData";
import type { AppDispatch } from "../store/store";
import { updateUser } from "../store/slices/authSlice";
import type { Cursor } from "recharts/types/component/Cursor";

export default function EditProfileButton(props: {
    profile: TraineeData,
    disabled: boolean,
    setDisabled: (value: boolean) => void,
    user: TraineeData,
    uid: string
}) {
    const { profile, disabled, setDisabled, uid } = props;
    const dispatch = useDispatch<AppDispatch>();

    const updateProfile = (uid: string, data: TraineeData) => {
        dispatch(updateUser({ uid, data }));
    };

    const handleClick = () => {
        if (!disabled) {
            updateProfile(uid, profile);
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    return (
        <button
            className={`mt-6 text-white px-6 py-2 rounded-lg font-medium duration-200 cursor-pointer ${disabled
                    ? "hover:bg-primary bg-black"
                    : "bg-primary hover:bg-primary-dark"
                }`}
            onClick={handleClick}
            // cant click save changes if required fields are empty
            disabled={ 
                !disabled &&
                (!profile.fullName ||
                    !profile.age ||
                    !profile.gender ||
                    !profile.height ||
                    !profile.currentWeight)
            }
        >
            {disabled ? "Edit Profile" : "Save Changes"}
        </button>
    );
}
