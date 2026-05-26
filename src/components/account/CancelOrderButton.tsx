"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestOrderCancellation } from "@/app/account/orders/actions";

/**
 * "Request Cancellation" action shown on eligible orders in the list.
 * Opens a small confirm dialog that restates the Cancellation & Refund
 * Policy, then calls the server action and refreshes the list.
 */
export default function CancelOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function confirm() {
    setMsg(null);
    startTransition(async () => {
      const res = await requestOrderCancellation(orderId);
      setMsg(res.message);
      if (res.success) {
        router.refresh();
        setTimeout(() => setOpen(false), 1500);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-600 transition-colors hover:border-brand-red hover:text-brand-red"
      >
        Cancel
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-card-bg p-5 shadow-devotional-lg"
          >
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Cancel this order?
            </h3>
            <div className="mt-3 rounded-lg border border-gray-100 bg-surface-soft p-3 text-xs leading-relaxed text-gray-600">
              <p className="mb-1 font-semibold text-gray-800">
                Cancellation &amp; Refund Policy
              </p>
              <ul className="list-disc space-y-0.5 pl-4">
                <li>Free cancellation up to 24h before pickup time</li>
                <li>50% refund 12–24h before pickup time</li>
                <li>No refund under 12h before pickup or no-show</li>
                <li>Approved refunds: 5–7 business days to original method</li>
              </ul>
            </div>

            {msg && (
              <p className="mt-3 rounded-lg border border-brand-gold/20 bg-brand-gold-soft/40 px-3 py-2 text-sm text-gray-700">
                {msg}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Keep order
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={pending}
                className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
              >
                {pending ? "Cancelling…" : "Confirm cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
