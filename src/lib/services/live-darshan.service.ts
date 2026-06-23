// src/lib/services/live-darshan.service.ts

import { getLiveDarshan } from "../repositories/live-darshan.repository";

export async function fetchLiveDarshan() {
  const data = await getLiveDarshan();

  const now = new Date();

  const nextTiming = data.timings.find((timing) => {
    const [hours, minutes] = timing.opening_time.split(":").map(Number);

    const eventTime = new Date();

    eventTime.setHours(hours);
    eventTime.setMinutes(minutes);
    eventTime.setSeconds(0);

    return eventTime > now;
  });

  if (!nextTiming) {
    return {
      templeName: data.temple.name,
      location: data.temple.location,
      label: "All Darshan Completed Today",
      date: now.toLocaleDateString(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      timings: data.timings,
      nextDarshan: nextTiming,
    };
  }

  const [hours, minutes] = nextTiming.opening_time.split(":").map(Number);

  const nextDate = new Date();

  nextDate.setHours(hours);
  nextDate.setMinutes(minutes);
  nextDate.setSeconds(0);

  const diffMs = nextDate.getTime() - now.getTime();

  const totalSeconds = Math.floor(diffMs / 1000);

  return {
    templeName: data.temple.name,
    location: data.temple.location,
    label: `${nextTiming.label ?? "Darshan"} Begins In`,
    date: now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
