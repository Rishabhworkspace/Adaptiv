"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePortfolio } from "@/components/portfolio/PortfolioProvider";

export default function Home() {
  const router = useRouter();
  const { personalize, reset, isGenerating } = usePortfolio();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handlePersonalize = async () => {
    if (!company || !role) return;

    // We navigate to portfolio first so user sees the skeleton loading state there
    router.push("/portfolio");

    // Then trigger personalization
    personalize(company, role);
  };

  const handleSkip = () => {
    reset(); // Clear context, use flat data
    router.push("/portfolio");
  };

  return (
    <main className="container-custom flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background ambient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,92,231,0.05)_0%,transparent_70%)]"></div>

      <div className="max-w-xl w-full mx-auto space-y-12 relative z-10">
        <header className="text-center animate-fade-in-up">
          <p className="text-accent font-mono mb-4 text-sm tracking-widest">
            /// SYSTEM_START
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-sans tracking-tight">
            Adaptive <span className="text-accent hover:drop-shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all">Portfolio</span>
          </h1>
          <p className="text-lg text-secondary max-w-md mx-auto font-sans leading-relaxed">
            A portfolio that actively rewrites itself to prove why I'm the perfect fit for your role.
          </p>
        </header>

        <div className="stagger-children space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <GlassCard elevated className="p-8 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold font-sans text-primary">Who are you?</h2>
              <p className="text-secondary text-sm">Provide your context to see the magic.</p>
            </div>

            <div className="space-y-6 max-w-sm mx-auto w-full">
              <div className="text-left space-y-2">
                <label className="text-xs font-mono text-accent ml-1 uppercase font-semibold tracking-wider">Company</label>
                <Input
                  placeholder="e.g. Google, Stripe, Startup"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
              <div className="text-left space-y-2">
                <label className="text-xs font-mono text-accent ml-1 uppercase font-semibold tracking-wider">Role</label>
                <Input
                  placeholder="e.g. Frontend Engineer, SDE2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" onClick={handleSkip} disabled={isGenerating}>
                View Standard
              </Button>
              <Button
                variant="primary"
                onClick={handlePersonalize}
                disabled={!company || !role || isGenerating}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "Connecting to AI..." : "Personalize Portfolio"}
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
