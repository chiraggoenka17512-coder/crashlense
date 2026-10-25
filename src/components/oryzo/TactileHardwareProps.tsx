"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Terminal, Zap, CheckCircle2 } from "lucide-react";

interface TactileHardwarePropsComponentProps {
  playTactileClick?: (freq?: number, duration?: number) => void;
  onDetonateScenario?: () => void;
}

/**
 * Tactile Studio Craft Artifacts for CrashLens:
 * 1. Minimalist Japanese Ivory Drafting Pen (Pristine isolated studio prop) — Upper Right
 * 2. Silver Paper Clips (Cozy tactile desk prop) — Upper Left
 * 3. Tactile SRE Telemetry Vector Code Card (`CL_TELEMETRY.ts`) — Mid Left
 * 4. Tactile System 1 Reflex Decision Code Card (`SYS1_REFLEX.json`) — Bottom Right
 */
export function TactileHardwareProps({
  playTactileClick = () => {},
  onDetonateScenario = () => {},
}: TactileHardwarePropsComponentProps) {
  const [penHovered, setPenHovered] = useState(false);
  const [clipsHovered, setClipsHovered] = useState(false);
  const [codeCard1Hovered, setCodeCard1Hovered] = useState(false);
  const [codeCard2Hovered, setCodeCard2Hovered] = useState(false);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 1. TACTILE SILVER STEEL PAPER CLIPS (UPPER LEFT ON OAK DESK) */}
      {/* ========================================================================= */}
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
        title="Silver Steel Paper Clips"
      >
        <Image
          src="/images/paper_clips_cozy.png"
          alt="Paper Clips"
          width={268}
          height={178}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. TACTILE CODE BLOCK 1: 1Hz TELEMETRY VECTOR DIFF CARD (MID-LEFT ON MAT EDGE) */}
      {/* ========================================================================= */}
      <motion.div
        onMouseEnter={() => {
          playTactileClick(850, 0.04);
          setCodeCard1Hovered(true);
        }}
        onMouseLeave={() => setCodeCard1Hovered(false)}
        animate={{
          rotate: codeCard1Hovered ? 4 : 7,
          scale: codeCard1Hovered ? 1.04 : 1,
          y: codeCard1Hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="absolute left-6 sm:left-12 lg:left-18 top-[46%] sm:top-[44%] w-60 sm:w-72 pointer-events-auto cursor-pointer hidden md:block"
        style={{
          filter:
            "drop-shadow(-10px 22px 30px rgba(0,0,0,0.85)) drop-shadow(-2px 6px 10px rgba(0,0,0,0.5))",
        }}
        title="CrashLens 1Hz Telemetry Vector Diff Stream"
      >
        <div className="rounded-xl bg-[#0a0c12]/95 border border-[rgba(255,237,214,0.18)] p-3 shadow-2xl backdrop-blur-md text-left font-mono">
          {/* Terminal Window Chrome */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className="w-2 h-2 rounded-full bg-[#eab308]" />
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-[8px] text-[#94a3b8] font-bold ml-1 flex items-center gap-1">
                <Terminal className="w-2.5 h-2.5 text-[#ff8539]" />
                CL_TELEMETRY.ts
              </span>
            </div>
            <div className="flex items-center gap-1 text-[7px] text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>1Hz TICK</span>
            </div>
          </div>

          {/* Syntax Highlighted Code Lines */}
          <div className="space-y-0.5 text-[8.5px] leading-relaxed">
            <div className="text-[#64748b]">// Ingested 12-Node Anomaly Vector</div>
            <div>
              <span className="text-[#a78bfa]">const</span>{" "}
              <span className="text-[#ffedd6]">diff</span> = &#123;
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">target</span>:{" "}
              <span className="text-[#f59e0b]">&quot;payments-db&quot;</span>,
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">connLeak</span>:{" "}
              <span className="text-[#ef4444] font-bold">0.94</span>,{" "}
              <span className="text-[#64748b]">// 94% cap</span>
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">p99Latency</span>:{" "}
              <span className="text-[#ef4444] font-bold">&quot;850ms&quot;</span>,
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">percolation</span>: [
              <span className="text-[#38bdf8]">&quot;orders&quot;</span>,{" "}
              <span className="text-[#38bdf8]">&quot;api-gw&quot;</span>]
            </div>
            <div>&#125;;</div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. MINIMALIST JAPANESE IVORY DRAFTING PEN (UPPER RIGHT ON MAT) */}
      {/* ========================================================================= */}
      <motion.div
        onMouseEnter={() => {
          playTactileClick(900, 0.04);
          setPenHovered(true);
        }}
        onMouseLeave={() => setPenHovered(false)}
        animate={{
          rotate: penHovered ? -20 : -24,
          y: penHovered ? -4 : 0,
          scale: penHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="absolute right-4 sm:right-12 top-24 sm:top-32 w-48 sm:w-68 h-12 sm:h-16 pointer-events-auto cursor-pointer"
        style={{
          filter:
            "drop-shadow(0 14px 26px rgba(0,0,0,0.75)) drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
        }}
        title="Minimalist Japanese Drafting Pen"
      >
        <Image
          src="/images/drafting_pen_cozy.png"
          alt="Drafting Pen"
          width={640}
          height={160}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. TACTILE CODE BLOCK 2: SYSTEM 1 DECISION JSON (BOTTOM RIGHT DESK CORNER) */}
      {/* ========================================================================= */}
      <motion.div
        onMouseEnter={() => {
          playTactileClick(1100, 0.05);
          setCodeCard2Hovered(true);
        }}
        onMouseLeave={() => setCodeCard2Hovered(false)}
        animate={{
          rotate: codeCard2Hovered ? -2 : -5,
          scale: codeCard2Hovered ? 1.04 : 1,
          y: codeCard2Hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="absolute right-4 sm:right-10 lg:right-14 bottom-14 sm:bottom-18 w-64 sm:w-76 pointer-events-auto cursor-pointer hidden sm:block"
        style={{
          filter:
            "drop-shadow(-12px 24px 34px rgba(0,0,0,0.85)) drop-shadow(-3px 6px 10px rgba(0,0,0,0.5))",
        }}
        title="System 1 Reflexive Decision JSON Payload"
      >
        <div className="rounded-xl bg-[#0c0e15]/95 border border-[rgba(255,133,57,0.3)] p-3 shadow-2xl backdrop-blur-md text-left font-mono">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-[8px] font-bold text-[#ff8539]">
              <Zap className="w-2.5 h-2.5 text-[#ff8539] fill-[#ff8539]" />
              <span>SYS1_DECISION.json</span>
            </div>
            <div className="flex items-center gap-1 text-[7px] text-[#ffedd6] bg-[#ff8539]/20 px-1.5 py-0.5 rounded border border-[#ff8539]/40">
              <span>LATENCY: 240ms</span>
            </div>
          </div>

          {/* JSON Payload */}
          <div className="space-y-0.5 text-[8.5px] leading-relaxed">
            <div className="text-[#64748b]">&#47;&#47; Inception Mercury Fast-Reflex Output</div>
            <div className="text-[#ffedd6]">&#123;</div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">&quot;rootCause&quot;</span>:{" "}
              <span className="text-[#ff8539] font-bold">&quot;payments-db&quot;</span>,
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">&quot;failureMode&quot;</span>:{" "}
              <span className="text-[#ffedd6]">&quot;DB_POOL_LEAK&quot;</span>,
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">&quot;confidence&quot;</span>:{" "}
              <span className="text-[#10b981] font-bold">0.96</span>,
            </div>
            <div className="pl-3">
              <span className="text-[#38bdf8]">&quot;action&quot;</span>:{" "}
              <span className="text-[#10b981] font-bold">&quot;RECYCLE_AND_SHED&quot;</span>
            </div>
            <div className="text-[#ffedd6]">&#125;</div>
          </div>

          {/* Quick Trigger Callout */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onDetonateScenario();
            }}
            className="mt-2.5 pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[7.5px] text-[#ff8539] hover:text-[#ffedd6] transition-colors"
          >
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#10b981]" />
              RECOVERY ACTION ARMED
            </span>
            <span className="font-bold underline cursor-pointer">
              DETONATE &amp; RECOVER →
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TactileHardwareProps;
