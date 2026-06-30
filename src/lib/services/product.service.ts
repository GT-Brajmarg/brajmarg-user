// lib/services/product.service.ts

import {
  getTempleFramesRepository,
  getFrameDetailsRepository,
  getFrameSizesRepository,
  getFrameMaterialsRepository,
  createFrameOrderRepository,
  getTempleClothsRepository,
  getClothDetailsRepository,
  getClothSizesRepository,
  getClothColorsRepository,
  createClothOrderRepository,
} from "@/lib/repositories/product.repository";

//
// =======================================
// FRAME
// =======================================
//

export async function fetchTempleFramesService(templeId: string) {
  return getTempleFramesRepository(templeId);
}

export async function fetchFrameDetailsService(frameId: string) {
  return getFrameDetailsRepository(frameId);
}

export async function fetchFrameSizesService(frameId: string) {
  return getFrameSizesRepository(frameId);
}

export async function fetchFrameMaterialsService(frameId: string) {
  return getFrameMaterialsRepository(frameId);
}

export async function registerFrameOrderService(payload: any) {
  return createFrameOrderRepository(payload);
}

//
// =======================================
// CLOTH
// =======================================
//

export async function fetchTempleClothsService(templeId: string) {
  return getTempleClothsRepository(templeId);
}

export async function fetchClothDetailsService(clothId: string) {
  return getClothDetailsRepository(clothId);
}

export async function fetchClothSizesService(clothId: string) {
  return getClothSizesRepository(clothId);
}

export async function fetchClothColorsService(clothId: string) {
  return getClothColorsRepository(clothId);
}

export async function registerClothOrderService(payload: any) {
  return createClothOrderRepository(payload);
}
