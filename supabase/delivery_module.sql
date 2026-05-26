-- ============================================================
-- Migration: Shiprocket delivery module
--
-- Adds the fulfillment layer on top of the existing orders flow.
-- Designed for multi-pickup + multi-shipment from day one so the
-- single -> multiple pickup transition is a config change, not a
-- data migration.
--
--   pickup_locations  -> registry mirroring Shiprocket pickup tags
--   shipments         -> one order may have many shipments (one per
--                        pickup/temple group)
--   shipment_events   -> append-only, idempotent webhook sink
--   orders.*          -> COD remittance + cancellation/refund fields
--
-- Writes happen only through the service-role client (orders has no
-- UPDATE RLS; the same applies here). Users get SELECT on their own
-- rows for the tracking page.
--
-- Idempotent: safe to run multiple times.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Pickup locations (mirror of Shiprocket "pickup_location" tags)
-- ------------------------------------------------------------
create table if not exists public.pickup_locations (
  id             uuid primary key default gen_random_uuid(),
  shiprocket_tag text not null unique,                       -- nickname registered in Shiprocket dashboard
  temple_id      uuid references public.temples(id) on delete set null,
  pincode        text not null,
  is_default     boolean default false,
  created_at     timestamptz default now()
);

create index if not exists idx_pickup_locations_temple
  on public.pickup_locations(temple_id);

-- Exactly one default pickup at most (partial unique index).
create unique index if not exists uniq_pickup_default
  on public.pickup_locations(is_default)
  where is_default = true;

-- ------------------------------------------------------------
-- 2. Shipments (one order -> many shipments)
-- ------------------------------------------------------------
create table if not exists public.shipments (
  id                 uuid primary key default gen_random_uuid(),
  order_id           uuid not null references public.orders(id) on delete cascade,
  provider           text not null default 'shiprocket',
  pickup_tag         text not null,
  sr_order_id        text,                       -- Shiprocket order id
  shipment_id        text,                       -- Shiprocket shipment id
  awb_code           text,                       -- tracking / waybill number
  courier_name       text,
  tracking_url       text,
  delivery_pin       text,                       -- delivery OTP shown to the user
  payment_type       text not null check (payment_type in ('Prepaid', 'COD')),
  cod_amount         numeric default 0,
  status             text not null default 'created'
                       check (status in ('created','picked_up','in_transit','ofd','delivered','rto','cancelled')),
  estimated_delivery date,
  raw_status         text,                       -- last raw provider status (audit)
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

create index if not exists idx_shipments_order on public.shipments(order_id);
create index if not exists idx_shipments_awb   on public.shipments(awb_code);

-- ------------------------------------------------------------
-- 3. Shipment events (append-only, idempotent webhook sink)
-- ------------------------------------------------------------
create table if not exists public.shipment_events (
  id                uuid primary key default gen_random_uuid(),
  shipment_id       uuid references public.shipments(id) on delete cascade,
  provider          text not null,
  event_type        text not null,
  raw_status        text,
  payload           jsonb,
  provider_event_id text,
  created_at        timestamptz default now(),
  -- duplicate webhook delivery becomes a no-op insert
  unique (provider, provider_event_id)
);

create index if not exists idx_shipment_events_shipment
  on public.shipment_events(shipment_id);

-- ------------------------------------------------------------
-- 4. Orders: COD remittance + cancellation/refund tracking
--
-- For COD, delivered != paid. payment_status flips to 'paid' only
-- when the COD remittance is reconciled (~8-10 working days after
-- delivery), not on the delivery webhook.
-- ------------------------------------------------------------
alter table public.orders
  add column if not exists cod_remitted        boolean default false;

alter table public.orders
  add column if not exists cod_remitted_at     timestamptz;

alter table public.orders
  add column if not exists cancellation_reason text;

alter table public.orders
  add column if not exists refund_status       text
    check (refund_status in ('requested','processing','done'));

-- order_items carries temple_id so a Razorpay shipment (created in the
-- webhook/verify step, away from the cart) can still route to the right
-- pickup. Nullable -> falls back to the default pickup (correct for the
-- single-pickup setup today).
alter table public.order_items
  add column if not exists temple_id uuid references public.temples(id) on delete set null;

-- ------------------------------------------------------------
-- 5. RLS: users read their own; only service-role writes
-- ------------------------------------------------------------
alter table public.shipments        enable row level security;
alter table public.shipment_events  enable row level security;
alter table public.pickup_locations enable row level security;

-- Users can read shipments belonging to their own orders.
drop policy if exists "Users can view own shipments" on public.shipments;
create policy "Users can view own shipments"
  on public.shipments for select
  using (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

-- Users can read events for their own shipments.
drop policy if exists "Users can view own shipment events" on public.shipment_events;
create policy "Users can view own shipment events"
  on public.shipment_events for select
  using (
    shipment_id in (
      select s.id
      from public.shipments s
      join public.orders o on o.id = s.order_id
      where o.user_id = auth.uid()
    )
  );

-- Pickup locations are non-sensitive config; allow authenticated read
-- (the user app needs pincodes for serviceability). No write policy ->
-- managed via service-role / Admin panel only.
drop policy if exists "Anyone can read pickup locations" on public.pickup_locations;
create policy "Anyone can read pickup locations"
  on public.pickup_locations for select
  using (true);

-- No INSERT/UPDATE/DELETE policies on shipments / shipment_events /
-- pickup_locations: all writes go through the service-role client,
-- exactly like the existing orders payment-state transitions.

-- ------------------------------------------------------------
-- 6. updated_at trigger (reuses the convention from schema.sql)
-- ------------------------------------------------------------
drop trigger if exists set_updated_at on public.shipments;
create trigger set_updated_at before update on public.shipments
  for each row execute function public.update_updated_at();
