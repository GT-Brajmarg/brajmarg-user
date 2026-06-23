import { createClient } from "@/lib/supabase/server";
import type { Temple, TempleTiming } from "@/types/database";

export async function getTemples(): Promise<Temple[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;

  return (data ?? []) as Temple[];
}

export async function getTempleById(id: string): Promise<Temple | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("temples")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Temple;
}

export async function getTempleTimings(
  templeId: string,
): Promise<TempleTiming[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("temple_timings")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true);

  if (error) throw error;

  return (data ?? []) as TempleTiming[];
}

export async function getTempleBySlug(slug: string): Promise<Temple | null> {
  const temples = await getTemples();

  return (
    temples.find(
      (temple) =>
        temple.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") === slug,
    ) ?? null
  );
}
