import { SystemMetrics } from "../interface";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useLineChartOptions } from "../hook";

export interface NetworkChartProps {
  chartData: SystemMetrics[];
}

export const NetworkChart: FC<NetworkChartProps> = ({ chartData }) => {
  const options = useLineChartOptions({
    plugins: {
      title: { display: true, text: "Network Usage" },
    },
  });

  if (options.scales.y) options.scales.y.suggestedMax = 50;

  const latestUploadSpeed =
    chartData.length > 0 ? chartData[chartData.length - 1]?.network?.up : 0;

  const latestDownloadSpeed =
    chartData.length > 0 ? chartData[chartData.length - 1]?.network?.down : 0;

  const data = useMemo(
    () => ({
      labels: chartData?.map(() => ""),
      datasets: [
        {
          label: `Upload (${latestUploadSpeed} Mbps)`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true,
          data: chartData?.map((d) => d?.network?.up),
        },
        {
          label: `Download (${latestDownloadSpeed} Mbps)`,
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          borderColor: "rgba(220, 38, 38, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true,
          data: chartData?.map((d) => d?.network?.down),
        },
      ],
    }),
    [chartData, latestUploadSpeed, latestDownloadSpeed]
  );

  return <Line options={options as any} data={data} />;
};
