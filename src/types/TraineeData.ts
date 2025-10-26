export interface TraineeData {
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
    workoutData: {
        selectedWorkout: string;
        history: Record<number, { caloriesBurned: number }>
    }
}