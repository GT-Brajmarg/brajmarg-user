// lib/services/temple-timing.service.ts

import { getTempleTimingsRepository } from "@/lib/repositories/temple-timing.repository";

export async function fetchTempleTimingsService(templeId: string) {
  const timings = await getTempleTimingsRepository(templeId);

  return timings;
}
