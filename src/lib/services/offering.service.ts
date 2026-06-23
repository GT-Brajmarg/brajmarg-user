// lib/services/offering.service.ts

import { getTempleOfferingsRepository } from "@/lib/repositories/offering.repository";

export async function fetchTempleOfferingsService(templeId: string) {
  return await getTempleOfferingsRepository(templeId);
}
