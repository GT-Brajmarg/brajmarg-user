-- ============================================================
-- Add a contact phone number to temples.
-- Surfaced in the alert detail modal ("Temple Contact").
-- Run once in the Supabase SQL Editor.
-- ============================================================

alter table public.temples
  add column if not exists contact_phone text;
