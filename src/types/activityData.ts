export interface ActivityType {
  title: string;
  date: string;
  duration: string;
  calories: number;
  status: string;
}

export const activityData: ActivityType[] = [
  {
    title: "Upper Body Strength",
    date: "15/05/2024",
    duration: "45 min",
    calories: 320,
    status: "Completed",
  },
  {
    title: "Cardio HIIT",
    date: "13/05/2024",
    duration: "30 min",
    calories: 280,
    status: "Completed",
  },
  {
    title: "Lower Body Strength",
    date: "11/05/2024",
    duration: "50 min",
    calories: 380,
    status: "Completed",
  },
  {
    title: "Yoga Flow",
    date: "09/05/2024",
    duration: "35 min",
    calories: 150,
    status: "Completed",
  },
  {
    title: "Full Body Circuit",
    date: "07/05/2024",
    duration: "40 min",
    calories: 350,
    status: "Completed",
  },
];
