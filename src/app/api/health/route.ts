import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    databaseUrl: Boolean(process.env.DATABASE_URL),
    clerk: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY),
    upstash: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
    vercel: Boolean(process.env.VERCEL),
  };

  const configuredCount = Object.values(envCheck).filter(Boolean).length;

  return NextResponse.json({
    status: "ok",
    appName: "Orcathon 2026 Engine",
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
    envCheck,
    readinessScore: `${configuredCount}/5 integrations active`,
  });
}
