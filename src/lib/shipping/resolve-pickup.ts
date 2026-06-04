/**
 * Resolves which Shiprocket pickup location an order's items ship from,
 * and groups a mixed cart into one shipment per pickup.
 *
 * Rule:
 *   1. An item ships from the pickup tied to its temple (temple_id).
 *   2. If that temple has no pickup row, fall back to the default pickup.
 *   3. If there is no default either, throw — the order can't be shipped
 *      until at least one default pickup is configured.
 *
 * Today (single pickup) every item resolves to the same tag, so
 * groupByPickup returns one group. When multiple pickups are added,
 * the same code returns N groups -> N shipments, no rewrite.
 *
 * Server-only: queries via the service-role client.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export type PickupRow = {
  id: string;
  shiprocket_tag: string;
  temple_id: string | null;
  pincode: string;
  is_default: boolean;
};

/** An order item carrying enough info to be routed + shipped. */
export type RoutableItem = {
  item_id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  temple_id: string | null;
};

export type PickupGroup = {
  pickupTag: string;
  pickupPincode: string;
  items: RoutableItem[];
};

/**
 * Loads the pickup registry and groups items by their resolved pickup.
 * Pass the SERVICE-ROLE client (pickup_locations has read-for-all RLS,
 * but using the admin client keeps this callable from server actions
 * without a user session).
 */
export async function groupByPickup(
  admin: SupabaseClient,
  items: RoutableItem[]
): Promise<PickupGroup[]> {
  const { data: pickups, error } = await admin
    .from("pickup_locations")
    .select("id, shiprocket_tag, temple_id, pincode, is_default");

  if (error) {
    throw new Error(`Could not load pickup locations: ${error.message}`);
  }

  const rows = (pickups ?? []) as PickupRow[];
  const byTemple = new Map<string, PickupRow>();
  let defaultPickup: PickupRow | null = null;

  for (const p of rows) {
    if (p.temple_id) byTemple.set(p.temple_id, p);
    if (p.is_default) defaultPickup = p;
  }

  function resolve(item: RoutableItem): PickupRow {
    const tied = item.temple_id ? byTemple.get(item.temple_id) : undefined;
    const picked = tied ?? defaultPickup;
    if (!picked) {
      throw new Error(
        "No pickup location configured for this item and no default pickup set. " +
          "Add a default pickup in pickup_locations / Shiprocket settings."
      );
    }
    return picked;
  }

  // Group items by the resolved pickup tag.
  const groups = new Map<string, PickupGroup>();
  for (const item of items) {
    const pickup = resolve(item);
    const g = groups.get(pickup.shiprocket_tag);
    if (g) {
      g.items.push(item);
    } else {
      groups.set(pickup.shiprocket_tag, {
        pickupTag: pickup.shiprocket_tag,
        pickupPincode: pickup.pincode,
        items: [item],
      });
    }
  }

  return [...groups.values()];
}
