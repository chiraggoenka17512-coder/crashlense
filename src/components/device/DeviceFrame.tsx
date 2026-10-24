"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { SITE_CONFIG } from "@/config/site-config";
import { ArrowRight, Wifi, BatteryCharging } from "lucide-react";

interface DeviceFrameProps {
  onOpenPlayground?: () => void;
  className?: string;
}

export function DeviceFrame({
  onOpenPlayground,
  className = "",
}: DeviceFrameProps) {
  const [currentTime, setCurrentTime] = useState("09:41");

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

  // Subtle 3D CSS tilt on hover
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-y * 0.02);
    rotateY.set(x * 0.02);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[270px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[510px] sm:h-[535px] md:h-[555px] lg:h-[570px] max-h-[72vh] select-none cursor-pointer ${className}`}
      onClick={onOpenPlayground}
      title="Click to launch Zero-Auth App Playground"
    >
      {/* Outer Titanium Chassis Frame (Apple Natural Titanium / Space Black PBR) */}
      <div className="relative w-full h-full rounded-[44px] sm:rounded-[48px] lg:rounded-[52px] p-[2.5px] bg-gradient-to-b from-[#3d404d] via-[#22242d] to-[#14151a] shadow-[0_28px_65px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_1px_rgba(255,255,255,0.35)]">
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

        {/* Micro Bezel Ring (Crisp Matte Obsidian, Non-Glowing) */}
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

            {/* Background Subtle Grid Pattern */}
            <div className="absolute inset-0 oryzo-dots opacity-20 pointer-events-none" />

            {/* TOP HEADER: DYNAMIC ISLAND + STATUS BAR */}
            <div className="relative z-20 w-full pt-2.5 px-4 sm:px-5">
              {/* Dynamic Island */}
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#ffedd6]">
                {/* Clock */}
                <span className="font-bold tracking-tight text-[11px] sm:text-xs">{currentTime}</span>

                {/* The Pill: Dynamic Island */}
                <div className="w-[84px] sm:w-[94px] h-[22px] sm:h-[24px] bg-black rounded-full flex items-center justify-between px-2 shadow-md border border-white/[0.08]">
                  {/* Camera Lens */}
                  <div className="w-2 h-2 rounded-full bg-[#0a101f] border border-blue-950/60 relative flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-[#1e293b]" />
                  </div>
                  {/* Sensor Dot */}
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

            {/* SCREEN MAIN BODY: ORCATHON 2026 LIVE APP HUD */}
            <div className="relative z-20 px-3 sm:px-3.5 pt-1.5 sm:pt-2 pb-1 space-y-1.5 sm:space-y-2">
              {/* Top Banner & Product Title */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-mono text-[#ff8539] font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] animate-pulse" />
                    APP // {SITE_CONFIG.brand.name} OS
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[8px] text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Track Badge Pill */}
                <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-white/[0.06] border border-white/[0.1] mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]" />
                  <span className="font-mono text-[8.5px] font-bold text-[#ffedd6] uppercase tracking-wider">
                    TRACK: {SITE_CONFIG.problemStatement.category}
                  </span>
                </div>

                {/* Prominent Problem Statement / App Product Title */}
                <h2 className="text-sm sm:text-base lg:text-lg font-black font-[family-name:var(--font-display)] text-[#ffedd6] leading-tight tracking-tight drop-shadow-sm">
                  {SITE_CONFIG.problemStatement.title}
                </h2>
              </div>

              {/* Central Telemetry HUD Card */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#0f1118]/92 border border-[rgba(255,237,214,0.12)] shadow-md backdrop-blur-md space-y-1 sm:space-y-1.5">
                <div className="flex items-center justify-between text-[8px] font-mono border-b border-white/[0.06] pb-0.5">
                  <span className="text-[#94a3b8]">TELEMETRY ENGINE</span>
                  <span className="text-emerald-400 font-bold">SUB-12MS P99</span>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">PING</div>
                    <div className="text-[11px] font-mono font-bold text-emerald-400">12ms</div>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">CACHE</div>
                    <div className="text-[11px] font-mono font-bold text-[#38bdf8]">99.4%</div>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-[7.5px] font-mono text-[#94a3b8] uppercase">DRIZZLE</div>
                    <div className="text-[11px] font-mono font-bold text-[#ff8539]">POOL</div>
                  </div>
                </div>

                {/* Animated Waveform SVG */}
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
                  <span className="text-emerald-400">✓ Ingestion ready: </span>
                  <span className="text-[#ffedd6]/75">streaming live signals</span>
                </div>
              </div>

              {/* PRIMARY ACTION CTA BUTTON INSIDE PHONE */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPlayground?.();
                  }}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#ffedd6] hover:bg-white text-[#07080a] font-mono text-[11px] sm:text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_3px_14px_rgba(255,237,214,0.35)] transition-all cursor-pointer group"
                >
                  <span>RESOLVE STATEMENT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* BOTTOM iOS HOME INDICATOR BAR */}
            <div className="relative z-20 w-full pb-2 flex justify-center mt-auto">
              <div className="w-24 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DeviceFrame;
