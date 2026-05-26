"use client";

import { useFormStatus } from "react-dom";

/**
 * Submit button with built-in pending state for server-action forms.
 * Use as the submit control inside a `<form action={someServerAction}>`.
 *
 * While the action is in flight (`pending` from useFormStatus), the button is
 * disabled and shows a spinner + the `pendingLabel`. Native form submission
 * already coalesces clicks, so disabling on `pending` is enough to prevent
 * double-submits without needing extra refs.
 */
export default function SubmitButton({
  children,
  pendingLabel = "Please wait…",
  formAction,
  disabled = false,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  /** Optional per-button server action (when a single form has multiple buttons). */
  formAction?: (formData: FormData) => void | Promise<void>;
  /** External disabled flag (e.g. OTP not fully entered yet). */
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={isDisabled}
      aria-busy={pending}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-red-dark active:scale-[0.98] disabled:bg-brand-red/50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all shadow-sm"
    >
      {pending ? (
        <>
          <Spinner />
          <span>{pendingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="4"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
