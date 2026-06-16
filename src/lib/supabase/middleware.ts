/**
 * Supabase Middleware Helper
 * --------------------------
 * Keeps the user's auth session fresh on every request. Server Components
 * cannot write cookies, so this runs in Next.js middleware (the only place
 * that can refresh the session token and pass new cookies to both the
 * browser and the downstream server render).
 *
 * Called from the root `middleware.ts`. Follows the official Supabase SSR
 * recommendation: always return the `supabaseResponse` object as-is so the
 * refreshed cookies are not dropped.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update the request cookies (for any downstream reads) and rebuild
          // the response so the browser receives the refreshed Set-Cookie.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not run code between createServerClient and getClaims().
  // A simple mistake could make it very hard to debug intermittent logouts.
  //
  // getClaims() refreshes the auth token if needed. (Use getUser() instead
  // if you prefer a network call to the Supabase Auth server every request.)
  await supabase.auth.getClaims();

  // IMPORTANT: Always return `supabaseResponse` unchanged. If you create your
  // own response, copy over `supabaseResponse.cookies` first, or sessions will
  // randomly drop and users get logged out at random.
  return supabaseResponse;
}
