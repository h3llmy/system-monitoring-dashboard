import { FC, useMemo, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useLineChartOptions } from "../hook";
import { useDarkMode } from "../../../utils/hooks";
import { SystemMetrics } from "../../../hooks/serverSentEvent";
import { formatMemory } from "../../../utils/format";

export interface NetworkChartProps {
  chartData: SystemMetrics;
}

export const NetworkChart: FC<NetworkChartProps> = ({ chartData }) => {
  const { isDarkMode } = useDarkMode();
  const chartRef = useRef<ChartJS<"line">>(null);

  const latestUploadSpeed =
    chartData?.matrics?.length > 0
      ? chartData.matrics[chartData.matrics.length - 1]?.network?.up ?? 0
      : 0;

  const latestDownloadSpeed =
    chartData?.matrics?.length > 0
      ? chartData.matrics[chartData.matrics.length - 1]?.network?.down ?? 0
      : 0;

  const displayUpload = formatMemory(latestUploadSpeed, "bits");
  const displayDownload = formatMemory(latestDownloadSpeed, "bits");

  const options = useLineChartOptions({
    isDarkMode,
    options: {
      plugins: {
        title: { text: "Network I/O" },
      },
      scales: {
        y: {
          ticks: {
            callback: (val) => {
              const formatted = formatMemory(Number(val), "bits");
              return `${formatted.value} ${formatted.unit}`;
            },
          },
        },
      },
    },
  });

  // Initialize datasets only once
  const initialData = useMemo(
    () => ({
      labels: chartData.matrics?.map(() => ""),
      datasets: [
        {
          label: `Upload (${displayUpload.value} ${displayUpload.unit})`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true,
          data: chartData?.matrics?.map((d) => d?.network?.up ?? 0),
        },
        {
          label: `Download (${displayDownload.value} ${displayDownload.unit})`,
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          borderColor: "rgba(220, 38, 38, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true,
          data: chartData?.matrics?.map((d) => d?.network?.down ?? 0),
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.labels = chartData.matrics?.map(() => "") ?? [];

    chart.data.datasets[0].data = chartData.matrics?.map(
      (d) => d?.network?.up ?? 0
    );
    chart.data.datasets[0].label = `Upload (${displayUpload.value} ${displayUpload.unit})`;

    chart.data.datasets[1].data = chartData.matrics?.map(
      (d) => d?.network?.down ?? 0
    );
    chart.data.datasets[1].label = `Download (${displayDownload.value} ${displayDownload.unit})`;

    chart.update("none"); // update without animation to keep smooth
  }, [chartData, displayUpload, displayDownload]);

  return <Line ref={chartRef} options={options as any} data={initialData} />;
};
