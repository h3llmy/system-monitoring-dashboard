import { FC, useMemo, useRef, useEffect } from "react";
import { useLineChartOptions } from "../hook";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useDarkMode } from "../../../utils/hooks";
import { formatMemory } from "../../../utils/format";
import { SystemMetrics } from "../../../hooks/serverSentEvent";

export interface MemoryChartProps {
  chartData: SystemMetrics;
}

export const MemoryChart: FC<MemoryChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();
  const chartRef = useRef<ChartJS<"line">>(null);

  const latestMemory =
    chartData?.matrics?.[chartData.matrics.length - 1]?.memory;
  const formattedLatestUsed = formatMemory(latestMemory?.used ?? 0);
  const formattedTotal = formatMemory(latestMemory?.total ?? 1024);

  const options = useLineChartOptions({
    isDarkMode,
    options: {
      plugins: {
        title: {
          text: `Memory Usage`,
        },
      },
      scales: {
        y: {
          suggestedMax: formattedTotal.value,
          ticks: {
            stepSize: Math.ceil(formattedTotal.value / 10),
            callback: (val) => `${val} ${formattedLatestUsed.unit}`,
          },
        },
      },
    },
  });

  const initialData = useMemo(
    () => ({
      labels: chartData?.matrics?.map(() => ""),
      datasets: [
        {
          label: `Used: ${formattedLatestUsed.value} ${formattedLatestUsed.unit} / ${formattedTotal.value} ${formattedTotal.unit}`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: "start" as const,
          data: chartData?.matrics?.map((d) =>
            d?.memory?.used ? formatMemory(d.memory.used).value : 0
          ),
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.labels = chartData?.matrics?.map(() => "") ?? [];
    chart.data.datasets[0].data = chartData?.matrics?.map((d) =>
      d?.memory?.used ? formatMemory(d.memory.used).value : 0
    );
    chart.data.datasets[0].label = `Used: ${formattedLatestUsed.value} ${formattedLatestUsed.unit} / ${formattedTotal.value} ${formattedTotal.unit}`;

    chart.update("none");
  }, [chartData, formattedLatestUsed, formattedTotal]);

  return <Line ref={chartRef} options={options as any} data={initialData} />;
};
