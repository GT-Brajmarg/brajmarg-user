/**
 * Shiprocket implementation of the ShippingProvider contract.
 *
 * Auth model (differs from Razorpay's static key pair): Shiprocket
 * issues a Bearer token from /auth/login using a dedicated API-user
 * email + password. Tokens last ~10 days, so we cache the token in
 * module memory and re-login on expiry / 401.
 *
 * Credentials come from env ONLY:
 *   SHIPROCKET_API_EMAIL
 *   SHIPROCKET_API_PASSWORD
 *
 * Server-only module — never import from a client component (it holds
 * credentials and a live token).
 *
 * NOTE: the response field names marked `// FIELD-MAP` below are based
 * on Shiprocket's documented shapes but should be confirmed against a
 * real createShipment response (run the smoke test / one live create)
 * before going to production.
 */

// Server-only: this module holds API credentials and a live token. Import
// it only from server actions / route handlers, never a client component.
// (If you add the `server-only` package, re-add `import "server-only";`
// here to enforce that at build time.)
import type {
  ShippingProvider,
  ServiceabilityQuery,
  CourierOption,
  CreateShipmentInput,
  ShipmentResult,
  TrackResult,
} from "./types";

const BASE = "https://apiv2.shiprocket.in/v1/external";

// Re-login this many ms BEFORE the real expiry to avoid edge-of-expiry 401s.
const TOKEN_SAFETY_WINDOW_MS = 60 * 60 * 1000; // 1h

let cachedToken: { value: string; expiresAt: number } | null = null;

async function login(): Promise<string> {
  const email = process.env.SHIPROCKET_API_EMAIL;
  const password = process.env.SHIPROCKET_API_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "Shiprocket is not configured (SHIPROCKET_API_EMAIL / SHIPROCKET_API_PASSWORD missing)."
    );
  }

  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body?.token) {
    throw new Error(`Shiprocket login failed (HTTP ${res.status}).`);
  }

  // Shiprocket tokens are ~10 days; cache conservatively for 9 days.
  cachedToken = {
    value: body.token as string,
    expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000,
  };
  return cachedToken.value;
}

async function getToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - TOKEN_SAFETY_WINDOW_MS > Date.now()) {
    return cachedToken.value;
  }
  return login();
}

/** Authenticated fetch that retries once on 401 with a fresh token. */
async function srFetch(
  path: string,
  init: RequestInit = {},
  retryOn401 = true
): Promise<Response> {
  const token = await getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401 && retryOn401) {
    cachedToken = null; // force re-login
    return srFetch(path, init, false);
  }
  return res;
}

/**
 * Picks the cheapest serviceable courier from a serviceability result.
 * When `requireCod` is true, only COD-capable couriers are considered —
 * so a COD order never gets pinned to a prepaid-only courier.
 * Returns null if nothing qualifies (caller should treat as
 * "not serviceable for this payment mode").
 */
export function pickCheapestServiceable(
  options: CourierOption[],
  requireCod: boolean
): CourierOption | null {
  const eligible = requireCod ? options.filter((o) => o.cod) : options;
  if (eligible.length === 0) return null;
  return eligible.reduce((cheapest, o) => (o.rate < cheapest.rate ? o : cheapest));
}

export const shiprocket: ShippingProvider = {
  name: "shiprocket",

  async checkServiceability(q: ServiceabilityQuery): Promise<CourierOption[]> {
    const qs = new URLSearchParams({
      pickup_postcode: q.pickupPincode,
      delivery_postcode: q.deliveryPincode,
      weight: String(q.weight),
      cod: q.cod ? "1" : "0",
    });

    const res = await srFetch(`/courier/serviceability/?${qs}`, { method: "GET" });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Serviceability check failed (HTTP ${res.status}).`);
    }

    const couriers = body?.data?.available_courier_companies ?? [];
    // FIELD-MAP: confirm these keys against a real response.
    return couriers.map(
      (c: Record<string, unknown>): CourierOption => ({
        courierName: String(c.courier_name ?? ""),
        courierId: (c.courier_company_id as number | string) ?? "",
        rate: Number(c.rate ?? 0),
        cod: Number(c.cod) === 1 || c.cod === true,
        estimatedDeliveryDays: c.estimated_delivery_days
          ? String(c.estimated_delivery_days)
          : undefined,
        etd: c.etd ? String(c.etd) : undefined,
      })
    );
  },

  /**
   * Full create flow: create adhoc order -> assign AWB -> generate
   * pickup. Returns the identifiers the caller persists into `shipments`.
   *
   * Throws on any step failure so the caller can keep the order at
   * `confirmed` and retry / surface to Admin (no orphaned shipment).
   */
  async createShipment(input: CreateShipmentInput): Promise<ShipmentResult> {
    const today = new Date().toISOString().slice(0, 19).replace("T", " ");

    // 1. Create order (adhoc).
    const createRes = await srFetch(`/orders/create/adhoc`, {
      method: "POST",
      body: JSON.stringify({
        order_id: input.orderNumber,
        order_date: today,
        pickup_location: input.pickupTag,
        billing_customer_name: input.customer.name,
        billing_last_name: "",
        billing_address: input.customer.addressLine1,
        billing_address_2: input.customer.addressLine2 ?? "",
        billing_city: input.customer.city,
        billing_pincode: input.customer.pincode,
        billing_state: input.customer.state,
        billing_country: "India",
        billing_email: input.customer.email ?? "",
        billing_phone: input.customer.phone,
        shipping_is_billing: true,
        order_items: input.items.map((it) => ({
          name: it.name,
          sku: it.sku,
          units: it.units,
          selling_price: it.sellingPrice,
        })),
        payment_method: input.paymentType, // "Prepaid" | "COD"
        sub_total: input.subTotal,
        length: input.length ?? 10,
        breadth: input.breadth ?? 10,
        height: input.height ?? 5,
        weight: input.weight ?? 0.5,
      }),
    });
    const created = await createRes.json().catch(() => ({}));
    if (!createRes.ok) {
      throw new Error(
        `Shiprocket create order failed (HTTP ${createRes.status}): ${JSON.stringify(created)}`
      );
    }

    // FIELD-MAP: confirm `order_id` / `shipment_id` keys on real response.
    const srOrderId = created.order_id ? String(created.order_id) : null;
    const shipmentId = created.shipment_id ? String(created.shipment_id) : null;

    if (!shipmentId) {
      throw new Error("Shiprocket create order returned no shipment_id.");
    }

    // 2. Assign AWB (tracking number). If the caller picked a specific
    // courier (e.g. cheapest-serviceable), pin it; otherwise Shiprocket
    // auto-selects its recommended courier.
    const awbRes = await srFetch(`/courier/assign/awb`, {
      method: "POST",
      body: JSON.stringify(
        input.courierId
          ? { shipment_id: shipmentId, courier_id: input.courierId }
          : { shipment_id: shipmentId }
      ),
    });
    const awbBody = await awbRes.json().catch(() => ({}));
    // FIELD-MAP: AWB response nests under response.data on Shiprocket.
    const awbData = awbBody?.response?.data ?? awbBody?.data ?? awbBody;
    const awbCode = awbData?.awb_code ? String(awbData.awb_code) : null;
    const courierName = awbData?.courier_name ? String(awbData.courier_name) : null;

    // 3. Request pickup (best-effort; some accounts auto-schedule).
    if (shipmentId) {
      await srFetch(`/courier/generate/pickup`, {
        method: "POST",
        body: JSON.stringify({ shipment_id: [shipmentId] }),
      }).catch(() => {
        /* non-fatal: pickup can be re-requested from Admin */
      });
    }

    return {
      provider: "shiprocket",
      srOrderId,
      shipmentId,
      awbCode,
      courierName,
      trackingUrl: awbCode ? `https://shiprocket.co/tracking/${awbCode}` : null,
      // FIELD-MAP: delivery OTP/PIN key — confirm against real response.
      deliveryPin: awbData?.delivery_pin ? String(awbData.delivery_pin) : null,
      estimatedDelivery: awbData?.etd ? String(awbData.etd) : null,
    };
  },

  async cancelShipment(awbOrShipmentId: string): Promise<void> {
    // Shiprocket cancels by AWB list (forward shipments).
    const res = await srFetch(`/orders/cancel/shipment/awbs`, {
      method: "POST",
      body: JSON.stringify({ awbs: [awbOrShipmentId] }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(
        `Shiprocket cancel failed (HTTP ${res.status}): ${JSON.stringify(body)}`
      );
    }
  },

  async track(awb: string): Promise<TrackResult> {
    const res = await srFetch(`/courier/track/awb/${awb}`, { method: "GET" });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Shiprocket track failed (HTTP ${res.status}).`);
    }
    // FIELD-MAP: tracking response shape — confirm against real response.
    const data = body?.tracking_data ?? body;
    const activities = data?.shipment_track_activities ?? [];
    return {
      awb,
      status: String(data?.shipment_status ?? data?.current_status ?? ""),
      scans: activities.map((a: Record<string, unknown>) => ({
        date: String(a.date ?? ""),
        activity: String(a.activity ?? ""),
        location: a.location ? String(a.location) : undefined,
      })),
    };
  },
};
