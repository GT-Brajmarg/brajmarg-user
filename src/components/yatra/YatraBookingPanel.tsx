"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";
import type { YatraPackage } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { formatTime, formatWeekdays, isGroupPackage } from "@/lib/yatra";
import {
  INDIA_DIAL_CODE,
  digitsOnly,
  indianNationalDigits,
  isValidIndianMobile,
  toIndianE164,
} from "@/lib/identifier";
import {
  createYatraCodBooking,
  createYatraRazorpayOrder,
  verifyYatraPayment,
  markYatraPaymentFailed,
} from "@/app/yatra/actions";

export type BookingPrefill = { name: string; email: string; phone: string };

type RazorpayInstance = {
  open: () => void;
  on: (event: string, cb: (resp: { error?: { description?: string } }) => void) => void;
};
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayInstance;

type PayMethod = "razorpay" | "cod";
type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ["Summary", "Details", "Review & Pay", "Confirmation"];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function YatraBookingPanel({
  pkg,
  seatsLeft = null,
  isLoggedIn = false,
  prefill = null,
  loginHref,
}: {
  pkg: YatraPackage;
  seatsLeft?: number | null;
  isLoggedIn?: boolean;
  prefill?: BookingPrefill | null;
  loginHref: string;
}) {
  const isGroup = isGroupPackage(pkg);
  const unitPrice = parseNumeric(pkg.price);
  const allowOnline = pkg.allow_direct_payment;
  const allowCod = pkg.allow_cod;

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ orderNumber: string; name: string } | null>(null);

  const [seats, setSeats] = useState(1);
  const [fullName, setFullName] = useState(prefill?.name ?? "");
  // Holds the 10-digit national number only; +91 is shown as a fixed prefix.
  const [phone, setPhone] = useState(() =>
    indianNationalDigits(prefill?.phone ?? ""),
  );
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [travelDate, setTravelDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<PayMethod>(allowOnline ? "razorpay" : "cod");

  const maxSeats = useMemo(() => {
    const cap = pkg.vehicles?.seating_capacity ?? 20;
    if (!isGroup) return cap;
    if (seatsLeft == null) return cap;
    return Math.max(0, Math.min(cap, seatsLeft));
  }, [isGroup, seatsLeft, pkg.vehicles?.seating_capacity]);

  const billedSeats = isGroup ? Math.max(1, seats) : 1;
  const total = unitPrice * billedSeats;
  const soldOut = isGroup && maxSeats <= 0;

  const schedule = isGroup ? formatWeekdays(pkg.weekdays) : "";
  const depart = isGroup ? formatTime(pkg.departure_time) : "";

  function buildFormData(): FormData {
    const fd = new FormData();
    fd.set("package_id", pkg.id);
    fd.set("full_name", fullName);
    // Submit the normalised E.164 value (+91XXXXXXXXXX).
    fd.set("customer_phone", toIndianE164(phone) ?? "");
    fd.set("customer_email", email);
    fd.set("travel_date", travelDate);
    fd.set("travellers", String(billedSeats));
    fd.set("notes", [pickup ? `Pickup: ${pickup}` : null, notes].filter(Boolean).join(" | "));
    return fd;
  }

  function validateDetails(): string | null {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!phone.trim()) return "Please enter a mobile number.";
    if (!isValidIndianMobile(phone))
      return "Please enter a valid 10-digit mobile number.";
    if (!travelDate) return "Please choose a travel date.";
    if (soldOut) return "This yatra is sold out.";
    if (isGroup && seats > maxSeats)
      return `Only ${maxSeats} seat${maxSeats === 1 ? "" : "s"} left.`;
    return null;
  }

  async function handleCod() {
    setLoading(true);
    try {
      const res = await createYatraCodBooking(buildFormData());
      setConfirmation({ orderNumber: res.orderNumber, name: res.bookerName });
      setStep(4);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Could not place your booking.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRazorpay() {
    if (typeof window === "undefined" || !window.Razorpay) {
      setError("Payment is still loading. Please try again in a moment.");
      return;
    }
    setLoading(true);
    let order: Awaited<ReturnType<typeof createYatraRazorpayOrder>>;
    try {
      order = await createYatraRazorpayOrder(buildFormData());
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Could not start booking.");
      setLoading(false);
      return;
    }

    const RZ = (window as unknown as { Razorpay: RazorpayCtor }).Razorpay;
    const rz = new RZ({
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: order.name,
      description: order.description,
      order_id: order.orderId,
      prefill: order.prefill,
      handler: async (resp: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          await verifyYatraPayment({
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
            dbOrderId: order.dbOrderId,
          });
          window.location.href = "/account/transactions?booked=yatra";
        } catch (err) {
          console.error(err);
          window.location.href = "/account/transactions";
        }
      },
      modal: {
        ondismiss: () => {
          markYatraPaymentFailed(order.dbOrderId).catch(console.error);
          setLoading(false);
        },
      },
      theme: { color: "#c41e1e" },
    });
    rz.on("payment.failed", (resp) => {
      markYatraPaymentFailed(order.dbOrderId).catch(console.error);
      setError(resp?.error?.description || "Payment failed. You have not been charged.");
      setLoading(false);
    });
    rz.open();
  }

  function handlePay() {
    setError(null);
    if (method === "cod") void handleCod();
    else void handleRazorpay();
  }

  return (
    <div id="book" className="overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-devotional">
      {allowOnline && (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      )}

      {/* Maroon step indicator */}
      <div className="bg-brand-red px-5 py-3.5">
        <ol className="flex items-center justify-between">
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const done = step > n;
            const active = step === n;
            return (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <span className="flex items-center gap-2">
                  <span
                    className={[
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                      active
                        ? "bg-white text-brand-red"
                        : done
                          ? "bg-white/30 text-white"
                          : "bg-white/15 text-white/70",
                    ].join(" ")}
                  >
                    {done ? (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      n
                    )}
                  </span>
                  <span className={["hidden text-xs font-medium sm:block", active ? "text-white" : "text-white/70"].join(" ")}>
                    {label}
                  </span>
                </span>
                {i < STEP_LABELS.length - 1 && <span className="mx-2 h-px flex-1 bg-white/20" />}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content (left) */}
        <div className="p-5 sm:p-6">
          {/* ── Step 1: Summary ── */}
          {step === 1 && (
            <div className="space-y-4">
              <SectionTitle n={1} title="Package Summary" />
              <div className="flex flex-col gap-4 rounded-xl border border-brand-gold/15 p-4 sm:flex-row">
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-surface-soft sm:w-44">
                  {pkg.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-gold-soft to-amber-100 text-3xl text-brand-gold/40">॥</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className={["inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase", isGroup ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"].join(" ")}>
                    {isGroup ? "Seat Booking · Shared Yatra" : "Private Vehicle · Full Package"}
                  </span>
                  <h3 className="mt-1.5 font-serif text-lg font-bold text-gray-900">{pkg.name}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {(pkg.duration_days || pkg.duration_nights) && (
                      <SummaryFact label="Duration" value={`${pkg.duration_days ?? 0}D / ${pkg.duration_nights ?? 0}N`} />
                    )}
                    {pkg.distance_km != null && <SummaryFact label="Total Distance" value={`${pkg.distance_km} km`} />}
                    {pkg.vehicles?.name && <SummaryFact label="Vehicle" value={pkg.vehicles.name} />}
                    {isGroup && schedule && <SummaryFact label="Departs" value={depart ? `${schedule} · ${depart}` : schedule} />}
                  </div>
                </div>
              </div>

              {isGroup && (
                <div className="flex items-center justify-between rounded-xl border border-brand-gold/15 p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Number of seats</p>
                    {seatsLeft != null && (
                      <p className="text-[11px] text-gray-400">{seatsLeft} seat{seatsLeft === 1 ? "" : "s"} available</p>
                    )}
                  </div>
                  <SeatStepper value={seats} min={1} max={maxSeats || 1} onChange={setSeats} />
                </div>
              )}

              <FooterNav
                right={
                  <PrimaryButton
                    disabled={soldOut}
                    onClick={() => {
                      if (soldOut) { setError("This yatra is sold out."); return; }
                      setError(null); setStep(2);
                    }}
                  >
                    {soldOut ? "Sold out" : "Continue to Details"}
                  </PrimaryButton>
                }
              />
            </div>
          )}

          {/* ── Step 2: Details ── */}
          {step === 2 && (
            <div className="space-y-4">
              <SectionTitle n={2} title={isGroup ? "Passenger Details" : "Traveller Details"} hint="Please provide primary contact details for this booking" />

              {isLoggedIn && prefill?.name && (
                <div className="flex items-center gap-2.5 rounded-lg border border-brand-gold/20 bg-brand-gold-soft/50 px-3 py-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gold/20 text-sm font-bold text-brand-gold">
                    {(fullName || prefill.name).charAt(0).toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-600">
                    Booking as <span className="font-semibold text-gray-900">{fullName || prefill.name}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="Full Name" required value={fullName} onChange={setFullName} placeholder="Enter full name" />
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Mobile Number <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1 transition-colors focus-within:border-brand-red focus-within:ring-2 focus-within:ring-red-100">
                    <span className="px-2 py-1.5 text-sm font-medium text-gray-700 select-none mr-1">
                      +{INDIA_DIAL_CODE}
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(e) => setPhone(digitsOnly(e.target.value).slice(0, 10))}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none px-1 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="Enter email address" />
                <TextField label="Travel Start Date" required type="date" value={travelDate} onChange={setTravelDate} min={todayStr()} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="Pickup Location" value={pickup} onChange={setPickup} placeholder="Select pickup location" />
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    {isGroup ? "Number of Seats" : "Total Travellers"}
                  </label>
                  {isGroup ? (
                    <SeatStepper value={seats} min={1} max={maxSeats || 1} onChange={setSeats} />
                  ) : (
                    <input value={`${pkg.vehicles?.seating_capacity ?? "Whole"} vehicle`} disabled className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500" />
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Special Requirements / Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Any special requests or requirements…" className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100" />
              </div>

              {error && <ErrorNote>{error}</ErrorNote>}

              <FooterNav
                left={<SecondaryButton onClick={() => setStep(1)}>Back</SecondaryButton>}
                right={
                  <PrimaryButton onClick={() => { const e = validateDetails(); if (e) { setError(e); return; } setError(null); setStep(3); }}>
                    Continue to Review &amp; Pay
                  </PrimaryButton>
                }
              />
            </div>
          )}

          {/* ── Step 3: Review & Pay ── */}
          {step === 3 && (
            <div className="space-y-4">
              <SectionTitle n={3} title="Review & Pay" hint="Review your booking details & proceed to payment" />

              <dl className="space-y-1.5 rounded-xl border border-brand-gold/15 p-4 text-sm">
                <ReviewRow label="Name" value={fullName} />
                <ReviewRow label="Mobile" value={phone ? `+${INDIA_DIAL_CODE} ${phone}` : ""} />
                {email && <ReviewRow label="Email" value={email} />}
                <ReviewRow label="Travel date" value={travelDate} />
                {pickup && <ReviewRow label="Pickup" value={pickup} />}
                <ReviewRow label={isGroup ? "Seats" : "Booking"} value={isGroup ? `${billedSeats} seat${billedSeats === 1 ? "" : "s"}` : "Whole vehicle"} />
                {notes && <ReviewRow label="Notes" value={notes} />}
              </dl>

              {/* Payment method OR login gate */}
              {!isLoggedIn ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                  <p className="text-sm font-semibold text-amber-900">
                    Please login to continue the Yatra
                  </p>
                  <Link
                    href={loginHref}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
                  >
                    Login to continue
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-gray-700">Payment method</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {allowOnline && (
                      <MethodOption selected={method === "razorpay"} onSelect={() => setMethod("razorpay")} title="Pay Online" sub="UPI / Card · Instant" />
                    )}
                    {allowCod && (
                      <MethodOption selected={method === "cod"} onSelect={() => setMethod("cod")} title="Pay Later" sub="Cash · Confirmed by team" />
                    )}
                  </div>
                  {method === "cod" && (
                    <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                      No online payment now. Your booking is recorded and our team will confirm it. Pay on the day of travel.
                    </p>
                  )}
                </div>
              )}

              {error && <ErrorNote>{error}</ErrorNote>}

              <FooterNav
                left={<SecondaryButton onClick={() => setStep(2)}>Back</SecondaryButton>}
                right={
                  isLoggedIn ? (
                    <PrimaryButton disabled={loading} onClick={handlePay}>
                      {loading ? "Processing…" : method === "cod" ? `Confirm Booking · ${formatInr(total)}` : `Pay ${formatInr(total)}`}
                    </PrimaryButton>
                  ) : undefined
                }
              />
            </div>
          )}

          {/* ── Step 4: Confirmation ── */}
          {step === 4 && confirmation && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-red">Booking Confirmed!</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
                Thank you, {confirmation.name}. Your yatra has been booked successfully. Pay on the day of travel — we&apos;ll contact you shortly with details.
              </p>
              <div className="mx-auto mt-4 w-fit rounded-lg border border-brand-gold/20 bg-surface-soft px-4 py-2 text-sm">
                <span className="text-gray-500">Booking ref</span>{" "}
                <span className="font-bold text-gray-900">{confirmation.orderNumber}</span>
              </div>
              <div className="mx-auto mt-6 flex max-w-sm gap-3">
                <Link href="/account/orders?tab=draft" className="flex-1 rounded-xl border border-brand-red/30 py-3 text-sm font-semibold text-brand-red transition-colors hover:bg-red-50">
                  View My Bookings
                </Link>
                <Link href="/yatra" className="flex-1 rounded-xl bg-brand-red py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark">
                  Explore More
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Booking summary (right rail) */}
        {step !== 4 && (
          <aside className="border-t border-brand-gold/10 bg-surface-soft/60 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <h4 className="font-serif text-base font-bold text-gray-900">Booking Summary</h4>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>{isGroup ? `Seat Fare (${formatInr(unitPrice)} × ${billedSeats})` : "Package Price"}</span>
                <span className="font-medium text-gray-900">{formatInr(unitPrice * billedSeats)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-brand-gold/15 pt-2.5">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-brand-red">{formatInr(total)}</span>
              </div>
            </div>

            {isGroup && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800">Boarding Instructions</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-amber-800">
                  <li>• Reach boarding point 30 mins early</li>
                  <li>• Carry a valid ID proof</li>
                  <li>• Tickets will be shared on your email</li>
                </ul>
              </div>
            )}

            <ul className="mt-4 space-y-1.5 text-[11px] text-gray-500">
              <li className="flex items-center gap-1.5">
                <CheckDot /> {isGroup ? "Shared Vehicle" : "Private Vehicle"}
              </li>
              <li className="flex items-center gap-1.5"><CheckDot /> {isGroup ? "Fixed Schedule" : "Flexible Travel Date"}</li>
              <li className="flex items-center gap-1.5"><CheckDot /> Safe &amp; Reliable</li>
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}

/* ── sub-components ── */

function SectionTitle({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">{n}</span>
      <div>
        <h3 className="font-serif text-lg font-bold text-gray-900">{title}</h3>
        {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
      </div>
    </div>
  );
}

function SummaryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface-soft px-2 py-1.5">
      <p className="text-[9px] uppercase tracking-wide text-gray-400">{label}</p>
      <p className="truncate font-semibold text-gray-800">{value}</p>
    </div>
  );
}

function SeatStepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300">
      <button type="button" aria-label="Decrease" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="grid h-9 w-9 place-items-center text-lg text-gray-600 disabled:opacity-40">−</button>
      <span className="w-9 text-center text-sm font-bold text-gray-900">{value}</span>
      <button type="button" aria-label="Increase" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="grid h-9 w-9 place-items-center text-lg text-gray-600 disabled:opacity-40">+</button>
    </div>
  );
}

function MethodOption({ selected, onSelect, title, sub }: { selected: boolean; onSelect: () => void; title: string; sub: string }) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} className={["flex flex-col rounded-xl border px-3 py-2.5 text-left transition-colors", selected ? "border-brand-red bg-red-50 ring-1 ring-brand-red" : "border-gray-300 hover:border-gray-400"].join(" ")}>
      <span className="text-sm font-semibold text-gray-900">{title}</span>
      <span className="text-[11px] text-gray-500">{sub}</span>
    </button>
  );
}

function FooterNav({ left, right }: { left?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-gray-300">
      {children}
      {!disabled && (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
      {children}
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function ErrorNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{children}</p>;
}

function CheckDot() {
  return (
    <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TextField({ label, value, onChange, type = "text", required = false, placeholder, min }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; min?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input value={value} onChange={(e) => onChange(e.target.value)} type={type} required={required} placeholder={placeholder} min={min} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100" />
    </div>
  );
}
