"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function sendOtp(formData: FormData) {
  const supabase = await createClient();
  const phone = formData.get("phone") as string;

  // Format: ensure +91 prefix for Indian numbers
  const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

  const { error } = await supabase.auth.signInWithOtp({
    phone: formattedPhone,
  });

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  redirect("/login/verify?phone=" + encodeURIComponent(formattedPhone));
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createClient();
  const phone = formData.get("phone") as string;
  const otp = formData.get("otp") as string;

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });

  if (error) {
    redirect(
      "/login/verify?phone=" +
        encodeURIComponent(phone) +
        "&error=" +
        encodeURIComponent(error.message)
    );
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// Email + password login (kept as fallback)
export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signupWithEmail(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}
