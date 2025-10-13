import profileData from "../profile/profileData";

// Define the Workout type if not already defined elsewhere
export interface Workout {
  title: string;
  calories: number;
  level: string;
  exercises: Exercise[];
  duration: number; 
}

export interface Exercise {
  id: number;
  title: string;
  sets: number;
  minReps: number;
  maxReps: number;
  rest: number;
  note: string;
  completed: boolean;
}
export const weeklyWorkoutPlan: Workout[] = [
    {
      title: "Upper Body Strength",
      calories: 320,
      level: profileData.fitnessLevel,
      duration: 45, 
      exercises: [
        { id: 1, title: "Push-ups", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 45, note: "Keep your core tight", completed: false },
        { id: 2, title: "Dumbbell Bench Press", sets: 3, minReps: 8, maxReps: 10, rest: 90, time: 60, note: "Controlled motion", completed: false },
        { id: 3, title: "Bent-over Rows", sets: 3, minReps: 10, maxReps: 12, rest: 75, time: 60, note: "Squeeze shoulder blades", completed: false },
        { id: 4, title: "Overhead Press", sets: 3, minReps: 8, maxReps: 10, rest: 90, time: 50, note: "Keep spine neutral", completed: false },
        { id: 5, title: "Bicep Curls", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 40, note: "Slow eccentric", completed: false },
        { id: 6, title: "Tricep Dips", sets: 3, minReps: 8, maxReps: 12, rest: 60, time: 45, note: "Use parallel bars", completed: false },
      ],
    },
    {
      title: "Lower Body Power",
      calories: 350,
      level: profileData.fitnessLevel,
      duration: 50,
      exercises: [
        { id: 1, title: "Bodyweight Squats", sets: 3, minReps: 15, maxReps: 20, rest: 60, time: 60, note: "Heels stay flat", completed: false },
        { id: 2, title: "Lunges", sets: 3, minReps: 10, maxReps: 12, rest: 60, time: 50, note: "Alternate legs", completed: false },
        { id: 3, title: "Romanian Deadlifts", sets: 3, minReps: 8, maxReps: 10, rest: 90, time: 70, note: "Hinge at hips", completed: false },
        { id: 4, title: "Glute Bridges", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 50, note: "Squeeze at top", completed: false },
        { id: 5, title: "Calf Raises", sets: 3, minReps: 20, maxReps: 25, rest: 45, time: 40, note: "Full range", completed: false },
      ],
    },
    {
      title: "Core & Stability",
      calories: 250,
      level: profileData.fitnessLevel,
      duration: 40,
      exercises: [
        { id: 1, title: "Plank", sets: 3, minReps: 45, maxReps: 60, rest: 60, time: 60, note: "Tighten abs and glutes", completed: false },
        { id: 2, title: "Russian Twists", sets: 3, minReps: 20, maxReps: 30, rest: 45, time: 50, note: "Keep torso steady", completed: false },
        { id: 3, title: "Leg Raises", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 45, note: "Avoid swinging", completed: false },
        { id: 4, title: "Bird Dogs", sets: 3, minReps: 10, maxReps: 12, rest: 45, time: 40, note: "Balance and control", completed: false },
        { id: 5, title: "Mountain Climbers", sets: 3, minReps: 30, maxReps: 40, rest: 60, time: 50, note: "Steady pace", completed: false },
      ],
    },
    {
      title: "Cardio & Conditioning",
      calories: 400,
      level: profileData.fitnessLevel,
      duration: 35,
      exercises: [
        { id: 1, title: "Jump Rope", sets: 4, minReps: 60, maxReps: 90, rest: 60, time: 60, note: "Light on your feet", completed: false },
        { id: 2, title: "Burpees", sets: 3, minReps: 12, maxReps: 15, rest: 75, time: 60, note: "Explosive push-up", completed: false },
        { id: 3, title: "High Knees", sets: 3, minReps: 45, maxReps: 60, rest: 45, time: 50, note: "Maintain tempo", completed: false },
        { id: 4, title: "Jump Squats", sets: 3, minReps: 10, maxReps: 12, rest: 75, time: 50, note: "Land softly", completed: false },
      ],
    },
    {
      title: "Pull & Posterior Chain",
      calories: 320,
      level: profileData.fitnessLevel,
      duration: 45,
      exercises: [
        { id: 1, title: "Pull-ups", sets: 3, minReps: 6, maxReps: 10, rest: 90, time: 60, note: "Full extension", completed: false },
        { id: 2, title: "Barbell Rows", sets: 3, minReps: 8, maxReps: 12, rest: 75, time: 60, note: "Squeeze lats", completed: false },
        { id: 3, title: "Face Pulls", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 50, note: "Elbows high", completed: false },
        { id: 4, title: "Reverse Flys", sets: 3, minReps: 10, maxReps: 12, rest: 60, time: 50, note: "Light weight, full motion", completed: false },
      ],
    },
    {
      title: "Mobility & Recovery",
      calories: 180,
      level: profileData.fitnessLevel,
      duration: 30,
      exercises: [
        { id: 1, title: "Dynamic Stretching", sets: 2, minReps: 8, maxReps: 10, rest: 30, time: 60, note: "Full body flow", completed: false },
        { id: 2, title: "Yoga Sun Salutation", sets: 3, minReps: 5, maxReps: 8, rest: 30, time: 90, note: "Controlled breathing", completed: false },
        { id: 3, title: "Foam Rolling", sets: 1, minReps: 10, maxReps: 15, rest: 30, time: 60, note: "Focus on tight spots", completed: false },
      ],
    },
    {
      title: "Active Rest Day",
      calories: 150,
      level: profileData.fitnessLevel,
      duration: 25,
      exercises: [
        { id: 1, title: "Light Walk or Cycling", sets: 1, minReps: 20, maxReps: 30, rest: 0, time: 900, note: "Keep it casual", completed: false },
        { id: 2, title: "Stretching Routine", sets: 2, minReps: 10, maxReps: 12, rest: 30, time: 300, note: "Gentle range of motion", completed: false },
      ],
    },
  ];
  