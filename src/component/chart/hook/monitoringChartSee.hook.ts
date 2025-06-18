import { useEffect, useRef, useState } from "react";
import { SystemMetrics } from "../interface";

export const useMonitoringChartSse = () => {
  const [chartData, setChartData] = useState<SystemMetrics>(
    {} as SystemMetrics
  );
  const retryTimeoutRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isUnmounted = false;

    const connect = async () => {
      if (isUnmounted) return;

      controllerRef.current = new AbortController();

      try {
        const response = await fetch(
          "/api/v1/monitoring",
          // "http://127.0.0.1:3005/api/v1/monitoring",
          {
            method: "GET",
            headers: {
              "X-API-Key": "jhrti534qtodhjsofhkl2904b123",
              Accept: "text/event-stream",
            },
            signal: controllerRef.current.signal,
          }
        );

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (!isUnmounted) {
          const { value, done } = await reader.read();
          if (done) throw new Error("Stream closed");

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const eventText of events) {
            const lines = eventText.split("\n");
            for (const line of lines) {
              if (line.startsWith("data:")) {
                const jsonStr = line.replace(/^data:\s*/, "");
                try {
                  const parsed: SystemMetrics = JSON.parse(jsonStr);
                  setChartData(parsed);
                } catch (err) {
                  console.error("Failed to parse SSE data:", err);
                  console.debug("Raw data string:", jsonStr);
                }
              }
            }
          }
        }
      } catch (error) {
        if (isUnmounted || controllerRef.current?.signal.aborted) return;

        console.error("SSE connection failed. Reconnecting in 3s...", error);

        // Retry in 3 seconds
        retryTimeoutRef.current = setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      isUnmounted = true;
      controllerRef.current?.abort();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  return [chartData] as const;
};
