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

export interface RegistrationPayload {
  user_id: string;
  temple_id: string;
  seva_item_id: string;
  slot_id: string;

  registration_date: string;

  devotee_name: string;
  devotee_phone: string;
  devotee_gotra?: string;

  booking_for: "self" | "family" | "other";

  whatsapp_updates: boolean;

  amount: number;

  notes?: string;

  status?: "pending" | "confirmed" | "completed" | "cancelled";

  payment_status?: "pending" | "paid" | "failed" | "refunded";
}
