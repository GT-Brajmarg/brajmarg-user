import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { formatInr } from "@/lib/format";
import ShipmentsSection, { type Shipment } from "./ShipmentsSection";

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  cod: "Cash on Delivery",
  razorpay: "Online (Razorpay)",
  upi: "UPI",
  card: "Card",
};

const PAYMENT_PILL: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_PILL: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

type OrderDetail = {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string | null;
  total_amount: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  notes: string | null;
  created_at: string;
  order_items: {
    id: string;
    item_name: string;
    item_type: string;
    item_price: number;
    quantity: number;
    selected_size: string | null;
    selected_color: string | null;
    temple_name: string | null;
  }[];
};

function formatDateTime(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/account/orders/${id}`);

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, payment_status, payment_method, total_amount, customer_name, customer_phone, customer_email, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_pincode, notes, created_at, order_items(id, item_name, item_type, item_price, quantity, selected_size, selected_color, temple_name)"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) notFound();
  const order = data as unknown as OrderDetail;

  // A yatra booking should be viewed in the Bookings section, not here.
  if (order.order_number.startsWith("YTR-")) {
    redirect(`/account/bookings/${id}`);
  }

  // Shipments for this order (one order may have several — e.g. prasad
  // from one temple + a frame from another ship separately). RLS limits
  // this to the user's own shipments.
  const { data: shipmentRows } = await supabase
    .from("shipments")
    .select(
      "id, courier_name, awb_code, tracking_url, delivery_pin, status, payment_type, estimated_delivery, created_at"
    )
    .eq("order_id", id)
    .order("created_at", { ascending: true });
  const shipments = (shipmentRows ?? []) as Shipment[];

  const items = order.order_items ?? [];
  const subtotal = items.reduce(
    (s, it) => s + Number(it.item_price) * it.quantity,
    0
  );
  const method =
    PAYMENT_METHOD_LABEL[(order.payment_method ?? "").toLowerCase()] ??
    (order.payment_method ?? "—");

  const hasAddress =
    order.shipping_address_line1 ||
    order.shipping_city ||
    order.shipping_pincode;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            Back to My Orders
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Order {order.order_number}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Placed on {formatDateTime(order.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
              STATUS_PILL[order.status] ?? "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
              PAYMENT_PILL[order.payment_status] ?? "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {order.payment_status.charAt(0).toUpperCase() +
              order.payment_status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Left column: items + shipment tracking */}
        <div className="space-y-6">
        {/* Items */}
        <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
          <h2 className="text-lg font-bold text-gray-900">Items</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No item details are available for this order.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-gray-100">
              {items.map((it) => (
                <li key={it.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {it.item_name}
                    </p>
                    <p className="text-xs capitalize text-gray-500">
                      {it.item_type}
                      {it.temple_name ? ` · ${it.temple_name}` : ""}
                    </p>
                    {(it.selected_size || it.selected_color) && (
                      <p className="text-xs text-gray-500">
                        {[it.selected_size, it.selected_color]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-gray-500">
                      {formatInr(Number(it.item_price))} × {it.quantity}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatInr(Number(it.item_price) * it.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {order.notes && (
            <div className="mt-4 rounded-lg bg-surface-soft p-3">
              <p className="text-xs font-semibold text-gray-700">Notes</p>
              <p className="mt-0.5 whitespace-pre-line text-sm text-gray-600">
                {order.notes}
              </p>
            </div>
          )}
        </section>

        {/* Shipment tracking — one card per shipment (handles a mixed
            order that ships from multiple temples/pickups). */}
        <ShipmentsSection
          shipments={shipments}
          orderStatus={order.status}
          paymentMethod={order.payment_method}
        />
        </div>

        {/* Summary side panel */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
            <h2 className="text-base font-bold text-gray-900">Payment</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Method" value={method} />
              <Row label="Items total" value={formatInr(subtotal)} />
              <Row label="Delivery" value="FREE" valueClass="text-emerald-600 font-semibold" />
              <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                <dt className="font-bold text-gray-900">Total</dt>
                <dd className="text-lg font-bold text-brand-red">
                  {formatInr(Number(order.total_amount))}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
            <h2 className="text-base font-bold text-gray-900">Contact</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Name" value={order.customer_name ?? "—"} />
              <Row label="Phone" value={order.customer_phone ?? "—"} />
              {order.customer_email && (
                <Row label="Email" value={order.customer_email} />
              )}
            </dl>
          </section>

          {hasAddress && (
            <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
              <h2 className="text-base font-bold text-gray-900">
                Shipping address
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {[
                  order.shipping_address_line1,
                  order.shipping_address_line2,
                  [order.shipping_city, order.shipping_state]
                    .filter(Boolean)
                    .join(", "),
                  order.shipping_pincode,
                ]
                  .filter(Boolean)
                  .join("\n")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass = "text-gray-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`text-right font-medium ${valueClass}`}>{value}</dd>
    </div>
  );
}
