import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain, ArrowRight, ArrowLeft, CheckCircle2, Plug, Target, Tag,
  Sparkles, BarChart3, ShoppingCart, RefreshCw, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Connect Platforms", icon: Plug },
  { id: 2, label: "Business Goals", icon: Target },
  { id: 3, label: "Categories & SKUs", icon: Tag },
  { id: 4, label: "AI Preferences", icon: Sparkles },
  { id: 5, label: "Summary", icon: CheckCircle2 },
];

const platforms = [
  { id: "shopify", name: "Shopify", color: "bg-green-500", logo: "🛍️" },
  { id: "amazon", name: "Amazon", color: "bg-orange-500", logo: "📦" },
  { id: "woocommerce", name: "WooCommerce", color: "bg-purple-500", logo: "🏪" },
  { id: "bigcommerce", name: "BigCommerce", color: "bg-blue-500", logo: "🔵" },
  { id: "tiktok", name: "TikTok Shop", color: "bg-pink-500", logo: "🎵" },
  { id: "walmart", name: "Walmart", color: "bg-yellow-500", logo: "🔶" },
  { id: "meta", name: "Meta Ads", color: "bg-blue-600", logo: "📱" },
  { id: "google", name: "Google Ads", color: "bg-red-500", logo: "🔍" },
];

const goals = [
  { id: "revenue", label: "Maximize Revenue", desc: "Focus AI on identifying high-value opportunities" },
  { id: "margin", label: "Improve Profit Margins", desc: "Optimize pricing and reduce waste" },
  { id: "inventory", label: "Reduce Stock-outs", desc: "Prevent lost sales from inventory issues" },
  { id: "marketing", label: "Optimize Marketing ROI", desc: "Spend smarter across channels" },
  { id: "automation", label: "Automate Decisions", desc: "Let AI handle routine commerce decisions" },
];

const categories = [
  "Electronics", "Clothing & Apparel", "Home & Garden", "Beauty & Health",
  "Sports & Outdoors", "Toys & Games", "Food & Beverage", "Automotive"
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["shopify", "amazon"]);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["revenue", "inventory"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Electronics"]);
  const [aiPrefs, setAiPrefs] = useState({ automation: "moderate", sensitivity: "balanced" });
  const [syncing, setSyncing] = useState(false);

  const handleConnect = async (id: string) => {
    setConnectingId(id);
    await new Promise(r => setTimeout(r, 1500));
    setConnectedPlatforms(p => [...p, id]);
    setConnectingId(null);
  };

  const handleNext = async () => {
    if (step === 1 && connectedPlatforms.length === 0) {
      // Auto-connect shopify for demo
      await handleConnect("shopify");
    }
    if (step === 4) {
      setSyncing(true);
      await new Promise(r => setTimeout(r, 2500));
      setSyncing(false);
    }
    if (step < 5) setStep(s => s + 1);
    else navigate("/dashboard");
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">OptiMerce AI</span>
            <span className="text-muted-foreground text-sm ml-2">— Setup Wizard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            Skip setup
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-semibold",
                    step > s.id
                      ? "bg-success text-white"
                      : step === s.id
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "text-xs mt-1.5 font-medium text-center hidden sm:block",
                    step === s.id ? "text-primary" : step > s.id ? "text-success" : "text-muted-foreground"
                  )}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500 rounded-full"
                      style={{ width: step > s.id ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in-scale">
          {/* Step 1: Connect Platforms */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Connect your platforms</h2>
                <p className="text-muted-foreground">Connect your marketplace and advertising accounts to start syncing data</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map(p => {
                  const isConnected = connectedPlatforms.includes(p.id);
                  const isConnecting = connectingId === p.id;
                  return (
                    <div key={p.id} className={cn(
                      "rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-elevated",
                      isConnected ? "border-success bg-success/5" : "border-border bg-card hover:border-primary/30"
                    )}>
                      <div className="text-center">
                        <div className="text-3xl mb-2">{p.logo}</div>
                        <p className="font-medium text-sm text-foreground mb-2">{p.name}</p>
                        <Button
                          size="sm"
                          className={cn(
                            "w-full h-7 text-xs",
                            isConnected
                              ? "bg-success/10 text-success hover:bg-success/20 border border-success/20"
                              : "bg-gradient-primary hover:opacity-90"
                          )}
                          onClick={() => !isConnected && handleConnect(p.id)}
                          disabled={isConnecting}
                        >
                          {isConnecting ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : isConnected ? (
                            <><CheckCircle2 className="w-3 h-3 mr-1" />Connected</>
                          ) : "Connect"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4">
                {connectedPlatforms.length} of {platforms.length} platforms connected
              </p>
            </div>
          )}

          {/* Step 2: Business Goals */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">What are your business goals?</h2>
                <p className="text-muted-foreground">Select all that apply — AI will prioritize recommendations accordingly</p>
              </div>
              <div className="space-y-3">
                {goals.map(g => {
                  const selected = selectedGoals.includes(g.id);
                  return (
                    <div
                      key={g.id}
                      className={cn(
                        "rounded-xl border-2 p-4 cursor-pointer transition-all duration-150",
                        selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                      )}
                      onClick={() => setSelectedGoals(prev =>
                        prev.includes(g.id) ? prev.filter(x => x !== g.id) : [...prev, g.id]
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={selected} className="pointer-events-none" />
                        <div>
                          <p className="font-semibold text-foreground">{g.label}</p>
                          <p className="text-sm text-muted-foreground">{g.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Product categories & SKU range</h2>
                <p className="text-muted-foreground">Help AI understand your catalog structure</p>
              </div>
              <div className="mb-6">
                <Label className="mb-3 block">Select your product categories</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map(cat => {
                    const sel = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        className={cn(
                          "rounded-xl border-2 py-3 px-4 text-sm font-medium transition-all",
                          sel ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"
                        )}
                        onClick={() => setSelectedCategories(prev =>
                          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                        )}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Approximate SKU count</Label>
                  <Input placeholder="e.g. 500–2000" className="h-11" defaultValue="1,200" />
                </div>
                <div className="space-y-1.5">
                  <Label>Average order value</Label>
                  <Input placeholder="e.g. $85" className="h-11" defaultValue="$94" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Preferences */}
          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Configure AI behavior</h2>
                <p className="text-muted-foreground">Set how aggressively AI should act on your behalf</p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    key: "automation",
                    label: "Automation Level",
                    desc: "How much should AI automate without your approval?",
                    options: [
                      { value: "manual", label: "Manual", desc: "AI suggests, you approve everything" },
                      { value: "moderate", label: "Moderate", desc: "AI auto-applies low-risk decisions" },
                      { value: "aggressive", label: "Aggressive", desc: "AI acts on most decisions autonomously" },
                    ]
                  },
                  {
                    key: "sensitivity",
                    label: "Risk Sensitivity",
                    desc: "How cautious should AI be with recommendations?",
                    options: [
                      { value: "conservative", label: "Conservative", desc: "Only high-confidence actions" },
                      { value: "balanced", label: "Balanced", desc: "Good mix of caution and opportunity" },
                      { value: "opportunistic", label: "Opportunistic", desc: "Capture every possible upside" },
                    ]
                  }
                ].map(pref => (
                  <div key={pref.key}>
                    <div className="mb-3">
                      <p className="font-semibold text-foreground">{pref.label}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {pref.options.map(opt => {
                        const sel = aiPrefs[pref.key as keyof typeof aiPrefs] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            className={cn(
                              "rounded-xl border-2 p-3 text-left transition-all",
                              sel ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                            )}
                            onClick={() => setAiPrefs(p => ({ ...p, [pref.key]: opt.value }))}
                          >
                            <p className={cn("font-semibold text-sm mb-0.5", sel ? "text-primary" : "text-foreground")}>{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Data sync simulation */}
              {syncing && (
                <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">AI is syncing & analyzing your data...</p>
                      <p className="text-xs text-muted-foreground">This usually takes 30–60 seconds</p>
                    </div>
                  </div>
                  {[
                    { label: "Syncing Shopify orders", done: true },
                    { label: "Syncing Amazon inventory", done: true },
                    { label: "Processing 47,823 SKUs", done: false },
                    { label: "Building demand forecasts", done: false },
                    { label: "Generating AI recommendations", done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 text-sm">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin flex-shrink-0" />
                      )}
                      <span className={item.done ? "text-muted-foreground line-through" : "text-foreground"}>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Summary */}
          {step === 5 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-6 animate-float">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">You're all set! 🎉</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                OptiMerce AI has analyzed your data and generated {Math.floor(Math.random() * 20) + 15} initial recommendations ready for you.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
                {[
                  { value: connectedPlatforms.length || 2, label: "Platforms Connected" },
                  { value: "47,823", label: "SKUs Analyzed" },
                  { value: "94.2%", label: "Forecast Accuracy" },
                  { value: "$48,200", label: "Est. Monthly Opportunity" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {STEPS.map(s => (
              <div key={s.id} className={cn(
                "w-2 h-2 rounded-full transition-all",
                step === s.id ? "bg-primary w-6" : step > s.id ? "bg-success" : "bg-muted"
              )} />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="gap-2 bg-gradient-primary hover:opacity-90"
            disabled={syncing}
          >
            {step === 5 ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
