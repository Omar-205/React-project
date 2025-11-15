import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  initialWeight: string | null; // 👈 new
  currentWeight: string;
  targetWeight: string;
  weightLost: number;
  workoutsCompleted: number;
  caloriesBurned: number;
}

const initialState: ProgressState = {
  initialWeight: null,
  currentWeight: "0",
  targetWeight: "0",
  weightLost: 0,
  workoutsCompleted: 0,
  caloriesBurned: 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    updateProgress: (state, action: PayloadAction<Partial<ProgressState>>) => {
      const prevWeight = parseFloat(state.initialWeight ?? state.currentWeight) || 0;
      const newWeight = parseFloat(action.payload.currentWeight ?? state.currentWeight) || 0;
      const newGoal = action.payload.targetWeight ?? state.targetWeight;

      // Only set initial weight the first time user saves
      if (state.initialWeight === null) {
        state.initialWeight = state.currentWeight;
      }

      const weightLost = prevWeight > 0 ? prevWeight - newWeight : 0;

      state.currentWeight = newWeight.toString();
      state.targetWeight = newGoal.toString();
      state.weightLost = Math.max(weightLost, 0); // avoid negative
      state.workoutsCompleted = action.payload.workoutsCompleted ?? state.workoutsCompleted;
      state.caloriesBurned = action.payload.caloriesBurned ?? state.caloriesBurned;
    },
  },
});

export const { updateProgress } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;
