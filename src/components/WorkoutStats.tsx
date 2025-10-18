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

export default function WorkoutStats() {
  const data = [
    { week: "Week 1", frequency: 3, calories: 400 },
    { week: "Week 2", frequency: 5, calories: 650 },
    { week: "Week 3", frequency: 6, calories: 800 },
    { week: "Week 4", frequency: 4, calories: 700 },
    { week: "Week 5", frequency: 7, calories: 950 },
  ];

  return (
    <div
      className="
        w-full p-4 rounded-2xl shadow
        bg-[var(--color-white)] text-[var(--color-text)]
        dark:bg-[var(--color-primary-dark)] dark:text-[var(--color-text-dark)]
        font-sans
      "
    >
      <h2 className="text-xl font-bold mb-4 text-center">Workout Stats</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>
            <CartesianGrid
              stroke="var(--color-light-border)"// the color of the stroke chart
              strokeDasharray="3 3"
              className="dark:stroke-[var(--color-border-dark)]"
            />

            {/* X Axis */}
            <XAxis dataKey="week" />

            {/* LeftYxis - Frequency */}
            <YAxis
              yAxisId="left"
              label={{
                value: "Frequency",
                angle: -90,
                position: "insideLeft",
                fill: "var(--color-text)",//color of the text
                fontSize: 12,
              }}
              domain={[0, 8]}
            />

            {/* Right Y Axis - Calories */}
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Calories Burned",
                angle: 90,
                position: "insideRight",
                fill: "var(--color-text)",
                fontSize: 12,
              }}
            />

            {/* Tooltip & Legend */}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-light-border)",
                color: "var(--color-text)",
              }}
              wrapperClassName="dark:[&>*]:!bg-[var(--color-secondary-dark)] dark:[&>*]:!text-[var(--color-text-dark)]"
            />
            <Legend />

            {/* Blue Bars - Frequency */}
            <Bar
              yAxisId="left"
              dataKey="frequency"
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              barSize={30}
              name="Frequency"
            />

            {/* Green Bars - Calories */}
            <Bar
              yAxisId="right"
              dataKey="calories"
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
              barSize={30}
              name="Calories"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
