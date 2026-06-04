"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Alert, AlertType, AlertPriority, Temple } from "@/types/database";
import { formatDateTimeIn } from "@/lib/format";

type AlertWithTemple = Alert & { temples?: Temple | null };

const AUTO_ADVANCE_MS = 5000;

/** Human label per alert type. */
const TYPE_LABEL: Record<AlertType, string> = {
  festival: "Festival",
  special_darshan: "Special Darshan",
  closure: "Closure",
  timing_change: "Timing Change",
  general: "Notice",
};

/** Priority drives the accent color of the badge / left rail. */
const PRIORITY_STYLE: Record<
  AlertPriority,
  { badge: string; rail: string; dot: string }
> = {
  info: {
    badge: "text-brand-red bg-red-50",
    rail: "bg-brand-red",
    dot: "bg-brand-red",
  },
  important: {
    badge: "text-amber-700 bg-amber-50",
    rail: "bg-amber-500",
    dot: "bg-amber-500",
  },
  urgent: {
    badge: "text-white bg-brand-red",
    rail: "bg-brand-red",
    dot: "bg-brand-red",
  },
};

function TypeIcon({ type }: { type: AlertType }) {
  // Inline SVG, project convention (no icon lib). viewBox 0 0 24 24.
  const paths: Record<AlertType, string> = {
    festival:
      "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z",
    special_darshan:
      "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    closure:
      "M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.667 1.73-3L13.73 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    timing_change:
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    general:
      "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type]} />
    </svg>
  );
}

export default function AlertCarousel({ alerts }: { alerts: AlertWithTemple[] }) {
  const dialogId = useId();
  const [index, setIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState<AlertWithTemple | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = alerts.length;
  // Clamp at render time so a shrinking list (e.g. expiry on refresh) never
  // leaves us pointing past the end — no effect / cascading render needed.
  const active = count > 0 ? index % count : 0;
  const goTo = useCallback(
    (i: number) => setIndex((i + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(active + 1), [goTo, active]);
  const prev = useCallback(() => goTo(active - 1), [goTo, active]);

  // Auto-advance every 5s. Paused while a detail dialog is open or only one alert.
  useEffect(() => {
    if (count <= 1 || openAlert) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, openAlert]);

  const close = useCallback(() => setOpenAlert(null), []);

  if (count === 0) return null;

  return (
    <>
      <div className="relative rounded-2xl border border-brand-gold/15 bg-card-bg p-3 sm:p-4 shadow-devotional">
        {/* Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {alerts.map((alert) => {
              const pstyle = PRIORITY_STYLE[alert.priority] ?? PRIORITY_STYLE.info;
              const templeName = alert.temples?.name ?? null;
              return (
                <div key={alert.id} className="w-full shrink-0 px-1">
                  <div className="flex items-stretch gap-3 sm:gap-4">
                    <div className={`w-1.5 shrink-0 rounded-full ${pstyle.rail}`} />
                    <div className="flex flex-1 flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <span
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${pstyle.badge}`}
                        >
                          <TypeIcon type={alert.alert_type} />
                        </span>
                        <div className="min-w-0 space-y-1">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${pstyle.badge}`}
                          >
                            {TYPE_LABEL[alert.alert_type] ?? "Notice"}
                          </span>
                          <h3 className="truncate text-base font-semibold text-gray-900">
                            {alert.title}
                          </h3>
                          {(alert.description || templeName) && (
                            <p className="line-clamp-1 text-sm text-gray-600">
                              {templeName ? `${templeName} · ` : ""}
                              {alert.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-2 pl-14 sm:items-end sm:pl-0 sm:text-right">
                        {alert.starts_at && (
                          <p className="text-xs text-gray-500">
                            Starts: {formatDateTimeIn(alert.starts_at)}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setOpenAlert(alert)}
                          className="rounded-lg bg-brand-red px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manual nav arrows + dots (only when more than one alert) */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous alert"
              className="absolute left-1 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red text-white shadow hover:bg-brand-red-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next alert"
              className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red text-white shadow hover:bg-brand-red-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="mt-2 flex items-center justify-center gap-1.5">
              {alerts.map((alert, i) => (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to alert ${i + 1}`}
                  aria-current={i === active}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-brand-red" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="absolute bottom-2 right-3 text-[11px] text-gray-400">
              {active + 1} of {count}
            </p>
          </>
        )}
      </div>

      {/* Detail dialog — expands in-page on the current page (no route change) */}
      {openAlert && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Close dialog"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogId}
            className="relative z-[81] w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-card-bg shadow-xl border border-gray-100"
          >
            {/* Header: type badge + title + close */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-card-bg/95 backdrop-blur border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    (PRIORITY_STYLE[openAlert.priority] ?? PRIORITY_STYLE.info).badge
                  }`}
                >
                  <TypeIcon type={openAlert.alert_type} />
                </span>
                <div className="min-w-0">
                  <h2 id={dialogId} className="text-lg font-bold text-gray-900">
                    {openAlert.title}
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      (PRIORITY_STYLE[openAlert.priority] ?? PRIORITY_STYLE.info).badge
                    }`}
                  >
                    {TYPE_LABEL[openAlert.alert_type] ?? "Notice"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body: two columns — temple (left) / details (right) */}
            <div className="grid gap-6 p-5 sm:grid-cols-[200px_1fr] sm:p-6">
              {/* Left: temple card */}
              {openAlert.temples ? (
                <div className="flex flex-col items-center gap-3 text-center sm:border-r sm:border-gray-100 sm:pr-6">
                  <div className="h-28 w-28 overflow-hidden rounded-xl bg-brand-gold-soft">
                    {openAlert.temples.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={openAlert.temples.image_url}
                        alt={openAlert.temples.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-3xl text-brand-gold">
                        ॥
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {openAlert.temples.name}
                    </p>
                    {openAlert.temples.location && (
                      <p className="text-xs text-gray-500">
                        {openAlert.temples.location}
                      </p>
                    )}
                  </div>
                  {openAlert.alert_type === "closure" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                      CLOSED
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center sm:border-r sm:border-gray-100 sm:pr-6">
                  <span className="flex h-28 w-28 items-center justify-center rounded-xl bg-brand-gold-soft text-3xl text-brand-gold">
                    ॥
                  </span>
                  <p className="text-xs text-gray-500">All temples</p>
                </div>
              )}

              {/* Right: details */}
              <div className="space-y-3 text-sm">
                {openAlert.description ? (
                  <p className="leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Details: </span>
                    <span className="whitespace-pre-wrap">{openAlert.description}</span>
                  </p>
                ) : (
                  <p className="text-gray-500">
                    No additional details provided for this alert.
                  </p>
                )}

                {(openAlert.starts_at || openAlert.ends_at) && (
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">When: </span>
                    {openAlert.starts_at ? formatDateTimeIn(openAlert.starts_at) : ""}
                    {openAlert.ends_at
                      ? ` — ${formatDateTimeIn(openAlert.ends_at)}`
                      : ""}
                  </p>
                )}

                {/* Map link (text-based; no coordinates stored) */}
                {openAlert.temples && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${openAlert.temples.name} ${openAlert.temples.location ?? ""}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-red hover:text-brand-red-dark"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View on Google Maps
                  </a>
                )}

                {/* Temple contact (shown once contact_phone is populated) */}
                {openAlert.temples?.contact_phone && (
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Temple Contact: </span>
                    <a
                      href={`tel:${openAlert.temples.contact_phone}`}
                      className="text-brand-red hover:underline"
                    >
                      {openAlert.temples.contact_phone}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="sticky bottom-0 flex justify-end gap-2 border-t border-gray-100 bg-card-bg/95 px-5 py-3 backdrop-blur">
              <button
                type="button"
                onClick={close}
                className="rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
              >
                Back to Alerts
              </button>
              <a
                href={openAlert.cta_url ?? "/contact"}
                {...(openAlert.cta_url
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {openAlert.cta_label ?? "Contact Admin"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
