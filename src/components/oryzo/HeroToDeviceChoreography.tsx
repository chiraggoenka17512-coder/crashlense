"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { CuttingMat } from "@/components/oryzo/CuttingMat";
import { TactileHardwareProps } from "@/components/oryzo/TactileHardwareProps";
import {
  ExplodedChoreographyLayers,
  STACK_LAYERS,
} from "@/components/oryzo/ExplodedChoreographyLayers";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Play,
  Volume2,
  VolumeX,
  ArrowDown,
  Sparkles,
  Cpu,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface HeroToDeviceChoreographyProps {
  onTryItNow?: () => void;
}

export function HeroToDeviceChoreography({
  onTryItNow,
}: HeroToDeviceChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState<number | null>(null);
  const [hoveredLayerId, setHoveredLayerId] = useState<number | null>(null);
  const activeLayerId = hoveredLayerId ?? selectedLayerId;
  const currentLayer =
    STACK_LAYERS.find((l) => l.id === activeLayerId) || STACK_LAYERS[0];

  // Mouse parallax for subtle studio depth & interactive hover physics
  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === "undefined") return;
      const xNorm = e.clientX / window.innerWidth - 0.5;
      const yNorm = e.clientY / window.innerHeight - 0.5;
      mouseX.set(xNorm * 12);
      mouseY.set(yNorm * 12);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Audio haptic feedback simulation
  const playTactileClick = (freq = 800, duration = 0.04) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Scroll tracking across this transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Silky 120 FPS high-precision spring physics smoothing on scroll momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.12,
    restDelta: 0.00001,
  });

  // Scroll-driven active layer synchronization across Frame 4 exploded stage
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (hoveredLayerId !== null) return;
    if (progress < 0.54) {
      // Phase 4A (Pure Explosion): all 6 layers are visible simultaneously in 3D with zero flank text
      setSelectedLayerId(null);
    } else if (progress >= 0.54 && progress < 0.58) {
      setSelectedLayerId(1);
    } else if (progress >= 0.58 && progress < 0.62) {
      setSelectedLayerId(2);
    } else if (progress >= 0.62 && progress < 0.66) {
      setSelectedLayerId(3);
    } else if (progress >= 0.66 && progress < 0.70) {
      setSelectedLayerId(4);
    } else if (progress >= 0.70 && progress < 0.74) {
      setSelectedLayerId(5);
    } else if (progress >= 0.74 && progress < 0.78) {
      setSelectedLayerId(6);
    } else {
      // Phase 4C: Reassembly & Powered by AI (progress >= 0.78) -> Uniform unified focus
      setSelectedLayerId(null);
    }
  });

  // =========================================================================
  // CINEMATIC TRANSITIONS:
  // FRAME 1 (HERO DESK) ➔ FRAME 2 (CENTERED PHONE) ➔ FRAME 3 (LAY FLAT AT BOTTOM) ➔ FRAME 4 (EXPLODED SCREEN) ➔ REASSEMBLY ➔ POWERED BY AI
  // =========================================================================

  // 1. Desk background (oak table, green mat, stationery) dissolves to black [0.00, 0.18]
  const deskOpacity = useTransform(smoothProgress, [0.0, 0.18], [1, 0]);
  const deskScale = useTransform(smoothProgress, [0.0, 0.18], [1, 1.05]);

  // 2. Hero Headline and corner cards dissolve & drift upward [0.00, 0.14]
  const heroUiOpacity = useTransform(smoothProgress, [0.0, 0.14], [1, 0]);
  const heroUiY = useTransform(smoothProgress, [0.0, 0.14], [0, -45]);

  // 3. Phone Liftoff from bottom peeking dock to center, then moves down & lays flat in Frame 3,
  // then lifts into heroic presentation stance during reassembly and "POWERED BY AI"
  const phoneTranslateY = useTransform(
    smoothProgress,
    [
      0.00, 0.08, 0.12, 0.16, 0.20, 0.24, // Phase 1: liftoff from dock to center
      0.28,                               // Phase 2: center showcase hold
      0.32, 0.36, 0.40,                   // Phase 3: Hermite S-curve downward glide
      0.76,                               // Phase 4A & 4B: resting flat at 25vh for explosion & inspection
      0.82, 0.96,                         // Phase 4C: Reassembly & Powered by AI (lifts to 10vh hero stance)
      1.00                                // Smooth exit glide
    ],
    [
      "34vh", "34vh", "26vh", "15vh", "4vh", "0vh",
      "0vh",
      "2vh", "9vh", "25vh",
      "25vh",
      "13vh", "13vh",
      "13vh"
    ]
  );

  // Decoupled follow-through pitch tilt
  // Decoupled follow-through pitch tilt (in numeric degrees)
  const phoneRotateXDeg = useTransform(
    smoothProgress,
    [
      0.00, 0.28,                         // Upright through Frame 1 & 2
      0.32, 0.36, 0.40,                   // Pitch tilt flat into 68deg
      0.76,                               // Flat through explosion & inspection
      0.82, 0.96,                         // Phase 4C: Tilts up to 28deg hero presentation angle
      1.00
    ],
    [
      0, 0,
      6, 28, 68,
      68,
      28, 28,
      14
    ]
  );

  // Z-depth spatial recession (phone steps back into 3D stage volume as it tilts flat)
  const phoneTranslateZ = useTransform(
    smoothProgress,
    [0.00, 0.28, 0.34, 0.40, 0.44, 0.84, 0.89, 0.96, 1.00],
    ["0px", "0px", "-25px", "-55px", "-75px", "-75px", "-20px", "-20px", "0px"]
  );

  // Subtle organic roll dynamic for physical weighted feel
  const phoneRotateZ = useTransform(
    smoothProgress,
    [0.00, 0.32, 0.38, 0.44, 0.84, 0.89, 0.96, 1.00],
    ["0deg", "0deg", "-1.1deg", "0deg", "0deg", "-2.5deg", "-2.5deg", "0deg"]
  );

  // Scale expansion to preserve hero presence
  const phoneScale = useTransform(
    smoothProgress,
    [
      0.00, 0.12, 0.24,
      0.28,
      0.36, 0.44,
      0.84,
      0.89, 0.96,
      1.00
    ],
    [
      0.96, 0.97, 1.0,
      1.0,
      1.03, 1.075,
      1.075,
      1.12, 1.12,
      1.02
    ]
  );

  // 4. Contact shadow on mat fades as phone lifts into the air [0.00, 0.16]
  const matShadowOpacity = useTransform(smoothProgress, [0.0, 0.16], [1, 0]);

  // 5. Ambient Floating Shadow behind upright phone in Frame 2, fading as it tilts flat
  const frame2ShadowOpacity = useTransform(
    smoothProgress,
    [0.16, 0.24, 0.28, 0.34],
    [0, 1, 1, 0]
  );

  // 6. Flat Ground Shadow underneath phone in Frame 3 as it lays flat (expands and softens)
  const flatShadowOpacity = useTransform(
    smoothProgress,
    [0.40, 0.44, 0.50, 0.84, 0.89, 0.96, 1.00],
    [0, 0.55, 0.95, 0.95, 0.70, 0.70, 0]
  );
  const flatShadowScaleX = useTransform(
    smoothProgress,
    [0.40, 0.52, 1.00],
    [0.65, 1.28, 1.28]
  );
  const flatShadowScaleY = useTransform(
    smoothProgress,
    [0.40, 0.52, 1.00],
    [0.35, 0.95, 0.95]
  );

  // 7. Dynamic Grazing Light Sheen across Ceramic Shield glass during tilt
  const grazingSheenOpacity = useTransform(
    smoothProgress,
    [0.42, 0.48, 0.54, 0.62],
    [0, 0.35, 0.45, 0.0]
  );

  // 8. Oryzo-style Corner Atmospheric Backlight on stage (remains throughout dark stage)
  const backlightOpacity = useTransform(smoothProgress, [0.12, 0.22], [0, 1]);

  // 9. Frame 2 Flanks: App Name (Left) and "Engineered by Hand, Built by AI" (Right)
  const frame2SideOpacity = useTransform(
    smoothProgress,
    [0.16, 0.22, 0.26, 0.30],
    [0, 1, 1, 0]
  );
  const frame2LeftX = useTransform(
    smoothProgress,
    [0.16, 0.22, 0.26, 0.30],
    [-40, 0, 0, -65]
  );
  const frame2RightX = useTransform(
    smoothProgress,
    [0.16, 0.22, 0.26, 0.30],
    [40, 0, 0, 65]
  );

  // 10. Frame 2 studio HUD / caliper badge [0.16, 0.22, 0.26, 0.30]
  const frame2HudOpacity = useTransform(
    smoothProgress,
    [0.16, 0.22, 0.26, 0.30],
    [0, 1, 1, 0]
  );
  const frame2HudY = useTransform(
    smoothProgress,
    [0.16, 0.22, 0.26, 0.30],
    [15, 0, 0, -18]
  );

  // =========================================================================
  // FRAME 4: THE EXPLODING SCREEN -> REASSEMBLY -> POWERED BY AI
  // =========================================================================

  // Continuous scroll-driven separation of the 6 layers [0.40 ➔ 0.50],
  // held fully separated [0.50 ➔ 0.76], then smoothly REASSEMBLES [0.76 ➔ 0.82] back to 0.0!
  const explosionProgress = useTransform(
    smoothProgress,
    [0.40, 0.44, 0.48, 0.50, 0.76, 0.82, 1.00],
    [0.0, 0.20, 0.75, 1.0, 1.0, 0.0, 0.0]
  );

  // Pure Explosion Hold Badge: Appears when all 6 slices are floating in space before inspection begins
  const explosionHoldBadgeOpacity = useTransform(
    smoothProgress,
    [0.48, 0.50, 0.52, 0.54],
    [0, 1, 1, 0]
  );

  // Frame 4 Left Flank: "WHAT IT IS" (Hidden during explosion; appears ONLY during layer inspection [0.54 ➔ 0.77])
  const whatItIsOpacity = useTransform(
    smoothProgress,
    [0.53, 0.55, 0.75, 0.77],
    [0, 1, 1, 0]
  );
  const whatItIsX = useTransform(
    smoothProgress,
    [0.53, 0.55, 0.75, 0.77],
    [-45, 0, 0, -55]
  );

  // Frame 4 Right Flank: "HOW IT IS IMPLEMENTED" (Hidden during explosion; appears ONLY during layer inspection [0.54 ➔ 0.77])
  const howItIsOpacity = useTransform(
    smoothProgress,
    [0.53, 0.55, 0.75, 0.77],
    [0, 1, 1, 0]
  );
  const howItIsX = useTransform(
    smoothProgress,
    [0.53, 0.55, 0.75, 0.77],
    [45, 0, 0, 55]
  );

  // Frame 4 Top Caliper HUD / Stepper (Hidden during explosion; appears ONLY during layer inspection [0.54 ➔ 0.77])
  const frame4HudOpacity = useTransform(
    smoothProgress,
    [0.53, 0.55, 0.75, 0.77],
    [0, 1, 1, 0]
  );

  // =========================================================================
  // PHASE 4C: REASSEMBLY ENERGY & "POWERED BY AI" SHOWCASE TRANSFORMS
  // =========================================================================

  // AI Particle Filaments converging on chassis during reassembly [0.76 ➔ 0.83]
  const reassemblyFilamentsOpacity = useTransform(
    smoothProgress,
    [0.76, 0.78, 0.81, 0.83],
    [0, 1, 1, 0]
  );

  // Radial Energy Shockwave Flash when slices snap shut [0.80 ➔ 0.84]
  const reassemblyFlashOpacity = useTransform(
    smoothProgress,
    [0.80, 0.82, 0.84],
    [0, 0.85, 0]
  );
  const reassemblyShockwaveScale = useTransform(
    smoothProgress,
    [0.80, 0.84],
    [0.6, 2.2]
  );

  // "POWERED BY AI" Opacity & Layout Transforms [0.82 ➔ 0.98]
  const poweredByAiOpacity = useTransform(
    smoothProgress,
    [0.82, 0.85, 0.95, 0.98],
    [0, 1, 1, 0]
  );
  const poweredByAiLeftX = useTransform(
    smoothProgress,
    [0.82, 0.85, 0.95, 0.98],
    [-45, 0, 0, -60]
  );
  const poweredByAiRightX = useTransform(
    smoothProgress,
    [0.82, 0.85, 0.95, 0.98],
    [45, 0, 0, 60]
  );
  const poweredByAiHudOpacity = useTransform(
    smoothProgress,
    [0.82, 0.85, 0.95, 0.98],
    [0, 1, 1, 0]
  );
  const aiGlowOpacity = useTransform(
    smoothProgress,
    [0.81, 0.84, 0.95, 0.98],
    [0, 1, 1, 0]
  );

  // Interactive 3D hover response for reassembled phone (matching Oryzo "Try to hover" behavior)
  const phoneInteractiveRotateX = useTransform(
    [phoneRotateXDeg, mouseY, poweredByAiOpacity],
    ([rotX, mY, aiOp]: number[]) => {
      const hoverX = mY * 0.7 * aiOp;
      return `${rotX + hoverX}deg`;
    }
  );

  const phoneInteractiveRotateY = useTransform(
    [mouseX, poweredByAiOpacity],
    ([mX, aiOp]: number[]) => {
      const hoverY = mX * 1.2 * aiOp;
      return `${hoverY}deg`;
    }
  );

  // Multi-Phase Scroll Cues in Lower Bar
  const prompt1Opacity = useTransform(smoothProgress, [0.0, 0.16], [1, 0]);
  const prompt2Opacity = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.26, 0.28],
    [0, 1, 1, 0]
  );
  const prompt3Opacity = useTransform(
    smoothProgress,
    [0.30, 0.35, 0.38, 0.42],
    [0, 1, 1, 0]
  );
  const promptExplodedHoldOpacity = useTransform(
    smoothProgress,
    [0.48, 0.50, 0.52, 0.54],
    [0, 1, 1, 0]
  );
  const prompt4Opacity = useTransform(
    smoothProgress,
    [0.54, 0.57, 0.75, 0.77],
    [0, 1, 1, 0]
  );
  const promptReassembleOpacity = useTransform(
    smoothProgress,
    [0.77, 0.79, 0.81, 0.83],
    [0, 1, 1, 0]
  );
  const promptPoweredByAiOpacity = useTransform(
    smoothProgress,
    [0.83, 0.86, 0.94, 0.97],
    [0, 1, 1, 0]
  );
  const prompt5Opacity = useTransform(smoothProgress, [0.96, 0.99], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[840vh] bg-[#07080a] select-none"
    >
      {/* STICKY FULL-SCREEN VIEWPORT LOCK (Seamless zero border transition) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ========================================================================= */}
        {/* LAYER 1: JAPANESE OAK TABLETOP + CUTTING MAT + PROPS (FADES TO BLACK) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: deskOpacity, scale: deskScale }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Oak Tabletop Background Image */}
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="absolute -inset-6 bg-cover bg-center transition-transform duration-700 ease-out"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/oak_tabletop_clean.jpg')",
                filter: "brightness(0.92) contrast(1.06) saturate(1.04)",
              }}
            />
          </motion.div>

          {/* Natural Sunlight Beam Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 16%, rgba(255, 238, 215, 0.22) 0%, rgba(255, 220, 175, 0.08) 45%, transparent 72%), linear-gradient(135deg, rgba(255, 245, 230, 0.08) 0%, transparent 55%, rgba(0, 0, 0, 0.42) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(7,8,10,0.85),transparent_75%)] pointer-events-none" />

          {/* Self-Healing Green Cutting Mat */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              className="relative w-[92vw] max-w-[1240px] h-[580px] sm:h-[640px] lg:h-[680px] -rotate-[6.5deg] translate-y-10 sm:translate-y-12 lg:translate-y-14 transition-transform duration-700"
            >
              <CuttingMat className="w-full h-full" />
            </motion.div>
          </div>

          {/* CrashLens Tactical SRE Hardware Artifacts with Realistic Lighting & Hover Physics */}
          <TactileHardwareProps
            playTactileClick={playTactileClick}
            onDetonateScenario={onTryItNow}
          />
        </motion.div>

        {/* Pitch Black Stage Backdrop with subtle Dot Matrix */}
        <div className="absolute inset-0 bg-[#07080a] -z-10 pointer-events-none">
          <div className="absolute inset-0 oryzo-dots opacity-20" />
        </div>

        {/* ========================================================================= */}
        {/* ORYZO-STYLE CORNER ATMOSPHERIC BACKLIGHT (FADES IN AS DESK DISSOLVES) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: backlightOpacity }}
          className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
        >
          {/* 1. TOP-LEFT CORNER BACKLIGHT (Deep rich amber atmospheric bloom matching Oryzo) */}
          <div
            className="absolute -top-[15%] -left-[10%] w-[65vw] max-w-[950px] h-[65vw] max-h-[950px] rounded-full blur-[110px] sm:blur-[160px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(220, 120, 45, 0.38) 0%, rgba(160, 80, 25, 0.20) 42%, rgba(95, 42, 15, 0.08) 68%, transparent 85%)",
            }}
          />

          {/* 2. BOTTOM-RIGHT CORNER BACKLIGHT (Subtle warm counter-fill bloom) */}
          <div
            className="absolute -bottom-[15%] -right-[10%] w-[55vw] max-w-[800px] h-[55vw] max-h-[800px] rounded-full blur-[120px] sm:blur-[170px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 65% 65%, rgba(200, 100, 35, 0.22) 0%, rgba(140, 65, 20, 0.10) 42%, transparent 78%)",
            }}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 2: HERO BRAND HEADLINE (FRAME 1 - NO SPECIFICATIONS) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: heroUiOpacity, y: heroUiY }}
          className="absolute inset-x-0 top-0 z-20 w-full px-6 sm:px-12 pt-20 sm:pt-24 lg:pt-28 pointer-events-none select-none"
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
          <div className="absolute left-6 sm:left-12 top-[60vh] hidden md:block max-w-[250px] lg:max-w-[280px] p-3.5 sm:p-4 rounded-2xl bg-[#1d1915]/80 backdrop-blur-xl border border-[rgba(255,237,214,0.16)] shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-[#f4efe6]">
            <h3 className="font-[family-name:var(--font-display)] font-black text-xs sm:text-[12.5px] uppercase leading-snug text-[#ffedd6] mb-1.5">
              CRASHLENS // RADAR OS,<br />
              PREDICTIVE CHAOS SANDBOX.
            </h3>
            <div className="w-full border-b border-dotted border-[rgba(255,237,214,0.25)] my-1.5" />
            <p className="font-mono text-[10px] text-[#94a3b8] leading-relaxed">
              Predicting catastrophic distributed microservice cascades 45s before SLAs breach.
            </p>
          </div>

          {/* Bottom-Right Editorial Copy & Live Widget */}
          <div className="absolute right-6 sm:right-12 top-[60vh] hidden lg:flex flex-col items-end gap-2 max-w-[270px] text-right">
            <p className="font-sans text-[11px] text-[#ffedd6] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Sub-350ms root cause diagnosis via System 1 Reflex Inception. Zero panic, pre-failure interception.
            </p>
            <div
              onClick={onTryItNow}
              className="flex items-center gap-2 p-1.5 pr-3 bg-[#0d0f17]/92 hover:bg-[#151926] border border-[#ff8539]/40 hover:border-[#ff8539] rounded-2xl shadow-[0_10px_25px_rgba(255,133,57,0.18)] cursor-pointer transition-all group pointer-events-auto"
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
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 3: FRAME 2 SUBTLE STUDIO CALIPER (TOP BAR - DESKTOP ONLY) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: frame2HudOpacity, y: frame2HudY }}
          className="absolute top-20 sm:top-22 left-0 right-0 z-20 px-6 sm:px-12 pointer-events-none hidden sm:flex items-center justify-between"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#94a3b8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
            <span>APPARATUS // ON-DEVICE SYSTEM ACTIVE</span>
          </div>
          <div className="font-mono text-[10px] text-[#ffedd6]/70">
            [ CALIBRATED FOR CRASHLENS 12-NODE TOPOLOGY ]
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 4: THE PHONE (LIFTS OFF DESK TO DEAD CENTER IN FRAME 2, THEN MOVES DOWN & LAYS FLAT IN FRAME 3) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none [perspective:1400px]">
          {/* Animated Motion Container Controlling Liftoff, Position & 3D Tilt */}
          <motion.div
            style={{
              y: phoneTranslateY,
              z: phoneTranslateZ,
              scale: phoneScale,
              rotateX: phoneInteractiveRotateX,
              rotateY: phoneInteractiveRotateY,
              rotateZ: phoneRotateZ,
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center will-change-transform transform-gpu scale-[0.88] sm:scale-100"
          >
            {/* Contact Shadow beneath phone on the desk (fades as phone lifts) */}
            <motion.div
              style={{ opacity: matShadowOpacity }}
              className="absolute top-1/2 w-[260px] sm:w-[290px] lg:w-[320px] h-[300px] bg-black/90 rounded-[56px] blur-3xl pointer-events-none"
            />

            {/* Upright Floating Ambient Shadow (Frame 2) */}
            <motion.div
              style={{ opacity: frame2ShadowOpacity }}
              className="absolute top-1/2 w-[270px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[500px] sm:h-[525px] md:h-[545px] lg:h-[560px] -translate-y-1/2 bg-black/85 rounded-[52px] blur-2xl pointer-events-none -z-10"
            />

            {/* Ground Flat Shadow beneath phone in Frame 3 when laying flat */}
            <motion.div
              style={{
                opacity: flatShadowOpacity,
                scaleX: flatShadowScaleX,
                scaleY: flatShadowScaleY,
              }}
              className="absolute -bottom-12 w-[340px] sm:w-[380px] lg:w-[420px] h-[110px] bg-black/95 rounded-[50%] blur-2xl pointer-events-none -z-20 transform-gpu"
            />

            {/* Dynamic Grazing Light Sheen across Ceramic Shield glass during tilt */}
            <motion.div
              style={{ opacity: grazingSheenOpacity }}
              className="absolute inset-0 rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] pointer-events-none z-30"
            >
              <div
                className="w-full h-full rounded-[44px] sm:rounded-[48px] lg:rounded-[52px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 237, 214, 0.28) 0%, rgba(255, 180, 100, 0.12) 30%, transparent 65%)",
                  mixBlendMode: "screen",
                }}
              />
            </motion.div>

            {/* AI Filaments & Synaptic Convergence Rings (Active during reassembly [0.83 -> 0.90]) */}
            <motion.div
              style={{ opacity: reassemblyFilamentsOpacity }}
              className="absolute inset-0 pointer-events-none -z-5 flex items-center justify-center"
            >
              {/* Outer Pulsing Particle Ring */}
              <div className="absolute w-[440px] sm:w-[500px] h-[640px] sm:h-[720px] rounded-[60px] border border-[#ff8539]/40 animate-pulse [animation-duration:2s]" />
              {/* Concentric Cyan Filament */}
              <div className="absolute w-[380px] sm:w-[440px] h-[580px] sm:h-[660px] rounded-[56px] border border-[#38bdf8]/35 border-dashed animate-spin [animation-duration:24s]" />
              {/* Converging Amber Particle Beams */}
              <div className="absolute -inset-16 bg-[radial-gradient(circle_at_center,rgba(255,133,57,0.18)_0%,rgba(56,189,248,0.08)_45%,transparent_70%)] blur-xl" />
            </motion.div>

            {/* Reassembly Impact Shockwave Flash (Fires when slices snap shut) */}
            <motion.div
              style={{
                opacity: reassemblyFlashOpacity,
                scale: reassemblyShockwaveScale,
              }}
              className="absolute w-[360px] h-[560px] rounded-[52px] bg-gradient-to-r from-[#ff8539]/30 via-white/40 to-[#38bdf8]/30 blur-md pointer-events-none z-40 transform-gpu"
            />

            {/* Persistent Ambient AI Halo behind reassembled chassis */}
            <motion.div
              style={{ opacity: aiGlowOpacity }}
              className="absolute -inset-10 rounded-[64px] pointer-events-none -z-10"
            >
              <div className="w-full h-full rounded-[64px] bg-[radial-gradient(ellipse_at_center,rgba(255,133,57,0.22)_0%,rgba(56,189,248,0.12)_45%,transparent_75%)] blur-2xl" />
            </motion.div>



            {/* The High-Fidelity 6-Layer Exploded Architecture Phone */}
            <ExplodedChoreographyLayers
              explosionProgress={explosionProgress}
              activeLayerId={activeLayerId}
              onHoverLayer={setHoveredLayerId}
              onOpenPlayground={onTryItNow}
              aiGlowOpacity={aiGlowOpacity}
              className="pointer-events-auto"
            />
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 5: FRAME 2 SIDE FLANKS (APP NAME on LEFT, ENGINEERED BY HAND on RIGHT) */}
        {/* ========================================================================= */}
        {/* FRAME 2 - LEFT FLANK: APP NAME & ARCHITECTURE */}
        <motion.div
          style={{ opacity: frame2SideOpacity, x: frame2LeftX }}
          className="absolute left-8 sm:left-12 md:left-16 lg:left-24 xl:left-32 2xl:left-40 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-start max-w-[240px] lg:max-w-[280px] xl:max-w-[310px] pointer-events-none select-none will-change-transform transform-gpu"
        >
          {/* Caliper Eyebrow */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[9px] sm:text-[10px] text-[#ff8539] uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
            <span>APP // SYSTEM CORE</span>
          </div>

          {/* App Name Display Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-extrabold tracking-[-0.03em] text-[#ffedd6] leading-[0.92] uppercase">
            {SITE_CONFIG.brand.name}
          </h2>

          <p className="font-mono text-xs sm:text-[13px] text-[#ff8539] font-bold tracking-wider uppercase mt-1.5">
            PREDICTIVE FAILURE RADAR
          </p>

          {/* Caliper Hairline Divider */}
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#ff8539] via-[rgba(255,237,214,0.2)] to-transparent my-3.5" />

          {/* Plain-Language Mission Description */}
          <p className="font-sans text-xs text-[#94a3b8] leading-relaxed">
            {SITE_CONFIG.brand.subtitle}
          </p>

          {/* Caliper Spec Footer */}
          <div className="mt-4 flex items-center gap-2 font-mono text-[9px] text-[#ffedd6]/50">
            <span className="text-[#38bdf8]">[01]</span>
            <span>ON-DEVICE &middot; EDGE RUNTIME</span>
          </div>
        </motion.div>

        {/* FRAME 2 - RIGHT FLANK: CRAFT PHILOSOPHY (ENGINEERED BY HAND, BUILT BY AI) */}
        <motion.div
          style={{ opacity: frame2SideOpacity, x: frame2RightX }}
          className="absolute right-12 sm:right-16 md:right-20 lg:right-28 xl:right-36 2xl:right-44 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end text-right max-w-[240px] lg:max-w-[280px] xl:max-w-[310px] pointer-events-none select-none will-change-transform transform-gpu"
        >
          {/* Caliper Eyebrow */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[9px] sm:text-[10px] text-[#38bdf8] uppercase tracking-[0.2em] justify-end">
            <span>CRAFT PHILOSOPHY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          </div>

          {/* Slogan */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-extrabold tracking-[-0.03em] text-[#ffedd6] leading-[1.05] uppercase">
            ENGINEERED<br />
            <span className="text-[#f4efe6]/80">BY HAND.</span><br />
            <span className="text-[#ff8539] drop-shadow-[0_0_24px_rgba(255,133,57,0.4)]">BUILT BY AI.</span>
          </h3>

          {/* Caliper Hairline Divider */}
          <div className="w-20 h-[1px] bg-gradient-to-l from-[#ff8539] via-[rgba(255,237,214,0.2)] to-transparent my-3.5" />

          {/* Philosophy Note */}
          <p className="font-sans text-xs text-[#94a3b8] leading-relaxed">
            Tactile physical ergonomics translated into instantaneous software heuristics with zero latency.
          </p>

          {/* Caliper Spec Footer */}
          <div className="mt-4 flex items-center gap-2 font-mono text-[9px] text-[#ffedd6]/50 justify-end">
            <span>[ 12MS P99 &middot; TACTILE MOTION ]</span>
            <span className="text-[#ff8539]">[02]</span>
          </div>
        </motion.div>

        {/* Mobile Frame 2 Subtitle Reveal (Stacked cleanly above & below phone) */}
        <motion.div
          style={{ opacity: frame2SideOpacity }}
          className="absolute top-20 inset-x-4 z-20 md:hidden flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[9px] text-[#ff8539] uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
            {`${SITE_CONFIG.brand.name} · PROBLEM SOLVER`}
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: frame2SideOpacity }}
          className="absolute bottom-16 inset-x-4 z-20 md:hidden flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-[family-name:var(--font-display)] text-xs font-bold text-[#ffedd6] uppercase tracking-tight">
            ENGINEERED BY HAND. <span className="text-[#ff8539]">BUILT BY AI.</span>
          </span>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 6: FRAME 4 SIDE FLANKS ("WHAT IT IS" on LEFT, "HOW IT IS IMPLEMENTED" on RIGHT) */}
        {/* ========================================================================= */}

        {/* PURE EXPLOSION PHASE CALLOUT: Appears when all 6 slices are floating in 3D before inspection */}
        <motion.div
          style={{ opacity: explosionHoldBadgeOpacity }}
          className="absolute top-22 sm:top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center text-center px-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0f16]/90 border border-amber-500/35 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.85)] font-mono text-[11px] sm:text-xs text-[#ffedd6]">
            <span className="w-2 h-2 rounded-full bg-[#ff8539] animate-ping" />
            <span className="font-bold text-[#ff8539]">STAGE 02 //</span>
            <span>6 RUNTIME SLICES DECONSTRUCTED</span>
          </div>
          <span className="mt-2 font-mono text-[9px] text-[#94a3b8] uppercase tracking-[0.2em]">
            SCROLL TO INSPECT EACH LAYER ONE BY ONE ↓
          </span>
        </motion.div>

        {/* Top Caliper HUD for Frame 4 (Desktop only) */}
        <motion.div
          style={{ opacity: frame4HudOpacity }}
          className="absolute top-20 sm:top-22 left-0 right-0 z-30 px-6 sm:px-12 pointer-events-auto hidden md:flex items-center justify-between"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#ff8539]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
            <span>STAGE 02 // ARCHITECTURE DECONSTRUCTED</span>
          </div>

          {/* Interactive 6-Layer Stepper */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0d0f16]/90 border border-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
            {STACK_LAYERS.map((layer) => {
              const isSelected = (hoveredLayerId ?? selectedLayerId) === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    playTactileClick(1200, 0.03);
                    setSelectedLayerId(layer.id);
                  }}
                  onMouseEnter={() => setHoveredLayerId(layer.id)}
                  onMouseLeave={() => setHoveredLayerId(null)}
                  className={`px-3 py-1 rounded-xl font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#ffedd6] text-[#07080a] shadow-md scale-105"
                      : "text-[#94a3b8] hover:text-[#ffedd6] hover:bg-white/5"
                  }`}
                >
                  <span>0{layer.id}</span>
                  <span className="hidden xl:inline">{layer.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[10px] text-[#ffedd6]/70">
            [ SCROLL OR CLICK TO INSPECT EACH LAYER ]
          </div>
        </motion.div>

        {/* FRAME 4 - LEFT FLANK: "WHAT IT IS" (ONE LAYER AT A TIME IN BIG LETTERS) */}
        <motion.div
          style={{ opacity: whatItIsOpacity, x: whatItIsX }}
          className="absolute left-6 sm:left-8 md:left-10 lg:left-14 xl:left-20 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-start max-w-[320px] lg:max-w-[390px] xl:max-w-[440px] pointer-events-auto select-none"
        >
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em]">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentLayer.color }}
            />
            <span style={{ color: currentLayer.color }}>
              {currentLayer.badge}
            </span>
          </div>

          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#ffedd6]/50 uppercase tracking-widest">
            <span>WHAT IT IS</span>
            <span>&middot;</span>
            <span className="text-[#ffedd6] font-bold">
              [ 0{currentLayer.id} / 06 ]
            </span>
          </div>

          {/* BIG DISPLAY LETTERS: The Layer Name */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-display)] font-black tracking-[-0.04em] text-[#ffedd6] leading-[0.92] uppercase min-h-[1.9em]">
                  {currentLayer.bigTitle1}
                  <br />
                  <span
                    style={{ color: currentLayer.color }}
                    className="drop-shadow-[0_0_30px_rgba(255,237,214,0.3)]"
                  >
                    {currentLayer.bigTitle2}
                  </span>
                </h2>

                {/* Caliper Hairline Divider */}
                <div
                  className="w-24 h-[2px] my-3.5"
                  style={{
                    background: `linear-gradient(to right, ${currentLayer.color}, transparent)`,
                  }}
                />

                {/* Plain-Language Description in large readable typography */}
                <p className="font-sans text-xs sm:text-sm lg:text-base text-[#f4efe6] font-normal leading-relaxed">
                  {currentLayer.caption}
                </p>

                {/* High-Impact Highlights / Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {currentLayer.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[9.5px] text-[#ffedd6]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FRAME 4 - RIGHT FLANK: "HOW IT IS IMPLEMENTED" (ONE LAYER AT A TIME IN BIG LETTERS) */}
        <motion.div
          style={{ opacity: howItIsOpacity, x: howItIsX }}
          className="absolute right-6 sm:right-8 md:right-10 lg:right-14 xl:right-20 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end text-right max-w-[320px] lg:max-w-[390px] xl:max-w-[440px] pointer-events-auto select-none"
        >
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[9.5px] sm:text-[10.5px] text-[#38bdf8] uppercase tracking-[0.2em] justify-end">
            <span>PRODUCTION IMPLEMENTATION</span>
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          </div>

          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#ffedd6]/50 uppercase tracking-widest justify-end">
            <span>HOW IT IS BUILT</span>
            <span>&middot;</span>
            <span className="text-[#38bdf8] font-bold">
              [ 0{currentLayer.id} / 06 ]
            </span>
          </div>

          {/* BIG DISPLAY LETTERS: The Implementation Tech */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col items-end"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-display)] font-black tracking-[-0.04em] text-[#ffedd6] leading-[0.92] uppercase min-h-[1.9em]">
                  {currentLayer.bigTech1}
                  <br />
                  <span className="text-[#38bdf8] drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                    {currentLayer.bigTech2}
                  </span>
                </h3>

                {/* Caliper Hairline Divider */}
                <div className="w-24 h-[2px] bg-gradient-to-l from-[#38bdf8] via-[rgba(255,237,214,0.2)] to-transparent my-3.5" />

                {/* Technical Implementation Note */}
                <p className="font-mono text-xs sm:text-sm text-[#94a3b8] leading-relaxed max-w-[360px]">
                  {currentLayer.implementationDetail}
                </p>

                {/* Benchmark Caliper Box */}
                <div className="mt-4 p-2.5 rounded-xl bg-[#0d0f16]/90 border border-white/10 font-mono text-[9.5px] text-right space-y-1">
                  <div className="text-[#ffedd6] flex items-center justify-end gap-2">
                    <span className="text-[#94a3b8]">TELEMETRY:</span>
                    <span className="font-bold text-[#38bdf8]">
                      {currentLayer.telemetry}
                    </span>
                  </div>
                  <div className="text-emerald-400 flex items-center justify-end gap-2">
                    <span className="text-[#94a3b8]">BENCHMARK:</span>
                    <span className="font-bold text-emerald-400">
                      {currentLayer.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Frame 4 Layer Inspector Bar & Toggle (Positioned cleanly at top beneath header) */}
        <motion.div
          style={{ opacity: whatItIsOpacity }}
          className="absolute top-20 sm:top-24 inset-x-3 z-30 md:hidden flex flex-col items-center pointer-events-auto"
        >
          {/* Layer Selector Chips [01] to [06] */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/85 border border-white/10 mb-2 backdrop-blur-md">
            {STACK_LAYERS.map((layer) => {
              const isSelected = currentLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    playTactileClick(1200, 0.02);
                    setSelectedLayerId(layer.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all ${
                    isSelected
                      ? "bg-[#ffedd6] text-[#07080a] shadow-sm scale-105"
                      : "text-[#94a3b8] hover:text-[#ffedd6]"
                  }`}
                >
                  0{layer.id}
                </button>
              );
            })}
          </div>

          {/* Active Card in BIG BOLD LETTERS */}
          <div className="w-full max-w-[340px] p-3 rounded-2xl bg-[#0d0f16]/95 border border-[rgba(255,237,214,0.15)] backdrop-blur-md text-center shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-widest block mb-0.5"
              style={{ color: currentLayer.color }}
            >
              {currentLayer.badge} &middot; [0{currentLayer.id}/06]
            </span>

            {/* BIG LETTERS ON MOBILE */}
            <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-display)] font-black tracking-tight text-[#ffedd6] uppercase leading-tight">
              {currentLayer.name}
            </h2>

            <p className="font-mono text-[10px] text-[#38bdf8] font-bold uppercase tracking-wider mt-0.5">
              {currentLayer.tech} &middot; {currentLayer.metric}
            </p>

            <p className="font-sans text-[11px] text-[#f4efe6]/90 mt-1 leading-snug">
              {currentLayer.caption}
            </p>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 6B: PHASE 4C - "POWERED BY AI*" (1:1 ORYZO DESIGN & CRAFTSMANSHIP) */}
        {/* ========================================================================= */}

        {/* 1. TOP HEADER: "Powered by AI*" with CRASHLENS-1 nested underneath */}
        <motion.div
          style={{ opacity: poweredByAiOpacity }}
          className="absolute left-1/2 -translate-x-1/2 top-10 sm:top-14 md:top-16 text-center z-30 pointer-events-none select-none hidden md:block"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-[family-name:var(--font-display)] font-medium text-[#ffedd7] tracking-[-0.018em] uppercase leading-none whitespace-nowrap">
              Powered by AI<sup className="text-[0.45em] ml-0.5 text-[#ffedd7] align-super">*</sup>
            </h1>
            <h4 className="absolute right-1 sm:right-2 -bottom-4 sm:-bottom-5 md:-bottom-6 font-[family-name:var(--font-display)] text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#dc5000] tracking-wider uppercase">
              CRASHLENS-1
            </h4>
          </div>
        </motion.div>

        {/* 2. LEFT FLANK (#ai-pre): "isn’t just monitoring." + body description */}
        <motion.div
          style={{ opacity: poweredByAiOpacity, x: poweredByAiLeftX }}
          className="absolute left-6 sm:left-10 lg:left-16 xl:left-24 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-start max-w-[260px] lg:max-w-[340px] xl:max-w-[380px] pointer-events-none select-none"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-display)] font-medium uppercase text-[#ffedd7] leading-[0.95] tracking-tight mb-4">
            isn’t just <br />monitoring.
          </h2>
          <div className="font-sans text-sm sm:text-base lg:text-lg text-[#ffedd7]/80 font-normal leading-snug space-y-0.5">
            <span className="block">CrashLens isn’t just monitoring.</span>
            <span className="block">It’s an autonomous pre-failure</span>
            <span className="block">distributed interception engine.</span>
          </div>
        </motion.div>

        {/* 3. BOTTOM LEFT (#ai-instruction): Hand icon with dashed rule + "Try to hover phone" */}
        <motion.div
          style={{ opacity: poweredByAiOpacity }}
          className="absolute left-6 sm:left-10 lg:left-16 xl:left-24 bottom-16 sm:bottom-20 z-20 hidden md:flex flex-col items-start gap-2 w-36 lg:w-44 pointer-events-none select-none"
        >
          <svg viewBox="0 0 32 40" className="w-6 h-8 text-[#ffedd7] opacity-60 mb-1">
            <path
              fill="currentColor"
              d="M6.718 22.615V17.36c-.325.341-.659.696-.986 1.058-1.276 1.407-2.352 2.76-2.775 3.622-.293.602-.263 1.344.017 2.186.271.816.721 1.549 1.03 2.016l5.182 6.817a5.1 5.1 0 0 1 1.04 3.085v2.231a1.375 1.375 0 0 1-2.75 0v-2.231c0-.515-.169-1.012-.48-1.421v-.001l-5.214-6.859-.028-.036-.025-.038c-.34-.513-.97-1.506-1.365-2.696-.393-1.182-.616-2.748.124-4.262v-.002c.616-1.254 1.946-2.867 3.207-4.258a64 64 0 0 1 3.023-3.103V6.902a4.156 4.156 0 0 1 5.711-3.851 4.155 4.155 0 0 1 8.153.86c.466-.175.966-.27 1.483-.27A4.167 4.167 0 0 1 26.23 7.68a4.133 4.133 0 0 1 5.52 3.893v15.933c0 2.3-.866 4.735-3.162 7.469h.001c-.444.53-.681 1.14-.681 1.727v1.673a1.375 1.375 0 1 1-2.75 0v-1.673c0-1.332.533-2.55 1.324-3.493v-.001C28.46 30.854 29 29.024 29 27.506V11.572a1.383 1.383 0 1 0-2.767.008v8.293a1.375 1.375 0 1 1-2.75 0V7.808c0-.782-.635-1.417-1.418-1.417-.82 0-1.474.67-1.474 1.415v10.23a1.375 1.375 0 0 1-2.75 0V4.153a1.406 1.406 0 0 0-2.81 0v11.974a1.375 1.375 0 0 1-2.75 0V6.902l-.007-.142a1.406 1.406 0 0 0-2.806.142v15.713a1.375 1.375 0 0 1-2.75 0"
            />
          </svg>
          <div className="w-full h-[1px] opacity-40 [background:repeating-linear-gradient(90deg,#ffedd7_0_2px,transparent_0_4px)]" />
          <div className="font-mono text-[10px] text-[#ffedd7]/60 uppercase tracking-widest">
            Try to hover phone
          </div>
        </motion.div>

        {/* 4. RIGHT FLANK (#ai-desc): Witty copy matching Oryzo style */}
        <motion.div
          style={{ opacity: poweredByAiOpacity, x: poweredByAiRightX }}
          className="absolute right-6 sm:right-10 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end text-right max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] pointer-events-none select-none"
        >
          <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-[#ffedd7] leading-tight space-y-1">
            <span className="block text-[#dc5000]">Reflex fills in the gaps.</span>
            <span className="block">We said sub-350ms.</span>
            <span className="block text-[#ffedd7]/70">It intercepted cascade.</span>
          </div>
        </motion.div>

        {/* 5. BOTTOM RIGHT (#ai-disclaimer-wrapper): Dashed rule + Disclaimer */}
        <motion.div
          style={{ opacity: poweredByAiOpacity }}
          className="absolute right-6 sm:right-10 lg:right-16 xl:right-24 bottom-16 sm:bottom-20 z-20 hidden md:flex flex-col items-end text-right max-w-[280px] pointer-events-none select-none"
        >
          <div className="w-32 h-[1px] opacity-40 [background:repeating-linear-gradient(90deg,#ffedd7_0_2px,transparent_0_4px)] mb-2" />
          <div className="font-mono text-[10px] text-[#ffedd7]/50 uppercase tracking-widest leading-relaxed">
            * Autonomous Pre-Failure Radar Engine
          </div>
        </motion.div>

        {/* 6. MOBILE RESPONSIVE VERSION */}
        <motion.div
          style={{ opacity: poweredByAiOpacity }}
          className="absolute inset-x-4 top-20 z-30 md:hidden flex flex-col items-center pointer-events-none select-none text-center"
        >
          <div className="relative inline-block mb-3">
            <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-display)] font-medium text-[#ffedd7] tracking-[-0.018em] uppercase leading-none">
              Powered by AI<sup className="text-[0.45em] ml-0.5 text-[#ffedd7] align-super">*</sup>
            </h1>
            <h4 className="font-mono text-xs font-bold text-[#dc5000] tracking-widest uppercase mt-1">
              CRASHLENS-1
            </h4>
          </div>
          <p className="text-xs text-[#ffedd7]/80 max-w-[280px] leading-relaxed">
            CrashLens isn’t just monitoring. All 6 deconstructed runtime layers reassemble into an autonomous pre-failure radar.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* LAYER 7: BOTTOM CALIPER BAR & HAPTIC CONTROLS (SEAMLESS GRADIENT VIGNETTE) */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 inset-x-0 z-30 w-full px-6 sm:px-12 pt-16 pb-5 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 via-40% to-transparent border-0 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#94a3b8] pointer-events-none">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playTactileClick(1000, 0.05);
            }}
            className="flex items-center gap-1.5 hover:text-[#ffedd6] transition-colors cursor-pointer pointer-events-auto"
            title="Toggle Tactile Haptics"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#ff8539]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="uppercase tracking-wider">
              HAPTICS: {soundEnabled ? "ON" : "OFF"}
            </span>
          </button>

          {/* Center Scroll Prompt (Multi-Phase Crossfade) */}
          <div className="hidden sm:flex items-center justify-center text-[#ffedd6]/80 tracking-widest uppercase relative h-5 w-96 max-w-full">
            <motion.div
              style={{ opacity: prompt1Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none whitespace-nowrap"
            >
              <span>SCROLL TO LIFT DEVICE</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: prompt2Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none whitespace-nowrap"
            >
              <span>SCROLL TO LAY FLAT</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: prompt3Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none whitespace-nowrap"
            >
              <span>SCROLL TO EXPLODE ARCHITECTURE</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: promptExplodedHoldOpacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#ff8539] pointer-events-none whitespace-nowrap"
            >
              <span>6 RUNTIME SLICES DECONSTRUCTED · SCROLL TO INSPECT</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: prompt4Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#ffedd6] pointer-events-none whitespace-nowrap"
            >
              <span>STAGE 02 // INSPECTING ARCHITECTURE [ 0{currentLayer.id} / 06 ]</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: promptReassembleOpacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#ff8539] pointer-events-none whitespace-nowrap"
            >
              <span>CONVERGING LAYERS · REASSEMBLING UNIFIED CHASSIS</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: promptPoweredByAiOpacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#38bdf8] pointer-events-none whitespace-nowrap"
            >
              <span>STAGE 02 COMPLETE // POWERED BY ARTIFICIAL INTELLIGENCE</span>
              <ArrowDown className="w-3 h-3 text-[#38bdf8] animate-bounce" />
            </motion.div>
            <motion.div
              style={{ opacity: prompt5Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#38bdf8] pointer-events-none whitespace-nowrap"
            >
              <span>STAGE 03 // CORE CAPABILITIES</span>
              <ArrowDown className="w-3 h-3 text-[#38bdf8] animate-bounce" />
            </motion.div>
          </div>

          {/* Caliper Telemetry */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">[+142, -84]</span>
            <span className="text-[#ffedd6] font-bold">12MS P99</span>
          </div>
        </div>
      </div>

      {/* Anchor for Stage 2 Detection in Global Stage Indicator */}
      <div id="stage-2" className="absolute top-[52%] pointer-events-none" />
    </div>
  );
}

export default HeroToDeviceChoreography;
