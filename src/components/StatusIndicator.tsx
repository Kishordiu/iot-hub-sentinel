import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const statusConfig = {
  online: { label: "Online", className: "status-online" },
  offline: { label: "Offline", className: "status-offline" },
  warning: { label: "Warning", className: "status-warning" },
  error: { label: "Error", className: "status-error" },
};

export function StatusIndicator({ status, size = "md", showLabel = false }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={cn("rounded-full inline-block", sizeClasses[size], config.className)} />
      {showLabel && (
        <span className="text-sm text-muted-foreground capitalize">{config.label}</span>
      )}
    </div>
  );
}
