import { FC, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { DiskMetrics } from "../interface";
import { useDoughnutChartOptions } from "../hook";
import { formatBps } from "../../../utils/format/formatBps";

export interface DiskChartProps {
  chartData: DiskMetrics;
}

export const DiskChart: FC<DiskChartProps> = ({ chartData }) => {
  const options = useDoughnutChartOptions({
    plugins: { title: { display: true, text: chartData?.name } },
  });

  const data = useMemo(
    () => ({
      labels: ["Free Space", "Used Space"],
      datasets: [
        {
          data: [chartData?.total - chartData?.used, chartData?.used],
          backgroundColor: ["#a6a6a6", "#ff6384"],
          hoverBackgroundColor: ["#757575", "#ff4c73"],
        },
      ],
    }),
    [chartData]
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Doughnut data={data} options={options} />
      <div className="mt-2">
        <span>Read: {formatBps(chartData?.readBps)}</span>
        <span className="ml-4">Write: {formatBps(chartData?.writeBps)}</span>
      </div>
    </div>
  );
};
