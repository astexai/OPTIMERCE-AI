import { useState } from "react";
import { TrendingUp, Brain, Download, ChevronUp, ChevronDown } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { AIInsightCard } from "@/components/shared/AIInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const weeklyData = [
  { period: "Week 1", actual: 42000, forecast: 44000, upper: 47000, lower: 41000 },
  { period: "Week 2", actual: 48000, forecast: 46000, upper: 50000, lower: 43000 },
  { period: "Week 3", actual: 51000, forecast: 52000, upper: 55000, lower: 49000 },
  { period: "Week 4", actual: 47000, forecast: 49000, upper: 53000, lower: 45000 },
  { period: "Week 5", forecast: 53000, upper: 58000, lower: 48000 },
  { period: "Week 6", forecast: 58000, upper: 64000, lower: 52000 },
  { period: "Week 7", forecast: 61000, upper: 67000, lower: 55000 },
  { period: "Week 8", forecast: 65000, upper: 72000, lower: 58000 },
];

const topGrowing = [
  { name: "USB-C Hub Pro 7-Port", sku: "SKU-8821", growth: 340, velocity: 47, forecast: 1410 },
  { name: "Wireless Charging Pad", sku: "SKU-4421", growth: 218, velocity: 31, forecast: 930 },
  { name: "Laptop Stand Aluminum", sku: "SKU-2294", growth: 167, velocity: 24, forecast: 720 },
  { name: "Bluetooth Earbuds Pro", sku: "SKU-9943", growth: 142, velocity: 19, forecast: 570 },
  { name: "Smart Plug 4-Pack", sku: "SKU-3301", growth: 98, velocity: 15, forecast: 450 },
];

export default function DemandForecastingPage() {
  const [period, setPeriod] = useState("weekly");

  return (
    <PageContainer>
      <PageHeader
        title="Demand Forecasting"
        description="AI-powered demand predictions with confidence intervals"
        icon={<TrendingUp className="w-6 h-6" />}
        badge="94.2% Accurate"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border overflow-hidden">
              {["weekly", "monthly"].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2"><Download className="w-3.5 h-3.5" /> Export</Button>
          </div>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Forecast Accuracy", value: "94.2%", change: "+1.8%", up: true },
          { label: "Avg Weekly Demand", value: "49,750", change: "+12%", up: true },
          { label: "Forecast Horizon", value: "8 Weeks", change: "Confident", up: true },
          { label: "High Risk SKUs", value: "23", change: "-5 this week", up: false },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className={`text-xs mt-1 font-medium ${k.up ? "text-success" : "text-warning"}`}>{k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Forecast Chart */}
        <SectionCard
          title="Demand Forecast with Confidence Band"
          className="xl:col-span-2"
          actions={
            <Badge variant="outline" className="text-xs bg-success/5 text-success border-success/20">
              ✨ AI Confidence: High
            </Badge>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(258,90%,66%)" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="hsl(258,90%,66%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                formatter={(v: number) => [v?.toLocaleString(), ""]}
              />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#gradBand)" name="Upper Bound" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(var(--background))" name="Lower Bound" />
              <Area type="monotone" dataKey="actual" stroke="hsl(243,75%,59%)" fill="url(#gradActual)" strokeWidth={2.5} name="Actual" dot={{ r: 4, fill: "hsl(243,75%,59%)" }} />
              <Line type="monotone" dataKey="forecast" stroke="hsl(258,90%,66%)" strokeWidth={2} strokeDasharray="5 3" name="AI Forecast" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Seasonal Trends */}
        <SectionCard title="Seasonal Intelligence" description="Category trend signals">
          <div className="space-y-3">
            {[
              { cat: "Electronics", trend: "+28%", signal: "Pre-holiday surge detected", color: "text-success" },
              { cat: "Home & Garden", trend: "+12%", signal: "Spring season uplift", color: "text-success" },
              { cat: "Clothing", trend: "-8%", signal: "Post-summer slowdown", color: "text-destructive" },
              { cat: "Sports", trend: "+41%", signal: "Back-to-school peak", color: "text-success" },
              { cat: "Toys", trend: "+64%", signal: "Holiday buildup early", color: "text-success" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.cat}</p>
                  <p className="text-xs text-muted-foreground">{item.signal}</p>
                </div>
                <span className={`text-sm font-bold ${item.color}`}>{item.trend}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Top Growing Products */}
      <SectionCard title="Top Growing Products" description="Highest demand velocity — recommend increasing stock">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Product", "SKU", "Growth (WoW)", "Daily Velocity", "8-Week Forecast"].map(h => (
                  <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topGrowing.map((item, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium text-foreground">{item.name}</td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{item.sku}</td>
                  <td className="py-3 px-2">
                    <span className="flex items-center gap-1 text-success font-semibold">
                      <ChevronUp className="w-3 h-3" />+{item.growth}%
                    </span>
                  </td>
                  <td className="py-3 px-2 text-foreground">{item.velocity}/day</td>
                  <td className="py-3 px-2">
                    <span className="font-semibold text-foreground">{item.forecast.toLocaleString()} units</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
