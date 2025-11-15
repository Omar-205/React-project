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
    tempWeight: string;
    WeightLost: number;
    

  progress?: ProgressData | null;
}