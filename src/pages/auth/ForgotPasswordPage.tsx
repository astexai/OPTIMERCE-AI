import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md animate-fade-in-scale">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-foreground">Nexus AI</span>
        </div>

        {!sent ? (
          <>
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-subtle border border-primary/10 flex items-center justify-center text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Reset your password</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-primary hover:opacity-90 font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Send reset link"}
              </Button>
            </form>

            <Link to="/login" className="flex items-center gap-2 justify-center mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We sent a password reset link to <strong className="text-foreground">{email}</strong>
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Didn't receive the email? Check your spam folder or{" "}
              <button onClick={() => setSent(false)} className="text-primary hover:underline">try again</button>
            </p>
            <Link to="/login">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
