"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const EDITABLE_FIELDS = [
  "full_name",
  "email",
  "phone",
  "date_of_birth",
  "address_line1",
  "address_line2",
  "city",
  "state",
  "pincode",
] as const;

type EditableField = (typeof EDITABLE_FIELDS)[number];

function isEditableField(value: string): value is EditableField {
  return (EDITABLE_FIELDS as readonly string[]).includes(value);
}

/**
 * Legacy multi-field save (kept for backwards-compat). The new
 * dashboard uses updateProfileField per row instead.
 */
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address_line1: formData.get("address_line1"),
    address_line2: formData.get("address_line2"),
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode"),
  });

  revalidatePath("/account");
  redirect("/account");
}

export type FieldUpdateResult = {
  ok: boolean;
  error?: string;
};

/**
 * Update a single profile field. Used by the inline-editable rows
 * on the Profile page.
 */
export async function updateProfileField(
  field: string,
  rawValue: string
): Promise<FieldUpdateResult> {
  if (!isEditableField(field)) {
    return { ok: false, error: "Field is not editable." };
  }

  const value = rawValue.trim();

  // Field-level validation
  if (field === "full_name" && value.length < 2) {
    return { ok: false, error: "Name must be at least 2 characters." };
  }
  if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (field === "phone" && value && !/^\+?[0-9][0-9\s-]{6,16}$/.test(value)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (field === "pincode" && value && !/^\d{6}$/.test(value)) {
    return { ok: false, error: "Pincode must be 6 digits." };
  }
  if (field === "date_of_birth" && value && Number.isNaN(Date.parse(value))) {
    return { ok: false, error: "Please enter a valid date." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const payload: Record<string, unknown> = { id: user.id };
  payload[field] = value === "" ? null : value;

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/account");
  return { ok: true };
}

export async function updatePreference(
  pref: "email_notifications" | "wishlist_private",
  enabled: boolean
): Promise<FieldUpdateResult> {
  const allowed = ["email_notifications", "wishlist_private"];
  if (!allowed.includes(pref)) {
    return { ok: false, error: "Unknown preference." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const payload: Record<string, unknown> = { id: user.id };
  payload[pref] = enabled;

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/account");
  return { ok: true };
}
