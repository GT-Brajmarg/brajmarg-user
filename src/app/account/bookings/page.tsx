import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { formatInr } from "@/lib/format";
import { parseYatraNotes } from "@/lib/yatra";
import HelpStrip from "@/components/account/HelpStrip";
import OrderTabs from "@/components/account/OrderTabs";
import StatusFilter from "@/components/account/StatusFilter";
import CancelOrderButton from "@/components/account/CancelOrderButton";

const PAGE_SIZE = 10;

const TAB_OPTIONS = [
  { value: "all", label: "All Bookings" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "amount_high", label: "Amount: High to Low" },
  { value: "amount_low", label: "Amount: Low to High" },
];

const STATUS_PILL: Record<string, string> = {
  confirmed: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

type BookingRow = {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
};

/** A yatra booking's display state, derived from order + payment status. */
function classify(o: { status: string; payment_status: string }):
  | "confirmed"
  | "pending"
  | "cancelled" {
  if (o.status === "cancelled" || o.payment_status === "refunded")
    return "cancelled";
  if (o.payment_status === "paid" || o.status === "confirmed") return "confirmed";
  return "pending";
}

function formatDateTime(value: string | null) {
  if (!value) return { date: "—", time: "" };
  const d = new Date(value);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

function formatTravel(date: string | null) {
  if (!date) return "—";
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sort?: string; page?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account/bookings");

  const sp = await searchParams;
  const tab = TAB_OPTIONS.some((t) => t.value === sp.tab) ? sp.tab! : "all";
  const sort = SORT_OPTIONS.some((s) => s.value === sp.sort) ? sp.sort! : "newest";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Yatra bookings only — identified by the "YTR-" order-number prefix.
  let q = supabase
    .from("orders")
    .select(
      "id, order_number, total_amount, status, payment_status, payment_method, notes, created_at",
      { count: "exact" }
    )
    .eq("user_id", user.id)
    .like("order_number", "YTR-%");

  if (tab === "confirmed") {
    q = q.or("payment_status.eq.paid,status.eq.confirmed").neq("status", "cancelled");
  } else if (tab === "pending") {
    q = q
      .eq("payment_status", "pending")
      .neq("status", "cancelled")
      .neq("status", "confirmed");
  } else if (tab === "cancelled") {
    q = q.or("status.eq.cancelled,payment_status.eq.refunded");
  }

  if (sort === "oldest") q = q.order("created_at", { ascending: true });
  else if (sort === "amount_high") q = q.order("total_amount", { ascending: false });
  else if (sort === "amount_low") q = q.order("total_amount", { ascending: true });
  else q = q.order("created_at", { ascending: false });

  q = q.range(from, to);

  const { data, count } = await q;
  const rows = (data ?? []) as BookingRow[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("tab", tab);
    if (sort !== "newest") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/account/bookings?${qs}` : "/account/bookings";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Bookings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your yatra bookings
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <OrderTabs
          tabs={TAB_OPTIONS}
          current={tab}
          pathname="/account/bookings"
          paramName="tab"
        />
        <StatusFilter
          paramName="sort"
          value={sort}
          pathname="/account/bookings"
          options={SORT_OPTIONS}
        />
      </div>

      <section className="rounded-2xl bg-card-bg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50/60 text-left text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Booking ID</th>
                <th className="px-6 py-3 font-semibold">Yatra</th>
                <th className="px-6 py-3 font-semibold">Travel Date</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No yatra bookings yet.{" "}
                    <Link href="/yatra" className="font-semibold text-brand-red hover:underline">
                      Explore yatras
                    </Link>
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const dt = formatDateTime(r.created_at);
                const cls = classify(r);
                const info = parseYatraNotes(r.notes);
                const isGroup = (info.bookingType ?? "").toLowerCase().includes("seat");

                return (
                  <tr key={r.id} className="text-gray-800 align-top">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {r.order_number}
                      <div className="text-xs text-gray-500">
                        {dt.date} · {dt.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${
                            isGroup ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            {isGroup ? (
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01" />
                            )}
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {info.packageName ?? "Yatra Booking"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {info.fromLocation && info.toLocation
                              ? `${info.fromLocation} → ${info.toLocation}`
                              : info.bookingType ?? "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {formatTravel(info.travelDate)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {info.seats != null
                          ? `${info.seats} seat${info.seats === 1 ? "" : "s"}`
                          : info.travellers != null
                            ? `${info.travellers} traveller${info.travellers === 1 ? "" : "s"}`
                            : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {formatInr(Number(r.total_amount ?? 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_PILL[cls]}`}
                      >
                        {cls === "confirmed"
                          ? "Confirmed"
                          : cls === "pending"
                            ? "Pending"
                            : "Cancelled"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {cls !== "cancelled" && <CancelOrderButton orderId={r.id} />}
                        <Link
                          href={`/account/bookings/${r.id}`}
                          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition-colors hover:border-brand-red hover:text-brand-red"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {rows.length === 0 ? 0 : from + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(from + PAGE_SIZE, total)}
            </span>{" "}
            of <span className="font-semibold text-gray-700">{total}</span> bookings
          </p>
          <Pagination current={page} totalPages={totalPages} hrefFor={pageHref} />
        </div>
      </section>

      <HelpStrip
        title="Need help with your booking?"
        description="If you have any questions about your yatra bookings, schedule or cancellation, we're here to help."
      />
    </div>
  );
}

function Pagination({
  current,
  totalPages,
  hrefFor,
}: {
  current: number;
  totalPages: number;
  hrefFor: (p: number) => string;
}) {
  const prev = Math.max(1, current - 1);
  const next = Math.min(totalPages, current + 1);
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={hrefFor(prev)}
        aria-label="Previous page"
        aria-disabled={current === 1}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 ${
          current === 1 ? "opacity-40 pointer-events-none" : "hover:border-brand-red hover:text-brand-red"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-brand-red px-2 text-xs font-semibold text-white">
        {current}
      </span>
      <Link
        href={hrefFor(next)}
        aria-label="Next page"
        aria-disabled={current === totalPages}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 ${
          current === totalPages ? "opacity-40 pointer-events-none" : "hover:border-brand-red hover:text-brand-red"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
