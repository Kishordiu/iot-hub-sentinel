import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, MapPin, Mail, ArrowLeft } from "lucide-react";

export default function CompanyPage() {
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
          <h1 className="text-4xl font-bold mb-6">Company</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Founded by security engineers and IoT specialists, IoTShield protects critical infrastructure across industries.
          </p>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To make industrial IoT secure by default. We believe that every connected device — from a temperature sensor to an autonomous vehicle — deserves zero-trust protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { value: "2024", label: "Founded" },
              { value: "50+", label: "Team Members" },
              { value: "12", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="font-mono text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-6">Contact</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA · Berlin, DE · Singapore</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@iotshield.io</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
