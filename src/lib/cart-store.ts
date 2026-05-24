"use client";

import { useEffect, useReducer } from "react";
import { createClient } from "@/utils/supabase/client";
import type { ItemType } from "@/types/database";

/**
 * Unified cart store that works for BOTH guests and logged-in users.
 *
 * Guest:        cart lives in localStorage (key brajmarg:cart:v1)
 * Logged in:    cart lives in Supabase (cart_items table)
 *
 * On login (CartSync component), local items are merged into the
 * remote cart, then localStorage is cleared.
 */

const STORAGE_KEY = "brajmarg:cart:v1";
export const CART_CHANGE_EVENT = "brajmarg:cart-changed";
export const CART_OPEN_EVENT = "brajmarg:cart-open";

/**
 * No-op kept for backward compatibility. The slide-in CartDrawer was
 * removed; the floating cart (CartFab) now navigates to /cart instead,
 * so there is no panel to open.
 */
export function openCart(): void {
  /* drawer removed — intentionally does nothing */
}

/**
 * No-op kept for backward compatibility. Adding to cart no longer opens
 * a drawer; the floating cart bubble + badge are the only cart UI now.
 */
export function autoOpenCartOnce(): void {
  /* drawer removed — intentionally does nothing */
}

export type CartRow = {
  id: string;
  item_type: ItemType;
  item_id: string;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  created_at: string;
};

// ------------------------------------------------------------
// Local storage helpers (guest mode)
// ------------------------------------------------------------
function readLocal(): CartRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartRow[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(items: CartRow[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notifyChange();
  } catch {
    // private mode / quota exceeded — fail silently
  }
}

function clearLocal(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    notifyChange();
  } catch {
    // ignore
  }
}

function notifyChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ------------------------------------------------------------
// Auth detection
// ------------------------------------------------------------
async function getAuthUserId(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

// ------------------------------------------------------------
// Public API
// ------------------------------------------------------------

/** Read the current cart (auto-detects guest vs auth). */
export async function getCart(): Promise<CartRow[]> {
  const userId = await getAuthUserId();
  if (!userId) return readLocal();

  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select("id, item_type, item_id, quantity, selected_size, selected_color, created_at")
    .order("created_at", { ascending: true });
  if (error) return [];
  return (data ?? []) as CartRow[];
}

/** Read cart count (faster than full read). */
export async function getCartCount(): Promise<number> {
  const userId = await getAuthUserId();
  if (!userId) return readLocal().length;

  const supabase = createClient();
  const { count } = await supabase
    .from("cart_items")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export type AddToCartArgs = {
  item_type: ItemType;
  item_id: string;
  quantity?: number;
  selected_size?: string | null;
  selected_color?: string | null;
};

function sameVariant(
  a: Pick<CartRow, "item_type" | "item_id" | "selected_size" | "selected_color">,
  b: AddToCartArgs
): boolean {
  return (
    a.item_type === b.item_type &&
    a.item_id === b.item_id &&
    (a.selected_size ?? null) === (b.selected_size ?? null) &&
    (a.selected_color ?? null) === (b.selected_color ?? null)
  );
}

/** Add an item to the cart (works for guest and logged-in users). */
export async function addToCart(
  args: AddToCartArgs
): Promise<{ ok: true } | { ok: false; message: string }> {
  const quantity = args.quantity ?? 1;
  const selected_size = args.selected_size ?? null;
  const selected_color = args.selected_color ?? null;

  const userId = await getAuthUserId();

  // -------- Guest mode --------
  if (!userId) {
    const items = readLocal();
    const existing = items.find((i) => sameVariant(i, args));
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id: newId(),
        item_type: args.item_type,
        item_id: args.item_id,
        quantity,
        selected_size,
        selected_color,
        created_at: new Date().toISOString(),
      });
    }
    writeLocal(items);
    return { ok: true };
  }

  // -------- Auth mode --------
  const supabase = createClient();

  let q = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("item_type", args.item_type)
    .eq("item_id", args.item_id);

  if (selected_size == null) q = q.is("selected_size", null);
  else q = q.eq("selected_size", selected_size);

  if (selected_color == null) q = q.is("selected_color", null);
  else q = q.eq("selected_color", selected_color);

  const { data: existing, error: selErr } = await q.maybeSingle();
  if (selErr) return { ok: false, message: selErr.message };

  if (existing) {
    const { error: upErr } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
    if (upErr) return { ok: false, message: upErr.message };
  } else {
    const { error: insErr } = await supabase.from("cart_items").insert({
      user_id: userId,
      item_type: args.item_type,
      item_id: args.item_id,
      quantity,
      selected_size,
      selected_color,
    });
    if (insErr) return { ok: false, message: insErr.message };
  }

  notifyChange();
  return { ok: true };
}

/** Update the quantity of a cart row. */
export async function updateCartQty(
  rowId: string,
  nextQty: number
): Promise<{ ok: boolean }> {
  if (nextQty < 1) return { ok: false };

  const userId = await getAuthUserId();

  if (!userId) {
    const items = readLocal();
    const target = items.find((i) => i.id === rowId);
    if (!target) return { ok: false };
    target.quantity = nextQty;
    writeLocal(items);
    return { ok: true };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: nextQty })
    .eq("id", rowId);
  if (error) return { ok: false };
  notifyChange();
  return { ok: true };
}

/** Remove a row from the cart. */
export async function removeFromCart(rowId: string): Promise<{ ok: boolean }> {
  const userId = await getAuthUserId();

  if (!userId) {
    const items = readLocal().filter((i) => i.id !== rowId);
    writeLocal(items);
    return { ok: true };
  }

  const supabase = createClient();
  const { error } = await supabase.from("cart_items").delete().eq("id", rowId);
  if (error) return { ok: false };
  notifyChange();
  return { ok: true };
}

/**
 * Merge the localStorage cart into the user's remote cart, then
 * clear localStorage. Called by CartSync after successful login.
 */
export async function mergeLocalIntoRemote(): Promise<void> {
  const userId = await getAuthUserId();
  if (!userId) return;

  const local = readLocal();
  if (local.length === 0) return;

  const supabase = createClient();

  for (const item of local) {
    let q = supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("item_type", item.item_type)
      .eq("item_id", item.item_id);

    if (item.selected_size == null) q = q.is("selected_size", null);
    else q = q.eq("selected_size", item.selected_size);

    if (item.selected_color == null) q = q.is("selected_color", null);
    else q = q.eq("selected_color", item.selected_color);

    const { data: existing } = await q.maybeSingle();

    if (existing) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({
        user_id: userId,
        item_type: item.item_type,
        item_id: item.item_id,
        quantity: item.quantity,
        selected_size: item.selected_size,
        selected_color: item.selected_color,
      });
    }
  }

  clearLocal();
  notifyChange();
}

// ============================================================
// React hooks
// ============================================================

/**
 * Subscribe to cart-changed / storage events and force a re-render.
 * Components can call this once and then use the other helpers
 * inline — they will always see the latest cart.
 */
export function useCartTick(): number {
  const [tick, bump] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    const onChange = () => bump();
    window.addEventListener(CART_CHANGE_EVENT, onChange);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) bump();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return tick;
}

/**
 * Look up the quantity of a specific item in the cart, taking into
 * account size/colour variants. Returns 0 if not in the cart.
 *
 * Reads localStorage synchronously for guests; for authed users
 * returns the count from the in-memory cache that's populated by
 * the live subscription. Components are expected to also call
 * useCartTick() so they re-render when the cart changes.
 */
export function getCartLineQty(args: {
  item_type: ItemType;
  item_id: string;
  selected_size?: string | null;
  selected_color?: string | null;
}): number {
  // Guest mode — read localStorage synchronously
  if (typeof window === "undefined") return 0;
  const items = readLocal();
  const guestRow = items.find((r) =>
    sameVariant(r, {
      item_type: args.item_type,
      item_id: args.item_id,
      selected_size: args.selected_size ?? null,
      selected_color: args.selected_color ?? null,
    })
  );
  if (guestRow) return guestRow.quantity;

  // Auth mode — check the cache populated by useAuthCartCache below
  const cached = remoteCartCache.get(
    cacheKey(args.item_type, args.item_id, args.selected_size, args.selected_color)
  );
  return cached ?? 0;
}

// ------------------------------------------------------------
// In-memory cache of the authed user's cart for synchronous reads
// ------------------------------------------------------------
const remoteCartCache = new Map<string, number>();

function cacheKey(
  item_type: ItemType,
  item_id: string,
  size: string | null | undefined,
  color: string | null | undefined
): string {
  return `${item_type}:${item_id}:${size ?? ""}:${color ?? ""}`;
}

let remoteCacheRefreshing = false;

async function refreshRemoteCartCache(): Promise<void> {
  if (remoteCacheRefreshing) return;
  remoteCacheRefreshing = true;
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      remoteCartCache.clear();
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("cart_items")
      .select("item_type, item_id, quantity, selected_size, selected_color");
    remoteCartCache.clear();
    for (const r of (data ?? []) as Array<{
      item_type: ItemType;
      item_id: string;
      quantity: number;
      selected_size: string | null;
      selected_color: string | null;
    }>) {
      remoteCartCache.set(
        cacheKey(r.item_type, r.item_id, r.selected_size, r.selected_color),
        r.quantity
      );
    }
  } finally {
    remoteCacheRefreshing = false;
  }
}

/**
 * Mount once anywhere (e.g. in CartSync) to keep the remote cart
 * cache fresh. Re-fetches whenever a cart-changed event fires.
 */
export function useRemoteCartCache(): void {
  useEffect(() => {
    void refreshRemoteCartCache();
    const onChange = () => void refreshRemoteCartCache();
    window.addEventListener(CART_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CART_CHANGE_EVENT, onChange);
  }, []);
}

/**
 * Find the cart row id for a specific variant — needed when we
 * want to update the qty or remove it from inline +/- controls.
 */
export async function findCartRowId(args: {
  item_type: ItemType;
  item_id: string;
  selected_size?: string | null;
  selected_color?: string | null;
}): Promise<string | null> {
  const userId = await getAuthUserId();

  if (!userId) {
    const items = readLocal();
    const row = items.find((r) =>
      sameVariant(r, {
        item_type: args.item_type,
        item_id: args.item_id,
        selected_size: args.selected_size ?? null,
        selected_color: args.selected_color ?? null,
      })
    );
    return row?.id ?? null;
  }

  const supabase = createClient();
  let q = supabase
    .from("cart_items")
    .select("id")
    .eq("item_type", args.item_type)
    .eq("item_id", args.item_id);

  if (args.selected_size == null) q = q.is("selected_size", null);
  else q = q.eq("selected_size", args.selected_size);

  if (args.selected_color == null) q = q.is("selected_color", null);
  else q = q.eq("selected_color", args.selected_color);

  const { data } = await q.maybeSingle();
  return data?.id ?? null;
}
