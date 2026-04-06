-- ============================================================
-- BRAJMARG DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. PROFILES (extends Supabase auth.users)
--    Flipkart/Amazon style: login via phone OTP or email
--    Collect full info at purchase time
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique,
  email text unique,
  full_name text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, phone, email)
  values (
    new.id,
    new.phone,
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- 2. TEMPLES
-- ============================================================
create table public.temples (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  description text,
  image_url text,
  is_active boolean default true,
  is_coming_soon boolean default false,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.temples enable row level security;

create policy "Temples are publicly readable"
  on public.temples for select
  using (true);


-- ============================================================
-- 3. TEMPLE TIMINGS / SCHEDULE
--    Daily darshan timings for each temple
-- ============================================================
create table public.temple_timings (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  day_of_week text not null, -- 'monday','tuesday',...,'sunday','daily'
  opening_time time not null,
  closing_time time not null,
  label text, -- e.g. 'Morning Darshan', 'Evening Aarti'
  special_note text,
  created_at timestamptz default now()
);

alter table public.temple_timings enable row level security;

create policy "Temple timings are publicly readable"
  on public.temple_timings for select
  using (true);


-- ============================================================
-- 4. EVENTS / UPCOMING ALERTS
--    Jhulan Yatra, Janmashtami, etc.
-- ============================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  name text not null,
  event_date date not null,
  description text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.events enable row level security;

create policy "Events are publicly readable"
  on public.events for select
  using (true);


-- ============================================================
-- 5. PRASAD ITEMS
--    Besan Ladoo, Peda, Makhan Mishri, etc.
-- ============================================================
create table public.prasad_items (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  name text not null,
  price numeric not null,
  ingredients text, -- 'Besan, Ghee, Sugar, Dry Fruits'
  image_url text,
  in_stock boolean default true,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.prasad_items enable row level security;

create policy "Prasad items are publicly readable"
  on public.prasad_items for select
  using (true);


-- ============================================================
-- 6. SEVA / RAJBHOG ITEMS
--    Rajbhog Seva, Phool Bangla Seva, etc.
-- ============================================================
create table public.seva_items (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  name text not null,
  price numeric not null,
  time text, -- '11:30 AM', '05:00 PM'
  details text, -- description of the seva
  significance text, -- quoted significance text
  image_url text,
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.seva_items enable row level security;

create policy "Seva items are publicly readable"
  on public.seva_items for select
  using (true);


-- ============================================================
-- 7. FRAME ITEMS
--    Bankey Bihari Ji Portrait, Radha Krishna Canvas, etc.
-- ============================================================
create table public.frame_items (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  name text not null,
  material text, -- 'Teak Wood, Glass, High-Res Print'
  price numeric not null,
  size text, -- '8x10', '12x18'
  image_url text,
  in_stock boolean default true,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.frame_items enable row level security;

create policy "Frame items are publicly readable"
  on public.frame_items for select
  using (true);


-- ============================================================
-- 8. CLOTH / POSHAK ITEMS
--    Zari Poshak, Cotton Summer Poshak, etc.
-- ============================================================
create table public.cloth_items (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples(id) on delete cascade,
  name text not null,
  material text, -- 'Silk, Zari Thread' / 'Pure Cotton'
  price numeric not null,
  sizes text[] default '{"0","1","2","3"}', -- available sizes
  colors text[] default '{}', -- available colors: 'Red','White', etc.
  image_url text,
  in_stock boolean default true,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cloth_items enable row level security;

create policy "Cloth items are publicly readable"
  on public.cloth_items for select
  using (true);


-- ============================================================
-- 9. CART
--    Unified cart for all item types
-- ============================================================
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('prasad', 'seva', 'frame', 'cloth')),
  item_id uuid not null, -- references the specific item table
  quantity int not null default 1,
  selected_size text, -- for frames/cloths
  selected_color text, -- for cloths
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cart_items enable row level security;

create policy "Users can view own cart"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can add to own cart"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete from own cart"
  on public.cart_items for delete
  using (auth.uid() = user_id);


-- ============================================================
-- 10. ORDERS
--     Created at purchase time with user info
-- ============================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text unique not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric not null,
  -- user info captured at purchase time
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_pincode text,
  payment_method text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);


-- ============================================================
-- 11. ORDER ITEMS
-- ============================================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_type text not null check (item_type in ('prasad', 'seva', 'frame', 'cloth')),
  item_id uuid not null,
  item_name text not null, -- snapshot at purchase time
  item_price numeric not null, -- snapshot at purchase time
  quantity int not null default 1,
  selected_size text,
  selected_color text,
  temple_name text not null, -- snapshot at purchase time
  created_at timestamptz default now()
);

alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can create own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );


-- ============================================================
-- 12. STOCK NOTIFY (for "Notify Me" on out-of-stock items)
-- ============================================================
create table public.stock_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('prasad', 'seva', 'frame', 'cloth')),
  item_id uuid not null,
  notified boolean default false,
  created_at timestamptz default now()
);

alter table public.stock_notifications enable row level security;

create policy "Users can view own notifications"
  on public.stock_notifications for select
  using (auth.uid() = user_id);

create policy "Users can create own notifications"
  on public.stock_notifications for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own notifications"
  on public.stock_notifications for delete
  using (auth.uid() = user_id);


-- ============================================================
-- 13. SEVA REGISTRATIONS (separate from cart/orders)
--     "Register for Seva" flow
-- ============================================================
create table public.seva_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  seva_item_id uuid not null references public.seva_items(id) on delete cascade,
  temple_id uuid not null references public.temples(id) on delete cascade,
  registration_date date not null,
  devotee_name text not null,
  devotee_phone text not null,
  devotee_gotra text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  amount numeric not null,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.seva_registrations enable row level security;

create policy "Users can view own seva registrations"
  on public.seva_registrations for select
  using (auth.uid() = user_id);

create policy "Users can create own seva registrations"
  on public.seva_registrations for insert
  with check (auth.uid() = user_id);


-- ============================================================
-- INDEXES for performance
-- ============================================================
create index idx_temple_timings_temple on public.temple_timings(temple_id);
create index idx_events_temple on public.events(temple_id);
create index idx_events_date on public.events(event_date);
create index idx_prasad_temple on public.prasad_items(temple_id);
create index idx_seva_temple on public.seva_items(temple_id);
create index idx_frame_temple on public.frame_items(temple_id);
create index idx_cloth_temple on public.cloth_items(temple_id);
create index idx_cart_user on public.cart_items(user_id);
create index idx_orders_user on public.orders(user_id);
create index idx_order_items_order on public.order_items(order_id);
create index idx_seva_reg_user on public.seva_registrations(user_id);
create index idx_seva_reg_seva on public.seva_registrations(seva_item_id);


-- ============================================================
-- UPDATED_AT TRIGGER (auto-update timestamps)
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.temples
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.prasad_items
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.seva_items
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.frame_items
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.cloth_items
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.cart_items
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.orders
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.seva_registrations
  for each row execute function public.update_updated_at();
