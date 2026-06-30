import {
  getTempleSevasRepository,
  getSevaDetailsRepository,
  getAvailableDatesRepository,
  getSlotsRepository,
  registerSevaRepository,
  incrementBookedCountRepository,
  getSlotByIdRepository,
} from "@/lib/repositories/seva.repository";

import { RegistrationPayload } from "@/types/seva";

export async function fetchTempleSevasService(templeId: string) {
  return getTempleSevasRepository(templeId);
}
export async function fetchSevaDetailsService(sevaId: string) {
  return getSevaDetailsRepository(sevaId);
}
export async function fetchSevaSlotsService(sevaId: string, date: string) {
  return getSlotsRepository(sevaId, date);
}

export async function fetchAvailableDatesService(sevaId: string) {
  return getAvailableDatesRepository(sevaId);
}

export async function fetchAvailableSlotsService(sevaId: string, date: string) {
  return getSlotsRepository(sevaId, date);
}

export async function registerSevaService(payload: RegistrationPayload) {
  const slot = await getSlotByIdRepository(payload.slot_id);

  if (!slot) {
    throw new Error("Selected slot not found");
  }

  if (slot.seva_item_id !== payload.seva_item_id) {
    throw new Error("Invalid slot selected");
  }

  if (slot.booked_count >= slot.capacity) {
    throw new Error("Selected slot is fully booked");
  }

  const registration = await registerSevaRepository(payload);

  await incrementBookedCountRepository(payload.slot_id);

  return registration;
}
