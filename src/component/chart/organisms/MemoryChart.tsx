import { FC, useMemo } from 'react';
import { useLineChartOptions } from '../hook';
import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '../interface';

export interface MemoryChartProps {
  chartData: SystemMetrics[];
}

export const MemoryChart: FC<MemoryChartProps> = ({ chartData }) => {
  const options = useLineChartOptions({
    plugins: {
      title: { display: true, text: 'Memory Usage' }
    }
  });
  if (options.scales.y)
    options.scales.y.suggestedMax = chartData[0]?.memory?.total ?? 1024;

  const latestMemoryUsage =
    chartData.length > 0 ? chartData[chartData.length - 1].memory.used : 0;

  const data = useMemo(
    () => ({
      labels: chartData.map(() => ''),
      datasets: [
        {
          label: `Memory Usage ${latestMemoryUsage} MB`,
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.3,
          fill: 'start',
          data: chartData.map((d) => d.memory.used)
        }
      ]
    }),
    [chartData, latestMemoryUsage]
  );

  return <Line options={options as any} data={data} />;
};
