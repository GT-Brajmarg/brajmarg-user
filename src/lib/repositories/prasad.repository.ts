// lib/repositories/prasad.repository.ts

import { createClient } from "@/lib/supabase/server";

export async function getTemplePrasadRepository(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prasad_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("in_stock", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
