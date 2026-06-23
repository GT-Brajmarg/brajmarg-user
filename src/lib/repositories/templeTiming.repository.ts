import { createClient } from "@/lib/supabase/server";

export async function getTempleTimingsByTempleId(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("temple_timings")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true)
    .order("opening_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
