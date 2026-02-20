import { Sparkles, Brain, Check, X, Clock } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { AIInsightCard } from "@/components/shared/AIInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const recommendations = [
  { title: "Increase price on Sony WH-1000XM5 by 8%", description: "Competitor gap of $32 identified. Low demand elasticity — safe margin capture.", impact: "+$12,400/mo", priority: "high" as const, type: "opportunity" as const, confidence: 91 },
  { title: "Reorder USB-C Hub Pro immediately", description: "Stock depletes in 2.8 days. Lead time 7 days. Emergency order of 1,400 units recommended.", impact: "Prevent -$48K", priority: "high" as const, type: "risk" as const, confidence: 99 },
  { title: "Shift $4,880 from Meta to Google Shopping", description: "Google Shopping ROAS 3.8x vs Meta 1.2x this week. Immediate reallocation recommended.", impact: "+$14K ROAS", priority: "high" as const, type: "recommendation" as const, confidence: 84 },
  { title: "Bundle slow-moving keyboards with USB hubs", description: "Bundling strategy can clear 400 units of overstock while increasing AOV by $28.", impact: "+$8,200", priority: "medium" as const, type: "insight" as const, confidence: 76 },
  { title: "Launch seasonal sale on Home & Garden", description: "Spring demand spike detected. 15% discount on top 20 SKUs projected to increase sell-through 40%.", impact: "+$18K revenue", priority: "medium" as const, type: "opportunity" as const, confidence: 82 },
  { title: "Reduce Google Ads CPC bid on low performers", description: "14 keywords with CPA > $24 and conversion rate < 1%. Reduce bids by 30%.", impact: "Save $1,800/mo", priority: "low" as const, type: "recommendation" as const, confidence: 71 },
];

export default function RecommendationsPage() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [accepted, setAccepted] = useState<number[]>([]);
  const active = recommendations.filter((_, i) => !dismissed.includes(i));

  return (
    <PageContainer>
      <PageHeader
        title="AI Recommendations Center"
        description="Actionable intelligence ranked by revenue impact"
        icon={<Sparkles className="w-6 h-6" />}
        badge="AI"
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">{active.length} active</Badge>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 gap-2">
              <Brain className="w-3.5 h-3.5" /> Accept All High Priority
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "High Priority", count: recommendations.filter(r => r.priority === "high").length, color: "text-destructive" },
          { label: "Accepted", count: accepted.length, color: "text-success" },
          { label: "Est. Total Impact", count: "+$102K/mo", color: "text-primary" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          !dismissed.includes(i) && (
            <AIInsightCard
              key={i}
              {...rec}
              onAccept={() => setAccepted(prev => [...prev, i])}
              onDismiss={() => setDismissed(prev => [...prev, i])}
            />
          )
        ))}
      </div>
    </PageContainer>
  );
}
