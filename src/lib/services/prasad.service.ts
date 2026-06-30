// lib/services/prasad.service.ts

import {
  getTemplePrasadRepository,
  getPrasadDetailsRepository,
  getPrasadQuantityOptionsRepository,
  createPrasadOrderRepository,
} from "@/lib/repositories/prasad.repository";

import { PrasadOrderPayload } from "@/types/prasad";

export async function fetchTemplePrasadService(templeId: string) {
  return getTemplePrasadRepository(templeId);
}

export async function fetchPrasadDetailsService(prasadId: string) {
  return getPrasadDetailsRepository(prasadId);
}

export async function fetchPrasadQuantityOptionsService(prasadId: string) {
  return getPrasadQuantityOptionsRepository(prasadId);
}

export async function registerPrasadService(payload: PrasadOrderPayload) {
  return createPrasadOrderRepository(payload);
}
