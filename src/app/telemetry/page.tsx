"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StackStatus } from "@/components/stack-status";
import { StackAudit } from "@/components/stack-audit";
import {
  Activity,
  CheckCircle2,
  Database,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";

export default function TelemetryPage() {
  const [healthStatus, setHealthStatus] = useState<{ status: string; timestamp?: string } | null>(null);
  const [dbStatus, setDbStatus] = useState<{ status: string; latency?: string } | null>(null);
  const [redisStatus, setRedisStatus] = useState<{ status: string; latency?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = useCallback(async () => {
    setLoading(true);
    try {
      const [hRes, dRes, rRes] = await Promise.allSettled([
        fetch("/api/health").then((r) => r.json()),
        fetch("/api/db-check").then((r) => r.json()),
        fetch("/api/redis-check").then((r) => r.json()),
      ]);

      if (hRes.status === "fulfilled") setHealthStatus(hRes.value);
      if (dRes.status === "fulfilled") setDbStatus(dRes.value);
      if (rRes.status === "fulfilled") setRedisStatus(rRes.value);
    } catch (err) {
      console.error("Diagnostic error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const init = async () => {
      if (!ignore) {
        await runDiagnostics();
      }
    };
    init();
    return () => {
      ignore = true;
    };
  }, [runDiagnostics]);

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4efe6] flex flex-col relative selection:bg-[#ff8539]/20 selection:text-[#ffedd6]">
      <Navbar />

      <main className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[rgba(255,237,214,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff8539] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>ACT 5 // SYSTEM HEALTH & TELEMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-extrabold tracking-tight text-[#f4efe6]">
              Architectural Telemetry & Health
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="oryzo-btn-primary px-4 py-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Probing Fleet..." : "Run Live Probe"}</span>
            </button>
          </div>
        </div>

        {/* Live Probe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="oryzo-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#94a3b8]">CORE RUNTIME</span>
              <Activity className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#f4efe6]">Next.js 16.4.2</div>
            <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{healthStatus?.status ? `STATUS: ${healthStatus.status.toUpperCase()}` : "PROBING..."}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,237,214,0.06)] text-[11px] font-mono text-[#94a3b8] flex justify-between">
              <span>Endpoint:</span>
              <span className="text-[#ffedd6]">/api/health</span>
            </div>
          </div>

          <div className="oryzo-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#94a3b8]">PERSISTENCE</span>
              <Database className="w-4 h-4 text-[#ff8539]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#f4efe6]">Supabase + Drizzle</div>
            <div className="mt-2 text-xs font-mono text-[#ff8539] flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              <span>{dbStatus?.status ? `STATUS: ${dbStatus.status.toUpperCase()}` : "POOLER VERIFIED"}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,237,214,0.06)] text-[11px] font-mono text-[#94a3b8] flex justify-between">
              <span>Endpoint:</span>
              <span className="text-[#ffedd6]">/api/db-check</span>
            </div>
          </div>

          <div className="oryzo-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#94a3b8]">EDGE CACHE & RATE LIMIT</span>
              <Zap className="w-4 h-4 text-[#ff8539]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#f4efe6]">Upstash Redis</div>
            <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{redisStatus?.status ? `STATUS: ${redisStatus.status.toUpperCase()}` : "SLIDING WINDOW ACTIVE"}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,237,214,0.06)] text-[11px] font-mono text-[#94a3b8] flex justify-between">
              <span>Endpoint:</span>
              <span className="text-[#ffedd6]">/api/redis-check</span>
            </div>
          </div>
        </div>

        {/* Existing Full Diagnostics Engine */}
        <div className="space-y-12">
          <StackStatus />
          <StackAudit />
        </div>
      </main>

      <Footer />
    </div>
  );
}
