-- ============================================================
-- FIX: yatra catalog tables must be readable by BOTH anon and
-- authenticated roles.
--
-- Same defect previously fixed for the temple catalog in
-- fix_public_read_rls.sql: the deployed SELECT policies on the
-- admin-owned `yatra_packages` and `vehicles` tables were created
-- for the `anon` role only. As soon as a user logs in, every yatra
-- query returns 0 rows and the page shows "No yatras available"
-- even though active packages exist. (Verified: anon sees the rows,
-- an authenticated session sees zero; temples — which grant both
-- roles — work fine for the same logged-in user.)
--
-- These tables are authored in the admin panel and live in the
-- shared Supabase DB, not in this repo's migrations. This adds an
-- additional permissive SELECT policy covering anon + authenticated
-- WITHOUT touching the admin team's existing policy. Permissive
-- SELECT policies are OR'd, so this only widens read access.
--
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
-- ============================================================

-- yatra_packages
drop policy if exists "Yatra packages readable by anon and authenticated"
  on public.yatra_packages;
create policy "Yatra packages readable by anon and authenticated"
  on public.yatra_packages for select
  to anon, authenticated
  using (true);

-- vehicles (embedded via the yatra_packages.vehicle_id FK)
drop policy if exists "Vehicles readable by anon and authenticated"
  on public.vehicles;
create policy "Vehicles readable by anon and authenticated"
  on public.vehicles for select
  to anon, authenticated
  using (true);
