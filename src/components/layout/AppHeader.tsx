import { useState } from "react";
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, User, Settings, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { CommandPalette } from "@/components/layout/CommandPalette";

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  breadcrumbs?: { label: string; to?: string }[];
}

export function AppHeader({ darkMode, onToggleDark, breadcrumbs }: HeaderProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <header className="h-16 flex items-center gap-4 px-6 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
        {/* Breadcrumbs */}
        <div className="flex-1 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-sm">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-muted-foreground/50">/</span>}
                  <span className={i === breadcrumbs.length - 1
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground cursor-pointer"
                  }>
                    {crumb.label}
                  </span>
                </span>
              ))}
            </nav>
          )}
        </div>

        {/* Global Search */}
        <button
          onClick={() => setCommandOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 hover:bg-muted border border-border text-muted-foreground text-sm transition-colors w-64 text-left"
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">Search anything...</span>
          <kbd className="flex items-center gap-0.5 text-xs font-mono bg-background border border-border rounded px-1.5 py-0.5">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground border-0">
                7
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="text-xs">7 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { icon: "🚨", text: "Stock-out risk: SKU-3421 (AirPods Pro)", time: "2m ago", urgent: true },
              { icon: "💡", text: "AI: Price increase opportunity on 12 SKUs", time: "15m ago", urgent: false },
              { icon: "📈", text: "Demand spike detected in Electronics", time: "1h ago", urgent: false },
              { icon: "💰", text: "Marketing ROI alert: Meta spend -18%", time: "3h ago", urgent: false },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-start gap-2 w-full">
                  <span className="text-base">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs leading-snug ${n.urgent ? "font-semibold text-destructive" : ""}`}>{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                  {n.urgent && <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 mt-1" />}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary justify-center" onClick={() => navigate("/alerts")}>
              View all notifications →
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark Mode Toggle */}
        <Button variant="ghost" size="icon" onClick={onToggleDark}>
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
              <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium leading-none">Jordan Davis</span>
                <span className="text-xs text-muted-foreground leading-none mt-0.5">CEO, TechStore Inc.</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <User className="w-4 h-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => navigate("/login")}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}
