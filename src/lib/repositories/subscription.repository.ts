import { createClient } from "@/lib/supabase/server";

export async function getSubscriptionPlans() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    throw error;
  }

  return data;
}
