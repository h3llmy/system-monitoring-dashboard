import { FC, ReactNode } from "react";

export interface ChartCardProps {
  children: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <div className="w-full min-h-56 h-full">{children}</div>
    </div>
  );
};
