import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  gradient?: boolean;
  loading?: boolean;
  suffix?: string;
  description?: string;
}

export function KPICard({
  title, value, change, changeLabel, icon, gradient, loading, suffix, description
}: KPICardProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="shimmer h-4 w-24 rounded" />
          <div className="shimmer h-10 w-10 rounded-xl" />
        </div>
        <div className="shimmer h-8 w-32 rounded mb-2" />
        <div className="shimmer h-3 w-20 rounded" />
      </div>
    );
  }

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className={cn(
      "rounded-2xl border p-6 shadow-card transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 group",
      gradient
        ? "bg-gradient-primary border-primary/20 text-white"
        : "bg-card border-border"
    )}>
      <div className="flex items-start justify-between mb-4">
        <p className={cn(
          "text-sm font-medium",
          gradient ? "text-white/80" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          gradient ? "bg-white/20" : "bg-gradient-subtle"
        )}>
          <div className={gradient ? "text-white" : "text-primary"}>
            {icon}
          </div>
        </div>
      </div>

      <div className="flex items-end gap-1 mb-2">
        <p className={cn(
          "text-3xl font-bold tracking-tight",
          gradient ? "text-white" : "text-foreground"
        )}>
          {value}
        </p>
        {suffix && (
          <p className={cn(
            "text-sm font-medium mb-1",
            gradient ? "text-white/70" : "text-muted-foreground"
          )}>{suffix}</p>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
            isPositive
              ? gradient ? "bg-white/20 text-white" : "bg-success/10 text-success"
              : isNegative
              ? gradient ? "bg-red-400/30 text-white" : "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
          <span className={cn(
            "text-xs",
            gradient ? "text-white/60" : "text-muted-foreground"
          )}>
            {changeLabel || "vs last period"}
          </span>
        </div>
      )}

      {description && (
        <p className={cn("text-xs mt-1", gradient ? "text-white/60" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
}
