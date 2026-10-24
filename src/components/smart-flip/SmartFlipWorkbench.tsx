"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { DeviceModelCanvas } from "@/components/canvas/DeviceModelCanvas";
import {
  RotateCcw,
  Activity,
  Database,
  Zap,
  Terminal,
  Cpu,
} from "lucide-react";

export function SmartFlipWorkbench() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<"drizzle" | "supabase" | "upstash">("drizzle");

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#07080a] border-t border-[rgba(255,237,214,0.08)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[rgba(255,237,214,0.08)] gap-4">
          <div>
            <div className="oryzo-caliper mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
              <span>ACT 4 // INDUSTRIAL 3D WORKBENCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] tracking-tight">
              The Smart Flip Workbench
            </h2>
            <p className="text-[#94a3b8] text-sm max-w-xl mt-1">
              Dual-sided Grade 5 Titanium iPhone 16 Pro on an A2 craft cutting mat. Flip 180° to expose the high-throughput serverless telemetry engine.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="oryzo-btn-primary cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Show Frontend UI (0°)" : "Flip to Engine (180°)"}</span>
            </button>
          </div>
        </div>

        {/* Physical Cutting Mat Workbench (Matte CAD Cutting Mat) */}
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,237,214,0.1)] bg-[#0c0e14] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)]">
          {/* Cutting Mat Grid Lines Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 237, 214, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 237, 214, 0.06) 1px, transparent 1px),
                linear-gradient(to right, rgba(255, 237, 214, 0.16) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 237, 214, 0.16) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
            }}
          />

          {/* Cutting Mat Ruler Calipers */}
          <div className="relative z-10 flex justify-between items-center px-4 py-2 bg-[#090b10] border-b border-[rgba(255,237,214,0.08)] text-[10px] font-mono text-[#94a3b8]">
            <div className="flex items-center gap-4">
              <span>▦ CRAFT WORKBENCH: A2 600×450mm</span>
              <span>GRID: 10mm SCALE</span>
            </div>
            <div className="flex items-center gap-3">
              <span>CALIPER TOLERANCE: ±0.02mm</span>
              <span className="text-[#ff8539] font-bold">
                STAGE: {isFlipped ? "SERVERLESS ENGINE (180°)" : "3D DEVICE HUD (0°)"}
              </span>
            </div>
          </div>

          {/* Dual-Column Interactive Stage */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left: 3D Device Viewport */}
            <div className="lg:col-span-7 relative h-[480px] lg:h-auto border-b lg:border-b-0 lg:border-r border-[rgba(255,237,214,0.08)] flex flex-col justify-center items-center bg-black/40">
              <DeviceModelCanvas
                isFlipped={isFlipped}
                onFlipToggle={() => setIsFlipped((prev) => !prev)}
                problemTitle="RESOLVING THE UNRESOLVED"
                problemCategory="ORCATHON 2026"
                className="h-full min-h-[440px]"
              />

              {/* Physical Stamp Badge on Cutting Mat */}
              <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 bg-[#0d0f16]/90 px-3 py-1.5 rounded-lg border border-[rgba(255,237,214,0.12)] text-[10px] font-mono text-[#ffedd6] backdrop-blur-md">
                <Cpu className="w-3.5 h-3.5 text-[#ff8539]" />
                <span>SPEC: 35K POLY // DRAC0-GLB // PBR TITANIUM</span>
              </div>
            </div>

            {/* Right: Live Telemetry & Serverless Engine Inspector */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#0a0b10]">
              <div>
                {/* Engine Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#12151c] rounded-xl border border-[rgba(255,237,214,0.08)] mb-6">
                  <button
                    onClick={() => setActiveTab("drizzle")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "drizzle"
                        ? "bg-[#ffedd6] text-[#07080a] font-bold shadow-sm"
                        : "text-[#94a3b8] hover:text-[#f4efe6]"
                    }`}
                  >
                    Drizzle ORM
                  </button>
                  <button
                    onClick={() => setActiveTab("supabase")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "supabase"
                        ? "bg-[#ffedd6] text-[#07080a] font-bold shadow-sm"
                        : "text-[#94a3b8] hover:text-[#f4efe6]"
                    }`}
                  >
                    Supabase
                  </button>
                  <button
                    onClick={() => setActiveTab("upstash")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "upstash"
                        ? "bg-[#ffedd6] text-[#07080a] font-bold shadow-sm"
                        : "text-[#94a3b8] hover:text-[#f4efe6]"
                    }`}
                  >
                    Upstash Redis
                  </button>
                </div>

                {/* Tab Content Display */}
                {activeTab === "drizzle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-mono text-[#ffedd6]">
                        <Database className="w-4 h-4 text-[#ff8539]" />
                        <span>drizzle-orm // Type-Safe Query Engine</span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        POOL: PORT 6543
                      </span>
                    </div>

                    <div className="bg-[#050608] rounded-xl p-4 border border-[rgba(255,237,214,0.08)] font-mono text-xs text-[#94a3b8] space-y-2">
                      <div className="text-neutral-500">{"// Schema: src/db/schema.ts"}</div>
                      <div className="text-[#ffedd6] font-semibold">
                        SELECT id, title, impact_score, evidence_metadata
                      </div>
                      <div className="text-[#ff8539]">
                        FROM problem_signals WHERE status = &apos;open&apos;
                      </div>
                      <div className="text-neutral-400">ORDER BY impact_score DESC LIMIT 10;</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">SCHEMA VERSION</div>
                        <div className="text-lg font-mono font-bold text-[#f4efe6] mt-1">v0.45.4</div>
                      </div>
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">QUERY LATENCY</div>
                        <div className="text-lg font-mono font-bold text-emerald-400 mt-1">9.8 ms</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "supabase" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-mono text-[#ffedd6]">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span>Supabase // PostgreSQL Pooler</span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        PG_BOUNCER ACTIVE
                      </span>
                    </div>

                    <div className="bg-[#050608] rounded-xl p-4 border border-[rgba(255,237,214,0.08)] font-mono text-xs text-[#94a3b8] space-y-2">
                      <div className="flex justify-between items-center text-neutral-400 pb-2 border-b border-[rgba(255,237,214,0.06)]">
                        <span>POSTGRES REGION</span>
                        <span className="text-emerald-400">aws-0-ap-south-1</span>
                      </div>
                      <div className="flex justify-between items-center text-neutral-400 py-1">
                        <span>ACTIVE POOL</span>
                        <span className="text-white font-bold">1 / 15 Connection</span>
                      </div>
                      <div className="flex justify-between items-center text-neutral-400 py-1">
                        <span>SSL ENCRYPTION</span>
                        <span className="text-white font-bold">TLS v1.3 STRICT</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">SERVERLESS SAFE</div>
                        <div className="text-lg font-mono font-bold text-emerald-400 mt-1">100% TRUE</div>
                      </div>
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">LIVE PING</div>
                        <div className="text-lg font-mono font-bold text-emerald-400 mt-1">11.8 ms</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "upstash" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-mono text-[#ffedd6]">
                        <Zap className="w-4 h-4 text-[#ff8539]" />
                        <span>Upstash Redis // Sliding-Window Cache</span>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                        SLIDING WINDOW: 10/10s
                      </span>
                    </div>

                    <div className="bg-[#050608] rounded-xl p-4 border border-[rgba(255,237,214,0.08)] font-mono text-xs text-[#94a3b8] space-y-2">
                      <div className="text-neutral-500">{"// Rate Limiter: src/lib/redis.ts"}</div>
                      <div className="text-[#ff8539]">
                        const &#123; success, remaining &#125; = await ratelimit.limit(ip);
                      </div>
                      <div className="text-neutral-400">
                        if (!success) return NextResponse.json(&#123; error: &apos;Too Many Requests&apos; &#125;);
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">EDGE CACHE HIT</div>
                        <div className="text-lg font-mono font-bold text-[#ff8539] mt-1">99.6%</div>
                      </div>
                      <div className="p-3 bg-[#11131a] rounded-xl border border-[rgba(255,237,214,0.08)]">
                        <div className="text-[10px] font-mono text-[#94a3b8]">BURST CAPACITY</div>
                        <div className="text-lg font-mono font-bold text-white mt-1">10 REQ/10S</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-6 border-t border-[rgba(255,237,214,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ALL ENGINES ENGAGED</span>
                </div>
                <button
                  onClick={() => setIsFlipped((prev) => !prev)}
                  className="text-xs font-mono text-[#ff8539] hover:text-[#ffedd6] transition-colors cursor-pointer"
                >
                  {isFlipped ? "Return to front view (0°) →" : "Flip 180° to back plate →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SmartFlipWorkbench;
