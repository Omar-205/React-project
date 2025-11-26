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

//progress elements in its nav
const titles = ["Weight Progress", "Workout Stats", "Progress Photos"];
const components = [<WeightProgress />, <WorkoutStats />, <ProgressPhotos />];


export default function Progress() {
    //today's date index
   const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
    //auth Data
   const authData = useSelector((state: RootState) => state.Authantication);
 
  const dispatch = useDispatch<AppDispatch>();
  const { uid, user } = useSelector(
    (state: RootState) => state.Authantication
  );

  //data of progress 
  const progress = user?.progress;
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeight || "0");
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || "0");
  const [tempW, setTempW] = useState(currentWeight || "0");
  const [date, setDate] = useState(""); 



  const handleSave = () => {
    if (!uid || !date) {
      return;
    }
    // Check if the date is today
    const todayDate = new Date();
    const yyyy = todayDate.getFullYear();
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
    const dd = String(todayDate.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;

    const isToday = date === todayString;

    // Inputs from state
    const weightInput = tempW;
    const targetInput = targetWeight;

    //1. Set Defaults to EXISTING DB Values (Preserve data) 
    let finalCurrentWeight = user?.currentWeight || currentWeight;
    let finalWeightLost = user?.WeightLost || 0;
    let finalTargetWeight = user?.targetWeight || "0"; // Default to existing
    let finalPrimaryGoal = user?.primaryGoal;          // Default to existing

    // 2. Overwrite ONLY if Date is Today 
    if (isToday) {
      finalCurrentWeight = weightInput;
      finalTargetWeight = targetInput; 
     
      // Calculate Weight Lost
      finalWeightLost = parseFloat(user?.startWeight || "0") - parseFloat(weightInput || "0");
      setCurrentWeight(weightInput);

      // Calculate New Goal based on the NEW target and NEW current
      const currentVal = parseFloat(weightInput);
      const targetVal = parseFloat(targetInput);

      //change primary goal based on weight comparison
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

    // 3. Prepare History Entry 
    const newEntry = {
      date,
      weight: parseFloat(weightInput),
    };
    const existingData = progress?.weightData ?? [];
    const updatedWeightData = [...existingData, newEntry];

    // 4. Prepare Full Progress Object 
    const updatedProgress = {
      ...progress,
      currentWeight: finalCurrentWeight,
      targetWeight: finalTargetWeight, 
      weightLost: finalWeightLost,
      weightData: updatedWeightData,
      progRecData: progress?.progRecData ?? null,
      weightStats: progress?.weightStats ?? null,
      weeklyProgressData: progress?.weeklyProgressData ?? null,
      progressPhotos: progress?.progressPhotos ?? [],
    };

    //  Dispatch Redux
    dispatch(
      updateProgress({
        currentWeight: finalCurrentWeight,
        targetWeight: finalTargetWeight,
        weightLost: finalWeightLost,
        progressPhotos: updatedProgress.progressPhotos,
      })
    );

    //  Update User in DB
    dispatch(
      updateUser({
        uid,
        data: {
          WeightLost: finalWeightLost,
          progress: updatedProgress,
          currentWeight: finalCurrentWeight,
          targetWeight: finalTargetWeight, 
          primaryGoal: finalPrimaryGoal,
        },
      })
    );

    setDate("");
  };
  // 1. Calculate Weight Logic
  const rawWeightDiff = user?.WeightLost || 0;
  const hasGained = rawWeightDiff < 0; // If negative, current > start

  // 2. Create Dynamic Cards
  const progRecData = [
    {
      // Always show absolute number (no negative signs)
      given: Math.abs(rawWeightDiff),

      // Change text based on gain/loss
      statement: hasGained ? "Weight gained" : "Weight lost",

      // Change Icon: Up(Red) for gain, Down(Green) for loss
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
      given: user?.totalWorkouts ?? 0,
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
        <div className="flex flex-col mb-3 md:mb-0">
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
            dark:bg-[var(--color-primary)] dark:text-[var(--color-text-dark)] dark:hover:bg-[var(--color-hover)]
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
