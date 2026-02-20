import { useState } from "react";
import { Plug, RefreshCw, CheckCircle2, AlertTriangle, Clock, ExternalLink, Plus } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const platforms = [
  { id: 1, name: "Shopify — Main Store", logo: "🛍️", status: "active" as const, lastSync: "2 min ago", products: 1842, orders: 8420, revenue: "$148K" },
  { id: 2, name: "Amazon Seller Central", logo: "📦", status: "active" as const, lastSync: "5 min ago", products: 934, orders: 3210, revenue: "$92K" },
  { id: 3, name: "WooCommerce — EU Store", logo: "🏪", status: "syncing" as const, lastSync: "Syncing...", products: 621, orders: 1840, revenue: "$54K" },
  { id: 4, name: "TikTok Shop", logo: "🎵", status: "warning" as const, lastSync: "45 min ago", products: 280, orders: 920, revenue: "$28K" },
  { id: 5, name: "Meta Ads Manager", logo: "📱", status: "active" as const, lastSync: "10 min ago", products: null, orders: null, revenue: "$12K spend" },
  { id: 6, name: "Google Ads", logo: "🔍", status: "active" as const, lastSync: "10 min ago", products: null, orders: null, revenue: "$8.4K spend" },
  { id: 7, name: "BigCommerce", logo: "🔵", status: "error" as const, lastSync: "Failed", products: 0, orders: 0, revenue: "$0" },
  { id: 8, name: "Walmart Marketplace", logo: "🔶", status: "offline" as const, lastSync: "Not connected", products: null, orders: null, revenue: null },
];

const availablePlatforms = [
  { name: "eBay", logo: "🏷️" },
  { name: "Etsy", logo: "🎨" },
  { name: "Pinterest", logo: "📌" },
  { name: "Snapchat Ads", logo: "👻" },
];

export default function IntegrationsPage() {
  const [syncing, setSyncing] = useState<number | null>(null);

  const handleSync = async (id: number) => {
    setSyncing(id);
    await new Promise(r => setTimeout(r, 2000));
    setSyncing(null);
  };

  const connected = platforms.filter(p => p.status !== "offline");
  const active = platforms.filter(p => p.status === "active");

  return (
    <PageContainer>
      <PageHeader
        title="Multi-Platform Integrations"
        description="Manage your connected marketplaces, stores, and ad platforms"
        icon={<Plug className="w-6 h-6" />}
        actions={
          <Button className="gap-2 bg-gradient-primary hover:opacity-90" size="sm">
            <Plus className="w-4 h-4" /> Connect Platform
          </Button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Platforms", value: platforms.length, icon: "🔗" },
          { label: "Active & Syncing", value: active.length, icon: "✅" },
          { label: "Needs Attention", value: platforms.filter(p => p.status === "error" || p.status === "warning").length, icon: "⚠️" },
          { label: "Total Products", value: "3,677", icon: "📦" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Connected platforms */}
      <SectionCard
        title="Connected Platforms"
        description={`${connected.length} of ${platforms.length} platforms connected`}
        className="mb-6"
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Sync All
          </Button>
        }
      >
        <div className="space-y-3">
          {platforms.map(platform => (
            <div
              key={platform.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                {platform.logo}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground text-sm">{platform.name}</p>
                  <StatusBadge status={platform.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Last sync: {platform.lastSync}
                  {platform.products !== null && (
                    <> · {platform.products.toLocaleString()} products · {platform.orders?.toLocaleString()} orders</>
                  )}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                {platform.revenue && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{platform.revenue}</p>
                    <p className="text-xs text-muted-foreground">Revenue MTD</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 text-xs"
                    onClick={() => handleSync(platform.id)}
                    disabled={platform.status === "offline" || syncing === platform.id}
                  >
                    {syncing === platform.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3" />
                    )}
                    {platform.status === "offline" ? "Connect" : "Sync"}
                  </Button>
                  {platform.status !== "offline" && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Available to connect */}
      <SectionCard title="Available Integrations" description="Expand your data sources">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availablePlatforms.map(p => (
            <div key={p.name} className="rounded-xl border border-border bg-muted/30 p-4 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-2">{p.logo}</div>
              <p className="text-sm font-medium text-foreground mb-3">{p.name}</p>
              <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                <Plus className="w-3 h-3 mr-1" /> Connect
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageContainer>
  );
}
