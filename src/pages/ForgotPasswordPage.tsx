import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/services/endpoints";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch {
      setErrorMsg("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">IoTShield</span>
          </Link>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link</p>
        </div>

        <div className="glass-card p-6 glow-border">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <p className="font-medium mb-1">Check your email</p>
              <p className="text-sm text-muted-foreground">We sent a reset link to {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {errorMsg}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>

        <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to login
        </Link>
      </motion.div>
    </div>
  );
}
