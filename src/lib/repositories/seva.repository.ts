// lib/repositories/seva.repository.ts

import { createClient } from "@/lib/supabase/server";

export async function getTempleSevasRepository(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seva_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
