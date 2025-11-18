import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
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
  const { user } = useSelector((state: RootState) => state.Authantication);

  const data =
    user?.progress?.weightData && user.progress.weightData.length > 0
      ? [...user.progress.weightData].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      : [];

  const weightStats = [
    { label: "Starting Weight", value: user?.startWeight || "—" },
    { label: "Current Weight", value: user?.currentWeight || "—" },
    { label: "Target Weight", value: user?.targetWeight || "—" },
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

      {}
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

      {}
      <div className="h-80">
        {data.length > 0 ? (
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
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400 dark:text-gray-500">
            No weight data yet. Start tracking to see your progress!
          </div>
        )}
      </div>
    </div>
  );
}
