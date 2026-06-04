import { createClient as createAdminClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Never import this from a client component —
 * the service role key has full bypass-RLS privileges.
 *
 * Returns null when the service role key is not configured, so callers
 * can fall back gracefully.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createAdminClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
