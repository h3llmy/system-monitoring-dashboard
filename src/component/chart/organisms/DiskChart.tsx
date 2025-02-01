import { FC, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DiskMetrics } from '../interface';
import { useDoughnutChartOptions } from '../hook';

export interface DiskChartProps {
  chartData: DiskMetrics;
}

export const DiskChart: FC<DiskChartProps> = ({ chartData }) => {
  const options = useDoughnutChartOptions({
    plugins: {
      title: { display: true, text: chartData.mount }
    }
  });

  const data = useMemo(
    () => ({
      labels: ['Free Space', 'Used Space'],
      datasets: [
        {
          data: [chartData?.total - chartData?.used, chartData?.used],
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#2e94d1', '#ff4c73']
        }
      ]
    }),
    [chartData]
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};
