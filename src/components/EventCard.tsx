"use client";

import { useCallback, useId, useState } from "react";
import type { Event } from "@/types/database";
import { formatDateIn } from "@/lib/format";

export default function EventCard({
  event,
  templeName,
}: {
  event: Event;
  templeName: string;
}) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-start justify-between rounded-xl border border-gray-200 bg-card-bg p-5 text-left hover:shadow-md transition-shadow"
      >
        <div className="space-y-1 pr-3">
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
            {formatDateIn(event.event_date)}
          </span>

          <h3 className="text-base font-semibold text-gray-900">{event.name}</h3>
          <p className="text-sm text-brand-red">at {templeName}</p>
        </div>

        <span className="shrink-0 p-1 text-gray-400" aria-hidden>
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
        </span>
      </button>

      {open && (
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
            className="relative z-[81] w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-card-bg shadow-xl border border-gray-100"
          >
            <div className="sticky top-0 flex justify-end bg-card-bg/95 backdrop-blur border-b border-gray-100 px-3 py-2">
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {event.image_url && (
              <div className="relative aspect-[16/9] w-full bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-5 space-y-3">
              <p className="text-xs font-medium text-brand-red">
                {formatDateIn(event.event_date)} · {templeName}
              </p>
              <h2 id={dialogId} className="text-xl font-bold text-gray-900">
                {event.name}
              </h2>
              {event.description ? (
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Details for this alert will appear here when provided from the
                  admin backend.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
