
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms } from "../types/weeklyPlans";
import { saveUserData } from "../services/DatabaseServices";
import { useEffect, useState } from "react";

const days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

export default function WeeklyExcercise(props: { day?: number, done?: boolean }) {
    let { day, done } = props;

    const defaultWorkoutPlan = "beginnerFullBodyPlan";
    const authData = useSelector((state: RootState) => state.Authantication);
    // loading the selected plan name form the global state
    let [selectedWorkoutName, setSelectedWorkoutName] = useState(defaultWorkoutPlan);
    useEffect(() => {
        //access the user data in which the workoutData exists
        const userData = authData.user;
        //hanlde workout name does not exist
        if (!userData?.workoutData || !userData.workoutData.selectedWorkout || !userData.workoutData.history || !Object.keys(workoutPrograms).includes(userData.workoutData.selectedWorkout)) {
            saveUserData(authData.uid as string, { workoutData: { selectedWorkout: userData?.workoutData?.selectedWorkout || defaultWorkoutPlan, history: userData?.workoutData?.history || {} } })
            return;
        }
        // if the selected plan is found ?
        else {
            setSelectedWorkoutName(userData.workoutData.selectedWorkout);
        }
    }, [])
    //get plan data and workouts names
    const workoutPlan = workoutPrograms[selectedWorkoutName]; //  workouts and program name
    const plan = workoutPlan.program;          //array of workouts
    const workoutData = authData?.user?.workoutData; // wokrout data including history and plan name
    /**
     * using last friday as a refernce because we assume the week starts on frydays
     * the time stamp of thursdays moodulo 7 = 0
     * we exploit this to get the last friday = last thursday + 1
     * so the week starts at index 0 (fridays) for easier calculations
     */
    const today = Math.floor((new Date().getTime() + 1000 * 60 * 60 * 3) / (1000 * 60 * 60 * 24))
    const lastFriday = (today % 7 == 0 ? today - 6 : today - (today % 7) + 1); // timestamp of last friday (index 0)

    if (!day) day = 0;
    const dayName = days[day % 7];
    const isToday: boolean = (lastFriday + day === today);
    // checking if the excersice in the last occurance of this day is done
    done = done || workoutData?.history[lastFriday + day] != undefined;

    return (
        <div className={"flex justify-between items-center mt-4 p-2 border-1 dark:border-gray-700 rounded-md"
            + (done ? ' bg-green-50 dark:bg-green-900/20 border-[#CBF8E3]' :
                isToday ? ' bg-[#EEF5FF] dark:bg-blue-900/20 border-[#AED4FF] border-2' :
                    'bg-[#F8F9FA] border-[#ECEDF0] border-1 dark:bg-[#2A3C4E]'
            )
        }>
            <div className="flex gap-[2vw]">
                <div className={`${done ? 'bg-green-600 text-white text-2xl font-bold' : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200'} w-10 h-10 flex items-center justify-center rounded-full`}>
                    {done ? <i className="fa-solid fa-circle-check"></i> : dayName[0] + dayName[1]}
                </div>
                <div className="text-[#717784] dark:text-gray-200">
                    <div className="font-bold ">{dayName}</div>
                    <p className=" font-light text-[13px]">{plan[day].title} | {plan[day].duration} min</p>
                </div>
            </div>
            {done && (<div className="text-prof-text-secondary text-sm dark:text-text-secondary-dark bg-[#CDF8E0] dark:bg-green-900/20 px-3 py-1 rounded-lg border-1 border-[#B5F5D4]">
                <i className="fa-solid fa-circle-check text-green-600"></i>
                Done
            </div>)}
            {!done && isToday && (<div className="text-prof-text-secondary dark:text-text-primary-dark font-bold text-sm bg-[#D5E7FE] px-2 py-1 rounded-lg">
                Today
            </div>)}
        </div>
    )
}