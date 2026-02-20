import { DollarSignIcon } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { KPICard } from "@/components/shared/KPICard";

export default function RevenueImpactPage() {
  return (
    <PageContainer>
      <PageHeader title="Revenue Impact Dashboard" description="Measure the financial impact of AI-driven decisions" icon={<DollarSignIcon className="w-6 h-6" />} badge="AI ROI" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KPICard title="Revenue Recovered by AI" value="$248K" change={34} icon={<DollarSignIcon className="w-5 h-5" />} gradient />
        <KPICard title="Pricing Impact" value="$84K" change={18} icon={<DollarSignIcon className="w-5 h-5" />} />
        <KPICard title="Inventory Savings" value="$62K" change={22} icon={<DollarSignIcon className="w-5 h-5" />} />
        <KPICard title="Marketing ROI Lift" value="$102K" change={41} icon={<DollarSignIcon className="w-5 h-5" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "AI Impact Score", value: "92/100", desc: "Top 5% of platform users", color: "text-primary" },
          { label: "Decisions Automated", value: "1,247", desc: "This month", color: "text-foreground" },
          { label: "Time Saved", value: "340 hrs", desc: "Equivalent analyst hours", color: "text-success" },
        ].map((s, i) => (
          <SectionCard key={i}>
            <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </SectionCard>
        ))}
      </div>
    </PageContainer>
  );
}
