/**
 * Supabase Browser Client
 * ------------------------
 * Use this in Client Components ("use client"), event handlers, and any code
 * that runs in the browser. It reads the public environment variables and
 * persists the auth session in cookies so the server can read it too
 * (via `server.ts` and `middleware.ts`).
 *
 * Create a fresh client per call — do NOT cache it in a module-level singleton.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
