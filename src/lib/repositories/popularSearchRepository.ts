import { createClient } from "@/lib/supabase/server";

export async function getPopularSearchesRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("popular_searches")
    .select("*")
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
