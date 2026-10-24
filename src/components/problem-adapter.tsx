"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Sparkles, Layers, Cpu, ShieldCheck } from "lucide-react";

export function ProblemAdapter() {
  const [activeTab, setActiveTab] = useState<"ai" | "saas" | "marketplace" | "iot">("ai");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tracks = {
    ai: {
      name: "AI & Autonomous Agents",
      icon: Cpu,
      badge: "Track: AI / LLM Orchestration",
      schemaSnippet: `// Add to src/db/schema.ts
export const agentThreads = pgTable("agent_threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  prompt: text("prompt").notNull(),
  reasoningSteps: jsonb("reasoning_steps").$type<string[]>().default([]),
  output: text("output"),
  model: text("model").default("gemini-1.5-pro"),
  tokensUsed: text("tokens_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      apiSnippet: `// In src/app/api/agent/route.ts
import { db } from "@/db";
import { agentThreads } from "@/db/schema";
import { checkRateLimit } from "@/lib/redis";

export async function POST(req: Request) {
  const { userId, prompt } = await req.json();
  // 1. Upstash Rate Limit (prevent OpenAI/Gemini burn)
  const limit = await checkRateLimit(userId);
  if (!limit.success) return new Response("Rate limited", { status: 429 });

  // 2. Insert into Supabase via Drizzle
  const [thread] = await db.insert(agentThreads).values({ userId, prompt }).returning();
  return Response.json({ success: true, threadId: thread.id });
}`,
    },
    saas: {
      name: "B2B SaaS / Productivity",
      icon: Layers,
      badge: "Track: Web Applications & Tools",
      schemaSnippet: `// Add to src/db/schema.ts
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  tier: text("tier").default("free").notNull(),
  billingEmail: text("billing_email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const members = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").references(() => organizations.id),
  userId: text("user_id").notNull(), // Clerk User ID
  role: text("role").default("member"),
});`,
      apiSnippet: `// In src/app/api/org/route.ts
import { db } from "@/db";
import { organizations, members } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  
  const { name, email } = await req.json();
  const [org] = await db.insert(organizations).values({ name, billingEmail: email }).returning();
  await db.insert(members).values({ orgId: org.id, userId, role: "owner" });
  return Response.json(org);
}`,
    },
    marketplace: {
      name: "Marketplace / Commerce",
      icon: ShieldCheck,
      badge: "Track: Platform & Transactions",
      schemaSnippet: `// Add to src/db/schema.ts
export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  sellerId: text("seller_id").notNull(),
  title: text("title").notNull(),
  priceCents: text("price_cents").notNull(),
  category: text("category").notNull(),
  mediaUrls: jsonb("media_urls").$type<string[]>().default([]),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`,
      apiSnippet: `// In src/app/api/listings/route.ts
import { db } from "@/db";
import { listings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const allListings = await db.select().from(listings).where(eq(listings.isAvailable, true)).limit(50);
  return Response.json(allListings);
}`,
    },
    iot: {
      name: "Hardware / Real-Time Telemetry",
      icon: Sparkles,
      badge: "Track: IoT & High-Frequency Events",
      schemaSnippet: `// Add to src/db/schema.ts
export const sensorData = pgTable("sensor_data", {
  id: uuid("id").defaultRandom().primaryKey(),
  deviceId: text("device_id").notNull(),
  sensorType: text("sensor_type").notNull(),
  reading: text("reading").notNull(),
  metrics: jsonb("metrics").$type<Record<string, number>>().default({}),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});`,
      apiSnippet: `// In src/app/api/telemetry/route.ts
import { db } from "@/db";
import { sensorData } from "@/db/schema";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const payload = await req.json();
  // Buffer in Upstash Redis for instant chart rendering
  if (redis) await redis.lpush(\`device:\${payload.deviceId}:stream\`, JSON.stringify(payload));
  // Persist to Supabase Postgres
  await db.insert(sensorData).values(payload);
  return Response.json({ status: "acknowledged" });
}`,
    },
  };

  const current = tracks[activeTab];

  return (
    <section id="problem-adapter" className="py-16 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Delay Sunday Pivot Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Problem Statement Adaptability Engine
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Whatever prompt your team is assigned on Sunday morning, click the track below to immediately grab the type-safe Drizzle schema, API pattern, and Upstash logic.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(Object.keys(tracks) as (keyof typeof tracks)[]).map((tab) => {
            const Icon = tracks[tab].icon;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tracks[tab].name}</span>
              </button>
            );
          })}
        </div>

        {/* Code Snippets Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schema Snippet */}
          <div className="glass-panel rounded-2xl p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-white">schema.ts (Drizzle Model)</span>
              </div>
              <button
                onClick={() => copyToClipboard(current.schemaSnippet, "schema")}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1"
              >
                {copied === "schema" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied === "schema" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-300/90 overflow-x-auto p-3 rounded-lg bg-black/60 leading-relaxed border border-white/5">
              <code>{current.schemaSnippet}</code>
            </pre>
            <p className="mt-3 text-[11px] text-neutral-400">
              Paste into <code className="text-indigo-400 font-mono">src/db/schema.ts</code> and execute{" "}
              <code className="text-emerald-400 font-mono">npm run db:push</code> to instantly migrate Supabase.
            </p>
          </div>

          {/* API Route Snippet */}
          <div className="glass-panel rounded-2xl p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-semibold text-white">route.ts (Next.js API Handler)</span>
              </div>
              <button
                onClick={() => copyToClipboard(current.apiSnippet, "api")}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1"
              >
                {copied === "api" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied === "api" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-indigo-300/90 overflow-x-auto p-3 rounded-lg bg-black/60 leading-relaxed border border-white/5">
              <code>{current.apiSnippet}</code>
            </pre>
            <p className="mt-3 text-[11px] text-neutral-400">
              Integrates Clerk user protection, Upstash rate limiting, and Drizzle query insertion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
