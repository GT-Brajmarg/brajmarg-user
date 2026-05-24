"use client";

import { useEffect, useRef, useState } from "react";
import RazorpayButton from "./razorpay-button";
import { checkPincodeServiceability } from "./actions";
import { formatInr } from "@/lib/format";

type Serviceability = {
  serviceable: boolean;
  cod: boolean;
  cheapestRate: number | null;
};

/**
 * Renders the payment buttons, gating COD on live per-pincode
 * serviceability in addition to the cart's item-level flags.
 *
 * - `allowCod` / `allowOnline` come from the item-level aggregation
 *   (strictest-wins) computed on the server.
 * - As the user types their pincode in #checkout-form, we debounce a
 *   serviceability check. COD is shown only when the items allow it AND
 *   the pincode is serviceable for COD.
 * - Online (Razorpay) is shown whenever items allow it and the pincode
 *   is at least deliverable.
 *
 * Fails open: while we don't yet have a result (or the check errors),
 * COD stays visible if items allow it — the server-side guard in
 * placeOrder is the real enforcement.
 */
export default function PaymentOptions({
  subtotal,
  allowCod,
  allowOnline,
}: {
  subtotal: number;
  allowCod: boolean;
  allowOnline: boolean;
}) {
  const [pincode, setPincode] = useState("");
  const [svc, setSvc] = useState<Serviceability | null>(null);
  const [checking, setChecking] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Watch the pincode field inside the existing checkout form.
  useEffect(() => {
    const form = document.getElementById("checkout-form");
    const input = form?.querySelector<HTMLInputElement>('input[name="pincode"]');
    if (!input) return;

    // Seed from any prefilled value.
    setPincode(input.value.trim());

    const onInput = () => setPincode(input.value.trim());
    input.addEventListener("input", onInput);
    return () => input.removeEventListener("input", onInput);
  }, []);

  // Debounced serviceability check whenever a full 6-digit pincode is present.
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!/^\d{6}$/.test(pincode)) {
      setSvc(null);
      return;
    }
    debounce.current = setTimeout(async () => {
      setChecking(true);
      try {
        const result = await checkPincodeServiceability(pincode);
        setSvc(result);
      } catch {
        setSvc(null); // fail open
      } finally {
        setChecking(false);
      }
    }, 500);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [pincode]);

  // COD visible when items allow it AND (no result yet OR pincode supports COD).
  const codAvailable = allowCod && (svc === null || (svc.serviceable && svc.cod));
  // Online visible when items allow it AND (no result yet OR pincode deliverable).
  const onlineAvailable =
    allowOnline && (svc === null || svc.serviceable);

  const notDeliverable = svc !== null && !svc.serviceable;

  return (
    <div className="space-y-3">
      {/* Serviceability banner */}
      {checking && (
        <p className="text-xs text-gray-500">Checking delivery for {pincode}…</p>
      )}
      {svc && svc.serviceable && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800">
          ✓ Delivers to {pincode}
          {svc.cheapestRate != null && (
            <> · from {formatInr(svc.cheapestRate)} shipping</>
          )}
          {!svc.cod && allowCod && (
            <div className="text-xs text-green-700 mt-1">
              Cash on Delivery isn&apos;t available at this pincode — please pay online.
            </div>
          )}
        </div>
      )}
      {notDeliverable && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          We don&apos;t deliver to {pincode} yet. Please try a different address.
        </div>
      )}

      {/* COD submits the existing #checkout-form */}
      {codAvailable && (
        <button
          type="submit"
          form="checkout-form"
          disabled={notDeliverable}
          className="w-full rounded-lg bg-gray-900 text-white px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-gray-800 disabled:opacity-60"
        >
          Cash on Delivery ({formatInr(subtotal)})
        </button>
      )}

      {onlineAvailable && <RazorpayButton total={subtotal} />}

      {/* No common payment method across the cart's items. */}
      {!allowOnline && !allowCod && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          These items can&apos;t be ordered together — they don&apos;t share a
          payment method. Please place them in separate orders.
        </div>
      )}

      {/* Single available method hints (item-level) */}
      {allowCod && !allowOnline && (
        <p className="text-xs text-gray-500">
          Online payment isn&apos;t available for the items in your cart — pay by
          Cash on Delivery.
        </p>
      )}
      {allowOnline && !allowCod && (
        <p className="text-xs text-gray-500">
          Cash on Delivery isn&apos;t available for the items in your cart —
          please pay online.
        </p>
      )}
    </div>
  );
}
