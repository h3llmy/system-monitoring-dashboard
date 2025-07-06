import { FC } from "react";
import { CoreTemperature } from "../../hooks/serverSentEvent";

export interface TemperatureSectionProps {
  title: string;
  data?: CoreTemperature[];
  showIndex?: boolean;
}

export const TemperatureSection: FC<TemperatureSectionProps> = ({
  title,
  data,
  showIndex = false,
}) => {
  console.log(data);
  if (!data || data.length === 0) return null;

  return (
    <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h2>
      <div className="space-y-1">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between text-sm ${
              item.temp >= item.sensorCritical
                ? "text-red-500 dark:text-red-500"
                : item.temp >= item.sensorHigh
                ? "text-yellow-500 dark:text-yellow-500"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            <span>
              {item.name}
              {showIndex ? ` ${index + 1}` : ""}
            </span>
            <span>{item.temp} °C</span>
          </div>
        ))}
      </div>
    </div>
  );
};
