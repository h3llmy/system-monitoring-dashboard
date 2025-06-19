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
import { CpuChart, MemoryChart, NetworkChart } from "../../components/chart";
import { ChartCard } from "../../components/card";
import { DiskUsageBar } from "../../components/progressBar";
import { useMonitoringChartSse } from "../../hooks/serverSentEvent";
import { TemperatureSection } from "./temperature/temperatureSection";
import { Temperature } from "./temperature/temperature";

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
      <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <ChartCard className="col-span-1">
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-black dark:text-white">
              Temperature
            </h1>

            <Temperature
              name="Ambient"
              temperature={chartData?.temperature?.ambient}
            />

            <TemperatureSection
              title="CPU"
              data={chartData?.temperature?.cpu}
              showIndex
            />
            <TemperatureSection
              title="Core"
              data={chartData?.temperature?.core}
            />
            <TemperatureSection
              title="GPU"
              data={chartData?.temperature?.gpu}
            />
          </div>
        </ChartCard>

        <ChartCard className="col-span-1 md:col-span-2">
          <div className="space-y-4">
            <h3 className="text-black dark:text-white text-lg font-semibold">
              Disk Usage
            </h3>
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
