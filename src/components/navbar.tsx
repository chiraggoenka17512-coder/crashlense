"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, Key } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") ||
   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_live_"))
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="h-full w-full bg-[#090a0f] rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-base">ORCATHON</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                2026
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wide font-mono -mt-0.5">NEXT + DRIZZLE + CLERK</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#stack-audit" className="hover:text-white transition-colors">
            Stack Audit
          </a>
          <a href="#live-health" className="hover:text-white transition-colors">
            Live Diagnostics
          </a>
          <a href="#problem-adapter" className="hover:text-white transition-colors">
            Track Adapter
          </a>
        </nav>

        {/* Right CTA / Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Clerk Auth Integration */}
          {hasClerk ? (
            <div className="flex items-center gap-2">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-150 shadow-md shadow-indigo-600/30 active:scale-95">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md" title="Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local">
              <Key className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] hidden sm:inline">Clerk: Add Keys</span>
            </div>
          )}

          {/* Health quick link */}
          <Link
            href="/api/health"
            target="_blank"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/80 border border-white/10 hover:border-white/20 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>API Health</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
