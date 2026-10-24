"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProblemAdapter } from "@/components/problem-adapter";
import Link from "next/link";
import {
  ArrowUpRight,
  Database,
} from "lucide-react";

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4efe6] flex flex-col relative selection:bg-[#ff8539]/20 selection:text-[#ffedd6]">
      <Navbar />

      <main className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[rgba(255,237,214,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff8539] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8539]" />
              <span>ACT 5 // HACKATHON TRACK BLUEPRINT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-extrabold tracking-tight text-[#f4efe6]">
              Problem Statement Track Adapter
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="oryzo-btn-primary px-4 py-2 text-xs">
              <span>Test In Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* The Problem Adapter Component */}
        <ProblemAdapter />

        {/* Database Schema & Technical Contract Reference */}
        <section className="mt-16 p-8 rounded-2xl oryzo-card border border-[rgba(255,237,214,0.08)]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff8539] mb-2 uppercase">
            <Database className="w-4 h-4" />
            <span>Database Schema Blueprint (src/db/schema.ts)</span>
          </div>

          <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[#f4efe6] mb-4">
            Polymorphic JSONB Architecture
          </h3>

          <p className="text-sm text-[#94a3b8] max-w-3xl mb-6 leading-relaxed">
            Designed for immediate adaptation when the hackathon problem statement is announced. Contains pre-migrated tables with index-backed JSONB columns so any domain data (telemetry, patient vitals, trading slips, civic votes) can be ingested without schema churn.
          </p>

          <div className="bg-[#050608] rounded-xl p-5 border border-[rgba(255,237,214,0.08)] font-mono text-xs text-[#94a3b8] overflow-x-auto">
            <pre className="text-[#ffedd6]">
{`// src/db/schema.ts — Ready for Sunday Problem Statement
import { pgTable, text, timestamp, jsonb, integer, index } from "drizzle-orm/pg-core";

export const problemSignals = pgTable("problem_signals", {
  id: text("id").primaryKey(),
  track: text("track").notNull(), // 'ai' | 'fintech' | 'civic' | 'healthcare'
  title: text("title").notNull(),
  status: text("status").notNull().default("open"),
  impactScore: integer("impact_score").default(0),
  evidenceMetadata: jsonb("evidence_metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("track_idx").on(table.track),
  index("status_idx").on(table.status),
]);`}
            </pre>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
