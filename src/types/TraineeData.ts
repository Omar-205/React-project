import type { ProgressData } from "./progressData";
import type { dailyMeal } from "./mealPlansData";


export interface TraineeData {
    bmi?: number;
    fullName: string;
    gender: string;
    age: string;
    email: string;
    height: string;
    currentWeight: string;
    startWeight: string;
    primaryGoal: string;
    targetWeight: string;
    activityLevel: string;
    totalWorkouts: number | null;
    bio: string;
    createdAt: string;
    photoURL?: string;
    workoutData: {
        selectedWorkout: string;
        history: Record<number, {
            caloriesBurned: number,
            type?: string
        }>
    };
    nutritionData: {
        selectedPlan: string;
        history: Record<string, dailyMeal>
    }
    tempWeight: string;
    progress?: Partial<ProgressData> | null;

}