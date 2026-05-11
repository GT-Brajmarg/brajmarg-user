import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { formatInr } from "@/lib/format";
import HelpStrip from "@/components/account/HelpStrip";
import OrderTabs from "@/components/account/OrderTabs";
import StatusFilter from "@/components/account/StatusFilter";

const PAGE_SIZE = 10;

const TAB_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "successful", label: "Successful" },
  { value: "draft", label: "Draft" },
  { value: "unsuccessful", label: "Unsuccessful" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "amount_high", label: "Amount: High to Low" },
  { value: "amount_low", label: "Amount: Low to High" },
];

const STATUS_PILL: Record<string, string> = {
  successful: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-blue-50 text-blue-700 border-blue-200",
  unsuccessful: "bg-red-50 text-red-700 border-red-200",
};

type OrderRow = {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: {
    id: string;
    item_name: string;
    quantity: number;
    item_type: string;
    item_id: string;
  }[];
};

function classify(o: { status: string; payment_status: string }):
  | "successful"
  | "draft"
  | "unsuccessful" {
  if (
    o.payment_status === "failed" ||
    o.payment_status === "refunded" ||
    o.status === "cancelled"
  )
    return "unsuccessful";
  if (o.payment_status === "paid") return "successful";
  return "draft"; // pending payment, in-progress checkout
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
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

/* Map an item_type to a small placeholder bucket image — temple/item
   art is keyed off the DB but we don't have URLs in order_items, so
   show a coloured circle with the type's first letter. */
const TYPE_ACCENT: Record<string, string> = {
  prasad: "bg-amber-100 text-amber-700",
  seva: "bg-rose-100 text-rose-700",
  frame: "bg-blue-100 text-blue-700",
  cloth: "bg-purple-100 text-purple-700",
};

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sort?: string; page?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account/orders");

  const sp = await searchParams;
  const tab = TAB_OPTIONS.some((t) => t.value === sp.tab) ? sp.tab! : "all";
  const sort = SORT_OPTIONS.some((s) => s.value === sp.sort) ? sp.sort! : "newest";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Build server-side filter that maps tab → DB conditions
  let q = supabase
    .from("orders")
    .select(
      "id, order_number, total_amount, status, payment_status, created_at, order_items(id, item_name, quantity, item_type, item_id)",
      { count: "exact" }
    )
    .eq("user_id", user.id);

  if (tab === "successful") {
    q = q.eq("payment_status", "paid").neq("status", "cancelled");
  } else if (tab === "draft") {
    q = q.eq("payment_status", "pending").neq("status", "cancelled");
  } else if (tab === "unsuccessful") {
    q = q.or(
      "payment_status.eq.failed,payment_status.eq.refunded,status.eq.cancelled"
    );
  }

  // Sort
  if (sort === "oldest") q = q.order("created_at", { ascending: true });
  else if (sort === "amount_high") q = q.order("total_amount", { ascending: false });
  else if (sort === "amount_low") q = q.order("total_amount", { ascending: true });
  else q = q.order("created_at", { ascending: false });

  q = q.range(from, to);

  const { data, count } = await q;
  const rows = (data ?? []) as unknown as OrderRow[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("tab", tab);
    if (sort !== "newest") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/account/orders?${qs}` : "/account/orders";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your all orders
        </p>
      </div>

      {/* Tabs row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <OrderTabs
          tabs={TAB_OPTIONS}
          current={tab}
          pathname="/account/orders"
          paramName="tab"
        />
        <StatusFilter
          paramName="sort"
          value={sort}
          pathname="/account/orders"
          options={SORT_OPTIONS}
        />
      </div>

      {/* Table */}
      <section className="rounded-2xl bg-card-bg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50/60 text-left text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Order ID</th>
                <th className="px-6 py-3 font-semibold">Order Date</th>
                <th className="px-6 py-3 font-semibold">Items</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No orders to show.
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const dt = formatDateTime(r.created_at);
                const cls = classify({
                  status: r.status,
                  payment_status: r.payment_status,
                });
                const items = r.order_items ?? [];
                const first = items[0];
                const totalQty = items.reduce(
                  (sum, it) => sum + (it.quantity || 0),
                  0
                );
                const accent =
                  first ? TYPE_ACCENT[first.item_type] ?? "bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-500";
                const initial = first?.item_name?.[0]?.toUpperCase() ?? "•";

                return (
                  <tr key={r.id} className="text-gray-800 align-top">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {r.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{dt.date}</div>
                      <div className="text-xs text-gray-500">{dt.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold shrink-0 ${accent}`}
                        >
                          {initial}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {first?.item_name ?? "—"}
                            {items.length > 1 && (
                              <span className="ml-1 text-xs font-normal text-gray-500">
                                +{items.length - 1} more
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Qty: {totalQty || 0}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {formatInr(Number(r.total_amount ?? 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_PILL[cls]}`}
                      >
                        {cls === "successful"
                          ? "Successful"
                          : cls === "draft"
                          ? "Draft"
                          : "Unsuccessful"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/account/orders/${r.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red transition-colors"
                        aria-label={
                          cls === "draft" ? "Continue order" : "View order"
                        }
                      >
                        {cls === "draft" ? (
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
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
            of <span className="font-semibold text-gray-700">{total}</span> orders
          </p>
          <Pagination current={page} totalPages={totalPages} hrefFor={pageHref} />
        </div>
      </section>

      <HelpStrip
        title="Need help with your order?"
        description="If you have any questions related to your orders, returns or delivery, we're here to help."
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
          current === 1
            ? "opacity-40 pointer-events-none"
            : "hover:border-brand-red hover:text-brand-red"
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
          current === totalPages
            ? "opacity-40 pointer-events-none"
            : "hover:border-brand-red hover:text-brand-red"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
