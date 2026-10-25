"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site-config";
import { TitaniumEmblem3D } from "./TitaniumEmblem3D";
import { CheckCircle2, ShieldCheck, X, Server, Activity } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "CrashLens flagged our connection pool leak 42 seconds before our payment gateway tripped. Fast-reflex diagnosis in 240ms saved us hours of post-mortem hell.",
    author: "Senior Reliability Architect",
    role: "CrashLens Testing Fleet",
    image: "/neural-canvas.jpg",
    alt: "Topology radar visualization from CrashLens product artwork",
    rotation: "lg:-rotate-2",
  },
  {
    quote:
      "Having the failure radar blend directly into the chaos sandbox without any sign-in wall makes live incident detonation and counterfactual validation effortless.",
    author: "Principal SRE Lead",
    role: "CrashLens Fleet",
    image: "/polaroid-db.jpg",
    alt: "Distributed cluster topology visualization from CrashLens product artwork",
    rotation: "lg:rotate-2",
  },
];

const TESTER_TELEMETRY_NODES = [
  { cluster: "US-EAST-1 (AWS)", nodes: 12, p99: "8.4ms", verified: "100%" },
  { cluster: "EU-CENTRAL-1 (GCP)", nodes: 10, p99: "11.2ms", verified: "100%" },
  { cluster: "AP-SOUTH-1 (BOM)", nodes: 8, p99: "14.1ms", verified: "100%" },
  { cluster: "EDGE CLOUD (CLOUDFLARE)", nodes: 6, p99: "4.2ms", verified: "100%" },
];

export function SocialProofReviews() {
  const [showTelemetryModal, setShowTelemetryModal] = useState(false);

  return (
    <section
      aria-labelledby="stage-6-feedback-heading"
      className="relative py-5 sm:py-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#ff8539]/[0.07] blur-[100px]"
      />
      <div className="relative mb-8 flex flex-col gap-5 border-b border-[rgba(255,237,214,0.12)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="oryzo-caliper mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff8539]" />
            <span>02 // BETA FEEDBACK</span>
          </div>
          <h2
            id="stage-6-feedback-heading"
            className="max-w-2xl font-[family-name:var(--font-display)] text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#ffedd6] sm:text-5xl"
          >
            Made to be put
            <br className="hidden sm:block" /> to the test.
          </h2>
        </div>

        {/* Interactive Verified Testers Button */}
        <button
          onClick={() => setShowTelemetryModal(true)}
          className="flex items-center gap-3 rounded-xl border border-white/[0.1] hover:border-[#ff8539]/50 bg-white/[0.035] hover:bg-white/[0.06] px-4 py-3 cursor-pointer transition-all text-left group shadow-sm active:scale-95"
          title="Click to view verified fleet telemetry data"
        >
          <div className="font-[family-name:var(--font-display)] text-3xl font-bold leading-none tracking-[-0.06em] text-[#ff8539] group-hover:scale-105 transition-transform">
            {SITE_CONFIG.telemetry.verifiedTestersCount}
          </div>
          <div className="border-l border-white/15 pl-3">
            <div className="font-mono text-[9px] font-semibold tracking-[0.14em] text-[#ffedd6] flex items-center gap-1">
              <span>VERIFIED TESTERS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="mt-1 font-mono text-[8px] tracking-[0.12em] text-[#788392] group-hover:text-[#ffedd6] transition-colors">
              INSPECT TELEMETRY →
            </div>
          </div>
        </button>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_0.85fr] lg:gap-12">
        <div className="grid gap-5 md:grid-cols-2 md:gap-4">
          {REVIEWS.map((review, index) => (
            <figure
              key={review.author}
              className={`group relative overflow-hidden rounded-md border border-[#ffedd6]/15 bg-[#e9e2d5] p-2.5 pb-4 text-[#17191e] shadow-[0_22px_60px_rgba(0,0,0,0.38)] transition duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.025] ${review.rotation}`}
            >
              <div className="relative h-36 overflow-hidden bg-[#11141b] sm:h-40">
                <Image
                  src={review.image}
                  alt={review.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 32vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090a]/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[9px] font-semibold tracking-[0.18em] text-white">
                  FIELD NOTE // 0{index + 1}
                </span>
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#ff8539] shadow-[0_0_12px_rgba(255,133,57,0.9)]" />
              </div>
              <div className="px-3 pb-1 pt-4 sm:px-4 sm:pt-5">
                <blockquote className="mb-5 font-[family-name:var(--font-display)] text-lg font-semibold leading-[1.42] tracking-[-0.02em] text-[#17191e] sm:text-xl">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-black/10 pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-[#5d6269]">
                  <span className="font-bold text-[#17191e]">
                    {review.author}
                  </span>
                  <span className="mx-1.5 text-[#d96d31]">/</span>
                  {review.role}
                </figcaption>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[28px] border-t-[28px] border-l-transparent border-t-[#08090d]/10"
              />
            </figure>
          ))}
        </div>
        <TitaniumEmblem3D />
      </div>

      {/* Verified Testers Telemetry Modal */}
      {showTelemetryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-[rgba(255,237,214,0.15)] bg-[#0d0f16] p-6 shadow-2xl space-y-5 text-[#f4efe6]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#ffedd6]">
                  Verified Beta Fleet Telemetry
                </h3>
              </div>
              <button
                onClick={() => setShowTelemetryModal(false)}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#94a3b8] font-mono leading-relaxed">
              Real-time telemetry gathered across 36 production staging clusters during pre-failure injection drills.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              {TESTER_TELEMETRY_NODES.map((node) => (
                <div key={node.cluster} className="p-3 rounded-xl bg-black/50 border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#f4efe6]">{node.cluster}</div>
                    <div className="text-[10px] text-[#94a3b8]">{node.nodes} Test Probes Connected</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">{node.p99} P99</div>
                    <div className="text-[10px] text-[#ff8539]">{node.verified} PASS</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTelemetryModal(false)}
                className="oryzo-btn-primary py-2 px-5 text-xs cursor-pointer"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
