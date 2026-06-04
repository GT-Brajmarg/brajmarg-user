import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { formatInr } from "@/lib/format";
import HelpStrip from "@/components/account/HelpStrip";
import StatusFilter from "@/components/account/StatusFilter";

const PAGE_SIZE = 10;
const VALID_STATUS = ["paid", "failed", "refunded"] as const;
type StatusFilter = "all" | (typeof VALID_STATUS)[number];

function isStatus(v: string): v is (typeof VALID_STATUS)[number] {
  return (VALID_STATUS as readonly string[]).includes(v);
}

const STATUS_PILL: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-blue-50 text-blue-700 border-blue-200",
};

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  upi: "UPI",
  card: "Card",
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  netbanking: "Net Banking",
  cod: "Cash on Delivery",
  razorpay: "Razorpay",
};

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

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account/transactions");

  const sp = await searchParams;
  const status: StatusFilter =
    sp.status && isStatus(sp.status) ? sp.status : "all";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count } = await supabase
    .from("orders")
    .select(
      "id, order_number, total_amount, payment_method, payment_status, created_at",
      { count: "exact" }
    )
    .eq("user_id", user.id)
    .in(
      "payment_status",
      status === "all" ? (VALID_STATUS as readonly string[]) : [status]
    )
    .order("created_at", { ascending: false })
    .range(from, to);
  const rows = data ?? [];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (p > 1) params.set("page", String(p));
    const q = params.toString();
    return q ? `/account/transactions?${q}` : "/account/transactions";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and download your all payment invoices
        </p>
      </div>

      <section className="rounded-2xl bg-card-bg border border-gray-200 overflow-hidden">
        {/* Filter row */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Invoices
          </h2>

          <StatusFilter
            paramName="status"
            value={status}
            pathname="/account/transactions"
            options={[
              { value: "all", label: "All Status" },
              { value: "paid", label: "Paid" },
              { value: "failed", label: "Failed" },
              { value: "refunded", label: "Refunded" },
            ]}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50/60 text-left text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Invoice ID</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Payment Method</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No invoices yet.
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const dt = formatDateTime(r.created_at);
                const ps = (r.payment_status ?? "pending") as string;
                const pillCls =
                  STATUS_PILL[ps] ?? "bg-gray-50 text-gray-700 border-gray-200";
                const methodLabel =
                  PAYMENT_METHOD_LABEL[(r.payment_method ?? "").toLowerCase()] ??
                  (r.payment_method
                    ? r.payment_method.charAt(0).toUpperCase() +
                      r.payment_method.slice(1)
                    : "—");
                return (
                  <tr key={r.id} className="text-gray-800">
                    <td className="px-6 py-4 font-medium">
                      {r.order_number?.replace(/^ORD-/, "INV-") ?? r.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{dt.date}</div>
                      <div className="text-xs text-gray-500">{dt.time}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {formatInr(Number(r.total_amount ?? 0))}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{methodLabel}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${pillCls}`}
                      >
                        {ps.charAt(0).toUpperCase() + ps.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/account/transactions/${r.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red transition-colors"
                        aria-label="Download invoice"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
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
            of <span className="font-semibold text-gray-700">{total}</span> invoices
          </p>
          <Pagination current={page} totalPages={totalPages} hrefFor={pageHref} />
        </div>
      </section>

      <HelpStrip
        title="Need help with an invoice?"
        description="If you have any questions related to payments or invoices, please contact our support team."
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
