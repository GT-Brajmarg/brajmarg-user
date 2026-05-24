import type { SupabaseClient } from "@supabase/supabase-js";
import type { PackageType, YatraPackage } from "@/types/database";

/**
 * Yatra booking-model helpers.
 *
 * Yatra bookings are stored as ordinary `orders` + `order_items`
 * (item_type = "yatra"), so "seats left" for a group/shared package is
 * *derived* at read time rather than tracked in a dedicated table.
 *
 * Seat accounting rule (product decision): a seat is considered taken
 * while a booking is live — i.e. NOT failed and NOT cancelled. This
 * means a pending Cash-on-Delivery booking holds its seat until an admin
 * cancels it, preventing overbooking at the cost of a never-collected
 * COD order tying up inventory.
 */

/** Treat any unrecognised package_type as a full-package ("solo"). */
export function normalizePackageType(value: string | null | undefined): PackageType {
  return value === "group" ? "group" : "solo";
}

export function isGroupPackage(pkg: Pick<YatraPackage, "package_type" | "seats_total">): boolean {
  return normalizePackageType(pkg.package_type) === "group" && pkg.seats_total != null;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "Fri" / "Fri & Sat" / "Mon, Wed, Fri" — empty string when none. */
export function formatWeekdays(weekdays: number[] | null | undefined): string {
  const days = (weekdays ?? [])
    .filter((d) => d >= 0 && d <= 6)
    .sort((a, b) => a - b)
    .map((d) => DAY_LABELS[d]);
  if (days.length === 0) return "";
  if (days.length === 1) return days[0];
  if (days.length === 2) return `${days[0]} & ${days[1]}`;
  return days.join(", ");
}

/** "04:10:00" → "4:10 AM". Returns "" for null/blank. */
export function formatTime(time: string | null | undefined): string {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr ?? "0", 10);
  if (Number.isNaN(h)) return "";
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export type SeatInfo = {
  /** Total seats for the package (group only; null = unlimited/solo). */
  total: number | null;
  /** Seats already taken by live bookings. */
  taken: number;
  /** Seats still available; null when the package has no seat limit. */
  left: number | null;
};

/**
 * Computes seats-left for the given group package ids in ONE query.
 *
 * Must be called with a privileged (service-role) client: per-user RLS on
 * `orders` would otherwise hide other customers' bookings and inflate the
 * available count. Solo packages (no seats_total) are skipped — they have
 * no shared inventory.
 *
 * Returns a Map keyed by package id. Packages with no live bookings still
 * get an entry (taken = 0) as long as a `seats_total` is supplied.
 */
export async function seatsLeftFor(
  admin: SupabaseClient,
  packages: Pick<YatraPackage, "id" | "seats_total" | "package_type">[]
): Promise<Map<string, SeatInfo>> {
  const result = new Map<string, SeatInfo>();

  const groupPkgs = packages.filter((p) => isGroupPackage(p));
  for (const p of groupPkgs) {
    result.set(p.id, { total: p.seats_total, taken: 0, left: p.seats_total });
  }
  if (groupPkgs.length === 0) return result;

  const ids = groupPkgs.map((p) => p.id);

  // Live yatra order lines for these packages, with their order's status
  // so we can exclude cancelled/failed bookings from the seat count.
  const { data, error } = await admin
    .from("order_items")
    .select("item_id, quantity, orders!inner(status, payment_status)")
    .eq("item_type", "yatra")
    .in("item_id", ids);

  if (error || !data) {
    // Fail safe: on a read error, report full inventory rather than
    // blocking bookings. The server-side re-check at booking time is the
    // real overbooking guard.
    return result;
  }

  type OrderRef = { status: string | null; payment_status: string | null };
  for (const row of data as unknown as Array<{
    item_id: string;
    quantity: number | null;
    // PostgREST may type the embedded relation as an object or an array
    // depending on the FK shape; normalise both.
    orders: OrderRef | OrderRef[] | null;
  }>) {
    const order = Array.isArray(row.orders) ? row.orders[0] : row.orders;
    if (!order) continue;
    if (order.status === "cancelled") continue;
    if (order.payment_status === "failed") continue;

    const info = result.get(row.item_id);
    if (!info || info.total == null) continue;
    info.taken += Math.max(0, row.quantity ?? 0);
  }

  for (const info of result.values()) {
    if (info.total != null) {
      info.left = Math.max(0, info.total - info.taken);
    }
  }

  return result;
}

/**
 * A yatra booking's details, parsed from the order `notes` field.
 *
 * Yatra bookings are stored as ordinary orders whose human-readable trip
 * details live in `notes` (see createYatraCodBooking / buildTripNote):
 *   "Yatra: <name> (<from> → <to>) | Type: <type> | Travel date: <date>
 *    | Seats: <n> | Note: <text>"
 * This parser recovers those fields for the bookings list + detail pages,
 * which is necessary because the order_items row may be absent.
 */
export type ParsedYatraNotes = {
  packageName: string | null;
  fromLocation: string | null;
  toLocation: string | null;
  bookingType: string | null;
  travelDate: string | null;
  seats: number | null;
  travellers: number | null;
  note: string | null;
};

export function parseYatraNotes(notes: string | null): ParsedYatraNotes {
  const out: ParsedYatraNotes = {
    packageName: null,
    fromLocation: null,
    toLocation: null,
    bookingType: null,
    travelDate: null,
    seats: null,
    travellers: null,
    note: null,
  };
  if (!notes) return out;

  // "Yatra: Name (From → To)"  — the arrow may be → or ->
  const yatra = notes.match(/Yatra:\s*([^(|]+?)\s*\(([^)]*?)\s*(?:→|->)\s*([^)]*?)\)/i);
  if (yatra) {
    out.packageName = yatra[1].trim() || null;
    out.fromLocation = yatra[2].trim() || null;
    out.toLocation = yatra[3].trim() || null;
  } else {
    const nameOnly = notes.match(/Yatra:\s*([^|]+)/i);
    if (nameOnly) out.packageName = nameOnly[1].trim() || null;
  }

  const type = notes.match(/Type:\s*([^|]+)/i);
  if (type) out.bookingType = type[1].trim();

  const date = notes.match(/Travel date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
  if (date) out.travelDate = date[1];

  const seats = notes.match(/Seats:\s*(\d+)/i);
  if (seats) out.seats = parseInt(seats[1], 10);

  const trav = notes.match(/Travellers:\s*(\d+)/i);
  if (trav) out.travellers = parseInt(trav[1], 10);

  const note = notes.match(/(?:^|\|)\s*Note:\s*([^|]+)/i);
  if (note) out.note = note[1].trim();

  return out;
}

/** Seats-left for a single package id (used by the client refresh action). */
export async function seatsLeftForOne(
  admin: SupabaseClient,
  pkg: Pick<YatraPackage, "id" | "seats_total" | "package_type">
): Promise<SeatInfo> {
  const map = await seatsLeftFor(admin, [pkg]);
  return (
    map.get(pkg.id) ?? { total: pkg.seats_total, taken: 0, left: pkg.seats_total }
  );
}
