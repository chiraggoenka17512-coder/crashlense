"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { CuttingMat } from "@/components/oryzo/CuttingMat";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Wifi,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Database,
  Cpu,
  Zap,
  Play,
} from "lucide-react";

export interface StackLayer {
  id: number;
  name: string;
  badge: string;
  caption: string;
  color: string;
  tech: string;
  telemetry: string;
  metric: string;
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 1,
    name: "Front OLED Display",
    badge: "LAYER 01 // UI ENGINE",
    caption: "Fluid, responsive interfaces running at 60fps.",
    color: "#ffedd6",
    tech: "Next.js 16 + React 19",
    telemetry: "60 FPS VECTOR HUD",
    metric: "12MS P99",
  },
  {
    id: 2,
    name: "Spatial WebGL Pipeline",
    badge: "LAYER 02 // GRAPHICS",
    caption: "Real-time 3D spatial hardware graphics acceleration.",
    color: "#38bdf8",
    tech: "Three.js + Draco GLTF",
    telemetry: "DRACO DECOMPRESSOR",
    metric: "60 FPS PBR",
  },
  {
    id: 3,
    name: "Edge Security Perimeter",
    badge: "LAYER 03 // AUTH",
    caption: "Instant biometric edge authentication with zero friction.",
    color: "#a855f7",
    tech: "Clerk Edge Auth + TLS 1.3",
    telemetry: "JWT CLAIMS SYNC",
    metric: "EDGE ZERO-WAIT",
  },
  {
    id: 4,
    name: "Polymorphic Data Engine",
    badge: "LAYER 04 // DATABASE",
    caption: "Lightning-fast database queries executing under 12ms.",
    color: "#10b981",
    tech: "Drizzle ORM + Supabase",
    telemetry: "AWS POOLER 6543",
    metric: "P99 < 12MS",
  },
  {
    id: 5,
    name: "Global Memory Cache",
    badge: "LAYER 05 // CACHE",
    caption: "Worldwide instant memory caching with zero cold-starts.",
    color: "#f59e0b",
    tech: "Upstash Redis Rate-Limiter",
    telemetry: "16 SYNCED NODES",
    metric: "10K REQ/SEC",
  },
  {
    id: 6,
    name: "Reflex AI Decision Engine",
    badge: "LAYER 06 // REFLEX AI",
    caption: "Sub-350ms root-cause intelligence fusing Mercury and LFM.",
    color: "#ff8539",
    tech: "OpenRouter Dual-Model Reflex",
    telemetry: "MERCURY + LFM-2.5",
    metric: "< 350MS RCA",
  },
];

interface OryzoHeroToStackChoreographyProps {
  onTryItNow?: () => void;
  onSignIn?: () => void;
  onScrollToStage3?: () => void;
}

export function OryzoHeroToStackChoreography({
  onTryItNow,
  onScrollToStage3,
}: OryzoHeroToStackChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState("09:41");
  const [manualOverrideLayer, setManualOverrideLayer] = useState<number | null>(null);

  // Time updater for live status bar
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  // Native scroll progress through this choreography container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active layer as user scrolls down through the explosion
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (manualOverrideLayer !== null) return;
    if (latest < 0.28) {
      setActiveLayer(1);
    } else if (latest < 0.38) {
      setActiveLayer(1);
    } else if (latest < 0.48) {
      setActiveLayer(2);
    } else if (latest < 0.58) {
      setActiveLayer(3);
    } else if (latest < 0.68) {
      setActiveLayer(4);
    } else if (latest < 0.78) {
      setActiveLayer(5);
    } else {
      setActiveLayer(6);
    }
  });

  const effectiveActiveLayer = manualOverrideLayer !== null ? manualOverrideLayer : activeLayer;
  const currentLayerData = STACK_LAYERS.find((l) => l.id === effectiveActiveLayer) || STACK_LAYERS[0];

  // =========================================================================
  // SCROLL-LINKED CHOREOGRAPHY TRANSFORMS
  // =========================================================================
  // 1. Desk background (tabletop, green mat, stationery) fades to pitch noir: [0, 0.18]
  const deskOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const deskScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.05]);

  // 2. Hero Headline & Corner Cards fade out & glide up: [0, 0.14]
  const heroUiOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0]);
  const heroUiY = useTransform(scrollYProgress, [0, 0.13], [0, -50]);

  // 3. Stage 2 Section Header & Exploded HUD fade in: [0.18, 0.26]
  const stage2HeaderOpacity = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const stage2HeaderY = useTransform(scrollYProgress, [0.18, 0.26], [30, 0]);

  // 4. Phone physical liftoff & horizontal laydown: [0, 0.22]
  // From bottom-dock peek (translateY: 34%) to centered (translateY: 0%)
  const phoneLiftY = useTransform(scrollYProgress, [0, 0.22], ["34%", "0%"]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.05]);

  // Phone 3D tilt: upright (0, 0, 0) -> lays flat horizontally isometrically (52deg, -28deg, 10deg)
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.22], [0, 52]);
  const phoneRotateZ = useTransform(scrollYProgress, [0, 0.22], [0, -28]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.22], [0, 10]);

  // 5. Layer explosion progress along Z-axis: [0.22, 0.35] (0 = collapsed, 1 = fully exploded)
  const layerExplosionProgress = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);

  // Precomputed dynamic transforms for the 6 layers (React hook rules compliant)
  const layer1Z = useTransform(layerExplosionProgress, [0, 1], [10, 170]);
  const layer1Y = useTransform(layerExplosionProgress, [0, 1], [0, -12]);

  const layer2Z = useTransform(layerExplosionProgress, [0, 1], [8, 105]);
  const layer2Y = useTransform(layerExplosionProgress, [0, 1], [0, 4]);

  const layer3Z = useTransform(layerExplosionProgress, [0, 1], [6, 45]);
  const layer3Y = useTransform(layerExplosionProgress, [0, 1], [0, 16]);

  const layer4Z = useTransform(layerExplosionProgress, [0, 1], [4, -15]);
  const layer4Y = useTransform(layerExplosionProgress, [0, 1], [0, 28]);

  const layer5Z = useTransform(layerExplosionProgress, [0, 1], [2, -75]);
  const layer5Y = useTransform(layerExplosionProgress, [0, 1], [0, 40]);

  const layer6Z = useTransform(layerExplosionProgress, [0, 1], [0, -135]);
  const layer6Y = useTransform(layerExplosionProgress, [0, 1], [0, 52]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480vh] bg-[#07080a] select-none"
    >
      {/* STICKY FULL-SCREEN STAGE LOCK */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between border-b border-[rgba(255,237,214,0.08)]">
        {/* ========================================================================= */}
        {/* 1. SEPARATE BACKGROUND LAYER: JAPANESE OAK TABLETOP + CUTTING MAT */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: deskOpacity, scale: deskScale }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Oak Tabletop Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/oak_tabletop_clean.jpg')",
              filter: "brightness(0.92) contrast(1.06) saturate(1.04)",
            }}
          />

          {/* Natural Sunlight Beam Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(255, 235, 205, 0.16) 0%, rgba(255, 215, 170, 0.05) 50%, transparent 100%)",
            }}
          />

          {/* The Self-Healing Green Cutting Mat Surface */}
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-10 pointer-events-none">
            <CuttingMat className="w-full max-w-6xl h-[86vh] max-h-[820px] transition-transform duration-700" />
          </div>

          {/* Tactile Props (Eraser, Clips, Pencil, Pen, Knife) */}
          <div className="absolute left-6 sm:left-14 top-28 sm:top-36 w-20 sm:w-28 h-12 sm:h-16 pointer-events-none">
            <Image
              src="/images/eraser_block_cozy.png"
              alt="Eraser"
              width={274}
              height={156}
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
            />
          </div>
          <div className="absolute left-10 sm:left-24 bottom-32 sm:bottom-40 w-16 sm:w-24 h-12 sm:h-16 pointer-events-none">
            <Image
              src="/images/paper_clips_cozy.png"
              alt="Paper Clips"
              width={268}
              height={178}
              className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)]"
            />
          </div>
          <div className="absolute left-2 sm:left-8 bottom-16 sm:bottom-20 w-44 sm:w-60 h-10 sm:h-14 pointer-events-none">
            <Image
              src="/images/wood_pencil_cozy.png"
              alt="Wood Pencil"
              width={612}
              height={142}
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
            />
          </div>
          <div className="absolute right-4 sm:right-12 top-28 sm:top-36 w-44 sm:w-64 h-12 sm:h-16 pointer-events-none">
            <Image
              src="/images/drafting_pen_cozy.png"
              alt="Drafting Pen"
              width={640}
              height={160}
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
            />
          </div>
          <div className="absolute right-4 sm:right-12 bottom-14 sm:bottom-18 w-44 sm:w-56 h-20 sm:h-26 pointer-events-none">
            <Image
              src="/images/olfa_knife_cozy.png"
              alt="Olfa Knife"
              width={844}
              height={245}
              className="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.75)]"
            />
          </div>
        </motion.div>

        {/* Pitch Black Stage Backdrop with Dot Matrix (Takes over as desk fades) */}
        <div className="absolute inset-0 bg-[#07080a] -z-10 pointer-events-none">
          <div className="absolute inset-0 oryzo-dots opacity-25" />
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO BRAND HEADLINE & CORNER CARDS (STAGE 1 VIEW) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: heroUiOpacity, y: heroUiY }}
          className="relative z-30 w-full px-6 sm:px-12 pt-24 sm:pt-28 pointer-events-none"
        >
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ffedd6] inline-block shadow-[0_0_8px_rgba(255,237,214,0.6)]" />
            <span className="w-4 h-[2px] bg-[#ffedd6]/70 rounded-full inline-block" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ffedd6]/90">
              {SITE_CONFIG.brand.eyebrow}
            </span>
          </div>

          {/* Giant Display Title: ORCATHON */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[98px] font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.86] text-[#ffedd6] drop-shadow-[0_4px_28px_rgba(0,0,0,0.8)]">
            {SITE_CONFIG.brand.name}
          </h1>

          {/* Bottom-Left Frosted Glass Card */}
          <div className="absolute left-6 sm:left-12 top-[60vh] hidden md:block max-w-[260px] p-4 rounded-2xl bg-[#1d1915]/85 backdrop-blur-xl border border-[rgba(255,237,214,0.16)] shadow-2xl text-[#f4efe6]">
            <h3 className="font-[family-name:var(--font-display)] font-black text-xs uppercase leading-snug text-[#ffedd6] mb-1.5">
              CRASHLENS // RADAR OS,<br />PREDICTIVE CHAOS SANDBOX.
            </h3>
            <div className="w-full border-b border-dotted border-[rgba(255,237,214,0.25)] my-1.5" />
            <p className="font-mono text-[10px] text-[#94a3b8] leading-relaxed">
              Predicting catastrophic distributed microservice cascades 45s before SLAs breach.
            </p>
          </div>

          {/* Bottom-Right Editorial Copy & CTA */}
          <div className="absolute right-6 sm:right-12 top-[60vh] hidden lg:flex flex-col items-end gap-2 max-w-[270px] text-right">
            <p className="font-sans text-[11px] text-[#ffedd6] font-medium leading-relaxed drop-shadow-md">
              Sub-350ms root cause diagnosis via System 1 Reflex Inception. Zero panic, pre-failure interception.
            </p>
            <button
              onClick={onTryItNow}
              className="flex items-center gap-2 p-1.5 pr-3 bg-[#0d0f17]/92 hover:bg-[#151926] border border-[#ff8539]/40 hover:border-[#ff8539] rounded-2xl shadow-lg cursor-pointer transition-all group pointer-events-auto"
            >
              <div className="w-6 h-6 rounded-xl bg-[#ff8539]/20 border border-[#ff8539]/40 flex items-center justify-center text-[#ff8539] group-hover:scale-105 transition-transform">
                <Play className="w-2.5 h-2.5 fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-[#ff8539] font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  CRASHLENS RADAR
                </span>
                <span className="font-[family-name:var(--font-display)] font-bold text-[10.5px] text-[#f4efe6]">
                  Launch Failure Playground →
                </span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. STAGE 2 HEADER & EXPLANATION PANEL (REVEALED ON SCROLL) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: stage2HeaderOpacity, y: stage2HeaderY }}
          className="absolute top-16 sm:top-20 left-0 right-0 z-30 px-6 sm:px-12 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(255,237,214,0.08)] pb-4 gap-4">
            <div>
              <div className="oryzo-caliper mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span>STAGE 02 // 3D EXPLODED ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] tracking-tight">
                Engineered By Hand. Assembled By AI.
              </h2>
            </div>

            {/* Axial Caliper Indicator */}
            <div className="flex items-center gap-3 font-mono text-[10.5px] text-[#94a3b8] pointer-events-auto">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#141722] border border-white/10 text-[#ffedd6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-ping" />
                <span>ACTIVE LAYER: [{effectiveActiveLayer} / 6]</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. CHOREOGRAPHED 3D DEVICE CENTERPIECE & LAYER EXPLOSION */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center px-4">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
            {/* Left/Center Area: The Phone Lifting & Exploding (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative h-full">
              {/* Animated Phone Stage Container */}
              <motion.div
                style={{
                  y: phoneLiftY,
                  scale: phoneScale,
                }}
                className="relative w-full max-w-[480px] h-[540px] sm:h-[600px] flex items-center justify-center"
              >
                {/* 3D Perspective Container with Dynamic Laydown Rotation */}
                <motion.div
                  style={{
                    perspective: 1400,
                    rotateX: phoneRotateX,
                    rotateY: phoneRotateY,
                    rotateZ: phoneRotateZ,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative w-[270px] sm:w-[300px] h-[520px] sm:h-[560px] transition-transform duration-200"
                >
                  {/* Soft Dynamic Contact Shadow */}
                  <motion.div
                    style={{
                      transform: "translateZ(-180px) translateY(70px) scale(0.92)",
                    }}
                    className="absolute inset-0 bg-black/90 rounded-[56px] blur-3xl pointer-events-none"
                  />

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 06: OPENROUTER REFLEX AI ENGINE (BASE / BOTTOM) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer6Z,
                      y: layer6Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(6)}
                    className={`absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-[#2a170d] via-[#1a0f08] to-[#0d0704] shadow-2xl transition-all cursor-pointer ${
                      effectiveActiveLayer === 6
                        ? "ring-2 ring-[#ff8539] shadow-[0_0_35px_rgba(255,133,57,0.5)] opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-[47px] bg-[#0c0908] p-5 flex flex-col justify-between overflow-hidden border border-[#ff8539]/25">
                      {/* Dual AI Neural Core Plateau */}
                      <div className="relative w-full p-2.5 rounded-2xl bg-black/75 border border-[#ff8539]/25 space-y-1.5">
                        <div className="flex items-center justify-between text-[7.5px] font-mono text-[#ff8539]">
                          <span className="font-bold">MERCURY-DECIDE</span>
                          <span className="text-emerald-400 font-bold">&lt; 350MS RCA</span>
                        </div>
                        <div className="flex items-center justify-between text-[7.5px] font-mono text-[#ffedd6]">
                          <span>LFM-2.5 DEEP AUDIT</span>
                          <span className="text-[#ff8539]">BYOK KEY READY</span>
                        </div>
                      </div>

                      <div className="text-center font-mono space-y-1">
                        <div className="text-[9px] text-[#ff8539] font-bold tracking-widest uppercase">
                          OPENROUTER DUAL-MODEL REFLEX
                        </div>
                        <div className="text-[7.5px] text-[#94a3b8]">
                          SUB-350MS INCIDENT ROOT CAUSE PREDICTION
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-[#ff8539]/20 pt-2">
                        <span>MODEL: MERCURY+LFM</span>
                        <span className="text-[#ffedd6]">LATENCY &lt; 350MS</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 05: GLOBAL MEMORY CACHE (UPSTASH REDIS) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer5Z,
                      y: layer5Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(5)}
                    className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-amber-500/50 via-amber-950/40 to-black/80 backdrop-blur-md transition-all cursor-pointer ${
                      effectiveActiveLayer === 5
                        ? "ring-2 ring-[#f59e0b] shadow-[0_0_35px_rgba(245,158,11,0.5)] opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-[48px] bg-[#17120c]/85 p-5 flex flex-col justify-between border border-amber-500/30">
                      <div className="flex items-center justify-between text-[8.5px] font-mono text-amber-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Zap className="w-3 h-3 text-[#f59e0b]" />
                          LAYER 05 // MEMORY CACHE
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[7.5px]">
                          UPSTASH REDIS
                        </span>
                      </div>

                      <div className="py-2">
                        <div className="grid grid-cols-4 gap-2 p-2.5 rounded-2xl bg-black/50 border border-amber-500/20">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-0.5">
                              <span className="w-2 h-2 rounded-sm bg-amber-500/30 border border-amber-400/60 flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-[#f59e0b] animate-ping" />
                              </span>
                              <span className="text-[6px] font-mono text-amber-200/80">N{i + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-amber-500/20 pt-2">
                        <span>LATENCY: 0.8MS</span>
                        <span className="text-amber-400 font-bold">10,000 REQ/SEC</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 04: POLYMORPHIC DATA ENGINE (DRIZZLE ORM & POSTGRES) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer4Z,
                      y: layer4Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(4)}
                    className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-emerald-500/50 via-emerald-950/40 to-black/80 backdrop-blur-md transition-all cursor-pointer ${
                      effectiveActiveLayer === 4
                        ? "ring-2 ring-[#10b981] shadow-[0_0_35px_rgba(16,185,129,0.5)] opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-[48px] bg-[#0b1713]/85 p-5 flex flex-col justify-between border border-emerald-500/30">
                      <div className="flex items-center justify-between text-[8.5px] font-mono text-emerald-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Database className="w-3 h-3 text-emerald-400" />
                          LAYER 04 // DATA ENGINE
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[7.5px]">
                          DRIZZLE + SUPABASE
                        </span>
                      </div>

                      <div className="space-y-1.5 p-2.5 rounded-2xl bg-black/50 border border-emerald-500/20 font-mono text-[7px] text-[#94a3b8]">
                        <div className="text-emerald-300 font-bold">TABLE: problem_signals</div>
                        <div>+ track_id: varchar(32)</div>
                        <div>+ latency_p99: integer (12ms)</div>
                        <div>+ metadata: jsonb (Sunday ready)</div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-emerald-500/20 pt-2">
                        <span>PORT: 6543 POOL</span>
                        <span className="text-emerald-400 font-bold">P99 &lt; 12MS</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 03: EDGE SECURITY PERIMETER (CLERK AUTH SHIELD) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer3Z,
                      y: layer3Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(3)}
                    className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-purple-500/50 via-purple-950/40 to-black/80 backdrop-blur-md transition-all cursor-pointer ${
                      effectiveActiveLayer === 3
                        ? "ring-2 ring-[#a855f7] shadow-[0_0_35px_rgba(168,85,247,0.5)] opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-[48px] bg-[#130f21]/85 p-5 flex flex-col justify-between border border-purple-500/30">
                      <div className="flex items-center justify-between text-[8.5px] font-mono text-purple-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck className="w-3 h-3 text-purple-400" />
                          LAYER 03 // SECURITY SHIELD
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[7.5px]">
                          CLERK EDGE
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center py-2 space-y-2">
                        <div className="w-14 h-14 rounded-full border border-purple-500/40 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full border border-purple-400/60 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-purple-500/30 animate-pulse" />
                          </div>
                        </div>
                        <span className="font-mono text-[7px] text-purple-300">
                          BIOMETRIC EDGE PERIMETER
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-purple-500/20 pt-2">
                        <span>TLS 1.3 // EDGE</span>
                        <span className="text-purple-400 font-bold">VERIFIED</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 02: SPATIAL WEBGL PIPELINE & SHADERS (CAD WIREFRAME) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer2Z,
                      y: layer2Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(2)}
                    className={`absolute inset-0 rounded-[50px] p-[2px] bg-gradient-to-br from-sky-400/50 via-sky-950/40 to-black/80 backdrop-blur-md transition-all cursor-pointer ${
                      effectiveActiveLayer === 2
                        ? "ring-2 ring-[#38bdf8] shadow-[0_0_35px_rgba(56,189,248,0.5)] opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-[48px] bg-[#0c1624]/85 p-5 flex flex-col justify-between border border-sky-400/30">
                      <div className="flex items-center justify-between text-[8.5px] font-mono text-sky-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Cpu className="w-3 h-3 text-sky-400" />
                          LAYER 02 // GRAPHICS ENGINE
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-[7.5px]">
                          THREE.JS + DRACO
                        </span>
                      </div>

                      <div className="relative h-24 w-full rounded-2xl bg-black/60 border border-sky-400/25 p-2 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:14px_14px]" />
                        <div className="relative z-10 text-center font-mono space-y-0.5">
                          <div className="text-[9px] text-sky-300 font-bold">PBR CALIBRATION</div>
                          <div className="text-[7px] text-[#94a3b8]">[X: +0.45, Y: -0.12, Z: +2.85]</div>
                          <div className="text-[6.5px] text-emerald-400">DRACO DECOMPRESSOR // 60 FPS</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[8px] text-[#94a3b8] border-t border-sky-400/20 pt-2">
                        <span>HARDWARE ACCELERATION</span>
                        <span className="text-sky-400 font-bold">60 FPS LOCKED</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ----------------------------------------------------------------- */}
                  {/* LAYER 01: FRONT OLED DISPLAY (LIVE 2D REACT COMPONENT) */}
                  {/* ----------------------------------------------------------------- */}
                  <motion.div
                    style={{
                      z: layer1Z,
                      y: layer1Y,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setManualOverrideLayer(1)}
                    className={`absolute inset-0 rounded-[50px] p-[2.5px] bg-gradient-to-b from-[#404352] via-[#22242d] to-[#121319] shadow-2xl transition-all cursor-pointer ${
                      effectiveActiveLayer === 1
                        ? "ring-2 ring-[#ffedd6] shadow-[0_0_35px_rgba(255,237,214,0.5)] opacity-100"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="w-full h-full rounded-[47px] p-[6px] bg-[#0c0d12]">
                      <div className="relative w-full h-full rounded-[41px] bg-[#07080c] overflow-hidden flex flex-col justify-between border border-white/[0.06] p-3.5">
                        {/* Dynamic Island + Status Bar */}
                        <div className="flex items-center justify-between text-xs font-mono text-[#ffedd6] pt-1">
                          <span className="font-bold text-[10px]">{currentTime}</span>
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
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onTryItNow?.();
                            }}
                            className="w-full py-1.5 px-2 rounded-lg bg-[#ffedd6] hover:bg-white text-[#07080a] font-mono text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                          >
                            <span>RESOLVE STATEMENT</span>
                            <ArrowRight className="w-3 h-3 text-[#07080a]" />
                          </div>
                        </div>

                        <div className="flex justify-center pb-1">
                          <div className="w-16 h-0.5 bg-white/40 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Area: Dynamic Step-by-Step Layer Explanation Card (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full max-w-lg mx-auto w-full">
              {/* Focused Layer Card Revealed on Scroll */}
              <motion.div
                key={currentLayerData.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0e111a]/95 border-2 shadow-2xl relative overflow-hidden backdrop-blur-xl"
                style={{ borderColor: `${currentLayerData.color}50` }}
              >
                {/* Accent glow corner */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: `${currentLayerData.color}25` }}
                />

                {/* Layer Badge & Tech Tag */}
                <div className="flex items-center justify-between font-mono mb-3">
                  <span
                    className="px-2.5 py-1 rounded text-xs font-bold border"
                    style={{
                      color: currentLayerData.color,
                      borderColor: `${currentLayerData.color}50`,
                      backgroundColor: `${currentLayerData.color}15`,
                    }}
                  >
                    {currentLayerData.badge}
                  </span>
                  <span className="text-[#94a3b8] text-xs font-mono">{currentLayerData.tech}</span>
                </div>

                {/* Layer Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-display)] text-[#f4efe6] mb-3">
                  {currentLayerData.name}
                </h3>

                {/* PLAIN-LANGUAGE CAPTION (MAX 8 WORDS) */}
                <div
                  className="p-3 rounded-xl bg-black/40 border-l-4 my-3 font-sans text-sm sm:text-base text-[#ffedd6] font-medium leading-relaxed"
                  style={{ borderColor: currentLayerData.color }}
                >
                  &ldquo;{currentLayerData.caption}&rdquo;
                </div>

                {/* Telemetry & Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-3 mt-4 border-t border-[rgba(255,237,214,0.08)] font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-[#94a3b8] uppercase">PIPELINE SPEC</div>
                    <div className="text-[#ffedd6] font-bold">{currentLayerData.telemetry}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#94a3b8] uppercase">RUNTIME PERFORMANCE</div>
                    <div className="font-bold" style={{ color: currentLayerData.color }}>
                      {currentLayerData.metric}
                    </div>
                  </div>
                </div>

                {/* Quick-Jump Layer Tabs */}
                <div className="pt-5 mt-5 border-t border-[rgba(255,237,214,0.08)] flex items-center justify-between gap-1">
                  {STACK_LAYERS.map((layer) => {
                    const isSelected = effectiveActiveLayer === layer.id;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => setManualOverrideLayer(layer.id)}
                        className={`flex-1 py-1.5 rounded font-mono text-[10px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ffedd6] text-[#07080a] shadow-md scale-105"
                            : "bg-[#141722] hover:bg-[#1a1e28] text-[#94a3b8] border border-white/5"
                        }`}
                      >
                        0{layer.id}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Scroll Instruction Callout */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#94a3b8] px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>SCROLL DOWN TO ADVANCE LAYERS</span>
                </span>
                <button
                  onClick={onScrollToStage3}
                  className="text-[#ffedd6] hover:text-[#ff8539] transition-colors flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Skip to Features</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. BOTTOM CALIPER BAR & PROGRESS */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full px-6 sm:px-12 py-3 bg-[#07080a]/90 backdrop-blur-md border-t border-[rgba(255,237,214,0.08)] flex items-center justify-between font-mono text-[10px] text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="hidden sm:inline">STAGE 01 ➔ 02 // LIVE KINETIC STACK</span>
            <span className="sm:hidden">STAGE 01 ➔ 02</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#ffedd6]">
              {effectiveActiveLayer === 1
                ? "FRONT OLED SURFACE"
                : `LAYER 0${effectiveActiveLayer} ACTIVE`}
            </span>
            <span className="w-1 h-3 bg-white/20" />
            <span className="text-emerald-400 font-bold">100% NATIVE SCROLL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OryzoHeroToStackChoreography;
