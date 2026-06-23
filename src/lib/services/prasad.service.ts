// lib/services/prasad.service.ts

import { getTemplePrasadRepository } from "@/lib/repositories/prasad.repository";

export async function fetchTemplePrasadService(templeId: string) {
  return await getTemplePrasadRepository(templeId);
}
