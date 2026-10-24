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
} from "lucide-react";

interface HeroToDeviceChoreographyProps {
  onTryItNow?: () => void;
}

export function HeroToDeviceChoreography({
  onTryItNow,
}: HeroToDeviceChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [knifeHovered, setKnifeHovered] = useState(false);
  const [penHovered, setPenHovered] = useState(false);
  const [pencilHovered, setPencilHovered] = useState(false);
  const [clipsHovered, setClipsHovered] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [hoveredLayerId, setHoveredLayerId] = useState<number | null>(null);
  const activeLayerId = hoveredLayerId ?? selectedLayerId;
  const currentLayer =
    STACK_LAYERS.find((l) => l.id === activeLayerId) || STACK_LAYERS[0];

  // Mouse parallax for subtle studio depth
  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(xNorm * 8);
      mouseY.set(yNorm * 8);
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

  // Silky 120 FPS spring physics smoothing on scroll momentum (cinematic dolly crane feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 26,
    mass: 0.32,
    restDelta: 0.0001,
  });

  // Scroll-driven active layer synchronization across Frame 4 exploded stage [0.54 ➔ 0.94]
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (hoveredLayerId !== null) return;
    if (progress >= 0.54 && progress < 0.60) {
      setSelectedLayerId(1);
    } else if (progress >= 0.60 && progress < 0.66) {
      setSelectedLayerId(2);
    } else if (progress >= 0.66 && progress < 0.72) {
      setSelectedLayerId(3);
    } else if (progress >= 0.72 && progress < 0.78) {
      setSelectedLayerId(4);
    } else if (progress >= 0.78 && progress < 0.84) {
      setSelectedLayerId(5);
    } else if (progress >= 0.84 && progress <= 0.94) {
      setSelectedLayerId(6);
    }
  });

  // =========================================================================
  // CINEMATIC TRANSITIONS:
  // FRAME 1 (HERO DESK) ➔ FRAME 2 (CENTERED PHONE) ➔ FRAME 3 (LAY FLAT AT BOTTOM) ➔ FRAME 4 (EXPLODED SCREEN)
  // =========================================================================

  // 1. Desk background (oak table, green mat, stationery) dissolves to black [0.00, 0.18]
  const deskOpacity = useTransform(smoothProgress, [0.0, 0.18], [1, 0]);
  const deskScale = useTransform(smoothProgress, [0.0, 0.18], [1, 1.05]);

  // 2. Hero Headline and corner cards dissolve & drift upward [0.00, 0.14]
  const heroUiOpacity = useTransform(smoothProgress, [0.0, 0.14], [1, 0]);
  const heroUiY = useTransform(smoothProgress, [0.0, 0.14], [0, -45]);

  // 3. Phone Liftoff from bottom peeking dock to center, then moves down & lays flat in Frame 3
  // Hermite S-curve interpolation for velvety cinematic ease-in, peak velocity, and cushion landing
  const phoneTranslateY = useTransform(
    smoothProgress,
    [
      0.00, 0.08, 0.12, 0.16, 0.20, 0.24, // Phase 1: liftoff from dock to center
      0.36,                               // Phase 2: center showcase hold
      0.40, 0.44, 0.48, 0.52, 0.56,       // Phase 3: Hermite S-curve downward glide
      1.00                                // Frame 3 & 4: resting flat at 25vh
    ],
    [
      "34vh", "34vh", "26vh", "15vh", "4vh", "0vh",
      "0vh",
      "1.5vh", "6.5vh", "15.5vh", "22.5vh", "25vh",
      "25vh"
    ]
  );

  // Decoupled follow-through pitch tilt (starts slightly after descent, cushions into 68deg)
  const phoneRotateX = useTransform(
    smoothProgress,
    [
      0.00, 0.38,                         // Upright through Frame 1 & 2
      0.41, 0.45, 0.49, 0.53, 0.56,       // Decoupled follow-through pitch tilt
      1.00
    ],
    [
      "0deg", "0deg",
      "4deg", "18deg", "42deg", "62deg", "68deg",
      "68deg"
    ]
  );

  // Z-depth spatial recession (phone steps back into 3D stage volume as it tilts flat)
  const phoneTranslateZ = useTransform(
    smoothProgress,
    [0.00, 0.38, 0.44, 0.50, 0.56, 1.00],
    ["0px", "0px", "-25px", "-55px", "-75px", "-75px"]
  );

  // Subtle organic roll dynamic for physical weighted feel
  const phoneRotateZ = useTransform(
    smoothProgress,
    [0.00, 0.40, 0.46, 0.54, 1.00],
    ["0deg", "0deg", "-1.1deg", "0deg", "0deg"]
  );

  // Scale expansion to preserve hero presence as phone lays flat
  const phoneScale = useTransform(
    smoothProgress,
    [
      0.00, 0.12, 0.24,
      0.36,
      0.46, 0.56,
      1.00
    ],
    [
      0.96, 0.97, 1.0,
      1.0,
      1.03, 1.075,
      1.075
    ]
  );

  // 4. Contact shadow on mat fades as phone lifts into the air [0.00, 0.16]
  const matShadowOpacity = useTransform(smoothProgress, [0.0, 0.16], [1, 0]);

  // 5. Ambient Floating Shadow behind upright phone in Frame 2, fading as it tilts flat
  const frame2ShadowOpacity = useTransform(
    smoothProgress,
    [0.16, 0.24, 0.36, 0.46],
    [0, 1, 1, 0]
  );

  // 6. Flat Ground Shadow underneath phone in Frame 3 as it lays flat (expands and softens)
  const flatShadowOpacity = useTransform(
    smoothProgress,
    [0.44, 0.52, 0.58, 1.00],
    [0, 0.45, 0.95, 0.95]
  );
  const flatShadowScaleX = useTransform(
    smoothProgress,
    [0.44, 0.58, 1.00],
    [0.65, 1.28, 1.28]
  );
  const flatShadowScaleY = useTransform(
    smoothProgress,
    [0.44, 0.58, 1.00],
    [0.35, 0.95, 0.95]
  );

  // 7. Dynamic Grazing Light Sheen across Ceramic Shield glass during tilt
  const grazingSheenOpacity = useTransform(
    smoothProgress,
    [0.45, 0.54, 0.60, 0.70],
    [0, 0.35, 0.45, 0.0]
  );

  // 8. Oryzo-style Corner Atmospheric Backlight on stage (remains throughout dark stage)
  const backlightOpacity = useTransform(smoothProgress, [0.12, 0.22], [0, 1]);

  // 9. Frame 2 Flanks: App Name (Left) and "Engineered by Hand, Built by AI" (Right)
  // Fades in for Frame 2 [0.18, 0.24], holds, then glides smoothly outward on exit [0.34, 0.40]
  const frame2SideOpacity = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [0, 1, 1, 0]
  );
  const frame2LeftX = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [-40, 0, 0, -65]
  );
  const frame2RightX = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [40, 0, 0, 65]
  );

  // 10. Frame 2 studio HUD / caliper badge [0.18, 0.24, 0.34, 0.40]
  const frame2HudOpacity = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [0, 1, 1, 0]
  );
  const frame2HudY = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [15, 0, 0, -18]
  );

  // =========================================================================
  // FRAME 4: THE EXPLODING SCREEN PART (6 FLOATING SLICES + WHAT IT IS & HOW IT IS IMPLEMENTED)
  // =========================================================================

  // Continuous scroll-driven separation of the 6 layers [0.52 ➔ 0.76]
  const explosionProgress = useTransform(
    smoothProgress,
    [0.52, 0.56, 0.62, 0.70, 0.76, 0.88, 1.00],
    [0.0, 0.12, 0.45, 0.82, 1.0, 1.0, 1.0]
  );

  // Frame 4 Left Flank: "WHAT IT IS" (matching user notebook sketch)
  const whatItIsOpacity = useTransform(
    smoothProgress,
    [0.54, 0.62, 0.88, 0.94],
    [0, 1, 1, 0]
  );
  const whatItIsX = useTransform(
    smoothProgress,
    [0.54, 0.62, 0.88, 0.94],
    [-45, 0, 0, -55]
  );

  // Frame 4 Right Flank: "HOW IT IS IMPLEMENTED" (matching user notebook sketch)
  const howItIsOpacity = useTransform(
    smoothProgress,
    [0.54, 0.62, 0.88, 0.94],
    [0, 1, 1, 0]
  );
  const howItIsX = useTransform(
    smoothProgress,
    [0.54, 0.62, 0.88, 0.94],
    [45, 0, 0, 55]
  );

  // Frame 4 Top Caliper HUD
  const frame4HudOpacity = useTransform(
    smoothProgress,
    [0.54, 0.62, 0.88, 0.94],
    [0, 1, 1, 0]
  );

  // Multi-Phase Scroll Cue in Lower Bar
  const prompt1Opacity = useTransform(smoothProgress, [0.0, 0.16], [1, 0]);
  const prompt2Opacity = useTransform(
    smoothProgress,
    [0.18, 0.24, 0.34, 0.40],
    [0, 1, 1, 0]
  );
  const prompt3Opacity = useTransform(
    smoothProgress,
    [0.40, 0.46, 0.52, 0.56],
    [0, 1, 1, 0]
  );
  const prompt4Opacity = useTransform(
    smoothProgress,
    [0.56, 0.64, 0.84, 0.89],
    [0, 1, 1, 0]
  );
  const prompt5Opacity = useTransform(smoothProgress, [0.91, 0.97], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[640vh] bg-[#07080a] select-none"
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

          {/* Tactile Props with Hover Physics */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {/* Paper Clips */}
            <motion.div
              onMouseEnter={() => {
                playTactileClick(1500, 0.03);
                setClipsHovered(true);
              }}
              onMouseLeave={() => setClipsHovered(false)}
              animate={{
                rotate: clipsHovered ? -12 : -8,
                scale: clipsHovered ? 1.08 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute left-6 sm:left-14 top-28 sm:top-36 w-20 sm:w-28 h-12 sm:h-16 pointer-events-auto cursor-pointer"
              style={{
                filter:
                  "drop-shadow(0 14px 24px rgba(0,0,0,0.75)) drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
              }}
              title="Silver Paper Clips"
            >
              <Image
                src="/images/paper_clips_cozy.png"
                alt="Paper Clips"
                width={268}
                height={178}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Eraser */}
            <div
              className="absolute left-10 sm:left-24 bottom-32 sm:bottom-40 w-16 sm:w-24 h-12 sm:h-16 pointer-events-auto cursor-pointer"
              style={{
                filter:
                  "drop-shadow(0 12px 20px rgba(0,0,0,0.7)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
              }}
              title="Koh-I-Noor Eraser"
            >
              <Image
                src="/images/eraser_block_cozy.png"
                alt="Eraser"
                width={274}
                height={156}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Wooden Pencil */}
            <motion.div
              onMouseEnter={() => {
                playTactileClick(700, 0.04);
                setPencilHovered(true);
              }}
              onMouseLeave={() => setPencilHovered(false)}
              animate={{
                rotate: pencilHovered ? -26 : -29,
                x: pencilHovered ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="absolute left-2 sm:left-8 bottom-16 sm:bottom-20 w-44 sm:w-60 h-10 sm:h-14 pointer-events-auto cursor-pointer hidden sm:block"
              style={{
                filter:
                  "drop-shadow(0 16px 28px rgba(0,0,0,0.8)) drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
              }}
              title="Cedar Drafting Pencil"
            >
              <Image
                src="/images/wood_pencil_cozy.png"
                alt="Wood Pencil"
                width={612}
                height={142}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Drafting Pen */}
            <motion.div
              onMouseEnter={() => {
                playTactileClick(900, 0.04);
                setPenHovered(true);
              }}
              onMouseLeave={() => setPenHovered(false)}
              animate={{
                rotate: penHovered ? -22 : -25,
                y: penHovered ? -3 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="absolute right-4 sm:right-12 top-28 sm:top-36 w-44 sm:w-64 h-12 sm:h-16 pointer-events-auto cursor-pointer"
              style={{
                filter:
                  "drop-shadow(0 14px 26px rgba(0,0,0,0.75)) drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
              }}
              title="Japanese Drafting Pen"
            >
              <Image
                src="/images/drafting_pen_cozy.png"
                alt="Drafting Pen"
                width={640}
                height={160}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Olfa Utility Knife */}
            <motion.div
              onMouseEnter={() => {
                playTactileClick(1100, 0.05);
                setKnifeHovered(true);
              }}
              onMouseLeave={() => setKnifeHovered(false)}
              animate={{
                rotate: knifeHovered ? 38 : 34,
                scale: knifeHovered ? 1.05 : 1,
                x: knifeHovered ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute right-4 sm:right-10 lg:right-16 bottom-14 sm:bottom-16 w-40 sm:w-52 lg:w-60 h-22 sm:h-28 pointer-events-auto cursor-pointer hidden sm:block"
              style={{
                filter:
                  "drop-shadow(-12px 22px 32px rgba(0,0,0,0.8)) drop-shadow(-3px 6px 9px rgba(0,0,0,0.5))",
              }}
              title="Olfa A-1 Utility Knife"
            >
              <Image
                src="/images/olfa_knife_cozy.png"
                alt="Olfa Utility Knife"
                width={844}
                height={245}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
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
              BUILT FOR ORCATHON 2026,<br />
              THE HIGH-STAKES APP ARENA.
            </h3>
            <div className="w-full border-b border-dotted border-[rgba(255,237,214,0.25)] my-1.5" />
            <p className="font-mono text-[10px] text-[#94a3b8] leading-relaxed">
              The world&apos;s most unnecessarily sophisticated web &amp; mobile problem-solving application.
            </p>
          </div>

          {/* Bottom-Right Editorial Copy & Live Widget */}
          <div className="absolute right-6 sm:right-12 top-[60vh] hidden lg:flex flex-col items-end gap-2 max-w-[270px] text-right">
            <p className="font-sans text-[11px] text-[#ffedd6] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Designed to ingest, compute, and resolve in sub-15ms. Orcathon makes the most complex problem feel effortless.
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
                  ORCATHON PLAY
                </span>
                <span className="font-[family-name:var(--font-display)] font-bold text-[10.5px] text-[#f4efe6]">
                  Launch App Playground →
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
            [ CALIBRATED FOR ORCATHON 2026 ]
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
              rotateX: phoneRotateX,
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

            {/* The High-Fidelity 6-Layer Exploded Architecture Phone */}
            <ExplodedChoreographyLayers
              explosionProgress={explosionProgress}
              activeLayerId={activeLayerId}
              onHoverLayer={setHoveredLayerId}
              onOpenPlayground={onTryItNow}
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
            PROBLEM SOLVER OS
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
              const isSelected = currentLayer.id === layer.id;
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
              style={{ opacity: prompt4Opacity }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[#ff8539] pointer-events-none whitespace-nowrap"
            >
              <span>STAGE 02 // 6-LAYER ARCHITECTURE [ EXPLODED ]</span>
              <ArrowDown className="w-3 h-3 text-[#ff8539] animate-bounce" />
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
