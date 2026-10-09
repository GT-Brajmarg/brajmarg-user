import {
  getTempleBySlug,
  getTempleTimings,
  getTemples,
} from "../repositories/temple.repository";

import { getTempleAlerts } from "../repositories/alert.repository";

export async function fetchTemples() {
  return getTemples();
}

export async function fetchTempleDetails(slug: string) {
  const temple = await getTempleBySlug(slug);

  if (!temple) {
    throw new Error("Temple not found");
  }

  const [timings, alerts] = await Promise.all([
    getTempleTimings(temple.id),
    getTempleAlerts(temple.id),
  ]);

  return {
    temple,
    timings,
    alerts,
  };
}
