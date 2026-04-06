export type Profile = {
  id: string;
  phone: string | null;
  email: string | null;
  full_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  created_at: string;
  updated_at: string;
};

export type Temple = {
  id: string;
  name: string;
  location: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  is_coming_soon: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type TempleTiming = {
  id: string;
  temple_id: string;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  label: string | null;
  special_note: string | null;
  created_at: string;
};

export type Event = {
  id: string;
  temple_id: string;
  name: string;
  event_date: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type PrasadItem = {
  id: string;
  temple_id: string;
  name: string;
  price: number;
  ingredients: string | null;
  image_url: string | null;
  in_stock: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type SevaItem = {
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
  created_at: string;
  updated_at: string;
};

export type FrameItem = {
  id: string;
  temple_id: string;
  name: string;
  material: string | null;
  price: number;
  size: string | null;
  image_url: string | null;
  in_stock: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ClothItem = {
  id: string;
  temple_id: string;
  name: string;
  material: string | null;
  price: number;
  sizes: string[];
  colors: string[];
  image_url: string | null;
  in_stock: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ItemType = "prasad" | "seva" | "frame" | "cloth";

export type CartItem = {
  id: string;
  user_id: string;
  item_type: ItemType;
  item_id: string;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  payment_method: string | null;
  payment_status: PaymentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  item_type: ItemType;
  item_id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  temple_name: string;
  created_at: string;
};

export type SevaRegistration = {
  id: string;
  user_id: string;
  seva_item_id: string;
  temple_id: string;
  registration_date: string;
  devotee_name: string;
  devotee_phone: string;
  devotee_gotra: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_status: PaymentStatus;
  amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
