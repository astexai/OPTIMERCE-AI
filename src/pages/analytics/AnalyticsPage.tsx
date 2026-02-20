import { BarChart3, Download, TrendingUp } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const performanceData = [
  { month: "Sep", revenue: 248000, profit: 84000, orders: 2840 },
  { month: "Oct", revenue: 271000, profit: 91000, orders: 3120 },
  { month: "Nov", revenue: 312000, profit: 108000, orders: 3680 },
  { month: "Dec", revenue: 398000, profit: 142000, orders: 4820 },
  { month: "Jan", revenue: 287000, profit: 98000, orders: 3290 },
  { month: "Feb", revenue: 322000, profit: 112000, orders: 3740 },
];

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Analytics & Reports"
        description="Comprehensive performance analytics across all channels"
        icon={<BarChart3 className="w-6 h-6" />}
        actions={<Button size="sm" variant="outline" className="gap-2"><Download className="w-3.5 h-3.5" /> Export Report</Button>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Revenue (6M)", value: "$1.84M", change: "+22%" },
          { label: "Profit (6M)", value: "$635K", change: "+28%" },
          { label: "Total Orders", value: "21,490", change: "+19%" },
          { label: "Avg Order Value", value: "$85.60", change: "+4%" },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-success font-medium mt-1">{k.change} vs prev period</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard title="Revenue & Profit Trend" description="6-month performance">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(243,75%,59%)" fill="url(#gRev)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="hsl(142,71%,45%)" fill="url(#gProfit)" strokeWidth={2} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="Monthly Order Volume">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              <Bar dataKey="orders" fill="hsl(243,75%,59%)" radius={[4, 4, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
