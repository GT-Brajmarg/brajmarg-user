"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { toIndianE164 } from "@/lib/identifier";

export type ContactFormState = {
  ok: boolean;
  message: string;
  errors?: Partial<
    Record<"full_name" | "email" | "phone" | "subject" | "message", string>
  >;
  values?: {
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: ContactFormState["values"]) {
  const errors: ContactFormState["errors"] = {};
  if (!values) return { errors };

  if (!values.full_name.trim()) {
    errors.full_name = "Please enter your full name.";
  } else if (values.full_name.trim().length < 2) {
    errors.full_name = "Name must be at least 2 characters.";
  } else if (values.full_name.trim().length > 80) {
    errors.full_name = "Name is too long (max 80 characters).";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.phone.trim() && !toIndianE164(values.phone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please choose a subject.";
  }

  const msg = values.message.trim();
  if (!msg) {
    errors.message = "Please write a message.";
  } else if (msg.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (msg.length > 2000) {
    errors.message = "Message is too long (max 2000 characters).";
  }

  return { errors };
}

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values = {
    full_name: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot — silent drop if filled (bots only)
  if (String(formData.get("company") ?? "").trim()) {
    return { ok: true, message: "Thanks — we'll be in touch soon." };
  }

  const { errors } = validate(values);
  if (errors && Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
      values,
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const hdrs = await headers();
    const userAgent = hdrs.get("user-agent") ?? null;
    const ip =
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      hdrs.get("x-real-ip") ??
      null;

    const { error } = await supabase.from("contact_messages").insert({
      full_name: values.full_name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim() ? toIndianE164(values.phone) : null,
      subject: values.subject.trim(),
      message: values.message.trim(),
      user_id: user?.id ?? null,
      user_agent: userAgent,
      ip_address: ip,
    });

    if (error) {
      return {
        ok: false,
        message:
          "We couldn't send your message right now. Please try again in a moment.",
        values,
      };
    }

    return {
      ok: true,
      message:
        "Thank you for reaching out — our team will get back to you within 24 hours.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Something went wrong on our side. Please try again or email us directly.",
      values,
    };
  }
}
