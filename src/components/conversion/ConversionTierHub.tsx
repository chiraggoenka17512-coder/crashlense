"use client";

import { useEffect, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowRight, Check, Download, Zap, X, Copy, Smartphone, Monitor } from "lucide-react";
import { WORKSPACE_TIERS, type WorkspaceTier } from "./types";
import type { Stage6DeploymentHubProps } from "./types";

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") ||
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_live_")),
);

export function ConversionTierHub({
  onTryItNow,
}: Stage6DeploymentHubProps) {
  const [selectedTier, setSelectedTier] = useState<WorkspaceTier>("pwa");
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const tier = WORKSPACE_TIERS[selectedTier];

  useEffect(() => {
    const captureInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", captureInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstallPrompt(null);
          return;
        }
      } catch (error) {
        console.error("Unable to open the browser install prompt.", error);
      }
    }
    // If prompt is not available (desktop Chrome / iOS Safari / Firefox), open the tactile install modal
    setShowInstallModal(true);
  };

  const handleCopyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  return (
    <section
      aria-labelledby="stage-6-conversion-heading"
      className="relative isolate overflow-hidden rounded-[2rem] border border-[#ffedd6]/15 bg-[radial-gradient(ellipse_at_85%_0%,rgba(255,133,57,0.18),transparent_36%),radial-gradient(ellipse_at_0%_100%,rgba(16,185,129,0.08),transparent_40%),linear-gradient(145deg,#151820_0%,#090a0e_58%,#0d0e12_100%)] px-5 py-9 shadow-[0_36px_100px_rgba(0,0,0,0.48)] sm:px-9 sm:py-12 lg:px-14 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(rgba(255,237,214,0.55)_0.7px,transparent_0.7px)] [background-size:20px_20px]"
      />
      <div className="relative">
        <div className="mb-9 flex flex-col justify-between gap-6 border-b border-white/[0.1] pb-8 lg:mb-11 lg:flex-row lg:items-end">
          <div>
            <div className="oryzo-caliper mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff8539]" />
              <span>03 // YOUR NEXT MOVE</span>
            </div>
            <h2
              id="stage-6-conversion-heading"
              className="font-[family-name:var(--font-display)] text-5xl font-black leading-[0.88] tracking-[-0.065em] text-[#ffedd6] sm:text-7xl lg:text-[clamp(5rem,10vw,9rem)]"
            >
              CRASHLENS
            </h2>
          </div>
          <div className="flex max-w-md items-end gap-4 lg:pb-2">
            <ArrowDownRight
              aria-hidden="true"
              className="mb-1 hidden h-8 w-8 shrink-0 text-[#ff8539] sm:block"
              strokeWidth={1}
            />
            <p className="text-sm leading-7 text-[#b7c0cd] sm:text-base">
              Choose your workspace. Open the tools. Put your next idea to
              work.
            </p>
          </div>
        </div>

        <div className="mb-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
          {(Object.keys(WORKSPACE_TIERS) as WorkspaceTier[]).map((id) => {
            const option = WORKSPACE_TIERS[id];
            const isSelected = selectedTier === id;

            return (
              <button
                key={id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedTier(id)}
                className={`group relative flex min-h-[4.4rem] items-center justify-between overflow-hidden rounded-xl border px-4 py-3 text-left transition duration-300 active:scale-[0.99] cursor-pointer sm:px-5 ${
                  isSelected
                    ? "border-[#ff8539]/70 bg-[#ff8539]/[0.11] text-[#ffedd6] shadow-[inset_0_0_30px_rgba(255,133,57,0.08),0_8px_32px_rgba(255,133,57,0.08)]"
                    : "border-white/[0.1] bg-black/20 text-[#94a3b8] hover:border-white/25 hover:bg-white/[0.04] hover:text-[#ffedd6]"
                }`}
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.11em] sm:text-[11px]">
                  {option.name}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                    isSelected ? "text-[#ff8539]" : "text-[#66717e]"
                  }`}
                />
                {isSelected && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#ff8539] to-transparent" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTier}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid gap-7 rounded-2xl border border-white/[0.1] bg-[#08090d]/60 p-5 backdrop-blur-md sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:p-9"
          >
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="mb-3 font-mono text-[10px] font-bold tracking-[0.18em] text-[#ff8539]">
                  {tier.badge}
                </div>
                <p className="max-w-lg font-[family-name:var(--font-display)] text-xl font-semibold leading-relaxed text-[#f4efe6] sm:text-2xl">
                  {tier.description}
                </p>
              </div>
              <div className="hidden items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-[#778391] lg:flex">
                <span className="h-px w-8 bg-[#ff8539]/70" />
                CRASHLENS // ACCESS CONFIGURATION
              </div>
            </div>
            <ul className="grid content-center gap-3 sm:grid-cols-2">
              {tier.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 text-sm leading-6 text-[#b6c0cc]"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-400"
                    strokeWidth={2}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onTryItNow}
            className="oryzo-btn-primary min-h-12 px-6 cursor-pointer"
          >
            <Zap aria-hidden="true" className="h-4 w-4 text-[#ff8539]" />
            <span>TRY IT NOW</span>
          </button>
          <button
            type="button"
            onClick={handleInstall}
            className="oryzo-btn-secondary min-h-12 px-6 cursor-pointer"
          >
            <Download aria-hidden="true" className="h-4 w-4 text-[#ffedd6]" />
            <span>INSTALL PWA</span>
          </button>
          {hasClerk ? (
            <SignUpButton mode="modal">
              <button
                type="button"
                className="oryzo-btn-secondary min-h-12 px-6 cursor-pointer"
              >
                <span>SIGN UP</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </SignUpButton>
          ) : (
            <button
              type="button"
              onClick={onTryItNow}
              className="oryzo-btn-secondary min-h-12 px-6 cursor-pointer"
            >
              <span>ACCESS RADAR</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* PWA Installation Guide Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-[rgba(255,237,214,0.15)] bg-[#0d0f16] p-6 shadow-2xl space-y-5 text-[#f4efe6]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff8539]/20 border border-[#ff8539]/40 flex items-center justify-center text-[#ff8539]">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[#ffedd6]">
                    Install CrashLens PWA
                  </h3>
                  <span className="font-mono text-[10px] text-emerald-400">
                    60FPS OFFLINE RADAR ENGINE
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowInstallModal(false)}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-start gap-3">
                <Monitor className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#ffedd6]">Chrome / Edge Desktop:</span>
                  <p className="text-[#94a3b8] mt-0.5">Click the Install icon in the address bar, or tap Menu (⋮) → Save and share → Install CrashLens.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#ff8539] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#ffedd6]">iOS Safari / Mobile Chrome:</span>
                  <p className="text-[#94a3b8] mt-0.5">Tap the Share icon (↑) in the browser toolbar, then select &quot;Add to Home Screen&quot;.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141722] hover:bg-[#1a1f2e] border border-white/10 text-xs font-mono text-[#ffedd6] transition-all cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? "Copied to Clipboard! ✓" : "Copy App URL"}</span>
              </button>

              <button
                onClick={() => setShowInstallModal(false)}
                className="oryzo-btn-primary py-2 px-5 text-xs cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
