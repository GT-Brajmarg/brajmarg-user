// lib/repositories/prasad.repository.ts

import { createClient } from "@/lib/supabase/server";

import { PrasadOrderPayload } from "@/types/prasad";

export async function getTemplePrasadRepository(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prasad_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("in_stock", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPrasadDetailsRepository(prasadId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prasad_items")
    .select(
      `
      *,
      temples (
        id,
        name,
        location,
        image_url
      )
    `,
    )
    .eq("id", prasadId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPrasadQuantityOptionsRepository(prasadId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prasad_quantity_options")
    .select("*")
    .eq("prasad_item_id", prasadId)
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    throw error;
  }

  return data;
}

export async function createPrasadOrderRepository(payload: PrasadOrderPayload) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prasad_orders")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
