"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,237,214,0.08)] bg-[#07080a] py-12 text-[#94a3b8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[rgba(255,237,214,0.06)]">
          {/* Logo & Manifesto */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#12151c] border border-[rgba(255,237,214,0.12)] flex items-center justify-center font-mono text-xs font-bold text-[#ffedd6] shadow-[inset_0_1px_0_rgba(255,237,214,0.15)]">
              OR
            </div>
            <div>
              <p className="text-xs font-bold text-[#f4efe6] tracking-tight uppercase font-[family-name:var(--font-display)]">
                Orcathon 2026 // Weapon-Grade OS
              </p>
              <p className="text-[11px] font-mono text-[#94a3b8]">
                Benchmarked against Oryzo.ai · Built for high-stakes problem resolution
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <Link href="/" className="hover:text-[#ffedd6] transition-colors">
              Overview
            </Link>
            <Link href="/workbench" className="hover:text-[#ffedd6] transition-colors">
              3D Workbench
            </Link>
            <Link href="/dashboard" className="hover:text-[#ffedd6] transition-colors">
              Dashboard
            </Link>
            <Link href="/telemetry" className="hover:text-[#ffedd6] transition-colors">
              Telemetry
            </Link>
            <Link href="/specs" className="hover:text-[#ffedd6] transition-colors">
              Specs & Tracks
            </Link>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#64748b] gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>EDGE FLEET 100% OPERATIONAL</span>
            </span>
            <span>•</span>
            <span>DRAC0-GLTF V2</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/api/health" target="_blank" className="hover:text-[#ffedd6] transition-colors">
              /api/health
            </Link>
            <a
              href="https://github.com/chiraggoenka17512-coder/orcathon-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffedd6] transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
