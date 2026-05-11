import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AccountSidebar from "@/components/account/Sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  // Read core fields first (always present)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, phone")
    .eq("id", user.id)
    .single();

  // membership_tier is in the optional account_extras migration —
  // fall back gracefully if the column doesn't exist yet.
  let tier: string = "gold";
  const { data: tierRow } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("id", user.id)
    .maybeSingle();
  if (tierRow && (tierRow as { membership_tier?: string }).membership_tier) {
    tier = (tierRow as { membership_tier?: string }).membership_tier!;
  }

  const fullName =
    (profile?.full_name as string | null) ||
    (user.user_metadata?.full_name as string | undefined) ||
    (profile?.email as string | null) ||
    (profile?.phone as string | null) ||
    "Devotee";

  const email = (profile?.email as string | null) ?? user.email ?? null;

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 lg:gap-8">
          <AccountSidebar
            fullName={fullName}
            email={email}
            membershipTier={tier}
          />

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </main>
  );
}
