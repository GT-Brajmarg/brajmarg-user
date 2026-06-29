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
    eventTime.setMilliseconds(0);

    return eventTime > now;
  });

  let targetTiming = nextTiming;
  let targetDate = new Date();

  if (nextTiming) {
    const [hours, minutes] = nextTiming.opening_time.split(":").map(Number);

    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);
  } else {
    // Show first darshan of tomorrow
    targetTiming = data.timings[0];

    const [hours, minutes] = targetTiming.opening_time.split(":").map(Number);

    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);
  }

  const diffMs = targetDate.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  return {
    templeName: data.temple.name,
    location: data.temple.location,
    label: `${targetTiming?.label ?? "Darshan"} Begins In`,
    date: targetDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    timings: data.timings,
    nextDarshan: targetTiming,
  };
}
