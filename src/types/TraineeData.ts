import type { ProgressData } from "./progressData";
import type { dailyMeal } from "./mealPlansData";


export interface TraineeData {
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
    toatalWorkouts: number|null;
    bio: string;
    createdAt: string;
    bmi: number | null;
    workoutData: {
        selectedWorkout: string;
        history: Record<number, { caloriesBurned: number }>
    };
    nutritionData: {
        selectedPlan: string;
        history: Record<string, dailyMeal>
    }
    tempWeight: string;
    WeightLost: number;
    progress?: ProgressData | null;
}