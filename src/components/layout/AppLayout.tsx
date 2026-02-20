import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/dashboard": { label: "Dashboard" },
  "/integrations": { label: "Integrations", parent: "Core" },
  "/unified-data": { label: "Unified Data", parent: "Core" },
  "/demand-forecasting": { label: "Demand Forecasting", parent: "Intelligence" },
  "/inventory": { label: "Inventory Intelligence", parent: "Intelligence" },
  "/pricing": { label: "Dynamic Pricing", parent: "Intelligence" },
  "/marketing": { label: "Marketing Spend", parent: "Intelligence" },
  "/cross-domain": { label: "Cross-Domain Optimization", parent: "Intelligence" },
  "/revenue-impact": { label: "Revenue Impact", parent: "Intelligence" },
  "/recommendations": { label: "AI Recommendations", parent: "AI" },
  "/automation": { label: "Decision Automation", parent: "AI" },
  "/copilot": { label: "AI Copilot", parent: "AI" },
  "/simulator": { label: "Scenario Simulator", parent: "AI" },
  "/analytics": { label: "Analytics & Reports", parent: "Analytics" },
  "/alerts": { label: "Alerts", parent: "Analytics" },
  "/settings": { label: "Settings", parent: "Admin" },
  "/admin": { label: "Admin Panel", parent: "Admin" },
};

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const currentPage = breadcrumbMap[location.pathname];
  const breadcrumbs = currentPage
    ? [
        { label: "Nexus AI" },
        ...(currentPage.parent ? [{ label: currentPage.parent }] : []),
        { label: currentPage.label },
      ]
    : [{ label: "Nexus AI" }];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AppHeader
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
          breadcrumbs={breadcrumbs}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
