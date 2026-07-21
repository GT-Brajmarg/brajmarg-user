import {
  cancelBookingRepository,
  createBookingRepository,
  getAvailableDatesRepository,
  getAvailableSlotsRepository,
  getSevaDetailsRepository,
  getSlotRepository,
  getUserBookingsRepository,
  verifyBookingPaymentRepository,
} from "@/lib/repositories/sevaBooking.repository";
import { createClient } from "@/lib/supabase/server";

export async function fetchSevaDetails(templeSlug: string, sevaId: string) {
  return getSevaDetailsRepository(templeSlug, sevaId);
}

export async function fetchAvailableDates(templeSlug: string, sevaId: string) {
  // templeSlug is kept for future slug validation
  return getAvailableDatesRepository(sevaId);
}

export async function fetchAvailableSlots(
  templeSlug: string,
  sevaId: string,
  date: string,
) {
  // templeSlug is kept for future slug validation
  return getAvailableSlotsRepository(sevaId, date);
}

export async function registerSeva({
  templeId,
  sevaItemId,
  slotId,
  registrationDate,
  devoteeName,
  devoteePhone,
  devoteeGotra,
  bookingFor = "self",
  whatsappUpdates = false,
  notes = "",
}: {
  templeId: string;
  sevaItemId: string;
  slotId: string;
  registrationDate: string;
  devoteeName: string;
  devoteePhone: string;
  devoteeGotra?: string;
  bookingFor?: string;
  whatsappUpdates?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Please login to continue.");
  }

  const seva = await getSevaDetailsRepository("", sevaItemId);

  if (!seva) {
    throw new Error("Seva not found.");
  }

  const slot = await getSlotRepository(slotId);

  if (!slot) {
    throw new Error("Slot not found.");
  }

  if (!slot.is_active) {
    throw new Error("Selected slot is unavailable.");
  }

  if (slot.booked_count >= slot.capacity) {
    throw new Error("Selected slot is already full.");
  }

  return createBookingRepository({
    userId: user.id,
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
    amount: Number(seva.price),
  });
}

export async function verifySevaPayment(registrationId: string) {
  return verifyBookingPaymentRepository(registrationId);
}

export async function cancelSevaBooking(registrationId: string) {
  return cancelBookingRepository(registrationId);
}

export async function fetchMyBookings() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return getUserBookingsRepository(user.id);
}
