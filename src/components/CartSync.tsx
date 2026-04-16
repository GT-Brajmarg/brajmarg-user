"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { mergeLocalIntoRemote, useRemoteCartCache } from "@/lib/cart-store";

/**
 * Listens for auth state changes. When a user signs in,
 * any items they added as a guest (in localStorage) are
 * merged into their remote cart and localStorage is cleared.
 */
export default function CartSync() {
  // Keeps the in-memory cart cache fresh so getCartLineQty()
  // returns accurate values for the inline +/- controls.
  useRemoteCartCache();

  useEffect(() => {
    const supabase = createClient();

    // Run once on mount in case the user was already signed in
    // (e.g. they logged in earlier and now reloaded the page).
    void mergeLocalIntoRemote();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        void mergeLocalIntoRemote();
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}
