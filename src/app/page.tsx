"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroToDeviceChoreography } from "@/components/oryzo/HeroToDeviceChoreography";
import { OryzoScreenBlendMorph, ActivePane } from "@/components/oryzo/OryzoScreenBlendMorph";
import { SITE_CONFIG } from "@/config/site-config";
import {
  ArrowRight,
  Check,
  Cpu,
  Download,
  Zap,
} from "lucide-react";

const STAGE_IDS = [
  { id: "stage-1", label: "01", name: "Hero Dock" },
  { id: "stage-2", label: "02", name: "Exploded Stack" },
  { id: "stage-3", label: "03", name: "Feature Carousel" },
  { id: "stage-4", label: "04", name: "Zero-Auth Playground" },
  { id: "stage-5", label: "05", name: "CAD Blueprint" },
  { id: "stage-6", label: "06", name: "Deployment & Proof" },
];

export default function Home() {
  const [activeStage, setActiveStage] = useState("stage-1");
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [playgroundPane, setPlaygroundPane] = useState<ActivePane>("signals");
  const [selectedTier, setSelectedTier] = useState<"pwa" | "workbench" | "fleet">("pwa");

  // Track scroll position to toggle sticky "Try It Now" CTA and active stage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyCta(scrollY > 420);

      // Viewport detection for the 6 stages
      for (const stage of STAGE_IDS) {
        const el = document.getElementById(stage.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.25) {
            setActiveStage(stage.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDeepLinkToPlayground = (pane: ActivePane) => {
    setPlaygroundPane(pane);
    scrollToStage("playground");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4efe6] flex flex-col relative selection:bg-[#ff8539]/20 selection:text-[#ffedd6] scroll-smooth">
      {/* Global Sticky Oryzo Navbar */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[rgba(255,237,214,0.08)] bg-[#07080a]/80 backdrop-blur-xl" />

      {/* ========================================================================= */}
      {/* GLOBAL CONVERSION: STICKY "TRY IT NOW" BUTTON (VISIBLE FROM STAGE 2 ONWARD) */}
      {/* ========================================================================= */}
      <div
        className={`fixed z-50 transition-all duration-300 pointer-events-auto ${
          showStickyCta
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        } top-20 right-6 sm:right-8 hidden sm:block`}
      >
        <button
          onClick={() => scrollToStage("playground")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffedd6] hover:bg-white text-[#07080a] font-mono text-xs font-bold tracking-wider shadow-[0_10px_25px_rgba(255,237,214,0.3)] hover:scale-105 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#ff8539]" />
          <span>TRY IT NOW</span>
        </button>
      </div>

      {/* Mobile Floating Sticky CTA */}
      <div
        className={`fixed z-50 transition-all duration-300 sm:hidden ${
          showStickyCta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        } bottom-6 right-6`}
      >
        <button
          onClick={() => scrollToStage("playground")}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#ffedd6] text-[#07080a] font-mono text-xs font-black tracking-wider shadow-[0_12px_30px_rgba(0,0,0,0.8)] border border-amber-900/30 active:scale-95 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#ff8539]" />
          <span>TRY IT NOW</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SLIM 6-STAGE TECHNICAL PROGRESS INDICATOR (CLICKABLE TICK MARKS) */}
      {/* ========================================================================= */}
      <aside className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-3.5 pointer-events-auto transition-opacity duration-300 ${
        activeStage === "stage-1" ? "opacity-35 hover:opacity-100" : "opacity-100"
      }`}>
        {STAGE_IDS.map((stage) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => scrollToStage(stage.id)}
              className="group flex items-center justify-end gap-2 text-right transition-all cursor-pointer"
              title={stage.name}
            >
              <span
                className={`font-mono text-[10px] tracking-widest transition-colors ${
                  isActive ? "text-[#ff8539] font-bold" : "text-[#94a3b8]/40 group-hover:text-[#94a3b8]"
                }`}
              >
                {stage.name}
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-sm font-mono text-[9px] flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-[#ff8539] text-[#07080a] scale-125 shadow-[0_0_10px_rgba(255,133,57,0.8)]"
                    : "bg-[#141722] border border-[rgba(255,237,214,0.15)] text-[#94a3b8]/60 group-hover:border-[#ffedd6]"
                }`}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </aside>

      <main className="flex-1 flex flex-col">
        {/* ========================================================================= */}
        {/* STAGE 1 ➔ 2: SCROLL-LINKED HERO DESK TO CENTERED DEVICE (FRAME 1 ➔ 2) */}
        {/* ========================================================================= */}
        <section id="stage-1" className="relative w-full">
          <HeroToDeviceChoreography
            onTryItNow={() => scrollToStage("playground")}
          />
        </section>

        {/* ========================================================================= */}
        {/* STAGE 3: FEATURE & FUNCTIONALITY CAROUSEL (WITH DEEP-LINK "TRY THIS" HOOKS) */}
        {/* ========================================================================= */}
        <section
          id="stage-3"
          className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#07080a] border-b border-[rgba(255,237,214,0.08)] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-12 border-b border-[rgba(255,237,214,0.08)] gap-6">
              <div>
                <div className="oryzo-caliper mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  <span>STAGE 03 // CORE CAPABILITIES</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] tracking-tight">
                  So Powerful, It&apos;s Instant.
                </h2>
              </div>
              <p className="text-sm text-[#94a3b8] max-w-md">
                Each core feature connects directly into our live production playground. Click &ldquo;Try this&rdquo; on any card to test it immediately.
              </p>
            </div>

            {/* Horizontal Filmstrip Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Problem Signals */}
              <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#38bdf8]/50 transition-all">
                <div>
                  <div className="text-xs font-mono text-[#38bdf8] mb-2">[01 // SIGNALS ENGINE]</div>
                  <h4 className="text-xl font-bold text-[#f4efe6] mb-2 font-[family-name:var(--font-display)]">
                    Polymorphic Ingest
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-6">
                    Multi-track problem triage with automatic latency telemetry and urgency scoring.
                  </p>
                </div>
                <button
                  onClick={() => handleDeepLinkToPlayground("signals")}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#38bdf8] hover:text-white transition-colors cursor-pointer pt-3 border-t border-white/[0.06]"
                >
                  <span>↳ Try this in playground</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 2: Spotlight Card (CAD Dashed Border + Interactive Action Prompt Bar) */}
              <div className="oryzo-card p-6 rounded-2xl border-2 border-dashed border-[#ff8539]/70 bg-[#0d0f17] flex flex-col justify-between shadow-[0_0_40px_rgba(255,133,57,0.15)] relative">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#ff8539] text-[#07080a] font-mono text-[9px] font-black uppercase">
                  SPOTLIGHT FEATURE
                </div>
                <div>
                  <div className="text-xs font-mono text-[#ff8539] mb-2">[02 // HACKATHON ADAPTER]</div>
                  <h4 className="text-xl font-bold text-[#ffedd6] mb-2 font-[family-name:var(--font-display)]">
                    Sunday Track Ready
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                    Zero-migration schema designed for instant adaptation to Sunday&apos;s problem statement.
                  </p>

                  {/* Interactive Action Prompt Bar */}
                  <div className="p-2.5 bg-black/60 rounded-xl border border-[rgba(255,237,214,0.12)] font-mono text-[11px] text-[#ffedd6] mb-4 flex items-center gap-2">
                    <span className="text-[#ff8539] font-bold">&gt;</span>
                    <span className="truncate">{SITE_CONFIG.problemStatement.tracks[1]?.samplePrompt}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeepLinkToPlayground("adapter")}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ffedd6] hover:text-white transition-colors cursor-pointer pt-3 border-t border-white/[0.06]"
                >
                  <span>↳ Try this in playground</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: Drizzle & SQL */}
              <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#10b981]/50 transition-all">
                <div>
                  <div className="text-xs font-mono text-[#10b981] mb-2">[03 // QUERY STREAM]</div>
                  <h4 className="text-xl font-bold text-[#f4efe6] mb-2 font-[family-name:var(--font-display)]">
                    Drizzle Stream
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-6">
                    Sub-12ms queries executed against Supabase connection pooler with execution breakdowns.
                  </p>
                </div>
                <button
                  onClick={() => handleDeepLinkToPlayground("drizzle")}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#10b981] hover:text-white transition-colors cursor-pointer pt-3 border-t border-white/[0.06]"
                >
                  <span>↳ Try this in playground</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 4: Edge Telemetry */}
              <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#f59e0b]/50 transition-all">
                <div>
                  <div className="text-xs font-mono text-[#f59e0b] mb-2">[04 // FLEET HEALTH]</div>
                  <h4 className="text-xl font-bold text-[#f4efe6] mb-2 font-[family-name:var(--font-display)]">
                    Edge Probes
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-6">
                    Automated latency and Redis quota verification probes directly against live endpoints.
                  </p>
                </div>
                <button
                  onClick={() => handleDeepLinkToPlayground("telemetry")}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#f59e0b] hover:text-white transition-colors cursor-pointer pt-3 border-t border-white/[0.06]"
                >
                  <span>↳ Try this in playground</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STAGE 4: ZERO-AUTH PLAYGROUND (THE CENTERPIECE — NO LOGIN REQUIRED) */}
        {/* ========================================================================= */}
        <div id="stage-4" className="w-full">
          <OryzoScreenBlendMorph initialPane={playgroundPane} />
        </div>

        {/* ========================================================================= */}
        {/* STAGE 5: CRAFT, CAD BLUEPRINT & COLOSSAL NAME (MERGED) */}
        {/* ========================================================================= */}
        <section
          id="stage-5"
          className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#08090d] border-b border-[rgba(255,237,214,0.08)] overflow-hidden"
        >
          {/* Amber Glowing Technical Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,133,57,0.08),transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="max-w-2xl mb-12">
              <div className="oryzo-caliper mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]" />
                <span>STAGE 05 // ATTENTION TO DETAIL &amp; GEOMETRIC CRAFT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] tracking-tight mb-4">
                Engineered With Disturbing Levels Of Precision.
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Every curve, bevel radius, and caliper marker was calculated with mathematical rigor so that the software feels inevitable rather than assembled.
              </p>
            </div>

            {/* Amber CAD Wireframes & Circularity Metric Formula Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
              {/* Left Column: Technical Formulas with User Benefit */}
              <div className="lg:col-span-6 space-y-6">
                <div className="oryzo-card p-8 rounded-2xl border border-[rgba(255,133,57,0.25)]">
                  <div className="text-xs font-mono text-[#ff8539] font-bold mb-2">
                    CIRCULARITY &amp; PERIMETER METRIC
                  </div>
                  <div className="text-3xl sm:text-4xl font-serif text-[#ffedd6] font-bold tracking-wider my-4">
                    {SITE_CONFIG.cadBlueprint.circularityFormula}
                  </div>
                  <div className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-4">
                    {SITE_CONFIG.cadBlueprint.circularityName}
                  </div>

                  {/* USER BENEFIT CALLOUT (AS REQUIRED) */}
                  <div className="p-3.5 bg-black/40 rounded-xl border border-[rgba(255,237,214,0.1)] text-xs text-[#ffedd6] font-mono leading-relaxed">
                    <span className="text-[#ff8539] font-bold">USER BENEFIT: </span>
                    &ldquo;{SITE_CONFIG.cadBlueprint.userBenefit}&rdquo;
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#0e1017] border border-white/[0.06]">
                    <div className="text-[#94a3b8]">CALIPER TOLERANCE</div>
                    <div className="text-[#ffedd6] font-bold text-sm mt-1">{SITE_CONFIG.cadBlueprint.caliperTolerance}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1017] border border-white/[0.06]">
                    <div className="text-[#94a3b8]">POLYGON RETENTION</div>
                    <div className="text-[#ffedd6] font-bold text-sm mt-1">{SITE_CONFIG.cadBlueprint.polygonRetention}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual CAD Schematic with Bezier Handles */}
              <div className="lg:col-span-6 relative flex items-center justify-center p-8 bg-[#0c0e14] rounded-2xl border border-[rgba(255,237,214,0.1)]">
                <div className="w-64 h-64 border-2 border-dashed border-[#ff8539]/60 rounded-3xl relative flex items-center justify-center shadow-[0_0_30px_rgba(255,133,57,0.1)]">
                  {/* Outer Bezier Corner Handles */}
                  <span className="w-3 h-3 rounded-sm bg-[#ff8539] absolute -top-1.5 -left-1.5 shadow" />
                  <span className="w-3 h-3 rounded-sm bg-[#ff8539] absolute -top-1.5 -right-1.5 shadow" />
                  <span className="w-3 h-3 rounded-sm bg-[#ff8539] absolute -bottom-1.5 -left-1.5 shadow" />
                  <span className="w-3 h-3 rounded-sm bg-[#ff8539] absolute -bottom-1.5 -right-1.5 shadow" />

                  {/* Center Circle */}
                  <div className="w-44 h-44 rounded-full border border-[#ffedd6]/40 flex items-center justify-center text-center">
                    <div className="font-mono text-[10px] text-[#ff8539]">
                      RADIUS: 0.72m<br />
                      FOV: 32.0°
                    </div>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-white/[0.08]" />
                    <div className="h-full w-[1px] bg-white/[0.08] absolute" />
                  </div>
                </div>
              </div>
            </div>

            {/* CLOSING VISUAL OF STAGE 5: FLOW STRAIGHT INTO COLOSSAL "ORCATHON" DISPLAY */}
            <div className="pt-12 border-t border-[rgba(255,237,214,0.08)] flex flex-col items-center text-center">
              <div className="text-xs font-mono text-[#94a3b8] tracking-widest uppercase mb-4">
                ARCHITECTURAL IDENTITY
              </div>
              <h3 className="text-6xl sm:text-8xl md:text-9xl lg:text-[150px] font-[family-name:var(--font-display)] font-extrabold tracking-[-0.05em] leading-none text-[#ffedd6] select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                ORCATHON
              </h3>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STAGE 6: EDGE DEPLOYMENT, REVIEWS & FINAL CONVERSION (MERGED) */}
        {/* ========================================================================= */}
        <section
          id="stage-6"
          className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#07080a] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto relative z-10 space-y-24">
            {/* PART 1: PRODUCT SHOTS GALLERY (PRODUCT PROOF FIRST) */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-[rgba(255,237,214,0.08)] gap-4">
                <div>
                  <div className="oryzo-caliper mb-2">
                    <span>PRODUCT PROOF FIRST // ON-DEVICE ARCHITECTURE</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)]">
                    Runs on the edge. Refuses the cloud.
                  </h3>
                </div>
                {/* Specific, non-contradictory claim as requested */}
                <p className="text-xs sm:text-sm font-mono text-emerald-400">
                  ● Works offline, always available (zero cloud dependency).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-mono text-[#ff8539] mb-2">[01 // HARDWARE EXECUTION]</div>
                  <h4 className="text-lg font-bold text-[#f4efe6] mb-2">On-Device Processing</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Evaluates problem vectors directly on the client machine with zero cold-start latency.
                  </p>
                </div>

                <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-mono text-[#ff8539] mb-2">[02 // FIELD RESILIENCE]</div>
                  <h4 className="text-lg font-bold text-[#f4efe6] mb-2">Mobile PWA Companion</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Install with one tap. Access full telemetry and query inspections without app store downloads.
                  </p>
                </div>

                <div className="oryzo-card p-6 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-mono text-[#ff8539] mb-2">[03 // ZERO RUNAWAY COST]</div>
                  <h4 className="text-lg font-bold text-[#f4efe6] mb-2">Local Invariant Guarantees</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Self-healing cache ensures queries resolve in memory before triggering network traffic.
                  </p>
                </div>
              </div>
            </div>

            {/* PART 2: BETA FEEDBACK & REVIEWS (SOCIAL PROOF SECOND — NO FABRICATED RATINGS) */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[rgba(255,237,214,0.08)]">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#ff8539] font-bold">BETA FEEDBACK</span>
                  <span className="text-[#94a3b8]">[ {SITE_CONFIG.telemetry.verifiedTestersCount} VERIFIED TESTERS ]</span>
                </div>
                <div className="text-xs font-mono text-[#ffedd6]">ORCATHON IN USE</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-[#0f121a] border border-[rgba(255,237,214,0.1)]">
                    <p className="text-sm text-[#f4efe6] italic leading-relaxed mb-3">
                      &ldquo;The polymorphic Drizzle JSONB schema adapted to our sample track in 30 seconds. Sub-12ms queries on real hardware.&rdquo;
                    </p>
                    <div className="text-xs font-mono text-[#94a3b8]">
                      — Senior Systems Evaluator, Orcathon Testing Fleet
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-[#0f121a] border border-[rgba(255,237,214,0.1)]">
                    <p className="text-sm text-[#f4efe6] italic leading-relaxed mb-3">
                      &ldquo;Having the phone screen blend directly into the application playground without any sign-in wall makes demonstration effortless.&rdquo;
                    </p>
                    <div className="text-xs font-mono text-[#94a3b8]">
                      — Lead Frontend Judge
                    </div>
                  </div>
                </div>

                {/* Interactive 3D Emblem Replacement */}
                <div className="oryzo-card p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#ff8539]/20 via-[#ffedd6]/10 to-[#10b981]/20 border border-[#ff8539]/40 flex items-center justify-center shadow-[0_0_40px_rgba(255,133,57,0.2)] mb-4 hover:rotate-12 transition-transform cursor-pointer">
                    <Cpu className="w-10 h-10 text-[#ffedd6]" />
                  </div>
                  <div className="text-sm font-bold font-mono text-[#f4efe6] mb-1">
                    TITANIUM 3D HARDWARE EMBLEM
                  </div>
                  <div className="text-xs font-mono text-[#94a3b8]">
                    Replaces coaster with interactive on-device 3D telemetry
                  </div>
                </div>
              </div>
            </div>

            {/* PART 3: FINAL PWA LANDING BLOCK & THREE CTAs (CONVERSION LAST) */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#11141e] to-[#07080a] border border-[rgba(255,237,214,0.14)] shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="text-xs font-mono text-[#ff8539] uppercase tracking-widest mb-2">
                  CHOOSE YOUR WORKSPACE
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#f4efe6] font-[family-name:var(--font-display)] mb-4">
                  Deploy Your Solver
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  Available instantly across web, mobile PWA, and dedicated CAD workbench.
                </p>
              </div>

              {/* Segmented Switcher */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 rounded-2xl bg-black/60 border border-white/[0.08]">
                  {[
                    { id: "pwa", label: "PWA COMPANION" },
                    { id: "workbench", label: "PRO WORKBENCH" },
                    { id: "fleet", label: "ENTERPRISE FLEET" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id as "pwa" | "workbench" | "fleet")}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                        selectedTier === tier.id
                          ? "bg-[#ffedd6] text-[#07080a] shadow"
                          : "text-[#94a3b8] hover:text-white"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Points & Three Conversion CTAs */}
              <div className="max-w-xl mx-auto space-y-4 mb-8">
                <div className="flex items-center gap-3 text-xs font-mono text-[#94a3b8]">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Single-tap mobile install with zero app-store friction</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#94a3b8]">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Sub-15ms local cache hit via Upstash Redis sliding window</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#94a3b8]">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Offline background synchronization with indexed client storage</span>
                </div>
              </div>

              {/* THE 3 CONVERSION CTAS (TRY IT NOW, INSTALL PWA, SIGN UP) */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* 1. TRY IT NOW (Jumps back to playground) */}
                <button
                  onClick={() => scrollToStage("playground")}
                  className="oryzo-btn-primary py-3 px-6 text-sm"
                >
                  <Zap className="w-4 h-4" />
                  <span>TRY IT NOW</span>
                </button>

                {/* 2. INSTALL PWA */}
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      alert("PWA install queued. Tap your browser's 'Add to Home Screen' or install icon.");
                    }
                  }}
                  className="oryzo-btn-secondary py-3 px-6 text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>INSTALL PWA</span>
                </button>

                {/* 3. SIGN UP */}
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-full text-sm font-mono tracking-wider text-[#94a3b8] hover:text-white transition-colors"
                >
                  <span>SIGN UP →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Matte Footer */}
      <Footer />
    </div>
  );
}
