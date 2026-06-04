import type { CartRow } from "@/lib/cart-store";

export type EnrichedCartRow = CartRow & {
  title: string;
  unit_price: number;
  image_url: string | null;
  temple_name: string | null;
};
