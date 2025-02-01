import { ChartCard } from '../../card';
import { useMonitoringChartSse } from '../hook';
import { CpuChart, DiskChart, MemoryChart, NetworkChart } from '../organisms';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const MetRicsChartTemplate = () => {
  const [chartData] = useMonitoringChartSse();

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard>
          <CpuChart chartData={chartData} />
        </ChartCard>

        <ChartCard>
          <MemoryChart chartData={chartData} />
        </ChartCard>

        <ChartCard>
          <NetworkChart chartData={chartData} />
        </ChartCard>

        {chartData[chartData.length - 1]?.disk.map((disk, index) => (
          <ChartCard key={index}>
            <DiskChart chartData={disk} />
          </ChartCard>
        ))}
      </div>
    </div>
  );
};
