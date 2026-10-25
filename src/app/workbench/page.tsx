import React from "react";
import { Navbar } from "@/components/navbar";
import { SmartFlipWorkbench } from "@/components/smart-flip/SmartFlipWorkbench";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Cpu, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "3D Architecture Workbench | CrashLens 2026",
  description:
    "Physical CAD cutting mat stage featuring the photorealistic Apple iPhone 16 Pro 3D centerpiece with 180° flip telemetry mechanics.",
};

export default function WorkbenchPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4efe6] flex flex-col relative selection:bg-[#ff8539]/20 selection:text-[#ffedd6]">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Breadcrumb & Navigation Bar */}
        <div className="w-full border-b border-[rgba(255,237,214,0.06)] bg-[#0a0b0f]/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-mono">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-[#94a3b8] hover:text-[#ffedd6] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>OVERVIEW</span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#ffedd6] font-semibold">ACT 4 // SMART FLIP WORKBENCH</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="oryzo-caliper hidden sm:inline-flex">
                <Cpu className="w-3 h-3 text-[#ff8539]" />
                <span>35K MESH // DRACO PBR</span>
              </span>
              <span className="oryzo-caliper">
                <ShieldCheck className="w-3 h-3 text-[#10b981]" />
                <span>60 FPS LOCKED</span>
              </span>
            </div>
          </div>
        </div>

        {/* The Full Smart Flip Workbench Component */}
        <SmartFlipWorkbench />

        {/* Industrial Architecture Deep Dive Notes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[rgba(255,237,214,0.06)] bg-[#090b0e]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="oryzo-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#151821] border border-[rgba(255,237,214,0.1)] flex items-center justify-center">
                  <span className="font-mono text-xs text-[#ff8539]">01</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[#f4efe6]">
                  Dual-Sided Dynamic Projection
                </h3>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                The 3D smartphone is modeled after the authentic iPhone 16 Pro. The front OLED polygon receives a real-time 60 FPS HTML5 Canvas texture projection displaying live system telemetry, waveforms, and Dynamic Island state.
              </p>
            </div>

            <div className="oryzo-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#151821] border border-[rgba(255,237,214,0.1)] flex items-center justify-center">
                  <span className="font-mono text-xs text-[#ff8539]">02</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[#f4efe6]">
                  Grade 5 Titanium Physics
                </h3>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                When flipped 180°, the chassis reveals three concentric optical camera barrels, frosted titanium backplate, LiDAR sensor, and Apple emblem rendered with micro-roughness specular reflections.
              </p>
            </div>

            <div className="oryzo-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#151821] border border-[rgba(255,237,214,0.1)] flex items-center justify-center">
                  <span className="font-mono text-xs text-[#ff8539]">03</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[#f4efe6]">
                  Serverless Live Wire
                </h3>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                The inspector connects Drizzle ORM queries directly to Supabase Postgres pooling and Upstash Redis rate-limiting, achieving sub-15ms p99 round trips across the serverless fleet.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
