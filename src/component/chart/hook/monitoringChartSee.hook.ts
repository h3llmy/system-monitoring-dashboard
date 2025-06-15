import { useEffect, useState } from "react";
import { SystemMetrics } from "../interface";

export const useMonitoringChartSse = () => {
  const [chartData, setChartData] = useState<SystemMetrics[] | []>([]);

  useEffect(() => {
    const controller = new AbortController();

    const connect = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/monitoring",
          {
            method: "GET",
            headers: {
              "X-API-Key": "jhrti534qtodhjsofhkl2904b123", // ← Add your key here
              Accept: "text/event-stream",
            },
            signal: controller.signal,
          }
        );

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Split on *double newline*, which separates events
          const events = buffer.split("\n\n");

          // Keep the last part (possibly incomplete) in the buffer
          buffer = events.pop() || "";

          for (const eventText of events) {
            const lines = eventText.split("\n");
            for (const line of lines) {
              if (line.startsWith("data:")) {
                const jsonStr = line.replace(/^data:\s*/, "");
                try {
                  const parsed: SystemMetrics[] = JSON.parse(jsonStr);
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
        if (controller.signal.aborted) return;
        console.error("SSE connection failed:", error);
      }
    };

    connect();

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  return [chartData] as const;
};
