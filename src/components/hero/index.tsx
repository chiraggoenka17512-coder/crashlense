"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { AtmosphericBackdrop } from "./AtmosphericBackdrop";
import { TrajectoryArc } from "./TrajectoryArc";
import { FloatingStackWaypoints } from "./FloatingStackWaypoints";
import { HeroHeadline } from "./HeroHeadline";
import { HeroControlHUD } from "./HeroControlHUD";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll Parallax Engine
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const trajectoryY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-20%"]);
  const trajectoryScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.06]);

  const headlineY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-30%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], prefersReduced ? [1, 1] : [1, 0.2]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 0.95]);

  const hudY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[95vh] sm:min-h-[100vh] w-full overflow-hidden flex flex-col justify-between pt-12 pb-10 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30"
    >
      {/* Layer 0: Cinematic Stratosphere Backdrop Image with Subtle Ambient Drift & Solar Horizon */}
      <AtmosphericBackdrop containerRef={heroRef} />

      {/* Layer 1: SVG Cyber Trajectory Arc with Neon Contrail & Expanding Radar Beacons */}
      <TrajectoryArc style={{ y: trajectoryY, scale: trajectoryScale }} />

      {/* Layer 2: Floating Glassmorphic Telemetry Waypoints (Drizzle, Clerk, Upstash) */}
      <FloatingStackWaypoints scrollYProgress={scrollYProgress} />

      {/* Layer 3: Main Display Headline with Gradient Text & Telemetry Status Pill */}
      <HeroHeadline style={{ y: headlineY, opacity: headlineOpacity, scale: headlineScale }} />

      {/* Layer 4: Interactive Command Deck / Flight Control HUD with Track Selector */}
      <HeroControlHUD style={{ y: hudY }} />
    </section>
  );
}

export default Hero;
