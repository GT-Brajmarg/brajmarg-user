import { createClient } from "@/lib/supabase/server";

export async function getTempleLocationRepository(templeId: string) {
  const supabase = await createClient();

  const [
    { data: location, error: locationError },
    { data: nearbyPlaces, error: nearbyError },
  ] = await Promise.all([
    supabase
      .from("temple_locations")
      .select("*")
      .eq("temple_id", templeId)
      .single(),

    supabase
      .from("temple_nearby_places")
      .select("*")
      .eq("temple_id", templeId)
      .order("sort_order", {
        ascending: true,
      }),
  ]);

  if (locationError) throw locationError;
  if (nearbyError) throw nearbyError;

  return {
    location,
    nearbyPlaces,
  };
}
