import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useLineChartOptions } from "../hook";
import { SystemMetrics } from "../interface";

export interface CpuChartProps {
  chartData: SystemMetrics[];
}

export const CpuChart: FC<CpuChartProps> = ({ chartData }) => {
  const maxCpu = useMemo(() => {
    const values = chartData.map((d) => d.cpu);
    return Math.max(100, ...values); // Ensure a minimum upper bound
  }, [chartData]);

  const options = useLineChartOptions({ maxY: maxCpu });

  const data = useMemo(
    () => ({
      labels: chartData.map(() => ""),
      datasets: [
        {
          label: `CPU Usage ${chartData[chartData.length - 1]?.cpu || 0}%`,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: "start",
          data: chartData.map((d) => d.cpu),
        },
      ],
    }),
    [chartData]
  );

  return <Line options={options as any} data={data} />;
};
