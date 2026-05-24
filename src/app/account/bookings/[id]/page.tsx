import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { formatInr } from "@/lib/format";
import { parseYatraNotes } from "@/lib/yatra";

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  cod: "Pay Later (Cash)",
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

type BookingDetail = {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string | null;
  total_amount: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  notes: string | null;
  created_at: string;
};

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTravel(date: string | null) {
  if (!date) return "—";
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function statusInfo(o: { status: string; payment_status: string }) {
  if (o.status === "cancelled" || o.payment_status === "refunded")
    return { label: "Cancelled", cls: "bg-red-50 text-red-700 border-red-200" };
  if (o.payment_status === "paid" || o.status === "confirmed")
    return { label: "Confirmed", cls: "bg-green-50 text-green-700 border-green-200" };
  return { label: "Pending", cls: "bg-amber-50 text-amber-700 border-amber-200" };
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/account/bookings/${id}`);

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, payment_status, payment_method, total_amount, customer_name, customer_phone, customer_email, notes, created_at"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) notFound();
  const booking = data as BookingDetail;

  // A product order should be viewed in the Orders section, not here.
  if (!booking.order_number.startsWith("YTR-")) {
    redirect(`/account/orders/${id}`);
  }

  const info = parseYatraNotes(booking.notes);
  const isGroup = (info.bookingType ?? "").toLowerCase().includes("seat");
  const count = info.seats ?? info.travellers ?? null;
  const status = statusInfo(booking);
  const method =
    PAYMENT_METHOD_LABEL[(booking.payment_method ?? "").toLowerCase()] ??
    (booking.payment_method ?? "—");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/account/bookings"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            Back to My Bookings
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {info.packageName ?? "Yatra Booking"}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Booking {booking.order_number} · {formatDateTime(booking.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.cls}`}
          >
            {status.label}
          </span>
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
              PAYMENT_PILL[booking.payment_status] ?? "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {booking.payment_status.charAt(0).toUpperCase() +
              booking.payment_status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Trip details */}
        <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                isGroup ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {info.bookingType ?? (isGroup ? "Seat Booking" : "Full Package")}
            </span>
          </div>

          <h2 className="mt-3 text-lg font-bold text-gray-900">Trip details</h2>
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Fact label="Route" value={
              info.fromLocation && info.toLocation
                ? `${info.fromLocation} → ${info.toLocation}`
                : "—"
            } />
            <Fact label="Travel date" value={formatTravel(info.travelDate)} />
            <Fact
              label={isGroup ? "Seats booked" : "Travellers"}
              value={count != null ? String(count) : isGroup ? "—" : "Whole vehicle"}
            />
            <Fact label="Booking type" value={info.bookingType ?? "—"} />
          </dl>

          {info.note && (
            <div className="mt-4 rounded-lg bg-surface-soft p-3">
              <p className="text-xs font-semibold text-gray-700">
                Special requirements
              </p>
              <p className="mt-0.5 text-sm text-gray-600">{info.note}</p>
            </div>
          )}

          {/* Cancellation & Refund Policy */}
          <div className="mt-4 rounded-lg border border-gray-100 bg-surface-soft p-3 text-xs leading-relaxed text-gray-600">
            <p className="mb-1 font-semibold text-gray-800">
              Cancellation &amp; Refund Policy
            </p>
            <ul className="list-disc space-y-0.5 pl-4">
              <li>Free cancellation up to 24h before pickup time</li>
              <li>50% refund 12–24h before pickup time</li>
              <li>No refund under 12h before pickup or no-show</li>
              <li>Approved refunds: 5–7 business days to original method</li>
            </ul>
            <Link href="/terms#cancellations" className="mt-1.5 inline-block font-semibold text-brand-red hover:underline">
              Read full policy
            </Link>
          </div>
        </section>

        {/* Summary side panel */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
            <h2 className="text-base font-bold text-gray-900">Payment</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Method" value={method} />
              {isGroup && count != null && (
                <Row
                  label="Seat fare"
                  value={`${formatInr(Number(booking.total_amount) / count)} × ${count}`}
                />
              )}
              <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                <dt className="font-bold text-gray-900">Total</dt>
                <dd className="text-lg font-bold text-brand-red">
                  {formatInr(Number(booking.total_amount))}
                </dd>
              </div>
            </dl>
            {booking.payment_method === "cod" &&
              booking.payment_status === "pending" && (
                <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                  Pay on the day of travel. Our team will confirm your booking.
                </p>
              )}
          </section>

          <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
            <h2 className="text-base font-bold text-gray-900">Traveller</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Name" value={booking.customer_name ?? "—"} />
              <Row label="Phone" value={booking.customer_phone ?? "—"} />
              {booking.customer_email && (
                <Row label="Email" value={booking.customer_email} />
              )}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand-gold/15 bg-surface-soft p-3">
      <p className="text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-gray-900">{value}</dd>
    </div>
  );
}
