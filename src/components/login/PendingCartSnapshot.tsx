"use client";

import { useEffect } from "react";

/**
 * Snapshots the guest cart (localStorage) into a short-lived cookie the
 * moment the login page mounts. The login server action reads this cookie
 * right after minting the session and merges those items into the user's
 * DB cart — BEFORE redirecting to /checkout. Without this, the checkout
 * server component would render before the client-side merge runs, see an
 * empty DB cart, and bounce the user back to /cart.
 *
 * The cookie is intentionally small (cart rows are just ids + qty + variant)
 * and is deleted by the server action once consumed. localStorage stays the
 * source of truth for the client; CartSync clears it after the merge.
 */
const STORAGE_KEY = "brajmarg:cart:v1";
const COOKIE_NAME = "brajmarg_pending_cart";
// Tells CartSync the server already merged this cart via the cookie, so it
// should clear localStorage WITHOUT merging again (avoids double-counting).
const FLUSHED_FLAG = "brajmarg:pending-cart-flushed";

export default function PendingCartSnapshot() {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      // Keep only the fields the server merge needs — avoids a bloated cookie.
      const slim = parsed
        .map((r) => ({
          t: r.item_type,
          i: r.item_id,
          q: r.quantity,
          s: r.selected_size ?? null,
          c: r.selected_color ?? null,
          // Seva contribution override; null/absent for everything else.
          p: typeof r.item_price === "number" ? r.item_price : null,
        }))
        .filter((r) => r.t && r.i && r.q > 0);
      if (slim.length === 0) return;

      const value = encodeURIComponent(JSON.stringify(slim));
      // 10-minute lifetime is plenty to complete an OTP login; Lax so it
      // rides along on the post-login redirect navigation.
      document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=600; samesite=lax`;
      // Survives the login navigation within this tab; read once by CartSync.
      window.sessionStorage.setItem(FLUSHED_FLAG, "1");
    } catch {
      // best-effort — a failed snapshot just falls back to CartSync's
      // client-side merge on the next page.
    }
  }, []);

  return null;
}
