"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

interface HeroHeadlineProps {
  style?: React.ComponentProps<typeof motion.div>["style"];
}

export function HeroHeadline({ style }: HeroHeadlineProps = {}) {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20, scale: prefersReduced ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReduced ? 0.1 : 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-30 mx-auto max-w-4xl text-center flex flex-col items-center pt-8 sm:pt-14 my-auto select-none will-change-transform"
    >
      {/* Telemetry Status Pill */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
        <div className="rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.25)] flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-indigo-300 tracking-wider uppercase flex items-center gap-1.5">
            Orcathon 2026 Ready · Full-Stack Agentic Engine
          </span>
        </div>
      </motion.div>

      {/* Main Display Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.08] max-w-4xl mx-auto"
      >
        Architected to win <br />
        <span className="bg-gradient-to-r from-sky-400 via-indigo-200 to-pink-400 bg-clip-text text-transparent">
          Orcathon 2026.
        </span>
      </motion.h1>

      {/* Value Proposition Subhead */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-sm sm:text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed px-4 font-normal"
      >
        Zero setup lag on Sunday. Pre-wired with <strong>Supabase Postgres</strong>, <strong>Clerk Auth</strong>, <strong>Drizzle ORM</strong>, and <strong>Upstash Redis</strong>. Pivot your schema and UI in minutes when your problem statement drops.
      </motion.p>
    </motion.div>
  );
}
