import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import { workoutProgramsReducer } from "./slices/workoutProgram";
import { progressReducer } from "./slices/progressSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    Authantication: authReducer,
    WorkoutProgram: workoutProgramsReducer,
    Progress: progressReducer, // ✅ added

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
