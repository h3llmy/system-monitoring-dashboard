import { FC, ReactNode } from 'react';

export interface ChartCardProps {
  children: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="w-full h-64">{children}</div>
    </div>
  );
};
