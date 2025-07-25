import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useLineChartOptions } from "../hook";
import { useDarkMode } from "../../../utils/hooks";
import { SystemMetrics } from "../../../hooks/serverSentEvent";

export interface CpuChartProps {
  chartData: SystemMetrics;
}

export const CpuChart: FC<CpuChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();
  const options = useLineChartOptions({
    isDarkMode,
    options: {
      plugins: {
        title: {
          text: "CPU Usage",
        },
      },
    },
  });

  if (options?.scales?.y) {
    options.scales.y.suggestedMax = 100;
  }
  const data = useMemo(
    () => ({
      labels: chartData?.matrics?.map(() => ""),
      datasets: [
        {
          label: `CPU Usage ${
            chartData?.matrics?.[chartData?.matrics?.length - 1]?.cpu || 0
          }%`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: "start",
          data: chartData?.matrics?.map((d) => d?.cpu),
        },
      ],
    }),
    [chartData]
  );

  return <Line options={options as any} data={data} />;
};
