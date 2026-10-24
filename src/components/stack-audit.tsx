"use client";

import React from "react";
import { AlertTriangle, CheckCircle, ShieldAlert, Cpu, Sparkles, Database } from "lucide-react";

export function StackAudit() {
  return (
    <section id="stack-audit" className="py-16 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            Hackathon Engineering Advisory
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Critical Architecture Review: What to Watch Out For
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            A brutally honest breakdown of your chosen stack for a 24-48h hackathon: traps to avoid and how we wired it to prevent friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Critique 1: Clerk vs Supabase Auth */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">The Clerk + Supabase RLS Trap</h3>
                <span className="text-xs font-mono text-amber-400">High Risk of Wasted Hackathon Hours</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              <strong>The Problem:</strong> Supabase has its own built-in authentication with Row Level Security (RLS). If you authenticate users with Clerk and attempt to use Supabase RLS policies via the Supabase client, you must configure Clerk JWT templates, public keys, and custom headers. During a hackathon, debugging JWT sync mismatches or 403 Forbidden errors can burn 4+ hours.
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs text-neutral-300 space-y-1">
              <span className="text-indigo-400 font-semibold block">✓ How this starter solves it:</span>
              <span>
                Use <strong>Clerk</strong> for frontend Auth UI (<code className="text-pink-400">&lt;SignInButton /&gt;</code>, user profiles) and treat <strong>Supabase</strong> strictly as high-speed PostgreSQL via <strong>Drizzle ORM</strong>. Drizzle executes queries over the direct connection string, completely bypassing RLS headaches!
              </span>
            </div>
          </div>

          {/* Critique 2: Drizzle ORM Speed Advantage */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Drizzle ORM: 10/10 Hackathon Choice</h3>
                <span className="text-xs font-mono text-emerald-400">Superior to Prisma for Timed Events</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              <strong>The Advantage:</strong> Prisma requires Rust engine binary generation (<code className="text-pink-400">npx prisma generate</code>), can cause cold-start latency spikes on Vercel serverless, and strict migration locks. In contrast, Drizzle is pure TypeScript with instant <code className="text-indigo-400">npm run db:push</code>.
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs text-neutral-300 space-y-1">
              <span className="text-emerald-400 font-semibold block">✓ Instant iteration workflow:</span>
              <span>
                Edit <code className="text-indigo-300">src/db/schema.ts</code> and immediately run <code className="text-emerald-300">npm run db:push</code>. Supabase tables update in 1.2 seconds without creating cumbersome SQL migration files.
              </span>
            </div>
          </div>

          {/* Critique 3: Upstash Redis - Necessity vs Overhead */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Upstash Redis: Strategic Use Only</h3>
                <span className="text-xs font-mono text-purple-400">Great for AI Limiting, Overkill for CRUD</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              <strong>The Nuance:</strong> Do not use Redis for relational data that PostgreSQL already stores. Use Upstash specifically for:
              (1) <strong>API Rate Limiting</strong> on costly LLM/OpenAI calls,
              (2) <strong>Leaderboard caching</strong>, or
              (3) <strong>Fast agent memory/session state</strong>.
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs text-neutral-300 space-y-1">
              <span className="text-purple-400 font-semibold block">✓ Resilient Fallback Built-in:</span>
              <span>
                Our <code className="text-indigo-300">src/lib/redis.ts</code> includes an automatic in-memory mock. Your app will NOT crash on deployment if Upstash keys are pending!
              </span>
            </div>
          </div>

          {/* Critique 4: Vercel + Next.js App Router */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Vercel: The Pitch-Winning Secret</h3>
                <span className="text-xs font-mono text-indigo-400">Instant Demo Links for Judges</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              <strong>The Power:</strong> In hackathons, judges test links on mobile and laptops simultaneously. Deploying on Vercel with automatic Git branch previews guarantees that you never have to scramble with Docker, ports, or Nginx at 8:00 AM on demo morning.
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs text-neutral-300 space-y-1">
              <span className="text-indigo-400 font-semibold block">✓ Pro Tip for Orcathon 2026:</span>
              <span>
                Set all your environment variables in Vercel Project Settings ahead of time so every <code className="text-indigo-300">git push</code> immediately updates your live submission URL.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
