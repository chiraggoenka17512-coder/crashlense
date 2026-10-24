"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring } from "motion/react";
import { DeviceFrame } from "@/components/device/DeviceFrame";
import { CuttingMat } from "@/components/oryzo/CuttingMat";
import { SITE_CONFIG } from "@/config/site-config";
import {
  ArrowDown,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface OryzoHeroDeskProps {
  onTryItNow?: () => void;
  onSignIn?: () => void;
  onScrollNext?: () => void;
}

export function OryzoHeroDesk({
  onTryItNow,
  onScrollNext,
}: OryzoHeroDeskProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [knifeHovered, setKnifeHovered] = useState(false);
  const [penHovered, setPenHovered] = useState(false);
  const [pencilHovered, setPencilHovered] = useState(false);
  const [clipsHovered, setClipsHovered] = useState(false);

  // Mouse parallax springs for spatial studio depth
  const deskRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!deskRef.current) return;
      const rect = deskRef.current.getBoundingClientRect();
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

  return (
    <section
      id="stage-1"
      ref={deskRef}
      className="relative w-full h-screen max-h-screen bg-[#07080a] border-b border-[rgba(255,237,214,0.08)] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* ========================================================================= */}
      {/* 1. SEPARATE BACKGROUND LAYER: JAPANESE OAK TABLETOP + NATURAL SUNLIGHT */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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

        {/* Ambient Warm Golden Sunlight Beam & Natural Studio Shading */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 16%, rgba(255, 238, 215, 0.22) 0%, rgba(255, 220, 175, 0.08) 45%, transparent 72%), linear-gradient(135deg, rgba(255, 245, 230, 0.08) 0%, transparent 55%, rgba(0, 0, 0, 0.42) 100%)",
          }}
        />
        {/* Soft edge vignette keeping text and elements high-contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(7,8,10,0.85),transparent_75%)] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. SEPARATE A2 GREEN CUTTING MAT (TILTED -6.5° WITH GENEROUS BREATHING ROOM) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="relative w-[92vw] max-w-[1240px] h-[580px] sm:h-[640px] lg:h-[680px] -rotate-[6.5deg] translate-y-10 sm:translate-y-12 lg:translate-y-14 transition-transform duration-700"
        >
          <CuttingMat className="w-full h-full" />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEPARATE TACTILE CRAFT ITEMS (DISTRIBUTED TO PREVENT ANY CONGESTION) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {/* A. Silver Paper Clips (Upper Left on Japanese Oak Wood) */}
        <motion.div
          onMouseEnter={() => {
            playTactileClick(1500, 0.03);
            setClipsHovered(true);
          }}
          onMouseLeave={() => setClipsHovered(false)}
          animate={{
            scale: clipsHovered ? 1.08 : 1,
            rotate: clipsHovered ? -4 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="absolute left-6 sm:left-12 lg:left-16 top-[28%] w-20 sm:w-26 h-18 sm:h-24 pointer-events-auto cursor-pointer hidden md:block"
          style={{
            filter:
              "drop-shadow(-6px 12px 18px rgba(0,0,0,0.65)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.4))",
          }}
          title="Silver Paper Clips"
        >
          <Image
            src="/images/paper_clips_cozy.png"
            alt="Silver Paper Clips"
            width={619}
            height={527}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* B. Vintage Cedar Wood Drafting Pencil (Mid-Left on Oak Desk) */}
        <motion.div
          onMouseEnter={() => {
            playTactileClick(550, 0.04);
            setPencilHovered(true);
          }}
          onMouseLeave={() => setPencilHovered(false)}
          animate={{
            rotate: pencilHovered ? 26 : 22,
            scale: pencilHovered ? 1.05 : 1,
            x: pencilHovered ? 4 : 0,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="absolute left-4 sm:left-10 lg:left-14 top-[48%] w-44 sm:w-56 lg:w-64 h-12 sm:h-16 pointer-events-auto cursor-pointer hidden md:block"
          style={{
            filter:
              "drop-shadow(-8px 16px 22px rgba(0,0,0,0.7)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.45))",
          }}
          title="Japanese Cedar Wood Drafting Pencil"
        >
          <Image
            src="/images/wood_pencil_cozy.png"
            alt="Cedar Wood Drafting Pencil"
            width={917}
            height={132}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* C. Minimalist Japanese Ivory Drafting Pen (Upper Right on Cutting Mat) */}
        <motion.div
          onMouseEnter={() => {
            playTactileClick(750, 0.05);
            setPenHovered(true);
          }}
          onMouseLeave={() => setPenHovered(false)}
          animate={{
            rotate: penHovered ? -34 : -38,
            scale: penHovered ? 1.04 : 1,
            y: penHovered ? -4 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="absolute right-8 sm:right-16 lg:right-28 top-[18%] sm:top-[20%] w-44 sm:w-56 lg:w-64 h-14 sm:h-18 pointer-events-auto cursor-pointer hidden md:block"
          style={{
            filter:
              "drop-shadow(-10px 18px 26px rgba(0,0,0,0.72)) drop-shadow(-3px 5px 7px rgba(0,0,0,0.45))",
          }}
          title="Minimalist Drafting Pen"
        >
          <Image
            src="/images/drafting_pen_cozy.png"
            alt="Drafting Pen Stylus"
            width={873}
            height={144}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* D. Japanese Yellow Olfa Utility Cutter Knife (Bottom Right on Cutting Mat) */}
        <motion.div
          onMouseEnter={() => {
            playTactileClick(1200, 0.04);
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

      {/* ========================================================================= */}
      {/* 4. HERO BRAND HEADLINE: CLEAN EYEBROW + GIANT ORCATHON TITLE */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full px-6 sm:px-12 pt-24 sm:pt-26 lg:pt-28">
        {/* Sleek Eyebrow Pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ffedd6] inline-block shadow-[0_0_8px_rgba(255,237,214,0.6)]" />
          <span className="w-4 h-[2px] bg-[#ffedd6]/70 rounded-full inline-block" />
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ffedd6]/90">
            {SITE_CONFIG.brand.eyebrow}
          </span>
        </div>

        {/* Giant Display Title: ORCATHON */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[98px] font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.86] text-[#ffedd6] drop-shadow-[0_4px_28px_rgba(0,0,0,0.8)] select-none">
          {SITE_CONFIG.brand.name}
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* 5. CORNER CARDS: PINNED AWAY FROM TITLE TO PREVENT CONGESTION */}
      {/* ========================================================================= */}
      {/* A. Bottom-Left Frosted Glass Card (1:1 Oryzo composition, spacious) */}
      <div className="absolute left-6 sm:left-12 bottom-11 sm:bottom-12 z-30 pointer-events-auto hidden md:block">
        <div className="max-w-[250px] lg:max-w-[280px] p-3.5 sm:p-4 rounded-2xl bg-[#1d1915]/80 backdrop-blur-xl border border-[rgba(255,237,214,0.16)] shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-[#f4efe6]">
          <h3 className="font-[family-name:var(--font-display)] font-black text-xs sm:text-[12.5px] uppercase leading-snug text-[#ffedd6] mb-1.5">
            BUILT FOR ORCATHON 2026,<br />
            THE HIGH-STAKES APP ARENA.
          </h3>
          <div className="w-full border-b border-dotted border-[rgba(255,237,214,0.25)] my-1.5" />
          <p className="font-mono text-[10px] text-[#94a3b8] leading-relaxed">
            The world&apos;s most unnecessarily sophisticated web &amp; mobile problem-solving application.
          </p>
        </div>
      </div>

      {/* B. Bottom-Right Editorial Copy & Live Widget (Pinned cleanly above caliper bar) */}
      <div className="absolute right-6 sm:right-12 bottom-11 sm:bottom-12 z-30 pointer-events-auto hidden lg:flex flex-col items-end gap-2 max-w-[270px] text-right">
        <p className="font-sans text-[11px] text-[#ffedd6] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Designed to ingest, compute, and resolve in sub-15ms. Orcathon makes the most complex problem feel effortless.
        </p>
        <div
          onClick={onTryItNow}
          className="flex items-center gap-2 p-1.5 pr-3 bg-[#0d0f17]/92 hover:bg-[#151926] border border-[#ff8539]/40 hover:border-[#ff8539] rounded-2xl shadow-[0_10px_25px_rgba(255,133,57,0.18)] cursor-pointer transition-all group"
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

      {/* ========================================================================= */}
      {/* 6. CENTERPIECE: IPHONE 16 PRO GROUNDED PEEKING DOCK (~60% VISIBLE) */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end overflow-hidden mt-auto">
        {/* Peeking Stage: Grounded at bottom edge so ~60% peeks out without scrolling */}
        <div className="relative w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] h-[280px] sm:h-[305px] md:h-[320px] lg:h-[335px] flex items-start justify-center overflow-hidden transition-all">
          {/* Realistic contact shadow beneath phone on the cutting mat */}
          <div className="absolute top-1/4 w-[260px] sm:w-[290px] lg:w-[320px] h-[300px] bg-black/90 rounded-[52px] blur-3xl pointer-events-none" />

          {/* Ultra-Crisp High-Fidelity iPhone 16 Pro Frame (Zero-Auth Live App HUD) */}
          <DeviceFrame
            onOpenPlayground={onTryItNow}
            className="pointer-events-auto shadow-2xl"
          />
        </div>

        {/* ========================================================================= */}
        {/* 7. BOTTOM CALIPER BAR & SCROLL CUE */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#07080a]/92 backdrop-blur-md border-t border-[rgba(255,237,214,0.08)] py-2 px-4 sm:px-12 flex items-center justify-between text-xs font-mono text-[#94a3b8] z-30">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping shrink-0" />
            <span className="truncate">STAGE 01 // LIVE APP DOCK</span>
            <span className="hidden sm:inline">[09:41 AM UTC]</span>
          </div>

          {/* Sound Toggle Pill */}
          <button
            onClick={() => setSoundEnabled((p) => !p)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0c12]/80 hover:bg-[#141722] border border-[rgba(255,237,214,0.15)] text-[10px] font-mono text-[#94a3b8] hover:text-[#ffedd6] transition-all cursor-pointer shadow-sm"
            title="Toggle Tactile Haptic Audio"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#10b981]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            )}
            <span>{soundEnabled ? "HAPTIC ON" : "HAPTIC OFF"}</span>
          </button>

          <button
            onClick={onScrollNext}
            className="flex items-center gap-1.5 text-[#ffedd6] hover:text-white transition-colors cursor-pointer group shrink-0 whitespace-nowrap ml-2"
          >
            <span className="tracking-wider hidden sm:inline">SCROLL TO CONTINUE</span>
            <span className="tracking-wider sm:hidden">CONTINUE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OryzoHeroDesk;
