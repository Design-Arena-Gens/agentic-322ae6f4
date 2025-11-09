"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ChartData, ChartOptions } from "chart.js";

const RC = dynamic(() => import("react-chartjs-2").then(m => m.Line), { ssr: false });

export function LineChart({ labels, values, label }: { labels: string[]; values: number[]; label: string }) {
  const data: ChartData<"line"> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: "#f0b429",
          backgroundColor: "rgba(240, 180, 41, 0.15)",
          borderWidth: 2,
          fill: true,
          tension: 0.35,
        },
      ],
    }),
    [labels, values, label]
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#ddd" } },
    },
    scales: {
      x: { grid: { color: "#27324d" }, ticks: { color: "#aaa" } },
      y: { grid: { color: "#27324d" }, ticks: { color: "#aaa" } },
    },
  };

  return (
    <div className="card p-4 h-64">
      {/* @ts-expect-error server-side import suppressed by dynamic */}
      <RC data={data} options={options} />
    </div>
  );
}
