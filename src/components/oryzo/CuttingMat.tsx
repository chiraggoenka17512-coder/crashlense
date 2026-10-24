"use client";

import React from "react";

interface CuttingMatProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CuttingMat({ className = "", style = {} }: CuttingMatProps) {
  // Generate millimeter ticks and centimeter labels
  const topLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];
  const sideLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

  return (
    <div
      style={style}
      className={`relative rounded-[28px] bg-[#173224] border-[3px] border-[#224834] shadow-[-20px_45px_90px_-15px_rgba(0,0,0,0.85),-8px_20px_40px_-10px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_3px_rgba(0,0,0,0.7)] overflow-hidden select-none ${className}`}
    >
      {/* Matte vinyl self-healing texture overlay with subtle noise and sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/[0.07] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,0.06),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.45),transparent_75%)] pointer-events-none" />

      {/* SVG Vector Metric Grid (A2 Spec: 10mm primary squares, 45°/60° guidelines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 10mm Grid Pattern */}
          <pattern
            id="mat-grid-10"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="0.8"
            />
            {/* 5mm Subdivisions */}
            <path
              d="M 16 0 L 16 32 M 0 16 L 32 16"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.5"
              strokeDasharray="1 3"
            />
          </pattern>
        </defs>

        {/* Fill Grid */}
        <rect width="100%" height="100%" fill="url(#mat-grid-10)" />

        {/* 45° Diagonal Guideline */}
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke="rgba(255, 255, 255, 0.24)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />

        {/* 60° Diagonal Guideline */}
        <line
          x1="25%"
          y1="100%"
          x2="75%"
          y2="0"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* 30° Diagonal Guideline */}
        <line
          x1="0"
          y1="75%"
          x2="100%"
          y2="25%"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Center Target Rings */}
        <circle
          cx="50%"
          cy="50%"
          r="54"
          fill="none"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="50%"
          r="108"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.8"
          strokeDasharray="3 4"
        />
      </svg>

      {/* Top Millimeter Ruler Numbers */}
      <div className="absolute top-2.5 left-7 right-7 flex justify-between pointer-events-none font-mono text-[9px] text-white/55 tracking-wider font-semibold">
        {topLabels.slice(0, 20).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* Bottom Millimeter Ruler Numbers */}
      <div className="absolute bottom-2.5 left-7 right-7 flex justify-between pointer-events-none font-mono text-[9px] text-white/55 tracking-wider font-semibold">
        {topLabels.slice(10, 30).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* Left Millimeter Ruler Numbers */}
      <div className="absolute top-8 bottom-8 left-2.5 flex flex-col justify-between pointer-events-none font-mono text-[9px] text-white/55 tracking-tighter font-semibold">
        {sideLabels.slice(0, 12).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

export default CuttingMat;
