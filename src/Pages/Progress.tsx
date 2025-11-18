import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchUser, updateUser } from "../store/slices/authSlice";
import { updateProgress } from "../store/slices/progressSlice";
 import { workoutPrograms } from "../types/weeklyPlans";

import NavTabs from "../components/NavTabs";
import ProgressPhotos from "../components/ProgressPhotos";
import RecCard from "../components/RecCard";
import WeightProgress from "../components/WeightProgress";
import WorkoutStats from "../components/WorkoutStats";

const titles = ["Weight Progress", "Workout Stats", "Progress Photos"];
const components = [<WeightProgress />, <WorkoutStats />, <ProgressPhotos />];

export default function Progress() {
  const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
  
    const authData = useSelector((state: RootState) => state.Authantication);
   const [selectedProgramName, setSelectedProgramName] = useState(authData?.user?.workoutData?.selectedWorkout || "beginnerFullBodyPlan");
   const selectedProgram = workoutPrograms[selectedProgramName];
   const todayIndex = (today - 1) % 7;
  const [workout, setWorkout] = useState(selectedProgram.program[todayIndex]);
 
  const dispatch = useDispatch<AppDispatch>();
  const { uid, user, status } = useSelector(
    (state: RootState) => state.Authantication
  );

  const progress = user?.progress;
  const [currentWeight, setCurrentWeight] = useState("0");
  const [targetWeight, setTargetWeight] = useState("0");
  const [tempW, setTempW] = useState("0");
  const [date, setDate] = useState(""); // 🗓️ New date field




  
  useEffect(() => {
    if (uid && status === "idle") {
      dispatch(fetchUser(uid));
    }
    console.log("User from Redux:", user);
  }, [uid, status, dispatch, user]);

  const handleSave = () => {
    if (!uid || !date) {
     console.log("A date is required to save a weight entry.");
      return;
    };

    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;

    const isToday = (date === todayString);

    const newWeightFromInput = tempW; 

    const newEntry = {
      date, 
      weight: parseFloat(newWeightFromInput),
    };
    const existingData = progress?.weightData ?? [];
    const updatedWeightData = [...existingData, newEntry]; 

    const newTargetWeight = targetWeight;

    let finalCurrentWeight;
    let finalWeightLost;

    if (isToday) {
      finalCurrentWeight = newWeightFromInput;
      finalWeightLost =
        parseFloat(user?.startWeight || "0") - parseFloat(newWeightFromInput || "0");

      setCurrentWeight(newWeightFromInput);
    } else {
      finalCurrentWeight = user?.currentWeight || currentWeight;
      finalWeightLost = user?.WeightLost || 0;

      console.log("Historical weight added to chart, but 'Current Weight' was not updated because the date is not today.");
    }


    const updatedProgress = {
      ...progress,
      currentWeight: finalCurrentWeight,
      targetWeight: newTargetWeight,
      weightLost: finalWeightLost,
      weightData: updatedWeightData,
      progRecData: progress?.progRecData ?? null,
      weightStats: progress?.weightStats ?? null,
      weeklyProgressData: progress?.weeklyProgressData ?? null,
      progressPhotos: progress?.progressPhotos ?? [], // Always array
    };
    
    // ---------- Dispatch Redux (ONLY progress slice fields) ----------
    dispatch(
      updateProgress({
        currentWeight: finalCurrentWeight,
        targetWeight: newTargetWeight,
        weightLost: finalWeightLost,
        progressPhotos: updatedProgress.progressPhotos,
      })
    );
    
    // ---------- Update user in DB ----------
    dispatch(
      updateUser({
        uid,
        data: {
          WeightLost: finalWeightLost,
          progress: updatedProgress,  // full object for DB
          currentWeight: finalCurrentWeight,
          targetWeight: newTargetWeight,
        },
      })
    );

    setDate(""); // Reset the date input
  };
  // 📊 Cards
  const progRecData = [
    {
      given: user?.WeightLost || 0,
      statement: "Weight lost",
      icon: <i className="fa-solid fa-arrow-down text-green-500"></i>,
    },
    {
      given: targetWeight,
      statement: "To goal",
      icon: <i className="fa-solid fa-bullseye text-blue-500"></i>,
    },
    {
      given: user?.toatalWorkouts ?? 0,
      statement: "Workouts",
      icon: <i className="fa-solid fa-dumbbell text-violet-500"></i>,
    },
    {
      given:authData?.user?.workoutData?.history?.[today]?.caloriesBurned || 0,
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

      {/* ⚙️ Edit Section */}
      <div
        className="
          flex flex-col md:flex-row justify-between items-center mt-4 p-4 
          border border-4-[var(--color-light-border)] dark:border-4-[var(--color-secondary-dark)] 
          rounded-2xl shadow-md
          bg-[var(--color-light-bg)] dark:bg-[var(--color-secondary-dark)]
          transition-all
        "
      >
        {/* 🏋️ Current Weight */}
        <div className="flex flex-col mb-3 md:mb-0">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Current Weight (kg)
          </label>
          <input
            type="number"
            value={tempW}
            onChange={(e) => setTempW(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-[var(--color-input-dark)]
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-44 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/* 🎯 Goal Weight */}
        <div className="flex flex-col mb-3 md:mb-0">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Goal Weight (kg)
          </label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-[var(--color-input-dark)]
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-44 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/* 📅 Date */}
        <div className="flex flex-col mb-3 md:mb-0">
          <label className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Date (YYYY-DD-MM)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              border border-[var(--color-light-border)] dark:border-[var(--color-input-dark)]
              bg-[var(--color-input)] dark:bg-[var(--color-input-dark)]
              text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              rounded-xl p-2 w-48 outline-none
              focus:ring-2 focus:ring-[var(--color-success)] focus:border-[var(--color-success)]
              hover:ring-2 hover:ring-[var(--color-success)]
              transition-all duration-200
            "
          />
        </div>

        {/* 💾 Save Button */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
        {progRecData.map((item, index) => (
          <RecCard
            key={index}
            given={Number(item.given)}
            statement={item.statement}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="p-4">
        <NavTabs titles={titles} components={components} />
      </div>
    </div>
  );
}
