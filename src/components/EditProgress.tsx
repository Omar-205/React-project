
// try to make progress editable by the user  but didn't use it


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { updateProgress } from "../store/slices/progressSlice";

export const EditProgress: React.FC = () => {
  const dispatch = useDispatch();
  const trainee = useSelector((state: RootState) => state.Authantication.user); 
  const progress = trainee?.progress;
  const workoutsCompleted = progress?.progRecData?.find(item => item.statement === "Workouts")?.given || 0;
  const caloriesBurned = progress?.progRecData?.find(item => item.statement === "Calories burned")?.given || 0;  
  const [currentWeight, setCurrentWeight] = useState(trainee?.currentWeight|| "");
  const [goal, setGoal] = useState(trainee?.targetWeight || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const initialWeight = Number(trainee?.currentWeight || 0);
    const newWeight = Number(currentWeight || 0);
    const weightLost = initialWeight - newWeight;

    dispatch(updateProgress({
      currentWeight: newWeight.toString(),
      targetWeight: goal,
      weightLost: weightLost > 0 ? weightLost : 0,
      workoutsCompleted,
      caloriesBurned,
    }));
    
  };

  return (
    <div className="p-4 bg-gray-100 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-center">Edit Your Progress</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col">
          <span>Current Weight (kg):</span>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
        </label>

        <label className="flex flex-col">
          <span>Goal Weight (kg):</span>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
