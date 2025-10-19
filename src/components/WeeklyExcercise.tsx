
import { getWorkoutProgram } from "../store/slices/workoutProgram";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function WeeklyExcercise(props: { day?: number, done?: boolean }) {
    const plan = getWorkoutProgram().plan.program;
    let { day, done } = props;
    if (!day) day = 0;
    const dayName = days[day % 7];
    return (
        <div className={"flex justify-between items-center mt-4 p-2 border-1 dark:border-gray-700 rounded-md"
            + (done ? ' bg-green-50 dark:bg-green-900/20 border-[#CBF8E3]' :
                day == new Date().getDay() - 1 ? ' bg-[#EEF5FF] dark:bg-blue-900/20 border-[#AED4FF] border-2' :
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
            {!done && day == new Date().getDay() - 1 && (<div className="text-prof-text-secondary dark:text-text-primary-dark font-bold text-sm bg-[#D5E7FE] px-2 py-1 rounded-lg">
                Today
            </div>)}
        </div>
    )
}