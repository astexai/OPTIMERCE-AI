import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, XCircle, Wifi, WifiOff } from "lucide-react";

type StatusType = "active" | "syncing" | "warning" | "error" | "offline" | "success";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showDot?: boolean;
}

const statusConfig: Record<StatusType, {
  label: string;
  className: string;
  dotClass: string;
  icon?: typeof CheckCircle2;
}> = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20", dotClass: "bg-success", icon: CheckCircle2 },
  syncing: { label: "Syncing", className: "bg-primary/10 text-primary border-primary/20", dotClass: "bg-primary animate-pulse", icon: Clock },
  warning: { label: "Warning", className: "bg-warning/10 text-warning border-warning/20", dotClass: "bg-warning", icon: AlertCircle },
  error: { label: "Error", className: "bg-destructive/10 text-destructive border-destructive/20", dotClass: "bg-destructive", icon: XCircle },
  offline: { label: "Offline", className: "bg-muted text-muted-foreground border-border", dotClass: "bg-muted-foreground", icon: WifiOff },
  success: { label: "Success", className: "bg-success/10 text-success border-success/20", dotClass: "bg-success", icon: CheckCircle2 },
};

export function StatusBadge({ status, label, showDot = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className
    )}>
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} />}
      {displayLabel}
    </span>
  );
}

interface AIBadgeProps {
  label?: string;
  className?: string;
}

export function AIBadge({ label = "AI", className }: AIBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
      "bg-gradient-primary text-white",
      className
    )}>
      ✨ {label}
    </span>
  );
}

interface ScoreBadgeProps {
  score: number;
  max?: number;
  label?: string;
}

export function ScoreBadge({ score, max = 100, label }: ScoreBadgeProps) {
  const pct = (score / max) * 100;
  const color = pct >= 75 ? "text-success" : pct >= 50 ? "text-warning" : "text-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            pct >= 75 ? "bg-success" : pct >= 50 ? "bg-warning" : "bg-destructive"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold w-8 text-right", color)}>{score}</span>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}
