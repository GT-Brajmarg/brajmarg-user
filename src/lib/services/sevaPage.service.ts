import {
  getAvailableDatesRepository,
  getFeaturedSevasRepository,
  getSevaTypesRepository,
  getTempleSevasRepository,
} from "@/lib/repositories/sevaPage.repository";

export async function fetchTempleSevas(slug: string) {
  return await getTempleSevasRepository(slug);
}

export async function fetchAvailableDates() {
  return await getAvailableDatesRepository();
}

export async function fetchSevaTypes() {
  return await getSevaTypesRepository();
}

export async function fetchFeaturedSevas({
  date,
  sevaType,
}: {
  date?: string;
  sevaType?: string;
}) {
  return await getFeaturedSevasRepository({
    date,
    sevaType,
  });
}
