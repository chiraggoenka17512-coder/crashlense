import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Client-safe Supabase instance (browser & server)
 * Useful for Supabase Storage (uploads, images), Realtime subscriptions, or RPCs
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only Supabase admin instance (Service Role)
 * Warning: NEVER expose NEXT_PUBLIC_ for service role key!
 */
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
