// lib/services/seva.service.ts

import { getTempleSevasRepository } from "@/lib/repositories/seva.repository";

export async function fetchTempleSevasService(templeId: string) {
  return await getTempleSevasRepository(templeId);
}
