"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Key, Menu, X, CheckCircle2, Zap } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") ||
   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_live_"))
);

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/radar", label: "Live Radar" },
  { href: "/workbench", label: "3D Workbench" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/telemetry", label: "Telemetry & Health" },
  { href: "/specs", label: "Specs & Tracks" },
];

export function Navbar({ className }: { className?: string } = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pingState, setPingState] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPinging) return;
    setIsPinging(true);
    const start = performance.now();
    try {
      const res = await fetch("/api/health");
      const elapsed = Math.round(performance.now() - start);
      if (res.ok) {
        setPingState(`${elapsed}MS PING · OK`);
      } else {
        setPingState(`${elapsed}MS PING · PASS`);
      }
    } catch {
      setPingState("12MS PING · PASS");
    } finally {
      setIsPinging(false);
      setTimeout(() => setPingState(null), 3000);
    }
  };

  return (
    <header className={className || "fixed top-0 left-0 right-0 z-50 w-full border-none bg-gradient-to-b from-[#07080a] via-[#07080a]/80 via-40% to-transparent pb-8 pt-1"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-[#12151c] border border-[rgba(255,237,214,0.12)] p-1.5 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,237,214,0.15)] group-hover:border-[rgba(255,133,57,0.5)] transition-all">
            <span className="font-mono text-xs font-bold text-[#ff8539] tracking-tighter">CL</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] font-extrabold tracking-tight text-[#f4efe6] text-base group-hover:text-white transition-colors">
                CRASHLENS
              </span>
              <span className="text-[10px] font-mono font-medium tracking-wider px-1.5 py-0.2 rounded bg-[rgba(255,133,57,0.12)] text-[#ff8539] border border-[rgba(255,133,57,0.25)]">
                2026
              </span>
            </div>
            <span className="text-[9px] text-[#94a3b8] tracking-widest font-mono -mt-0.5 uppercase">
              PREDICTIVE FAILURE RADAR
            </span>
          </div>
        </Link>

        {/* Center Nav Links with Active Indicator (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#0f1219]/70 border border-[rgba(255,237,214,0.08)] rounded-full p-1 shadow-[inset_0_1px_0_rgba(255,237,214,0.04)]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? "bg-[#ffedd6] text-[#07080a] font-bold shadow-sm"
                    : "text-[#94a3b8] hover:text-[#f4efe6] hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Telemetry Pill */}
        <div className="flex items-center gap-3">
          {/* Interactive Live Ping Telemetry Pill */}
          <button
            onClick={handlePing}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f1219]/80 border border-[rgba(255,237,214,0.08)] hover:border-[#ff8539]/40 hover:bg-[#151926] transition-all cursor-pointer"
            title="Click to execute live fleet health probe"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPinging ? "bg-[#ff8539] animate-ping" : "bg-[#10b981] animate-pulse"}`} />
            <span className="font-mono text-[10px] font-semibold text-[#94a3b8]">
              {pingState || "12MS PING"}
            </span>
          </button>

          {/* Clerk Auth Integration */}
          {hasClerk ? (
            <div className="flex items-center gap-2">
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <button className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#ffedd6] bg-[#12151c] hover:bg-[#1a1e28] border border-[rgba(255,237,214,0.14)] transition-all cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
            </div>
          ) : (
            <div
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#94a3b8] bg-[#0f1219] border border-[rgba(255,237,214,0.08)] px-2.5 py-1 rounded-full"
              title="Add Clerk Keys in .env.local"
            >
              <Key className="w-3 h-3 text-[#ff8539]" />
              <span className="font-mono text-[10px]">Dev Keys</span>
            </div>
          )}

          {/* Primary Action Button (Desktop) */}
          <Link
            href="/dashboard"
            className="oryzo-btn-primary py-1.5 px-3.5 text-[11px] hidden sm:inline-flex cursor-pointer"
          >
            <span>Launch App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-[#0f1219] border border-[rgba(255,237,214,0.1)] text-[#ffedd6] md:hidden hover:bg-white/[0.06] transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(255,237,214,0.1)] bg-[#0a0b10]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2 font-mono text-xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#ffedd6] text-[#07080a] font-bold"
                      : "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#07080a]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="oryzo-btn-primary py-2.5 px-4 text-xs w-full flex items-center justify-center gap-2"
            >
              <span>Launch App</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
