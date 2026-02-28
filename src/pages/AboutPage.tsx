import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Users, Globe, Award, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">IoTShield</span>
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About <span className="text-gradient-primary">IoTShield</span></h1>
          <p className="text-lg text-muted-foreground mb-12">
            IoTShield is a zero-trust IoT device management platform designed for enterprises 
            that demand military-grade security and real-time control over their connected infrastructure.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Shield, title: "Zero-Trust Architecture", desc: "Every API call, every device handshake, every data packet is authenticated and authorized independently." },
              { icon: Users, title: "Multi-Tenant by Design", desc: "Complete data isolation between tenants with row-level security and encrypted tenant-scoped storage." },
              { icon: Globe, title: "Global Edge Network", desc: "Deploy device gateways across regions with automatic failover and data residency compliance." },
              { icon: Award, title: "Compliance Ready", desc: "SOC 2 Type II, ISO 27001, and GDPR compliant infrastructure with audit logging." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
