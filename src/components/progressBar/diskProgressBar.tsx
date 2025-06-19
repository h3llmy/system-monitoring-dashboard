import { FC } from "react";
import { DiskMetrics } from "../chart/interface";
import { formatMemory } from "../../utils/format";

interface Props {
  disk: DiskMetrics;
}

export const DiskUsageBar: FC<Props> = ({ disk }) => {
  const diskUsed = formatMemory(disk.used);
  const diskTotal = formatMemory(disk.total);

  const diskWrite = formatMemory(disk.writeBps);
  const diskRead = formatMemory(disk.readBps);
  return (
    <div>
      <div className="flex justify-between text-sm dark:text-white/80 mb-1">
        <span>
          {disk.name} ({disk.mount})
        </span>
        <span>
          {diskUsed.value} {}
          {diskUsed.unit} / {diskTotal.value} {diskTotal.unit} (
          {disk.usedPercent?.toFixed(2) ?? 0}%)
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mb-2">
        <div
          className="h-2 bg-teal-500 rounded"
          style={{ width: `${disk.usedPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs dark:text-white/60">
        <span>
          Read: {diskRead.value} {diskRead.unit}/s
        </span>
        <span>
          Write: {diskWrite.value} {diskWrite.unit}/s
        </span>
      </div>
    </div>
  );
};
