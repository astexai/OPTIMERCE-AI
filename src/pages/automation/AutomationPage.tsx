import { Zap, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const rules = [
  { id: 1, name: "Auto-reorder low stock", trigger: "Stock < 7 days", condition: "Velocity > 10/day", action: "Create PO at 30-day quantity", active: true, runs: 48 },
  { id: 2, name: "Pause underperforming ads", trigger: "ROAS < 1.5 for 48h", condition: "Spend > $500", action: "Pause campaign, notify manager", active: true, runs: 12 },
  { id: 3, name: "Dynamic price floor", trigger: "Competitor drops price", condition: "Gap > 10%", action: "Match price, alert team", active: false, runs: 3 },
  { id: 4, name: "Overstock flash sale", trigger: "Days of stock > 120", condition: "Category not seasonal", action: "Apply 15% discount tag", active: true, runs: 7 },
];

export default function AutomationPage() {
  const [activeRules, setActiveRules] = useState(rules.filter(r => r.active).map(r => r.id));

  return (
    <PageContainer>
      <PageHeader title="Decision Automation" description="Rules-based automation powered by AI triggers" icon={<Zap className="w-6 h-6" />} badge="AI"
        actions={<Button size="sm" className="bg-gradient-primary hover:opacity-90 gap-2"><Plus className="w-3.5 h-3.5" /> New Rule</Button>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Rules", value: activeRules.length },
          { label: "Total Runs (MTD)", value: "70" },
          { label: "Decisions Automated", value: "1,247" },
          { label: "Time Saved", value: "~340 hrs" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <SectionCard title="Automation Rules">
        <div className="space-y-3">
          {rules.map(rule => {
            const isActive = activeRules.includes(rule.id);
            return (
              <div key={rule.id} className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                <Switch checked={isActive} onCheckedChange={checked => setActiveRules(prev => checked ? [...prev, rule.id] : prev.filter(id => id !== rule.id))} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-foreground text-sm">{rule.name}</p>
                    <Badge variant="outline" className="text-xs">{rule.runs} runs</Badge>
                    {isActive && <Badge className="text-xs bg-success/10 text-success border-success/20">Active</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-muted text-xs"><span className="text-muted-foreground">IF </span>{rule.trigger}</span>
                    <span className="px-2 py-1 rounded-md bg-muted text-xs"><span className="text-muted-foreground">AND </span>{rule.condition}</span>
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary"><span className="text-primary/60">THEN </span>{rule.action}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </PageContainer>
  );
}
