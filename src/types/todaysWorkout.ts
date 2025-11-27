interface Exercise {
  id: number;
  title: string;
  sets: number;
  minReps: number;
  maxReps: number;
  rest: number;
  note: string;
  completed: boolean;
}

interface Workout {
  title: string;
  calories: number;
  level: string;
  exercises: Exercise[];
}

const workOutData: Workout = {
  title: "Upper Body Strength",
  calories: 320,
  level: "Intermediate",
  exercises: [
    {
      id: 1,
      title: "Push-ups",
      sets: 3,
      minReps: 12,
      maxReps: 15,
      rest: 60,
      note: "Keep your core tight and maintain proper form",
      completed: false,
    },
    {
      id: 2,
      title: "Dumbbell Bench Press",
      sets: 3,
      minReps: 8,
      maxReps: 10,
      rest: 90,
      note: "Use challenging but manageable weight",
      completed: false,
    },
    {
      id: 3,
      title: "Bent-over Rows",
      sets: 3,
      minReps: 10,
      maxReps: 12,
      rest: 75,
      note: "Squeeze shoulder blades together",
      completed: false,
    },
    {
      id: 4,
      title: "Overhead Press",
      sets: 3,
      minReps: 8,
      maxReps: 10,
      rest: 90,
      note: "Keep core engaged throughout movement",
      completed: false,
    },
    {
      id: 5,
      title: "Bicep Curls",
      sets: 3,
      minReps: 12,
      maxReps: 15,
      rest: 60,
      note: "Control the weight on the way down",
      completed: false,
    },
    {
      id: 6,
      title: "Tricep Dips",
      sets: 3,
      minReps: 8,
      maxReps: 12,
      rest: 60,
      note: "Use assistance if needed",
      completed: false,
    },
  ],
};



export default workOutData;
