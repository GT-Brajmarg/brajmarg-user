import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getTempleRequestAccessOptionsRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("request_temple_access_options")
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

export async function createTempleRequestRepository(payload: {
  temple_name: string;
  city: string;
  state: string;
  address: string;
  requester_name: string;
  requester_email: string;
  requested_access: string[];
}) {
  const { data, error } = await supabaseAdmin
    .from("request_temple")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
