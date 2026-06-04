"use server";

import crypto from "crypto";
import { getRazorpay } from "@/lib/razorpay";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
import { slugify } from "@/lib/slug";
import { isGroupPackage, seatsLeftForOne } from "@/lib/yatra";
import { toIndianE164 } from "@/lib/identifier";
import type { YatraPackage } from "@/types/database";

function genOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `YTR-${ts}-${rand}`;
}

function requireAdmin() {
  const admin = createServiceClient();
  if (!admin) {
    throw new Error(
      "Payment store is not configured (missing SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
  return admin;
}

type BookingInput = {
  packageId: string;
  full_name: string;
  customer_phone: string;
  customer_email: string;
  travel_date: string;
  travellers: number;
  notes: string;
};

/** Parse + validate the shared booking form (used by both COD and online). */
function parseBookingForm(formData: FormData): BookingInput {
  const packageId = ((formData.get("package_id") as string) ?? "").trim();
  const full_name = ((formData.get("full_name") as string) ?? "").trim();
  const customer_phone = ((formData.get("customer_phone") as string) ?? "").trim();
  const customer_email = ((formData.get("customer_email") as string) ?? "").trim();
  const travel_date = ((formData.get("travel_date") as string) ?? "").trim();
  const travellers = Math.max(
    1,
    parseInt((formData.get("travellers") as string) ?? "1", 10) || 1
  );
  const notes = ((formData.get("notes") as string) ?? "").trim();

  if (!packageId) throw new Error("Missing package.");
  if (!full_name || !customer_phone || !travel_date) {
    throw new Error("Please fill name, phone and travel date.");
  }
  // Normalise + validate the phone server-side (client can be bypassed).
  const phoneE164 = toIndianE164(customer_phone);
  if (!phoneE164) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }
  return {
    packageId,
    full_name,
    customer_phone: phoneE164,
    customer_email,
    travel_date,
    travellers,
    notes,
  };
}

/**
 * Authoritatively loads a bookable package and validates inventory.
 *  - Price always comes from the DB, never the form.
 *  - For group/seat packages, re-checks seats-left against live bookings
 *    (the overbooking guard) and that the requested method is allowed.
 * Returns the package row + the resolved seat count + per-unit price.
 */
async function loadBookablePackage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  input: BookingInput,
  method: "razorpay" | "cod"
): Promise<{ pkg: YatraPackage; seats: number; unitPrice: number; total: number }> {
  const { data: pkgRow, error: pkgErr } = await supabase
    .from("yatra_packages")
    .select("*")
    .eq("id", input.packageId)
    .eq("is_active", true)
    .maybeSingle();

  if (pkgErr || !pkgRow) throw new Error("This yatra is no longer available.");
  const pkg = pkgRow as YatraPackage;

  if (method === "razorpay" && !pkg.allow_direct_payment) {
    throw new Error("Online payment is not available for this yatra.");
  }
  if (method === "cod" && !pkg.allow_cod) {
    throw new Error("Pay-later booking is not available for this yatra.");
  }

  const unitPrice = Number(pkg.price) || 0;
  if (unitPrice <= 0) throw new Error("This yatra has an invalid price.");

  // Group packages are priced per seat; solo packages book the whole
  // vehicle for the listed price regardless of traveller count.
  const isGroup = isGroupPackage(pkg);
  const seats = isGroup ? input.travellers : 1;

  if (isGroup) {
    const admin = requireAdmin();
    const info = await seatsLeftForOne(admin, pkg);
    if (info.left != null && info.left < seats) {
      throw new Error(
        info.left <= 0
          ? "This yatra is sold out."
          : `Only ${info.left} seat${info.left === 1 ? "" : "s"} left for this yatra.`
      );
    }
  }

  const total = unitPrice * seats;
  return { pkg, seats, unitPrice, total };
}

/** Builds the human-readable trip note stored on the order. */
function buildTripNote(pkg: YatraPackage, input: BookingInput, seats: number): string {
  return [
    `Yatra: ${pkg.name} (${pkg.from_location} → ${pkg.to_location})`,
    `Type: ${isGroupPackage(pkg) ? "Seat Booking" : "Full Package"}`,
    `Travel date: ${input.travel_date}`,
    isGroupPackage(pkg) ? `Seats: ${seats}` : `Travellers: ${input.travellers}`,
    input.notes ? `Note: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
}

/**
 * Creates a Razorpay order for a yatra booking.
 *
 * A booking is modelled as a regular `orders` row with a single
 * `order_items` line of type "yatra" — this reuses the existing
 * payment verification, webhook reconciliation, and the Account →
 * Transactions history with zero new tables. The price is taken
 * server-side from the package row (never trusted from the client),
 * and trip details (travel date, travellers, route) are recorded in
 * the order `notes` for the admin to action.
 */
export async function createYatraRazorpayOrder(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const input = parseBookingForm(formData);

  if (!user) {
    // Bounce to login, returning to this package afterwards.
    redirect("/login?next=/yatra");
  }

  // Authoritative load — price from DB, seats re-checked, method allowed.
  const { pkg, seats, unitPrice, total } = await loadBookablePackage(
    supabase,
    input,
    "razorpay"
  );

  // Persist the customer details for next-time prefill (same as checkout).
  await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name: input.full_name,
      phone: input.customer_phone || null,
      email: input.customer_email || user.email || null,
    },
    { onConflict: "id" }
  );

  const order_number = genOrderNumber();
  const tripNote = buildTripNote(pkg, input, seats);

  const { data: orderRow, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      order_number,
      status: "pending",
      total_amount: total,
      customer_name: input.full_name,
      customer_phone: input.customer_phone,
      customer_email: input.customer_email || user.email || null,
      payment_method: "razorpay",
      payment_status: "pending",
      notes: tripNote,
    })
    .select("id")
    .single();

  if (orderErr || !orderRow) {
    console.error("YATRA ORDER ERROR:", orderErr);
    throw new Error(orderErr?.message || "Could not create booking.");
  }

  await supabase.from("order_items").insert({
    order_id: orderRow.id,
    item_type: "yatra",
    item_id: pkg.id,
    item_name: pkg.name,
    item_price: unitPrice,
    quantity: seats,
    selected_size: null,
    selected_color: null,
    temple_name: "Brajmarg Yatra",
  });

  const rzOrder = await getRazorpay().orders.create({
    amount: Math.round(total * 100),
    currency: "INR",
    receipt: order_number,
    notes: { db_order_id: orderRow.id, type: "yatra" },
  });

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
    name: "Brajmarg Yatra",
    description: pkg.name,
    redirectSlug: slugify(pkg.name),
    prefill: {
      name: input.full_name,
      email: input.customer_email,
      contact: input.customer_phone,
    },
  };
}

/**
 * Cash-on-Delivery (pay-later) yatra booking. No Razorpay screen: the
 * booking is recorded directly as a pending order (payment_method "cod",
 * payment_status "pending", status "pending") for an admin to confirm —
 * mirroring the store's COD checkout. Price and seat inventory are taken
 * authoritatively from the DB, so the client cannot tamper with either.
 *
 * Returns the new order number + booker name so the caller can show a
 * confirmation card with the logged-in user's details (no payment UI).
 */
export async function createYatraCodBooking(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const input = parseBookingForm(formData);

  if (!user) {
    redirect("/login?next=/yatra");
  }

  const { pkg, seats, unitPrice, total } = await loadBookablePackage(
    supabase,
    input,
    "cod"
  );

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name: input.full_name,
      phone: input.customer_phone || null,
      email: input.customer_email || user.email || null,
    },
    { onConflict: "id" }
  );

  const order_number = genOrderNumber();
  const tripNote = buildTripNote(pkg, input, seats);

  const { data: orderRow, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      order_number,
      status: "pending",
      total_amount: total,
      customer_name: input.full_name,
      customer_phone: input.customer_phone,
      customer_email: input.customer_email || user.email || null,
      payment_method: "cod",
      payment_status: "pending",
      notes: tripNote,
    })
    .select("id")
    .single();

  if (orderErr || !orderRow) {
    console.error("YATRA COD ORDER ERROR:", orderErr);
    throw new Error(orderErr?.message || "Could not create booking.");
  }

  const { error: itemErr } = await supabase.from("order_items").insert({
    order_id: orderRow.id,
    item_type: "yatra",
    item_id: pkg.id,
    item_name: pkg.name,
    item_price: unitPrice,
    quantity: seats,
    selected_size: null,
    selected_color: null,
    temple_name: "Brajmarg Yatra",
  });

  if (itemErr) {
    console.error("YATRA COD ITEM ERROR:", itemErr);
    // The order row was already created — roll it back so a failed booking
    // doesn't leave an orphaned pending order (which would also hold a seat).
    // Use the service client: per-user RLS may not permit the delete.
    const cleanup = createServiceClient();
    await (cleanup ?? supabase).from("orders").delete().eq("id", orderRow.id);

    // A 23514 here means the DB's order_items_item_type_check constraint is
    // missing 'yatra' (run supabase/yatra_order_item_type.sql).
    const hint =
      itemErr.code === "23514"
        ? "Yatra bookings aren't enabled on the server yet. Please contact support."
        : "Could not record your booking. Please try again.";
    throw new Error(hint);
  }

  // COD bookings are `payment_status = "pending"`, which the Transactions
  // page intentionally hides (it lists paid/failed/refunded only). They
  // surface in Account → Orders under the "Draft" tab (pending payment),
  // alongside the booker's name — so send the user there for confirmation.
  revalidatePath("/account/orders");
  revalidatePath("/account/transactions");
  revalidatePath("/yatra");

  return {
    success: true as const,
    orderNumber: order_number,
    bookerName: input.full_name,
    seats,
    total,
    redirectUrl: "/account/orders?tab=draft&booked=yatra-cod",
  };
}

/**
 * Live seats-left for a single group package, for the client to refresh
 * the displayed availability before submitting. Returns null when the
 * package has no shared inventory (solo) or the store isn't configured.
 */
export async function getYatraSeatsLeft(
  packageId: string
): Promise<number | null> {
  const admin = createServiceClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from("yatra_packages")
    .select("id, seats_total, package_type")
    .eq("id", packageId)
    .maybeSingle();

  if (error || !data) return null;
  const info = await seatsLeftForOne(admin, data as YatraPackage);
  return info.left;
}

/**
 * Verifies a yatra payment. Mirrors the store's verifyRazorpayPayment
 * but deliberately does NOT clear the user's shopping cart — a yatra
 * booking is independent of cart contents.
 */
export async function verifyYatraPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  dbOrderId: string;
}) {
  const admin = requireAdmin();

  const body = payload.razorpay_order_id + "|" + payload.razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== payload.razorpay_signature) {
    await admin
      .from("orders")
      .update({ payment_status: "failed" })
      .eq("id", payload.dbOrderId)
      .eq("payment_status", "pending");
    throw new Error("Payment verification failed. Your card was not charged.");
  }

  const { error: updateError } = await admin
    .from("orders")
    .update({
      payment_status: "paid",
      status: "confirmed",
      payment_id: payload.razorpay_payment_id,
      razorpay_order_id: payload.razorpay_order_id,
    })
    .eq("id", payload.dbOrderId)
    .eq("payment_status", "pending");

  if (updateError) {
    console.error("YATRA VERIFY UPDATE ERROR:", updateError);
    throw new Error("Could not record your payment. Please contact support.");
  }

  revalidatePath("/account/transactions");
  return { success: true };
}

export async function markYatraPaymentFailed(dbOrderId: string) {
  if (!dbOrderId) return { success: false };
  const admin = requireAdmin();
  const { error } = await admin
    .from("orders")
    .update({ payment_status: "failed" })
    .eq("id", dbOrderId)
    .eq("payment_status", "pending");
  if (error) {
    console.error("YATRA MARK-FAILED ERROR:", error);
    return { success: false };
  }
  return { success: true };
}
