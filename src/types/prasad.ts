// types/prasad.ts

export interface PrasadItem {
  id: string;
  temple_id: string;
  name: string;
  price: number;
  ingredients: string | null;
  image_url: string | null;
  quantity: number;
  in_stock: boolean;
  display_order: number;
  allow_direct_payment: boolean;
  allow_cod: boolean;
}
