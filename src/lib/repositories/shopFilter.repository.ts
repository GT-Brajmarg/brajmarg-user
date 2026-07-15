import { createClient } from "@/lib/supabase/server";

export async function getShopFiltersRepository(categories: string[]) {
  const supabase = await createClient();

  const filters = {
    materials: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    quantities: [] as string[],
  };

  if (categories.includes("frames")) {
    const { data: materials } = await supabase
      .from("frame_material_options")
      .select("material_name")
      .order("display_order");

    const { data: sizes } = await supabase
      .from("frame_size_options")
      .select("size_label")
      .order("display_order");

    filters.materials.push(
      ...new Set(materials?.map((m) => m.material_name) ?? []),
    );

    filters.sizes.push(...new Set(sizes?.map((s) => s.size_label) ?? []));
  }

  if (categories.includes("prasad")) {
    const { data: quantities } = await supabase
      .from("prasad_quantity_options")
      .select("quantity_label")
      .eq("is_active", true)
      .order("display_order");

    filters.quantities.push(
      ...new Set(quantities?.map((q) => q.quantity_label) ?? []),
    );
  }

  if (categories.includes("poshak")) {
    const { data: colors } = await supabase
      .from("cloth_color_options")
      .select("color_name")
      .order("display_order");

    const { data: sizes } = await supabase
      .from("cloth_size_options")
      .select("size_label")
      .order("display_order");

    filters.colors.push(...new Set(colors?.map((c) => c.color_name) ?? []));

    filters.sizes.push(...new Set(sizes?.map((s) => s.size_label) ?? []));
  }

  filters.materials = [...new Set(filters.materials)];
  filters.colors = [...new Set(filters.colors)];
  filters.sizes = [...new Set(filters.sizes)];
  filters.quantities = [...new Set(filters.quantities)];

  return filters;
}
