import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Plug, Database, TrendingUp, Package, DollarSign,
  Megaphone, GitMerge, Sparkles, Zap, MessageSquare, BarChart3,
  Bell, Sliders, DollarSignIcon, Settings, Shield, ChevronDown,
  ChevronLeft, ChevronRight, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navGroups = [
  {
    label: "Core",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
      { label: "Integrations", icon: Plug, to: "/integrations" },
      { label: "Unified Data", icon: Database, to: "/unified-data" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "Demand Forecast", icon: TrendingUp, to: "/demand-forecasting" },
      { label: "Inventory", icon: Package, to: "/inventory" },
      { label: "Dynamic Pricing", icon: DollarSign, to: "/pricing" },
      { label: "Marketing Spend", icon: Megaphone, to: "/marketing" },
      { label: "Cross-Domain", icon: GitMerge, to: "/cross-domain" },
      { label: "Revenue Impact", icon: DollarSignIcon, to: "/revenue-impact" },
    ],
  },
  {
    label: "AI",
    items: [
      { label: "Recommendations", icon: Sparkles, to: "/recommendations" },
      { label: "Automation", icon: Zap, to: "/automation" },
      { label: "AI Copilot", icon: MessageSquare, to: "/copilot" },
      { label: "Simulator", icon: Sliders, to: "/simulator" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Analytics", icon: BarChart3, to: "/analytics" },
      { label: "Alerts", icon: Bell, to: "/alerts" },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Settings", icon: Settings, to: "/settings" },
      { label: "Admin Panel", icon: Shield, to: "/admin" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["Core", "Intelligence", "AI", "Analytics", "Admin"]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
          <Brain className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-sidebar-foreground leading-none">OptiMerce AI</span>
            <span className="text-xs text-sidebar-foreground/50 leading-none mt-0.5">Predict. Optimise. Scale.</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {navGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          return (
            <div key={group.label} className="mb-2">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center justify-between w-full px-4 py-1.5 text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-widest hover:text-sidebar-foreground/60 transition-colors"
                >
                  <span>{group.label}</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen ? "rotate-0" : "-rotate-90")} />
                </button>
              )}
              {(isOpen || collapsed) && (
                <ul className="space-y-0.5 px-2">
                  {group.items.map((item) => {
                    const active = isActive(item.to);
                    const content = (
                      <NavLink
                        to={item.to}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-sm font-medium group",
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <item.icon className={cn(
                          "flex-shrink-0 transition-transform group-hover:scale-110",
                          collapsed ? "w-5 h-5" : "w-4 h-4",
                          active ? "text-white" : ""
                        )} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {!collapsed && active && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                        )}
                      </NavLink>
                    );

                    return (
                      <li key={item.to}>
                        {collapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>{content}</TooltipTrigger>
                            <TooltipContent side="right">
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : content}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="flex-shrink-0 p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && <span className="text-xs">Collapse</span>}
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft className="w-4 h-4" />
          }
        </Button>
      </div>
    </aside>
  );
}
