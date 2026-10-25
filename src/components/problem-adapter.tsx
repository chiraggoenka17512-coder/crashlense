"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode, Layers } from "lucide-react";

type TrackKey = "civic" | "ai" | "saas" | "fintech";

interface TrackDefinition {
  id: TrackKey;
  name: string;
  badge: string;
  tagline: string;
  files: {
    name: string;
    description: string;
    code: string;
  }[];
}

const TRACKS: Record<TrackKey, TrackDefinition> = {
  civic: {
    id: "civic",
    name: "Civic & Health Problem Signals",
    badge: "CrashLens Distributed Blueprint",
    tagline: "Ranked community signals with telemetry logs, verified impacts, and audit notes.",
    files: [
      {
        name: "src/db/schema.ts",
        description: "Drizzle table definition with enum statuses and impact weighting",
        code: `import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const problemSignals = pgTable("problem_signals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("health"), // health, civic, education
  status: text("status").notNull().default("open"),        // open, investigating, resolved
  impactScore: integer("impact_score").notNull().default(3), // 1-5 scale
  notes: text("notes"),
  evidenceMetadata: jsonb("evidence_metadata").$type<{
    reportedBy?: string;
    facilityId?: string;
    geoCoordinates?: [number, number];
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      },
      {
        name: "src/app/api/signals/route.ts",
        description: "Next.js App Router handler with Upstash rate guard and Drizzle insert",
        code: `import { NextResponse } from "next/server";
import { db } from "@/db";
import { problemSignals } from "@/db/schema";
import { checkRateLimit } from "@/lib/redis";
import { desc } from "drizzle-orm";

export async function GET() {
  const signals = await db
    .select()
    .from(problemSignals)
    .orderBy(desc(problemSignals.impactScore));
  return NextResponse.json({ signals });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limit = await checkRateLimit(ip);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const [created] = await db.insert(problemSignals).values(body).returning();
  return NextResponse.json({ success: true, item: created }, { status: 201 });
}`,
      },
      {
        name: "src/db/seed.ts",
        description: "Instant seed script matching Supabase aegis demo records",
        code: `import { db } from "@/db";
import { problemSignals } from "@/db/schema";

const SAMPLE_RECORDS = [
  { title: "Rural clinic wait-time tracker", category: "health", impactScore: 5, notes: "Avg 47 min wait reported by 3 PHCs." },
  { title: "Cold-chain vaccine temperature log", category: "health", impactScore: 4, notes: "Breaks in last-mile storage." },
  { title: "School dropout early-warning", category: "education", impactScore: 4, notes: "10+ days consecutive absence triggers." },
];

export async function seedDryRun() {
  await db.insert(problemSignals).values(SAMPLE_RECORDS);
  console.log("✓ Seeded dry-run civic signals successfully.");
}`,
      },
    ],
  },
  ai: {
    id: "ai",
    name: "Autonomous Agents & Memory",
    badge: "Track: AI / LLM Orchestration",
    tagline: "Persistent agent message threads with JSONB reasoning trees and token-budget guards.",
    files: [
      {
        name: "src/db/schema.ts",
        description: "Multi-turn agent threads with token usage and reasoning arrays",
        code: `import { pgTable, uuid, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  prompt: text("prompt").notNull(),
  model: text("model").notNull().default("gemini-2.5-flash"),
  thoughtSteps: jsonb("thought_steps").$type<{
    stepIndex: number;
    title: string;
    reasoning: string;
    toolCall?: string;
  }[]>().default([]),
  finalOutput: text("final_output"),
  tokensConsumed: integer("tokens_consumed").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      },
      {
        name: "src/app/api/agent/route.ts",
        description: "Agent execution route with sliding-window Upstash cost limiter",
        code: `import { NextResponse } from "next/server";
import { db } from "@/db";
import { agentRuns } from "@/db/schema";
import { checkRateLimit } from "@/lib/redis";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // Upstash sliding-window rate limit to stop runaway token drain
  const limiter = await checkRateLimit(\`agent:\${userId}\`);
  if (!limiter.success) {
    return NextResponse.json({ error: "Token throttle: 10 requests / 10s" }, { status: 429 });
  }

  const { prompt, model } = await req.json();
  const [run] = await db.insert(agentRuns).values({
    userId,
    prompt,
    model: model || "gemini-2.5-flash",
  }).returning();

  return NextResponse.json({ runId: run.id, status: "queued" });
}`,
      },
    ],
  },
  saas: {
    id: "saas",
    name: "Multi-Tenant SaaS / Workflow",
    badge: "Track: B2B Systems",
    tagline: "Clerk-authenticated team workspaces with role-based member routing and Supabase CRUD.",
    files: [
      {
        name: "src/db/schema.ts",
        description: "Organizations, team memberships, and scoped projects",
        code: `import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(), // Clerk User ID
  role: text("role").notNull().default("member"), // admin, member, viewer
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      },
      {
        name: "src/app/api/workspace/route.ts",
        description: "Clerk session extraction with Drizzle workspace lookup",
        code: `import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { teamMembers, organizations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const memberships = await db
    .select({
      orgId: organizations.id,
      name: organizations.name,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(organizations, eq(teamMembers.orgId, organizations.id))
    .where(eq(teamMembers.userId, userId));

  return NextResponse.json({ memberships });
}`,
      },
    ],
  },
  fintech: {
    id: "fintech",
    name: "Fintech & High-QPS Transactions",
    badge: "Track: Platform & Transactions",
    tagline: "ACID balance transfers with strict Postgres constraints and Upstash anti-abuse throttle.",
    files: [
      {
        name: "src/db/schema.ts",
        description: "Double-entry transaction ledger with immutable audit records",
        code: `import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const ledgerAccounts = pgTable("ledger_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  holderId: text("holder_id").notNull(),
  currency: text("currency").notNull().default("USD"),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("0.00"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ledgerTransactions = pgTable("ledger_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fromAccount: uuid("from_account").references(() => ledgerAccounts.id),
  toAccount: uuid("to_account").references(() => ledgerAccounts.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  referenceNote: text("reference_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      },
      {
        name: "src/app/api/transfer/route.ts",
        description: "Transaction execution via Drizzle client transaction block",
        code: `import { NextResponse } from "next/server";
import { db } from "@/db";
import { ledgerAccounts, ledgerTransactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  const { fromId, toId, amount } = await req.json();

  // Execute in single atomic Postgres transaction
  const txResult = await db.transaction(async (tx) => {
    // 1. Deduct sender
    await tx.execute(
      sql\`UPDATE ledger_accounts SET balance = balance - \${amount} WHERE id = \${fromId} AND balance >= \${amount}\`
    );
    // 2. Credit receiver
    await tx.execute(
      sql\`UPDATE ledger_accounts SET balance = balance + \${amount} WHERE id = \${toId}\`
    );
    // 3. Record transaction
    const [entry] = await tx.insert(ledgerTransactions).values({
      fromAccount: fromId,
      toAccount: toId,
      amount: String(amount),
    }).returning();
    return entry;
  });

  return NextResponse.json({ success: true, transaction: txResult });
}`,
      },
    ],
  },
};

export function ProblemAdapter() {
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>("civic");
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const track = TRACKS[selectedTrack];
  const activeFile = track.files[activeFileIndex] || track.files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="problem-adapter" className="py-20 border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>SCHEMA & ROUTE BLUEPRINTS</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Track Inspector
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              When detonating chaos scenarios, switch the track below to inspect ready-to-paste Drizzle schemas, route handlers, and rate limiters for CrashLens.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-400">
              Instant schema push: <code className="text-white bg-white/[0.08] px-2 py-0.5 rounded border border-white/10">npm run db:push</code>
            </span>
          </div>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {(Object.keys(TRACKS) as TrackKey[]).map((key) => {
            const t = TRACKS[key];
            const isSelected = selectedTrack === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedTrack(key);
                  setActiveFileIndex(0);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all duration-150 active:translate-y-[1px] ${
                  isSelected
                    ? "bg-white/[0.08] border-white/[0.2] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {t.badge}
                  </span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight">{t.name}</h3>
              </button>
            );
          })}
        </div>

        {/* Workbench Card with Code Preview */}
        <div className="tactile-panel rounded-2xl overflow-hidden backdrop-blur-2xl border border-white/[0.08]">
          {/* File Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-white/[0.02] gap-3">
            {/* File Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {track.files.map((file, idx) => {
                const isActive = activeFileIndex === idx;
                return (
                  <button
                    key={file.name}
                    onClick={() => setActiveFileIndex(idx)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all active:translate-y-[1px] ${
                      isActive
                        ? "bg-white/[0.1] text-white border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 hidden md:inline">
                {activeFile.description}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-all flex items-center gap-1.5 active:translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="font-mono text-[11px]">Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Code Editor Area */}
          <div className="p-4 sm:p-6 bg-[#06070a]/90 overflow-x-auto">
            <pre className="font-mono text-xs text-neutral-200 leading-relaxed">
              <code>{activeFile.code}</code>
            </pre>
          </div>

          {/* Context Footer Banner */}
          <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.015] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-2">
            <span>
              <strong>Sunday tip:</strong> Edit <code className="text-neutral-200">src/db/schema.ts</code>, run <code className="text-neutral-200">npm run db:push</code>, and reload.
            </span>
            <span className="font-mono text-[11px] text-neutral-400">
              Zero manual migrations · Instant Supabase push
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
