// lib/services/templeTiming.service.ts

import { getTempleTimingsByTempleId } from "@/lib/repositories/templeTiming.repository";

export async function fetchTempleTimings(templeId: string) {
  return await getTempleTimingsByTempleId(templeId);
}
