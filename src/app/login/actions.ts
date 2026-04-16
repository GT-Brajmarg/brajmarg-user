"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isValidE164, isValidEmail } from "@/lib/identifier";

function safeNext(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  if (!value.startsWith("/") || value.startsWith("//")) return "";
  return value;
}

function loginErrorRedirect(message: string, next: string): never {
  const params = new URLSearchParams({ error: message });
  if (next) params.set("next", next);
  redirect(`/login?${params.toString()}`);
}

/**
 * Send a one-time code. Accepts EITHER a mobile (E.164) or an email
 * via the unified `identifier` form field.
 */
export async function sendOtp(formData: FormData) {
  const supabase = await createClient();

  const identifier = ((formData.get("identifier") as string) ?? "").trim();
  const mode = (formData.get("identifier_mode") as string) ?? "phone";
  const next = safeNext(formData.get("next"));

  if (!identifier) {
    loginErrorRedirect("Please enter your mobile number or email.", next);
  }

  if (mode === "email") {
    if (!isValidEmail(identifier)) {
      loginErrorRedirect("Please enter a valid email address.", next);
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: identifier,
      options: { shouldCreateUser: true },
    });

    if (error) loginErrorRedirect(error.message, next);

    const params = new URLSearchParams({ email: identifier });
    if (next) params.set("next", next);
    redirect(`/login/verify?${params.toString()}`);
  }

  // Phone branch
  if (!isValidE164(identifier)) {
    loginErrorRedirect(
      "Please enter a valid mobile number including country code.",
      next
    );
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: identifier,
  });

  if (error) loginErrorRedirect(error.message, next);

  const params = new URLSearchParams({ phone: identifier });
  if (next) params.set("next", next);
  redirect(`/login/verify?${params.toString()}`);
}

/**
 * Verify the OTP. Accepts either a `phone` or `email` field
 * (whichever was used to send the code).
 */
export async function verifyOtp(formData: FormData) {
  const supabase = await createClient();

  const phone = (formData.get("phone") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const otp = ((formData.get("otp") as string) ?? "").trim();
  const next = safeNext(formData.get("next")) || "/";

  if (!otp) {
    const params = new URLSearchParams({
      error: "Please enter the OTP.",
    });
    if (phone) params.set("phone", phone);
    if (email) params.set("email", email);
    if (next !== "/") params.set("next", next);
    redirect(`/login/verify?${params.toString()}`);
  }

  if (phone) {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });
    if (error) {
      const params = new URLSearchParams({
        phone,
        error: error.message,
      });
      if (next !== "/") params.set("next", next);
      redirect(`/login/verify?${params.toString()}`);
    }
  } else if (email) {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      const params = new URLSearchParams({
        email,
        error: error.message,
      });
      if (next !== "/") params.set("next", next);
      redirect(`/login/verify?${params.toString()}`);
    }
  } else {
    redirect("/login");
  }

  // Ensure a profile row exists for this user.
  // We seed it with phone/email only — the rest of the details
  // (name, address, etc.) are collected at checkout time.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        phone: user.phone ?? null,
        email: user.email ?? null,
      },
      { onConflict: "id", ignoreDuplicates: false }
    );
  }

  revalidatePath("/", "layout");
  redirect(next);
}
