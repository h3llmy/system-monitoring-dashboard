import { FC, useMemo, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useLineChartOptions } from "../hook";
import { useDarkMode } from "../../../utils/hooks";
import { SystemMetrics } from "../../../hooks/serverSentEvent";

export interface CpuChartProps {
  chartData: SystemMetrics;
}

export const CpuChart: FC<CpuChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();
  const chartRef = useRef<ChartJS<"line">>(null);

  const latestCpu =
    chartData?.matrics?.[chartData.matrics.length - 1]?.cpu ?? 0;

  const options = useLineChartOptions({
    isDarkMode,
    options: {
      plugins: {
        title: {
          text: "CPU Usage",
        },
      },
      scales: {
        y: {
          suggestedMax: 100,
        },
      },
    },
  });

  const initialData = useMemo(
    () => ({
      labels: chartData?.matrics?.map(() => ""),
      datasets: [
        {
          label: `CPU Usage ${latestCpu}%`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: "start" as const,
          data: chartData?.matrics?.map((d) => d?.cpu ?? 0),
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.labels = chartData?.matrics?.map(() => "") ?? [];
    chart.data.datasets[0].data = chartData?.matrics?.map((d) => d?.cpu ?? 0);
    chart.data.datasets[0].label = `CPU Usage ${latestCpu}%`;

    chart.update("none");
  }, [chartData, latestCpu]);

  return <Line ref={chartRef} options={options as any} data={initialData} />;
};
