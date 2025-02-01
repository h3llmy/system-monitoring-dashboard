import { useEffect, useState } from 'react';
import { SystemMetrics } from '../interface';

export const useMonitoringChartSse = () => {
  const [chartData, setChartData] = useState<SystemMetrics[] | []>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      'http://localhost:3000/api/v1/monitoring'
    );

    const handleMessage = (event: MessageEvent) => {
      const eventData: SystemMetrics[] = JSON.parse(event.data);
      setChartData(eventData);
    };

    const handleError = (err: Event) => {
      console.error('EventSource failed:', err);
    };

    eventSource.addEventListener('message', handleMessage);
    eventSource.addEventListener('error', handleError);

    return () => {
      eventSource.close();
      eventSource.removeEventListener('message', handleMessage);
      eventSource.removeEventListener('error', handleError);
    };
  }, []);

  return [chartData] as const;
};
