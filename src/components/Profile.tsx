import userProfilePhoto from "../assets/userProfilePhoto.png";
import profileData, { BMI } from "../profile/profileData";
import EditProfileButton from "./EditProfileButton";
import ProfileInput from "./ProfileInput";
import { useState } from "react";


export default function Profile() {
    const [disabled, setDisabled] = useState(false); // to toggle between edit and save mode
    const [profile, setProfile] = useState(profileData); // to hold profile data







    return <div className="flex flex-col gap-8 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] mt-8 px-4">

        <div className="flex justify-between items-center "> {/*heading section */}
            <div>
                <h1 className="text-4xl text-prof-text font-bold mb-4 dark:text-text-dark">Profile</h1>
                <p className="text-prof-text-secondary dark:text-text-secondary-dark">Manage your personal information and fitness goals.</p>
            </div>
            <div>  {/* edit profile button when needed */}
                <EditProfileButton   
                    disabled={disabled}
                    setDisabled={setDisabled}
                    profile={profile}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 mt-8 auto-rows-[150px]">
            <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-3 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark">  {/* first cell */}
                <h4 className="m-4 text-prof-text font-bold dark:text-text-dark">Profile Picture</h4>
                <div className="flex justify-center mt-5">
                    <img src={userProfilePhoto} alt="Profile Picture" className="object-cover w-[150px] h-[150px]" />  {/*profile picture */}
                </div>
                <hr className="m-4 h-[2px] bg-text border-0" />
                <p className="text-prof-text-secondary m-4 dark:text-text-secondary-dark">
                    <i className="fa-solid fa-calendar dark:text-text-dark"></i>
                    <span className="font-bold dark:text-text-dark">Member since:</span> {profileData.joinDate}
                </p>
                <p className="text-prof-text-secondary m-4 dark:text-text-secondary-dark">
                    <i className="fa-solid fa-chart-line dark:text-text-dark"></i>
                    <span className="font-bold dark:text-text-dark">Fitness Level:</span> {profileData.fitnessLevel}
                </p>
            </div>
            <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-5 row-span-3 rounded-2xl shadow-xl dark:bg-primary-dark"> {/* second cell */}
                <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark">Personal Information</h4>
                <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">Your basic profile details.</p>
                <div className="grid grid-cols-2 gap-2 m-4 auto-rows-[80px]">
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Full Name</h4>
                        <ProfileInput disabled={disabled} type="text" content={profile.name} profile={profile} setProfile={setProfile} field="name" />  {/*full name */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Email Address</h4>
                        <ProfileInput disabled={disabled} type="email" content={profile.email} profile={profile} setProfile={setProfile} field="email" /> {/*email */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Age</h4>
                        <ProfileInput disabled={disabled} type="number" content={profile.age} profile={profile} setProfile={setProfile} field="age" /> {/*age */}   
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Gender</h4>
                        <ProfileInput disabled={disabled} type="select" content={profile.gender} profile={profile} setProfile={setProfile} field="gender" /> {/*gender */}
                    </div>
                    <div className="col-span-2">
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Bio</h4>
                        <ProfileInput disabled={disabled} type="bio" content={profile.bio} profile={profile} setProfile={setProfile} field="bio" /> {/*bio */}
                    </div>
                </div>
            </div>
            <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-4 row-span-3 rounded-2xl shadow-xl xl dark:bg-primary-dark">  {/* third cell */}
                <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark"><i className="fa-solid fa-ruler"></i> Physical Measurement</h4>
                <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">Your current physical stats.</p>
                <div className="grid grid-cols-2 gap-2 m-4 auto-rows-[80px]">
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Height (cm)</h4>
                        <ProfileInput disabled={disabled} type="number" content={profile.height} profile={profile} setProfile={setProfile} field="height" /> {/*height */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Weight (kg)</h4>
                        <ProfileInput disabled={disabled} type="number" content={profile.weight} profile={profile} setProfile={setProfile} field="weight" /> {/*weight */}
                    </div>
                    <div className="col-span-2">
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Body Mass Index (BMI)</h4>
                        <ProfileInput disabled={true} type="number" content={BMI(profileData)} profile={profile} setProfile={setProfile} field="bmi" /> {/*bmi */}
                    </div>
                </div>
            </div>
            <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-4 row-span-3 rounded-2xl shadow-xl xl dark:bg-primary-dark"> {/* fourth cell */}
                <h4 className="m-4 mb-2 text-prof-text font-bold dark:text-text-dark"><i className="fa-solid fa-bullseye"></i> Fitness Goals</h4> 
                <p className="text-prof-text-secondary ml-4 dark:text-text-secondary-dark">Define your fitness objectives.</p>
                <div className="grid grid-cols-1 gap-2 m-4 auto-rows-[80px]">
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Primary Goals</h4>
                        <ProfileInput disabled={disabled} type="select" content={profile.primaryGoals} profile={profile} setProfile={setProfile} field="primaryGoals" /> {/*primary goals */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Target Weight (kg)</h4>
                        <ProfileInput disabled={disabled} type="number" content={profile.targetWeight} profile={profile} setProfile={setProfile} field="targetWeight" /> {/*target weight */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Activity Level</h4>
                        <ProfileInput disabled={disabled} type="select" content={profile.activityLevel} profile={profile} setProfile={setProfile} field="activityLevel" /> {/*activity level */}
                    </div>
                    <div>
                        <h4 className="m-4 mb-2 text-prof-text-secondary font-bold dark:text-text-dark">Progress to go</h4>
                        <div className="bg-green-200 font-bold rounded px-3 py-2 w-full text-prof-text-secondary dark:text-prof-text">{Math.abs(profile.weight - profile.targetWeight)} kg</div> {/*progress to go */}
                    </div>


                </div>
            </div>
        </div>


    </div>
}