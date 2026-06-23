// lib/repositories/offering.repository.ts

import { createClient } from "@/lib/supabase/server";

export async function getTempleOfferingsRepository(templeId: string) {
  const supabase = await createClient();
  const [framesResult, clothesResult] = await Promise.all([
    supabase
      .from("frame_items")
      .select("*")
      .eq("temple_id", templeId)
      .eq("in_stock", true)
      .order("display_order", {
        ascending: true,
      }),

    supabase
      .from("cloth_items")
      .select("*")
      .eq("temple_id", templeId)
      .eq("in_stock", true)
      .order("display_order", {
        ascending: true,
      }),
  ]);

  if (framesResult.error) {
    throw framesResult.error;
  }

  if (clothesResult.error) {
    throw clothesResult.error;
  }

  const frames = framesResult.data.map((item: any) => ({
    ...item,
    type: "frame",
  }));

  const clothes = clothesResult.data.map((item: any) => ({
    ...item,
    type: "cloth",
  }));

  return [...frames, ...clothes];
}
