import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProgressEntry {
  date: string | null;
  frontPhoto: string| null;
  sidePhoto: string| null;
}

interface ProgressState {
  initialWeight: string | null;
  currentWeight: string;
  targetWeight: string;
  weightLost: number;
  workoutsCompleted: number;
  caloriesBurned: number;

  progressPhotos: ProgressEntry[]; 
}

const initialState: ProgressState = {
  initialWeight: null,
  currentWeight: "0",
  targetWeight: "0",
  weightLost: 0,
  workoutsCompleted: 0,
  caloriesBurned: 0,

  progressPhotos: [], // 👈 added
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    updateProgress: (state, action: PayloadAction<Partial<ProgressState>>) => {
      const prevWeight = parseFloat(state.initialWeight ?? state.currentWeight) || 0;
      const newWeight = parseFloat(action.payload.currentWeight ?? state.currentWeight) || 0;
      const newGoal = action.payload.targetWeight ?? state.targetWeight;

      if (state.initialWeight === null) {
        state.initialWeight = state.currentWeight;
      }

      const weightLost = prevWeight > 0 ? prevWeight - newWeight : 0;
      state.currentWeight = newWeight.toString();
      state.targetWeight = newGoal.toString();
      state.weightLost = Math.max(weightLost, 0);
      state.workoutsCompleted = action.payload.workoutsCompleted ?? state.workoutsCompleted;
      state.caloriesBurned = action.payload.caloriesBurned ?? state.caloriesBurned;
    },

    addProgressPhoto: (state, action: PayloadAction<ProgressEntry>) => {
      state.progressPhotos.push(action.payload);
    },
  },
});

export const { updateProgress, addProgressPhoto } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;
