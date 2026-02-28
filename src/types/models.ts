export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator" | "viewer";
  tenantId: string;
  avatar?: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "warning" | "error";
  ipAddress: string;
  firmware: string;
  lastSeen: string;
  location: string;
  tenantId: string;
  metrics?: DeviceMetrics;
}

export interface DeviceMetrics {
  cpu: number;
  memory: number;
  temperature: number;
  uptime: number;
  networkIn: number;
  networkOut: number;
}

export interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  errorDevices: number;
  totalAlerts: number;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  severity: "info" | "warning" | "critical";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
}
