"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Database,
  Lock,
  RefreshCw,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

interface SignalItem {
  id: string;
  track: string;
  title: string;
  status: "OPEN" | "PROCESSING" | "RESOLVED";
  latency: string;
  source: string;
  impactScore: number;
  timestamp: string;
}

const MOCK_SIGNALS: SignalItem[] = [
  {
    id: "SIG-8092",
    track: "DISCOVERY & AI",
    title: "Latent space anomaly detected in multimodal inference pipeline",
    status: "PROCESSING",
    latency: "14ms",
    source: "Edge Ingest Cluster 04",
    impactScore: 94,
    timestamp: "12s ago",
  },
  {
    id: "SIG-8091",
    track: "FINTECH & DEFI",
    title: "Automated arbitrage slip window locked at 0.04% tolerance",
    status: "RESOLVED",
    latency: "8ms",
    source: "Supabase Pooler 02",
    impactScore: 99,
    timestamp: "45s ago",
  },
  {
    id: "SIG-8090",
    track: "CIVIC TECH",
    title: "Decentralized civic governance quorum verified via Merkle root",
    status: "OPEN",
    latency: "22ms",
    source: "Upstash Redis Cache",
    impactScore: 88,
    timestamp: "2m ago",
  },
  {
    id: "SIG-8089",
    track: "HEALTHCARE & BIO",
    title: "Variant impact mutation score calibrated across 54 tissue sites",
    status: "RESOLVED",
    latency: "11ms",
    source: "Drizzle Query Engine",
    impactScore: 97,
    timestamp: "4m ago",
  },
  {
    id: "SIG-8088",
    track: "DEV INFRA",
    title: "Clerk JWT token rotated and verified against Edge runtime",
    status: "RESOLVED",
    latency: "6ms",
    source: "Next.js Middleware",
    impactScore: 92,
    timestamp: "8m ago",
  },
];

export default function DashboardPage() {
  const [activeTrack, setActiveTrack] = useState<string>("ALL");
  const [signals] = useState<SignalItem[]>(MOCK_SIGNALS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSignal, setActiveSignal] = useState<SignalItem | null>(MOCK_SIGNALS[0]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredSignals =
    activeTrack === "ALL"
      ? signals
      : signals.filter((s) => s.track.toUpperCase().includes(activeTrack));

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4efe6] flex flex-col relative selection:bg-[#ff8539]/20 selection:text-[#ffedd6]">
      <Navbar />

      <main className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top Breadcrumb & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[rgba(255,237,214,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff8539] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>ACT 2 // APPLICATION ENGINE HUD</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-extrabold tracking-tight text-[#f4efe6]">
              Problem Signals Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="oryzo-btn-secondary px-3.5 py-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Telemetry</span>
            </button>

            <Link href="/workbench" className="oryzo-btn-primary px-4 py-2 text-xs">
              <span>Inspect 3D Centerpiece</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Architectural Matte Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="oryzo-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-[#94a3b8] mb-2 font-mono text-xs">
              <span>IMPACT SCORE</span>
              <Activity className="w-4 h-4 text-[#ff8539]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#f4efe6]">
              98.4<span className="text-sm text-[#94a3b8] font-normal">/100</span>
            </div>
            <div className="mt-1 text-[11px] text-[#10b981] font-mono flex items-center gap-1">
              <span>↑ +2.4%</span>
              <span className="text-[#94a3b8]">confidence index</span>
            </div>
          </div>

          <div className="oryzo-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-[#94a3b8] mb-2 font-mono text-xs">
              <span>POSTGRES PING</span>
              <Database className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#f4efe6]">
              11.8 <span className="text-sm text-[#94a3b8] font-normal">ms</span>
            </div>
            <div className="mt-1 text-[11px] text-[#10b981] font-mono">
              <span>● POOLER ONLINE</span>
            </div>
          </div>

          <div className="oryzo-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-[#94a3b8] mb-2 font-mono text-xs">
              <span>REDIS CACHE HIT</span>
              <Zap className="w-4 h-4 text-[#ff8539]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#f4efe6]">
              99.6 <span className="text-sm text-[#94a3b8] font-normal">%</span>
            </div>
            <div className="mt-1 text-[11px] text-[#94a3b8] font-mono">
              <span>SLIDING WINDOW: 100 req/min</span>
            </div>
          </div>

          <div className="oryzo-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-[#94a3b8] mb-2 font-mono text-xs">
              <span>AUTH SECURITY</span>
              <Shield className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#f4efe6]">
              TLS 1.3
            </div>
            <div className="mt-1 text-[11px] text-[#94a3b8] font-mono">
              <span>CLERK PROXY LOCKED</span>
            </div>
          </div>
        </div>

        {/* Simulated Browser Pane (Act 2 Frame) */}
        <div className="oryzo-card rounded-2xl overflow-hidden border border-[rgba(255,237,214,0.1)] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] mb-8">
          {/* Browser Chrome Header */}
          <div className="px-4 py-3 bg-[#0d0f15] border-b border-[rgba(255,237,214,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]/80 inline-block" />
            </div>

            {/* URL Search Bar */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#151822] rounded-full border border-[rgba(255,237,214,0.08)] text-xs font-mono text-[#94a3b8] max-w-md w-full justify-center">
              <Lock className="w-3 h-3 text-[#10b981]" />
              <span className="text-[#f4efe6]">https://orcathon.app</span>
              <span>/dashboard/engine</span>
              <span className="text-[10px] text-[#ff8539] ml-2">TLS 1.3</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#94a3b8]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="hidden sm:inline">LIVE FEED</span>
            </div>
          </div>

          {/* Browser Main Body: Dual-Pane Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Column: Problem Signals Feed */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[rgba(255,237,214,0.08)] p-6">
              {/* Track Filters */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
                  Active Signals
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["ALL", "AI", "FINTECH", "CIVIC", "BIO"].map((track) => (
                    <button
                      key={track}
                      onClick={() => setActiveTrack(track)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                        activeTrack === track
                          ? "bg-[#ffedd6] text-black font-bold"
                          : "bg-white/[0.04] text-[#94a3b8] hover:text-white"
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>

              {/* Signals List */}
              <div className="space-y-3">
                {filteredSignals.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveSignal(item)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      activeSignal?.id === item.id
                        ? "bg-[#161a24] border-[rgba(255,133,57,0.4)] shadow-[0_4px_20px_rgba(255,133,57,0.1)]"
                        : "bg-[#0f1118]/80 border-[rgba(255,237,214,0.06)] hover:border-[rgba(255,237,214,0.15)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#ff8539]">{item.id}</span>
                        <span>•</span>
                        <span className="text-[#ffedd6]">{item.track}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">{item.latency}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-[#f4efe6] mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
                      <span>Source: {item.source}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === "RESOLVED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.status === "PROCESSING"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Signal Detail & Dispatch Console */}
            <div className="lg:col-span-5 p-6 bg-[#0a0b10] flex flex-col justify-between">
              {activeSignal ? (
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ff8539] mb-2 uppercase">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Signal Telemetry Inspector</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f4efe6] mb-3 font-[family-name:var(--font-display)]">
                    {activeSignal.title}
                  </h3>

                  <div className="space-y-3 font-mono text-xs text-[#94a3b8] mb-6">
                    <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span>SIGNAL ID</span>
                      <span className="text-white font-bold">{activeSignal.id}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span>DOMAIN TRACK</span>
                      <span className="text-[#ffedd6]">{activeSignal.track}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span>ROUND TRIP LATENCY</span>
                      <span className="text-emerald-400">{activeSignal.latency}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span>IMPACT SCORE</span>
                      <span className="text-amber-400 font-bold">{activeSignal.impactScore}/100</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span>SECURITY LEVEL</span>
                      <span className="text-white">ED25519 VERIFIED</span>
                    </div>
                  </div>

                  {/* Simulated Terminal Payload */}
                  <div className="bg-[#050608] rounded-xl p-4 border border-[rgba(255,237,214,0.08)] font-mono text-[11px] text-[#94a3b8] overflow-x-auto">
                    <div className="text-emerald-400 mb-1">{"// Drizzle ORM Payload Stream"}</div>
                    <div className="text-[#ffedd6]">const resolution = await db</div>
                    <div className="pl-4">.select()</div>
                    <div className="pl-4">.from(problemSignals)</div>
                    <div className="pl-4">.where(eq(id, &quot;{activeSignal.id}&quot;))</div>
                    <div className="pl-4">.limit(1);</div>
                    <div className="text-neutral-500 mt-2">{"// Status: Locked in 0.012s via Supabase Pooler"}</div>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 pt-4 border-t border-[rgba(255,237,214,0.08)] flex items-center justify-between">
                <span className="font-mono text-xs text-[#94a3b8]">Engine Ready</span>
                <button
                  onClick={() => alert(`Signal ${activeSignal?.id} dispatched through Drizzle ORM`)}
                  className="oryzo-btn-primary py-2 px-4 text-xs"
                >
                  <span>Dispatch Resolution →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
