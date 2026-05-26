-- Corrective migration.
--
-- An earlier change added an `images text[]` column + sync trigger to
-- prasad_items / seva_items / frame_items / cloth_items. That was the
-- WRONG place: the admin panel already stores galleries in normalised
-- child tables (frame_images / prasad_images / cloth_images, each with
-- image_url + is_primary + display_order). The frontend now reads
-- those child tables directly, so the array column is removed to keep
-- the schema honest and avoid divergence.
--
-- Also undoes the demo Unsplash images that were seeded into the
-- Shreenath Ji prasad/cloth rows (those rows had no image originally
-- and have no child-table images, so they are reset to NULL).
-- Frame rows are untouched (their image_url is real storage data).
--
-- Idempotent / safe to re-run.

-- 1. Drop the sync trigger + function.
do $$
declare t text;
begin
  foreach t in array array['prasad_items','seva_items','frame_items','cloth_items']
  loop
    execute format('drop trigger if exists trg_sync_item_images on public.%I', t);
  end loop;
end$$;

drop function if exists public.sync_item_images();

-- 2. Reset demo pollution before dropping the column (Shreenath Ji only,
--    only the placeholder Unsplash values this project introduced).
update public.prasad_items p
set image_url = null
from public.temples tp
where p.temple_id = tp.id
  and tp.name ilike '%shreenath%'
  and p.image_url like '%images.unsplash.com%';

update public.cloth_items c
set image_url = null
from public.temples tp
where c.temple_id = tp.id
  and tp.name ilike '%shreenath%'
  and c.image_url like '%images.unsplash.com%';

-- 3. Drop the misplaced array column.
alter table public.prasad_items drop column if exists images;
alter table public.seva_items   drop column if exists images;
alter table public.frame_items  drop column if exists images;
alter table public.cloth_items  drop column if exists images;
