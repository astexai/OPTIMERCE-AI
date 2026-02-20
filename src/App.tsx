import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

// Auth
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Onboarding
import OnboardingPage from "@/pages/onboarding/OnboardingPage";

// App pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import IntegrationsPage from "@/pages/integrations/IntegrationsPage";
import UnifiedDataPage from "@/pages/data/UnifiedDataPage";
import DemandForecastingPage from "@/pages/forecasting/DemandForecastingPage";
import InventoryPage from "@/pages/inventory/InventoryPage";
import DynamicPricingPage from "@/pages/pricing/DynamicPricingPage";
import MarketingPage from "@/pages/marketing/MarketingPage";
import CrossDomainPage from "@/pages/crossdomain/CrossDomainPage";
import RevenueImpactPage from "@/pages/revenue/RevenueImpactPage";
import RecommendationsPage from "@/pages/recommendations/RecommendationsPage";
import AutomationPage from "@/pages/automation/AutomationPage";
import AICopilotPage from "@/pages/copilot/AICopilotPage";
import SimulatorPage from "@/pages/simulator/SimulatorPage";
import AnalyticsPage from "@/pages/analytics/AnalyticsPage";
import AlertsPage from "@/pages/alerts/AlertsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import AdminPage from "@/pages/admin/AdminPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* App routes (with layout shell) */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/unified-data" element={<UnifiedDataPage />} />
            <Route path="/demand-forecasting" element={<DemandForecastingPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/pricing" element={<DynamicPricingPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/cross-domain" element={<CrossDomainPage />} />
            <Route path="/revenue-impact" element={<RevenueImpactPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/copilot" element={<AICopilotPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
