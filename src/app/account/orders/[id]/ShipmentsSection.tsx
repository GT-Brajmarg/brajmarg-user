export type Shipment = {
  id: string;
  courier_name: string | null;
  awb_code: string | null;
  tracking_url: string | null;
  delivery_pin: string | null;
  status: string; // created|picked_up|in_transit|ofd|delivered|rto|cancelled
  payment_type: string; // 'Prepaid' | 'COD'
  estimated_delivery: string | null; // ISO date
  created_at: string;
};

// The forward-journey steps shown as a progress timeline. RTO/cancelled
// are handled separately (they branch off the happy path).
const STEPS: { key: string; label: string }[] = [
  { key: "created", label: "Confirmed" },
  { key: "picked_up", label: "Picked up" },
  { key: "in_transit", label: "In transit" },
  { key: "ofd", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

const STATUS_LABEL: Record<string, string> = {
  created: "Preparing to ship",
  picked_up: "Picked up",
  in_transit: "In transit",
  ofd: "Out for delivery",
  delivered: "Delivered",
  rto: "Returned to origin",
  cancelled: "Cancelled",
};

const STATUS_PILL: Record<string, string> = {
  created: "bg-amber-50 text-amber-700 border-amber-200",
  picked_up: "bg-blue-50 text-blue-700 border-blue-200",
  in_transit: "bg-blue-50 text-blue-700 border-blue-200",
  ofd: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  rto: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ShipmentsSection({
  shipments,
  orderStatus,
  paymentMethod,
}: {
  shipments: Shipment[];
  orderStatus: string;
  paymentMethod: string | null;
}) {
  // Nothing shipped yet. Don't show tracking for cancelled orders.
  if (shipments.length === 0) {
    if (orderStatus === "cancelled") return null;
    return (
      <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
        <h2 className="text-lg font-bold text-gray-900">Delivery</h2>
        <p className="mt-2 text-sm text-gray-500">
          {paymentMethod === "cod"
            ? "Your order is confirmed. We'll share courier and tracking details once it's handed to the courier."
            : "We'll share courier and tracking details here once your order is shipped."}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-card-bg p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Delivery {shipments.length > 1 ? `(${shipments.length} shipments)` : ""}
        </h2>
      </div>
      {shipments.length > 1 && (
        <p className="mt-1 text-xs text-gray-500">
          Items from different temples ship separately, so this order has
          more than one parcel.
        </p>
      )}

      <div className="mt-4 space-y-5">
        {shipments.map((s, idx) => (
          <ShipmentCard key={s.id} shipment={s} index={idx} total={shipments.length} />
        ))}
      </div>
    </section>
  );
}

function ShipmentCard({
  shipment: s,
  index,
  total,
}: {
  shipment: Shipment;
  index: number;
  total: number;
}) {
  const isClosed = s.status === "delivered" || s.status === "rto" || s.status === "cancelled";
  const isProblem = s.status === "rto" || s.status === "cancelled";
  const currentStepIdx = STEPS.findIndex((step) => step.key === s.status);
  const eta = formatDate(s.estimated_delivery);

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      {/* Header: shipment label + status pill */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-gray-900">
          {total > 1 ? `Parcel ${index + 1} of ${total}` : "Parcel"}
        </p>
        <span
          className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${
            STATUS_PILL[s.status] ?? "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          {STATUS_LABEL[s.status] ?? s.status}
        </span>
      </div>

      {/* Courier + tracking facts */}
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {s.courier_name && (
          <Fact label="Courier" value={s.courier_name} />
        )}
        {s.awb_code && (
          <Fact
            label="Tracking ID"
            value={
              s.tracking_url ? (
                <a
                  href={s.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red hover:underline"
                >
                  {s.awb_code}
                </a>
              ) : (
                s.awb_code
              )
            }
          />
        )}
        <Fact
          label="Payment"
          value={s.payment_type === "COD" ? "Cash on Delivery" : "Prepaid"}
        />
        {eta && !isClosed && (
          <Fact label="Est. delivery" value={`by ${eta}`} />
        )}
      </dl>

      {/* COD amount reminder so the customer keeps cash ready */}
      {s.payment_type === "COD" && !isClosed && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Keep cash ready — please pay the courier on delivery.
        </p>
      )}

      {/* Progress timeline (happy path) or problem banner */}
      {isProblem ? (
        <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          {s.status === "rto"
            ? "This parcel is being returned to us. If you paid online, a refund will be processed."
            : "This shipment was cancelled."}
        </div>
      ) : (
        <ol className="mt-4 flex items-center">
          {STEPS.map((step, i) => {
            const reached = currentStepIdx >= 0 && i <= currentStepIdx;
            const isLast = i === STEPS.length - 1;
            return (
              <li key={step.key} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      reached
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {reached ? "✓" : i + 1}
                  </span>
                  <span
                    className={`mt-1 w-16 text-center text-[10px] leading-tight ${
                      reached ? "text-gray-800 font-medium" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <span
                    className={`mx-1 h-0.5 flex-1 ${
                      i < currentStepIdx ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      )}

      {/* Delivery PIN — the customer reads this to the rider at the door.
          Only meaningful while the parcel is out and not yet delivered. */}
      {s.delivery_pin && !isClosed && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-gray-300 bg-surface-soft px-3 py-2.5">
          <div>
            <p className="text-xs font-semibold text-gray-700">Delivery PIN</p>
            <p className="text-[11px] text-gray-500">
              Share this with the delivery agent to confirm receipt.
            </p>
          </div>
          <span className="text-xl font-bold tracking-widest text-gray-900">
            {s.delivery_pin}
          </span>
        </div>
      )}
    </div>
  );
}

function Fact({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  );
}
