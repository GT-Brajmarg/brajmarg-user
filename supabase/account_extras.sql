-- ============================================================
-- Profile extras for the /account dashboard.
-- Run once in the Supabase SQL Editor.
-- ============================================================

alter table public.profiles
  add column if not exists date_of_birth date,
  add column if not exists email_notifications boolean not null default true,
  add column if not exists wishlist_private boolean not null default false,
  add column if not exists membership_tier text not null default 'gold'
    check (membership_tier in ('silver', 'gold', 'platinum'));
