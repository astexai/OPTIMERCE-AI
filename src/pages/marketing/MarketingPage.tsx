import { useState } from "react";
import { Megaphone, TrendingUp, Brain, DollarSign } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const channels = [
  { name: "Google Shopping", spend: 8400, revenue: 31920, roas: 3.8, cpc: 1.24, status: "🟢", rec: "Increase budget +20%" },
  { name: "Meta Ads", spend: 12200, revenue: 14640, roas: 1.2, cpc: 2.18, status: "🔴", rec: "Reduce budget -40%" },
  { name: "TikTok Shop", spend: 3800, revenue: 11400, roas: 3.0, cpc: 0.92, status: "🟡", rec: "Scale creatives" },
  { name: "Google PMax", spend: 5600, revenue: 19600, roas: 3.5, cpc: 1.48, status: "🟢", rec: "Expand audiences" },
];

const roasData = channels.map(c => ({ name: c.name.split(" ")[0], roas: c.roas, spend: c.spend / 1000 }));

export default function MarketingPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Marketing Spend Optimization"
        description="AI-powered budget allocation across all ad channels"
        icon={<Megaphone className="w-6 h-6" />}
        badge="AI Powered"
        actions={<Button size="sm" className="bg-gradient-primary hover:opacity-90 gap-2"><Brain className="w-3.5 h-3.5" /> Auto-Optimize</Button>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Ad Spend (MTD)", value: "$30K", sub: "Across 4 channels" },
          { label: "Blended ROAS", value: "2.8x", sub: "↑ 0.4x vs last month" },
          { label: "Total Ad Revenue", value: "$77.6K", sub: "From paid channels" },
          { label: "Wasted Spend", value: "$4,880", sub: "AI: Reallocate immediately" },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SectionCard title="Channel Performance" description="ROAS and spend by channel">
            <div className="space-y-3 mb-6">
              {channels.map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                  <div className="text-xl">{c.status}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground text-sm">{c.name}</p>
                      <span className={`text-sm font-bold ${c.roas >= 3 ? "text-success" : c.roas >= 2 ? "text-warning" : "text-destructive"}`}>{c.roas}x ROAS</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Spend: ${c.spend.toLocaleString()} · Revenue: ${c.revenue.toLocaleString()} · CPC: ${c.cpc}</p>
                    <p className="text-xs text-primary mt-1">💡 {c.rec}</p>
                  </div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={roasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="roas" name="ROAS" fill="hsl(243,75%,59%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
        <SectionCard title="Budget Reallocation" description="AI-suggested budget shifts">
          <div className="space-y-4">
            {[
              { from: "Meta Ads", to: "Google Shopping", amount: "$4,880", impact: "+$14K ROAS" },
              { from: "Meta Retargeting", to: "TikTok Scale", amount: "$1,200", impact: "+$3.6K" },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-destructive font-semibold">↓ {r.from}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                  <span className="text-xs text-success font-semibold">↑ {r.to}</span>
                </div>
                <p className="text-lg font-bold text-foreground">{r.amount}</p>
                <p className="text-xs text-success mt-0.5">Est. impact: {r.impact}</p>
                <Button size="sm" className="mt-3 w-full h-7 text-xs bg-gradient-primary hover:opacity-90">Apply Reallocation</Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
