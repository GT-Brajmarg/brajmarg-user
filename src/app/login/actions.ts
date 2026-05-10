"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
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

function getPhoneAllowlist(): string[] {
  const raw = process.env.LOGIN_ALLOWED_PHONES ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isPhoneAllowed(phone: string): boolean {
  const list = getPhoneAllowlist();
  if (list.length === 0) return true;
  return list.includes(phone);
}

/* --------------------------------------------------------------- */
/*  Test-phone bypass                                              */
/* --------------------------------------------------------------- */

/**
 * Returns the configured test phone number (E.164) if the bypass is
 * enabled, else null. Empty TEST_PHONE_NUMBER disables the bypass.
 */
function getTestPhone(): string | null {
  const v = (process.env.TEST_PHONE_NUMBER ?? "").trim();
  return v || null;
}

function getTestOtp(): string {
  return (process.env.TEST_PHONE_OTP ?? "").trim();
}

function isTestPhone(phone: string): boolean {
  const test = getTestPhone();
  return test !== null && phone === test;
}

/**
 * Synthetic email used for the test phone's Supabase user record.
 * `+919876543210` -> `test-919876543210@brajmarg.local`
 */
function syntheticEmailFor(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `test-${digits}@brajmarg.local`;
}

/**
 * Sign the test user in by minting a real Supabase session via the
 * admin API + magic-link token exchange. Sets the auth cookies on
 * the current SSR response.
 */
async function loginAsTestUser(phone: string): Promise<{
  ok: boolean;
  error?: string;
}> {
  const admin = createServiceClient();
  if (!admin) {
    return {
      ok: false,
      error:
        "Test-phone login is not configured. Add SUPABASE_SERVICE_ROLE_KEY to your .env file.",
    };
  }

  const email = syntheticEmailFor(phone);

  // Ensure the user exists. listUsers is paginated; for a one-off
  // test user we just check page 1 (default 50/page is plenty).
  const { data: list, error: listErr } = await admin.auth.admin.listUsers();
  if (listErr) return { ok: false, error: listErr.message };

  let user = list.users.find(
    (u) => u.email === email || u.phone === phone.replace(/^\+/, "")
  );

  if (!user) {
    const { data: created, error: createErr } =
      await admin.auth.admin.createUser({
        email,
        phone,
        email_confirm: true,
        phone_confirm: true,
      });
    if (createErr) return { ok: false, error: createErr.message };
    user = created.user ?? undefined;
    if (!user) return { ok: false, error: "Failed to create test user." };
  }

  // Generate a magic link to the synthetic email so we can exchange
  // its hashed_token for a real session via the SSR client.
  const { data: linkData, error: linkErr } =
    await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

  if (linkErr) return { ok: false, error: linkErr.message };
  const tokenHash = linkData?.properties?.hashed_token;
  if (!tokenHash) {
    return { ok: false, error: "Could not mint test session token." };
  }

  // SSR client — verifyOtp with token_hash sets the auth cookies on
  // the outgoing response, exactly like a normal login.
  const ssr = await createClient();
  const { error: verifyErr } = await ssr.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });
  if (verifyErr) return { ok: false, error: verifyErr.message };

  // Seed the profile row (same as the regular flow)
  const {
    data: { user: signedIn },
  } = await ssr.auth.getUser();
  if (signedIn) {
    await ssr.from("profiles").upsert(
      {
        id: signedIn.id,
        phone: phone,
        email: signedIn.email ?? null,
      },
      { onConflict: "id", ignoreDuplicates: false }
    );
  }

  return { ok: true };
}

/* --------------------------------------------------------------- */
/*  Server actions                                                 */
/* --------------------------------------------------------------- */

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

  if (!isPhoneAllowed(identifier)) {
    loginErrorRedirect(
      "This mobile number is not authorised to log in yet. Please contact support.",
      next
    );
  }

  // Test-phone bypass: skip Supabase OTP entirely and send the user
  // straight to the verify screen, where any real OTP request would
  // have landed them too.
  if (isTestPhone(identifier)) {
    const params = new URLSearchParams({ phone: identifier });
    if (next) params.set("next", next);
    redirect(`/login/verify?${params.toString()}`);
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
 * Resend OTP — used by the client-side resend button. Unlike sendOtp
 * this does NOT redirect; it returns a status so the UI can keep its
 * countdown state and show inline feedback.
 */
export async function resendOtp(input: {
  phone?: string;
  email?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const phone = (input.phone ?? "").trim();
  const email = (input.email ?? "").trim();

  if (phone) {
    if (!isValidE164(phone)) {
      return { ok: false, error: "Invalid mobile number." };
    }
    if (!isPhoneAllowed(phone)) {
      return {
        ok: false,
        error: "This mobile number is not authorised to log in.",
      };
    }
    if (isTestPhone(phone)) {
      // No-op for the test bypass — the OTP is fixed.
      return { ok: true };
    }
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  if (email) {
    if (!isValidEmail(email)) {
      return { ok: false, error: "Invalid email address." };
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  return { ok: false, error: "Missing phone or email." };
}

/**
 * Verify the OTP. Accepts either a `phone` or `email` field
 * (whichever was used to send the code).
 */
export async function verifyOtp(formData: FormData) {
  const supabase = await createClient();

  const phone = ((formData.get("phone") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const otp = ((formData.get("otp") as string) ?? "").trim();
  const next = safeNext(formData.get("next")) || "/";

  if (!otp) {
    const params = new URLSearchParams({ error: "Please enter the OTP." });
    if (phone) params.set("phone", phone);
    if (email) params.set("email", email);
    if (next !== "/") params.set("next", next);
    redirect(`/login/verify?${params.toString()}`);
  }

  // Test-phone bypass — match the configured fixed OTP and mint a
  // real Supabase session via the admin API.
  if (phone && isTestPhone(phone)) {
    if (otp !== getTestOtp()) {
      const params = new URLSearchParams({
        phone,
        error: "Incorrect OTP. Please try again.",
      });
      if (next !== "/") params.set("next", next);
      redirect(`/login/verify?${params.toString()}`);
    }

    const result = await loginAsTestUser(phone);
    if (!result.ok) {
      const params = new URLSearchParams({
        phone,
        error: result.error ?? "Test login failed.",
      });
      if (next !== "/") params.set("next", next);
      redirect(`/login/verify?${params.toString()}`);
    }

    revalidatePath("/", "layout");
    redirect(next);
  }

  if (phone) {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });
    if (error) {
      const params = new URLSearchParams({ phone, error: error.message });
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
      const params = new URLSearchParams({ email, error: error.message });
      if (next !== "/") params.set("next", next);
      redirect(`/login/verify?${params.toString()}`);
    }
  } else {
    redirect("/login");
  }

  // Ensure a profile row exists for this user.
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

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
