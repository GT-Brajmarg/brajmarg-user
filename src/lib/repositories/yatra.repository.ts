import { createClient } from "@/lib/supabase/server";
import type { YatraPackage } from "@/types/database";

export async function getYatraPackages(): Promise<YatraPackage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("yatra_packages")
    .select(
      `
      *,
      vehicles (
        name,
        vehicle_type,
        seating_capacity,
        is_ac,
        features,
        image_url
      )
    `,
    )
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;

  return (data ?? []) as YatraPackage[];
}

export async function getGroupYatras() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("yatra_packages")
    .select("*")
    .eq("is_active", true)
    .eq("package_type", "group");

  if (error) throw error;

  return data ?? [];
}

export async function getSoloYatras() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("yatra_packages")
    .select("*")
    .eq("is_active", true)
    .eq("package_type", "solo");

  if (error) throw error;

  return data ?? [];
}
