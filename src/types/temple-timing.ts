// types/temple-timing.ts

export interface TempleTiming {
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
}
