import { useMemo } from "react";
import { ChartOptions } from "chart.js";
import { mergeDeep } from "../../../utils/mergeDeep";

export interface LineChartHookOptions {
  isDarkMode?: boolean;
  options?: Partial<ChartOptions<"line">>;
}

export const useLineChartOptions = (config?: LineChartHookOptions) => {
  return useMemo<ChartOptions<"line">>(() => {
    const base: ChartOptions<"line"> = {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          ticks: {
            color: config?.isDarkMode ? "#eee" : "#333",
            stepSize: 10,
            autoSkip: true,
          },
          grid: {
            color: config?.isDarkMode
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
          },
        },
      },
      plugins: {
        legend: { labels: { color: config?.isDarkMode ? "#eee" : "#333" } },
        title: {
          display: true,
          color: config?.isDarkMode ? "#fff" : "#000",
        },
        tooltip: {
          backgroundColor: config?.isDarkMode ? "#333" : "#fff",
          titleColor: config?.isDarkMode ? "#fff" : "#000",
          bodyColor: config?.isDarkMode ? "#eee" : "#333",
        },
      },
    };

    const finalOpts = mergeDeep(mergeDeep({}, base), config?.options ?? {});

    return finalOpts;
  }, [config]);
};
