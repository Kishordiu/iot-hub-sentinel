import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Wifi, WifiOff, AlertTriangle, XCircle, Activity, RefreshCw } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Button } from "@/components/ui/button";
import { dashboardApi, deviceApi } from "@/services/endpoints";
import type { DashboardStats, Device, Alert } from "@/types/models";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, devicesRes, alertsRes] = await Promise.all([
        dashboardApi.getStats(),
        deviceApi.list(),
        dashboardApi.getAlerts(),
      ]);
      setStats(statsRes.data);
      setDevices(devicesRes.data);
      setAlerts(alertsRes.data);
    } catch {
      setError("Unable to connect to backend. Ensure VITE_API_URL is configured.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    { icon: Cpu, label: "Total Devices", value: stats?.totalDevices ?? 0, color: "text-primary" },
    { icon: Wifi, label: "Online", value: stats?.onlineDevices ?? 0, color: "text-success" },
    { icon: WifiOff, label: "Offline", value: stats?.offlineDevices ?? 0, color: "text-muted-foreground" },
    { icon: AlertTriangle, label: "Warnings", value: stats?.warningDevices ?? 0, color: "text-warning" },
    { icon: XCircle, label: "Errors", value: stats?.errorDevices ?? 0, color: "text-destructive" },
    { icon: Activity, label: "Active Alerts", value: stats?.totalAlerts ?? 0, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time device fleet overview</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-warning/30 bg-warning/5 p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Backend Not Connected</p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                Set VITE_API_URL in your .env file and connect your backend API.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stat counters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {statCards.map((card) => (
          <div key={card.label} className="glass-card p-4 text-center">
            <card.icon className={`h-5 w-5 mx-auto mb-2 ${card.color}`} />
            <AnimatedCounter value={card.value} label={card.label} />
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Device list */}
        <div className="lg:col-span-2">
          <div className="glass-card">
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Device Fleet</h3>
              <span className="text-xs text-muted-foreground font-mono">{devices.length} devices</span>
            </div>
            {devices.length === 0 ? (
              <div className="p-12 text-center">
                <Cpu className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No devices loaded</p>
                <p className="text-xs text-muted-foreground mt-1">Connect backend to see devices</p>
              </div>
            ) : (
              <div className="divide-y divide-border/30">
                {devices.map((device) => (
                  <Link
                    key={device.id}
                    to={`/dashboard/devices/${device.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIndicator status={device.status} />
                      <div>
                        <p className="text-sm font-medium">{device.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{device.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{device.type}</p>
                      <p className="text-xs text-muted-foreground font-mono">{device.firmware}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alerts panel */}
        <div className="glass-card">
          <div className="px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-semibold">Recent Alerts</h3>
          </div>
          {alerts.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No active alerts</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30 max-h-[400px] overflow-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`h-2 w-2 rounded-full ${
                      alert.severity === "critical" ? "status-error" :
                      alert.severity === "warning" ? "status-warning" : "status-online"
                    }`} />
                    <span className="text-xs font-medium">{alert.deviceName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground/50 font-mono mt-1">{alert.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
