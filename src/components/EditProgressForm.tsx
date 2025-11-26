//didnt use this component not useddddddd

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProgress } from "../store/slices/progressSlice";
import { updateUser } from "../store/slices/authSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function EditProgressForm() {
  const dispatch = useDispatch<AppDispatch>();
  const progress = useSelector((state: RootState) => state.Progress);
  const { uid } = useSelector((state: RootState) => state.Authantication);

  const [currentWeight, setCurrentWeight] = useState(progress.currentWeight);
  const [targetWeight, setTargetWeight] = useState(progress.targetWeight);

  const handleSave = () => {
    dispatch(updateProgress({ currentWeight, targetWeight }));

    const initialWeight = parseFloat(progress.initialWeight ?? currentWeight);
    const weightLost = Math.max(initialWeight - parseFloat(currentWeight), 0);

    if (uid) {
      dispatch(
        updateUser({
          uid,
          data: {
            progress: {
              currentWeight,
              targetWeight,
              weightLost,
              workoutsCompleted: progress.workoutsCompleted ?? 0,
              caloriesBurned: progress.caloriesBurned ?? 0,
            },
          },
        })
      );
      
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Weight & Goals</h2>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium dark:text-gray-300">
          Current Weight (kg)
        </label>
        <input
          type="number"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          className="p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
        />

        <label className="text-sm font-medium dark:text-gray-300">
          Target Weight (kg)
        </label>
        <input
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          className="p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
