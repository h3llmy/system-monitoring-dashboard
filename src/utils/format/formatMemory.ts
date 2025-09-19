export type MemoryFormat = "bytes" | "bits";

/**
 * Format a value into human-readable units (memory or bandwidth).
 *
 * @param value - The raw value to format (in bytes or bits).
 * @param type - "bytes" (default) for memory sizes or "bits" for bandwidth.
 * @param decimals - How many decimal places to keep.
 * @returns An object with { value, unit }
 */
export function formatMemory(
  value: number,
  type: MemoryFormat = "bytes",
  decimals = 2
): { value: number; unit: string } {
  if (!+value) {
    return { value: 0, unit: type === "bytes" ? "B" : "bps" };
  }

  const k = 1024; // base 1024 for storage
  const k10 = 1000; // base 1000 for bandwidth (common convention)
  const dm = decimals < 0 ? 0 : decimals;

  const units =
    type === "bytes"
      ? ["B", "kB", "MB", "GB", "TB", "PB", "EB"]
      : ["bps", "Kbps", "Mbps", "Gbps", "Tbps", "Pbps", "Ebps"];

  const base = type === "bytes" ? k : k10;
  const i = Math.floor(Math.log(value) / Math.log(base));

  return {
    value: parseFloat((value / Math.pow(base, i)).toFixed(dm)),
    unit: units[i],
  };
}
