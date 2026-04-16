"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { CartItem, ItemType } from "@/types/database";

function genOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BRJ-${ts}-${rand}`;
}

type ItemMeta = {
  id: string;
  name: string;
  price: number | string;
  temples: { name: string } | null;
};

/**
 * Server action: place an order from the user's current cart.
 *
 * Steps:
 *   1. Require auth.
 *   2. Save the customer details to profiles (Amazon-style: collect once,
 *      prefill next time).
 *   3. Read the cart from cart_items.
 *   4. Look up name/price/temple snapshots for each item.
 *   5. Insert orders + order_items.
 *   6. Clear cart.
 *   7. Redirect to the cart page.
 */
export async function placeOrder(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/checkout");
  }

  // ----- Read & validate form fields -----
  const full_name = ((formData.get("full_name") as string) ?? "").trim();
  const customer_phone = ((formData.get("customer_phone") as string) ?? "").trim();
  const customer_email = ((formData.get("customer_email") as string) ?? "").trim();
  const address_line1 = ((formData.get("address_line1") as string) ?? "").trim();
  const address_line2 = ((formData.get("address_line2") as string) ?? "").trim();
  const city = ((formData.get("city") as string) ?? "").trim();
  const state = ((formData.get("state") as string) ?? "").trim();
  const pincode = ((formData.get("pincode") as string) ?? "").trim();
  const notes = ((formData.get("notes") as string) ?? "").trim();

  const errors: string[] = [];
  if (!full_name) errors.push("name");
  if (!customer_phone) errors.push("phone");
  if (!address_line1) errors.push("address");
  if (!city) errors.push("city");
  if (!state) errors.push("state");
  if (!/^\d{6}$/.test(pincode)) errors.push("pincode");

  if (errors.length > 0) {
    redirect(
      "/checkout?error=" +
        encodeURIComponent("Please fill the required fields: " + errors.join(", "))
    );
  }

  // ----- 1. Save profile (so it pre-fills next time) -----
  await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name,
      phone: customer_phone || null,
      email: customer_email || user.email || null,
      address_line1,
      address_line2: address_line2 || null,
      city,
      state,
      pincode,
    },
    { onConflict: "id", ignoreDuplicates: false }
  );

  // ----- 2. Read the cart -----
  const { data: cartRows, error: cartErr } = await supabase
    .from("cart_items")
    .select("*");

  if (cartErr || !cartRows || cartRows.length === 0) {
    redirect("/cart?error=" + encodeURIComponent("Your cart is empty."));
  }

  const cart = (cartRows ?? []) as CartItem[];

  // ----- 3. Bulk-fetch metadata for the cart items -----
  const byType: Record<ItemType, string[]> = {
    prasad: [],
    seva: [],
    frame: [],
    cloth: [],
  };
  for (const r of cart) byType[r.item_type].push(r.item_id);

  const [prasadRes, sevaRes, frameRes, clothRes] = await Promise.all([
    byType.prasad.length
      ? supabase
          .from("prasad_items")
          .select("id, name, price, temples(name)")
          .in("id", byType.prasad)
      : Promise.resolve({ data: [] as ItemMeta[] }),
    byType.seva.length
      ? supabase
          .from("seva_items")
          .select("id, name, price, temples(name)")
          .in("id", byType.seva)
      : Promise.resolve({ data: [] as ItemMeta[] }),
    byType.frame.length
      ? supabase
          .from("frame_items")
          .select("id, name, price, temples(name)")
          .in("id", byType.frame)
      : Promise.resolve({ data: [] as ItemMeta[] }),
    byType.cloth.length
      ? supabase
          .from("cloth_items")
          .select("id, name, price, temples(name)")
          .in("id", byType.cloth)
      : Promise.resolve({ data: [] as ItemMeta[] }),
  ]);

  const map = new Map<string, ItemMeta>();
  for (const r of (prasadRes.data ?? []) as ItemMeta[]) map.set(`prasad:${r.id}`, r);
  for (const r of (sevaRes.data ?? []) as ItemMeta[]) map.set(`seva:${r.id}`, r);
  for (const r of (frameRes.data ?? []) as ItemMeta[]) map.set(`frame:${r.id}`, r);
  for (const r of (clothRes.data ?? []) as ItemMeta[]) map.set(`cloth:${r.id}`, r);

  // ----- 4. Compute total -----
  let total = 0;
  for (const row of cart) {
    const meta = map.get(`${row.item_type}:${row.item_id}`);
    if (!meta) continue;
    const price = Number(meta.price) || 0;
    total += price * row.quantity;
  }

  if (total <= 0) {
    redirect("/cart?error=" + encodeURIComponent("Your cart is empty."));
  }

  // ----- 5. Insert order -----
  const order_number = genOrderNumber();
  const { data: orderRow, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      order_number,
      status: "pending",
      total_amount: total,
      customer_name: full_name,
      customer_phone,
      customer_email: customer_email || user.email || null,
      shipping_address_line1: address_line1,
      shipping_address_line2: address_line2 || null,
      shipping_city: city,
      shipping_state: state,
      shipping_pincode: pincode,
      payment_method: "cod",
      payment_status: "pending",
      notes: notes || null,
    })
    .select("id")
    .single();

  if (orderErr || !orderRow) {
    redirect(
      "/checkout?error=" +
        encodeURIComponent("Could not create order: " + (orderErr?.message ?? ""))
    );
  }

  // ----- 6. Insert order_items snapshots -----
  const orderItemRows = cart
    .map((row) => {
      const meta = map.get(`${row.item_type}:${row.item_id}`);
      if (!meta) return null;
      return {
        order_id: orderRow.id,
        item_type: row.item_type,
        item_id: row.item_id,
        item_name: meta.name,
        item_price: Number(meta.price) || 0,
        quantity: row.quantity,
        selected_size: row.selected_size,
        selected_color: row.selected_color,
        temple_name: meta.temples?.name ?? "Brajmarg",
      };
    })
    .filter(Boolean);

  if (orderItemRows.length > 0) {
    await supabase.from("order_items").insert(orderItemRows);
  }

  // ----- 7. Clear the cart -----
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  revalidatePath("/cart");
  redirect("/cart?placed=" + encodeURIComponent(order_number));
}
