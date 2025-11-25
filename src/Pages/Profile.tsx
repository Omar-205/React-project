import userProfilePhoto from "../assets/userProfilePhoto.png";
import EditProfileButton from "../components/EditProfileButton";
import ProfileInput from "../components/ProfileInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function Profile() {
    // State to toggle edit/save mode
    const [disabled, setDisabled] = useState(true);
    // Get user and uid from Redux store
    const { user, uid } = useSelector((state: RootState | any) => state.Authantication);

    // Local copy of user profile
    const [profile, setProfile] = useState(user || {});

    // Format created date
    const createdAtDate = user?.createdAt ? new Date(user.createdAt) : null;
    const month = createdAtDate ? String(createdAtDate.getUTCMonth() + 1).padStart(2, "0") : "00";
    const year = createdAtDate ? createdAtDate.getUTCFullYear() : "0000";
    const formatted = `${month}-${year}`;
    const BMI = user.currentWeight / ((user.height / 100) ** 2);

    return (
        <div className="flex flex-col gap-8 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] mt-8 px-4">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl text-prof-text font-bold mb-4 dark:text-text-dark">Profile</h1>
                    <p className="text-prof-text-secondary dark:text-text-secondary-dark">
                        Manage your personal information and fitness goals.
                    </p>
                </div>
                <div>
                    <EditProfileButton
                        profile={profile}
                        disabled={disabled}
                        setDisabled={setDisabled}
                        user={user!}
                        uid={uid!} />
                </div>
            </div>

            {/* Grid Section */}
            <div className="
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 
    gap-2 mt-8 
    auto-rows-auto sm:auto-rows-auto lg:auto-rows-[150px]
">                {/* Profile Picture */}
                <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-3 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark">
                    <h4 className="m-4 text-prof-text font-bold dark:text-text-dark">Profile Picture</h4>
                    <div className="flex justify-center mt-5">
                        <img
                            src={userProfilePhoto}
                            alt="Profile"
                            className="object-cover w-[150px] h-[150px] rounded-full"
                        />
                    </div>
                    <hr className="m-4 h-[2px] bg-text border-0" />
                    <p className="text-prof-text-secondary m-4 dark:text-text-secondary-dark">
                        <i className="fa-solid fa-calendar dark:text-text-dark"></i>{" "}
                        <span className="font-bold dark:text-text-dark">Member since:</span> {formatted}
                    </p>
                    <p className="text-prof-text-secondary m-4 dark:text-text-secondary-dark">
                        <i className="fa-solid fa-chart-line dark:text-text-dark"></i>{" "}
                        <span className="font-bold dark:text-text-dark">Fitness Level:</span>{" "}
                        {user?.activityLevel || "N/A"}
                    </p>
                </div>

                {/* Personal Information */}
                <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-5 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark h-auto">
                    <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark">Personal Information</h4>
                    <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">
                        Your basic profile details.
                    </p>

                    {/* FIXED GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-4 pt-1 w-full min-w-0">

                        <div className="w-full">
                            <h4 className="mt-2 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Full Name</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="text"
                                content={user?.fullName ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="fullName"
                            />
                        </div>

                        <div className="w-full">
                            <h4 className="mt-2 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Email</h4>
                            <ProfileInput
                                disabled={true}
                                type="text"
                                content={user?.email ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="email"
                            />
                        </div>
                    
                        <div className="w-full">
                            <h4 className="mt-2 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Age</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="number"
                                content={user?.age ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="age"
                            />
                        </div>

                        <div className="w-full">
                            <h4 className="mt-2 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Gender</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="select"
                                content={user?.gender ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="gender"
                            />
                        </div>

                        <div className="col-span-1 sm:col-span-2">
                            <h4 className="mt-2 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Bio</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="bio"
                                content={user?.bio ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="bio"
                            />
                        </div>


                    </div>
                </div>


                {/* Physical Measurement */}
                <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-4 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark">
                    <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark">
                        <i className="fa-solid fa-ruler"></i> Physical Measurement
                    </h4>
                    <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">
                        Your current physical stats.
                    </p>
                    <div className="grid grid-cols-2 gap-2 m-4 auto-rows-[80px]">
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Height (cm)</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="number"
                                content={user?.height ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="height"
                            />
                        </div>
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Weight (kg)</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="number"
                                content={user?.currentWeight ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="currentWeight"
                            />
                        </div>
                        <div className="col-span-2">
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">
                                Body Mass Index (BMI)
                            </h4>
                            <ProfileInput
                                disabled={true}
                                type="number"
                                content={Number(BMI).toFixed(2)}
                                profile={profile}
                                setProfile={setProfile}
                                field="bmi"
                            />
                        </div>
                    </div>
                </div>

                {/* Fitness Goals */}
                <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-4 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark">
                    <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark">
                        <i className="fa-solid fa-bullseye"></i> Fitness Goals
                    </h4>
                    <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">
                        Define your fitness objectives.
                    </p>
                    <div className="grid grid-cols-1 gap-2 m-4 auto-rows-[80px]">
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Primary Goal</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="select"
                                content={user?.primaryGoal ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="primaryGoal"
                            />
                        </div>
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">
                                Target Weight (kg)
                            </h4>
                            <ProfileInput
                                disabled={disabled}
                                type="number"
                                content={user?.targetWeight ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="targetWeight"
                            />
                        </div>
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Activity Level</h4>
                            <ProfileInput
                                disabled={disabled}
                                type="select"
                                content={user?.activityLevel ?? ""}
                                profile={profile}
                                setProfile={setProfile}
                                field="activityLevel"
                            />
                        </div>
                        <div>
                            <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Progress to go</h4>
                            <div className="bg-green-200 font-bold rounded px-3 py-2 w-full text-prof-text-secondary dark:text-prof-text">
                                {Math.abs(Number(user?.targetWeight ?? 0) - Number(user?.currentWeight ?? 0))} kg
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}