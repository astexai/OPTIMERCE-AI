import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard, Plug, Database, TrendingUp, Package, DollarSign,
  Megaphone, GitMerge, Sparkles, Zap, MessageSquare, BarChart3,
  Bell, Sliders, Settings, Shield, DollarSignIcon
} from "lucide-react";

const pages = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard", group: "Core" },
  { label: "Integrations", icon: Plug, to: "/integrations", group: "Core" },
  { label: "Unified Data", icon: Database, to: "/unified-data", group: "Core" },
  { label: "Demand Forecasting", icon: TrendingUp, to: "/demand-forecasting", group: "Intelligence" },
  { label: "Inventory Intelligence", icon: Package, to: "/inventory", group: "Intelligence" },
  { label: "Dynamic Pricing", icon: DollarSign, to: "/pricing", group: "Intelligence" },
  { label: "Marketing Spend", icon: Megaphone, to: "/marketing", group: "Intelligence" },
  { label: "Cross-Domain Optimization", icon: GitMerge, to: "/cross-domain", group: "Intelligence" },
  { label: "Revenue Impact", icon: DollarSignIcon, to: "/revenue-impact", group: "Intelligence" },
  { label: "AI Recommendations", icon: Sparkles, to: "/recommendations", group: "AI" },
  { label: "Decision Automation", icon: Zap, to: "/automation", group: "AI" },
  { label: "AI Copilot", icon: MessageSquare, to: "/copilot", group: "AI" },
  { label: "Scenario Simulator", icon: Sliders, to: "/simulator", group: "AI" },
  { label: "Analytics & Reports", icon: BarChart3, to: "/analytics", group: "Analytics" },
  { label: "Alerts", icon: Bell, to: "/alerts", group: "Analytics" },
  { label: "Settings", icon: Settings, to: "/settings", group: "Admin" },
  { label: "Admin Panel", icon: Shield, to: "/admin", group: "Admin" },
];

const groups = ["Core", "Intelligence", "AI", "Analytics", "Admin"];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (to: string) => {
    navigate(to);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, features, or commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(group => {
          const items = pages.filter(p => p.group === group);
          return (
            <div key={group}>
              <CommandGroup heading={group}>
                {items.map(item => (
                  <CommandItem
                    key={item.to}
                    onSelect={() => handleSelect(item.to)}
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
