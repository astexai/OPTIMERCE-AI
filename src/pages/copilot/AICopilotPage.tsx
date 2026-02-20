import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, Brain, User } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/shared/PageComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message { role: "user" | "ai"; content: string; timestamp: string; }

const suggestedPrompts = [
  "What's causing my margin drop this week?",
  "Which SKUs should I reorder immediately?",
  "Where is my marketing spend being wasted?",
  "Show me top revenue opportunities",
];

const aiResponses: Record<string, string> = {
  default: "Based on your data, I've identified 3 high-priority actions: (1) Reorder USB-C Hub Pro — stock depletes in 2.8 days with $48K at risk. (2) Increase AirPods Pro price by 14% — competitor gap identified. (3) Reallocate $4,880 from Meta to Google Shopping for +$14K ROAS improvement. Would you like me to initiate any of these?",
  margin: "Your margin dropped 2.1% this week due to: (1) Meta ad costs increased 34% with no conversion lift — wasting $4.8K. (2) USB-C Hub promotional pricing reduced SKU margin from 42% to 28%. (3) Shipping cost increase from primary carrier (+$0.80/order). Recommend: pause Meta campaign #12 and revert Hub pricing immediately.",
  reorder: "🚨 Immediate reorder needed for 2 SKUs:\n\n• USB-C Hub Pro (SKU-8821): 134 units left, 47/day velocity = 2.8 days. Order 1,400 units now.\n• AirPods Pro (SKU-3421): 12 units left, 4.2/day = 2.9 days. Order 200 units now.\n\nCombined risk: $66K in lost revenue if not acted on today.",
};

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I'm your Nexus AI Copilot. I have full context of your store data, inventory, pricing, and marketing performance. Ask me anything about your business.", timestamp: "Just now" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text, timestamp: "Just now" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const key = text.toLowerCase().includes("margin") ? "margin" : text.toLowerCase().includes("reorder") ? "reorder" : "default";
    const aiMsg: Message = { role: "ai", content: aiResponses[key], timestamp: "Just now" };
    setTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <PageContainer className="h-full flex flex-col">
      <PageHeader
        title="AI Copilot"
        description="Your intelligent commerce advisor — powered by your live data"
        icon={<MessageSquare className="w-6 h-6" />}
        badge="Live Data"
      />
      <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card shadow-card overflow-hidden" style={{ minHeight: 500 }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3 animate-fade-in", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.role === "ai" ? "bg-gradient-primary" : "bg-muted"
              )}>
                {msg.role === "ai" ? <Brain className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className={cn("max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
                msg.role === "ai"
                  ? "bg-muted text-foreground rounded-tl-sm"
                  : "bg-gradient-primary text-white rounded-tr-sm"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        <div className="px-6 py-3 border-t border-border flex gap-2 flex-wrap">
          {suggestedPrompts.map((p, i) => (
            <button key={i} onClick={() => sendMessage(p)} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all">
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-border flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask about your revenue, inventory, pricing, or marketing..."
            className="flex-1 h-11"
          />
          <Button onClick={() => sendMessage(input)} className="h-11 px-4 bg-gradient-primary hover:opacity-90" disabled={!input.trim() || typing}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
