import { createClient } from "@/lib/supabase/server";

export async function getTempleSevasRepository(slug: string) {
  const supabase = await createClient();

  // Find temple from slug
  const formattedTempleName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { data: temple, error: templeError } = await supabase
    .from("temples")
    .select("id, name")
    .ilike("name", formattedTempleName)
    .single();

  if (templeError || !temple) {
    throw new Error("Temple not found.");
  }

  const { data, error } = await supabase
    .from("seva_items")
    .select(
      `
      id,
      temple_id,
      name,
      price,
      time,
      details,
      significance,
      image_url,
      seva_type,
      allow_direct_payment,
      allow_cod,
      display_order,
      temples(
        id,
        name,
        location,
        image_url
      )
    `,
    )
    .eq("temple_id", temple.id)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAvailableDatesRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_available_dates")
    .select("id, available_date")
    .eq("is_active", true)
    .order("available_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const uniqueDates = Array.from(
    new Map(data.map((item) => [item.available_date, item])).values(),
  );

  return uniqueDates;
}

export async function getSevaTypesRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seva_items")
    .select("seva_type")
    .eq("is_active", true);

  if (error) {
    throw new Error(error.message);
  }

  return [...new Set(data.map((item) => item.seva_type).filter(Boolean))];
}

export async function getFeaturedSevasRepository({
  date,
  sevaType,
}: {
  date?: string;
  sevaType?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("seva_items")
    .select(
      `
      *,
      temples(
        id,
        name,
        location,
        image_url
      )
    `,
    )
    .eq("is_active", true);

  if (sevaType) {
    query = query.eq("seva_type", sevaType);
  }

  if (date) {
    const { data: dateRows } = await supabase
      .from("seva_available_dates")
      .select("seva_item_id")
      .eq("available_date", date);

    const ids = dateRows?.map((row) => row.seva_item_id) ?? [];

    query = query.in("id", ids);
  }

  const { data, error } = await query.order("display_order", {
    ascending: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
