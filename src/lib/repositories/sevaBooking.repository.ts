import { createClient } from "@/lib/supabase/server";

export async function getSevaDetailsRepository(
  templeSlug: string,
  sevaId: string,
) {
  const supabase = await createClient();

  // TODO:
  // Replace this with slug lookup once temples.slug is added.
  // Currently templeSlug is ignored.

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
    .eq("is_active", true)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getAvailableDatesRepository(sevaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_available_dates")
    .select("*")
    .eq("seva_item_id", sevaId)
    .eq("is_active", true)
    .order("display_order")
    .order("available_date");

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getAvailableSlotsRepository(
  sevaId: string,
  date: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_slots")
    .select("*")
    .eq("seva_item_id", sevaId)
    .eq("slot_date", date)
    .eq("is_active", true)
    .order("slot_time");

  if (error) throw new Error(error.message);

  return (
    data?.map((slot) => ({
      ...slot,
      remaining: slot.capacity - slot.booked_count,
    })) ?? []
  );
}

export async function getSlotRepository(slotId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_slots")
    .select("*")
    .eq("id", slotId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function createBookingRepository({
  userId,
  templeId,
  sevaItemId,
  slotId,
  registrationDate,
  devoteeName,
  devoteePhone,
  devoteeGotra,
  bookingFor,
  whatsappUpdates,
  notes,
  amount,
}: {
  userId: string;
  templeId: string;
  sevaItemId: string;
  slotId: string;
  registrationDate: string;
  devoteeName: string;
  devoteePhone: string;
  devoteeGotra?: string;
  bookingFor: string;
  whatsappUpdates: boolean;
  notes?: string;
  amount: number;
}) {
  const supabase = await createClient();

  const slot = await getSlotRepository(slotId);

  if (!slot) {
    throw new Error("Slot not found.");
  }

  if (slot.booked_count >= slot.capacity) {
    throw new Error("Selected slot is full.");
  }

  const { data, error } = await supabase
    .from("seva_registrations")
    .insert({
      user_id: userId,
      temple_id: templeId,
      seva_item_id: sevaItemId,
      slot_id: slotId,
      slot_time: slot.slot_time,
      registration_date: registrationDate,
      devotee_name: devoteeName,
      devotee_phone: devoteePhone,
      devotee_gotra: devoteeGotra,
      booking_for: bookingFor,
      whatsapp_updates: whatsappUpdates,
      notes,
      amount,
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { error: slotError } = await supabase
    .from("seva_slots")
    .update({
      booked_count: slot.booked_count + 1,
    })
    .eq("id", slotId);

  if (slotError) {
    throw new Error(slotError.message);
  }

  return data;
}

export async function verifyBookingPaymentRepository(registrationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_registrations")
    .update({
      payment_status: "paid",
      status: "confirmed",
    })
    .eq("id", registrationId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function cancelBookingRepository(registrationId: string) {
  const supabase = await createClient();

  const { data: booking, error } = await supabase
    .from("seva_registrations")
    .select("*")
    .eq("id", registrationId)
    .single();

  if (error) throw new Error(error.message);

  await supabase
    .from("seva_slots")
    .update({
      booked_count: Math.max(booking.booked_count ?? 1, 1) - 1,
    })
    .eq("id", booking.slot_id);

  const { data, error: cancelError } = await supabase
    .from("seva_registrations")
    .update({
      status: "cancelled",
    })
    .eq("id", registrationId)
    .select()
    .single();

  if (cancelError) throw new Error(cancelError.message);

  return data;
}

export async function getUserBookingsRepository(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_registrations")
    .select(
      `
      *,
      seva_items(
        id,
        name,
        image_url,
        price
      ),
      temples(
        id,
        name,
        location
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw new Error(error.message);

  return data ?? [];
}
