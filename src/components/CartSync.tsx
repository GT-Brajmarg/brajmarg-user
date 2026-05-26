"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  mergeLocalIntoRemote,
  discardLocalCart,
  useRemoteCartCache,
  CART_CHANGE_EVENT,
} from "@/lib/cart-store";

// Set by PendingCartSnapshot when the guest cart was flushed to the login
// cookie. If present, the server already merged it — clear local, don't merge.
const FLUSHED_FLAG = "brajmarg:pending-cart-flushed";

/**
 * Listens for auth state changes. When a user signs in, any items they
 * added as a guest (in localStorage) are merged into their remote cart
 * and localStorage is cleared.
 *
 * IMPORTANT: our phone login mints the session server-side and then
 * `redirect()`s. That is a client-side RSC navigation, so this component
 * (mounted in the persistent root layout) does NOT remount — a plain
 * "run once on mount" merge would never fire after login. And because the
 * session arrives via SSR cookies, the browser client emits
 * `INITIAL_SESSION` (not `SIGNED_IN`) on the next page. So we merge on the
 * transition "no user -> user" regardless of which event delivers it.
 */
export default function CartSync() {
  // Keeps the in-memory cart cache fresh so getCartLineQty()
  // returns accurate values for the inline +/- controls.
  useRemoteCartCache();

  // Last user id we observed, so we merge exactly once per sign-in
  // transition (and never double-merge across overlapping events).
  const lastUserId = useRef<string | null>(null);
  const merging = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function maybeMerge(userId: string | null) {
      // Only act on the transition into a signed-in state.
      if (!userId || userId === lastUserId.current) {
        lastUserId.current = userId;
        return;
      }
      lastUserId.current = userId;
      if (merging.current) return;
      merging.current = true;
      try {
        // If the guest cart was flushed to the login cookie, the server
        // already merged it — just drop the local copy (no re-merge).
        const flushed =
          typeof window !== "undefined" &&
          window.sessionStorage.getItem(FLUSHED_FLAG) === "1";
        if (flushed) {
          window.sessionStorage.removeItem(FLUSHED_FLAG);
          discardLocalCart();
          // Nudge any mounted cart/checkout view to refetch the merged cart.
          window.dispatchEvent(new Event(CART_CHANGE_EVENT));
        } else {
          await mergeLocalIntoRemote();
        }
      } finally {
        merging.current = false;
      }
    }

    // Resolve the current user on mount (covers a reload where the user
    // is already signed in and the guest cart hasn't merged yet).
    void supabase.auth.getUser().then(({ data }) => {
      if (active) void maybeMerge(data.user?.id ?? null);
    });

    // Fire on every auth event. INITIAL_SESSION covers the SSR-cookie
    // login path; SIGNED_IN / TOKEN_REFRESHED / USER_UPDATED cover the
    // client-driven and refresh paths. maybeMerge dedupes by user id.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void maybeMerge(session?.user?.id ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}
