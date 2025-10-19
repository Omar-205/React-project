import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeightProgress() {
  const data = [
    { date: "2025-10-1", weight: 77.5 },
    { date: "2025-10-5", weight: 80.0 },
    { date: "2025-10-12", weight: 88.7 },
    { date: "2025-10-28", weight: 100.5 },
    { date: "2025-11-1", weight: 98.0 },
    { date: "2025-11-5", weight: 94.3 },
    { date: "2025-11-16", weight: 80.3 },
    { date: "2025-1-19", weight: 67.0 },
  ];

  // 📝 Weight summary stats
  const weightStats = [
    { label: "Starting Weight", value: 80.0 },
    { label: "Current Weight", value: 76.0 },
    { label: "Target Weight", value: 72.0 },
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
      <h2
        className="
          text-xl font-bold mb-4 
          text-[var(--color-text)] 
          dark:text-[var(--color-text-secondary-dark)]
        "
      >
        📈 Weight Progress
      </h2>

      {/* 🧭 Weight Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {weightStats.map((item) => (
          <div
            key={item.label}
            className="
              flex flex-col items-center border-2 justify-center p-3 rounded-xl
              bg-[var(--color-light-bg)] dark:bg-[var(--color-secondary-dark)]
            "
          >
            <span
              className="
                text-sm font-semibold 
                text-[var(--color-text)] dark:text-[var(--color-text-secondary-dark)]
              "
            >
              {item.label}
            </span>
            <span
              className="
                text-lg font-bold 
                text-[var(--color-black)] dark:text-[var(--color-text-dark)]
              "
            >
              {item.value} kg
            </span>
          </div>
        ))}
      </div>

      {/* 📊 Chart */}
      <div className="h-80">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid
              stroke="var(--color-light-border)"
              className="dark:stroke-[var(--color-secondary-dark)]"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--color-text)", fontSize: 12 }}
              className="dark:[&>text]:fill-[var(--color-text-dark)]"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={50}
            />
            <YAxis
              tick={{ fill: "var(--color-text)", fontSize: 12 }}
              className="dark:[&>text]:fill-[var(--color-text-dark)]"
              label={{
                value: "Weight (kg)",
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
              labelStyle={{ color: "var(--color-text)" }}
              wrapperClassName="dark:[&>div]:bg-[var(--color-secondary-dark)] dark:[&>div]:text-[var(--color-text-dark)]"
            />
            <Line
    type="monotone"
    dataKey="weight"
   stroke="var(--color-primary)"
   strokeWidth={3}
   dot={{ r: 4, fill: "var(--color-primary)" }}
   fill="none"   
  className="dark:stroke-[var(--color-secondary)]"
  />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
