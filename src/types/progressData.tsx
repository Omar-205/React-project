import { type JSX } from "react"; // ✅ ensures JSX.Element is recognized in all setups

// 📊 Recommendation / summary box data
export interface ProgRecData {
  given: number | null; // dynamic
  statement: string;    // static
  icon: JSX.Element;    // static JSX element
}

export const progRecData: ProgRecData[] = [
  {
    given: null,
    statement: "Weight lost",
    icon: <i className="fa-solid fa-arrow-down text-green-500"></i>,
  },
  {
    given: null,
    statement: "To goal",
    icon: <i className="fa-solid fa-bullseye text-blue-500"></i>,
  },
  {
    given: null,
    statement: "Workouts",
    icon: <i className="fa-solid fa-dumbbell text-violet-500"></i>,
  },
  {
    given: null,
    statement: "Calories burned",
    icon: <i className="fa-solid fa-heart-pulse text-orange-500"></i>,
  },
];

// ⚖️ Weight tracking entries
export interface WeightEntry {
  date: string | null;
  weight: number | null;
}

// 🧮 Weight summary stats
export interface WeightStat {
  label: string | null;
  value: number | null;
}

// 📆 Weekly progress data
export interface WeeklyProgress {
  week: string | null;
  frequency: number | null;
  calories: number | null;
}

// 🖼️ Progress photos
export interface ProgressEntry {
  date: string | null;
  frontPhoto: string | null;
  sidePhoto: string | null;
}

// 🔗 Combine all into a unified progress interface
export interface ProgressData {
  progRecData: ProgRecData[] | null;
  weightData: WeightEntry[] | null;
  weightStats: WeightStat[] | null;
  weeklyProgressData: WeeklyProgress[] | null;
  progressPhotos: ProgressEntry[] | null;
}

// 🧩 Default empty object (initial value)
export const initialProgressData: ProgressData = {
  progRecData: null,
  weightData: null,
  weightStats: null,
  weeklyProgressData: null,
  progressPhotos: null,
};
