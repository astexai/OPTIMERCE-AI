import { Bell, Filter } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const alerts = [
  { id: 1, type: "inventory", icon: "🚨", title: "Stock-out imminent: AirPods Pro", desc: "SKU-3421 has 12 units remaining. 2.9 days of stock at current velocity.", time: "2m ago", priority: "high", read: false },
  { id: 2, type: "inventory", icon: "📦", title: "USB-C Hub needs immediate reorder", desc: "134 units left, 47/day velocity. Lead time exceeds stock horizon.", time: "5m ago", priority: "high", read: false },
  { id: 3, type: "pricing", icon: "💡", title: "Price optimization opportunity", desc: "12 SKUs are underpriced by 8–15% vs competitors. Est. impact: +$34K/mo.", time: "15m ago", priority: "medium", read: false },
  { id: 4, type: "marketing", icon: "📉", title: "Meta campaign ROAS below threshold", desc: "Campaign #12 reporting 0.8x ROAS. Budget waste: $4,880 identified.", time: "1h ago", priority: "high", read: true },
  { id: 5, type: "ai", icon: "🤖", title: "AI model updated — 3 new insights", desc: "Demand forecasting model re-trained with latest data. Accuracy improved to 94.2%.", time: "3h ago", priority: "low", read: true },
  { id: 6, type: "inventory", icon: "📊", title: "Overstock detected: 8 SKUs", desc: "Mechanical keyboards and gaming mice show 150+ days of stock. $184K tied up.", time: "4h ago", priority: "medium", read: true },
];

const types = ["all", "inventory", "pricing", "marketing", "ai"];

export default function AlertsPage() {
  const [filter, setFilter] = useState("all");
  const [read, setRead] = useState<number[]>(alerts.filter(a => a.read).map(a => a.id));

  const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);
  const unread = alerts.filter(a => !read.includes(a.id)).length;

  return (
    <PageContainer>
      <PageHeader
        title="Alerts & Notifications"
        description="Real-time alerts from AI monitoring across your entire commerce stack"
        icon={<Bell className="w-6 h-6" />}
        actions={
          <div className="flex items-center gap-2">
            <Badge className="bg-destructive text-destructive-foreground">{unread} unread</Badge>
            <Button size="sm" variant="outline" onClick={() => setRead(alerts.map(a => a.id))}>Mark all read</Button>
          </div>
        }
      />
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors", filter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(alert => {
          const isRead = read.includes(alert.id);
          return (
            <div
              key={alert.id}
              onClick={() => setRead(prev => [...prev, alert.id])}
              className={cn("flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-card", isRead ? "border-border bg-card opacity-60" : "border-border bg-card shadow-card")}
            >
              {!isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
              {isRead && <div className="w-2 h-2 mt-2 flex-shrink-0" />}
              <span className="text-xl flex-shrink-0">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-sm font-semibold", isRead ? "text-muted-foreground" : "text-foreground")}>{alert.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className={cn("text-xs", alert.priority === "high" ? "text-destructive border-destructive/20" : alert.priority === "medium" ? "text-warning border-warning/20" : "text-muted-foreground")}>
                      {alert.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{alert.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
