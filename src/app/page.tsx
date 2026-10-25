"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroToDeviceChoreography } from "@/components/oryzo/HeroToDeviceChoreography";
import { OryzoScreenBlendMorph, ActivePane } from "@/components/oryzo/OryzoScreenBlendMorph";
import { FeatureCarouselStage } from "@/components/features/FeatureCarouselStage";
import { Stage6DeploymentHub } from "@/components/conversion/Stage6DeploymentHub";
import { SITE_CONFIG } from "@/config/site-config";
import { Zap } from "lucide-react";

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
  const [isFeatureStageInView, setIsFeatureStageInView] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [playgroundPane, setPlaygroundPane] = useState<ActivePane>("radar");

  // Track scroll position to toggle sticky "Try It Now" CTA and active stage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyCta(scrollY > 420);

      const featureStage = document.getElementById("stage-3");
      if (featureStage) {
        const rect = featureStage.getBoundingClientRect();
        setIsFeatureStageInView(
          rect.top <= window.innerHeight * 0.45 &&
            rect.bottom >= window.innerHeight * 0.25,
        );
      }

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
      {/* Global Floating Oryzo Navbar (Seamless gradient blend, zero hard rectangular cuts) */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 w-full border-none bg-gradient-to-b from-[#07080a] via-[#07080a]/80 via-40% to-transparent pb-8 pt-1 pointer-events-auto" />

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
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffedd6] hover:bg-white text-[#07080a] font-mono text-xs font-bold tracking-wider shadow-[0_10px_25px_rgba(255,237,214,0.3)] hover:scale-105 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#ff8539]" />
          <span>TRY IT NOW</span>
        </Link>
      </div>

      {/* Mobile Floating Sticky CTA */}
      <div
        className={`fixed z-50 transition-all duration-300 sm:hidden ${
          showStickyCta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        } bottom-6 right-6`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#ffedd6] text-[#07080a] font-mono text-xs font-black tracking-wider shadow-[0_12px_30px_rgba(0,0,0,0.8)] border border-amber-900/30 active:scale-95 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#ff8539]" />
          <span>TRY IT NOW</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* SLIM 6-STAGE TECHNICAL PROGRESS INDICATOR (CLICKABLE TICK MARKS) */}
      {/* ========================================================================= */}
      <aside className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-3.5 pointer-events-auto transition-opacity duration-300 ${
        isFeatureStageInView || activeStage === "stage-3"
          ? "invisible pointer-events-none"
          : activeStage === "stage-1"
            ? "opacity-35 hover:opacity-100"
            : "opacity-100"
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
          className="relative w-full border-b border-[rgba(255,237,214,0.08)] bg-[#07080a]"
        >
          <FeatureCarouselStage onDeepLink={handleDeepLinkToPlayground} />
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

            {/* CLOSING VISUAL OF STAGE 5: FLOW STRAIGHT INTO COLOSSAL "CRASHLENS" DISPLAY */}
            <div className="pt-12 border-t border-[rgba(255,237,214,0.08)] flex flex-col items-center text-center">
              <div className="text-xs font-mono text-[#94a3b8] tracking-widest uppercase mb-4">
                ARCHITECTURAL IDENTITY
              </div>
              <h3 className="text-6xl sm:text-8xl md:text-9xl lg:text-[150px] font-[family-name:var(--font-display)] font-extrabold tracking-[-0.05em] leading-none text-[#ffedd6] select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                CRASHLENS
              </h3>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/specs"
                  className="oryzo-btn-primary py-2.5 px-6 text-xs font-mono font-bold tracking-wider cursor-pointer"
                >
                  <span>INSPECT BLUEPRINT SPECS →</span>
                </Link>
                <Link
                  href="/workbench"
                  className="oryzo-btn-secondary py-2.5 px-6 text-xs font-mono tracking-wider cursor-pointer"
                >
                  <span>3D WORKBENCH (180° FLIP)</span>
                </Link>
              </div>
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
          <Stage6DeploymentHub onTryItNow={() => scrollToStage("playground")} />
        </section>
      </main>

      {/* Global Matte Footer */}
      <Footer />
    </div>
  );
}
