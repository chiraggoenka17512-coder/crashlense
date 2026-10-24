"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, RefreshCw, Database, ShieldCheck, Zap, Server, Copy, Check } from "lucide-react";

interface HealthData {
  status: string;
  appName: string;
  timestamp: string;
  nodeVersion: string;
  environment: string;
  envCheck: {
    supabase: boolean;
    databaseUrl: boolean;
    clerk: boolean;
    upstash: boolean;
    vercel: boolean;
  };
  readinessScore: string;
}

interface DbData {
  success: boolean;
  message: string;
  latencyMs?: string;
  data?: Record<string, unknown>;
  error?: string;
  tip?: string;
}

interface RedisData {
  success: boolean;
  mode: string;
  message: string;
  latencyMs?: string;
  demoCounter?: number;
  rateLimitInfo?: {
    remaining: number;
    limit: number;
  };
  error?: string;
}

export function StackStatus() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [dbStatus, setDbStatus] = useState<DbData | null>(null);
  const [redisStatus, setRedisStatus] = useState<RedisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runDiagnostics = () => {
    setLoading(true);
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: HealthData) => setHealth(data))
      .catch((err) => console.error("Health probe error:", err));

    fetch("/api/db-check")
      .then((res) => res.json())
      .then((data: DbData) => setDbStatus(data))
      .catch((err: Error) =>
        setDbStatus({
          success: false,
          message: "Failed to reach /api/db-check",
          error: err.message,
        })
      );

    fetch("/api/redis-check")
      .then((res) => res.json())
      .then((data: RedisData) => setRedisStatus(data))
      .catch((err: Error) =>
        setRedisStatus({
          success: false,
          mode: "error",
          message: "Failed to reach /api/redis-check",
          error: err.message,
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let ignore = false;
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: HealthData) => {
        if (!ignore) setHealth(data);
      })
      .catch((err) => console.error("Health probe error:", err));

    fetch("/api/db-check")
      .then((res) => res.json())
      .then((data: DbData) => {
        if (!ignore) setDbStatus(data);
      })
      .catch((err: Error) => {
        if (!ignore) {
          setDbStatus({
            success: false,
            message: "Failed to reach /api/db-check",
            error: err.message,
          });
        }
      });

    fetch("/api/redis-check")
      .then((res) => res.json())
      .then((data: RedisData) => {
        if (!ignore) setRedisStatus(data);
      })
      .catch((err: Error) => {
        if (!ignore) {
          setRedisStatus({
            success: false,
            mode: "error",
            message: "Failed to reach /api/redis-check",
            error: err.message,
          });
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="live-health" className="py-20 border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-mono mb-3">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>SUBSYSTEM TELEMETRY</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Stack Diagnostics
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Real-time probes against local services, Supabase transaction poolers, Clerk auth headers, and Upstash rate-limit engines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {health && (
              <span className="font-mono text-xs text-neutral-300 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.08]">
                Score: <strong className="text-emerald-400">{health.readinessScore}</strong>
              </span>
            )}
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-all flex items-center gap-2 active:translate-y-[1px] disabled:opacity-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Probing..." : "Re-probe Systems"}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Node 1: Supabase + Drizzle */}
          <div className="tactile-panel rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-emerald-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">Supabase Postgres</h3>
                    <span className="text-[10px] font-mono text-neutral-400">Drizzle ORM Engine</span>
                  </div>
                </div>

                {dbStatus?.success ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <AlertCircle className="w-3 h-3" />
                    STANDBY
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-neutral-300 py-2 border-y border-white/[0.06] my-3">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Protocol:</span>
                  <span className="text-white">Transaction Pooler (:6543)</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Latency:</span>
                  <span className="text-emerald-400">{dbStatus?.latencyMs || "Local mock ready"}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Schema Push:</span>
                  <span className="text-white">drizzle-kit push</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                {dbStatus?.success
                  ? "PostgreSQL database actively querying over transaction pooler. Ready for Sunday table additions."
                  : "Database pooler waiting for DATABASE_URL in .env.local. Direct connection bypasses RLS."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400">DATABASE_URL</span>
              <button
                onClick={() => copySnippet("DATABASE_URL=\"postgresql://...\"", "db_url")}
                className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedKey === "db_url" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === "db_url" ? "Copied" : "Copy key template"}</span>
              </button>
            </div>
          </div>

          {/* Node 2: Clerk Auth */}
          <div className="tactile-panel rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-indigo-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">Clerk Auth Engine</h3>
                    <span className="text-[10px] font-mono text-neutral-400">Edge Middleware Guard</span>
                  </div>
                </div>

                {health?.envCheck.clerk ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    KEY PRESENT
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <AlertCircle className="w-3 h-3" />
                    MOCK MODE
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-neutral-300 py-2 border-y border-white/[0.06] my-3">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Proxy Guard:</span>
                  <span className="text-white">src/proxy.ts active</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Components:</span>
                  <span className="text-white">&lt;UserButton /&gt;, &lt;SignIn /&gt;</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Session Type:</span>
                  <span className="text-white">JWT Fast-path</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                Clerk manages sign-in modals, multi-factor, and user profiles. The proxy middleware protects sensitive routes without touching database RLS.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400">CLERK_PUBLISHABLE_KEY</span>
              <button
                onClick={() => copySnippet("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\"pk_test_...\"", "clerk_key")}
                className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedKey === "clerk_key" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === "clerk_key" ? "Copied" : "Copy key template"}</span>
              </button>
            </div>
          </div>

          {/* Node 3: Upstash Redis */}
          <div className="tactile-panel rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-amber-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">Upstash Redis</h3>
                    <span className="text-[10px] font-mono text-neutral-400">Token Limiter & Cache</span>
                  </div>
                </div>

                {redisStatus?.mode === "live_upstash" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    LIVE EDGE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded border border-white/10">
                    SAFE FALLBACK
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-neutral-300 py-2 border-y border-white/[0.06] my-3">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Limiter:</span>
                  <span className="text-white">{"slidingWindow(10, \"10 s\")"}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Mode:</span>
                  <span className="text-neutral-300">{redisStatus?.mode || "in-memory fallback"}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-neutral-400">Remaining QPS:</span>
                  <span className="text-emerald-400">{redisStatus?.rateLimitInfo?.remaining ?? "10/10"}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                Guards costly AI agent and LLM endpoints against runaway quota burns. Includes an automatic in-memory fallback so missing keys never crash builds.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400">UPSTASH_REDIS_REST_URL</span>
              <button
                onClick={() => copySnippet("UPSTASH_REDIS_REST_URL=\"https://...\"", "upstash_key")}
                className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedKey === "upstash_key" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === "upstash_key" ? "Copied" : "Copy key template"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Runtime Environment Bar */}
        {health && (
          <div className="tactile-panel rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-300 gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-neutral-400">
                Runtime: <strong className="text-white font-medium">Node {health.nodeVersion}</strong>
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="font-mono text-neutral-400">
                Environment: <strong className="text-white font-medium">{health.environment}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
              <span>Next.js 16.4.2 (Turbopack)</span>
              <span className="h-3 w-px bg-white/10" />
              <span>React 19.3.0</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
