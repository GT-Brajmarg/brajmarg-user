import { getShopProductsRepository } from "@/lib/repositories/shop.repository";

interface ShopPayload {
  categories?: string[];
  collection?: string;
  query?: string;
}

export async function fetchShopProductsService(payload: ShopPayload) {
  return getShopProductsRepository(payload);
}
