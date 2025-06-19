/**
 * Formats a given memory value (in bytes) into a human-readable string
 * using appropriate units (B, KB, MB, GB, etc.).
 *
 * @param value - The number of bytes to format.
 * @returns A string representation of the bytes value in a more readable format.
 */
// export function formatMemory(value: number): { value: number; unit: string } {
//   const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];
//   let unitIndex = 0;
//   let v = value;

//   while (v >= 1024 && unitIndex < units.length - 1) {
//     v /= 1024;
//     unitIndex++;
//   }

//   return { value: Math.round(v * 100) / 100, unit: units[unitIndex] };
// }

export function formatMemory(
  bytes: number,
  decimals = 2
): { value: number; unit: string } {
  if (!+bytes) return { value: 0, unit: "Bytes" };

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i],
  };
}
