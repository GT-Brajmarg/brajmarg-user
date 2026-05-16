-- ============================================================
-- Migration: add Razorpay reference columns to orders
--
-- The Razorpay flow needs to persist the gateway identifiers so
-- payments can be reconciled (client verification + webhook):
--   payment_id        -> razorpay_payment_id (set once paid)
--   razorpay_order_id -> razorpay order id   (set at order creation)
--
-- Idempotent: safe to run multiple times.
-- ============================================================

alter table public.orders
  add column if not exists payment_id text;

alter table public.orders
  add column if not exists razorpay_order_id text;

-- Webhook reconciles incoming events by Razorpay order id.
create index if not exists idx_orders_razorpay_order_id
  on public.orders(razorpay_order_id);
