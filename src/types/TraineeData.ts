export interface TraineeData {
    email: string;
    fullName: string;
    gender: string;
    age: string;
    height: string;
    currentWeight: string;
    primaryGoal: string;
    targetWeight: string;
    activityLevel: string;
    bio: string;
    createdAt: string;
    bmi: number | null;
    workoutData: {
        selectedWorkout: string;
        history: Record<number, { caloriesBurned: number }>
    }
}