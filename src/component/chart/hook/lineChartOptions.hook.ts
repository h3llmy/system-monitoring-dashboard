import { useMemo } from "react";
import { ChartOptions } from "chart.js";

export interface LineChartHookConfig {
  maxY?: number;
}

export const useLineChartOptions = (
  config?: LineChartHookConfig
): ChartOptions<"line"> => {
  const { maxY } = config || {};

  return useMemo(
    () => ({
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          suggestedMax: maxY || 100,
          ticks: {
            color: "#000000",
            maxTicksLimit: 10, // ← replaces stepSize to avoid too many ticks
            autoSkip: true,
            callback: (value) => `${value}%`,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#000000",
          },
        },
        title: {
          display: true,
          text: "CPU Usage",
        },
      },
    }),
    [maxY]
  );
};
