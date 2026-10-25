"use client";

import { useEffect, useRef, useState } from "react";
import type {
  FeatureCardData,
  FeatureCarouselStageProps,
} from "./types";
import { FeatureCard } from "./FeatureCard";

const FEATURES: FeatureCardData[] = [
  {
    id: "signals",
    badge: "[01 // TOPOLOGY BUS]",
    title: "12-Node Microservice DAG",
    description:
      "Live topology graph tracking anomaly percolation vectors across all 12 microservices.",
    accentColor: "#38bdf8",
    targetPane: "radar",
  },
  {
    id: "adapter",
    badge: "[02 // GRAPH PERCOLATION]",
    title: "Tier 0 Graph Percolation",
    description:
      "Simulates failure spreading across dependencies 45s before connection pools exhaust.",
    accentColor: "#ff8539",
    targetPane: "radar",
  },
  {
    id: "track-filters",
    badge: "[03 // REFLEX INCEPTION]",
    title: "System 1 Reflex Model",
    description:
      "Sub-350ms fast-reflex inference diagnosing cascading root causes with zero panic.",
    accentColor: "#a78bfa",
    targetPane: "radar",
  },
  {
    id: "drizzle",
    badge: "[04 // FAILOVER BUS]",
    title: "3-Key Failover Pool",
    description:
      "Dynamic load-shed and pool recycling triggered automatically before SLA breaches.",
    accentColor: "#10b981",
    targetPane: "drizzle",
  },
  {
    id: "schema-inspection",
    badge: "[05 // CHAOS SANDBOX]",
    title: "Incident Detonation Lab",
    description:
      "Deterministic chaos injection: trigger pool leaks, partition partitions, and GC storms.",
    accentColor: "#22d3ee",
    targetPane: "radar",
  },
  {
    id: "fleet",
    badge: "[06 // COUNTERFACTUAL]",
    title: "Saved vs Crashed Proof",
    description:
      "Side-by-side counterfactual traces proving exact downtime dollars and SLAs saved.",
    accentColor: "#f59e0b",
    targetPane: "radar",
  },
  {
    id: "service-probes",
    badge: "[07 // TELEMETRY RING]",
    title: "1Hz Edge Ring Buffer",
    description:
      "Microsecond edge telemetry recording latency spikes, thread lockups, and queue saturation.",
    accentColor: "#34d399",
    targetPane: "telemetry",
  },
];

export function FeatureCarouselStage({
  onDeepLink,
}: FeatureCarouselStageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const activeFeature = FEATURES[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!section || !viewport || !rail) return;

    let frame = 0;

    const updateCarousel = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(rail.children) as HTMLElement[];
        if (cards.length < 2) return;

        const travel = section.offsetHeight - viewport.offsetHeight;
        const progress =
          travel > 0
            ? Math.min(
                1,
                Math.max(0, -section.getBoundingClientRect().top / travel),
              )
            : 0;
        const firstCenter = cards[1].offsetLeft + cards[1].offsetWidth / 2;
        const lastCard = cards[cards.length - 1];
        const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
        const center = firstCenter + (lastCenter - firstCenter) * progress;
        rail.style.transform = `translate3d(${-center}px, -50%, 0)`;

        const nextIndex = 1 + Math.round(progress * (cards.length - 2));
        setActiveIndex((currentIndex) =>
          currentIndex === nextIndex ? currentIndex : nextIndex,
        );
      });
    };

    updateCarousel();
    window.addEventListener("scroll", updateCarousel, { passive: true });
    window.addEventListener("resize", updateCarousel);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateCarousel);
      window.removeEventListener("resize", updateCarousel);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[600svh]">
      <div
        ref={viewportRef}
        className="sticky top-0 z-10 flex h-svh flex-col overflow-hidden px-4 pb-8 pt-24 transition-colors sm:px-6 sm:pb-10 sm:pt-28 lg:px-8"
        style={{
          background: `radial-gradient(ellipse at 50% 55%, ${activeFeature.accentColor}20, transparent 58%), linear-gradient(135deg, #101117 0%, #090a10 52%, #111018 100%)`,
        }}
      >
        {/* Top Header: Left Title matching 03_feature_functionality_carousel.png + Right Caliper */}
        <div className="mx-auto flex w-full max-w-7xl items-start justify-between border-b border-[rgba(255,237,214,0.12)] pb-6">
          <div className="text-left">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff8539] block mb-1">
              SO PROACTIVE,
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[#ffedd6] sm:text-5xl lg:text-6xl uppercase">
              it&apos;s predictive
            </h2>
          </div>

          <div className="text-right hidden sm:block">
            <div className="oryzo-caliper mb-2 justify-end">
              <span
                className="h-1.5 w-1.5 rounded-full animate-ping"
                style={{ backgroundColor: activeFeature.accentColor }}
              />
              <span>STAGE 03 // CORE CAPABILITIES</span>
            </div>
            <p className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider">
              {activeFeature.badge} &middot; [{activeIndex + 1}/{FEATURES.length}]
            </p>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-0 w-full flex-1 items-center overflow-hidden">
          <div
            ref={railRef}
            aria-label="CRASHLENS feature carousel"
            role="region"
            aria-roledescription="carousel"
            className="absolute left-1/2 top-1/2 flex w-max items-center gap-6 will-change-transform sm:gap-8"
          >
            {FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${FEATURES.length}: ${feature.title}`}
                className="w-[min(70vw,46rem)] shrink-0"
              >
                <FeatureCard
                  feature={feature}
                  onDeepLink={onDeepLink}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Left Counter + Center Oryzo 'SCROLL TO CONTINUE' + Right Playground Link */}
        <div className="mx-auto mt-auto flex w-full max-w-7xl items-center justify-between border-t border-[rgba(255,237,214,0.08)] pt-4">
          <div
            aria-label={`Feature ${activeIndex + 1} of ${FEATURES.length}`}
            className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-[#94a3b8]"
          >
            <span style={{ color: activeFeature.accentColor }}>
              0{activeIndex + 1} / 0{FEATURES.length}
            </span>
            <span className="hidden sm:inline">HORIZONTAL FILMSTRIP</span>
          </div>

          {/* Centered Oryzo Reference Pill: (v) SCROLL TO CONTINUE */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-[rgba(255,237,214,0.18)] font-mono text-[9px] sm:text-[10px] text-[#ffedd6] tracking-widest uppercase">
            <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[8px] animate-bounce">
              ↓
            </span>
            <span>SCROLL TO CONTINUE</span>
          </div>

          <a
            href="#stage-4"
            className="group inline-flex min-h-9 items-center gap-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8] transition hover:text-[#ffedd6] active:scale-[0.99]"
          >
            <span>Playground</span>
            <span className="text-[#ff8539] transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
