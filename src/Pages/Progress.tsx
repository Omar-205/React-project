import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchUser, updateUser } from "../store/slices/authSlice";
import { updateProgress } from "../store/slices/progressSlice";

import NavTabs from "../components/NavTabs";
import ProgressPhotos from "../components/ProgressPhotos";
import RecCard from "../components/RecCard";
import WeightProgress from "../components/WeightProgress";
import WorkoutStats from "../components/WorkoutStats";

const titles = ["Weight Progress", "Workout Stats", "Progress Photos"];
const components = [<WeightProgress />, <WorkoutStats />, <ProgressPhotos />];

export default function Progress() {
  const dispatch = useDispatch<AppDispatch>();
  const { uid, user, status } = useSelector(
    (state: RootState) => state.Authantication
  );

  const progress = user?.progress;
  const [currentWeight, setCurrentWeight] = useState("0");
  const [targetWeight, setTargetWeight] = useState("0");
  const [tempW, setTempW] = useState("0");
  const [date, setDate] = useState(""); // 🗓️ New date field

  // 🔹 Load user data once
  useEffect(() => {
    if (uid && status === "idle") {
      dispatch(fetchUser(uid));
    }
    console.log("User from Redux:", user);
  }, [uid, status, dispatch, user]);

  // 🔹 Save handler
// 🔹 Save handler
 const handleSave = () => {
 if (!uid || !date) {
        // You could add an alert here to tell the user a date is required
        console.log("A date is required to save a weight entry.");
        return;
    };

    // --- 1. Get today's date in 'YYYY-MM-DD' format ---
    // This format matches the value from <input type="date">
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // JS months are 0-11
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;

    // --- 2. Check if the selected date is today ---
    const isToday = (date === todayString);

    const newWeightFromInput = tempW; // The weight from the input field

    // --- 3. Prepare data that *always* gets updated ---

    // A. New entry for the historical weight chart
    const newEntry = {
 date, // The date the user selected
 weight: parseFloat(newWeightFromInput),
 };
 const existingData = progress?.weightData ?? [];
 const updatedWeightData = [...existingData, newEntry]; // Always add the new entry

    // B. The user's goal (this can be updated anytime)
    const newTargetWeight = targetWeight;

    // --- 4. Prepare data that is *conditional* ---
    let finalCurrentWeight;
    let finalWeightLost;

    if (isToday) {
        // ✅ It's today. Update the official "current" weight and "weight lost"
        finalCurrentWeight = newWeightFromInput;
        finalWeightLost =
 parseFloat(user?.startWeight || "0") - parseFloat(newWeightFromInput || "0");
        
        // Update local state for the input field
        setCurrentWeight(newWeightFromInput);
    } else {
        // 🛑 It's not today. Keep the *existing* "current" weight and "weight lost"
        finalCurrentWeight = user?.progress?.currentWeight || currentWeight;
        finalWeightLost = user?.progress?.weightLost || 0;
        
        // Optional: Let the user know what happened
        console.log("Historical weight added to chart, but 'Current Weight' was not updated because the date is not today.");
    }

 // --- 5. Create final payloads and dispatch ---

 const updatedProgress = {
 ...progress,
 currentWeight: finalCurrentWeight, // Conditionally set
 targetWeight: newTargetWeight,     // Always updated
 weightLost: finalWeightLost,       // Conditionally set
 weightData: updatedWeightData,     // Always updated
      // Preserve existing stats
 workoutsCompleted: progress?.workoutsCompleted ?? 0,
 caloriesBurned: progress?.caloriesBurned ?? 0,
 };

 dispatch(updateProgress(updatedProgress));

 dispatch(
   updateUser({
  uid,
    data: {
 WeightLost: finalWeightLost,
  progress: updatedProgress,
   currentWeight: finalCurrentWeight,
 targetWeight: newTargetWeight, },
 })
 );

  setDate(""); // Reset the date input
 };
  // 📊 Cards
  const progRecData = [
    {
      given: user?.progress.weightLost || 0,
      statement: "Weight lost",
      icon: <i className="fa-solid fa-arrow-down text-green-500"></i>,
    },
    {
      given: targetWeight,
      statement: "To goal",
      icon: <i className="fa-solid fa-bullseye text-blue-500"></i>,
    },
    {
      given: progress?.workoutsCompleted ?? 0,
      statement: "Workouts",
      icon: <i className="fa-solid fa-dumbbell text-violet-500"></i>,
    },
    {
      given: progress?.caloriesBurned ?? 0,
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
            given={item.given}
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
