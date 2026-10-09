import { getShopFiltersRepository } from "@/lib/repositories/shopFilter.repository";

export async function fetchShopFiltersService(categories: string[]) {
  return getShopFiltersRepository(categories);
}
