import { Database, Download, Search } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const products = [
  { sku: "SKU-3421", name: "AirPods Pro 2nd Gen", shopify: 219, amazon: 224, woo: 219, totalSales: 1842, margin: 24, stock: 12 },
  { sku: "SKU-8821", name: "USB-C Hub Pro 7-Port", shopify: 89, amazon: 92, woo: 89, totalSales: 940, margin: 42, stock: 134 },
  { sku: "SKU-4421", name: "Wireless Charging Pad", shopify: 39, amazon: 41, woo: 39, totalSales: 620, margin: 38, stock: 284 },
  { sku: "SKU-9943", name: "Bluetooth Earbuds Pro", shopify: 79, amazon: 84, woo: 79, totalSales: 521, margin: 41, stock: 521 },
  { sku: "SKU-2294", name: "Laptop Stand Aluminum", shopify: 64, amazon: 68, woo: 64, totalSales: 380, margin: 31, stock: 842 },
];

export default function UnifiedDataPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageContainer>
      <PageHeader title="Unified Data Model" description="All your SKU data unified across every connected channel" icon={<Database className="w-6 h-6" />}
        actions={<Button size="sm" variant="outline" className="gap-2"><Download className="w-3.5 h-3.5" /> Export CSV</Button>}
      />
      <SectionCard
        actions={<div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU or product..." className="pl-9 h-9" /></div>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">{["SKU","Product","Shopify","Amazon","WooCommerce","Total Sales","Margin","Stock"].map(h => <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 px-3 text-foreground">${p.shopify}</td>
                  <td className="py-3 px-3 text-foreground">${p.amazon}</td>
                  <td className="py-3 px-3 text-foreground">${p.woo}</td>
                  <td className="py-3 px-3 font-semibold text-foreground">{p.totalSales.toLocaleString()}</td>
                  <td className="py-3 px-3 text-success font-semibold">{p.margin}%</td>
                  <td className="py-3 px-3"><span className={p.stock < 50 ? "text-destructive font-semibold" : "text-foreground"}>{p.stock}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
