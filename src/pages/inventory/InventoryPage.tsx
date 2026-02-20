import { useState } from "react";
import { Package, AlertTriangle, Brain, TrendingDown, RefreshCw } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { AIInsightCard } from "@/components/shared/AIInsightCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const inventory = [
  { sku: "SKU-3421", name: "AirPods Pro 2nd Gen", stock: 12, velocity: 4.2, daysLeft: 2.9, reorderDate: "Immediate", risk: "error" as const, health: 15 },
  { sku: "SKU-8821", name: "USB-C Hub Pro 7-Port", stock: 134, velocity: 47, daysLeft: 2.8, reorderDate: "Today", risk: "error" as const, health: 18 },
  { sku: "SKU-4421", name: "Wireless Charging Pad", stock: 284, velocity: 31, daysLeft: 9.2, reorderDate: "In 2 days", risk: "warning" as const, health: 42 },
  { sku: "SKU-9943", name: "Bluetooth Earbuds Pro", stock: 521, velocity: 19, daysLeft: 27, reorderDate: "In 20 days", risk: "active" as const, health: 78 },
  { sku: "SKU-2294", name: "Laptop Stand Aluminum", stock: 842, velocity: 24, daysLeft: 35, reorderDate: "In 28 days", risk: "active" as const, health: 85 },
  { sku: "SKU-7701", name: "Mechanical Keyboard TKL", stock: 2140, velocity: 8, daysLeft: 267, reorderDate: "Overstock", risk: "warning" as const, health: 30 },
  { sku: "SKU-5512", name: "Gaming Mouse Pro", stock: 1820, velocity: 11, daysLeft: 165, reorderDate: "Overstock", risk: "warning" as const, health: 35 },
];

const insights = [
  {
    title: "Emergency reorder: USB-C Hub Pro (SKU-8821)",
    description: "Current stock: 134 units. Velocity: 47/day. Stock depletes in 2.8 days. Lead time is 7 days — you are already behind.",
    impact: "Prevent $48K lost revenue",
    priority: "high" as const,
    type: "risk" as const,
    confidence: 99,
  },
  {
    title: "Liquidate Mechanical Keyboard overstock",
    description: "267-day supply detected. Holding cost exceeds carrying benefit. Recommend 15% flash sale to clear 800 units.",
    impact: "Free $24K working capital",
    priority: "medium" as const,
    type: "recommendation" as const,
    confidence: 87,
  },
];

export default function InventoryPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? inventory
    : filter === "risk" ? inventory.filter(i => i.risk === "error")
    : inventory.filter(i => i.risk === "warning");

  return (
    <PageContainer>
      <PageHeader
        title="Inventory Intelligence"
        description="AI-driven stock risk assessment and reorder intelligence"
        icon={<Package className="w-6 h-6" />}
        actions={
          <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Stock
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Inventory Health Score", value: "78/100", sub: "-4 pts this week", warn: true },
          { label: "Stock-out Risk SKUs", value: "2", sub: "Urgent action needed", warn: true },
          { label: "Overstock SKUs", value: "8", sub: "$184K tied up", warn: false },
          { label: "Avg Days of Stock", value: "42 days", sub: "Healthy range: 30–60", warn: false },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className={`text-xs mt-1 ${k.warn ? "text-destructive" : "text-muted-foreground"}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SectionCard
            title="Stock Risk Table"
            description="Real-time inventory health by SKU"
            actions={
              <div className="flex items-center gap-1">
                {[["all", "All SKUs"], ["risk", "⚠️ Risk Only"], ["overstock", "📦 Overstock"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFilter(val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filter === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Product", "Stock", "Velocity", "Days Left", "Reorder", "Health"].map(h => (
                      <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2">
                        <p className="font-medium text-foreground text-xs">{item.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
                      </td>
                      <td className="py-3 px-2 font-medium text-foreground">{item.stock.toLocaleString()}</td>
                      <td className="py-3 px-2 text-muted-foreground">{item.velocity}/day</td>
                      <td className="py-3 px-2">
                        <span className={`font-semibold ${item.daysLeft < 7 ? "text-destructive" : item.daysLeft < 14 ? "text-warning" : "text-foreground"}`}>
                          {item.daysLeft.toFixed(1)}d
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <StatusBadge status={item.risk} label={item.reorderDate} />
                      </td>
                      <td className="py-3 px-2 w-32">
                        <ScoreBadge score={item.health} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* AI Panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">AI Suggestions</h3>
          </div>
          {insights.map((ins, i) => (
            <AIInsightCard key={i} {...ins} onAccept={() => {}} onDismiss={() => {}} />
          ))}

          {/* Health visualization */}
          <SectionCard title="Inventory Health Distribution">
            <div className="space-y-3">
              {[
                { label: "Healthy (>60)", count: 3, color: "bg-success", pct: 43 },
                { label: "At Risk (30–60)", count: 2, color: "bg-warning", pct: 29 },
                { label: "Critical (<30)", count: 2, color: "bg-destructive", pct: 29 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.count} SKUs</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
