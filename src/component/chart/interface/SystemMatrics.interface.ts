export interface SystemMetrics {
  timestamp: string;
  cpu: number;
  memory: MemoryMetrics;
  disk: DiskMetrics[];
  network: NetworkMetrics;
}

export interface MemoryMetrics {
  used: number;
  total: number;
}

export interface DiskMetrics {
  name: string;
  mount: string;
  type: string;
  used: number;
  total: number;
  readBytes: number;
  writeBytes: number;
  readBps: number;
  writeBps: number;
}

export interface NetworkMetrics {
  up: number;
  down: number;
}
