import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { updateProfile } from "./actions";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#f8f4ef] py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-red">
            My Account
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Manage Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update your personal details and delivery address.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">
          {/* Top Section */}
          <div className="bg-[#fdf7f3] border-b border-gray-100 px-6 md:px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white text-lg font-bold shadow-sm">
                {profile?.full_name
                  ?.split(" ")
                  ?.map((n: string) => n[0])
                  ?.slice(0, 2)
                  ?.join("")
                  ?.toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile?.full_name || "User"}
                </h2>

                <p className="text-sm text-gray-500">
                  Keep your details updated for faster checkout
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form action={updateProfile} className="p-6 md:p-8 space-y-8">
            {/* Personal Info */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="full_name"
                    defaultValue={profile?.full_name ?? ""}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    defaultValue={profile?.pincode ?? ""}
                    placeholder="Enter pincode"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                    <span>Email</span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        profile?.is_email_verified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {profile?.is_email_verified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </label>

                  <input
                    name="email"
                    defaultValue={profile?.email ?? ""}
                    placeholder="Enter email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                    <span>Phone</span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        profile?.is_phone_verified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {profile?.is_phone_verified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </label>

                  <input
                    name="phone"
                    defaultValue={profile?.phone ?? ""}
                    placeholder="Enter phone"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Address
              </h3>

              <div className="space-y-4">
                <input
                  name="address_line1"
                  defaultValue={profile?.address_line1 ?? ""}
                  placeholder="Address Line 1"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                />

                <input
                  name="address_line2"
                  defaultValue={profile?.address_line2 ?? ""}
                  placeholder="Address Line 2"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="city"
                    defaultValue={profile?.city ?? ""}
                    placeholder="City"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />

                  <input
                    name="state"
                    defaultValue={profile?.state ?? ""}
                    placeholder="State"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </section>

            {/* Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-red-dark active:scale-[0.98] transition-all"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}