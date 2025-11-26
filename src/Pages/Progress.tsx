//imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { updateUser } from "../store/slices/authSlice";
import { updateProgress } from "../store/slices/progressSlice";

import NavTabs from "../components/NavTabs";
import ProgressPhotos from "../components/ProgressPhotos";
import RecCard from "../components/RecCard";
import WeightProgress from "../components/WeightProgress";
import WorkoutStats from "../components/WorkoutStats";

const titles = ["Weight Progress", "Workout Stats", "Progress Photos"];
const components = [<WeightProgress />, <WorkoutStats />, <ProgressPhotos />];


export default function Progress() {
    //today's date index
   const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
   const authData = useSelector((state: RootState) => state.Authantication);
 
  const dispatch = useDispatch<AppDispatch>();
  const { uid, user } = useSelector(
    (state: RootState) => state.Authantication
  );

  const progress = user?.progress;
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeight || "0");
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || "0");
  const [tempW, setTempW] = useState(currentWeight || "0");
  const [date, setDate] = useState(""); 
const handleSave = () => {
    if (!uid || !date) {
      return;
    }

    const weightInput = tempW;
    const targetInput = targetWeight;

    
    // 1. Get Today's Date 
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    // 2. Check if the selected date is today
    const isToday = date === todayString;

    // If it IS today, use the input. If NOT today, keep the existing DB value.
    const finalCurrentWeight = isToday ? weightInput : (user?.currentWeight || "0");
    const finalTargetWeight = isToday ? targetInput : (user?.targetWeight || "0");
    
    // 4. Determine Primary Goal
    // Only recalculate the goal if we are actually updating the current stats 
    let finalPrimaryGoal = user?.primaryGoal; 

    if (isToday) {
      const currentVal = parseFloat(weightInput);
      const targetVal = parseFloat(targetInput);

      if (!isNaN(currentVal) && !isNaN(targetVal)) {
        if (targetVal > currentVal) {
          finalPrimaryGoal = "Gain weight";
        } else if (targetVal < currentVal) {
          finalPrimaryGoal = "Lose weight";
        } else {
          finalPrimaryGoal = "Maintain Weight";
        }
      }
    }
    if (isToday) {
        setCurrentWeight(finalCurrentWeight);
    }

    const newEntry = {
      date,
      weight: parseFloat(weightInput),
    };
    const existingData = progress?.weightData ?? [];
    const updatedWeightData = [...existingData, newEntry];

    const updatedProgress = {
      ...progress,
      currentWeight: finalCurrentWeight,
      targetWeight: finalTargetWeight,
      weightData: updatedWeightData,
      progRecData: progress?.progRecData ?? null,
      weightStats: progress?.weightStats ?? null,
      weeklyProgressData: progress?.weeklyProgressData ?? null,
      progressPhotos: progress?.progressPhotos ?? [],
    };

    dispatch(
      updateProgress({
        currentWeight: finalCurrentWeight,
        targetWeight: finalTargetWeight,
        progressPhotos: updatedProgress.progressPhotos,
      })
    );

    dispatch(
      updateUser({
        uid,
        data: {
          progress: updatedProgress,
          currentWeight: finalCurrentWeight,
          targetWeight: finalTargetWeight,
          primaryGoal: finalPrimaryGoal,
        },
      })
    );

    setDate("");
  };
  // 1. Calculate Weight Difference since the beging  
  const rawWeightDiff = Number(user?.startWeight)-Number(currentWeight);
  const hasGained = rawWeightDiff < 0; // If negative, current > start

  const progRecData = [
    {
      //show absolute number
      given: Math.abs(rawWeightDiff),

      statement: hasGained ? "Weight gained" : "Weight lost",

      // Up for gain, Down for loss
      icon: hasGained ? (
        <i className="fa-solid fa-arrow-up text-red-500"></i>
      ) : (
        <i className="fa-solid fa-arrow-down text-green-500"></i>
      ),
    },
    {
      given: Number(currentWeight)-Number(targetWeight),
      statement: "To goal",
      icon: <i className="fa-solid fa-bullseye text-blue-500"></i>,
    },
    {
      given: Object.keys(user?.workoutData?.history || {}).length ?? 0,
      statement: "Workouts",
      icon: <i className="fa-solid fa-dumbbell text-violet-500"></i>,
    },
    {
      given: authData?.user?.workoutData?.history?.[today]?.caloriesBurned || 0,
      statement: "Calories burned",
      icon: <i className="fa-solid fa-heart-pulse text-orange-500"></i>,
    },
  ];

  return (
    <div className="flex flex-col gap-4 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8 font-sans">
      <h3 className="font-bold text-3xl md:text-3xl mb-2 text-[var(--color-text)] dark:text-[var(--color-text-secondary-dark)]">
        Progress Tracking
        <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] text-lg">
          Monitor your fitness journey and celebrate achievements
        </p>
      </h3>

      <div
        className="
          flex flex-col md:flex-row justify-between items-center mt-4 p-4 
          border border-4-[var(--color-light-border)] dark:border-4-[var(--color-secondary-dark)] 
          rounded-2xl shadow-md
          bg-[var(--color-light-bg)] dark:bg-[var(--color-secondary-dark)]
          transition-all
        "
      >
        {/*  Current Weight */}
        <div className="flex flex-col mb-3 md:mb-0 dark:text-white">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Current Weight (kg)
          </label>
          <input
            type="number"
            value={tempW}
            onChange={(e) => setTempW(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-secondary
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-44 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/*  Goal Weight */}
        <div className="flex flex-col mb-3 md:mb-0">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Goal Weight (kg)
          </label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-secondary
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-44 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/*  Date */}
        <div className="flex flex-col mb-3 md:mb-0">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Date (YYYY-DD-MM)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-secondary
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-48 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/*  Save Button */}
        <button 
          onClick={handleSave}
          className="
            px-6 py-2 mt-4 md:mt-0 font-semibold rounded-xl transition-all
            bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-black)]
            dark:bg-[var(--color-primary)] dark:text-white dark:hover:bg-[var(--color-hover)]
            shadow-sm
          "
        >
          Save
        </button>
      </div>

      {/* 📊 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
        {progRecData.map((item, index) => (
          <RecCard
            key={index}
            given={Number(item.given)}
            statement={item.statement}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="p-1">
        <NavTabs titles={titles} components={components} />
      </div>
    </div>
  );
}
