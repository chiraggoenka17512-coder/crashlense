"use client";

import React from "react";
import { motion, useSpring } from "motion/react";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Wifi,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Database,
  Cpu,
  Zap,
} from "lucide-react";

export interface ExplodedDeviceStackProps {
  isExploded?: boolean;
  activeLayerId?: number | null;
  onHoverLayer?: (id: number | null) => void;
  onSelectLayer?: (id: number) => void;
  className?: string;
}

export function ExplodedDeviceStack({
  isExploded = true,
  activeLayerId = null,
  onHoverLayer,
  onSelectLayer,
  className = "",
}: ExplodedDeviceStackProps) {
  // Interactive mouse tilt for subtle spatial responsiveness
  const rotateXSpring = useSpring(52, { stiffness: 80, damping: 20 });
  const rotateYSpring = useSpring(10, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
    rotateXSpring.set(52 - yNorm * 10);
    rotateYSpring.set(10 + xNorm * 12);
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(52);
    rotateYSpring.set(10);
    onHoverLayer?.(null);
  };

  // Layer elevation offsets along Z and Y axes when exploded vs collapsed
  const getLayerTransform = (layerIndex: number) => {
    // layerIndex: 1 (Top OLED) to 6 (Bottom Titanium Chassis)
    if (!isExploded) {
      // Reassembled unified phone (1.5px physical layer separation)
      const zOffset = (6 - layerIndex) * 2;
      return {
        z: zOffset,
        y: 0,
        opacity: layerIndex === 1 || layerIndex === 6 ? 1 : 0.15,
        scale: 1,
      };
    }

    // Exploded state: vertical and depth separation
    const offsets: Record<number, { z: number; y: number }> = {
      1: { z: 170, y: -10 }, // Front OLED Screen (kept comfortably below headline)
      2: { z: 105, y: 5 },   // WebGL Spatial Pipeline
      3: { z: 45, y: 18 },   // Edge Auth Shield
      4: { z: -15, y: 30 },  // Drizzle DB Engine
      5: { z: -75, y: 42 },  // Upstash Redis Cache
      6: { z: -135, y: 54 }, // Titanium Chassis Frame
    };

    const target = offsets[layerIndex] || { z: 0, y: 0 };
    const isHovered = activeLayerId === layerIndex;

    return {
      z: isHovered ? target.z + 20 : target.z,
      y: isHovered ? target.y - 8 : target.y,
      opacity: activeLayerId && !isHovered ? 0.45 : 1,
      scale: isHovered ? 1.02 : 1,
    };
  };

  return (
    <div
      className={`relative w-full max-w-[480px] h-[560px] sm:h-[620px] flex items-center justify-center select-none cursor-pointer pt-4 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Perspective Stage Container */}
      <motion.div
        style={{
          perspective: 1400,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          rotateZ: -28,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[270px] sm:w-[300px] h-[520px] sm:h-[560px] translate-y-6 sm:translate-y-8 transition-transform duration-300"
      >
        {/* Soft Contact Shadow beneath the entire stack on the stage */}
        <div
          style={{
            transform: "translateZ(-190px) translateY(80px) scale(0.92)",
          }}
          className="absolute inset-0 bg-black/90 rounded-[56px] blur-3xl pointer-events-none transition-all duration-700"
        />

        {/* ========================================================================= */}
        {/* LAYER 06: OPENROUTER REFLEX AI ENGINE (BASE / BOTTOM) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(6)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(6)}
          onClick={() => onSelectLayer?.(6)}
          className={`absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-[#2a170d] via-[#1a0f08] to-[#0d0704] shadow-[0_25px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,133,57,0.4)] transition-colors ${
            activeLayerId === 6 ? "ring-2 ring-[#ff8539] shadow-[0_0_35px_rgba(255,133,57,0.5)]" : ""
          }`}
        >
          {/* Neural AI Substrate plate */}
          <div className="relative w-full h-full rounded-[47px] bg-[#0c0908] p-5 flex flex-col justify-between overflow-hidden border border-[#ff8539]/25">
            {/* Subtle neural synaptic sheen */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,133,57,0.15),transparent_70%)] pointer-events-none" />

            {/* Dual AI Neural Core Plateau */}
            <div className="relative w-full p-3 rounded-2xl bg-black/75 border border-[#ff8539]/25 space-y-2">
              <div className="flex items-center justify-between text-[8px] font-mono text-[#ff8539]">
                <span className="font-bold">MERCURY-DECIDE</span>
                <span className="text-emerald-400 font-bold">&lt; 350MS RCA</span>
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-[#ffedd6]">
                <span>LFM-2.5 DEEP AUDIT</span>
                <span className="text-[#ff8539]">BYOK KEY READY</span>
              </div>
            </div>

            {/* Laser Engraved Specs Center */}
            <div className="text-center font-mono space-y-1">
              <div className="text-[9px] text-[#ff8539] font-bold tracking-widest uppercase">
                OPENROUTER DUAL-MODEL REFLEX
              </div>
              <div className="text-[7.5px] text-[#94a3b8] tracking-wider">
                FAST-REFLEX INFERENCE // DYNAMIC BYOK KEYS
              </div>
            </div>

            {/* Bottom CAD Dimension Caliper */}
            <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8]/70 border-t border-[#ff8539]/20 pt-2">
              <span>ENGINE: MERCURY + LFM</span>
              <span className="text-[#ffedd6]">LATENCY &lt; 350MS</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 05: GLOBAL MEMORY CACHE (UPSTASH REDIS) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(5)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(5)}
          onClick={() => onSelectLayer?.(5)}
          className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-amber-500/50 via-amber-900/30 to-black/80 backdrop-blur-md transition-all ${
            activeLayerId === 5 ? "ring-2 ring-[#f59e0b] shadow-[0_0_35px_rgba(245,158,11,0.5)]" : ""
          }`}
        >
          <div className="relative w-full h-full rounded-[48px] bg-[#17120c]/85 p-5 flex flex-col justify-between border border-amber-500/30">
            {/* Layer Header */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-amber-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-[#f59e0b]" />
                LAYER 05 // MEMORY CACHE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[7.5px]">
                UPSTASH REDIS
              </span>
            </div>

            {/* Distributed 16-Node Cluster Dot Matrix */}
            <div className="py-2">
              <div className="text-[8px] font-mono text-[#94a3b8] mb-2">EDGE MEMORY NODES [16/16 SYNCED]:</div>
              <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-black/50 border border-amber-500/20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/30 border border-amber-400/60 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-[#f59e0b] animate-ping" />
                    </span>
                    <span className="text-[6.5px] font-mono text-amber-200/80">N{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-amber-500/20 pt-2">
              <span>LATENCY: 0.8MS</span>
              <span className="text-amber-400 font-bold">10,000 REQ/SEC</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 04: POLYMORPHIC DATA ENGINE (DRIZZLE ORM & POSTGRES) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(4)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(4)}
          onClick={() => onSelectLayer?.(4)}
          className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-emerald-500/50 via-emerald-950/40 to-black/80 backdrop-blur-md transition-all ${
            activeLayerId === 4 ? "ring-2 ring-[#10b981] shadow-[0_0_35px_rgba(16,185,129,0.5)]" : ""
          }`}
        >
          <div className="relative w-full h-full rounded-[48px] bg-[#0b1713]/85 p-5 flex flex-col justify-between border border-emerald-500/30">
            {/* Layer Header */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Database className="w-3 h-3 text-emerald-400" />
                LAYER 04 // DATA ENGINE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[7.5px]">
                DRIZZLE + SUPABASE
              </span>
            </div>

            {/* Interactive Schema Diagram preview */}
            <div className="space-y-2 p-3 rounded-2xl bg-black/50 border border-emerald-500/20 font-mono text-[7.5px]">
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
            <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-emerald-500/20 pt-2">
              <span>AWS PORT: 6543</span>
              <span className="text-emerald-400 font-bold">P99 &lt; 12MS</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 03: EDGE SECURITY PERIMETER (CLERK AUTH SHIELD) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(3)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(3)}
          onClick={() => onSelectLayer?.(3)}
          className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-purple-500/50 via-purple-950/40 to-black/80 backdrop-blur-md transition-all ${
            activeLayerId === 3 ? "ring-2 ring-[#a855f7] shadow-[0_0_35px_rgba(168,85,247,0.5)]" : ""
          }`}
        >
          <div className="relative w-full h-full rounded-[48px] bg-[#130f21]/85 p-5 flex flex-col justify-between border border-purple-500/30">
            {/* Layer Header */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-purple-400">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3 h-3 text-purple-400" />
                LAYER 03 // SECURITY SHIELD
              </span>
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-[7.5px]">
                CLERK EDGE AUTH
              </span>
            </div>

            {/* Biometric Fingerprint Graphic */}
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <div className="w-16 h-16 rounded-full border border-purple-500/40 flex items-center justify-center relative">
                <div className="w-11 h-11 rounded-full border border-purple-400/60 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-300 animate-pulse" />
                </div>
              </div>
              <span className="font-mono text-[7.5px] text-purple-300 tracking-wider">
                BIOMETRIC EDGE PERIMETER
              </span>
            </div>

            {/* Telemetry Footer */}
            <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-purple-500/20 pt-2">
              <span>TLS 1.3 // ZERO FRICTION</span>
              <span className="text-purple-400 font-bold">EDGE VERIFIED</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 02: SPATIAL WEBGL PIPELINE & SHADERS (CAD WIREFRAME) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(2)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(2)}
          onClick={() => onSelectLayer?.(2)}
          className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-sky-400/50 via-sky-950/40 to-black/80 backdrop-blur-md transition-all ${
            activeLayerId === 2 ? "ring-2 ring-[#38bdf8] shadow-[0_0_35px_rgba(56,189,248,0.5)]" : ""
          }`}
        >
          <div className="relative w-full h-full rounded-[48px] bg-[#0c1624]/85 p-5 flex flex-col justify-between border border-sky-400/30">
            {/* Layer Header */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-sky-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Cpu className="w-3 h-3 text-sky-400" />
                LAYER 02 // GRAPHICS ENGINE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 text-[7.5px]">
                THREE.JS + DRACO
              </span>
            </div>

            {/* CAD 3D Wireframe Grid & Bezier Coordinates */}
            <div className="relative h-28 w-full rounded-2xl bg-black/60 border border-sky-400/25 p-2 flex items-center justify-center overflow-hidden">
              {/* Coordinate grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* 3D Coordinate calipters */}
              <div className="relative z-10 text-center font-mono space-y-1">
                <div className="text-[10px] text-sky-300 font-bold">PBR CALIBRATION</div>
                <div className="text-[7.5px] text-[#94a3b8]">[X: +0.45, Y: -0.12, Z: +2.85]</div>
                <div className="text-[7px] text-emerald-400">DRACO DECOMPRESSOR // 60 FPS</div>
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-sky-400/20 pt-2">
              <span>HARDWARE ACCELERATION</span>
              <span className="text-sky-400 font-bold">60 FPS LOCKED</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 01: FRONT OLED DISPLAY (LIVE 2D REACT COMPONENT) */}
        {/* ========================================================================= */}
        <motion.div
          animate={getLayerTransform(1)}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => onHoverLayer?.(1)}
          onClick={() => onSelectLayer?.(1)}
          className={`absolute inset-0 rounded-[50px] p-[2.5px] bg-gradient-to-b from-[#404352] via-[#22242d] to-[#121319] shadow-[0_28px_60px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.45)] transition-all ${
            activeLayerId === 1 ? "ring-2 ring-[#ffedd6] shadow-[0_0_35px_rgba(255,237,214,0.5)]" : ""
          }`}
        >
          {/* Micro Bezel Ring */}
          <div className="w-full h-full rounded-[47px] p-[6px] bg-[#0c0d12]">
            {/* Live OLED Screen Surface */}
            <div className="relative w-full h-full rounded-[41px] bg-[#07080c] overflow-hidden flex flex-col justify-between border border-white/[0.06] p-3.5">
              {/* Dynamic Island + Status Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-[#ffedd6] pt-1">
                <span className="font-bold text-[10px]">09:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-20 h-5 bg-black rounded-full flex items-center justify-between px-2 border border-white/[0.1]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a101f] border border-blue-900" />
                  <div className="w-1 h-1 rounded-full bg-[#111827]" />
                </div>
                <div className="flex items-center gap-1 text-[9px]">
                  <span>5G</span>
                  <Wifi className="w-2.5 h-2.5" />
                  <BatteryCharging className="w-3 h-3 text-[#10b981]" />
                </div>
              </div>

              {/* Live App Title & Badge */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[7.5px] font-mono text-[#ff8539] font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
                    APP // {SITE_CONFIG.brand.name} OS
                  </span>
                  <span className="font-mono text-[7px] text-emerald-400 font-bold">
                    LIVE OLED
                  </span>
                </div>
                <h4 className="text-[12px] font-black font-[family-name:var(--font-display)] text-[#ffedd6] leading-tight">
                  {SITE_CONFIG.problemStatement.title}
                </h4>
              </div>

              {/* Live Telemetry Card */}
              <div className="p-2 rounded-xl bg-[#0f1118]/95 border border-[rgba(255,237,214,0.12)] space-y-1">
                <div className="flex items-center justify-between text-[7px] font-mono text-[#94a3b8]">
                  <span>TELEMETRY HUD</span>
                  <span className="text-emerald-400 font-bold">12MS P99</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center font-mono">
                  <div className="p-1 rounded bg-black/50 border border-white/5">
                    <div className="text-[6.5px] text-[#94a3b8]">PING</div>
                    <div className="text-[9px] font-bold text-emerald-400">12ms</div>
                  </div>
                  <div className="p-1 rounded bg-black/50 border border-white/5">
                    <div className="text-[6.5px] text-[#94a3b8]">CACHE</div>
                    <div className="text-[9px] font-bold text-[#38bdf8]">99.4%</div>
                  </div>
                  <div className="p-1 rounded bg-black/50 border border-white/5">
                    <div className="text-[6.5px] text-[#94a3b8]">POOL</div>
                    <div className="text-[9px] font-bold text-[#ff8539]">LIVE</div>
                  </div>
                </div>

                {/* Animated Waveform */}
                <div className="h-4 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 300 30" fill="none" className="w-full h-full text-[#38bdf8]">
                    <path
                      d="M0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15 T 250 15 T 300 15"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <animate
                        attributeName="d"
                        dur="2.5s"
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
              </div>

              {/* Action Button inside Live Screen */}
              <div className="py-1">
                <div className="w-full py-1.5 px-2 rounded-lg bg-[#ffedd6] text-[#07080a] font-mono text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                  <span>RESOLVE STATEMENT</span>
                  <ArrowRight className="w-3 h-3 text-[#07080a]" />
                </div>
              </div>

              {/* iOS Home Indicator */}
              <div className="flex justify-center pb-1">
                <div className="w-16 h-0.5 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ExplodedDeviceStack;
