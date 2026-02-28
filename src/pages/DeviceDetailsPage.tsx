import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Cpu, Lock, Unlock, RotateCcw, ShieldAlert, Activity, Thermometer, HardDrive, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/StatusIndicator";
import { deviceApi } from "@/services/endpoints";
import type { Device } from "@/types/models";

export default function DeviceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commandLoading, setCommandLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    deviceApi.getById(id)
      .then(({ data }) => setDevice(data))
      .catch(() => setError("Failed to load device. Backend may not be connected."))
      .finally(() => setLoading(false));
  }, [id]);

  const sendCommand = async (command: string) => {
    if (!id) return;
    setCommandLoading(command);
    try {
      await deviceApi.sendCommand(id, command);
    } catch {
      // Command will fail without backend — expected behavior
    } finally {
      setCommandLoading(null);
    }
  };

  const commands = [
    { id: "lock", label: "Lock", icon: Lock, variant: "outline" as const },
    { id: "unlock", label: "Unlock", icon: Unlock, variant: "outline" as const },
    { id: "reset", label: "Reset", icon: RotateCcw, variant: "outline" as const },
    { id: "emergency_shutdown", label: "Emergency Shutdown", icon: ShieldAlert, variant: "destructive" as const },
  ];

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back to Dashboard
      </Link>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card border-warning/30 bg-warning/5 p-4">
          <p className="text-sm text-warning">{error}</p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">Connect backend API to load device data.</p>
        </motion.div>
      )}

      {loading ? (
        <div className="glass-card p-12 text-center">
          <Cpu className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3 animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading device...</p>
        </div>
      ) : device ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Header */}
          <div className="glass-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cpu className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{device.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <StatusIndicator status={device.status} showLabel />
                  <span className="text-xs text-muted-foreground font-mono">{device.ipAddress}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {commands.map((cmd) => (
                <Button
                  key={cmd.id}
                  variant={cmd.variant}
                  size="sm"
                  onClick={() => sendCommand(cmd.id)}
                  disabled={commandLoading === cmd.id}
                  className="gap-2"
                >
                  <cmd.icon className="h-3.5 w-3.5" />
                  {cmd.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Type", value: device.type, icon: Cpu },
              { label: "Firmware", value: device.firmware, icon: HardDrive },
              { label: "Location", value: device.location, icon: Activity },
              { label: "Last Seen", value: device.lastSeen, icon: Clock },
            ].map((info) => (
              <div key={info.label} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <info.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{info.label}</span>
                </div>
                <p className="text-sm font-mono font-medium truncate">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          {device.metrics && (
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold mb-4">Device Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: "CPU", value: `${device.metrics.cpu}%`, icon: Cpu },
                  { label: "Memory", value: `${device.metrics.memory}%`, icon: HardDrive },
                  { label: "Temperature", value: `${device.metrics.temperature}°C`, icon: Thermometer },
                  { label: "Uptime", value: `${device.metrics.uptime}h`, icon: Clock },
                  { label: "Network In", value: `${device.metrics.networkIn} KB/s`, icon: Activity },
                  { label: "Network Out", value: `${device.metrics.networkOut} KB/s`, icon: Activity },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <metric.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                    <p className="font-mono text-lg font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="glass-card p-12 text-center">
          <Cpu className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Device not found</p>
        </div>
      )}
    </div>
  );
}
