"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface AtmosphericBackdropProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function AtmosphericBackdrop({ containerRef }: AtmosphericBackdropProps) {
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll(
    containerRef
      ? {
          target: containerRef,
          offset: ["start start", "end start"],
        }
      : undefined
  );

  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], prefersReduced ? [0.8, 0.8, 0.8] : [0.85, 0.6, 0.2]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      {/* Cinematic Orbital Stratosphere Backdrop */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.img
          src="/hero-backdrop.jpg"
          alt="Orcathon 2026 Cosmic Stratosphere"
          className="h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.12]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/40 to-[#090a0f]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/80 via-transparent to-[#090a0f]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#090a0f]/30 to-[#090a0f]/90" />
      </motion.div>

      {/* Horizon Solar Glow Light Beam */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[350px] bg-gradient-to-b from-amber-500/15 via-indigo-500/20 to-transparent blur-3xl pointer-events-none z-10"
      />
    </div>
  );
}
