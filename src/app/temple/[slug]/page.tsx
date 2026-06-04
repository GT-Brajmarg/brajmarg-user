import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import TempleDetailClient from "@/components/temple/TempleDetailClient";
import { slugify } from "@/lib/slug";
import type {
  ClothItem,
  FrameItem,
  PrasadItem,
  SevaItem,
  Temple,
  TempleTiming,
} from "@/types/database";

export default async function TemplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch all active temples and match by slugified name.
  // The temple name is the source of truth — slug is derived,
  // so refreshing the page always resolves correctly.
  const { data: temples, error: tErr } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true);

  if (tErr || !temples) notFound();

  const temple = (temples as Temple[]).find(
    (t) => slugify(t.name) === slug
  );

  if (!temple || temple.is_coming_soon) notFound();

  const id = temple.id;

  const [
    { data: timings },
    { data: prasad },
    { data: seva },
    { data: frames },
    { data: cloth },
  ] = await Promise.all([
    supabase
      .from("temple_timings")
      .select("*")
      .eq("temple_id", id)
      .order("day_of_week"),
    supabase
      .from("prasad_items")
      .select(
        "*, product_images:prasad_images(image_url,is_primary,display_order)"
      )
      .eq("temple_id", id)
      .order("display_order"),
    supabase
      .from("seva_items")
      .select("*")
      .eq("temple_id", id)
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("frame_items")
      .select(
        "*, product_images:frame_images(image_url,is_primary,display_order)"
      )
      .eq("temple_id", id)
      .order("display_order"),
    supabase
      .from("cloth_items")
      .select(
        "*, product_images:cloth_images(image_url,is_primary,display_order)"
      )
      .eq("temple_id", id)
      .order("display_order"),
  ]);

  return (
    <main className="flex-1">
      <TempleDetailClient
        temple={temple}
        timings={(timings ?? []) as TempleTiming[]}
        prasad={(prasad ?? []) as PrasadItem[]}
        seva={(seva ?? []) as SevaItem[]}
        frames={(frames ?? []) as FrameItem[]}
        cloth={(cloth ?? []) as ClothItem[]}
      />
    </main>
  );
}
