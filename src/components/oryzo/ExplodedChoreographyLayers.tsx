"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "motion/react";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Wifi,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Database,
  Cpu,
  Zap,
  Sparkles,
} from "lucide-react";

export interface StackLayer {
  id: number;
  name: string;
  badge: string;
  caption: string;
  color: string;
  accentBorder: string;
  accentBg: string;
  tech: string;
  telemetry: string;
  metric: string;
  bigTitle1: string;
  bigTitle2: string;
  bigTech1: string;
  bigTech2: string;
  implementationDetail: string;
  highlights: string[];
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 1,
    name: "Failure Radar OLED HUD",
    badge: "LAYER 01 // RADAR HUD",
    caption: "Real-time 12-node topology DAG with live percolation risk and 45s pre-failure horizon.",
    color: "#ffedd6",
    accentBorder: "border-[#ffedd6]",
    accentBg: "bg-[#ffedd6]/10",
    tech: "Next.js 16 + React 19",
    telemetry: "60 FPS RADAR HUD",
    metric: "45S HORIZON",
    bigTitle1: "FAILURE RADAR",
    bigTitle2: "OLED HUD",
    bigTech1: "NEXT.JS 16",
    bigTech2: "+ REACT 19",
    implementationDetail: "Client-side radar HUD compiled via Turbopack with React 19 concurrent transitions and zero-hydration jank.",
    highlights: ["45S HORIZON", "12-NODE TOPOLOGY DAG", "ZERO-JANK TRANSITIONS"],
  },
  {
    id: 2,
    name: "3D Spatial Graph Canvas",
    badge: "LAYER 02 // TOPOLOGY ENGINE",
    caption: "Hardware-accelerated 3D directed acyclic graph mapping 12 microservices with live latency springs.",
    color: "#38bdf8",
    accentBorder: "border-[#38bdf8]",
    accentBg: "bg-[#38bdf8]/10",
    tech: "Three.js + Draco GLTF",
    telemetry: "12-NODE DAG RUNTIME",
    metric: "120 FPS PBR",
    bigTitle1: "3D TOPOLOGY",
    bigTitle2: "GRAPH CANVAS",
    bigTech1: "THREE.JS",
    bigTech2: "+ DRACO GLTF",
    implementationDetail: "Hardware-accelerated Three.js canvas executing real-time spatial graph layout with Draco decompression.",
    highlights: ["12-NODE DAG RUNTIME", "REAL-TIME SPRINGS", "HARDWARE ACCELERATED"],
  },
  {
    id: 3,
    name: "Clerk Edge Auth Perimeter",
    badge: "LAYER 03 // AUTH GUARD RAIL",
    caption: "Instant edge authentication, JWT session verification, and multi-tenant RBAC security rail.",
    color: "#a855f7",
    accentBorder: "border-[#a855f7]",
    accentBg: "bg-[#a855f7]/10",
    tech: "Clerk Auth + Session Rail",
    telemetry: "JWT CLAIMS SYNC",
    metric: "ZERO-WAIT AUTH",
    bigTitle1: "CLERK EDGE",
    bigTitle2: "AUTH PERIMETER",
    bigTech1: "CLERK AUTH",
    bigTech2: "+ EDGE SESSION RAIL",
    implementationDetail: "Sub-millisecond edge authentication with zero-friction session hydration, JWT claim exchange, and protected telemetry routes.",
    highlights: ["ZERO-WAIT AUTH", "JWT CLAIMS SYNC", "MULTI-TENANT RBAC"],
  },
  {
    id: 4,
    name: "1Hz Ring Buffer Store",
    badge: "LAYER 04 // COUNTERFACTUAL DATA",
    caption: "Type-safe Drizzle ORM counterfactual logs comparing saved vs crashed execution paths.",
    color: "#10b981",
    accentBorder: "border-[#10b981]",
    accentBg: "bg-[#10b981]/10",
    tech: "Drizzle ORM + Supabase",
    telemetry: "AWS POOLER 6543",
    metric: "P99 < 12MS",
    bigTitle1: "RING BUFFER",
    bigTitle2: "DATA STORE",
    bigTech1: "DRIZZLE ORM",
    bigTech2: "+ SUPABASE POOLER",
    implementationDetail: "Type-safe relational schema mapped directly to Supabase PostgreSQL over low-overhead AWS pooling on port 6543.",
    highlights: ["SUB-12MS P99", "SAVED VS CRASHED LOGS", "AWS POOLER 6543"],
  },
  {
    id: 5,
    name: "Active Mitigation Bus",
    badge: "LAYER 05 // FAILOVER BUS",
    caption: "16-node active mitigation bus executing 3-key pool sheds and breaker trip mutations.",
    color: "#f59e0b",
    accentBorder: "border-[#f59e0b]",
    accentBg: "bg-[#f59e0b]/10",
    tech: "Upstash Redis Cluster",
    telemetry: "12 NODE CHANNELS",
    metric: "10K REQ/SEC",
    bigTitle1: "ACTIVE MITIGATION",
    bigTitle2: "FAILOVER BUS",
    bigTech1: "UPSTASH REDIS",
    bigTech2: "16-NODE CLUSTER",
    implementationDetail: "Serverless REST cache pipeline delivering 10,000 req/sec with automated 3-key circuit breaker failover.",
    highlights: ["10K REQ/SEC", "3-KEY POOL SHED", "SUB-MS TELEMETRY"],
  },
  {
    id: 6,
    name: "OpenRouter Reflex AI Engine",
    badge: "LAYER 06 // SYSTEM-1 AI REFLEX",
    caption: "Sub-350ms root cause analysis fusing Mercury fast reflex and LFM deep reasoning.",
    color: "#ff8539",
    accentBorder: "border-[#ff8539]",
    accentBg: "bg-[#ff8539]/10",
    tech: "OpenRouter Dual-Model Reflex",
    telemetry: "MERCURY + LFM-2.5",
    metric: "< 350MS RCA",
    bigTitle1: "SYSTEM-1",
    bigTitle2: "REFLEX AI ENGINE",
    bigTech1: "OPENROUTER",
    bigTech2: "DUAL-MODEL REFLEX",
    implementationDetail: "Dual-model intelligence executing inception/mercury-decide (<350ms) with liquid/lfm-2.5-2.6b deep reasoning and dynamic BYOK key injection.",
    highlights: ["<350MS RCA", "DUAL-MODEL ENSEMBLE", "BYOK KEY INJECTION"],
  },
];

interface ExplodedChoreographyLayersProps {
  explosionProgress: MotionValue<number>;
  activeLayerId: number | null;
  onHoverLayer: (id: number | null) => void;
  onOpenPlayground?: () => void;
  aiGlowOpacity?: MotionValue<number>;
  className?: string;
}

export function ExplodedChoreographyLayers({
  explosionProgress,
  activeLayerId,
  onHoverLayer,
  onOpenPlayground,
  aiGlowOpacity,
  className = "",
}: ExplodedChoreographyLayersProps) {
  // Continuous 120 FPS scroll-driven elevation for each slice along local Z and Y axes
  // When explosionProgress is 0: all layers collapse into a single solid phone
  // When explosionProgress goes 0 -> 1: layers float upward and outward in 3D space
  const layer1Z = useTransform(explosionProgress, [0, 1], [0, 320]);
  const layer1Y = useTransform(explosionProgress, [0, 1], [0, -110]);

  const layer2Z = useTransform(explosionProgress, [0, 1], [-2, 256]);
  const layer2Y = useTransform(explosionProgress, [0, 1], [0, -88]);

  const layer3Z = useTransform(explosionProgress, [0, 1], [-4, 192]);
  const layer3Y = useTransform(explosionProgress, [0, 1], [0, -66]);

  const layer4Z = useTransform(explosionProgress, [0, 1], [-6, 128]);
  const layer4Y = useTransform(explosionProgress, [0, 1], [0, -44]);

  const layer5Z = useTransform(explosionProgress, [0, 1], [-8, 64]);
  const layer5Y = useTransform(explosionProgress, [0, 1], [0, -22]);

  const layer6Z = useTransform(explosionProgress, [0, 1], [-10, 0]);
  const layer6Y = useTransform(explosionProgress, [0, 1], [0, 0]);

  // Inner layers (2 to 5) fade in smoothly as separation begins, preventing any z-fighting when collapsed
  const innerLayersOpacity = useTransform(explosionProgress, [0.0, 0.12], [0, 1]);

  return (
    <div
      className={`relative w-[270px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[510px] sm:h-[535px] md:h-[555px] lg:h-[570px] select-none ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ========================================================================= */}
      {/* LAYER 06: OPENROUTER REFLEX AI ENGINE (BASE / AI SUBSTRATE ANCHOR) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer6Z,
          y: layer6Y,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(6)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2.5px] bg-gradient-to-b from-[#2a170d] via-[#1a0f08] to-[#0d0704] shadow-[0_25px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,133,57,0.4)] transition-all duration-300 cursor-pointer ${
          activeLayerId === 6
            ? "ring-2 ring-[#ff8539] shadow-[0_0_40px_rgba(255,133,57,0.55)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full rounded-[41px] sm:rounded-[45px] lg:rounded-[49px] bg-[#0c0908] p-5 flex flex-col justify-between overflow-hidden border border-[#ff8539]/25">
          {/* Subtle neural synaptic glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,133,57,0.15),transparent_70%)] pointer-events-none" />

          {/* Layer Header */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-[#ff8539]">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3 text-[#ff8539] animate-pulse" />
              LAYER 06 // REFLEX AI
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#ff8539]/20 border border-[#ff8539]/40 text-[7px] sm:text-[7.5px]">
              OPENROUTER GATEWAY
            </span>
          </div>

          {/* Dual AI Neural Core Substrate (Mercury + LFM) */}
          <div className="relative my-2 p-3 rounded-2xl bg-black/75 border border-[#ff8539]/25 space-y-2.5">
            {/* Core Alpha: Mercury-Decide */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#1c1109] border border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div className="font-mono text-[8px] font-bold text-[#ffedd6]">MERCURY-DECIDE</div>
              </div>
              <span className="font-mono text-[7px] text-emerald-400 font-bold">&lt; 350MS RCA</span>
            </div>

            {/* Core Beta: Liquid LFM-2.5 */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#1c1109] border border-[#ff8539]/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff8539]" />
                <div className="font-mono text-[8px] font-bold text-[#ffedd6]">LFM-2.5-2.6B</div>
              </div>
              <span className="font-mono text-[7px] text-[#ff8539] font-bold">DEEP AUDIT</span>
            </div>
          </div>

          {/* Laser Engraved Specs Center */}
          <div className="text-center font-mono space-y-1">
            <div className="text-[8.5px] sm:text-[9px] text-[#ff8539] font-bold tracking-widest uppercase">
              OPENROUTER DUAL-MODEL REFLEX
            </div>
            <div className="text-[7px] sm:text-[7.5px] text-[#94a3b8] tracking-wider">
              FAST-REFLEX INFERENCE // DYNAMIC BYOK KEYS
            </div>
          </div>

          {/* Bottom CAD Dimension Caliper */}
          <div className="flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] text-[#94a3b8]/70 border-t border-[#ff8539]/20 pt-2">
            <span>ENGINE: MERCURY + LFM</span>
            <span className="text-[#ffedd6]">LATENCY &lt; 350MS</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 05: GLOBAL MEMORY CACHE (UPSTASH REDIS) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer5Z,
          y: layer5Y,
          opacity: innerLayersOpacity,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(5)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2px] bg-gradient-to-br from-amber-500/50 via-amber-900/30 to-black/80 backdrop-blur-md transition-all duration-300 cursor-pointer ${
          activeLayerId === 5
            ? "ring-2 ring-[#f59e0b] shadow-[0_0_40px_rgba(245,158,11,0.5)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full rounded-[41px] sm:rounded-[45px] lg:rounded-[49px] bg-[#17120c]/90 p-4 sm:p-5 flex flex-col justify-between border border-amber-500/30">
          {/* Layer Header */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-amber-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Zap className="w-3 h-3 text-[#f59e0b]" />
              LAYER 05 // MEMORY CACHE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[7px] sm:text-[7.5px]">
              UPSTASH REDIS
            </span>
          </div>

          {/* Distributed 16-Node Cluster Dot Matrix */}
          <div className="py-2">
            <div className="text-[7.5px] sm:text-[8px] font-mono text-[#94a3b8] mb-1.5 sm:mb-2">
              EDGE MEMORY NODES [16/16 SYNCED]:
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-amber-500/20">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/30 border border-amber-400/60 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#f59e0b] animate-ping" />
                  </span>
                  <span className="text-[6px] sm:text-[6.5px] font-mono text-amber-200/80">
                    N{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] text-[#94a3b8] border-t border-amber-500/20 pt-2">
            <span>LATENCY: 0.8MS</span>
            <span className="text-amber-400 font-bold">10,000 REQ/SEC</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 04: POLYMORPHIC DATA ENGINE (DRIZZLE ORM & POSTGRES) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer4Z,
          y: layer4Y,
          opacity: innerLayersOpacity,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(4)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2px] bg-gradient-to-br from-emerald-500/50 via-emerald-950/40 to-black/80 backdrop-blur-md transition-all duration-300 cursor-pointer ${
          activeLayerId === 4
            ? "ring-2 ring-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.5)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full rounded-[41px] sm:rounded-[45px] lg:rounded-[49px] bg-[#0b1713]/90 p-4 sm:p-5 flex flex-col justify-between border border-emerald-500/30">
          {/* Layer Header */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-emerald-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Database className="w-3 h-3 text-emerald-400" />
              LAYER 04 // DATA ENGINE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[7px] sm:text-[7.5px]">
              DRIZZLE + SUPABASE
            </span>
          </div>

          {/* Interactive Schema Diagram preview */}
          <div className="space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-emerald-500/20 font-mono text-[7px] sm:text-[7.5px]">
            <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-emerald-500/20 pb-1">
              <span>TABLE: problem_signals</span>
              <span>UUID PK</span>
            </div>
            <div className="text-[#94a3b8] space-y-0.5">
              <div>+ track_id: varchar(32)</div>
              <div>+ latency_p99: integer (12ms)</div>
              <div>+ urgency_score: float (0.94)</div>
              <div>+ metadata: jsonb (Sunday ready)</div>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] text-[#94a3b8] border-t border-emerald-500/20 pt-2">
            <span>AWS PORT: 6543</span>
            <span className="text-emerald-400 font-bold">P99 &lt; 12MS</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 03: EDGE SECURITY PERIMETER (CLERK AUTH SHIELD) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer3Z,
          y: layer3Y,
          opacity: innerLayersOpacity,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(3)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2px] bg-gradient-to-br from-purple-500/50 via-purple-950/40 to-black/80 backdrop-blur-md transition-all duration-300 cursor-pointer ${
          activeLayerId === 3
            ? "ring-2 ring-[#a855f7] shadow-[0_0_40px_rgba(168,85,247,0.5)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full rounded-[41px] sm:rounded-[45px] lg:rounded-[49px] bg-[#130f21]/90 p-4 sm:p-5 flex flex-col justify-between border border-purple-500/30">
          {/* Layer Header */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-purple-400">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              LAYER 03 // SECURITY SHIELD
            </span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-[7px] sm:text-[7.5px]">
              CLERK EDGE AUTH
            </span>
          </div>

          {/* Biometric Fingerprint Graphic */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-purple-500/40 flex items-center justify-center relative">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-purple-400/60 flex items-center justify-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/30 border border-purple-300 animate-pulse" />
              </div>
            </div>
            <span className="font-mono text-[7px] sm:text-[7.5px] text-purple-300 tracking-wider">
              BIOMETRIC EDGE PERIMETER
            </span>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] text-[#94a3b8] border-t border-purple-500/20 pt-2">
            <span>TLS 1.3 // ZERO FRICTION</span>
            <span className="text-purple-400 font-bold">EDGE VERIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 02: SPATIAL WEBGL PIPELINE & SHADERS (CAD WIREFRAME) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer2Z,
          y: layer2Y,
          opacity: innerLayersOpacity,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(2)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2px] bg-gradient-to-br from-sky-400/50 via-sky-950/40 to-black/80 backdrop-blur-md transition-all duration-300 cursor-pointer ${
          activeLayerId === 2
            ? "ring-2 ring-[#38bdf8] shadow-[0_0_40px_rgba(56,189,248,0.5)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full rounded-[41px] sm:rounded-[45px] lg:rounded-[49px] bg-[#0c1624]/90 p-4 sm:p-5 flex flex-col justify-between border border-sky-400/30">
          {/* Layer Header */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-sky-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Cpu className="w-3 h-3 text-sky-400" />
              LAYER 02 // GRAPHICS ENGINE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 text-[7px] sm:text-[7.5px]">
              THREE.JS + DRACO
            </span>
          </div>

          {/* CAD 3D Wireframe Grid & Bezier Coordinates */}
          <div className="relative h-24 sm:h-28 w-full rounded-2xl bg-black/60 border border-sky-400/25 p-2 flex items-center justify-center overflow-hidden">
            {/* Coordinate grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />

            {/* 3D Coordinate calipers */}
            <div className="relative z-10 text-center font-mono space-y-1">
              <div className="text-[9px] sm:text-[10px] text-sky-300 font-bold">
                PBR CALIBRATION
              </div>
              <div className="text-[7px] sm:text-[7.5px] text-[#94a3b8]">
                [X: +0.45, Y: -0.12, Z: +2.85]
              </div>
              <div className="text-[6.5px] sm:text-[7px] text-emerald-400">
                DRACO DECOMPRESSOR // 60 FPS
              </div>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] text-[#94a3b8] border-t border-sky-400/20 pt-2">
            <span>HARDWARE ACCELERATION</span>
            <span className="text-sky-400 font-bold">60 FPS LOCKED</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 01: FRONT OLED DISPLAY (LIVE INTERACTIVE 2D REACT HUD) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          z: layer1Z,
          y: layer1Y,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => onHoverLayer(1)}
        onMouseLeave={() => onHoverLayer(null)}
        className={`absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2.5px] bg-gradient-to-b from-[#3d404d] via-[#22242d] to-[#14151a] shadow-[0_28px_65px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 cursor-pointer ${
          activeLayerId === 1
            ? "ring-2 ring-[#ffedd6] shadow-[0_0_40px_rgba(255,237,214,0.5)] scale-[1.02] opacity-100 z-10"
            : activeLayerId !== null
            ? "opacity-40 brightness-75 hover:opacity-100 hover:brightness-100"
            : "opacity-100"
        }`}
        onClick={onOpenPlayground}
      >
        {/* Subtle Metallic Specular Reflection on Bezel Rim */}
        <div
          className="absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] pointer-events-none opacity-60 z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 22%, transparent 42%, transparent 68%, rgba(255, 255, 255, 0.08) 100%)",
          }}
        />

        {/* Antenna Lines on Frame Edges */}
        <div className="absolute left-0 top-14 w-[2.5px] h-1.5 bg-[#1a1c24] -translate-x-full rounded-l-sm" />
        <div className="absolute left-0 top-20 w-[2.5px] h-6 bg-[#2b2d38] -translate-x-full rounded-l-sm" />
        <div className="absolute left-0 top-30 w-[2.5px] h-6 bg-[#2b2d38] -translate-x-full rounded-l-sm" />
        <div className="absolute right-0 top-20 w-[2.5px] h-8 bg-[#2b2d38] translate-x-full rounded-r-sm" />

        {/* Micro Bezel Ring */}
        <div
          className="w-full h-full rounded-[39px] sm:rounded-[43px] p-[6px] sm:p-[7px] bg-[#0c0d12]"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255, 255, 255, 0.07), 0 0 0 1px rgba(0, 0, 0, 0.85)",
          }}
        >
          {/* OLED Screen Surface */}
          <div
            className="relative w-full h-full rounded-[33px] sm:rounded-[37px] bg-[#07080c] overflow-hidden flex flex-col justify-between border border-white/[0.04]"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.03)",
            }}
          >
            {/* Ceramic Shield Glass Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none z-30" />
            <div className="absolute -inset-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none z-30" />

            {/* Background Subtle Dot Grid */}
            <div className="absolute inset-0 oryzo-dots opacity-20 pointer-events-none" />

            {/* Subtle Neural Ambient Edge Glow when reassembled */}
            {aiGlowOpacity && (
              <motion.div
                style={{ opacity: aiGlowOpacity }}
                className="absolute inset-0 z-30 pointer-events-none rounded-[33px] sm:rounded-[37px] shadow-[inset_0_0_28px_rgba(255,133,57,0.2)] border border-[#ff8539]/30"
              />
            )}

            {/* TOP HEADER: DYNAMIC ISLAND + STATUS BAR */}
            <div className="relative z-20 w-full pt-2.5 px-4 sm:px-5">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#ffedd6]">
                <span className="font-bold tracking-tight text-[11px] sm:text-xs">09:41</span>
                {/* Dynamic Island */}
                <div className="w-[84px] sm:w-[94px] h-[22px] sm:h-[24px] bg-black rounded-full flex items-center justify-between px-2 shadow-md border border-white/[0.08]">
                  <div className="w-2 h-2 rounded-full bg-[#0a101f] border border-blue-950/60 relative flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-[#1e293b]" />
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#111827]" />
                </div>
                {/* Status Icons */}
                <div className="flex items-center gap-1 text-[#ffedd6]">
                  <span className="text-[9px] font-bold">5G</span>
                  <Wifi className="w-3 h-3" />
                  <BatteryCharging className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
              </div>
            </div>

            {/* SCREEN MAIN BODY: CRASHLENS LIVE RADAR HUD */}
            <div className="relative z-20 px-3 sm:px-3.5 pt-1.5 sm:pt-2 pb-1 space-y-1.5 sm:space-y-2">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-mono text-[#ff8539] font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
                    RADAR // {SITE_CONFIG.brand.name} OS
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[8px] text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    LIVE RADAR
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-white/[0.06] border border-white/[0.1] mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]" />
                  <span className="font-mono text-[8.5px] font-bold text-[#ffedd6] uppercase tracking-wider">
                    TRACK: {SITE_CONFIG.problemStatement.category}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base lg:text-lg font-black font-[family-name:var(--font-display)] text-[#ffedd6] leading-tight tracking-tight drop-shadow-sm">
                  {SITE_CONFIG.problemStatement.title}
                </h2>
              </div>

              {/* Central Telemetry HUD Card */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#0f1118]/92 border border-[rgba(255,237,214,0.12)] shadow-md backdrop-blur-md space-y-1 sm:space-y-1.5">
                <div className="flex items-center justify-between text-[8px] font-mono border-b border-white/[0.06] pb-0.5">
                  <span className="text-[#94a3b8]">12-NODE TOPOLOGY ENGINE</span>
                  <span className="text-emerald-400 font-bold">45S PRE-FAILURE HORIZON</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">PREDICT</div>
                    <div className="text-[11px] font-mono font-bold text-emerald-400">45s</div>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">REFLEX</div>
                    <div className="text-[11px] font-mono font-bold text-[#38bdf8]">240ms</div>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">SURVIVAL</div>
                    <div className="text-[11px] font-mono font-bold text-[#ff8539]">100%</div>
                  </div>
                </div>

                {/* Animated Waveform */}
                <div className="w-full h-5 sm:h-6 flex items-center justify-center overflow-hidden py-0.5">
                  <svg viewBox="0 0 300 30" fill="none" className="w-full h-full text-[#38bdf8]">
                    <path
                      d="M0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15 T 250 15 T 300 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <animate
                        attributeName="d"
                        dur="3s"
                        repeatCount="indefinite"
                        values="
                          M0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15 T 250 15 T 300 15;
                          M0 15 Q 25 25, 50 15 T 100 15 T 150 15 T 200 15 T 250 15 T 300 15;
                          M0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15 T 250 15 T 300 15
                        "
                      />
                    </path>
                  </svg>
                </div>

                {/* Console Log Preview */}
                <div className="p-1.5 rounded bg-black/60 font-mono text-[8px] text-[#94a3b8] truncate">
                  <span className="text-emerald-400">✓ Anomaly Intercepted: </span>
                  <span className="text-[#ffedd6]/75">System 1 triggered pool shed on Auth (02)</span>
                </div>
              </div>

              {/* Action Button inside Screen */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPlayground?.();
                  }}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#ffedd6] hover:bg-white text-[#07080a] font-mono text-[11px] sm:text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_3px_14px_rgba(255,237,214,0.35)] transition-all cursor-pointer group"
                >
                  <span>DETONATE CHAOS SCENARIO →</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* iOS Home Indicator */}
            <div className="relative z-20 w-full pb-2 flex justify-center mt-auto">
              <div className="w-24 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ExplodedChoreographyLayers;
