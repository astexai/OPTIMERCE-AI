import { useState } from "react";
import {
  LayoutDashboard, TrendingUp, DollarSign, Package, Megaphone,
  Sparkles, AlertTriangle, RefreshCw, ArrowUpRight, Brain
} from "lucide-react";
import { KPICard } from "@/components/shared/KPICard";
import { AIInsightCard } from "@/components/shared/AIInsightCard";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

const forecastData = [
  { week: "W1", actual: 42000, forecast: 44000 },
  { week: "W2", actual: 48000, forecast: 46000 },
  { week: "W3", actual: 51000, forecast: 52000 },
  { week: "W4", actual: 47000, forecast: 49000 },
  { week: "W5", actual: null, forecast: 53000 },
  { week: "W6", actual: null, forecast: 58000 },
  { week: "W7", actual: null, forecast: 61000 },
  { week: "W8", actual: null, forecast: 65000 },
];

const channelData = [
  { channel: "Shopify", revenue: 148000, orders: 1820 },
  { channel: "Amazon", revenue: 92000, orders: 940 },
  { channel: "WooCommerce", revenue: 54000, orders: 620 },
  { channel: "TikTok", revenue: 28000, orders: 380 },
];

const alerts = [
  { icon: "🚨", title: "Stock-out Risk", desc: "AirPods Pro (SKU-3421) — 3 days of stock remaining", type: "error", time: "2m" },
  { icon: "💡", title: "Price Opportunity", desc: "12 SKUs underpriced by 8–15% vs competitors", type: "warning", time: "15m" },
  { icon: "📈", title: "Demand Spike", desc: "USB-C Cables trending +340% — increase reorder", type: "success", time: "1h" },
  { icon: "💰", title: "Marketing Waste", desc: "Meta Campaign #12 has 0.8x ROAS — pause recommended", type: "error", time: "3h" },
];

const insights = [
  {
    title: "Increase price on Sony WH-1000XM5 by 8%",
    description: "Competitor analysis shows $32 pricing gap. Demand elasticity is low — safe to capture margin.",
    impact: "+$12,400/mo",
    priority: "high" as const,
    type: "opportunity" as const,
    confidence: 91,
  },
  {
    title: "Reorder USB-C Hub (SKU-8821) immediately",
    description: "Current velocity: 47 units/day. Stock will deplete in 4.2 days. Lead time: 7 days.",
    impact: "Prevent -$18K lost sales",
    priority: "high" as const,
    type: "risk" as const,
    confidence: 97,
  },
  {
    title: "Shift $4,200 from Meta to Google Ads",
    description: "Google Shopping campaigns show 3.8x ROAS vs Meta's 1.2x this week. Reallocate budget.",
    impact: "+$8,900 ROAS",
    priority: "medium" as const,
    type: "recommendation" as const,
    confidence: 84,
  },
];

export default function DashboardPage() {
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <PageContainer>
      <PageHeader
        title="Intelligence Dashboard"
        description="AI-powered overview of your commerce performance"
        icon={<LayoutDashboard className="w-6 h-6" />}
        badge="Live"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" /> Sync Now
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90">
              <Brain className="w-3.5 h-3.5" /> AI Insights
            </Button>
          </div>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Revenue (MTD)"
          value="$322K"
          change={14.2}
          changeLabel="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          gradient
          loading={loading}
        />
        <KPICard
          title="Profit Margin"
          value="34.8%"
          change={2.1}
          icon={<TrendingUp className="w-5 h-5" />}
          loading={loading}
        />
        <KPICard
          title="Inventory Health"
          value="78/100"
          change={-4.3}
          icon={<Package className="w-5 h-5" />}
          loading={loading}
        />
        <KPICard
          title="Marketing ROI"
          value="3.2x"
          change={18.7}
          icon={<Megaphone className="w-5 h-5" />}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Forecast Chart */}
        <SectionCard
          title="Revenue Forecast"
          description="AI-projected 8-week revenue outlook"
          className="xl:col-span-2"
          actions={
            <div className="flex items-center gap-1">
              {["revenue", "orders", "margin"].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    activeTab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(258,90%,66%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(258,90%,66%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="actual" stroke="hsl(243,75%,59%)" fill="url(#colorActual)" strokeWidth={2} name="Actual" dot={false} />
              <Area type="monotone" dataKey="forecast" stroke="hsl(258,90%,66%)" fill="url(#colorForecast)" strokeWidth={2} strokeDasharray="4 2" name="AI Forecast" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-0.5 bg-primary rounded" /> Actual
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-0.5 bg-accent rounded border-t border-dashed" /> AI Forecast
            </div>
            <Badge variant="outline" className="ml-auto text-xs bg-success/5 text-success border-success/20">
              94.2% accuracy
            </Badge>
          </div>
        </SectionCard>

        {/* Alerts */}
        <SectionCard
          title="Live Alerts"
          description="Requires your attention"
          actions={<Badge className="bg-destructive text-destructive-foreground text-xs">{alerts.length}</Badge>}
        >
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <span className="text-lg leading-none mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 gap-2 text-xs">
            View all alerts <ArrowUpRight className="w-3 h-3" />
          </Button>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">AI Recommendations</h3>
              <p className="text-xs text-muted-foreground">3 high-priority actions waiting</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Sparkles className="w-3 h-3" /> View all
            </Button>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <AIInsightCard
                key={i}
                {...insight}
                onAccept={() => {}}
                onDismiss={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <SectionCard title="Channel Performance" description="Revenue by platform (MTD)">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={channelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="hsl(243,75%,59%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {channelData.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{c.channel}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{c.orders} orders</span>
                  <span className="font-semibold text-foreground">${(c.revenue/1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
