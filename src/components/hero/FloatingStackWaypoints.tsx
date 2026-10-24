"use client";

import React from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { Database, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

interface FloatingStackWaypointsProps {
  scrollYProgress?: MotionValue<number>;
}

export function FloatingStackWaypoints({ scrollYProgress }: FloatingStackWaypointsProps = {}) {
  const prefersReduced = useReducedMotion();

  const fallbackProgress = useTransform(() => 0);
  const progress = scrollYProgress || fallbackProgress;

  const node1X = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "-35px"]);
  const node1Y = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "-45px"]);

  const node2X = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "35px"]);
  const node2Y = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "-35px"]);

  const node3X = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "-25px"]);
  const node3Y = useTransform(progress, [0, 1], prefersReduced ? ["0px", "0px"] : ["0px", "40px"]);

  const opacity = useTransform(progress, [0, 0.75], prefersReduced ? [1, 1] : [1, 0.25]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 w-full overflow-hidden px-4 hidden lg:block">
      {/* Node 1: Drizzle + Supabase (Top Left) */}
      <motion.div
        style={{ x: node1X, y: node1Y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-auto absolute top-[12%] left-[4%] xl:left-[8%]"
      >
        <div className="glass-panel-interactive rounded-2xl p-4 w-64 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-2xl group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Drizzle Engine</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              db:push active
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-snug">
            Supabase Postgres connected via pooling. Type-safe schema with zero migration locks.
          </p>
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Latency: &lt;18ms</span>
            <span className="text-indigo-400 flex items-center gap-0.5">schema.ts <ArrowUpRight className="w-2.5 h-2.5" /></span>
          </div>
        </div>
      </motion.div>

      {/* Node 2: Clerk Auth (Top Right) */}
      <motion.div
        style={{ x: node2X, y: node2Y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="pointer-events-auto absolute top-[14%] right-[4%] xl:right-[8%]"
      >
        <div className="glass-panel-interactive rounded-2xl p-4 w-64 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-2xl group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Clerk Session</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              JWT Ready
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-snug">
            Turnkey user authentication with drop-in modals, user profiles, and session security.
          </p>
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Middleware Guard</span>
            <span className="text-indigo-400 flex items-center gap-0.5">Zero RLS Lag <ArrowUpRight className="w-2.5 h-2.5" /></span>
          </div>
        </div>
      </motion.div>

      {/* Node 3: Upstash Redis (Bottom Left Orbit) */}
      <motion.div
        style={{ x: node3X, y: node3Y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pointer-events-auto absolute bottom-[18%] left-[5%] xl:left-[10%]"
      >
        <div className="glass-panel-interactive rounded-2xl p-4 w-60 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-2xl group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Upstash Redis</span>
            </div>
            <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
              10 req / 10s
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-snug">
            Sliding window rate-limiter and low-latency cache for AI tokens & live leaderboards.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
