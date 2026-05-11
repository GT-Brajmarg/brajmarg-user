import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditableField from "@/components/account/EditableField";
import PreferenceToggle from "@/components/account/PreferenceToggle";

function formatDate(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatAddress(profile: Record<string, string | null>): string {
  const parts = [
    profile.address_line1,
    profile.address_line2,
    [profile.city, profile.state].filter(Boolean).join(", "),
    profile.pincode,
  ].filter((p) => p && String(p).trim().length > 0);
  return parts.join("\n");
}

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const p = (profile ?? {}) as Record<string, string | null | boolean>;

  const addressDisplay = formatAddress({
    address_line1: (p.address_line1 as string | null) ?? null,
    address_line2: (p.address_line2 as string | null) ?? null,
    city: (p.city as string | null) ?? null,
    state: (p.state as string | null) ?? null,
    pincode: (p.pincode as string | null) ?? null,
  });

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account details
        </p>
      </div>

      {/* Personal Information */}
      <section className="rounded-2xl bg-card-bg border border-gray-200 p-6 sm:p-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <div className="divide-y divide-gray-100">
          <EditableField
            field="full_name"
            label="Full Name"
            value={(p.full_name as string) ?? ""}
            placeholder="Enter your full name"
            icon={
              <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 1116 0" />
              </>
            }
          />
          <EditableField
            field="email"
            label="Email Address"
            value={(p.email as string) ?? ""}
            type="email"
            placeholder="you@example.com"
            icon={
              <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </>
            }
          />
          <EditableField
            field="phone"
            label="Phone Number"
            value={(p.phone as string) ?? ""}
            type="tel"
            placeholder="+91 98765 43210"
            icon={
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.66 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0122 16.92z" />
            }
          />
          <EditableField
            field="date_of_birth"
            label="Date of Birth"
            value={(p.date_of_birth as string) ?? ""}
            type="date"
            display={formatDate((p.date_of_birth as string) ?? null)}
            icon={
              <>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </>
            }
          />
          <EditableField
            field="address_line1"
            label="Address"
            value={(p.address_line1 as string) ?? ""}
            placeholder="Street address"
            display={addressDisplay}
            multiline
            icon={
              <>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </>
            }
          />
          {/* Static row: password is not editable on OTP-auth accounts */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5">
            <div className="flex items-center gap-3 sm:w-44 shrink-0">
              <span className="inline-flex h-5 w-5 items-center justify-center text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 118 0v4" />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-700">Password</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">
                Passwordless sign-in via OTP — no password to manage.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                Secure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="rounded-2xl bg-card-bg border border-gray-200 p-6 sm:p-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
          Preferences
        </h2>
        <div className="divide-y divide-gray-100">
          <PreferenceToggle
            pref="email_notifications"
            initial={Boolean(p.email_notifications ?? true)}
            title="Email Notifications"
            description="Receive updates about orders and offers"
            icon={
              <>
                <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .53-.21 1.04-.59 1.42L4 17h5" />
                <path d="M9 17a3 3 0 006 0" />
              </>
            }
          />
          <PreferenceToggle
            pref="wishlist_private"
            initial={Boolean(p.wishlist_private ?? false)}
            title="Wishlist Privacy"
            description="Make my wishlist private"
            icon={
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            }
          />
        </div>
      </section>
    </div>
  );
}
