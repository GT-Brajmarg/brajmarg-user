import { createClient } from "@/lib/supabase/server";

export async function getTempleGalleryRepository(templeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("temple_gallery")
    .select(
      `
        id,
        temple_id,
        image_url,
        sort_order,
        title,
        alt_text,
        created_at
      `,
    )
    .eq("temple_id", templeId)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
