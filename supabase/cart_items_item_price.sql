-- Per-row price override on cart_items.
--
-- Used by the Seva contribution flow: the catalog price is the suggested
-- contribution, but the user can pick a different amount on the seva detail
-- page. NULL = use the seva's catalog price (default for every other item
-- type — prasad / frame / cloth — which don't override).
--
-- Mirrors order_items.item_price (which already exists), so the checkout can
-- thread the override through to the persisted order.
--
-- Idempotent: safe to run multiple times.

ALTER TABLE public.cart_items
  ADD COLUMN IF NOT EXISTS item_price numeric;
