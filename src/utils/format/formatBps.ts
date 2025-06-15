/**
 * Formats a given bytes per second value into a human-readable string
 * using appropriate units (B/s, KB/s, MB/s, etc.).
 *
 * @param bytesPerSec - The number of bytes per second to format.
 * @param decimals - The number of decimal places to include in the result. Defaults to 2.
 * @returns A string representation of the bytes per second value in a more readable format.
 */
export function formatBps(bytesPerSec: number, decimals = 2): string {
  if (bytesPerSec === 0) return "0 B/s";
  const k = 1024;
  const units = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
  const i = Math.floor(Math.log(bytesPerSec) / Math.log(k));
  const value = bytesPerSec / Math.pow(k, i);
  // Trim decimals if integer
  const formatted = value.toFixed(decimals).replace(/\.0+$/, "");
  return `${formatted} ${units[i]}`;
}
