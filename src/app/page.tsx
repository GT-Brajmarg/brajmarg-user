import { createClient } from "@/utils/supabase/server";
import TempleCard from "@/components/TempleCard";
import AlertCarousel from "@/components/AlertCarousel";
import type { Temple, Alert, AlertPriority } from "@/types/database";

// Always render fresh so newly-published / expired alerts reflect on reload.
export const dynamic = "force-dynamic";

// Higher = shown first. Drives priority-based ordering on top of display_order.
const PRIORITY_RANK: Record<AlertPriority, number> = {
  urgent: 3,
  important: 2,
  info: 1,
};

export default async function Home() {
  const supabase = await createClient();

  // Fetch active temples ordered by display_order
  // const { data: temples } = await supabase
  //   .from("temples")
  //   .select("*")
  //   .eq("is_active", true)
  //   .order("display_order", { ascending: true });
  const { data: temples } = await supabase
    .from("temples")
    .select(
      `
    *,
    temple_timings (*)
  `,
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // Fetch live alerts within their date window, with optional temple name.
  // Window logic: started already (or no start) AND not yet ended (or no end).
  const nowIso = new Date().toISOString();
  // temples(*) so a not-yet-migrated column (e.g. contact_phone) never breaks
  // the join — we read whatever temple columns currently exist.
  const { data: alertsData } = await supabase
    .from("alerts")
    .select("*, temples(*)")
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .order("display_order", { ascending: true });

  const alerts = (
    (alertsData ?? []) as (Alert & {
      temples: Temple | null;
    })[]
  ).sort((a, b) => {
    // Priority first (urgent → info), then display_order, then start date.
    const p = PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority];
    if (p !== 0) return p;
    const d = (a.display_order ?? 0) - (b.display_order ?? 0);
    if (d !== 0) return d;
    return (a.starts_at ?? "").localeCompare(b.starts_at ?? "");
  });

  const now = new Date();
  const today = now.getDay();

  const templesWithStatus =
    temples?.map((temple: any) => {
      const timings = temple.temple_timings ?? [];

      const todayTimings = timings
        .filter(
          (t: any) =>
            t.day_of_week === String(today) || t.day_of_week === "daily",
        )
        .sort((a: any, b: any) => a.opening_time.localeCompare(b.opening_time));

      const currentEvent = todayTimings.find((row: any) => {
        const start = new Date(now);
        const end = new Date(now);

        const [oh, om] = row.opening_time.split(":").map(Number);
        const [ch, cm] = row.closing_time.split(":").map(Number);

        start.setHours(oh, om, 0, 0);
        end.setHours(ch, cm, 0, 0);

        return now >= start && now <= end;
      });

      let currentRemainingTime: string | undefined;

      if (currentEvent) {
        const endTime = new Date(now);

        const [h, m] = currentEvent.closing_time.split(":").map(Number);

        endTime.setHours(h, m, 0, 0);

        const diff = endTime.getTime() - now.getTime();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          currentRemainingTime =
            hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }
      }

      const upcomingEvent =
        todayTimings.find((row: any) => {
          const start = new Date(now);

          const [h, m] = row.opening_time.split(":").map(Number);

          start.setHours(h, m, 0, 0);

          return start > now;
        }) ||
        timings.sort((a: any, b: any) => {
          return Number(a.day_of_week) - Number(b.day_of_week);
        })[0];
      let remainingTime: string | undefined;

      if (upcomingEvent) {
        const nextTime = new Date(now);

        const [h, m] = upcomingEvent.opening_time.split(":").map(Number);

        nextTime.setHours(h, m, 0, 0);

        if (nextTime <= now) {
          nextTime.setDate(nextTime.getDate() + 1);
        }

        const diff = nextTime.getTime() - now.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        remainingTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }

      const hasEventsToday = todayTimings.length > 0;

      const allEventsFinishedToday =
        hasEventsToday &&
        !currentEvent &&
        !todayTimings.some((row: any) => {
          const start = new Date(now);

          const [h, m] = row.opening_time.split(":").map(Number);

          start.setHours(h, m, 0, 0);

          return start > now;
        });
      return {
        ...temple,
        allEventsFinishedToday,
        currentEvent: currentEvent
          ? {
              ...currentEvent,
              remainingTime: currentRemainingTime,
            }
          : undefined,

        upcomingEvent: upcomingEvent
          ? {
              ...upcomingEvent,
              remainingTime,
            }
          : undefined,
      };
    }) ?? [];

  return (
    <main className="flex-1">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Upcoming Alerts */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-red mb-6">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </span>
            Upcoming Alerts
          </h2>
          {alerts.length > 0 ? (
            <AlertCarousel alerts={alerts} />
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-card-bg p-8 text-center text-gray-500">
              <p className="font-medium">No upcoming alerts right now.</p>
              <p className="text-sm mt-1">
                Festivals and special darshans will appear here once added.
              </p>
            </div>
          )}
        </section>

        {/* Explore Temples */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Explore Temples
          </h2>
          <div className="w-16 h-1 bg-brand-red rounded mb-6" />

          {temples && temples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {(temples as Temple[]).map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))} */}
              {templesWithStatus.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No temples available yet.</p>
              <p className="text-sm mt-1">
                Temples will appear here once added to the database.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
