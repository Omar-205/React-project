import type { ProgressData } from "./progressData";

export interface TraineeData {
    email: string;
    fullName: string;
    gender: string;
    age: string;
    height: string;
    currentWeight: string;
    startWeight: string;
    primaryGoal: string;
    targetWeight: string;
    activityLevel: string;
    toatalWorkouts: string;
    bio: string;
    createdAt: string;
<<<<<<< Updated upstream
    bmi: number | null;
    workoutData: {
        selectedWorkout: string;
        history: Record<number, { caloriesBurned: number }>
    }
=======
    tempWeight: string;
    WeightLost: number;
    

  progress?: ProgressData | null;
>>>>>>> Stashed changes
}