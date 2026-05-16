import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProductDetailClient from "@/components/temple/ProductDetailClient";
import { slugify } from "@/lib/slug";
import type {
  ClothItem,
  FrameItem,
  Temple,
} from "@/types/database";

type Category = "frame" | "cloth";

function isCategory(v: string): v is Category {
  return v === "frame" || v === "cloth";
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; category: string; productSlug: string }>;
}) {
  const { slug, category, productSlug } = await params;
  if (!isCategory(category)) notFound();

  const supabase = await createClient();

  // Resolve temple by slugified name
  const { data: temples } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true);

  const temple = (temples as Temple[] | null)?.find(
    (t) => slugify(t.name) === slug
  );
  if (!temple || temple.is_coming_soon) notFound();

  const tableName = category === "frame" ? "frame_items" : "cloth_items";
  const imagesTable =
    category === "frame" ? "frame_images" : "cloth_images";

  // Pull all items in this category for this temple — we use them
  // both to find the matching product and to render the "more like
  // this" sibling list. The aliased nested select pulls the admin's
  // multi-image gallery from the child *_images table.
  const { data: itemsRaw } = await supabase
    .from(tableName)
    .select(
      `*, product_images:${imagesTable}(image_url,is_primary,display_order)`
    )
    .eq("temple_id", temple.id)
    .order("display_order");

  if (!itemsRaw || itemsRaw.length === 0) notFound();

  // Group by name (frames have multiple size variants under one name).
  // Find the product whose name slugifies to productSlug.
  type Item = FrameItem | ClothItem;
  const items = itemsRaw as Item[];

  const groupKeys = new Set<string>();
  const orderedNames: string[] = [];
  for (const it of items) {
    const k = slugify(it.name);
    if (!groupKeys.has(k)) {
      groupKeys.add(k);
      orderedNames.push(it.name);
    }
  }

  const productName = orderedNames.find((n) => slugify(n) === productSlug);
  if (!productName) notFound();

  // Variants of the matched product (for frames this is multi-size,
  // for cloth this is normally a single row)
  const variants = items.filter((it) => it.name === productName);

  // Sibling products (excluding this one) for the bottom listing
  const siblings: Array<{
    cover: Item;
    minPrice: number;
    name: string;
    slug: string;
  }> = [];
  const siblingSeen = new Set<string>();
  for (const it of items) {
    if (it.name === productName) continue;
    if (siblingSeen.has(it.name)) continue;
    siblingSeen.add(it.name);
    const sameName = items.filter((x) => x.name === it.name);
    const minPrice = Math.min(
      ...sameName.map((x) => Number(x.price) || 0)
    );
    siblings.push({
      cover: it,
      minPrice,
      name: it.name,
      slug: slugify(it.name),
    });
  }

  return (
    <main className="flex-1">
      <ProductDetailClient
        temple={temple}
        category={category}
        productName={productName}
        variants={variants}
        siblings={siblings}
      />
    </main>
  );
}
