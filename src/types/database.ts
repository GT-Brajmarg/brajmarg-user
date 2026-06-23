export type Profile = {
  id: string;
  phone: string | null;
  email: string | null;
  full_name: string | null;
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  description: string;

  starts_at: string;
  ends_at: string | null;

  image_url: string | null;

  cta_label: string | null;
  cta_url: string | null;

  display_order: number;
  is_active: boolean;

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

export type PackageType = "solo" | "group";

export type YatraPackage = {
  id: string;

  vehicle_id: string;

  name: string;

  from_location: string;
  to_location: string;

  distance_km: number | null;

  duration_days: number | null;
  duration_nights: number | null;

  price: number | null;
  price_per_km: number | null;

  route_description: string | null;

  inclusions: string[];

  exclusions: string[];

  itinerary: string | null;

  image_url: string | null;

  is_active: boolean;

  display_order: number;

  package_type: PackageType;

  weekdays: number[];

  departure_time: string | null;
  arrival_time: string | null;

  seats_total: number | null;

  allow_direct_payment: boolean;
  allow_cod: boolean;

  created_at: string;
  updated_at: string;

  vehicles?: Vehicle | null;
};

export type HomeResponse = {
  temples: Temple[];
  alerts: Alert[];
  featuredYatras: YatraPackage[];
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type SubscriptionPlan = {
  id: string;
  name: string;
  plan_type: "monthly" | "yearly";
  price: number;
  original_price: number | null;
  savings_text: string | null;
  badge_text: string | null;
  button_text: string;
  button_color: string;
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
