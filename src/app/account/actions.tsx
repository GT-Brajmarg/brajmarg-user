"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
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

  redirect("/account");
}
