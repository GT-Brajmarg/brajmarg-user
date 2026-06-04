import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { slugify } from "@/lib/slug";
import SevaDetailClient from "@/components/temple/SevaDetailClient";
import type { SevaItem, Temple } from "@/types/database";

/**
 * Seva detail / contribute page. Route: /temple/[slug]/seva/[id]
 *
 * Seva names are stored in Hindi/Devanagari which slugifies to empty (the
 * `[^a-z0-9]+` filter strips non-Latin glyphs), so the URL uses the raw UUID
 * id. Robust, unique, and matches the storefront's existing /yatra/[id]
 * style of routing for items with non-Latin names.
 */
export default async function SevaDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const supabase = await createClient();

  // Resolve temple by slugified name (same convention used by frame/cloth).
  const { data: temples } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true);

  const temple = (temples as Temple[] | null)?.find(
    (t) => slugify(t.name) === slug
  );
  if (!temple || temple.is_coming_soon) notFound();

  // The seva must belong to this temple and be active.
  const { data: item } = await supabase
    .from("seva_items")
    .select("*")
    .eq("id", id)
    .eq("temple_id", temple.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!item) notFound();

  // Sibling sevas at the same temple — for the "more like this" strip below.
  const { data: siblingsRaw } = await supabase
    .from("seva_items")
    .select("*")
    .eq("temple_id", temple.id)
    .eq("is_active", true)
    .neq("id", id)
    .order("display_order", { ascending: true })
    .limit(6);

  return (
    <main className="flex-1">
      <SevaDetailClient
        temple={temple}
        item={item as SevaItem}
        siblings={(siblingsRaw ?? []) as SevaItem[]}
      />
    </main>
  );
}
