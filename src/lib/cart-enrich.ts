import type { SupabaseClient } from "@supabase/supabase-js";
import type { ItemType, ProductImage } from "@/types/database";
import type { CartRow } from "./cart-store";
import type { EnrichedCartRow } from "@/types/cart";
import { parseNumeric } from "./format";
import { galleryOf } from "./gallery";

type ItemMeta = {
  id: string;
  name: string;
  price: number | string;
  image_url: string | null;
  product_images: ProductImage[] | null;
  temples: { name: string } | null;
};

// Each item table has its own image child table.
const IMAGE_TABLE: Record<string, string> = {
  prasad_items: "prasad_images",
  seva_items: "", // seva has no gallery table
  frame_items: "frame_images",
  cloth_items: "cloth_images",
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
    yatra: [], // never a cart item; present only to satisfy the map type
  };
  for (const r of rows) byType[r.item_type].push(r.item_id);

  const fetchType = (table: string, ids: string[]) => {
    if (!ids.length) return Promise.resolve({ data: [] as ItemMeta[] });
    const imgTable = IMAGE_TABLE[table];
    const select = imgTable
      ? `id, name, price, image_url, temples(name), product_images:${imgTable}(image_url,is_primary,display_order)`
      : "id, name, price, image_url, temples(name)";
    return supabase.from(table).select(select).in("id", ids);
  };

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
        // Primary gallery image first; falls back to legacy single.
        image_url: galleryOf(meta)[0] ?? meta.image_url,
        temple_name: meta.temples?.name ?? null,
      };
    });
}
