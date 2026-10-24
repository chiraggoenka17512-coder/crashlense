"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface TrajectoryArcProps {
  style?: React.ComponentProps<typeof motion.div>["style"];
}

export function TrajectoryArc({ style }: TrajectoryArcProps = {}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      style={style}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center max-w-7xl mx-auto overflow-visible select-none"
    >
      <svg
        className="w-full h-full absolute inset-0 overflow-visible"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cyberContrail" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="25%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Flight Radar Coordinate Circles */}
        <circle cx="880" cy="190" r="50" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="880" cy="190" r="95" stroke="rgba(56,189,248,0.07)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Curving Flight Path Arc */}
        <path
          d="M 120 540 C 350 490, 520 280, 880 190 C 1020 155, 1140 120, 1190 90"
          stroke="url(#cyberContrail)"
          strokeWidth="2.5"
          filter="url(#neonGlow)"
          strokeDasharray="6 4"
        />

        {/* Dynamic Telemetry Target Crosshairs */}
        <line x1="860" y1="190" x2="900" y2="190" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="880" y1="170" x2="880" y2="210" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />

        {/* Pulse beacon at anchor */}
        {!prefersReduced && (
          <motion.circle
            cx="880"
            cy="190"
            r="8"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
          />
        )}
      </svg>
    </motion.div>
  );
}
