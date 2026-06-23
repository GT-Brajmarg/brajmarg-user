// types/seva.ts

export interface SevaItem {
  id: string;
  temple_id: string;
  name: string;
  price: number;
  time: string | null;
  details: string | null;
  significance: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  allow_direct_payment: boolean;
  allow_cod: boolean;
}
