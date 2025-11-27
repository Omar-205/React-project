import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { TrophyIcon } from "lucide-react"

export default function WorkoutHistory() {

    const workoutHistory = useSelector((state: RootState) => state.Authantication.user?.workoutData.history) || {}
    const dates = Object.keys(workoutHistory)
    return (
        <div className="text-[#AEAEB8] bg-[#FFFFFF] border-2 border-[#ECECEC] p-5 rounded-2xl 
        dark:bg-primary-dark dark:border-[#C7E1FC]
        ">
            <h2 className="text-[#767677] font-semibold text-2xl">Workout History</h2>
            <p className="text-md mb-6">Your recent training sessions.</p>
            <div className=" flex flex-col gap-3">
                {dates.map((date, idx) => {
                    const data = workoutHistory[+date]
                    let day = new Date(+date * 1000 * 60 * 60 * 24)

                    return (
                        <div key={idx} className="flex justify-between bg-[#F8F9FA] p-4 rounded-lg dark:bg-secondary-dark dark:text-white">
                            <div className="flex justify-between items-center gap-2">
                                <div className="bg-[#D0FAE1] w-10 h-10 rounded-xl flex justify-center items-center">
                                    <TrophyIcon color="#0DA871" fill="#D0FAE1" />
                                </div>
                                <div>
                                    <h4 className="text-[#717680] font-semibold dark:text-white">{data.type || ""}</h4>
                                    <p>{day.getDate()}/{day.getMonth()}/{day.getFullYear()}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-[#92969D] text-lg font-semibold dark:text-white">{data.caloriesBurned} <p className="text-md inline">cal</p></div>
                                <div className="rounded-xl border border-[#C0F9D0] font-semibold text-[#81CD98] px-2">completed</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}