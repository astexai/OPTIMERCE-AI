import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Brain, Lightbulb, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Priority = "high" | "medium" | "low";
type InsightType = "opportunity" | "risk" | "recommendation" | "insight";

interface AIInsightCardProps {
  title: string;
  description: string;
  impact?: string;
  priority?: Priority;
  type?: InsightType;
  confidence?: number;
  onAccept?: () => void;
  onDismiss?: () => void;
  loading?: boolean;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: "High Priority", className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning border-warning/20" },
  low: { label: "Low", className: "bg-success/10 text-success border-success/20" },
};

const typeIcon: Record<InsightType, ReactNode> = {
  opportunity: <Sparkles className="w-4 h-4" />,
  risk: <AlertTriangle className="w-4 h-4" />,
  recommendation: <Brain className="w-4 h-4" />,
  insight: <Lightbulb className="w-4 h-4" />,
};

export function AIInsightCard({
  title, description, impact, priority = "medium", type = "recommendation",
  confidence, onAccept, onDismiss, loading, className
}: AIInsightCardProps) {
  if (loading) {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
        <div className="flex items-start gap-3">
          <div className="shimmer w-8 h-8 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="shimmer h-4 w-3/4 rounded" />
            <div className="shimmer h-3 w-full rounded" />
            <div className="shimmer h-3 w-2/3 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const pc = priorityConfig[priority];

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-elevated transition-all duration-200 hover:-translate-y-0.5",
      className
    )}>
      <div className="flex items-start gap-3">
        {/* AI Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-subtle flex items-center justify-center text-primary flex-shrink-0">
          {typeIcon[type]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground leading-snug">{title}</h4>
            <Badge variant="outline" className={cn("text-xs flex-shrink-0", pc.className)}>
              {pc.label}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{description}</p>

          {(impact || confidence !== undefined) && (
            <div className="flex items-center gap-4 mb-3">
              {impact && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Est. Impact:</span>
                  <span className="text-xs font-semibold text-success">{impact}</span>
                </div>
              )}
              {confidence !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-700"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary">{confidence}%</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {(onAccept || onDismiss) && (
            <div className="flex items-center gap-2">
              {onAccept && (
                <Button size="sm" className="h-7 text-xs bg-gradient-primary hover:opacity-90" onClick={onAccept}>
                  Apply
                </Button>
              )}
              {onDismiss && (
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onDismiss}>
                  Dismiss
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
