import { Shield, UserPlus } from "lucide-react";
import { PageContainer, PageHeader, SectionCard } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";

const users = [
  { name: "Jordan Davis", email: "jordan@techstore.com", role: "Owner", status: "active" as const, lastActive: "Now" },
  { name: "Maria Chen", email: "maria@techstore.com", role: "Admin", status: "active" as const, lastActive: "2h ago" },
  { name: "Alex Kim", email: "alex@techstore.com", role: "Analyst", status: "active" as const, lastActive: "1d ago" },
  { name: "Sam Wilson", email: "sam@techstore.com", role: "Viewer", status: "offline" as const, lastActive: "5d ago" },
];

export default function AdminPage() {
  return (
    <PageContainer>
      <PageHeader title="Admin Panel" description="User management, permissions, and system overview" icon={<Shield className="w-6 h-6" />}
        actions={<Button size="sm" className="bg-gradient-primary hover:opacity-90 gap-2"><UserPlus className="w-3.5 h-3.5" /> Invite User</Button>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[["Total Users","4"],["Active Now","2"],["Pending Invites","1"],["Plan Seats Used","4/10"]].map(([label, val], i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-2xl font-bold text-foreground">{val}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
      <SectionCard title="User Management">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">{["User","Role","Status","Last Active","Actions"].map(h => <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">{user.name.split(" ").map(n => n[0]).join("")}</div>
                    <div><p className="font-medium text-foreground text-xs">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div>
                  </div>
                </td>
                <td className="py-3 px-2"><Badge variant="outline" className="text-xs">{user.role}</Badge></td>
                <td className="py-3 px-2"><StatusBadge status={user.status} /></td>
                <td className="py-3 px-2 text-xs text-muted-foreground">{user.lastActive}</td>
                <td className="py-3 px-2">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Edit</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive">Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </PageContainer>
  );
}
