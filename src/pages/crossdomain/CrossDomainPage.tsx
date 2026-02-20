import { GitMerge } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { AIInsightCard } from "@/components/shared/AIInsightCard";

export default function CrossDomainPage() {
  return (
    <PageContainer>
      <PageHeader title="Cross-Domain Optimization" description="AI trade-off analysis across pricing, inventory, and marketing" icon={<GitMerge className="w-6 h-6" />} badge="AI" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { domain: "💰 Pricing", score: 78, action: "Increase prices on 12 SKUs" },
          { domain: "📦 Inventory", score: 62, action: "Reorder 3 critical SKUs" },
          { domain: "📢 Marketing", score: 54, action: "Reallocate $4.8K from Meta" },
        ].map((d, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-lg mb-2">{d.domain}</p>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-3xl font-bold text-foreground">{d.score}</p>
              <p className="text-sm text-muted-foreground mb-1">/100</p>
            </div>
            <div className="h-2 bg-muted rounded-full mb-3"><div className="h-full bg-gradient-primary rounded-full" style={{ width: `${d.score}%` }} /></div>
            <p className="text-xs text-primary">💡 {d.action}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Trade-off Analysis</h3>
        <AIInsightCard title="Price ↑ vs Demand ↓ trade-off on Electronics" description="Increasing prices 8% reduces volume 3% but nets +$28K margin. AI recommends proceeding — elasticity is favorable." impact="+$28K margin" priority="high" type="insight" confidence={89} onAccept={() => {}} onDismiss={() => {}} />
        <AIInsightCard title="Marketing spend ↑ enables faster inventory clearance" description="Increasing TikTok budget by $1,200 on overstock SKUs projected to clear 400 units in 14 days vs 45 days organically." impact="Free $24K working capital" priority="medium" type="recommendation" confidence={81} onAccept={() => {}} onDismiss={() => {}} />
      </div>
    </PageContainer>
  );
}
