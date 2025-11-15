"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// Convert date string → day number since 1970
function dayNumberFromDate(dateString: string) {
  return Math.floor(new Date(dateString).getTime() / (1000 * 60 * 60 * 24));
}

// Convert day number → YYYY-MM-DD
function dateFromDayNumber(dayNum: number) {
  return new Date(dayNum * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

export default function WorkoutStats() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const workoutData = authData?.user?.workoutData;

  if (!workoutData || !authData.user?.createdAt) {
    return <p>No workout data found.</p>;
  }

  const createdAtDay = dayNumberFromDate(authData.user.createdAt);
  const history = workoutData.history;

  // Convert keys to numbers
  const keys = Object.keys(history).map(Number);
  const lastDay = keys.length > 0 ? Math.max(...keys) : createdAtDay;

  // Build daily chart data
  const dailyData: { date: string; calories: number }[] = [];

  for (let day = createdAtDay; day <= lastDay; day++) {
    dailyData.push({
      date: dateFromDayNumber(day),
      calories: history[day]?.caloriesBurned || 0,
    });
  }

  return (
    <div
      className="
        w-full p-4 rounded-2xl shadow
        bg-[var(--color-white)] text-[var(--color-text)]
        dark:bg-[var(--color-primary-dark)] dark:text-[var(--color-text-dark)]
        font-sans
      "
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Daily Workout Calories
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dailyData}
            margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              stroke="var(--color-light-border)"
              strokeDasharray="3 3"
              className="dark:stroke-[var(--color-border-dark)]"
            />

            {/* X Axis - Date */}
            <XAxis dataKey="date" />

            {/* Y Axis - Calories */}
            <YAxis
              label={{
                value: "Calories Burned",
                angle: -90,
                position: "insideLeft",
                fill: "var(--color-text)",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-light-border)",
                color: "var(--color-text)",
              }}
              wrapperClassName="dark:[&>*]:!bg-[var(--color-secondary-dark)] dark:[&>*]:!text-[var(--color-text-dark)]"
            />

            <Legend />

            {/* Single Daily Calories Bar */}
            <Bar
              dataKey="calories"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="Calories Burned"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
