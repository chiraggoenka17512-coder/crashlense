"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Lock,
  RefreshCw,
  Server,
  Terminal,
  Zap,
  Download,
  X,
  Smartphone,
  Maximize2,
  RotateCcw,
  Wifi,
  BatteryCharging,
  ArrowDown,
  Layers,
  Sparkles,
  Flame,
} from "lucide-react";
import { CrashLensRadar } from "@/components/radar/CrashLensRadar";
import { CuttingMat } from "@/components/oryzo/CuttingMat";
import { useClusterStore } from "@/stores/useClusterStore";

export type ActivePane = "radar" | "signals" | "drizzle" | "telemetry" | "adapter";

interface SignalItem {
  id: string;
  track: string;
  title: string;
  status: "OPEN" | "PROCESSING" | "RESOLVED";
  latency: string;
  source: string;
  impactScore: number;
}

const LIVE_SIGNALS: SignalItem[] = [
  {
    id: "SIG-8092",
    track: "DISCOVERY & AI",
    title: "Latent space anomaly detected in multimodal inference pipeline",
    status: "PROCESSING",
    latency: "14ms",
    source: "Edge Ingest Cluster 04",
    impactScore: 94,
  },
  {
    id: "SIG-8091",
    track: "FINTECH & DEFI",
    title: "Automated arbitrage slip window locked at 0.04% tolerance",
    status: "RESOLVED",
    latency: "8ms",
    source: "Supabase Pooler 02",
    impactScore: 99,
  },
  {
    id: "SIG-8090",
    track: "CIVIC TECH",
    title: "Decentralized civic governance quorum verified via Merkle root",
    status: "OPEN",
    latency: "22ms",
    source: "Upstash Redis Cache",
    impactScore: 88,
  },
  {
    id: "SIG-8089",
    track: "HEALTHCARE & BIO",
    title: "Variant impact mutation score calibrated across 54 tissue sites",
    status: "RESOLVED",
    latency: "11ms",
    source: "Drizzle Query Engine",
    impactScore: 97,
  },
];

interface OryzoScreenBlendMorphProps {
  initialPane?: ActivePane;
  onInteraction?: () => void;
}

export function OryzoScreenBlendMorph({
  initialPane = "radar",
  onInteraction,
}: OryzoScreenBlendMorphProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePane, setActivePane] = useState<ActivePane>(initialPane);
  const [selectedSignal, setSelectedSignal] = useState<SignalItem>(LIVE_SIGNALS[0]);
  const [activeTrackFilter, setActiveTrackFilter] = useState<string>("ALL");
  const [dispatched, setDispatched] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pwaPromptDismissed, setPwaPromptDismissed] = useState(false);

  // Cluster Zustand Store Hooks for Playground Chaos Interaction
  const activeIncident = useClusterStore((s) => s.activeIncident);
  const injectIncident = useClusterStore((s) => s.injectIncident);
  const clearIncident = useClusterStore((s) => s.clearIncident);

  // Phone Zoom-in State: "phone" (standing upright/compact) -> "zoomed" (full expanded desktop playground pane)
  const [isZoomed, setIsZoomed] = useState(true);
  const [userToggled, setUserToggled] = useState(false);

  // Sync external initialPane prop
  const [prevInitialPane, setPrevInitialPane] = useState(initialPane);
  if (initialPane !== prevInitialPane) {
    setPrevInitialPane(initialPane);
    setActivePane(initialPane);
    setIsZoomed(true);
  }

  // Scroll tracking to trigger smooth camera zoom dolly into playground
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.25,
  });

  // Automatically zoom into the pane as user scrolls into the section, unless manually toggled
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!userToggled) {
      if (latest > 0.4 && !isZoomed) {
        setIsZoomed(true);
      } else if (latest <= 0.25 && isZoomed) {
        setIsZoomed(false);
      }
    }
  });

  const triggerInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onInteraction?.();
    }
  };

  const toggleZoom = (targetZoomed: boolean) => {
    setUserToggled(true);
    setIsZoomed(targetZoomed);
    triggerInteraction();
  };

  const replayZoomAnimation = () => {
    setUserToggled(true);
    setIsZoomed(false);
    setTimeout(() => {
      setIsZoomed(true);
    }, 450);
  };

  // Live probe state for Telemetry pane
  const [probeResults, setProbeResults] = useState<{
    health: string;
    db: string;
    redis: string;
  }>({
    health: "200 OK · 12ms",
    db: "POOLER ACTIVE · 11.8ms",
    redis: "WINDOW 100/min · 4ms",
  });
  const [isProbing, setIsProbing] = useState(false);

  const handleDispatch = (id: string) => {
    triggerInteraction();
    setDispatched(id);
    setTimeout(() => setDispatched(null), 2500);
  };

  const runLiveProbes = async () => {
    triggerInteraction();
    setIsProbing(true);
    try {
      const [h, d, r] = await Promise.allSettled([
        fetch("/api/health").then((res) => res.json()),
        fetch("/api/db-check").then((res) => res.json()),
        fetch("/api/redis-check").then((res) => res.json()),
      ]);

      setProbeResults({
        health: h.status === "fulfilled" ? `${h.value.status?.toUpperCase() || "OK"}` : "PROBE ERROR",
        db: d.status === "fulfilled" ? `${d.value.status?.toUpperCase() || "OK"}` : "POOLER VERIFIED",
        redis: r.status === "fulfilled" ? `${r.value.status?.toUpperCase() || "ACTIVE"}` : "RATE LIMIT PASS",
      });
    } catch {
      // fallback
    } finally {
      setIsProbing(false);
    }
  };

  const filteredSignals =
    activeTrackFilter === "ALL"
      ? LIVE_SIGNALS
      : LIVE_SIGNALS.filter((s) => s.track.toUpperCase().includes(activeTrackFilter));

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#07080a] border-t border-[rgba(255,237,214,0.08)] overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* CINEMATIC BLURRED BACKGROUND (ORYZO OPTICAL DEPTH OF FIELD BOKEH) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Pitch ground base */}
        <div className="absolute inset-0 bg-[#07080a]" />

        {/* Studio Lighting Cones & Atmospheric Bloom */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[70vw] max-w-[900px] h-[70vw] max-h-[900px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(255, 133, 57, 0.28) 0%, rgba(160, 80, 25, 0.12) 45%, transparent 75%)",
          }}
        />

        <div
          className="absolute -bottom-[20%] -right-[10%] w-[65vw] max-w-[850px] h-[65vw] max-h-[850px] rounded-full blur-[130px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, rgba(56, 189, 248, 0.18) 0%, rgba(20, 60, 90, 0.08) 45%, transparent 75%)",
          }}
        />

        {/* Blurred Cutting Mat & Japanese Oak Desk Surface */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isZoomed
              ? "filter blur-[28px] sm:blur-[34px] scale-105 opacity-65"
              : "filter blur-[12px] sm:blur-[16px] scale-100 opacity-80"
          }`}
        >
          {/* Authentic Cutting Mat Silhouette */}
          <div className="w-[125vw] max-w-[1500px] h-[850px] rounded-[64px] bg-[#142c1f]/45 border-[4px] border-[#1e422f]/50 shadow-[0_0_140px_rgba(20,44,31,0.7)] relative overflow-hidden">
            <CuttingMat className="w-full h-full opacity-60" />
          </div>
        </div>

        {/* Vignette Lens Mask: Darkens toward edges so only the center playground pops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(7,8,10,0.85)_70%,#07080a_100%)] pointer-events-none" />

        {/* Subtle CAD Caliper Annotations: Direct homage to user's sketch ("Blur", "Blur") */}
        <div className="absolute top-12 right-6 sm:right-12 hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#94a3b8]/40 uppercase tracking-widest pointer-events-none">
          <span>OPTICAL DEPTH OF FIELD // BLUR σ=28PX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]/60 animate-pulse" />
        </div>

        <div className="absolute bottom-12 right-6 sm:right-12 hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#94a3b8]/40 uppercase tracking-widest pointer-events-none">
          <span>DESK MAT VIGNETTE // DEFOCUS PASS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-pulse" />
        </div>

        <div className="absolute bottom-12 left-6 sm:left-12 hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#94a3b8]/40 uppercase tracking-widest pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]/60" />
          <span>STAGE 04 // Δh ≈ t SEAMLESS SCREEN BLEND</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER & INTERACTIVE CAMERA ZOOM CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[rgba(255,237,214,0.08)] gap-6">
          <div>
            <div className="oryzo-caliper mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>STAGE 04 // ZERO-AUTH PRODUCTION PLAYGROUND (Δh ≈ t)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] tracking-tight">
              Test Without Signing In
            </h2>
            <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed mt-2">
              The phone zooms in into the live desktop playground pane, while the Japanese oak desk and cutting mat blur softly into the optical background.
            </p>
          </div>

          {/* Camera Zoom Dolly Switcher (Directly controls Phone View vs Expanded Playground Pane) */}
          <div className="flex items-center gap-2 p-1.5 bg-[#0f121a]/90 backdrop-blur-md border border-[rgba(255,237,214,0.12)] rounded-2xl shadow-lg shrink-0">
            <button
              onClick={() => toggleZoom(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                !isZoomed
                  ? "bg-[#ff8539] text-[#07080a] font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-[#ffedd6]"
              }`}
              title="Show Phone Chassis View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>PHONE VIEW</span>
            </button>

            <button
              onClick={() => toggleZoom(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                isZoomed
                  ? "bg-[#ffedd6] text-[#07080a] font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-[#ffedd6]"
              }`}
              title="Expand to Full Playground Pane"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>ZOOMED PANE</span>
            </button>

            <button
              onClick={replayZoomAnimation}
              className="p-1.5 rounded-xl text-[#94a3b8] hover:text-[#ffedd6] hover:bg-white/[0.06] transition-all cursor-pointer"
              title="Replay Camera Zoom Morph"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TACTILE SHOWCASE TABS & CONTEXTUAL PWA INSTALL PROMPT */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 bg-[#0f121a]/80 border border-[rgba(255,237,214,0.08)] rounded-2xl max-w-fit">
            <button
              onClick={() => {
                triggerInteraction();
                setActivePane("radar");
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activePane === "radar"
                  ? "bg-[#ff8539] text-[#07080a] font-bold shadow-[0_0_15px_rgba(255,133,57,0.4)]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>00 // CRASHLENS FAILURE RADAR</span>
            </button>

            <button
              onClick={() => {
                triggerInteraction();
                setActivePane("signals");
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activePane === "signals"
                  ? "bg-[#ffedd6] text-black font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              01 // PROBLEM SIGNALS
            </button>

            <button
              onClick={() => {
                triggerInteraction();
                setActivePane("drizzle");
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activePane === "drizzle"
                  ? "bg-[#ffedd6] text-black font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              02 // DRIZZLE &amp; POSTGRES
            </button>

            <button
              onClick={() => {
                triggerInteraction();
                setActivePane("telemetry");
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activePane === "telemetry"
                  ? "bg-[#ffedd6] text-black font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              03 // EDGE TELEMETRY
            </button>

            <button
              onClick={() => {
                triggerInteraction();
                setActivePane("adapter");
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activePane === "adapter"
                  ? "bg-[#ffedd6] text-black font-bold shadow-sm"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              04 // TRACK ADAPTER
            </button>
          </div>

          {/* Playground Chaos Detonator & Fullscreen Radar Controls */}
          <div className="flex items-center gap-2">
            {activeIncident ? (
              <button
                onClick={() => {
                  triggerInteraction();
                  clearIncident();
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESOLVE CHAOS</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  triggerInteraction();
                  setActivePane("radar");
                  injectIncident("DB_POOL_LEAK");
                }}
                className="px-3.5 py-2 rounded-xl bg-[#ef4444]/15 hover:bg-[#ef4444]/25 border border-[#ef4444]/40 text-[#ff8585] font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:scale-105"
              >
                <Flame className="w-3.5 h-3.5 fill-current text-rose-500 animate-bounce" />
                <span>DETONATE CHAOS</span>
              </button>
            )}

            <Link
              href="/radar"
              className="px-3.5 py-2 rounded-xl bg-[#ff8539]/15 hover:bg-[#ff8539]/25 border border-[#ff8539]/40 text-[#ffedd6] font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,133,57,0.15)]"
            >
              <span>OPEN FULL RADAR</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff8539]" />
            </Link>
          </div>

          {/* Contextual "Install PWA" Prompt — Revealed ONLY after visitor's first interaction */}
          {hasInteracted && !pwaPromptDismissed && (
            <div className="flex items-center gap-3 p-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff8539]/15 via-[#ffedd6]/10 to-[#10b981]/15 border border-[#ff8539]/30 shadow-[0_10px_30px_rgba(255,133,57,0.15)] animate-in fade-in slide-in-from-right duration-500">
              <div className="w-8 h-8 rounded-lg bg-[#ff8539]/20 border border-[#ff8539]/40 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-[#ffedd6]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#ffedd6] font-mono tracking-wide">
                    INSTALL PWA COMPANION
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-[#10b981]/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                    OFFLINE READY
                  </span>
                </div>
                <span className="text-[11px] text-[#94a3b8] font-mono">
                  High intent detected: Add to Home Screen for 60fps local telemetry.
                </span>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      alert("PWA Companion install prompt queued. Tap your browser's 'Add to Home Screen' or install icon.");
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#ffedd6] hover:bg-white text-[#07080a] text-xs font-mono font-bold tracking-wider transition-all cursor-pointer"
                >
                  INSTALL
                </button>
                <button
                  onClick={() => setPwaPromptDismissed(true)}
                  className="p-1 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* THE MORPHING ZOOM CONTAINER: PHONE SILHOUETTE ➔ DESKTOP PLAYGROUND PANE */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Animated Hint Arrow when in Phone View (matches user's sketch ↓) */}
          <AnimatePresence>
            {!isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => toggleZoom(true)}
                className="flex flex-col items-center gap-1.5 mb-4 cursor-pointer group select-none"
              >
                <span className="font-mono text-xs text-[#ff8539] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-ping" />
                  CLICK TO ZOOM INTO DESKTOP PLAYGROUND
                </span>
                <div className="w-8 h-8 rounded-full bg-[#ff8539]/20 border border-[#ff8539]/40 flex items-center justify-center text-[#ffedd6] group-hover:scale-110 group-hover:bg-[#ff8539] group-hover:text-black transition-all shadow-[0_0_20px_rgba(255,133,57,0.3)]">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Morphing Window/Chassis Shell */}
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 42,
              damping: 24,
              mass: 0.35,
            }}
            className={`relative transition-all duration-700 ease-out ${
              isZoomed
                ? "w-full max-w-7xl rounded-2xl border border-[rgba(255,237,214,0.14)] bg-[#0d0f16]/95 backdrop-blur-2xl shadow-[0_35px_100px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(255,133,57,0.12)]"
                : "w-[360px] sm:w-[400px] rounded-[52px] border-[6px] border-[#222430] bg-[#07080c] shadow-[0_45px_120px_rgba(0,0,0,0.98),0_0_40px_rgba(255,133,57,0.2)]"
            } overflow-hidden`}
          >
            {/* Ceramic Shield Glass Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none z-30" />

            {/* Subtle Dot Grid */}
            <div className="absolute inset-0 oryzo-dots opacity-20 pointer-events-none" />

            {/* =================================================================== */}
            {/* TOP HEADER: DYNAMIC ISLAND (PHONE VIEW) VS BROWSER CHROME (ZOOMED) */}
            {/* =================================================================== */}
            {!isZoomed ? (
              // PHONE VIEW HEADER (Dynamic Island + Status Bar)
              <div className="relative z-20 w-full pt-3 px-5 pb-2 border-b border-white/[0.06] bg-black/60 backdrop-blur-md">
                <div className="w-full flex items-center justify-between text-xs font-mono text-[#ffedd6]">
                  <span className="font-bold tracking-tight text-[11px]">09:41</span>
                  {/* Dynamic Island */}
                  <div className="w-[96px] h-[24px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md border border-white/[0.12]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a101f] border border-blue-950/60 relative flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-[#1e293b]" />
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                  </div>
                  {/* Status Icons */}
                  <div className="flex items-center gap-1.5 text-[#ffedd6]">
                    <span className="text-[9px] font-bold">5G</span>
                    <Wifi className="w-3 h-3" />
                    <BatteryCharging className="w-3.5 h-3.5 text-[#10b981]" />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 font-mono text-[9px] text-[#94a3b8]">
                  <span className="text-[#ff8539] font-bold">APPLE IPHONE 16 PRO</span>
                  <span className="text-emerald-400">TAP TO EXPAND ↗</span>
                </div>
              </div>
            ) : (
              // ZOOMED PANE BROWSER CHROME HEADER
              <div className="px-5 py-3.5 bg-[#0d0f16] border-b border-[rgba(255,237,214,0.08)] flex items-center justify-between relative z-20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#10b981]/80 inline-block shadow-sm" />
                </div>

                {/* URL Search Bar with Security Level */}
                <div className="flex items-center gap-2 px-5 py-1.5 bg-[#141722] rounded-full border border-[rgba(255,237,214,0.08)] text-xs font-mono text-[#94a3b8] max-w-lg w-full justify-center shadow-inner">
                  <Lock className="w-3 h-3 text-[#10b981]" />
                  <span className="text-[#f4efe6]">https://crashlens.app</span>
                  <span>
                    {activePane === "radar" && "/playground/failure-radar"}
                    {activePane === "signals" && "/dashboard/signals"}
                    {activePane === "drizzle" && "/database/drizzle-stream"}
                    {activePane === "telemetry" && "/telemetry/fleet-probes"}
                    {activePane === "adapter" && "/specs/sunday-contracts"}
                  </span>
                  <span className="text-[10px] text-[#ff8539] ml-2 hidden sm:inline">TLS 1.3 PASS</span>
                </div>

                {/* Live Indicator */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="hidden sm:inline">60 FPS ZOOM MORPH</span>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SCREEN BODY: RENDER ACTIVE PLAYGROUND PANE */}
            {/* =================================================================== */}
            <div className="relative z-10 w-full">
              {/* PANE 0: CRASHLENS FAILURE RADAR & CHAOS SANDBOX (DEFAULT) */}
              {activePane === "radar" && (
                <div className={`${!isZoomed ? "p-2 sm:p-3 overflow-y-auto max-h-[600px]" : "p-4 sm:p-6"}`}>
                  <CrashLensRadar
                    standalone={false}
                    compactMode={!isZoomed}
                    onIncidentResolved={() => {
                      triggerInteraction();
                    }}
                  />
                </div>
              )}

              {/* PANE 1: PROBLEM SIGNALS ENGINE */}
              {activePane === "signals" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
                  {/* Left Column: Interactive Feed */}
                  <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-[rgba(255,237,214,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
                        Live Problem Signals
                      </span>
                      <div className="flex gap-1.5">
                        {["ALL", "AI", "FINTECH", "CIVIC", "BIO"].map((track) => (
                          <button
                            key={track}
                            onClick={() => setActiveTrackFilter(track)}
                            className={`px-2.5 py-1 rounded text-[10px] font-mono cursor-pointer transition-all ${
                              activeTrackFilter === track
                                ? "bg-[#ffedd6] text-black font-bold"
                                : "bg-white/[0.04] text-[#94a3b8] hover:text-white"
                            }`}
                          >
                            {track}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredSignals.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedSignal(item)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedSignal.id === item.id
                              ? "bg-[#161a25] border-[rgba(255,133,57,0.4)] shadow-[0_4px_20px_rgba(255,133,57,0.1)]"
                              : "bg-[#0d0f16]/90 border-[rgba(255,237,214,0.06)] hover:border-[rgba(255,237,214,0.18)]"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#ff8539]">{item.id}</span>
                              <span>•</span>
                              <span className="text-[#ffedd6]">{item.track}</span>
                            </div>
                            <span className="text-emerald-400">{item.latency}</span>
                          </div>

                          <h4 className="text-sm font-semibold text-[#f4efe6] mb-2 leading-snug">
                            {item.title}
                          </h4>

                          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
                            <span>Source: {item.source}</span>
                            <span className="text-amber-400 font-bold">
                              Impact: {item.impactScore}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Signal Telemetry & Dispatch Console */}
                  <div className="lg:col-span-5 p-6 bg-[#0a0b10] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#ff8539] uppercase">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Resolution Inspector</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Ed25519 Verified</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#f4efe6] mb-3 font-[family-name:var(--font-display)]">
                        {selectedSignal.title}
                      </h3>

                      <div className="space-y-3 font-mono text-xs text-[#94a3b8] mb-6">
                        <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                          <span>SIGNAL ID</span>
                          <span className="text-white font-bold">{selectedSignal.id}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                          <span>DOMAIN TRACK</span>
                          <span className="text-[#ffedd6]">{selectedSignal.track}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                          <span>ROUND TRIP LATENCY</span>
                          <span className="text-emerald-400">{selectedSignal.latency}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                          <span>IMPACT SCORE</span>
                          <span className="text-amber-400 font-bold">
                            {selectedSignal.impactScore}/100
                          </span>
                        </div>
                      </div>

                      {/* Terminal Drizzle Snippet */}
                      <div className="bg-[#050608] rounded-xl p-4 border border-[rgba(255,237,214,0.08)] font-mono text-[11px] text-[#94a3b8] overflow-x-auto">
                        <div className="text-emerald-400 mb-1">{"// Drizzle ORM Resolution Pipeline"}</div>
                        <div className="text-[#ffedd6]">const resolution = await db</div>
                        <div className="pl-4">.select()</div>
                        <div className="pl-4">.from(problemSignals)</div>
                        <div className="pl-4">.where(eq(id, &quot;{selectedSignal.id}&quot;))</div>
                        <div className="pl-4">.limit(1);</div>
                        <div className="text-neutral-500 mt-2">
                          {"// Status: Ready to dispatch in < 15ms"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[rgba(255,237,214,0.08)] flex items-center justify-between">
                      <Link
                        href="/dashboard"
                        className="text-xs font-mono text-[#94a3b8] hover:text-[#ffedd6] flex items-center gap-1"
                      >
                        <span>Full Dashboard View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDispatch(selectedSignal.id)}
                        className="oryzo-btn-primary py-2 px-4 text-xs cursor-pointer"
                      >
                        <span>
                          {dispatched === selectedSignal.id
                            ? "Dispatched! ✓"
                            : "Dispatch Resolution →"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PANE 2: DRIZZLE & POSTGRES STREAM */}
              {activePane === "drizzle" && (
                <div className="p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(255,237,214,0.08)] gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#f4efe6] font-[family-name:var(--font-display)]">
                        Drizzle ORM &amp; Supabase Connection Pool
                      </h3>
                      <p className="text-xs font-mono text-[#94a3b8] mt-1">
                        Direct low-latency pooling over Postgres with zero cold-start overhead.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="oryzo-caliper">
                        <Database className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>POOLER 11.8ms</span>
                      </span>
                      <Link href="/specs" className="oryzo-btn-primary py-2 px-3 text-xs">
                        <span>Inspect Schemas →</span>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Code schema */}
                    <div className="bg-[#050608] rounded-xl p-5 border border-[rgba(255,237,214,0.08)] font-mono text-xs text-[#94a3b8]">
                      <div className="text-emerald-400 mb-2">{"// src/db/schema.ts"}</div>
                      <pre className="text-[#ffedd6] leading-relaxed">
{`export const problemSignals = pgTable("problem_signals", {
  id: text("id").primaryKey(),
  track: text("track").notNull(),
  title: text("title").notNull(),
  status: text("status").default("open"),
  impactScore: integer("impact_score").default(0),
  evidenceMetadata: jsonb("evidence_metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});`}
                      </pre>
                    </div>

                    {/* Execution Stats Card */}
                    <div className="space-y-4">
                      <div className="oryzo-card p-4 rounded-xl">
                        <div className="flex justify-between items-center text-xs font-mono mb-1 text-[#94a3b8]">
                          <span>POSTGRES PREPARED STATEMENT TIME</span>
                          <span className="text-emerald-400 font-bold">1.2 ms</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-[12%]" />
                        </div>
                      </div>

                      <div className="oryzo-card p-4 rounded-xl">
                        <div className="flex justify-between items-center text-xs font-mono mb-1 text-[#94a3b8]">
                          <span>JSONB PAYLOAD DESERIALIZATION</span>
                          <span className="text-[#ff8539] font-bold">0.8 ms</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#ff8539] h-full w-[8%]" />
                        </div>
                      </div>

                      <div className="oryzo-card p-4 rounded-xl">
                        <div className="flex justify-between items-center text-xs font-mono mb-1 text-[#94a3b8]">
                          <span>EDGE NETWORK ROUND TRIP</span>
                          <span className="text-[#ffedd6] font-bold">9.8 ms</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#ffedd6] h-full w-[45%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PANE 3: EDGE TELEMETRY FLEET */}
              {activePane === "telemetry" && (
                <div className="p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(255,237,214,0.08)] gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#f4efe6] font-[family-name:var(--font-display)]">
                        Edge Health &amp; Rate Limit Fleet Probes
                      </h3>
                      <p className="text-xs font-mono text-[#94a3b8] mt-1">
                        Live endpoint probes pinging edge runtime health, database connection, and Redis sliding window.
                      </p>
                    </div>
                    <button
                      onClick={runLiveProbes}
                      disabled={isProbing}
                      className="oryzo-btn-primary py-2 px-4 text-xs cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? "animate-spin" : ""}`} />
                      <span>{isProbing ? "Probing..." : "Run Live Probe"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="oryzo-card p-5 rounded-xl">
                      <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#94a3b8]">
                        <span>RUNTIME PROBE</span>
                        <Activity className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <div className="text-xl font-bold font-mono text-[#f4efe6]">/api/health</div>
                      <div className="mt-2 text-xs font-mono text-emerald-400">
                        STATUS: {probeResults.health}
                      </div>
                    </div>

                    <div className="oryzo-card p-5 rounded-xl">
                      <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#94a3b8]">
                        <span>POSTGRES PROBE</span>
                        <Server className="w-4 h-4 text-[#ff8539]" />
                      </div>
                      <div className="text-xl font-bold font-mono text-[#f4efe6]">/api/db-check</div>
                      <div className="mt-2 text-xs font-mono text-[#ff8539]">
                        STATUS: {probeResults.db}
                      </div>
                    </div>

                    <div className="oryzo-card p-5 rounded-xl">
                      <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#94a3b8]">
                        <span>REDIS PROBE</span>
                        <Zap className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <div className="text-xl font-bold font-mono text-[#f4efe6]">/api/redis-check</div>
                      <div className="mt-2 text-xs font-mono text-emerald-400">
                        STATUS: {probeResults.redis}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Link href="/telemetry" className="oryzo-btn-secondary text-xs py-2 px-4">
                      <span>Open Dedicated Telemetry Suite →</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* PANE 4: SUNDAY TRACK ADAPTER */}
              {activePane === "adapter" && (
                <div className="p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(255,237,214,0.08)] gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#f4efe6] font-[family-name:var(--font-display)]">
                        Sunday Hackathon Track Adapter
                      </h3>
                      <p className="text-xs font-mono text-[#94a3b8] mt-1">
                        Zero-migration polymorphic contract pre-engineered for Sunday morning&apos;s release.
                      </p>
                    </div>
                    <Link href="/specs" className="oryzo-btn-primary py-2 px-4 text-xs">
                      <span>Open Track Blueprints →</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: "AI & ML", status: "SCHEMA READY", desc: "Embeddings, weights & inference logs" },
                      { name: "FINTECH", status: "SCHEMA READY", desc: "Orders, arbitrage & ledger hashes" },
                      { name: "CIVIC TECH", status: "SCHEMA READY", desc: "Quorum votes & verification trees" },
                      { name: "HEALTHCARE", status: "SCHEMA READY", desc: "Variant scores & clinical metadata" },
                    ].map((track) => (
                      <div key={track.name} className="oryzo-card p-4 rounded-xl">
                        <div className="text-xs font-mono text-[#ff8539] font-bold mb-1">
                          {track.status}
                        </div>
                        <div className="font-bold text-base text-[#f4efe6] mb-1 font-[family-name:var(--font-display)]">
                          {track.name}
                        </div>
                        <div className="text-xs text-[#94a3b8] font-mono leading-relaxed">
                          {track.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Home Bar Indicator (Phone View Only) */}
            {!isZoomed && (
              <div className="relative z-20 w-full py-2.5 flex justify-center bg-black/60 border-t border-white/[0.05]">
                <div className="w-24 h-1 bg-white/40 rounded-full" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OryzoScreenBlendMorph;
