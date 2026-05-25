"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactMessage, type ContactFormState } from "./actions";
import { toIndianE164 } from "@/lib/identifier";

const INITIAL_STATE: ContactFormState = { ok: false, message: "" };

const SUBJECTS = [
  "General enquiry",
  "Order or seva support",
  "Temple partnership",
  "Feedback / suggestion",
  "Press & media",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ClientErrors = Partial<
  Record<"full_name" | "email" | "phone" | "subject" | "message", string>
>;

function validateField(name: keyof ClientErrors, value: string): string {
  const v = value.trim();
  switch (name) {
    case "full_name":
      if (!v) return "Please enter your full name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > 80) return "Name is too long (max 80 characters).";
      return "";
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return "";
    case "phone":
      // Optional, but if provided must be a valid 10-digit Indian mobile.
      if (v && !toIndianE164(v)) return "Enter a valid 10-digit mobile number.";
      return "";
    case "subject":
      if (!v) return "Please choose a subject.";
      return "";
    case "message":
      if (!v) return "Please write a message.";
      if (v.length < 10) return "Message must be at least 10 characters.";
      if (v.length > 2000) return "Message is too long (max 2000 characters).";
      return "";
  }
}

export default function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactMessage,
    INITIAL_STATE
  );

  // Remount inner form on each successful submission so all uncontrolled
  // inputs and field-level UI state clear in one shot — keeps us out of
  // the "setState in effect" anti-pattern.
  return (
    <ContactFormInner
      key={state.ok ? `ok-${state.message}` : "edit"}
      state={state}
      formAction={formAction}
    />
  );
}

function ContactFormInner({
  state,
  formAction,
}: {
  state: ContactFormState;
  formAction: (payload: FormData) => void;
}) {
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [charCount, setCharCount] = useState(0);

  const errors: ClientErrors = { ...state.errors, ...clientErrors };
  // Only re-prefill from server state when there were errors — on success
  // the component is remounted by the parent and starts fresh.
  const initialValues = state.ok ? undefined : state.values;

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = e.target.name as keyof ClientErrors;
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validateField(name, e.target.value);
    setClientErrors((c) => ({ ...c, [name]: err }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = e.target.name as keyof ClientErrors;
    if (name === "message") setCharCount(e.target.value.length);
    if (touched[name]) {
      const err = validateField(name, e.target.value);
      setClientErrors((c) => ({ ...c, [name]: err }));
    }
  }

  function showError(name: keyof ClientErrors): string | undefined {
    return touched[name] || state.errors?.[name] ? errors[name] : undefined;
  }

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {/* Banners */}
      {state.ok && state.message && (
        <div
          role="status"
          className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 flex items-start gap-3"
        >
          <svg className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{state.message}</span>
        </div>
      )}
      {!state.ok && state.message && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 flex items-start gap-3"
        >
          <svg className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full name"
          name="full_name"
          type="text"
          placeholder="e.g. Anshul Madaan"
          required
          autoComplete="name"
          defaultValue={initialValues?.full_name}
          error={showError("full_name")}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          defaultValue={initialValues?.email}
          error={showError("email")}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          placeholder="+91 10-digit mobile number"
          autoComplete="tel"
          inputMode="tel"
          defaultValue={initialValues?.phone}
          error={showError("phone")}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <SelectField
          label="Subject"
          name="subject"
          required
          defaultValue={initialValues?.subject}
          error={showError("subject")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="">Choose a subject…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>
      </div>

      <TextAreaField
        label="Message"
        name="message"
        placeholder="Tell us how we can help…"
        required
        rows={5}
        defaultValue={initialValues?.message}
        error={showError("message")}
        onBlur={handleBlur}
        onChange={handleChange}
        helper={
          <span className={charCount > 2000 ? "text-red-600" : "text-gray-500"}>
            {charCount}/2000
          </span>
        }
      />

      {/* Honeypot — visually hidden, bots fill it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company (do not fill)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <SubmitButton />

      <p className="text-xs text-gray-500">
        By submitting this form, you agree to our{" "}
        <a href="/terms" className="text-brand-red hover:underline">
          Terms
        </a>
        . We&apos;ll only use your details to respond to your enquiry.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-brand-red text-white font-semibold px-7 py-3.5 hover:bg-brand-red-dark disabled:bg-brand-red/60 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
    >
      {pending ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Sending…
        </>
      ) : (
        <>
          Send Message
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </>
      )}
    </button>
  );
}

type FieldBaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helper?: React.ReactNode;
};

function Field({
  label,
  name,
  required,
  error,
  type = "text",
  placeholder,
  defaultValue,
  autoComplete,
  inputMode,
  onBlur,
  onChange,
}: FieldBaseProps & {
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        onBlur={onBlur}
        onChange={onChange}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-brand-red/30 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-brand-red"
        }`}
      />
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  error,
  defaultValue,
  onBlur,
  onChange,
  children,
}: FieldBaseProps & {
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}) {
  const id = `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          onBlur={onBlur}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-brand-red/30 ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-brand-red"
          }`}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  required,
  error,
  placeholder,
  rows = 4,
  defaultValue,
  onBlur,
  onChange,
  helper,
}: FieldBaseProps & {
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  const id = `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
          {label} {required && <span className="text-brand-red">*</span>}
        </label>
        {helper && <span className="text-xs">{helper}</span>}
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        onBlur={onBlur}
        onChange={onChange}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all outline-none resize-y focus:ring-2 focus:ring-brand-red/30 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-brand-red"
        }`}
      />
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
