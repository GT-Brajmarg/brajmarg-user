// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";
// import type { CartItem, ItemType } from "@/types/database";

// function genOrderNumber(): string {
//   const ts = Date.now().toString(36).toUpperCase();
//   const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
//   return `BRJ-${ts}-${rand}`;
// }

// type ItemMeta = {
//   id: string;
//   name: string;
//   price: number | string;
//   temples: { name: string } | null;
// };

// /**
//  * Server action: place an order from the user's current cart.
//  *
//  * Steps:
//  *   1. Require auth.
//  *   2. Save the customer details to profiles (Amazon-style: collect once,
//  *      prefill next time).
//  *   3. Read the cart from cart_items.
//  *   4. Look up name/price/temple snapshots for each item.
//  *   5. Insert orders + order_items.
//  *   6. Clear cart.
//  *   7. Redirect to the cart page.
//  */
// export async function placeOrder(formData: FormData) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login?next=/checkout");
//   }

//   // ----- Read & validate form fields -----
//   const full_name = ((formData.get("full_name") as string) ?? "").trim();
//   const customer_phone = ((formData.get("customer_phone") as string) ?? "").trim();
//   const customer_email = ((formData.get("customer_email") as string) ?? "").trim();
//   const address_line1 = ((formData.get("address_line1") as string) ?? "").trim();
//   const address_line2 = ((formData.get("address_line2") as string) ?? "").trim();
//   const city = ((formData.get("city") as string) ?? "").trim();
//   const state = ((formData.get("state") as string) ?? "").trim();
//   const pincode = ((formData.get("pincode") as string) ?? "").trim();
//   const notes = ((formData.get("notes") as string) ?? "").trim();

//   const errors: string[] = [];
//   if (!full_name) errors.push("name");
//   if (!customer_phone) errors.push("phone");
//   if (!address_line1) errors.push("address");
//   if (!city) errors.push("city");
//   if (!state) errors.push("state");
//   if (!/^\d{6}$/.test(pincode)) errors.push("pincode");

//   if (errors.length > 0) {
//     redirect(
//       "/checkout?error=" +
//         encodeURIComponent("Please fill the required fields: " + errors.join(", "))
//     );
//   }

//   // ----- 1. Save profile (so it pre-fills next time) -----
//   await supabase.from("profiles").upsert(
//     {
//       id: user.id,
//       full_name,
//       phone: customer_phone || null,
//       email: customer_email || user.email || null,
//       address_line1,
//       address_line2: address_line2 || null,
//       city,
//       state,
//       pincode,
//     },
//     { onConflict: "id", ignoreDuplicates: false }
//   );

//   // ----- 2. Read the cart -----
//   const { data: cartRows, error: cartErr } = await supabase
//     .from("cart_items")
//     .select("*");

//   if (cartErr || !cartRows || cartRows.length === 0) {
//     redirect("/cart?error=" + encodeURIComponent("Your cart is empty."));
//   }

//   const cart = (cartRows ?? []) as CartItem[];

//   // ----- 3. Bulk-fetch metadata for the cart items -----
//   const byType: Record<ItemType, string[]> = {
//     prasad: [],
//     seva: [],
//     frame: [],
//     cloth: [],
//   };
//   for (const r of cart) byType[r.item_type].push(r.item_id);

//   const [prasadRes, sevaRes, frameRes, clothRes] = await Promise.all([
//     byType.prasad.length
//       ? supabase
//           .from("prasad_items")
//           .select("id, name, price, temples(name)")
//           .in("id", byType.prasad)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.seva.length
//       ? supabase
//           .from("seva_items")
//           .select("id, name, price, temples(name)")
//           .in("id", byType.seva)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.frame.length
//       ? supabase
//           .from("frame_items")
//           .select("id, name, price, temples(name)")
//           .in("id", byType.frame)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.cloth.length
//       ? supabase
//           .from("cloth_items")
//           .select("id, name, price, temples(name)")
//           .in("id", byType.cloth)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//   ]);

//   const map = new Map<string, ItemMeta>();
//   for (const r of (prasadRes.data ?? []) as ItemMeta[]) map.set(`prasad:${r.id}`, r);
//   for (const r of (sevaRes.data ?? []) as ItemMeta[]) map.set(`seva:${r.id}`, r);
//   for (const r of (frameRes.data ?? []) as ItemMeta[]) map.set(`frame:${r.id}`, r);
//   for (const r of (clothRes.data ?? []) as ItemMeta[]) map.set(`cloth:${r.id}`, r);

//   // ----- 4. Compute total -----
//   let total = 0;
//   for (const row of cart) {
//     const meta = map.get(`${row.item_type}:${row.item_id}`);
//     if (!meta) continue;
//     const price = Number(meta.price) || 0;
//     total += price * row.quantity;
//   }

//   if (total <= 0) {
//     redirect("/cart?error=" + encodeURIComponent("Your cart is empty."));
//   }

//   // ----- 5. Insert order -----
//   const order_number = genOrderNumber();
//   const { data: orderRow, error: orderErr } = await supabase
//     .from("orders")
//     .insert({
//       user_id: user.id,
//       order_number,
//       status: "pending",
//       total_amount: total,
//       customer_name: full_name,
//       customer_phone,
//       customer_email: customer_email || user.email || null,
//       shipping_address_line1: address_line1,
//       shipping_address_line2: address_line2 || null,
//       shipping_city: city,
//       shipping_state: state,
//       shipping_pincode: pincode,
//       payment_method: "cod",
//       payment_status: "pending",
//       notes: notes || null,
//     })
//     .select("id")
//     .single();

//   if (orderErr || !orderRow) {
//     redirect(
//       "/checkout?error=" +
//         encodeURIComponent("Could not create order: " + (orderErr?.message ?? ""))
//     );
//   }

//   // ----- 6. Insert order_items snapshots -----
//   const orderItemRows = cart
//     .map((row) => {
//       const meta = map.get(`${row.item_type}:${row.item_id}`);
//       if (!meta) return null;
//       return {
//         order_id: orderRow.id,
//         item_type: row.item_type,
//         item_id: row.item_id,
//         item_name: meta.name,
//         item_price: Number(meta.price) || 0,
//         quantity: row.quantity,
//         selected_size: row.selected_size,
//         selected_color: row.selected_color,
//         temple_name: meta.temples?.name ?? "Brajmarg",
//       };
//     })
//     .filter(Boolean);

//   if (orderItemRows.length > 0) {
//     await supabase.from("order_items").insert(orderItemRows);
//   }

//   // ----- 7. Clear the cart -----
//   await supabase.from("cart_items").delete().eq("user_id", user.id);

//   revalidatePath("/cart");
//   redirect("/cart?placed=" + encodeURIComponent(order_number));
// }
"use server";

import crypto from "crypto";
import Razorpay from "razorpay";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
import { aggregatePaymentOptions } from "@/lib/payment";
import {
  createShipmentsForOrder,
  createPrepaidShipmentForOrderId,
} from "@/lib/shipping/fulfillment";
import type { RoutableItem } from "@/lib/shipping/resolve-pickup";
import type { CartItem, ItemType } from "@/types/database";
import { toIndianE164 } from "@/lib/identifier";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

function genOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BRJ-${ts}-${rand}`;
}

/**
 * Checks whether a destination pincode is serviceable, and whether COD
 * is available there, from the default pickup location. Called from the
 * checkout form as the user enters their pincode so the UI can hide the
 * COD option for prepaid-only / unserviceable pincodes.
 *
 * Fails OPEN on configuration/network errors (returns serviceable:true,
 * cod:true) so a transient Shiprocket issue never blocks checkout — the
 * server-side guards in placeOrder still apply at order time.
 */
export async function checkPincodeServiceability(
  pincode: string
): Promise<{ serviceable: boolean; cod: boolean; cheapestRate: number | null }> {
  if (!/^\d{6}$/.test(pincode)) {
    return { serviceable: false, cod: false, cheapestRate: null };
  }

  const admin = createServiceClient();
  if (!admin) return { serviceable: true, cod: true, cheapestRate: null };

  const { data: pickup } = await admin
    .from("pickup_locations")
    .select("pincode")
    .eq("is_default", true)
    .maybeSingle();

  if (!pickup?.pincode) {
    // No pickup configured yet: don't block checkout.
    return { serviceable: true, cod: true, cheapestRate: null };
  }

  try {
    const { shiprocket, pickCheapestServiceable } = await import(
      "@/lib/shipping/shiprocket"
    );
    const couriers = await shiprocket.checkServiceability({
      pickupPincode: pickup.pincode as string,
      deliveryPincode: pincode,
      cod: true,
      weight: 0.5,
    });

    if (couriers.length === 0) {
      return { serviceable: false, cod: false, cheapestRate: null };
    }
    const codCourier = pickCheapestServiceable(couriers, true);
    const anyCourier = pickCheapestServiceable(couriers, false);
    return {
      serviceable: true,
      cod: Boolean(codCourier),
      cheapestRate: (anyCourier ?? couriers[0]).rate ?? null,
    };
  } catch (e) {
    console.error("checkPincodeServiceability error:", e);
    return { serviceable: true, cod: true, cheapestRate: null }; // fail open
  }
}

type ItemMeta = {
  id: string;
  name: string;
  price: number | string;
  temple_id: string | null;
  temples: { name: string } | null;
  allow_direct_payment?: boolean | null;
  allow_cod?: boolean | null;
};

async function getCheckoutData(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/checkout");

  const full_name = ((formData.get("full_name") as string) ?? "").trim();
  const customer_phone = ((formData.get("customer_phone") as string) ?? "").trim();
  const customer_email = ((formData.get("customer_email") as string) ?? "").trim();
  const address_line1 = ((formData.get("address_line1") as string) ?? "").trim();
  const address_line2 = ((formData.get("address_line2") as string) ?? "").trim();
  const city = ((formData.get("city") as string) ?? "").trim();
  const state = ((formData.get("state") as string) ?? "").trim();
  const pincode = ((formData.get("pincode") as string) ?? "").trim();
  const notes = ((formData.get("notes") as string) ?? "").trim();

  // Normalise the phone to E.164 (+91XXXXXXXXXX); reject non-Indian-mobile.
  const phoneE164 = toIndianE164(customer_phone);

  const errors: string[] = [];
  if (!full_name) errors.push("name");
  if (!phoneE164) errors.push("phone");
  if (!address_line1) errors.push("address");
  if (!city) errors.push("city");
  if (!state) errors.push("state");
  if (!/^\d{6}$/.test(pincode)) errors.push("pincode");

  if (errors.length > 0) {
    throw new Error("Invalid checkout form");
  }

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name,
      phone: phoneE164,
      email: customer_email || user.email || null,
      address_line1,
      address_line2: address_line2 || null,
      city,
      state,
      pincode,
    },
    { onConflict: "id" }
  );

  const { data: cartRows, error: cartErr } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id);

  if (cartErr || !cartRows || cartRows.length === 0) {
    throw new Error("Cart empty");
  }

  const cart = cartRows as CartItem[];

  const byType: Record<ItemType, string[]> = {
    prasad: [],
    seva: [],
    frame: [],
    cloth: [],
    yatra: [], // yatra is booked directly, never via the cart
  };

  for (const r of cart) byType[r.item_type].push(r.item_id);

  const cols =
    "id,name,price,temple_id,temples(name),allow_direct_payment,allow_cod";
  const [prasadRes, sevaRes, frameRes, clothRes] = await Promise.all([
    byType.prasad.length
      ? supabase.from("prasad_items").select(cols).in("id", byType.prasad)
      : Promise.resolve({ data: [] }),

    byType.seva.length
      ? supabase.from("seva_items").select(cols).in("id", byType.seva)
      : Promise.resolve({ data: [] }),

    byType.frame.length
      ? supabase.from("frame_items").select(cols).in("id", byType.frame)
      : Promise.resolve({ data: [] }),

    byType.cloth.length
      ? supabase.from("cloth_items").select(cols).in("id", byType.cloth)
      : Promise.resolve({ data: [] }),
  ]);

  const map = new Map<string, ItemMeta>();

  for (const r of prasadRes.data as ItemMeta[]) map.set(`prasad:${r.id}`, r);
  for (const r of sevaRes.data as ItemMeta[]) map.set(`seva:${r.id}`, r);
  for (const r of frameRes.data as ItemMeta[]) map.set(`frame:${r.id}`, r);
  for (const r of clothRes.data as ItemMeta[]) map.set(`cloth:${r.id}`, r);

  let total = 0;

  for (const row of cart) {
    const meta = map.get(`${row.item_type}:${row.item_id}`);
    if (!meta) continue;
    total += Number(meta.price) * row.quantity;
  }

  // Cart-level payment capability (strictest wins across all items).
  const { allowOnline, allowCod } = aggregatePaymentOptions([...map.values()]);

  return {
    supabase,
    user,
    cart,
    map,
    total,
    allowOnline,
    allowCod,
    customer: {
      full_name,
      // Always the normalised E.164 form (validated above).
      customer_phone: phoneE164 as string,
      customer_email,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      notes,
    },
  };
}

/* ================= COD ================= */

export async function placeOrder(formData: FormData) {
  const data = await getCheckoutData(formData);

  // Server-side guard: COD must be permitted by every item in the cart.
  if (!data.allowCod) {
    throw new Error(
      "Cash on Delivery isn't available for one or more items in your cart."
    );
  }

  // Server-side guard: COD must be serviceable at the destination pincode.
  // The client hides COD for unserviceable pincodes, but enforce it here
  // too so a tampered request can't place an undeliverable COD order.
  const cod = await checkPincodeServiceability(data.customer.pincode);
  if (!cod.serviceable) {
    throw new Error("We don't deliver to this pincode yet.");
  }
  if (!cod.cod) {
    throw new Error(
      "Cash on Delivery isn't available for this pincode. Please pay online."
    );
  }

  const order_number = genOrderNumber();

  const { data: orderRow, error } = await data.supabase
    .from("orders")
    .insert({
      user_id: data.user.id,
      order_number,
      // COD has no online payment step, so the order is auto-confirmed
      // at placement — no admin verification gate. payment_status stays
      // 'pending' until the courier collects cash and Shiprocket remits.
      status: "confirmed",
      total_amount: data.total,
      customer_name: data.customer.full_name,
      customer_phone: data.customer.customer_phone,
      customer_email:
        data.customer.customer_email || data.user.email || null,
      shipping_address_line1: data.customer.address_line1,
      shipping_address_line2: data.customer.address_line2 || null,
      shipping_city: data.customer.city,
      shipping_state: data.customer.state,
      shipping_pincode: data.customer.pincode,
      payment_method: "cod",
      payment_status: "pending",
      notes: data.customer.notes || null,
    })
    .select("id")
    .single();

 if (error || !orderRow) {
  console.error("SUPABASE ORDER ERROR:", error);

  throw new Error(
    error?.message || "DB order failed"
  );
}

  const rows = data.cart.map((row) => {
    const meta = data.map.get(`${row.item_type}:${row.item_id}`)!;

    return {
      order_id: orderRow.id,
      item_type: row.item_type,
      item_id: row.item_id,
      item_name: meta.name,
      item_price: Number(meta.price),
      quantity: row.quantity,
      selected_size: row.selected_size,
      selected_color: row.selected_color,
      temple_name: meta.temples?.name ?? "Brajmarg",
      temple_id: meta.temple_id ?? null,
    };
  });

  const { error: itemErr } = await data.supabase
    .from("order_items")
    .insert(rows);

  if (itemErr) {
    console.error("COD ORDER ITEMS ERROR:", itemErr);
    // Roll back the just-created order so a failed insert doesn't leave an
    // orphaned pending order behind. Service client: orders has no DELETE RLS.
    const cleanup = createServiceClient();
    await (cleanup ?? data.supabase).from("orders").delete().eq("id", orderRow.id);
    throw new Error("Could not place your order. Please try again.");
  }

  await data.supabase
    .from("cart_items")
    .delete()
    .eq("user_id", data.user.id);

  // COD orders are auto-confirmed at placement (status set above). Now
  // create the shipment(s). Best-effort: createShipments swallows errors
  // so a courier hiccup can't fail a placed order.
  const admin = createServiceClient();
  if (admin) {
    await createShipmentsForOrder(
      admin,
      {
        id: orderRow.id,
        order_number,
        total_amount: data.total,
        customer_name: data.customer.full_name,
        customer_phone: data.customer.customer_phone,
        customer_email: data.customer.customer_email || data.user.email || null,
        shipping_address_line1: data.customer.address_line1,
        shipping_address_line2: data.customer.address_line2 || null,
        shipping_city: data.customer.city,
        shipping_state: data.customer.state,
        shipping_pincode: data.customer.pincode,
      },
      buildRoutableItems(data.cart, data.map),
      "COD"
    );
  }

  revalidatePath("/cart");

  redirect(`/cart?placed=${order_number}`);
}

/**
 * Converts the cart + metadata map into the RoutableItem[] shape the
 * fulfillment orchestrator needs (carries temple_id for pickup routing).
 */
function buildRoutableItems(
  cart: CartItem[],
  map: Map<string, ItemMeta>
): RoutableItem[] {
  return cart
    .map((row) => {
      const meta = map.get(`${row.item_type}:${row.item_id}`);
      if (!meta) return null;
      return {
        item_id: row.item_id,
        item_name: meta.name,
        item_price: Number(meta.price),
        quantity: row.quantity,
        temple_id: meta.temple_id ?? null,
      };
    })
    .filter((x): x is RoutableItem => x !== null);
}

/* ================= RAZORPAY ================= */

export async function createRazorpayOrder(formData: FormData) {
  const data = await getCheckoutData(formData);

  // Server-side guard: online payment must be permitted by every item.
  if (!data.allowOnline) {
    throw new Error(
      "Online payment isn't available for one or more items in your cart."
    );
  }

  const order_number = genOrderNumber();

  const { data: orderRow, error } = await data.supabase
    .from("orders")
    .insert({
      user_id: data.user.id,
      order_number,
      status: "pending",
      total_amount: data.total,
      customer_name: data.customer.full_name,
      customer_phone: data.customer.customer_phone,
      customer_email:
        data.customer.customer_email || data.user.email || null,
      shipping_address_line1: data.customer.address_line1,
      shipping_address_line2: data.customer.address_line2 || null,
      shipping_city: data.customer.city,
      shipping_state: data.customer.state,
      shipping_pincode: data.customer.pincode,
      payment_method: "razorpay",
      payment_status: "pending",
      notes: data.customer.notes || null,
    })
    .select("id")
    .single();

 if (error || !orderRow) {
  console.error("SUPABASE ORDER ERROR:", error);

  throw new Error(
    error?.message || "DB order failed"
  );
}

  const rows = data.cart.map((row) => {
    const meta = data.map.get(`${row.item_type}:${row.item_id}`)!;

    return {
      order_id: orderRow.id,
      item_type: row.item_type,
      item_id: row.item_id,
      item_name: meta.name,
      item_price: Number(meta.price),
      quantity: row.quantity,
      selected_size: row.selected_size,
      selected_color: row.selected_color,
      temple_name: meta.temples?.name ?? "Brajmarg",
      temple_id: meta.temple_id ?? null,
    };
  });

  const { error: itemErr } = await data.supabase
    .from("order_items")
    .insert(rows);

  if (itemErr) {
    console.error("RAZORPAY ORDER ITEMS ERROR:", itemErr);
    const cleanup = createServiceClient();
    await (cleanup ?? data.supabase).from("orders").delete().eq("id", orderRow.id);
    throw new Error("Could not start payment. Please try again.");
  }

  const rzOrder = await razorpay.orders.create({
    amount: Math.round(data.total * 100),
    currency: "INR",
    receipt: order_number,
    notes: {
      db_order_id: orderRow.id,
    },
  });

  // Persist the Razorpay order id so the webhook can reconcile the
  // payment even if the browser never returns to verifyRazorpayPayment.
  // Uses the service-role client because `orders` has no UPDATE RLS policy.
  const admin = createServiceClient();
  if (admin) {
    await admin
      .from("orders")
      .update({ razorpay_order_id: rzOrder.id })
      .eq("id", orderRow.id);
  }

  return {
    key: process.env.RAZORPAY_KEY_ID!,
    amount: rzOrder.amount,
    currency: rzOrder.currency,
    orderId: rzOrder.id,
    dbOrderId: orderRow.id,
    name: "Brajmarg",
    prefill: {
      name: data.customer.full_name,
      email: data.customer.customer_email,
      contact: data.customer.customer_phone,
    },
  };
}

// `orders` has only SELECT/INSERT RLS policies, so payment state
// transitions must go through the service-role client. Returns null
// only if SUPABASE_SERVICE_ROLE_KEY is unset (treated as a hard error
// by callers, since payment state would otherwise be lost).
function requireAdmin() {
  const admin = createServiceClient();
  if (!admin) {
    throw new Error(
      "Payment store is not configured (missing SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
  return admin;
}

export async function verifyRazorpayPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  dbOrderId: string;
}) {
  const admin = requireAdmin();

  const body =
    payload.razorpay_order_id + "|" + payload.razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  const valid = expected === payload.razorpay_signature;

  if (!valid) {
    // Tampered/invalid response: record the failure so the order
    // doesn't sit silently in `pending` forever.
    await admin
      .from("orders")
      .update({ payment_status: "failed" })
      .eq("id", payload.dbOrderId)
      .eq("payment_status", "pending");
    throw new Error("Payment verification failed. Your card was not charged.");
  }

  // Idempotent: only a still-pending order is promoted to paid, so a
  // duplicate verify/webhook race cannot regress an already-paid order.
  const { data: updated, error: updateError } = await admin
    .from("orders")
    .update({
      payment_status: "paid",
      status: "confirmed",
      payment_id: payload.razorpay_payment_id,
      razorpay_order_id: payload.razorpay_order_id,
    })
    .eq("id", payload.dbOrderId)
    .eq("payment_status", "pending")
    .select("id, user_id")
    .maybeSingle();

  if (updateError) {
    console.error("RAZORPAY VERIFY UPDATE ERROR:", updateError);
    throw new Error("Could not record your payment. Please contact support.");
  }

  // `updated` is null when the webhook already marked it paid — that's
  // fine, the order is in the right state either way. Clear the cart
  // only if we know whose order this is.
  if (updated?.user_id) {
    await admin.from("cart_items").delete().eq("user_id", updated.user_id);

    // Only the call that actually promoted the order (updated != null)
    // creates the shipment — guards against the verify/webhook race
    // double-shipping. Prepaid: Razorpay already collected the money.
    await createPrepaidShipmentForOrderId(admin, payload.dbOrderId);
  }

  revalidatePath("/cart");

  return { success: true };
}

/**
 * Marks a still-pending Razorpay order as failed. Called when the user
 * dismisses the checkout modal or Razorpay reports `payment.failed`.
 * Never downgrades an already-paid order (guarded on payment_status).
 */
export async function markRazorpayPaymentFailed(dbOrderId: string) {
  if (!dbOrderId) return { success: false };

  const admin = requireAdmin();

  const { error } = await admin
    .from("orders")
    .update({ payment_status: "failed" })
    .eq("id", dbOrderId)
    .eq("payment_status", "pending");

  if (error) {
    console.error("RAZORPAY MARK-FAILED ERROR:", error);
    return { success: false };
  }

  revalidatePath("/cart");
  return { success: true };
}