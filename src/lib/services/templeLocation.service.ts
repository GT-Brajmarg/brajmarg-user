import { getTempleLocationRepository } from "../repositories/templeLocation.repository";

export async function fetchTempleLocation(templeId: string) {
  return getTempleLocationRepository(templeId);
}
