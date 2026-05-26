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
  contact_phone: string | null;
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

export type AlertType =
  | "festival"
  | "special_darshan"
  | "closure"
  | "timing_change"
  | "general";

export type AlertPriority = "info" | "important" | "urgent";

export type Alert = {
  id: string;
  temple_id: string | null;
  alert_type: AlertType;
  priority: AlertPriority;
  title: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  display_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * A row from a `*_images` child table (frame_images / prasad_images /
 * cloth_items) — this is where the admin panel stores multi-image
 * galleries. Nested selects alias the relation to `product_images`.
 */
export type ProductImage = {
  image_url: string | null;
  is_primary: boolean | null;
  display_order: number | null;
};

export type PrasadItem = {
  id: string;
  temple_id: string;
  name: string;
  price: number;
  ingredients: string | null;
  image_url: string | null;
  product_images?: ProductImage[] | null;
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
  product_images?: ProductImage[] | null;
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
  product_images?: ProductImage[] | null;
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
  product_images?: ProductImage[] | null;
  in_stock: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Vehicle = {
  id: string;
  name: string;
  vehicle_type: string | null;
  seating_capacity: number | null;
  is_ac: boolean | null;
  features: string[] | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

/**
 * Booking model of a yatra package.
 *  - "solo"  → Full Package: the whole vehicle is booked; price is the
 *    total package price; no shared seat inventory.
 *  - "group" → Seat Booking (Shared Yatra): individual seats are sold on
 *    a fixed weekday schedule; `price` is per-seat and `seats_total`
 *    caps inventory.
 * (Authored in the admin panel; new packages may add other values, so
 * callers should treat unknown values as "solo".)
 */
export type PackageType = "solo" | "group";

/**
 * A travel package authored in the admin panel (admin.brajmarg.com).
 * Lives in the shared Supabase DB — not in this repo's migrations.
 * Read-only on the user side; see the `yatra-schema` memory note.
 */
export type YatraPackage = {
  id: string;
  vehicle_id: string | null;
  name: string;
  from_location: string;
  to_location: string;
  distance_km: number | null;
  duration_days: number | null;
  duration_nights: number | null;
  price: number;
  price_per_km: number | null;
  route_description: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  itinerary: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;

  /* ── Booking-model fields (added by the admin app, 2026-05) ──────── */
  /** "solo" (full package) or "group" (shared seat booking). */
  package_type: PackageType;
  /** For group packages: ISO weekdays the shared yatra departs on
   *  (0 = Sunday … 6 = Saturday, matching JS `Date.getDay()`). */
  weekdays: number[] | null;
  /** "HH:MM:SS" — shared-yatra departure / arrival times (group only). */
  departure_time: string | null;
  arrival_time: string | null;
  /** Total seats for a group package; null for solo (whole vehicle). */
  seats_total: number | null;
  /** Whether online (Razorpay) payment is offered for this package. */
  allow_direct_payment: boolean;
  /** Whether Cash-on-Delivery (pay later) booking is offered. */
  allow_cod: boolean;

  /** Embedded via PostgREST when selected with `vehicles(...)`. */
  vehicles?: Pick<
    Vehicle,
    "name" | "vehicle_type" | "seating_capacity" | "is_ac" | "features" | "image_url"
  > | null;
};

export type ItemType = "prasad" | "seva" | "frame" | "cloth" | "yatra";

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
  payment_id: string | null;
  razorpay_order_id: string | null;
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
