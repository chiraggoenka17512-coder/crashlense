import { NextResponse } from "next/server";
import { redis, isRedisConfigured, checkRateLimit } from "@/lib/redis";

export async function GET(request: Request) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({
      success: true,
      mode: "mock_fallback",
      message: "Upstash Redis keys not provided yet. Graceful fallback active.",
      tip: "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local to activate real Upstash Redis.",
    });
  }

  const startTime = Date.now();
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimitResult = await checkRateLimit(ip);

    // Increment an activity test counter
    const visits = await redis.incr("crashlens:demo:counter");
    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      mode: "live_upstash",
      message: "Upstash Redis ping and counter working!",
      latencyMs: `${latencyMs}ms`,
      demoCounter: visits,
      rateLimitInfo: {
        remaining: rateLimitResult.remaining,
        limit: rateLimitResult.limit,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Upstash Redis REST API.",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
