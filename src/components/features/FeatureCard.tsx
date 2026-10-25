import { ArrowRight } from "lucide-react";
import type { FeatureCardData, FeatureCarouselStageProps } from "./types";

interface FeatureCardProps {
  feature: FeatureCardData;
  onDeepLink: FeatureCarouselStageProps["onDeepLink"];
  isActive: boolean;
}

export function FeatureCard({ feature, onDeepLink, isActive }: FeatureCardProps) {
  return (
    <article
      aria-current={isActive ? "true" : undefined}
      className={`relative flex h-[28rem] sm:h-[31rem] w-full flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-9 transition-all duration-500 ${
        isActive
          ? "border-2 border-dashed border-[#ff8539] opacity-100 shadow-[0_0_60px_rgba(255,133,57,0.35),inset_0_1px_0_rgba(255,237,214,0.2)] scale-[1.01]"
          : "border border-[rgba(255,237,214,0.1)] opacity-50 scale-[0.98] hover:opacity-80"
      }`}
      style={{
        background: `radial-gradient(ellipse at 100% 0%, ${feature.accentColor}${isActive ? "35" : "15"}, transparent 65%), linear-gradient(145deg, #161822 0%, #0c0e14 75%)`,
      }}
    >
      {/* CAD Corner Ticks for Spotlight Card */}
      {isActive && (
        <>
          <div className="absolute top-2 left-2 font-mono text-[9px] text-[#ff8539] pointer-events-none">[+]</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-[#ff8539] pointer-events-none">[+]</div>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#ff8539] pointer-events-none">[+]</div>
          <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#ff8539] pointer-events-none">[+]</div>
        </>
      )}

      <div className="relative">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em]"
          style={{
            color: feature.accentColor,
            borderColor: `${feature.accentColor}66`,
            backgroundColor: `${feature.accentColor}15`,
          }}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: feature.accentColor }} />
          {feature.badge}
        </div>
        <h3 className="mb-4 max-w-[16ch] font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight tracking-tight text-[#ffedd6] sm:text-4xl">
          {feature.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-[#c3cbd7] sm:text-base">
          {feature.description}
        </p>
      </div>

      {/* Oryzo-style Spotlight Prompt Input Bar (Matching 03_feature_functionality_carousel.png) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-black/85 border border-[#ff8539]/40 p-2 sm:p-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#ffedd6] truncate">
            <span className="text-[#94a3b8]">HEY</span>
            <span className="text-[#ff8539] font-bold">@CRASHLENS,</span>
            <span className="text-[#f4efe6]/90 truncate">PREDICT CASCADE ON PAYMENTS-DB?</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (feature.preloadedTrack) {
                onDeepLink(feature.targetPane, feature.preloadedTrack);
                return;
              }
              onDeepLink(feature.targetPane);
            }}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#ff8539] hover:bg-[#ff9550] text-[#07080a] font-mono text-[10px] font-bold uppercase tracking-wider transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>RUN RCA</span>
            <span>↳</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (feature.preloadedTrack) {
              onDeepLink(feature.targetPane, feature.preloadedTrack);
              return;
            }
            onDeepLink(feature.targetPane);
          }}
          className="group relative flex w-full min-h-11 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left font-mono text-xs font-bold uppercase tracking-wide transition-all hover:brightness-125 active:scale-[0.99] cursor-pointer"
          style={{
            color: feature.accentColor,
            borderColor: `${feature.accentColor}55`,
            backgroundColor: `${feature.accentColor}12`,
          }}
        >
          <span>↳ Open in Live Failure Playground</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}
