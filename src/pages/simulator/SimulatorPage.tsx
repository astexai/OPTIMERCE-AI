import { useState } from "react";
import { Sliders, Brain, TrendingUp } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateData = (price: number, spend: number, stock: number) => [
  { month: "M1", revenue: Math.round((price / 100) * 180000 + (spend / 100) * 60000) },
  { month: "M2", revenue: Math.round((price / 100) * 195000 + (spend / 100) * 65000) },
  { month: "M3", revenue: Math.round((price / 100) * 210000 + (spend / 100) * 70000 - (stock > 80 ? 5000 : 0)) },
];

export default function SimulatorPage() {
  const [price, setPrice] = useState(50);
  const [spend, setSpend] = useState(60);
  const [stock, setStock] = useState(70);
  const data = generateData(price, spend, stock);
  const projected = data[data.length - 1].revenue;

  return (
    <PageContainer>
      <PageHeader title="Scenario Simulator" description="Model 'what-if' scenarios with real-time impact projection" icon={<Sliders className="w-6 h-6" />} badge="AI" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard title="Scenario Controls" description="Adjust variables to see projected impact">
          <div className="space-y-6">
            {[
              { label: "Price Increase", value: price, set: setPrice, unit: "%", desc: `+${price}% avg price across catalog` },
              { label: "Marketing Spend", value: spend, set: setSpend, unit: "%", desc: `${spend}% of current budget allocated` },
              { label: "Inventory Level", value: stock, set: setStock, unit: "%", desc: `${stock}% in-stock rate maintained` },
            ].map((ctrl, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">{ctrl.label}</label>
                  <span className="text-sm font-bold text-primary">{ctrl.value}{ctrl.unit}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={ctrl.value}
                  onChange={e => ctrl.set(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">{ctrl.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-gradient-subtle border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-primary">Projected Monthly Revenue</p>
            </div>
            <p className="text-3xl font-bold text-foreground">${projected.toLocaleString()}</p>
            <p className="text-xs text-success mt-1">+{(((projected - 322000) / 322000) * 100).toFixed(1)}% vs current</p>
          </div>
        </SectionCard>
        <SectionCard title="Revenue Projection" className="xl:col-span-2" description="3-month forecast based on your scenario">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(243,75%,59%)" fill="url(#simGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
