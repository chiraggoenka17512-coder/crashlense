"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Key } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") ||
   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_live_"))
);

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/workbench", label: "3D Workbench" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/telemetry", label: "Telemetry & Health" },
  { href: "/specs", label: "Specs & Tracks" },
];

export function Navbar({ className }: { className?: string } = {}) {
  const pathname = usePathname();

  return (
    <header className={className || "sticky top-0 z-50 w-full border-b border-[rgba(255,237,214,0.08)] bg-[#07080a]/85 backdrop-blur-2xl"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-[#12151c] border border-[rgba(255,237,214,0.12)] p-1.5 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,237,214,0.15)] group-hover:border-[rgba(255,133,57,0.5)] transition-all">
            <span className="font-mono text-xs font-bold text-[#ffedd6] tracking-tighter">OR</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] font-extrabold tracking-tight text-[#f4efe6] text-base group-hover:text-white transition-colors">
                ORCATHON
              </span>
              <span className="text-[10px] font-mono font-medium tracking-wider px-1.5 py-0.2 rounded bg-[rgba(255,237,214,0.06)] text-[#ffedd6] border border-[rgba(255,237,214,0.12)]">
                2026
              </span>
            </div>
            <span className="text-[9px] text-[#94a3b8] tracking-widest font-mono -mt-0.5 uppercase">
              WEAPON-GRADE OS
            </span>
          </div>
        </Link>

        {/* Center Nav Links with Active Indicator */}
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
          {/* Live Ping Telemetry Pill */}
          <Link
            href="/telemetry"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f1219]/80 border border-[rgba(255,237,214,0.08)] hover:border-[rgba(255,237,214,0.2)] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-[10px] font-semibold text-[#94a3b8]">12MS PING</span>
          </Link>

          {/* Clerk Auth Integration */}
          {hasClerk ? (
            <div className="flex items-center gap-2">
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#ffedd6] bg-[#12151c] hover:bg-[#1a1e28] border border-[rgba(255,237,214,0.14)] transition-all">
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

          {/* Primary Action Button */}
          <Link
            href="/dashboard"
            className="oryzo-btn-primary py-1.5 px-3.5 text-[11px] hidden sm:inline-flex"
          >
            <span>Launch App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
