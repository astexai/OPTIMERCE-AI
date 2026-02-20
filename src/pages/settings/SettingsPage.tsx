import { Settings, User, Building2, Bell, CreditCard } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader title="Settings" description="Manage your account, company, and platform preferences" icon={<Settings className="w-6 h-6" />} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <SectionCard title="Profile" actions={<Button size="sm" variant="outline">Save Changes</Button>}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">JD</div>
              <div><p className="font-semibold text-foreground">Jordan Davis</p><p className="text-sm text-muted-foreground">CEO, TechStore Inc.</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["First Name","Jordan"],["Last Name","Davis"],["Email","jordan@techstore.com"],["Phone","+1 (555) 012-3456"]].map(([label, val], i) => (
                <div key={i} className="space-y-1.5"><Label>{label}</Label><Input defaultValue={val} className="h-10" /></div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Notifications" actions={<Button size="sm" variant="outline">Save</Button>}>
            <div className="space-y-4">
              {[
                { label: "Stock-out Alerts", desc: "Notify when SKU has < 7 days stock", on: true },
                { label: "Price Opportunity Alerts", desc: "Notify when AI finds pricing gaps", on: true },
                { label: "Marketing ROAS Drops", desc: "Notify when ROAS falls below threshold", on: true },
                { label: "Weekly AI Summary", desc: "Weekly digest of top recommendations", on: false },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div><p className="text-sm font-medium text-foreground">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <Switch defaultChecked={n.on} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="space-y-4">
          <SectionCard title="Current Plan">
            <div className="rounded-xl bg-gradient-primary p-4 mb-4">
              <p className="text-white/70 text-xs mb-1">Current Plan</p>
              <p className="text-white text-xl font-bold">Enterprise</p>
              <p className="text-white/70 text-xs mt-1">$2,400/month</p>
            </div>
            <div className="space-y-2 text-xs">
              {["Unlimited SKUs","All AI features","Priority support","Custom integrations"].map((f, i) => <p key={i} className="text-muted-foreground">✓ {f}</p>)}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">Manage Subscription</Button>
          </SectionCard>
          <SectionCard title="Danger Zone">
            <p className="text-xs text-muted-foreground mb-3">Irreversible actions for your account</p>
            <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/20 hover:bg-destructive/5">Delete Account</Button>
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
