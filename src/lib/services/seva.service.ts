// // // lib/services/seva.service.ts

// // import { getTempleSevasRepository } from "@/lib/repositories/seva.repository";

// // export async function fetchTempleSevasService(templeId: string) {
// //   return await getTempleSevasRepository(templeId);
// // }
// import {
//   getTempleSevasRepository,
//   getSevaDetailsRepository,
//   getAvailableDatesRepository,
//   getSlotsRepository,
//   registerSevaRepository,
//   incrementBookedCountRepository,
// } from "@/lib/repositories/seva.repository";

// import { RegistrationPayload } from "@/types/seva";

// export async function fetchTempleSevas(templeId: string) {
//   return getTempleSevasRepository(templeId);
// }

// export async function fetchSevaDetails(templeId: string, sevaId: string) {
//   return getSevaDetailsRepository(templeId, sevaId);
// }

// export async function fetchAvailableDates(sevaId: string) {
//   return getAvailableDatesRepository(sevaId);
// }

// export async function fetchAvailableSlots(sevaId: string, date: string) {
//   return getSlotsRepository(sevaId, date);
// }

// export async function registerSeva(payload: RegistrationPayload) {
//   // 1. Fetch slots for the selected date
//   const slots = await getSlotsRepository(
//     payload.seva_item_id,
//     payload.registration_date,
//   );

//   // 2. Find the selected slot
//   const slot = slots.find((s) => s.id === payload.slot_id);

//   if (!slot) {
//     throw new Error("Selected slot not found.");
//   }

//   // 3. Check capacity
//   if (slot.booked_count >= slot.capacity) {
//     throw new Error("Selected slot is fully booked.");
//   }

//   // 4. Create registration
//   const registration = await registerSevaRepository(payload);

//   // 5. Increase booked count
//   await incrementBookedCountRepository(payload.slot_id);

//   return registration;
// }
// lib/services/seva.service.ts

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
