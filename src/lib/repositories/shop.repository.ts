import { createClient } from "@/lib/supabase/server";

const CATEGORY_TABLE_MAP: Record<string, string> = {
  frames: "frame_items",
  prasad: "prasad_items",
  poshak: "cloth_items",
};

interface ShopPayload {
  categories?: string[];
  collection?: string;
  query?: string;
}

export async function getShopProductsRepository({
  categories = [],
  collection,
  query,
}: ShopPayload) {
  const supabase = await createClient();

  const products: any[] = [];

  const tables =
    categories.length > 0
      ? categories
          .map((category) => ({
            category,
            table: CATEGORY_TABLE_MAP[category],
          }))
          .filter((item) => item.table)
      : Object.entries(CATEGORY_TABLE_MAP).map(([category, table]) => ({
          category,
          table,
        }));

  for (const { category, table } of tables) {
    let dbQuery = supabase
      .from(table)
      .select(
        `
        *,
        temples (
          id,
          name,
       
          location,
          image_url
        )
      `,
      )
      .eq("in_stock", true);

    switch (collection) {
      case "best-sellers":
        dbQuery = dbQuery.eq("is_best_seller", true);
        break;

      case "festival-specials":
        dbQuery = dbQuery.eq("is_festival_special", true);
        break;

      case "new-arrivals":
        dbQuery = dbQuery.eq("is_new_arrival", true);
        break;

      case "handcrafted":
        dbQuery = dbQuery.eq("is_handcrafted", true);
        break;
    }

    const { data, error } = await dbQuery.order("display_order", {
      ascending: true,
    });

    if (error) {
      console.log("Table:", table);
      console.log(error);
      throw error;
    }

    products.push(
      ...(data ?? []).map((item) => ({
        ...item,
        category,
      })),
    );
  }

  let filteredProducts = products;

  // Category filter
  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      categories.includes(product.category),
    );
  }

  // Global Search
  if (query?.trim()) {
    const q = query.toLowerCase().trim();

    filteredProducts = filteredProducts.filter((product) => {
      const searchable = [
        product.name,
        product.description,
        product.category,
        product.temples?.name,
        product.temples?.location,

        // frame
        product.material,

        // prasad
        product.ingredients,

        // cloth
        product.fabric,
        product.color,

        product.tags,
      ];

      return searchable
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q));
    });
  }

  return filteredProducts;
}
