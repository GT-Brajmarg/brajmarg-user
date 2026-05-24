/**
 * Aggregates the per-item payment flags across a whole cart using the
 * "strictest wins" rule: a payment method is offered only if EVERY item
 * permits it. A missing/null flag is treated as allowed (backward compat
 * with rows authored before the allow_direct_payment / allow_cod columns
 * existed).
 */
export function aggregatePaymentOptions(
  metas: { allow_direct_payment?: boolean | null; allow_cod?: boolean | null }[]
): { allowOnline: boolean; allowCod: boolean } {
  let allowOnline = true;
  let allowCod = true;
  for (const m of metas) {
    if (m.allow_direct_payment === false) allowOnline = false;
    if (m.allow_cod === false) allowCod = false;
  }
  return { allowOnline, allowCod };
}
