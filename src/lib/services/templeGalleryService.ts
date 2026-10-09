import { getTempleGalleryRepository } from "../repositories/templeGalleryRepository";

export async function fetchTempleGallery(templeId: string) {
  return getTempleGalleryRepository(templeId);
}
