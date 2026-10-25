"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring } from "motion/react";
import { DeviceFrame } from "@/components/device/DeviceFrame";
import { CuttingMat } from "@/components/oryzo/CuttingMat";
import { TactileHardwareProps } from "@/components/oryzo/TactileHardwareProps";
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
      {/* 3. CRASHLENS TACTICAL SRE HARDWARE PROPS (YUBIKEY, PCB, SFP+ CABLE, PROBE, RUNBOOK) */}
      {/* ========================================================================= */}
      <TactileHardwareProps
        playTactileClick={playTactileClick}
        onDetonateScenario={onTryItNow}
      />

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
            CRASHLENS // RADAR OS,<br />
            PREDICTIVE CHAOS SANDBOX.
          </h3>
          <div className="w-full border-b border-dotted border-[rgba(255,237,214,0.25)] my-1.5" />
          <p className="font-mono text-[10px] text-[#94a3b8] leading-relaxed">
            Predicting catastrophic distributed microservice cascades 45s before SLAs breach.
          </p>
        </div>
      </div>

      {/* B. Bottom-Right Editorial Copy & Live Widget (Pinned cleanly above caliper bar) */}
      <div className="absolute right-6 sm:right-12 bottom-11 sm:bottom-12 z-30 pointer-events-auto hidden lg:flex flex-col items-end gap-2 max-w-[270px] text-right">
        <p className="font-sans text-[11px] text-[#ffedd6] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Sub-350ms root cause diagnosis via System 1 Reflex Inception. Zero panic, pre-failure interception.
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
              CRASHLENS RADAR
            </span>
            <span className="font-[family-name:var(--font-display)] font-bold text-[10.5px] text-[#f4efe6]">
              Launch Failure Playground →
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
