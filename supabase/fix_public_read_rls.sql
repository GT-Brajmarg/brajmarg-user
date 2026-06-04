-- ============================================================
-- FIX: public catalog tables must be readable by BOTH anon and
-- authenticated roles.
--
-- The deployed SELECT policies were created for the `anon` role
-- only, so as soon as a user logs in every catalog query returns
-- 0 rows (temples disappear, cart can't enrich, checkout breaks).
--
-- This re-creates each "publicly readable" policy explicitly for
-- `anon, authenticated`. Safe to run multiple times.
-- Run once in the Supabase SQL Editor.
-- ============================================================

-- temples
drop policy if exists "Temples are publicly readable" on public.temples;
create policy "Temples are publicly readable"
  on public.temples for select
  to anon, authenticated
  using (true);

-- temple_timings
drop policy if exists "Temple timings are publicly readable" on public.temple_timings;
create policy "Temple timings are publicly readable"
  on public.temple_timings for select
  to anon, authenticated
  using (true);

-- events
drop policy if exists "Events are publicly readable" on public.events;
create policy "Events are publicly readable"
  on public.events for select
  to anon, authenticated
  using (true);

-- prasad_items
drop policy if exists "Prasad items are publicly readable" on public.prasad_items;
create policy "Prasad items are publicly readable"
  on public.prasad_items for select
  to anon, authenticated
  using (true);

-- seva_items
drop policy if exists "Seva items are publicly readable" on public.seva_items;
create policy "Seva items are publicly readable"
  on public.seva_items for select
  to anon, authenticated
  using (true);

-- frame_items
drop policy if exists "Frame items are publicly readable" on public.frame_items;
create policy "Frame items are publicly readable"
  on public.frame_items for select
  to anon, authenticated
  using (true);

-- cloth_items
drop policy if exists "Cloth items are publicly readable" on public.cloth_items;
create policy "Cloth items are publicly readable"
  on public.cloth_items for select
  to anon, authenticated
  using (true);
