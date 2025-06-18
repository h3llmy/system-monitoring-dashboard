import { FC, useMemo } from "react";
import { useLineChartOptions } from "../hook";
import { Line } from "react-chartjs-2";
import { SystemMetrics } from "../interface";
import { useDarkMode } from "../../../utils/hooks";

export interface MemoryChartProps {
  chartData: SystemMetrics;
}

export const MemoryChart: FC<MemoryChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();
  const options = useLineChartOptions({
    isDarkMode,
    options: {
      plugins: {
        title: { text: "Memory Usage" },
      },
    },
  });
  if (options?.scales?.y)
    options.scales.y.suggestedMax =
      chartData?.matrics?.[0]?.memory?.total ?? 1024;

  const latestMemoryUsage =
    chartData?.matrics?.length > 0
      ? chartData?.matrics?.[chartData?.matrics?.length - 1]?.memory?.used
      : 0;

  const data = useMemo(
    () => ({
      labels: chartData?.matrics?.map(() => ""),
      datasets: [
        {
          label: `Memory Usage ${latestMemoryUsage} MB`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: "start",
          data: chartData?.matrics?.map((d) => d?.memory?.used),
        },
      ],
    }),
    [chartData, latestMemoryUsage]
  );

  return <Line options={options as any} data={data} />;
};
