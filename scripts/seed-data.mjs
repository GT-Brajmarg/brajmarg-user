// ============================================================
// Brajmarg Seed Script
//
// Usage:
//   SUPABASE_SERVICE_KEY=<your_service_role_key> node scripts/seed-data.mjs
//
// SECURITY:
//   - Never commit your service role key.
//   - This script reads it from process.env only.
//   - The .env.local file is gitignored so it's safe there too.
//
// What it does:
//   1. Picks the oldest "Shri Bankey Bihari Temple" (or creates one)
//   2. Removes duplicate temples with the same name
//   3. Wipes existing child rows for that temple
//   4. Inserts: timings, events, prasad, seva, frame, cloth
// ============================================================

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://queccehgtycwfrzmocyl.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error(
    "ERROR: SUPABASE_SERVICE_KEY env var is required.\n" +
      "Get it from Supabase Dashboard > Settings > API > service_role secret"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function ok(label, p) {
  const { data, error } = await p;
  if (error) {
    console.error(`✗ ${label}:`, error.message);
    throw error;
  }
  console.log(`✓ ${label}`);
  return data;
}

async function main() {
  // ---- 1. Find or create the main temple --------------------
  const { data: existing } = await supabase
    .from("temples")
    .select("id, name, created_at")
    .eq("name", "Shri Bankey Bihari Temple")
    .order("created_at", { ascending: true });

  let templeId;
  if (existing && existing.length > 0) {
    templeId = existing[0].id;
    console.log(`✓ Using existing temple ${templeId}`);

    // Update its image_url + description if missing
    await ok(
      "update temple metadata",
      supabase
        .from("temples")
        .update({
          image_url:
            "/illustrations/temple-hero.svg",
          description:
            "One of the most revered temples in Vrindavan dedicated to Lord Krishna in his Bankey Bihari form. Famous for its unique darshan tradition.",
          is_active: true,
          is_coming_soon: false,
        })
        .eq("id", templeId)
    );

    // Remove duplicates (cascade will clean their child rows)
    if (existing.length > 1) {
      const dupIds = existing.slice(1).map((r) => r.id);
      await ok(
        `remove ${dupIds.length} duplicate temple(s)`,
        supabase.from("temples").delete().in("id", dupIds)
      );
    }
  } else {
    const { data: created, error } = await supabase
      .from("temples")
      .insert({
        name: "Shri Bankey Bihari Temple",
        location: "Vrindavan",
        description:
          "One of the most revered temples in Vrindavan dedicated to Lord Krishna in his Bankey Bihari form. Famous for its unique darshan tradition.",
        image_url:
          "/illustrations/temple-hero.svg",
        is_active: true,
        is_coming_soon: false,
        display_order: 1,
      })
      .select("id")
      .single();
    if (error) throw error;
    templeId = created.id;
    console.log(`✓ Created new temple ${templeId}`);
  }

  // ---- 2. Wipe existing child rows --------------------------
  const childTables = [
    "cloth_items",
    "frame_items",
    "seva_items",
    "prasad_items",
    "temple_timings",
    "events",
  ];
  for (const t of childTables) {
    await ok(`wipe ${t}`, supabase.from(t).delete().eq("temple_id", templeId));
  }

  // ---- 3. Temple timings ------------------------------------
  await ok(
    "insert temple_timings",
    supabase.from("temple_timings").insert([
      { temple_id: templeId, day_of_week: "daily", opening_time: "07:45", closing_time: "12:00", label: "Shringar Aarti", special_note: "Morning darshan begins after Mangal Aarti" },
      { temple_id: templeId, day_of_week: "daily", opening_time: "11:00", closing_time: "11:30", label: "Rajbhog Bhog",   special_note: "56 bhog offered to the deity" },
      { temple_id: templeId, day_of_week: "daily", opening_time: "12:00", closing_time: "17:30", label: "Vishram",        special_note: "Temple closed for deity rest" },
      { temple_id: templeId, day_of_week: "daily", opening_time: "17:30", closing_time: "21:30", label: "Shayan Darshan", special_note: "Evening darshan and Shayan Aarti" },
      { temple_id: templeId, day_of_week: "daily", opening_time: "20:00", closing_time: "20:30", label: "Shayan Aarti",   special_note: "Final aarti before deity rest" },
    ])
  );

  // ---- 4. Events --------------------------------------------
  const dayOffset = (n) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().split("T")[0];
  };
  await ok(
    "insert events",
    supabase.from("events").insert([
      { temple_id: templeId, name: "Jhulan Yatra", event_date: dayOffset(15), description: "The swinging festival of Lord Krishna. A highly auspicious time when deities are placed on decorated swings and devotees offer prayers.", is_active: true },
      { temple_id: templeId, name: "Janmashtami",  event_date: dayOffset(26), description: "The grand celebration of Lord Krishna's birth. Special midnight aarti, abhishek, and bhog offerings.", is_active: true },
      { temple_id: templeId, name: "Radhashtami",  event_date: dayOffset(40), description: "Birth anniversary of Shrimati Radharani. Special darshan and 56 bhog offerings.", is_active: true },
    ])
  );

  // ---- 5. Prasad --------------------------------------------
  await ok(
    "insert prasad_items",
    supabase.from("prasad_items").insert([
      { temple_id: templeId, name: "Besan Ladoo",       price: 151, ingredients: "Besan, Ghee, Sugar, Dry Fruits", image_url: "/illustrations/prasad.svg", in_stock: true,  display_order: 1 },
      { temple_id: templeId, name: "Peda",              price: 201, ingredients: "Khoya, Sugar, Cardamom",          image_url: "/illustrations/prasad.svg", in_stock: true,  display_order: 2 },
      { temple_id: templeId, name: "Makhan Mishri",     price: 101, ingredients: "Fresh Butter, Rock Sugar",        image_url: "/illustrations/prasad.svg",  in_stock: false, display_order: 3 },
      { temple_id: templeId, name: "Panchamrit",        price: 251, ingredients: "Milk, Curd, Honey, Ghee, Sugar",  image_url: "/illustrations/prasad.svg", in_stock: true,  display_order: 4 },
      { temple_id: templeId, name: "Mathura Pedha",     price: 301, ingredients: "Pure Khoya, Cardamom, Sugar",     image_url: "/illustrations/prasad.svg", in_stock: true,  display_order: 5 },
      { temple_id: templeId, name: "Tulsi Mala Prasad", price: 51,  ingredients: "Tulsi Beads, Sacred Thread",      image_url: "/illustrations/prasad.svg", in_stock: true,  display_order: 6 },
    ])
  );

  // ---- 6. Seva ----------------------------------------------
  await ok(
    "insert seva_items",
    supabase.from("seva_items").insert([
      { temple_id: templeId, name: "Rajbhog Seva",       price: 1100, time: "11:30 AM", details: "Offering of an elaborate mid-day meal to the deity. Includes 56 types of bhog.", significance: "Performing Rajbhog Seva brings prosperity and peace to the family.", is_active: true, display_order: 1 },
      { temple_id: templeId, name: "Phool Bangla Seva",  price: 5100, time: "05:00 PM", details: "Decoration of the temple with exotic flowers.", significance: "Offering fragrant flowers pleases the deity and invokes divine blessings for harmony.", is_active: true, display_order: 2 },
      { temple_id: templeId, name: "Mangala Aarti Seva", price: 501,  time: "04:30 AM", details: "Sponsor the morning Mangal Aarti — the first darshan of the day.", significance: "Mangal Aarti is the most sacred aarti, granting auspicious beginnings.", is_active: true, display_order: 3 },
      { temple_id: templeId, name: "Tulsi Vivah Seva",   price: 2100, time: "06:00 PM", details: "Sacred marriage ritual of Tulsi performed in the temple courtyard.", significance: "Sponsoring this seva is considered equivalent to performing one's own daughter's wedding.", is_active: true, display_order: 4 },
    ])
  );

  // ---- 7. Frames (with size variants) -----------------------
  await ok(
    "insert frame_items",
    supabase.from("frame_items").insert([
      // Bankey Bihari Portrait — 3 sizes
      { temple_id: templeId, name: "Bankey Bihari Ji Portrait – Wooden Frame", material: "Teak Wood, Glass, High-Res Print", price: 501,  size: "8x10",  image_url: "/illustrations/frame.svg", in_stock: true, display_order: 1 },
      { temple_id: templeId, name: "Bankey Bihari Ji Portrait – Wooden Frame", material: "Teak Wood, Glass, High-Res Print", price: 901,  size: "12x18", image_url: "/illustrations/frame.svg", in_stock: true, display_order: 2 },
      { temple_id: templeId, name: "Bankey Bihari Ji Portrait – Wooden Frame", material: "Teak Wood, Glass, High-Res Print", price: 1501, size: "16x24", image_url: "/illustrations/frame.svg", in_stock: true, display_order: 3 },
      // Radha Krishna Canvas — 3 sizes
      { temple_id: templeId, name: "Radha Krishna Canvas", material: "Premium Canvas, UV Coating", price: 701,  size: "8x10",  image_url: "/illustrations/frame.svg", in_stock: true, display_order: 4 },
      { temple_id: templeId, name: "Radha Krishna Canvas", material: "Premium Canvas, UV Coating", price: 1201, size: "12x18", image_url: "/illustrations/frame.svg", in_stock: true, display_order: 5 },
      { temple_id: templeId, name: "Radha Krishna Canvas", material: "Premium Canvas, UV Coating", price: 1801, size: "16x24", image_url: "/illustrations/frame.svg", in_stock: true, display_order: 6 },
      // Govardhan — 2 sizes
      { temple_id: templeId, name: "Govardhan Hill Photo Frame", material: "MDF, Acrylic Sheet, Digital Print", price: 351, size: "6x8",   image_url: "/illustrations/frame.svg", in_stock: true, display_order: 7 },
      { temple_id: templeId, name: "Govardhan Hill Photo Frame", material: "MDF, Acrylic Sheet, Digital Print", price: 651, size: "10x14", image_url: "/illustrations/frame.svg", in_stock: true, display_order: 8 },
    ])
  );

  // ---- 8. Cloth / Poshak ------------------------------------
  await ok(
    "insert cloth_items",
    supabase.from("cloth_items").insert([
      { temple_id: templeId, name: "Zari Poshak – Red",     material: "Silk, Zari Thread",              price: 751,  sizes: ["0","1","2","3"], colors: ["Red","Maroon","Pink"],                  image_url: "/illustrations/cloth.svg", in_stock: true, display_order: 1 },
      { temple_id: templeId, name: "Cotton Summer Poshak",  material: "Pure Cotton",                    price: 301,  sizes: ["0","1","2","3"], colors: ["White","Yellow","Light Blue"],          image_url: "/illustrations/cloth.svg", in_stock: true, display_order: 2 },
      { temple_id: templeId, name: "Festival Silk Poshak",  material: "Banarasi Silk, Gold Embroidery", price: 1501, sizes: ["0","1","2","3"], colors: ["Gold","Royal Blue","Emerald Green"],   image_url: "/illustrations/cloth.svg", in_stock: true, display_order: 3 },
      { temple_id: templeId, name: "Winter Velvet Poshak",  material: "Velvet, Pearl Work",             price: 1201, sizes: ["0","1","2","3"], colors: ["Maroon","Navy Blue","Forest Green"],   image_url: "/illustrations/frame.svg", in_stock: true, display_order: 4 },
    ])
  );

  console.log("\n✅ Seed complete. Temple id: " + templeId);
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
