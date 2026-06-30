// lib/repositories/seva.repository.ts

import { createClient } from "@/lib/supabase/server";
import { RegistrationPayload } from "@/types/seva";

export async function getTempleSevasRepository(templeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seva_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

// lib/repositories/seva.repository.ts

export async function getSevaDetailsRepository(sevaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_items")
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
    .eq("id", sevaId)
    .single();

  if (error) throw error;

  return data;
}
export async function getSlotsRepository(sevaId: string, date: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_slots")
    .select("*")
    .eq("seva_item_id", sevaId)
    .eq("slot_date", date)
    .eq("is_active", true)
    .order("slot_time");

  if (error) throw error;

  return data;
}

export async function registerSevaRepository(payload: RegistrationPayload) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_registrations")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getAvailableDatesRepository(sevaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_slots")
    .select("slot_date")
    .eq("seva_item_id", sevaId)
    .eq("is_active", true)
    .order("slot_date");

  if (error) throw error;

  return [...new Set(data.map((d) => d.slot_date))];
}

export async function incrementBookedCountRepository(slotId: string) {
  const supabase = await createClient();

  const { data: slot, error } = await supabase
    .from("seva_slots")
    .select("booked_count")
    .eq("id", slotId)
    .single();

  if (error) throw error;

  if (!slot) {
    throw new Error("Slot not found");
  }

  await supabase
    .from("seva_slots")
    .update({
      booked_count: slot.booked_count + 1,
    })
    .eq("id", slotId);
}

export async function getSlotByIdRepository(slotId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_slots")
    .select("*")
    .eq("id", slotId)
    .eq("is_active", true)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
