import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export const isRedisConfigured = Boolean(redisUrl && redisToken);

/**
 * Upstash Redis client instance
 */
export const redis = isRedisConfigured
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : null;

/**
 * Pre-configured Ratelimiter for API routes (e.g. LLM calls, AI agents, public endpoints)
 * Default: 10 requests per 10 seconds sliding window
 */
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: true,
      prefix: "crashlens:ratelimit",
    })
  : null;

/**
 * Helper to check rate limit safely with fallback if Redis is not configured
 */
export async function checkRateLimit(identifier: string) {
  if (!ratelimit) {
    return { success: true, limit: 10, remaining: 10, reset: 0, isMock: true };
  }
  return await ratelimit.limit(identifier);
}
