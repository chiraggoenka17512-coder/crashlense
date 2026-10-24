"use client";

import React from "react";
import { FileText, CheckCircle2 } from "lucide-react";

interface ADRRecord {
  id: string;
  title: string;
  verdict: "CRITICAL GUARD" | "PERFORMANCE WIN" | "STRATEGIC SCOPE" | "DEPLOYMENT WIN";
  verdictColor: string;
  problem: string;
  resolution: string;
  fileHint: string;
}

const ADRS: ADRRecord[] = [
  {
    id: "ADR-001",
    title: "The Clerk vs. Supabase RLS Conflict",
    verdict: "CRITICAL GUARD",
    verdictColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    problem:
      "Supabase defaults to Row Level Security (RLS) linked to its native auth. Using Clerk for auth while querying Supabase through the JS client requires configuring custom JWT templates, signing keys, and claims sync. Debugging RLS 403 Forbidden errors mid-hackathon routinely burns 3-4 hours.",
    resolution:
      "Use Clerk strictly for frontend auth (<SignInButton />, JWT sessions, cookies) and connect to Supabase PostgreSQL directly through Drizzle ORM. Drizzle connects with the database user over port 6543, completely sidestepping RLS token syncing while maintaining server-side security.",
    fileHint: "src/db/index.ts",
  },
  {
    id: "ADR-002",
    title: "Drizzle ORM vs. Prisma Schema Locks",
    verdict: "PERFORMANCE WIN",
    verdictColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    problem:
      "Prisma relies on native Rust engine binaries (generating heavy bundle sizes and cold-start latency spikes on Vercel) and enforces strict migration histories that conflict when team members branch schema changes simultaneously.",
    resolution:
      "Drizzle is pure TypeScript with zero binary dependencies. When the Sunday problem statement drops, schema changes sync in 1.2s via 'npm run db:push' without generating cumbersome SQL migration files or blocking branch merges.",
    fileHint: "src/db/schema.ts",
  },
  {
    id: "ADR-003",
    title: "Upstash Redis: Scoped Rate Limiting",
    verdict: "STRATEGIC SCOPE",
    verdictColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    problem:
      "Over-engineering state by mirroring relational data into Redis adds synchronization debt and cache-invalidation bugs under timed hackathon pressure.",
    resolution:
      "Reserve Upstash Redis strictly for: (1) Sliding-window rate limiting on LLM/agent endpoints to prevent runaway OpenAI/Gemini spend, and (2) Real-time session locks. Our redis.ts includes an automatic in-memory mock fallback so missing keys never halt deployments.",
    fileHint: "src/lib/redis.ts",
  },
  {
    id: "ADR-004",
    title: "Supabase Transaction Pooler on Vercel",
    verdict: "DEPLOYMENT WIN",
    verdictColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    problem:
      "Serverless Vercel lambdas scale down to zero and spawn dozens of ephemeral instances under load. Direct Postgres port 5432 connections quickly exhaust the database max_connections limit.",
    resolution:
      "Always connect via the Supabase AWS Transaction Pooler (port 6543) with 'prepare: false' configured in the postgres driver. This allows unlimited concurrent serverless functions without connection exhaustion.",
    fileHint: "src/db/index.ts:17",
  },
];

export function StackAudit() {
  return (
    <section id="stack-audit" className="py-20 border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-mono mb-3">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>ARCHITECTURAL DECISION RECORDS</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Review & Hackathon Friction Analysis
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              A candid architectural breakdown of our chosen stack: four common hackathon traps, why they derail teams, and how this starter is pre-wired to bypass them.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span>4 Records Committed</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-emerald-400">Zero Unresolved Traps</span>
          </div>
        </div>

        {/* ADR Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADRS.map((adr) => (
            <div
              key={adr.id}
              className="tactile-panel-interactive rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-neutral-400">{adr.id}</span>
                  <span
                    className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${adr.verdictColor}`}
                  >
                    {adr.verdict}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mb-3">
                  {adr.title}
                </h3>

                {/* Problem Breakdown */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                    The Trap:
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {adr.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider block mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    How this template handles it:
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {adr.resolution}
                  </p>
                </div>
              </div>

              {/* Footer File Link */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Wiring Reference:</span>
                <code className="text-neutral-200 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                  {adr.fileHint}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
