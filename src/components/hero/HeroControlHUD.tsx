"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, ArrowRight, Play, Database, Check, RefreshCw } from "lucide-react";

interface HeroControlHUDProps {
  style?: React.ComponentProps<typeof motion.div>["style"];
}

export function HeroControlHUD({ style }: HeroControlHUDProps = {}) {
  const prefersReduced = useReducedMotion();
  const [selectedTrack, setSelectedTrack] = useState<string>("ai_agent");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const tracks = [
    { id: "ai_agent", label: "🤖 AI Agents & LLM", desc: "Drizzle JSONB memory + Upstash Token Limiter" },
    { id: "saas", label: "⚡ Full-Stack SaaS", desc: "Clerk Session Auth + Supabase Postgres CRUD" },
    { id: "fintech", label: "🛡️ Fintech / Real-Time", desc: "ACID Transactions + Upstash Rate Limit" },
    { id: "open", label: "🌐 Open Innovation", desc: "Modular Schema & Instant Vercel Deploy" },
  ];

  const handleQuickTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setTestResult(`✓ All Systems Nominal · ${data.readinessScore}`);
    } catch {
      setTestResult("⚠️ API check failed. Ensure dev server is running.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative z-30 mx-auto w-full max-w-4xl px-4 mt-8 pb-4"
    >
      <div className="rounded-2xl border border-white/10 bg-neutral-950/80 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl shadow-indigo-950/40">
        {/* Track Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              Select Hackathon Track:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTrack === track.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                    : "bg-white/[0.03] text-neutral-300 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {/* HUD Interactive Controls */}
        <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuickTest}
              disabled={isTesting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-md shadow-indigo-600/20"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isTesting ? "animate-spin" : ""}`} />
              <span>{isTesting ? "Verifying..." : "Ping Stack APIs"}</span>
            </button>

            <a
              href="#problem-adapter"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>View Track Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Quick status message */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            {testResult ? (
              <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {testResult}
              </span>
            ) : (
              <span className="text-neutral-400">
                {tracks.find((t) => t.id === selectedTrack)?.desc}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
