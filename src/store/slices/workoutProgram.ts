import { useSelector } from 'react-redux';
import { workoutPrograms } from './../../types/weeklyPlans';
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store';


const initialState = {
    name: Object.keys(workoutPrograms)[0],
}
const WorkoutProgramSlice = createSlice({
    name: "workoutProgram",
    initialState,
    reducers: {
        setToBeginnerFullBodyPlan(state) {
            if (state.name !== "beginnerFullBodyPlan") {
                state.name = "beginnerFullBodyPlan";
            }
        },
        setToStrengthBuilderPlan(state) {
            if (state.name !== "strengthBuilderPlan") {
                state.name = "strengthBuilderPlan";
            }
        },
        setToHiitFatBurnerPlan(state) {
            if (state.name !== "hiitFatBurnerPlan") {
                state.name = "hiitFatBurnerPlan";
            }
        },
        setToProgram(state, action) {
            const programName = action.payload;
            state.name = programName;
        }
    }
})


export const workoutProgramsReducer = WorkoutProgramSlice.reducer;
export const { setToBeginnerFullBodyPlan, setToStrengthBuilderPlan, setToHiitFatBurnerPlan, setToProgram } = WorkoutProgramSlice.actions;

export const getWorkoutProgram = () => {
    const selectedProgramName = useSelector((state: RootState) => state.WorkoutProgram.name);
    return {
        name: selectedProgramName,
        plan: workoutPrograms[selectedProgramName as keyof typeof workoutPrograms]
    };
}