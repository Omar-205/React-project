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
import AlertCard from "../components/AlertCard";

const titles = ["Weight Progress", "Workout Stats", "Progress Photos"];
const components = [<WeightProgress />, <WorkoutStats />, <ProgressPhotos />];

export default function Progress() {
  const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
  const authData = useSelector((state: RootState) => state.Authantication);
  const dispatch = useDispatch<AppDispatch>();
  const { uid, user } = authData;

  const progress = user?.progress;
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeight || "");
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || "");
  const [tempW, setTempW] = useState(currentWeight || "");
  const [date, setDate] = useState("");

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [errors, setErrors] = useState<{ currentWeight?: string; targetWeight?: string; date?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!tempW || isNaN(Number(tempW)) || Number(tempW) <= 0) newErrors.currentWeight = "Enter a valid current weight";
    if (!targetWeight || isNaN(Number(targetWeight)) || Number(targetWeight) <= 0) newErrors.targetWeight = "Enter a valid target weight";
    if (!date) newErrors.date = "Please select a date";
    if (date) {
      const selectedDate = new Date(date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) newErrors.date = "Date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!uid) return;
  
    // ✅ Validate form
    if (!validateForm()) {
      setAlert({ type: "error", message: "Please fix errors in the form." });
      return;
    }
  
    const weightInput = tempW;
    const targetInput = targetWeight;
  
    // 📅 Today's date in YYYY-MM-DD
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
  
    // ⏳ Check if selected date is today
    const isToday = date === todayString;
  
    const finalCurrentWeight = isToday ? weightInput : (user?.currentWeight || "0");
    const finalTargetWeight = isToday ? targetInput : (user?.targetWeight || "0");
  
    // 🎯 Calculate primary goal
    let finalPrimaryGoal = user?.primaryGoal;
    if (isToday) {
      const currentVal = parseFloat(weightInput);
      const targetVal = parseFloat(targetInput);
      if (!isNaN(currentVal) && !isNaN(targetVal)) {
        if (targetVal > currentVal) finalPrimaryGoal = "Gain weight";
        else if (targetVal < currentVal) finalPrimaryGoal = "Lose weight";
        else finalPrimaryGoal = "Maintain Weight";
      }
    }
  
    if (isToday) setCurrentWeight(finalCurrentWeight);
  
    // 🔄 Update weight history (overwrite if date exists)
    const newEntry = { date, weight: parseFloat(weightInput) };
    const existingData = progress?.weightData ?? [];
    let updatedWeightData = existingData.map(entry =>
      entry.date === date ? newEntry : entry
    );
    if (!updatedWeightData.find(entry => entry.date === date)) {
      updatedWeightData.push(newEntry);
    }
  
    // 📝 Update progress object
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
  
    // 💾 Dispatch updates
    dispatch(updateProgress({
      currentWeight: finalCurrentWeight,
      targetWeight: finalTargetWeight,
      progressPhotos: updatedProgress.progressPhotos,
    }));
  
    dispatch(updateUser({
      uid,
      data: {
        progress: updatedProgress,
        currentWeight: finalCurrentWeight,
        targetWeight: finalTargetWeight,
        primaryGoal: finalPrimaryGoal,
      },
    }));
  
    // ✅ Reset date input
    setDate("");
  
    // 🎉 Success alert
      setAlert({ type: "success", message: "Progress saved successfully!" });

  
  };
  

  const rawWeightDiff = Number(currentWeight) - Number(user?.startWeight);
  const hasGained = rawWeightDiff > 0; 
  const toGoal = Number(targetWeight) - Number(currentWeight);

  const progRecData = [
    {
      given: Math.abs(rawWeightDiff),
      statement: hasGained ? "Weight gained" : "Weight lost",
      icon: hasGained ? <i className="fa-solid fa-arrow-up text-red-500"></i> : <i className="fa-solid fa-arrow-down text-green-500"></i>,
    },
    {
      given: Math.abs(toGoal),
      statement: "To goal",
      icon: <i className="fa-solid fa-bullseye text-blue-500"></i>,
    },
    {
      given: Object.keys(user?.workoutData?.history || {}).length,
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

  {alert && (
    <AlertCard
      key={alert.message}
      variant={alert.type}
      message={alert.message}
      duration={3000}
      dismissible
      onClose={() => setAlert(null)}
    />
  )}


      <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 border rounded-2xl shadow-md bg-[var(--color-light-bg)] dark:bg-primary-dark transition-all md:max-lg:grid md:max-lg:grid-cols-2 gap-4">

        {/* Current Weight */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-black dark:text-secondary">Current Weight (kg)</label>
          <input
            type="number"
            value={tempW}
            onChange={(e) => setTempW(e.target.value)}
            className={`bg-input rounded-lg block p-2.5 pr-10 text-text placeholder:text-text placeholder:text-md placeholder:font-thin dark:bg-input-dark dark:text-text-dark dark:placeholder:text-text-dark w-full h-15
              ${errors.currentWeight ? "border-1 border-error ring-error" : "border border-text-dark focus:border-primary dark:focus:border-primary"}`}
            placeholder="Enter your current weight"
          />
          {errors.currentWeight && <p className="text-error text-sm mt-1">{errors.currentWeight}</p>}
        </div>

        {/* Goal Weight */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-black dark:text-secondary">Goal Weight (kg)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className={`bg-input rounded-lg block p-2.5 pr-10 text-text placeholder:text-text placeholder:text-md placeholder:font-thin dark:bg-input-dark dark:text-text-dark dark:placeholder:text-text-dark w-full h-15
              ${errors.targetWeight ? "border-1 border-error ring-error" : "border border-text-dark focus:border-primary dark:focus:border-primary"}`}
            placeholder="Enter your goal weight"
          />
          {errors.targetWeight && <p className="text-error text-sm mt-1">{errors.targetWeight}</p>}
        </div>

        {/* Date */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-black dark:text-secondary">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`bg-input rounded-lg block p-2.5 pr-10 text-text placeholder:text-text placeholder:text-md placeholder:font-thin dark:bg-input-dark dark:text-text-dark dark:placeholder:text-text-dark w-full h-15 
              ${errors.date ? "border-1 border-error ring-error" : "border border-text-dark focus:border-primary dark:focus:border-primary"}`}
          />
          {errors.date && <p className="text-error text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-6 py-2 font-semibold rounded-xl transition-all bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-black)] dark:bg-[var(--color-primary)] dark:text-white dark:hover:bg-[var(--color-hover)] shadow-sm mt-4 md:mt-0 cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* 📊 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
        {progRecData.map((item, index) => (
          <RecCard key={index} given={Number(item.given)} statement={item.statement} icon={item.icon} />
        ))}
      </div>

      <div className="p-1">
        <NavTabs titles={titles} components={components} />
      </div>
    </div>
  );
}
