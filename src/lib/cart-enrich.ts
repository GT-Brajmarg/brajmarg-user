import type { SupabaseClient } from "@supabase/supabase-js";
import type { ItemType } from "@/types/database";
import type { CartRow } from "./cart-store";
import type { EnrichedCartRow } from "@/types/cart";
import { parseNumeric } from "./format";

type ItemMeta = {
  id: string;
  name: string;
  price: number | string;
  image_url: string | null;
  temples: { name: string } | null;
};

/**
 * Bulk-fetch product metadata for the given cart rows and merge it
 * into a single shape. Used by both /cart and the side drawer.
 */
export async function enrichCartRows(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, "public", any>,
  rows: CartRow[]
): Promise<EnrichedCartRow[]> {
  if (rows.length === 0) return [];

  const byType: Record<ItemType, string[]> = {
    prasad: [],
    seva: [],
    frame: [],
    cloth: [],
  };
  for (const r of rows) byType[r.item_type].push(r.item_id);

  const fetchType = (table: string, ids: string[]) =>
    ids.length
      ? supabase
          .from(table)
          .select("id, name, price, image_url, temples(name)")
          .in("id", ids)
      : Promise.resolve({ data: [] as ItemMeta[] });

  const [prasadRes, sevaRes, frameRes, clothRes] = await Promise.all([
    fetchType("prasad_items", byType.prasad),
    fetchType("seva_items", byType.seva),
    fetchType("frame_items", byType.frame),
    fetchType("cloth_items", byType.cloth),
  ]);

  const map = new Map<string, ItemMeta>();
  for (const r of (prasadRes.data ?? []) as ItemMeta[]) map.set(`prasad:${r.id}`, r);
  for (const r of (sevaRes.data ?? []) as ItemMeta[]) map.set(`seva:${r.id}`, r);
  for (const r of (frameRes.data ?? []) as ItemMeta[]) map.set(`frame:${r.id}`, r);
  for (const r of (clothRes.data ?? []) as ItemMeta[]) map.set(`cloth:${r.id}`, r);

  return rows
    .filter((row) => map.has(`${row.item_type}:${row.item_id}`))
    .map((row) => {
      const meta = map.get(`${row.item_type}:${row.item_id}`)!;
      return {
        ...row,
        title: meta.name,
        unit_price: parseNumeric(meta.price),
        image_url: meta.image_url,
        temple_name: meta.temples?.name ?? null,
      };
    });
}
