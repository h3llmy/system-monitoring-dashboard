export interface SystemMetrics {
  timestamp: string;
  disk: DiskMetrics[];
  temperature: Temperature;
  matrics: Matrics[];
}

export interface Matrics {
  cpu: number;
  memory: MemoryMetrics;
  network: NetworkMetrics;
}

export interface Temperature {
  cpu: CoreTemperature[];
  ambient: number;
  gpu: CoreTemperature[];
  core: CoreTemperature[];
}

export interface CoreTemperature {
  name: number;
  temp: number;
}

export interface MemoryMetrics {
  used: number;
  total: number;
}

export interface DiskMetrics {
  name: string;
  mount: string;
  type: string;
  usedPercent: number;
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
