import type { ProductImage } from "@/types/database";

/**
 * Resolve the ordered image gallery for any product row.
 *
 * The admin panel stores galleries in normalised child tables
 * (frame_images / prasad_images / cloth_images). Item queries alias
 * that relation to `product_images`. Ordering rule:
 *
 *   1. the primary image first (is_primary = true)
 *   2. then by display_order (nulls last)
 *   3. then by insertion order (stable)
 *
 * Falls back to the legacy single `image_url` when no child rows
 * exist (e.g. seva, or items the admin hasn't given a gallery yet).
 * `ProductCarousel` cleans/dedupes and shows a devotional placeholder
 * when the result is empty.
 */
export function galleryOf(item: {
  image_url?: string | null;
  product_images?: ProductImage[] | null;
}): Array<string | null | undefined> {
  const rows = Array.isArray(item.product_images)
    ? item.product_images.filter((r) => r && r.image_url)
    : [];

  if (rows.length > 0) {
    const sorted = [...rows].sort((a, b) => {
      // Primary always wins.
      const pa = a.is_primary ? 0 : 1;
      const pb = b.is_primary ? 0 : 1;
      if (pa !== pb) return pa - pb;
      // Then display_order, nulls last.
      const da = a.display_order ?? Number.MAX_SAFE_INTEGER;
      const db = b.display_order ?? Number.MAX_SAFE_INTEGER;
      return da - db;
    });
    return sorted.map((r) => r.image_url);
  }

  return [item.image_url ?? null];
}
