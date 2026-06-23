// src/lib/repositories/live-darshan.repository.ts

import { createClient } from "@/lib/supabase/server";

export async function getLiveDarshan() {
  const supabase = await createClient();

  const { data: temple, error: templeError } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true)
    .order("display_order")
    .limit(1)
    .single();

  if (templeError || !temple) {
    throw new Error("Temple not found");
  }

  const { data: timings, error: timingsError } = await supabase
    .from("temple_timings")
    .select("*")
    .eq("temple_id", temple.id)
    .eq("is_active", true)
    .order("opening_time");

  if (timingsError) {
    throw timingsError;
  }

  return {
    temple,
    timings: timings ?? [],
  };
}
