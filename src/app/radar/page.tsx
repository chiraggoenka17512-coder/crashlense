import React from "react";
import { CrashLensRadar } from "@/components/radar/CrashLensRadar";
import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "CrashLens // Live Predictive Failure Radar & Chaos Sandbox",
  description:
    "Real-time distributed microservices failure simulation, DAG topology percolation, and predictive RCA engine.",
};

export default function RadarPage() {
  return (
    <div className="h-screen w-screen bg-[#07080a] text-[#f4efe6] flex flex-col overflow-hidden select-none">
      {/* Top Bar with Navigation back to Landing Page */}
      <header className="h-12 border-b border-[rgba(255,237,214,0.08)] bg-[#0a0b10] px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-xs text-[#94a3b8] hover:text-[#ffedd6] transition-colors px-2 py-1 rounded border border-white/5 hover:border-white/20 bg-white/[0.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT TO OVERVIEW</span>
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-[family-name:var(--font-display)] font-black text-sm tracking-tight text-[#ffedd6]">
              CRASHLENS // PRODUCTION RADAR
            </span>
            <span className="oryzo-caliper ml-2 text-[10px]">LIVE CLUSTER</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#94a3b8]">
          <div className="hidden md:flex items-center gap-2">
            <Zap className="w-3 h-3 text-[#ff8539]" />
            <span>Z-SCORE FASTPATH: ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#10b981]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>12 CLUSTER NODES ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Radar Shell */}
      <main className="flex-1 w-full h-[calc(100vh-48px)] relative">
        <CrashLensRadar standalone={false} />
      </main>
    </div>
  );
}
