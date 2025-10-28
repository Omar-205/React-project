import profileData from "../profile/profileData";

// Define the Workout type if not already defined elsewhere

// single excercise interface 
export interface Exercise {
  id: number;
  title: string;
  sets: number;
  minReps: number;
  maxReps: number;
  rest: number;
  note: string;
  completed: boolean;
  time: number;
  modelName?: string
}
// day workout interface: array of excercises + other details
export interface Workout {
  title: string;
  calories: number;
  level: string;
  exercises: Exercise[];
  duration: number;
}
// weekly training plan type: array of day workouts
type trainingPlan = Workout[];

export const beginnerFullBodyPlan: trainingPlan = [
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
];

export const strengthBuilderPlan: trainingPlan = [
  {
    title: "Complete Rest Day",
    calories: 0,
    level: "Intermediate",
    duration: 0,
    exercises: [],
  },
  {
    title: "Upper Body Strength (Push)",
    calories: 350,
    level: "Intermediate",
    duration: 50,
    exercises: [
      { id: 1, title: "Dumbbell Bench Press", sets: 4, minReps: 6, maxReps: 8, rest: 90, time: 60, note: "Full range of motion, control eccentric", completed: false },
      { id: 2, title: "Overhead Press (Barbell/DB)", sets: 3, minReps: 8, maxReps: 10, rest: 75, time: 50, note: "Keep core braced, don't arch back", completed: false },
      { id: 3, title: "Incline Dumbbell Press", sets: 3, minReps: 8, maxReps: 10, rest: 75, time: 50, note: "Focus on upper chest contraction", completed: false },
      { id: 4, title: "Tricep Dips (Weighted)", sets: 3, minReps: 8, maxReps: 12, rest: 60, time: 45, note: "Elbows close to body, go deep", completed: false },
      { id: 5, title: "Lateral Raises", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 40, note: "Lead with the elbows, light bend", completed: false },
    ],
  },
  {
    title: "Lower Body Strength (Squat)",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Barbell Back Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false },
      { id: 2, title: "Bulgarian Split Squats", sets: 3, minReps: 8, maxReps: 10, rest: 90, time: 60, note: "Per leg. Keep torso upright", completed: false },
      { id: 3, title: "Leg Press", sets: 3, minReps: 10, maxReps: 12, rest: 75, time: 50, note: "Do not lock out knees at the top", completed: false },
      { id: 4, title: "Seated Calf Raises", sets: 4, minReps: 15, maxReps: 20, rest: 45, time: 40, note: "Pause and squeeze at the top", completed: false },
    ],
  },
  {
    title: "Upper Body Strength (Pull)",
    calories: 340,
    level: "Intermediate",
    duration: 50,
    exercises: [
      { id: 1, title: "Pull-ups (or Weighted)", sets: 4, minReps: 6, maxReps: 8, rest: 90, time: 60, note: "Aim for chest to bar, full extension", completed: false },
      { id: 2, title: "Bent-over Barbell Rows", sets: 3, minReps: 8, maxReps: 10, rest: 90, time: 60, note: "Flat back, pull to lower chest", completed: false },
      { id: 3, title: "Seated Cable Rows", sets: 3, minReps: 10, maxReps: 12, rest: 75, time: 50, note: "Squeeze shoulder blades together", completed: false },
      { id: 4, title: "Face Pulls", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 50, note: "Focus on rear delts and external rotation", completed: false },
      { id: 5, title: "Hammer Curls", sets: 3, minReps: 10, maxReps: 12, rest: 60, time: 40, note: "Thumbs up position, builds brachialis", completed: false },
    ],
  },
  {
    title: "Lower Body Strength (Hinge)",
    calories: 410,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Romanian Deadlifts (RDLs)", sets: 4, minReps: 8, maxReps: 10, rest: 120, time: 70, note: "Hinge at hips, slight knee bend", completed: false },
      { id: 2, title: "Barbell Hip Thrusts", sets: 3, minReps: 8, maxReps: 12, rest: 90, time: 60, note: "Full hip extension, squeeze glutes", completed: false },
      { id: 3, title: "Lying Hamstring Curls", sets: 3, minReps: 10, maxReps: 12, rest: 75, time: 50, note: "Control the negative rep", completed: false },
      { id: 4, title: "Hanging Leg Raises", sets: 3, minReps: 12, maxReps: 15, rest: 60, time: 45, note: "Focus on lower abs, avoid swinging", completed: false },
    ],
  },
  {
    title: "Mobility & Recovery",
    calories: 180,
    level: "Intermediate",
    duration: 30,
    exercises: [
      { id: 1, title: "Dynamic Stretching", sets: 2, minReps: 8, maxReps: 10, rest: 30, time: 60, note: "Focus on hips and shoulders", completed: false },
      { id: 2, title: "Yoga (Pigeon, Downward Dog)", sets: 3, minReps: 3, maxReps: 5, rest: 30, time: 90, note: "Hold poses for 30-60s", completed: false },
      { id: 3, title: "Foam Rolling", sets: 1, minReps: 10, maxReps: 15, rest: 30, time: 60, note: "Target glutes, quads, and lats", completed: false },
    ],
  },
  {
    title: "Active Rest Day",
    calories: 150,
    level: "Intermediate",
    duration: 30,
    exercises: [
      { id: 1, title: "Light Walk or Cycling", sets: 1, minReps: 25, maxReps: 30, rest: 0, time: 1800, note: "Promote blood flow", completed: false },
      { id: 2, title: "Stretching Routine", sets: 1, minReps: 10, maxReps: 12, rest: 30, time: 300, note: "Focus on hamstrings and hips", completed: false },
    ],
  },
];

export const hiitFatBurnerPlan: trainingPlan = [
  {
    title: "Complete Rest Day",
    calories: 0,
    level: "Advanced",
    duration: 0,
    exercises: [],
  },
  {
    title: "Full Body HIIT (Tabata)",
    calories: 420,
    level: "Advanced",
    duration: 30,
    exercises: [
      { id: 1, title: "Burpees", sets: 8, minReps: 20, maxReps: 20, rest: 10, time: 20, note: "Tabata: 20s work, 10s rest, 8 rounds", completed: false },
      { id: 2, title: "Kettlebell Swings", sets: 8, minReps: 20, maxReps: 20, rest: 10, time: 20, note: "Tabata: 20s work, 10s rest, 8 rounds", completed: false },
      { id: 3, title: "Mountain Climbers", sets: 8, minReps: 20, maxReps: 20, rest: 10, time: 20, note: "Tabata: 20s work, 10s rest, 8 rounds", completed: false },
      { id: 4, title: "Jump Squats", sets: 8, minReps: 20, maxReps: 20, rest: 10, time: 20, note: "Tabata: 20s work, 10s rest, 8 rounds", completed: false },
    ],
  },
  {
    title: "Active Recovery (LISS)",
    calories: 250,
    level: "Advanced",
    duration: 40,
    exercises: [
      { id: 1, title: "Incline Walking or Light Jog", sets: 1, minReps: 35, maxReps: 40, rest: 0, time: 2400, note: "Maintain 60–70% max heart rate", completed: false },
      { id: 2, title: "Stretching", sets: 1, minReps: 5, maxReps: 10, rest: 30, time: 300, note: "Gentle full-body stretch", completed: false },
    ],
  },
  {
    title: "HIIT & Core (AMRAP)",
    calories: 450,
    level: "Advanced",
    duration: 35,
    exercises: [
      { id: 1, title: "AMRAP Block 1", sets: 1, minReps: 15, maxReps: 15, rest: 180, time: 900, note: "15-min AMRAP: 10 Thrusters, 15 Box Jumps", completed: false },
      { id: 2, title: "AMRAP Block 2", sets: 1, minReps: 15, maxReps: 15, rest: 0, time: 900, note: "15-min AMRAP: 12 Renegade Rows, 50 Jump Rope", completed: false },
      { id: 3, title: "Plank Finisher", sets: 3, minReps: 60, maxReps: 60, rest: 30, time: 60, note: "Hold for 60s, rest 30s", completed: false },
    ],
  },
  {
    title: "Active Recovery (LISS)",
    calories: 250,
    level: "Advanced",
    duration: 40,
    exercises: [
      { id: 1, title: "Cycling or Rowing", sets: 1, minReps: 35, maxReps: 40, rest: 0, time: 2400, note: "Maintain 60–70% max heart rate", completed: false },
      { id: 2, title: "Stretching", sets: 1, minReps: 5, maxReps: 10, rest: 30, time: 300, note: "Gentle full-body stretch", completed: false },
    ],
  },
  {
    title: "Full Body HIIT (EMOM)",
    calories: 400,
    level: "Advanced",
    duration: 30,
    exercises: [
      { id: 1, title: "Minute 1: Devil's Press", sets: 6, minReps: 8, maxReps: 10, rest: 0, time: 60, note: "EMOM: 8–10 reps, rest remainder", completed: false },
      { id: 2, title: "Minute 2: High Knees", sets: 6, minReps: 50, maxReps: 50, rest: 0, time: 60, note: "EMOM: 50s work, 10s rest", completed: false },
      { id: 3, title: "Minute 3: Dumbbell Snatches", sets: 6, minReps: 12, maxReps: 16, rest: 0, time: 60, note: "6–8 per side", completed: false },
      { id: 4, title: "Minute 4: Plank Jacks", sets: 6, minReps: 50, maxReps: 50, rest: 0, time: 60, note: "50s work, 10s rest", completed: false },
      { id: 5, title: "Minute 5: Complete Rest", sets: 6, minReps: 60, maxReps: 60, rest: 0, time: 60, note: "Full rest for 1 min", completed: false },
    ],
  },
  {
    title: "Mobility & Recovery",
    calories: 180,
    level: "Advanced",
    duration: 30,
    exercises: [
      { id: 1, title: "Dynamic Stretching", sets: 2, minReps: 8, maxReps: 10, rest: 30, time: 60, note: "Full body flow", completed: false },
      { id: 2, title: "Yoga for Athletes", sets: 3, minReps: 5, maxReps: 8, rest: 30, time: 90, note: "Controlled breathing, deep holds", completed: false },
      { id: 3, title: "Foam Rolling", sets: 1, minReps: 10, maxReps: 15, rest: 30, time: 60, note: "Focus on IT band, lats, quads", completed: false },
    ],
  },
];

const aiRevolution: trainingPlan = [
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },
  {
    title: "AI Revolution",
    calories: 400,
    level: "Intermediate",
    duration: 55,
    exercises: [
      { id: 1, title: "Squats", sets: 4, minReps: 6, maxReps: 8, rest: 120, time: 70, note: "Hit parallel or just below", completed: false, modelName: "squat" },
    ],
  },

]
// object to reference plans
export const workoutPrograms: Record<string, { program: trainingPlan, programName: string }> = {
  "beginnerFullBodyPlan": { program: beginnerFullBodyPlan, programName: "Beginner Full Body" },
  "strengthBuilderPlan": { program: strengthBuilderPlan, programName: "Strength Builder" },
  "hiitFatBurnerPlan": { program: hiitFatBurnerPlan, programName: "HIIT Fat Burner" },
  "AI Revolution": { program: aiRevolution, programName: "AI Revolution" }
}

interface IWorkoutProgramInfo {
  id: number;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  iconStyle: {
    background: string;
    color: string;
    padding: string;
    borderRadius: string;
  };
  planName: string;
}

// info for programs pagein workouts
export const workoutProgramsInfo: IWorkoutProgramInfo[] = [
  {
    id: 1,
    title: "Beginner Full Body",
    description: "Perfect for starting your fitness journey",
    duration: "4 Weeks",
    frequency: "5x per week",
    difficulty: "Beginner",
    iconStyle: {
      background: "#E5FBE8",
      color: "#02B945",
      padding: "8px",
      borderRadius: "8px",
    },
    planName: "beginnerFullBodyPlan",
  },
  {
    id: 2,
    title: "Strength Builder",
    description: "Build muscle and increase strength",
    duration: "4 Weeks",
    frequency: "5x per week",
    difficulty: "Intermediate",
    iconStyle: {
      background: "#D7E6FF",
      color: "#3371F8",
      padding: "8px",
      borderRadius: "8px",
    },
    planName: "strengthBuilderPlan",
  },
  {
    id: 3,
    title: "HIIT Fat Burner",
    description: "High-intensity workouts for fat loss",
    duration: "4 Weeks",
    frequency: "5x per week",
    difficulty: "Advanced",
    iconStyle: {
      background: "#FFE9CE",
      color: "#FF8927",
      padding: "8px",
      borderRadius: "8px",
    },
    planName: "hiitFatBurnerPlan",
  },
  {
    id: 4,
    title: "AI Revolution",
    description: "High-intensity workouts for fat loss",
    duration: "4 Weeks",
    frequency: "5x per week",
    difficulty: "Advanced",
    iconStyle: {
      background: "#FFBFBF",
      color: "#FE0032",
      padding: "8px",
      borderRadius: "8px",
    },
    planName: "AI Revolution",
  },
];


// HOW to add a new 