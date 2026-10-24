"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Database, Server, Key, Zap, Clock } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      // 1. Health check
      const healthRes = await fetch("/api/health");
      const healthJson = await healthRes.json();
      setHealth(healthJson);

      // 2. DB check
      try {
        const dbRes = await fetch("/api/db-check");
        const dbJson = await dbRes.json();
        setDbStatus(dbJson);
      } catch (e: unknown) {
        setDbStatus({
          success: false,
          message: "Failed to reach /api/db-check",
          error: (e as Error).message,
        });
      }

      // 3. Redis check
      try {
        const redisRes = await fetch("/api/redis-check");
        const redisJson = await redisRes.json();
        setRedisStatus(redisJson);
      } catch (e: unknown) {
        setRedisStatus({
          success: false,
          mode: "error",
          message: "Failed to reach /api/redis-check",
          error: (e as Error).message,
        });
      }
    } catch (err) {
      console.error("Diagnostic error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  return (
    <section id="live-health" className="py-16 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              Real-time System Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Live Stack Diagnostics & Health Check
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Verify database connectivity, authentication keys, and Redis caching before Sunday.
            </p>
          </div>

          <button
            onClick={fetchDiagnostics}
            disabled={loading}
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-500/30 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Re-run Diagnostics</span>
          </button>
        </div>

        {/* 3 Main Diagnostic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Supabase Postgres & Drizzle */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Supabase Postgres</h3>
                  <p className="text-xs text-neutral-400">Drizzle ORM Engine</p>
                </div>
              </div>
              {dbStatus?.success ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <AlertCircle className="w-3 h-3" /> Pending URL
                </span>
              )}
            </div>

            <div className="text-xs space-y-2.5 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between items-center text-neutral-400">
                <span>DATABASE_URL:</span>
                <span className="font-mono text-neutral-200">
                  {health?.envCheck.databaseUrl ? "Configured ✓" : "Missing in .env.local"}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Latency:</span>
                <span className="font-mono text-neutral-200">{dbStatus?.latencyMs || "N/A"}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-[11px] text-neutral-300 leading-relaxed">
                {dbStatus?.message || "Running test query..."}
              </div>
              {dbStatus?.tip && (
                <p className="text-[11px] text-amber-300/80 italic">{dbStatus.tip}</p>
              )}
            </div>
          </div>

          {/* 2. Clerk Authentication */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Clerk Authentication</h3>
                  <p className="text-xs text-neutral-400">Users & Sessions</p>
                </div>
              </div>
              {health?.envCheck.clerk ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-semibold text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" /> Needs Keys
                </span>
              )}
            </div>

            <div className="text-xs space-y-2.5 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Publishable Key:</span>
                <span className="font-mono text-neutral-200">
                  {health?.envCheck.clerk ? "pk_test_... ✓" : "Add to .env.local"}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Secret Key:</span>
                <span className="font-mono text-neutral-200">
                  {health?.envCheck.clerk ? "sk_test_... ✓" : "Add to .env.local"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-[11px] text-neutral-300 leading-relaxed">
                {health?.envCheck.clerk
                  ? "Clerk is fully configured. Modals and UserButton active."
                  : "Template is protected against crashes if keys are absent. Drop in Clerk keys to unlock auth."}
              </div>
            </div>
          </div>

          {/* 3. Upstash Redis & Rate Limiting */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Upstash Redis</h3>
                  <p className="text-xs text-neutral-400">Caching & Rate Limiting</p>
                </div>
              </div>
              {redisStatus?.mode === "live_upstash" ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Live
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Mock Active
                </span>
              )}
            </div>

            <div className="text-xs space-y-2.5 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Mode:</span>
                <span className="font-mono text-neutral-200">
                  {redisStatus?.mode === "live_upstash" ? "Production Upstash" : "In-Memory Mock Fallback"}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Rate Limiter:</span>
                <span className="font-mono text-neutral-200">
                  {redisStatus?.rateLimitInfo ? `${redisStatus.rateLimitInfo.remaining}/${redisStatus.rateLimitInfo.limit} tokens` : "10 req/10s window"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-[11px] text-neutral-300 leading-relaxed">
                {redisStatus?.message || "Checking Redis status..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
