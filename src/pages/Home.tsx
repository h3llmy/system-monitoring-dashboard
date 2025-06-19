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
  Tooltip,
} from "chart.js";
import {
  CpuChart,
  MemoryChart,
  NetworkChart,
  useMonitoringChartSse,
} from "../component/chart";
import { ChartCard } from "../component/card";
import { DiskUsageBar } from "../component/progressBar";

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

const Home = () => {
  const [chartData] = useMonitoringChartSse();

  return (
    <div className="p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ChartCard>
          <CpuChart chartData={chartData} />
        </ChartCard>

        <ChartCard>
          <MemoryChart chartData={chartData} />
        </ChartCard>

        <ChartCard>
          <NetworkChart chartData={chartData} />
        </ChartCard>
      </div>
      <div className="pt-3">
        <ChartCard>
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Disk Usage</h3>
            {chartData?.disk?.map((disk, index) => (
              <DiskUsageBar key={index} disk={disk} />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Home;
