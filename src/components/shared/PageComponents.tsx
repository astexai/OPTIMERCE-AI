import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  badge?: string;
}

export function PageHeader({ title, description, icon, actions, badge }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-gradient-subtle border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-primary text-white">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-muted-foreground text-sm mt-1 max-w-xl">{description}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  );
}

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("p-6 md:p-8 max-w-screen-2xl mx-auto", className)}>
      {children}
    </div>
  );
}

interface StatBadgeProps {
  value: string;
  label: string;
  positive?: boolean;
  negative?: boolean;
}

export function StatBadge({ value, label, positive, negative }: StatBadgeProps) {
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium",
      positive ? "bg-success/10 text-success" : negative ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
    )}>
      <span className="font-bold">{value}</span>
      <span>{label}</span>
    </div>
  );
}

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function SectionCard({ title, description, children, className, actions }: SectionCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card shadow-card", className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="shimmer h-4 w-24 rounded" />
        <div className="shimmer h-8 w-8 rounded-lg" />
      </div>
      <div className="shimmer h-8 w-32 rounded mb-2" />
      <div className="shimmer h-3 w-20 rounded" />
    </div>
  );
}
