"use client";

import type { EnrichedCartRow } from "@/types/cart";

/**
 * In-memory + sessionStorage snapshot of the enriched cart rows.
 *
 * Lets /cart render the previously-fetched cart INSTANTLY on every visit
 * (no full-screen "Loading your cart…" panel), while a fresh fetch runs
 * silently in the background to revalidate.
 *
 * Keyed by user id (or "guest") so signing in/out can't leak someone
 * else's items into the snapshot.
 */

const STORAGE_KEY = "brajmarg:cart-snapshot:v1";

type Snapshot = {
  userId: string; // "guest" for logged-out
  rows: EnrichedCartRow[];
};

// Process-wide memory cache so navigations within the same tab don't
// even pay the sessionStorage parse cost.
let memSnapshot: Snapshot | null = null;

function key(userId: string | null): string {
  return userId ?? "guest";
}

export function readCartSnapshot(userId: string | null): EnrichedCartRow[] | null {
  const k = key(userId);
  if (memSnapshot && memSnapshot.userId === k) return memSnapshot.rows;
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Snapshot;
    if (!parsed || parsed.userId !== k || !Array.isArray(parsed.rows)) {
      return null;
    }
    memSnapshot = parsed;
    return parsed.rows;
  } catch {
    return null;
  }
}

export function writeCartSnapshot(
  userId: string | null,
  rows: EnrichedCartRow[],
): void {
  const snap: Snapshot = { userId: key(userId), rows };
  memSnapshot = snap;
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {
    // session quota / private mode — memory cache is still hot, so the
    // current session keeps benefitting; we just lose cross-tab benefit.
  }
}

export function clearCartSnapshot(): void {
  memSnapshot = null;
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
