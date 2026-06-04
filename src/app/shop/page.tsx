import { createClient } from "@/utils/supabase/server";
import ShopClient from "@/components/shop/ShopClient";

export default async function ShopPage() {
  const supabase = await createClient();

  const [{ data: prasad }, { data: frames }, { data: cloths }] =
    await Promise.all([
      supabase
        .from("prasad_items")
        .select(
          "*, product_images:prasad_images(image_url,is_primary,display_order)",
        )
        .eq("in_stock", true)
        .order("display_order"),

      supabase
        .from("frame_items")
        .select(
          "*, product_images:frame_images(image_url,is_primary,display_order)",
        )
        .eq("in_stock", true)
        .order("display_order"),

      supabase
        .from("cloth_items")
        .select(
          "*, product_images:cloth_images(image_url,is_primary,display_order)",
        )
        .eq("in_stock", true)
        .order("display_order"),
    ]);

  return (
    <ShopClient
      prasad={prasad ?? []}
      frames={frames ?? []}
      cloths={cloths ?? []}
    />
  );
}
