import { FC, useMemo } from "react";
import { useLineChartOptions } from "../hook";
import { Line } from "react-chartjs-2";
import { SystemMetrics } from "../interface";
import { useDarkMode } from "../../../utils/hooks";
import { formatMemory } from "../../../utils/format";

export interface MemoryChartProps {
  chartData: SystemMetrics;
}

export const MemoryChart: FC<MemoryChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();

  // Get latest memory used value
  const latestMemory =
    chartData?.matrics?.[chartData.matrics.length - 1]?.memory;
  const formattedLatestUsed = formatMemory(latestMemory?.used ?? 0);
  const formattedTotal = formatMemory(latestMemory?.total ?? 1024);

  // Update chart options
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

  // Convert all memory usage data to same unit
  const data = useMemo(() => {
    return {
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
          fill: "start",
          data: chartData?.matrics?.map((d) =>
            d?.memory?.used ? formatMemory(d.memory.used).value : 0
          ),
        },
      ],
    };
  }, [chartData, formattedLatestUsed]);

  return <Line options={options as any} data={data} />;
};
