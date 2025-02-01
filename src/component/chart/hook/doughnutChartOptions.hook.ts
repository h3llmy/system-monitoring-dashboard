import { ChartOptions } from 'chart.js';
import { useMemo } from 'react';

export const useDoughnutChartOptions = (
  options?: Partial<ChartOptions<'doughnut'>>
) => {
  return useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#000000' } },
        title: { display: true, text: 'CPU Usage' }
      },
      ...options
    }),
    [options]
  );
};
