"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080c] py-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5">
              <div className="h-full w-full bg-[#07080c] rounded-[6px] flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">Orcathon 2026 Engine</p>
              <p className="text-xs text-neutral-400">Next.js 16 • Supabase • Clerk • Drizzle • Upstash</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-300">
            <Link href="/api/health" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>/api/health</span>
            </Link>
            <Link href="/api/db-check" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
              <span>/api/db-check</span>
            </Link>
            <Link href="/api/redis-check" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
              <span>/api/redis-check</span>
            </Link>
          </div>

          <div className="text-xs text-neutral-400">
            <span>Ready for Sunday Hackathon Submission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
