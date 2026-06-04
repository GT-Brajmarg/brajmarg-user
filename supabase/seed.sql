-- ============================================================
-- BRAJMARG SEED DATA — RUN IN SUPABASE SQL EDITOR
--
-- This script is SAFE TO RUN MULTIPLE TIMES.
-- It will:
--   1. Remove duplicate "Shri Bankey Bihari Temple" rows
--   2. Use your EXISTING temple (whatever its UUID is)
--   3. Wipe and reseed: timings, events, prasad, seva, frames, cloth
--
-- HOW TO RUN:
--   Supabase Dashboard > SQL Editor > New Query > Paste this > Run
-- ============================================================

DO $$
DECLARE
  v_temple_id uuid;
  v_dup_count int;
BEGIN
  -- ----------------------------------------------------------
  -- STEP 1: Pick the oldest "Shri Bankey Bihari Temple" and
  --         delete any newer duplicates
  -- ----------------------------------------------------------
  SELECT id INTO v_temple_id
  FROM public.temples
  WHERE name = 'Shri Bankey Bihari Temple'
  ORDER BY created_at ASC, id ASC
  LIMIT 1;

  -- If no Bankey Bihari temple exists yet, create one
  IF v_temple_id IS NULL THEN
    INSERT INTO public.temples (name, location, description, image_url, is_active, is_coming_soon, display_order)
    VALUES (
      'Shri Bankey Bihari Temple',
      'Vrindavan',
      'One of the most revered temples in Vrindavan dedicated to Lord Krishna in his Bankey Bihari form. Famous for its unique darshan tradition.',
      'https://images.unsplash.com/photo-1624486532598-1d63567d2efb?w=1200&q=80',
      true, false, 1
    )
    RETURNING id INTO v_temple_id;
    RAISE NOTICE 'Created new temple with id: %', v_temple_id;
  ELSE
    -- Update its image so the hero looks nice
    UPDATE public.temples
    SET image_url = COALESCE(image_url, 'https://images.unsplash.com/photo-1624486532598-1d63567d2efb?w=1200&q=80'),
        description = COALESCE(description, 'One of the most revered temples in Vrindavan dedicated to Lord Krishna in his Bankey Bihari form. Famous for its unique darshan tradition.'),
        is_active = true,
        is_coming_soon = false
    WHERE id = v_temple_id;
    RAISE NOTICE 'Using existing temple id: %', v_temple_id;
  END IF;

  -- Delete any other duplicate "Shri Bankey Bihari Temple" rows
  -- (cascade removes their orphan child rows automatically)
  SELECT count(*) INTO v_dup_count
  FROM public.temples
  WHERE name = 'Shri Bankey Bihari Temple' AND id <> v_temple_id;

  IF v_dup_count > 0 THEN
    DELETE FROM public.temples
    WHERE name = 'Shri Bankey Bihari Temple' AND id <> v_temple_id;
    RAISE NOTICE 'Removed % duplicate temple row(s)', v_dup_count;
  END IF;

  -- ----------------------------------------------------------
  -- STEP 2: Wipe existing related data for this temple
  --         (idempotent — re-running gives a clean slate)
  -- ----------------------------------------------------------
  DELETE FROM public.cloth_items     WHERE temple_id = v_temple_id;
  DELETE FROM public.frame_items     WHERE temple_id = v_temple_id;
  DELETE FROM public.seva_items      WHERE temple_id = v_temple_id;
  DELETE FROM public.prasad_items    WHERE temple_id = v_temple_id;
  DELETE FROM public.temple_timings  WHERE temple_id = v_temple_id;
  DELETE FROM public.events          WHERE temple_id = v_temple_id;

  -- ----------------------------------------------------------
  -- STEP 3: TEMPLE TIMINGS / DAILY SCHEDULE
  -- ----------------------------------------------------------
  INSERT INTO public.temple_timings (temple_id, day_of_week, opening_time, closing_time, label, special_note) VALUES
    (v_temple_id, 'daily', '07:45', '12:00', 'Shringar Aarti',  'Morning darshan begins after Mangal Aarti'),
    (v_temple_id, 'daily', '11:00', '11:30', 'Rajbhog Bhog',    '56 bhog offered to the deity'),
    (v_temple_id, 'daily', '12:00', '17:30', 'Vishram',         'Temple closed for deity rest'),
    (v_temple_id, 'daily', '17:30', '21:30', 'Shayan Darshan',  'Evening darshan and Shayan Aarti'),
    (v_temple_id, 'daily', '20:00', '20:30', 'Shayan Aarti',    'Final aarti before deity rest');

  -- ----------------------------------------------------------
  -- STEP 4: EVENTS / UPCOMING ALERTS
  -- ----------------------------------------------------------
  INSERT INTO public.events (temple_id, name, event_date, description, is_active) VALUES
    (v_temple_id, 'Jhulan Yatra',
      (current_date + interval '15 days')::date,
      'The swinging festival of Lord Krishna. A highly auspicious time when deities are placed on decorated swings and devotees offer prayers.',
      true),
    (v_temple_id, 'Janmashtami',
      (current_date + interval '26 days')::date,
      'The grand celebration of Lord Krishna birth. Special midnight aarti, abhishek, and bhog offerings.',
      true),
    (v_temple_id, 'Radhashtami',
      (current_date + interval '40 days')::date,
      'Birth anniversary of Shrimati Radharani. Special darshan and 56 bhog offerings.',
      true);

  -- ----------------------------------------------------------
  -- STEP 5: PRASAD ITEMS
  -- ----------------------------------------------------------
  INSERT INTO public.prasad_items (temple_id, name, price, ingredients, image_url, in_stock, display_order) VALUES
    (v_temple_id, 'Besan Ladoo',         151, 'Besan, Ghee, Sugar, Dry Fruits',
      'https://images.unsplash.com/photo-1605197788044-5a32c7078486?w=600&q=80', true,  1),
    (v_temple_id, 'Peda',                201, 'Khoya, Sugar, Cardamom',
      'https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=600&q=80', true,  2),
    (v_temple_id, 'Makhan Mishri',       101, 'Fresh Butter, Rock Sugar',
      'https://images.unsplash.com/photo-1559717865-a99cac1c95d8?w=600&q=80',  false, 3),
    (v_temple_id, 'Panchamrit',          251, 'Milk, Curd, Honey, Ghee, Sugar',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=600&q=80', true,  4),
    (v_temple_id, 'Mathura Pedha',       301, 'Pure Khoya, Cardamom, Sugar',
      'https://images.unsplash.com/photo-1606471191009-63994c53433b?w=600&q=80', true,  5),
    (v_temple_id, 'Tulsi Mala Prasad',    51, 'Tulsi Beads, Sacred Thread',
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80', true,  6);

  -- ----------------------------------------------------------
  -- STEP 6: SEVA / RAJBHOG
  -- ----------------------------------------------------------
  INSERT INTO public.seva_items (temple_id, name, price, time, details, significance, image_url, is_active, display_order) VALUES
    (v_temple_id, 'Rajbhog Seva', 1100, '11:30 AM',
      'Offering of an elaborate mid-day meal to the deity. Includes 56 types of bhog.',
      'Performing Rajbhog Seva brings prosperity and peace to the family.',
      null, true, 1),
    (v_temple_id, 'Phool Bangla Seva', 5100, '05:00 PM',
      'Decoration of the temple with exotic flowers.',
      'Offering fragrant flowers pleases the deity and invokes divine blessings for harmony.',
      null, true, 2),
    (v_temple_id, 'Mangala Aarti Seva', 501, '04:30 AM',
      'Sponsor the morning Mangal Aarti — the first darshan of the day.',
      'Mangal Aarti is the most sacred aarti, granting auspicious beginnings.',
      null, true, 3),
    (v_temple_id, 'Tulsi Vivah Seva', 2100, '06:00 PM',
      'Sacred marriage ritual of Tulsi performed in the temple courtyard.',
      'Sponsoring this seva is considered equivalent to performing one daughter wedding.',
      null, true, 4);

  -- ----------------------------------------------------------
  -- STEP 7: FRAME ITEMS (with size variants)
  -- ----------------------------------------------------------
  INSERT INTO public.frame_items (temple_id, name, material, price, size, image_url, in_stock, display_order) VALUES
    -- Bankey Bihari Portrait — 3 size variants
    (v_temple_id, 'Bankey Bihari Ji Portrait – Wooden Frame', 'Teak Wood, Glass, High-Res Print',
      501, '8x10', 'https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1f1?w=600&q=80', true, 1),
    (v_temple_id, 'Bankey Bihari Ji Portrait – Wooden Frame', 'Teak Wood, Glass, High-Res Print',
      901, '12x18', 'https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1f1?w=600&q=80', true, 2),
    (v_temple_id, 'Bankey Bihari Ji Portrait – Wooden Frame', 'Teak Wood, Glass, High-Res Print',
      1501, '16x24', 'https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1f1?w=600&q=80', true, 3),
    -- Radha Krishna Canvas — 3 size variants
    (v_temple_id, 'Radha Krishna Canvas', 'Premium Canvas, UV Coating',
      701, '8x10', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', true, 4),
    (v_temple_id, 'Radha Krishna Canvas', 'Premium Canvas, UV Coating',
      1201, '12x18', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', true, 5),
    (v_temple_id, 'Radha Krishna Canvas', 'Premium Canvas, UV Coating',
      1801, '16x24', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', true, 6),
    -- Govardhan Photo Frame — 2 size variants
    (v_temple_id, 'Govardhan Hill Photo Frame', 'MDF, Acrylic Sheet, Digital Print',
      351, '6x8', 'https://images.unsplash.com/photo-1606293926249-ed22e34f6cef?w=600&q=80', true, 7),
    (v_temple_id, 'Govardhan Hill Photo Frame', 'MDF, Acrylic Sheet, Digital Print',
      651, '10x14', 'https://images.unsplash.com/photo-1606293926249-ed22e34f6cef?w=600&q=80', true, 8);

  -- ----------------------------------------------------------
  -- STEP 8: CLOTH / POSHAK
  -- ----------------------------------------------------------
  INSERT INTO public.cloth_items (temple_id, name, material, price, sizes, colors, image_url, in_stock, display_order) VALUES
    (v_temple_id, 'Zari Poshak – Red', 'Silk, Zari Thread', 751,
      ARRAY['0','1','2','3'], ARRAY['Red','Maroon','Pink'],
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', true, 1),
    (v_temple_id, 'Cotton Summer Poshak', 'Pure Cotton', 301,
      ARRAY['0','1','2','3'], ARRAY['White','Yellow','Light Blue'],
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80', true, 2),
    (v_temple_id, 'Festival Silk Poshak', 'Banarasi Silk, Gold Embroidery', 1501,
      ARRAY['0','1','2','3'], ARRAY['Gold','Royal Blue','Emerald Green'],
      'https://images.unsplash.com/photo-1606293459339-aa5d34a7b0e1?w=600&q=80', true, 3),
    (v_temple_id, 'Winter Velvet Poshak', 'Velvet, Pearl Work', 1201,
      ARRAY['0','1','2','3'], ARRAY['Maroon','Navy Blue','Forest Green'],
      'https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1f1?w=600&q=80', true, 4);

  RAISE NOTICE 'Seed complete. Temple: %', v_temple_id;
END $$;
