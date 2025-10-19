import { Dumbbell, DumbbellIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setToBeginnerFullBodyPlan, setToHiitFatBurnerPlan, setToStrengthBuilderPlan } from "../store/slices/workoutProgram";


export function Programs() {
  const dispatch = useDispatch();
  return <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <div className="text-text bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      flex flex-col justify-between max-w-70 xl:max-w-full">
      <div>
        <DumbbellIcon style={{ background: "#E5FBE8", color: '#02B945', padding: '8px', borderRadius: '8px' }}
          fill="#E5FBE8" size={40} />

        <h3 className="mt-3 font-medium text-slate-700">Beginner Full Body</h3>
        <p className="pb">Perfect for starting your fitness journey</p>
      </div>
      <div className="space-y-1 mt-4">
        <div className="flex justify-between"><p className="font-semibold">Duration: </p> <p>4 Weeks</p></div>
        <div className="flex justify-between"><p className="font-semibold">Frequncy: </p> <p>5x per week</p></div>
        <div className="flex justify-between"><p className="font-semibold">Difficulty: </p> <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">Beginner</p></div>
        <button className="bg-black text-[#65656F] text-center w-full rounded-sm py-1 cursor-pointer"
          onClick={() => {
            dispatch(setToBeginnerFullBodyPlan())
          }}
        >Start Program</button>
      </div>
    </div>

    <div className="text-text bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      flex flex-col justify-between max-w-70 xl:max-w-full">
      <div>

        <DumbbellIcon style={{ background: "#D7E6FF", color: '#3371F8', padding: '8px', borderRadius: '8px' }}
          fill="#D7E6FF" size={40} />

        <h3 className="mt-3 font-medium text-slate-700">Strength Builder</h3>
        <p className="pb-">Build muscle and increase strength</p>
      </div>
      <div className="space-y-1 mt-4">
        <div className="flex justify-between"><p className="font-semibold">Duration: </p> <p>4 Weeks</p></div>
        <div className="flex justify-between"><p className="font-semibold">Frequncy: </p> <p>5x per week</p></div>
        <div className="flex justify-between"><p className="font-semibold">Difficulty: </p> <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">Intermediate</p></div>
        <button className="bg-black text-[#65656F] text-center w-full rounded-sm py-1 cursor-pointer"
          onClick={() => {
            dispatch(setToStrengthBuilderPlan())
          }}
        >Start Program</button>      </div>
    </div>
    <div className="text-text bg-[#FEFEFE] border w-max border-gray-200 rounded-lg p-6
      max-w-70 xl:max-w-full flex flex-col justify-between">
      <div className="">

        <DumbbellIcon style={{ background: "#FFE9CE", color: '#FF8927', padding: '8px', borderRadius: '8px' }}
          fill="#FFE9CE" size={40} />

        <h3 className="mt-3 font-medium text-slate-700">Beginner Full Body</h3>
        <p>High-intensity workouts for fat loss</p>
      </div>
      <div className="space-y-1 mt-4">
        <div className="flex justify-between"><p className="font-semibold">Duration: </p> <p>4 Weeks</p></div>
        <div className="flex justify-between"><p className="font-semibold">Frequncy: </p> <p>5x per week</p></div>
        <div className="flex justify-between"><p className="font-semibold">Difficulty: </p> <p className="border-1 rounded-md font-bold h-fit text-[12px] text-[#7F7F7F] text-center px-1 bg-[#FBFBFB]">Advanced</p></div>
        <button className="bg-black text-[#65656F] text-center w-full rounded-sm py-1 cursor-pointer"
          onClick={() => {
            dispatch(setToHiitFatBurnerPlan())
          }}
        >Start Program</button>      </div>
    </div>

  </div>;
}
