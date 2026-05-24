/**
 * Cancellation & Refund Policy (pickup/travel-time based).
 *
 *  • Free Cancellation: up to 24h before pickup time
 *  • 50% Refund:        12–24h before pickup time
 *  • No Refund:         less than 12h before pickup, or no-show
 *  • Refund Processing: approved refunds in 5–7 business days to the
 *                       original payment method
 *
 * The tier is derived from the hours remaining until pickup/travel. For
 * orders without a pickup time (most product orders), callers pass null
 * and fall back to the unpaid-vs-paid rule.
 */

export type RefundTier = "full" | "half" | "none";

export type RefundDecision = {
  tier: RefundTier;
  /** Refund as a fraction of the order total (1, 0.5, 0). */
  fraction: number;
  /** Human-readable summary for the UI and the order note. */
  label: string;
};

export function refundTierForHours(hoursUntilPickup: number): RefundDecision {
  if (hoursUntilPickup >= 24) {
    return { tier: "full", fraction: 1, label: "Free cancellation (100% refund)" };
  }
  if (hoursUntilPickup >= 12) {
    return { tier: "half", fraction: 0.5, label: "50% refund (12–24h before pickup)" };
  }
  return { tier: "none", fraction: 0, label: "No refund (less than 12h before pickup / no-show)" };
}

/**
 * Resolves the refund decision for an order.
 *  - If a pickup/travel time is known, use the time-based tiers.
 *  - Otherwise (no pickup time): an unpaid order cancels with nothing to
 *    refund ("full" in the sense that no money was taken); a paid order
 *    defaults to admin review (treated as "full" pending manual check,
 *    since product orders have no pickup deadline).
 */
export function resolveRefund(opts: {
  pickupAt?: Date | null;
  isPaid: boolean;
  now?: Date;
}): RefundDecision {
  const now = opts.now ?? new Date();
  if (opts.pickupAt) {
    const hours = (opts.pickupAt.getTime() - now.getTime()) / 36e5;
    return refundTierForHours(hours);
  }
  if (!opts.isPaid) {
    return { tier: "full", fraction: 1, label: "Cancelled before payment — no charge" };
  }
  return { tier: "full", fraction: 1, label: "Refund to be reviewed by our team" };
}

/** Parse a "Travel date: 2026-05-24" fragment out of an order's notes. */
export function parseTravelDate(notes: string | null): Date | null {
  if (!notes) return null;
  const m = notes.match(/Travel date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
  if (!m) return null;
  const d = new Date(m[1] + "T00:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}
