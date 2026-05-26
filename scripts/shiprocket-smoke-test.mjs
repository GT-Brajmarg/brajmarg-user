/**
 * Shiprocket API smoke test (read-only).
 *
 * Purpose: confirm credentials work and capture the real shapes of the
 * /auth/login and /courier/serviceability responses so the adapter can
 * be built against actual field names instead of guesses.
 *
 * SAFETY: this script makes only READ-ONLY calls (login + serviceability
 * + rate). It does NOT create orders, assign AWBs, or schedule pickups,
 * so it cannot incur charges or create real shipments.
 *
 * Credentials are read from the environment ONLY. Never hardcode them.
 *
 * Usage:
 *   # Option A: API user email + password (recommended)
 *   export SHIPROCKET_API_EMAIL="api-user@yourdomain.com"
 *   export SHIPROCKET_API_PASSWORD="••••••"
 *
 *   # Option B: a token you already generated (skips login)
 *   export SHIPROCKET_TOKEN="eyJhbGci..."
 *
 *   # Route to test (defaults shown):
 *   export PICKUP_PINCODE="281121"      # your temple/warehouse origin
 *   export DELIVERY_PINCODE="313301"    # Nathdwara, Rajsamand
 *   export PARCEL_WEIGHT="0.5"          # kg
 *
 *   node scripts/shiprocket-smoke-test.mjs
 *
 * Then paste the printed JSON back so the adapter can be finalised.
 */

const BASE = "https://apiv2.shiprocket.in/v1/external";

const {
  SHIPROCKET_API_EMAIL,
  SHIPROCKET_API_PASSWORD,
  SHIPROCKET_TOKEN,
  PICKUP_PINCODE = "281121",
  DELIVERY_PINCODE = "313301",
  PARCEL_WEIGHT = "0.5",
} = process.env;

function die(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

async function login() {
  if (SHIPROCKET_TOKEN) {
    console.log("→ Using SHIPROCKET_TOKEN from env (skipping login).");
    return SHIPROCKET_TOKEN;
  }
  if (!SHIPROCKET_API_EMAIL || !SHIPROCKET_API_PASSWORD) {
    die(
      "Set SHIPROCKET_API_EMAIL + SHIPROCKET_API_PASSWORD, or SHIPROCKET_TOKEN. " +
        "None were found in the environment."
    );
  }

  console.log(`→ POST ${BASE}/auth/login`);
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: SHIPROCKET_API_EMAIL,
      password: SHIPROCKET_API_PASSWORD,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.token) {
    die(`Login failed (HTTP ${res.status}): ${JSON.stringify(body)}`);
  }

  // Print the SHAPE, not the secret token value.
  console.log("✓ Login OK. Response keys:", Object.keys(body).join(", "));
  console.log(
    `  (token length: ${String(body.token).length}, first/last 4 chars masked)`
  );
  return body.token;
}

async function serviceability(token) {
  const qs = new URLSearchParams({
    pickup_postcode: PICKUP_PINCODE,
    delivery_postcode: DELIVERY_PINCODE,
    weight: PARCEL_WEIGHT,
    cod: "1", // test COD eligibility specifically
  });

  const url = `${BASE}/courier/serviceability/?${qs}`;
  console.log(`\n→ GET ${url}`);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    die(`Serviceability failed (HTTP ${res.status}): ${JSON.stringify(body)}`);
  }

  const couriers = body?.data?.available_courier_companies ?? [];
  console.log(`✓ Serviceability OK. ${couriers.length} courier(s) available.`);
  console.log("  recommended_courier_company_id:", body?.data?.recommended_courier_company_id);

  // A compact, paste-friendly summary of what matters to the adapter.
  const summary = couriers.slice(0, 8).map((c) => ({
    courier_name: c.courier_name,
    courier_company_id: c.courier_company_id,
    rate: c.rate,
    cod: c.cod,
    estimated_delivery_days: c.estimated_delivery_days,
    etd: c.etd,
  }));

  console.log("\n--- PASTE THIS BACK (courier summary) ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log("\n--- FULL RAW RESPONSE (first courier, for field names) ---");
  console.log(JSON.stringify(couriers[0] ?? body, null, 2));
}

/**
 * OPT-IN: create ONE real test shipment to capture the create / AWB /
 * track response shapes (the `// FIELD-MAP` spots in shiprocket.ts).
 *
 * DOUBLE-GATED so it can never fire by accident:
 *   1. pass the `--create` CLI flag, AND
 *   2. set SHIPROCKET_ALLOW_CREATE=yes in the env.
 *
 * ⚠️ This creates a REAL order on your Shiprocket account and assigns a
 * REAL AWB (a tracking number). It may be billable. Use a throwaway
 * order number and CANCEL it from the dashboard afterwards.
 *
 * Required env for create:
 *   SHIPROCKET_PICKUP_TAG   — a pickup location nickname registered in
 *                             your Shiprocket dashboard (Settings → Pickup)
 * Optional:
 *   TEST_PAYMENT_METHOD     — "Prepaid" (default) or "COD"
 */
async function createTestShipment(token) {
  const pickupTag = process.env.SHIPROCKET_PICKUP_TAG;
  if (!pickupTag) {
    die(
      "Set SHIPROCKET_PICKUP_TAG to a pickup location nickname registered " +
        "in your Shiprocket dashboard (Settings → Pickup Addresses)."
    );
  }
  const paymentMethod = process.env.TEST_PAYMENT_METHOD || "Prepaid";
  const orderNumber = `BRJ-TEST-${Date.now().toString(36).toUpperCase()}`;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  console.log(`\n→ POST /orders/create/adhoc  (order_id=${orderNumber}, ${paymentMethod})`);
  const createRes = await fetch(`${BASE}/orders/create/adhoc`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      order_id: orderNumber,
      order_date: today,
      pickup_location: pickupTag,
      billing_customer_name: "Test Devotee",
      billing_last_name: "",
      billing_address: "Shrinathji Temple Road",
      billing_address_2: "",
      billing_city: "Nathdwara",
      billing_pincode: DELIVERY_PINCODE,
      billing_state: "Rajasthan",
      billing_country: "India",
      billing_email: "test@example.com",
      billing_phone: "9999999999",
      shipping_is_billing: true,
      order_items: [
        { name: "Test Prasad", sku: "TEST-SKU-1", units: 1, selling_price: 100 },
      ],
      payment_method: paymentMethod,
      sub_total: 100,
      length: 10,
      breadth: 10,
      height: 5,
      weight: Number(PARCEL_WEIGHT),
    }),
  });
  const created = await createRes.json().catch(() => ({}));
  console.log(`  HTTP ${createRes.status}`);
  console.log("--- CREATE RESPONSE (paste back) ---");
  console.log(JSON.stringify(created, null, 2));
  if (!createRes.ok || !created.shipment_id) {
    die("Create failed or returned no shipment_id — see response above.");
  }

  console.log(`\n→ POST /courier/assign/awb  (shipment_id=${created.shipment_id})`);
  const awbRes = await fetch(`${BASE}/courier/assign/awb`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ shipment_id: created.shipment_id }),
  });
  const awb = await awbRes.json().catch(() => ({}));
  console.log(`  HTTP ${awbRes.status}`);
  console.log("--- AWB RESPONSE (paste back) ---");
  console.log(JSON.stringify(awb, null, 2));

  const awbCode =
    awb?.response?.data?.awb_code ?? awb?.data?.awb_code ?? awb?.awb_code ?? null;
  if (awbCode) {
    console.log(`\n→ GET /courier/track/awb/${awbCode}`);
    const trackRes = await fetch(`${BASE}/courier/track/awb/${awbCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const track = await trackRes.json().catch(() => ({}));
    console.log(`  HTTP ${trackRes.status}`);
    console.log("--- TRACK RESPONSE (paste back) ---");
    console.log(JSON.stringify(track, null, 2));
  }

  console.log(
    `\n⚠️  A real order (${orderNumber}) and AWB were created (NO pickup was ` +
      "scheduled by this script). CANCEL the order from your Shiprocket " +
      "dashboard (Orders → select → Cancel) so it never enters fulfilment."
  );
}

(async () => {
  const wantsCreate = process.argv.includes("--create");
  console.log("Shiprocket smoke test" + (wantsCreate ? " (with --create)" : " (read-only)"));
  console.log(`Route: ${PICKUP_PINCODE} → ${DELIVERY_PINCODE}, ${PARCEL_WEIGHT}kg, COD=1\n`);

  const token = await login();
  await serviceability(token);

  if (wantsCreate) {
    if (process.env.SHIPROCKET_ALLOW_CREATE !== "yes") {
      die(
        "Refusing to create a real order. To proceed, set SHIPROCKET_ALLOW_CREATE=yes " +
          "in the env AND pass --create. This creates a REAL, possibly billable shipment."
      );
    }
    await createTestShipment(token);
  } else {
    console.log("\n✓ Done. No orders were created. (Pass --create to capture create/AWB shapes.)");
  }
})().catch((e) => die(e?.message ?? String(e)));
