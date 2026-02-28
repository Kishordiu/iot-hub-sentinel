import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Cpu, Lock, Activity, ChevronRight, Zap, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Zero-Trust Security",
    description: "Every device request is verified. No implicit trust, ever.",
  },
  {
    icon: Cpu,
    title: "Real-Time Monitoring",
    description: "Live device telemetry with sub-second latency via WebSocket.",
  },
  {
    icon: Lock,
    title: "Multi-Tenant Isolation",
    description: "Complete data segregation between organizations.",
  },
  {
    icon: Activity,
    title: "Instant Commands",
    description: "Lock, unlock, reset, or shutdown devices remotely in real-time.",
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Command Latency" },
  { value: "10M+", label: "Devices Managed" },
  { value: "256-bit", label: "AES Encryption" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">IoTShield</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/company" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Company</Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              Zero-Trust IoT Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Manage Every
              <span className="text-gradient-primary block">Connected Device</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Enterprise-grade IoT device management with zero-trust security, real-time monitoring, and multi-tenant isolation.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="gap-2 gradient-primary text-primary-foreground font-semibold px-8">
                  Start Free Trial <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 glass-card glow-border p-8 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-primary glow-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Built for Industrial Scale</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From edge gateways to thousands of sensors — complete visibility and control.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="glass-card p-6 hover:glow-border transition-shadow duration-300 group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture preview */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: "Edge Computing", desc: "Process data at the edge for minimal latency." },
              { icon: Server, title: "Cloud Backend", desc: "Scalable infrastructure with auto-provisioning." },
              { icon: Shield, title: "End-to-End TLS", desc: "mTLS certificates for every device connection." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">IoTShield</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/company" className="hover:text-foreground transition-colors">Company</Link>
            <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 IoTShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
