import { FC } from "react";

export interface TemperatureProps {
  temperature?: number;
  name?: string;
}

export const Temperature: FC<TemperatureProps> = ({ temperature, name }) => {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {name}
      </h2>
      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
        {temperature != null ? `${temperature} °C` : "N/A"}
      </p>
    </div>
  );
};
