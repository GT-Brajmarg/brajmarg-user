import type { Event } from "@/types/database";

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({
  event,
  templeName,
}: {
  event: Event;
  templeName: string;
}) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-gray-200 bg-card-bg p-5 hover:shadow-md transition-shadow">
      <div className="space-y-1">
        {/* Date badge */}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-red bg-red-50 px-2.5 py-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(event.event_date)}
        </span>

        <h3 className="text-base font-semibold text-gray-900">{event.name}</h3>
        <p className="text-sm text-brand-red">at {templeName}</p>
      </div>

      {/* Info icon */}
      <button
        className="shrink-0 p-1 text-gray-400 hover:text-gray-600"
        aria-label="More info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
