"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Zap, Database, Shield, Layers, Server } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] glow-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Orcathon 2026 Boilerplate • Sunday Deployment Ready</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Engineered to win{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Orcathon 2026.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Full-stack foundation with <strong>Next.js 16</strong>, <strong>Supabase</strong>, <strong>Clerk Auth</strong>,{" "}
          <strong>Drizzle ORM</strong>, and <strong>Upstash Redis</strong>. Architected for zero friction when the problem statement drops.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#live-health"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2 group active:scale-95"
          >
            <span>Run Live Stack Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#problem-adapter"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm active:scale-95"
          >
            <span>Select Problem Track</span>
          </a>
        </div>

        {/* Stack Highlights Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            { label: "Next.js 16", desc: "Turbopack App Router", icon: Zap },
            { label: "React 19", desc: "Server Components", icon: Layers },
            { label: "Drizzle ORM", desc: "Zero-Lag Schema Push", icon: Database },
            { label: "Supabase", desc: "Postgres & Realtime", icon: Server },
            { label: "Clerk", desc: "Turnkey User Auth", icon: Shield },
            { label: "Upstash", desc: "Redis & Ratelimiting", icon: Zap },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono truncate">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
