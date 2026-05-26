-- Allow "yatra" as a valid order_items.item_type so yatra bookings can
-- be stored as a normal order line (reusing orders/order_items rather
-- than a separate bookings table). Run this once against the project DB.
--
-- Safe to re-run: drops the old constraint if present, recreates it.

alter table public.order_items
  drop constraint if exists order_items_item_type_check;

alter table public.order_items
  add constraint order_items_item_type_check
  check (item_type in ('prasad', 'seva', 'frame', 'cloth', 'yatra'));
