import { useState } from "react";
import { DollarSign, TrendingUp, Brain, Check, BarChart3 } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

const products = [
  { sku: "SKU-3421", name: "AirPods Pro 2nd Gen", current: 219, recommended: 249, margin: 24, newMargin: 38, impact: "+$12,400", confidence: 91, applied: false },
  { sku: "SKU-9943", name: "Bluetooth Earbuds Pro", current: 89, recommended: 79, margin: 42, newMargin: 36, impact: "+$8,100", confidence: 84, applied: false },
  { sku: "SKU-2294", name: "Laptop Stand Aluminum", current: 64, recommended: 74, margin: 31, newMargin: 44, impact: "+$6,200", confidence: 88, applied: false },
  { sku: "SKU-4421", name: "Wireless Charging Pad", current: 39, recommended: 42, margin: 38, newMargin: 44, impact: "+$4,800", confidence: 79, applied: false },
  { sku: "SKU-7701", name: "Mechanical Keyboard TKL", current: 149, recommended: 135, margin: 28, newMargin: 22, impact: "+$3,200", confidence: 72, applied: false },
];

const marginData = [
  { name: "Current", margin: 34.8 },
  { name: "Post-AI", margin: 41.2 },
  { name: "Max Possible", margin: 47.8 },
];

export default function DynamicPricingPage() {
  const [applied, setApplied] = useState<string[]>([]);
  const totalImpact = applied.length * 6000;

  return (
    <PageContainer>
      <PageHeader
        title="Dynamic Pricing"
        description="AI-recommended price optimizations to maximize margin and revenue"
        icon={<DollarSign className="w-6 h-6" />}
        badge="AI Powered"
        actions={
          <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90" onClick={() => setApplied(products.map(p => p.sku))}>
            <Brain className="w-3.5 h-3.5" /> Apply All Recommendations
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg Current Margin", value: "34.8%", trend: "baseline" },
          { label: "Projected Post-AI Margin", value: "41.2%", trend: "up" },
          { label: "Monthly Revenue Uplift", value: "$34,700", trend: "up" },
          { label: "SKUs Needing Adjustment", value: products.length, trend: "neutral" },
        ].map((k, i) => (
          <div key={i} className={cn("rounded-2xl border p-4 shadow-card", i === 1 ? "border-success/30 bg-success/5" : "border-border bg-card")}>
            <p className="text-xs text-muted-foreground mb-2">{k.label}</p>
            <p className={cn("text-2xl font-bold", i === 1 ? "text-success" : "text-foreground")}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Price Table */}
        <div className="xl:col-span-2">
          <SectionCard title="Price Optimization Table" description="Current vs AI-recommended prices">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Product", "Current", "Recommended", "Margin Impact", "Revenue Impact", "Confidence", "Action"].map(h => (
                      <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    const isApplied = applied.includes(p.sku);
                    const priceUp = p.recommended > p.current;
                    return (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2">
                          <p className="font-medium text-foreground text-xs leading-snug">{p.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{p.sku}</p>
                        </td>
                        <td className="py-3 px-2 text-foreground font-mono">${p.current}</td>
                        <td className="py-3 px-2">
                          <span className={cn("font-mono font-semibold", priceUp ? "text-success" : "text-warning")}>
                            ${p.recommended}
                          </span>
                          <span className={cn("text-xs ml-1", priceUp ? "text-success" : "text-warning")}>
                            ({priceUp ? "+" : ""}{((p.recommended - p.current) / p.current * 100).toFixed(0)}%)
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-xs text-muted-foreground">{p.margin}%</span>
                          <span className="text-xs text-muted-foreground"> → </span>
                          <span className={cn("text-xs font-semibold", p.newMargin > p.margin ? "text-success" : "text-destructive")}>
                            {p.newMargin}%
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-xs font-semibold text-success">{p.impact}</span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${p.confidence}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{p.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Button
                            size="sm"
                            className={cn("h-7 text-xs gap-1", isApplied ? "bg-success/10 text-success hover:bg-success/20" : "bg-gradient-primary hover:opacity-90")}
                            onClick={() => setApplied(prev => isApplied ? prev.filter(s => s !== p.sku) : [...prev, p.sku])}
                          >
                            {isApplied ? <><Check className="w-3 h-3" />Applied</> : "Apply"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Margin Projection */}
        <div className="space-y-4">
          <SectionCard title="Margin Projection" description="Before vs after AI pricing">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[25, 50]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Margin"]} />
                <Bar dataKey="margin" radius={[6, 6, 0, 0]}>
                  {marginData.map((entry, i) => (
                    <Cell key={i} fill={i === 0 ? "hsl(var(--muted-foreground))" : i === 1 ? "hsl(243,75%,59%)" : "hsl(258,90%,66%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          {applied.length > 0 && (
            <div className="rounded-xl border border-success/30 bg-success/5 p-4">
              <p className="text-sm font-semibold text-success mb-1">🎉 {applied.length} prices applied</p>
              <p className="text-xs text-success/80">Estimated monthly impact: +${totalImpact.toLocaleString()}</p>
            </div>
          )}

          <SectionCard title="Competitive Signals" description="Real-time competitor pricing">
            <div className="space-y-2.5">
              {[
                { name: "AirPods Pro", you: 219, comp: 247, gap: 28 },
                { name: "Earbuds Pro", you: 89, comp: 82, gap: -7 },
                { name: "Laptop Stand", you: 64, comp: 78, gap: 14 },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">You: ${c.you}</span>
                    <span className="text-muted-foreground">Comp: ${c.comp}</span>
                    <span className={c.gap > 0 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                      {c.gap > 0 ? "↑" : "↓"}${Math.abs(c.gap)}
                    </span>
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
