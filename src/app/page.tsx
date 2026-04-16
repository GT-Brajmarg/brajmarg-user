import { createClient } from "@/utils/supabase/server";
import TempleCard from "@/components/TempleCard";
import EventCard from "@/components/EventCard";
import type { Temple, Event } from "@/types/database";

export default async function Home() {
  const supabase = await createClient();

  // Fetch active temples ordered by display_order
  const { data: temples } = await supabase
    .from("temples")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // Fetch upcoming events with temple name
  const today = new Date().toISOString().split("T")[0];
  const { data: events } = await supabase
    .from("events")
    .select("*, temples(name)")
    .eq("is_active", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(4);

  const eventList = (events ?? []) as (Event & { temples: { name: string } | null })[];

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
          {eventList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eventList.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  templeName={event.temples?.name ?? ""}
                />
              ))}
            </div>
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
              {(temples as Temple[]).map((temple) => (
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
