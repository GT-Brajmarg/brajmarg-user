"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CART_CHANGE_EVENT, getCart, discardLocalCart } from "@/lib/cart-store";
import { enrichCartRows } from "@/lib/cart-enrich";
import type { OrderItem, Order } from "@/types/database";
import type { EnrichedCartRow } from "@/types/cart";
import { formatInr, parseNumeric } from "@/lib/format";
import CartActions from "@/components/CartActions";

type Phase = "loading" | "ready";

type LastOrder = Order & { order_items: OrderItem[] };

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartPageInner />
    </Suspense>
  );
}

function PlacedBanner() {
  const params = useSearchParams();
  const placed = params.get("placed");
  if (!placed) return null;
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
      <p className="font-semibold">Order placed successfully! 🪔</p>
      <p className="mt-1">
        Your order <span className="font-mono">{placed}</span> has been
        recorded. We&apos;ll reach out shortly with delivery details.
      </p>
    </div>
  );
}

function CartPageInner() {
  const params = useSearchParams();
  const placed = params.get("placed");
  const [phase, setPhase] = useState<Phase>("loading");
  const [rows, setRows] = useState<EnrichedCartRow[]>([]);
  const [authed, setAuthed] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();

    // After a successful order (?placed=...), the DB cart was already
    // cleared server-side. Defensively wipe any lingering guest localStorage
    // cart so stale items can't reappear in the UI.
    if (placed) discardLocalCart();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const isAuthed = Boolean(user);
    setAuthed(isAuthed);

    // Read cart (works for both modes)
    const cart = await getCart();

    // Enrich with item details
    const enriched = await enrichCartRows(supabase, cart);
    setRows(enriched);

    // Fetch last order if logged in
    if (isAuthed) {
      const { data: orderRows } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
        .limit(1);
      const last = (orderRows ?? [])[0] as LastOrder | undefined;
      setLastOrder(last ?? null);
    } else {
      setLastOrder(null);
    }

    setPhase("ready");
  }, [placed]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onCart = () => void load();
    window.addEventListener(CART_CHANGE_EVENT, onCart);
    return () => window.removeEventListener(CART_CHANGE_EVENT, onCart);
  }, [load]);

  const subtotal = rows.reduce((s, r) => s + r.unit_price * r.quantity, 0);

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Your cart</h1>
          <Link
            href="/"
            className="text-sm font-semibold text-brand-red hover:underline"
          >
            Continue browsing
          </Link>
        </div>

        <PlacedBanner />

        {!authed && rows.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">You&apos;re browsing as a guest.</p>
            <p className="mt-1">
              Your items are saved on this device.{" "}
              <Link
                href="/login?next=/cart"
                className="underline font-semibold hover:text-brand-red"
              >
                Log in
              </Link>{" "}
              to save them to your account and place an order.
            </p>
          </div>
        )}

        {phase === "loading" ? (
          <div className="rounded-xl border border-gray-200 bg-card-bg p-10 text-center text-gray-500">
            Loading your cart…
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-card-bg p-10 text-center text-gray-600">
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm mt-2">
              Add prasad, seva, frames, or cloth from a temple page.
            </p>
            <Link
              href="/"
              className="inline-flex mt-6 rounded-lg bg-brand-red text-white text-sm font-semibold px-5 py-2.5 hover:bg-brand-red-dark"
            >
              Explore temples
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-card-bg p-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {row.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200" />
                    )}
                  </div>
                  <CartActions row={row} onChange={load} />
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatInr(subtotal)}
                </span>
              </div>
              {!authed ? (
                <Link
                  href="/login?next=/checkout"
                  className="block w-full rounded-lg bg-brand-red text-white text-sm font-semibold py-3 text-center hover:bg-brand-red-dark"
                >
                  Login to checkout
                </Link>
              ) : (
                <Link
                  href="/checkout"
                  className="block w-full rounded-lg bg-brand-red text-white text-sm font-semibold py-3 text-center hover:bg-brand-red-dark"
                >
                  Proceed to checkout
                </Link>
              )}
            </div>
          </>
        )}

        {/* Last order section (only for logged-in users) */}
        {authed && lastOrder && (
          <section className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-gray-900">Your last order</h2>
            <div className="rounded-xl border border-gray-200 bg-card-bg p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Order #{lastOrder.order_number}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(lastOrder.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                    lastOrder.status === "delivered"
                      ? "bg-emerald-50 text-emerald-700"
                      : lastOrder.status === "cancelled"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {lastOrder.status}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {(lastOrder.order_items ?? []).map((it) => (
                  <li
                    key={it.id}
                    className="flex justify-between text-xs text-gray-700"
                  >
                    <span className="truncate">
                      {it.item_name} × {it.quantity}
                    </span>
                    <span className="font-semibold whitespace-nowrap ml-2">
                      {formatInr(parseNumeric(it.item_price) * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-gray-900">
                  {formatInr(parseNumeric(lastOrder.total_amount))}
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

