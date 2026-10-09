import { createClient } from "@/lib/supabase/server";
import type { Alert } from "@/types/database";

export async function getActiveAlerts(): Promise<Alert[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;

  return (data ?? []) as Alert[];
}

export async function getFestivalAlerts(): Promise<Alert[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("is_active", true)
    .eq("alert_type", "festival")
    .order("display_order");

  if (error) throw error;

  return (data ?? []) as Alert[];
}

export async function getTempleAlerts(templeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;

  return data ?? [];
}
