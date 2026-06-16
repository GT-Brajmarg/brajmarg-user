/**
 * Next.js Proxy (App Router)
 * --------------------------
 * Next.js 16 renamed the old `middleware` file convention to `proxy`. This
 * file runs on every matched request before the page/route renders and
 * delegates to the Supabase helper so the auth session cookie is refreshed
 * and kept in sync between the browser and server.
 *
 * Lives at `src/proxy.ts` because this project uses the `src/` directory.
 * The Supabase logic itself lives in `@/lib/supabase/middleware`, which keeps
 * the canonical Supabase SSR filename.
 */
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - common image extensions
     * Add other public paths here as needed.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
