import { useMemo } from 'react';
import { ChartOptions } from 'chart.js';

export const useLineChartOptions = (
  options?: Partial<ChartOptions<'line'>>
) => {
  return useMemo(
    () => ({
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          ticks: { color: '#000000', stepSize: 10 },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      },
      plugins: {
        legend: { labels: { color: '#000000' } },
        title: { display: true, text: 'CPU Usage' }
      },
      ...options
    }),
    [options]
  );
};
