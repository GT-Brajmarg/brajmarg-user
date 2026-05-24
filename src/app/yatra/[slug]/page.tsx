import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
import { slugify } from "@/lib/slug";
import { seatsLeftForOne } from "@/lib/yatra";
import YatraDetailClient from "@/components/yatra/YatraDetailClient";
import type { YatraPackage } from "@/types/database";

export default async function YatraDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Match by slugified name (name is the source of truth, like temples).
  const { data, error } = await supabase
    .from("yatra_packages")
    .select(
      "*, vehicles(name,vehicle_type,seating_capacity,is_ac,features,image_url)"
    )
    .eq("is_active", true);

  if (error || !data) notFound();

  const pkg = (data as YatraPackage[]).find((p) => slugify(p.name) === slug);
  if (!pkg) notFound();

  // Live seats-left for group packages (null for solo / unconfigured).
  let seatsLeft: number | null = null;
  const admin = createServiceClient();
  if (admin) {
    const info = await seatsLeftForOne(admin, pkg);
    seatsLeft = info.left;
  }

  // Logged-in user's saved details, to prefill + show in the booking flow.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let prefill: { name: string; email: string; phone: string } | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, phone")
      .eq("id", user.id)
      .maybeSingle();
    prefill = {
      name: profile?.full_name ?? "",
      email: profile?.email ?? user.email ?? "",
      phone: profile?.phone ?? "",
    };
  }

  return (
    <main className="flex-1">
      <YatraDetailClient
        pkg={pkg}
        seatsLeft={seatsLeft}
        isLoggedIn={!!user}
        prefill={prefill}
      />
    </main>
  );
}
