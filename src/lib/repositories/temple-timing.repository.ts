// lib/repositories/temple-timing.repository.ts

import { createClient } from "@/lib/supabase/server";

export async function getTempleTimingsRepository(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("temple_timings")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true)
    .order("opening_time", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
