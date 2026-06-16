/**
 * Supabase Server Client
 * ----------------------
 * Use this in Server Components, Route Handlers (app/api/...), and Server
 * Actions. It wires Supabase auth into Next.js's `cookies()` store so the
 * session set by the browser/middleware is available on the server.
 *
 * `cookies()` is async in the App Router, so this factory is async too —
 * always `await createClient()`.
 *
 * Note: writing cookies from a Server Component throws (Server Components
 * can't set headers). The try/catch swallows that case; `middleware.ts` is
 * responsible for refreshing the session cookie on every request, so it's
 * safe to ignore here.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore. Session refresh is
            // handled by middleware (see middleware.ts).
          }
        },
      },
    }
  );
}
