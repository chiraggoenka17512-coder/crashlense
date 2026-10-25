"use client";

import React from "react";

interface CuttingMatProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CuttingMat({ className = "", style = {} }: CuttingMatProps) {
  // Metric millimeter ticks and centimeter labels
  const topLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];
  const sideLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

  return (
    <div
      style={style}
      className={`relative rounded-[28px] bg-[#142c1f] border-[3px] border-[#1e422f] shadow-[-20px_45px_90px_-15px_rgba(0,0,0,0.85),-8px_20px_40px_-10px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_3px_rgba(0,0,0,0.7)] overflow-hidden select-none ${className}`}
    >
      {/* Matte vinyl ESD self-healing texture overlay with subtle studio sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,0.07),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.5),transparent_75%)] pointer-events-none" />

      {/* SVG Vector Metric Grid + CrashLens 12-Node Topology Bus Circuitry */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 10mm Standard CAD Grid */}
          <pattern
            id="crashlens-mat-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="0.8"
            />
            {/* 5mm Subdivisions */}
            <path
              d="M 16 0 L 16 32 M 0 16 L 32 16"
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="0.5"
              strokeDasharray="1 3"
            />
          </pattern>

          {/* Copper Topology Trace Glow Filter */}
          <filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ff8539" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Fill Base Grid */}
        <rect width="100%" height="100%" fill="url(#crashlens-mat-grid)" />

        {/* 45° Diagonal Alignment Guideline */}
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />

        {/* 60° Angle Guideline */}
        <line
          x1="25%"
          y1="100%"
          x2="75%"
          y2="0"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* 30° Angle Guideline */}
        <line
          x1="0"
          y1="75%"
          x2="100%"
          y2="25%"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* ========================================================================= */}
        {/* CRASHLENS ETCHED TOPOLOGY BUS TRACES (COPPER / AMBER SILKSCREEN PCB PATHS) */}
        {/* ========================================================================= */}
        {/* Ingress Bus (API-GW to Edge Services) */}
        <path
          d="M 120 180 L 320 180 L 380 240 L 640 240 L 700 180 L 920 180"
          fill="none"
          stroke="rgba(255, 133, 57, 0.32)"
          strokeWidth="1.2"
          strokeDasharray="6 3"
          filter="url(#trace-glow)"
        />

        {/* Data Persistence Bus (Orders -> Payments -> Payments-DB) */}
        <path
          d="M 180 340 L 340 340 L 400 400 L 680 400 L 740 340 L 880 340"
          fill="none"
          stroke="rgba(56, 189, 248, 0.24)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Kafka & Event Queue Return Loop */}
        <path
          d="M 220 480 L 420 480 L 460 520 L 760 520 L 800 480"
          fill="none"
          stroke="rgba(255, 237, 214, 0.18)"
          strokeWidth="0.9"
          strokeDasharray="8 4"
        />

        {/* PCB Via Connection Pads (Tactile micro dots along traces) */}
        <circle cx="320" cy="180" r="3.5" fill="#142c1f" stroke="#ff8539" strokeWidth="1.5" />
        <circle cx="700" cy="180" r="3.5" fill="#142c1f" stroke="#ff8539" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="3.5" fill="#142c1f" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="680" cy="400" r="3.5" fill="#142c1f" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="460" cy="520" r="3.5" fill="#142c1f" stroke="#ffedd6" strokeWidth="1.2" />
        <circle cx="760" cy="520" r="3.5" fill="#142c1f" stroke="#ffedd6" strokeWidth="1.2" />

        {/* ========================================================================= */}
        {/* CENTER PREDICTIVE RADAR RETICLE (T-45s PRE-FAILURE HORIZON TARGET) */}
        {/* ========================================================================= */}
        {/* Horizon Rings */}
        <circle
          cx="50%"
          cy="50%"
          r="64"
          fill="none"
          stroke="rgba(255, 237, 214, 0.18)"
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="50%"
          r="128"
          fill="none"
          stroke="rgba(255, 133, 57, 0.22)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle
          cx="50%"
          cy="50%"
          r="192"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />

        {/* Crosshair Alignment Ticks */}
        <line
          x1="50%"
          y1="22%"
          x2="50%"
          y2="78%"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />
        <line
          x1="24%"
          y1="50%"
          x2="76%"
          y2="50%"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />
      </svg>

      {/* ========================================================================= */}
      {/* TACTILE HARDWARE DETAIL: BRASS / COPPER ESD GROUNDING SNAP (TOP-RIGHT) */}
      {/* ========================================================================= */}
      <div
        className="absolute top-4 right-10 flex items-center gap-2 pointer-events-none"
        title="ESD Grounding Point"
      >
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#c89858] via-[#8f632d] to-[#4a3212] p-[1.5px] shadow-[0_2px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#1b1c1e] border border-[#a67b45] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#d4a86a] shadow-[0_0_3px_rgba(212,168,106,0.8)]" />
          </div>
          <span className="absolute -bottom-3 text-[6.5px] font-mono text-[#d4a86a]/80 tracking-widest uppercase">
            ESD 1MΩ
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SILKSCREEN ENGINEERING BRANDING & CALIPERS (PRINTED DIRECTLY ON VINYL) */}
      {/* Top Left Coordinate Caliper */}
      <div className="absolute top-3.5 left-9 pointer-events-none font-mono flex items-center gap-1.5 text-[8px] text-white/40 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]/80 shadow-[0_0_4px_rgba(255,133,57,0.6)]" />
        <span>[+000, +000] SPEC: CL-12 ESD</span>
      </div>

      {/* Top Silkscreen Engineering Branding (Positioned near ESD Snap for maximum clarity) */}
      <div className="absolute top-3.5 right-24 pointer-events-none font-mono text-right space-y-0.5 hidden sm:block">
        <div className="flex items-center justify-end gap-2">
          <span className="text-[9.5px] font-bold text-[#ffedd6]/90 tracking-widest uppercase">
            CRASHLENS // ESD WORKBENCH RADAR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539] inline-block shadow-[0_0_6px_rgba(255,133,57,0.7)]" />
        </div>
        <div className="text-[7px] text-[#94a3b8]/75 tracking-wider uppercase">
          12-NODE TOPOLOGY BUS // 1Hz TELEMETRY VECTOR CLOCK
        </div>
      </div>

      {/* Bottom Center 12-Node Microservice Topology Pinout Table */}
      <div className="absolute bottom-5 left-10 right-10 pointer-events-none font-mono hidden md:flex items-center justify-between border-t border-white/[0.12] pt-2">
        <div className="flex items-center gap-3 text-[7.5px] text-[#ffedd6]/70 tracking-wider">
          <span className="text-[#ff8539] font-bold">12-NODE BUS:</span>
          <span>01:API-GW</span>
          <span>•</span>
          <span>02:AUTH</span>
          <span>•</span>
          <span>03:CART</span>
          <span>•</span>
          <span>04:RECS</span>
          <span>•</span>
          <span>05:ORDERS</span>
          <span>•</span>
          <span>06:REDIS</span>
          <span>•</span>
          <span>07:INVENTORY</span>
          <span>•</span>
          <span>08:PAYMENTS</span>
          <span>•</span>
          <span>09:PAY-DB</span>
          <span>•</span>
          <span>10:FRAUD</span>
          <span>•</span>
          <span>11:WAREHOUSE</span>
          <span>•</span>
          <span>12:NOTIF</span>
        </div>
        <div className="text-[7.5px] text-[#94a3b8]/60 uppercase tracking-widest hidden lg:block">
          TIER 0 PERCOLATION + SYSTEM 1 REFLEX
        </div>
      </div>

      {/* Center Radar Horizon Silkscreen Text */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none font-mono text-center">
        <div className="text-[7.5px] text-[#ff8539]/60 tracking-widest font-semibold uppercase">
          RADAR HORIZON: 45s PRE-FAILURE
        </div>
        <div className="text-[6.5px] text-white/30 tracking-wider">
          Z-SCORE 3.2σ // VELOCITY dv/dt
        </div>
      </div>

      {/* Top Millimeter Ruler Numbers */}
      <div className="absolute top-2.5 left-7 right-7 flex justify-between pointer-events-none font-mono text-[9px] text-white/50 tracking-wider font-semibold">
        {topLabels.slice(0, 20).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* Bottom Millimeter Ruler Numbers */}
      <div className="absolute bottom-2 left-7 right-7 flex justify-between pointer-events-none font-mono text-[9px] text-white/45 tracking-wider font-semibold">
        {topLabels.slice(10, 30).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* Left Millimeter Ruler Numbers */}
      <div className="absolute top-8 bottom-8 left-2.5 flex flex-col justify-between pointer-events-none font-mono text-[9px] text-white/50 tracking-tighter font-semibold">
        {sideLabels.slice(0, 12).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* Right Millimeter Ruler Numbers */}
      <div className="absolute top-8 bottom-8 right-2.5 flex flex-col justify-between pointer-events-none font-mono text-[9px] text-white/40 tracking-tighter font-semibold">
        {sideLabels.slice(4, 16).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

export default CuttingMat;
