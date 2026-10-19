"use client";

import React from "react";
import { toast } from "sonner";
import { Check, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  id?: string | number;
  duration?: number;
  title?: string;
  onClose?: () => void;
}

interface CustomToastCardProps {
  id: string | number;
  type: ToastType;
  message: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

/**
 * Custom Toast Card UI matching Brajmarg design system:
 * - Prefix Icon: Type-specific colored badge (Success, Error, Warning, Info)
 * - Message: Devotional warm styling, clear typography
 * - End Cancel/Close: An elegant dismiss button on the right
 */
export function CustomToastCard({
  id,
  type,
  message,
  title,
  onClose,
}: CustomToastCardProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) onClose();
    toast.dismiss(id);
  };

  // Icon badge and border styling based on type
  const typeConfig = {
    success: {
      badgeBg: "bg-[#0B6971]/12 text-[#0B6971] border-[#0B6971]/30",
      borderColor: "border-[#0B6971]/35",
      icon: <Check className="h-4 w-4 stroke-[2.75]" />,
      defaultTitle: "Success",
    },
    error: {
      badgeBg: "bg-red-50 text-red-600 border-red-200",
      borderColor: "border-red-300",
      icon: <AlertCircle className="h-4 w-4 stroke-[2.4]" />,
      defaultTitle: "Error",
    },
    warning: {
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      borderColor: "border-amber-300",
      icon: <AlertTriangle className="h-4 w-4 stroke-[2.4]" />,
      defaultTitle: "Warning",
    },
    info: {
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
      borderColor: "border-sky-300",
      icon: <Info className="h-4 w-4 stroke-[2.4]" />,
      defaultTitle: "Notice",
    },
  }[type];

  return (
    <div
      role="alert"
      className={`group relative flex w-full max-w-[390px] min-w-[310px] items-start gap-3 rounded-2xl border ${typeConfig.borderColor} bg-[#FAF5EC] p-3.5 sm:px-4 sm:py-3.5 shadow-[0_12px_28px_-6px_rgba(45,36,30,0.14),0_6px_12px_-4px_rgba(45,36,30,0.06)] transition-all`}
      style={{
        boxShadow:
          "0 12px 28px -6px rgba(45, 36, 30, 0.14), 0 6px 12px -4px rgba(45, 36, 30, 0.06)",
      }}
    >
      {/* ── Prefix Icon Badge ── */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-xs ${typeConfig.badgeBg}`}
      >
        {typeConfig.icon}
      </div>

      {/* ── Content (Title & Message) ── */}
      <div className="flex-1 min-w-0 pt-0.5">
        {title && (
          <h4 className="text-[13px] font-semibold text-[#2D241E] leading-tight mb-0.5">
            {title}
          </h4>
        )}
        <div className="text-[13px] sm:text-[13.5px] font-medium leading-relaxed text-[#3D2E1E] break-words">
          {message}
        </div>
      </div>

      {/* ── End Cancel / Dismiss Button ── */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close notification"
        title="Dismiss"
        className="ml-1 -mr-1 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#8B7A66] transition-colors hover:bg-[#EADBCE]/70 hover:text-[#2D241E] cursor-pointer"
      >
        <X className="h-3.5 w-3.5 stroke-[2.2]" />
      </button>
    </div>
  );
}

/**
 * Standard HTTP Status Error Messages
 */
export function getErrorMessageFromStatus(
  status: number,
  backendMessage?: string,
): string {
  if (backendMessage && backendMessage.trim().length > 0) {
    return backendMessage;
  }

  switch (status) {
    case 400:
      return "Invalid request. Please check the details you entered.";
    case 401:
      return "Your session has expired or you are unauthorized. Please sign in.";
    case 403:
      return "Access denied. You do not have permission for this request.";
    case 404:
      return "The requested information could not be found.";
    case 409:
      return "Conflict detected with an existing record.";
    case 422:
      return "Validation failed. Please verify the submitted data.";
    case 429:
      return "Too many requests. Please wait a few moments and try again.";
    case 500:
      return "Internal server error. Our devotional care team has been notified.";
    case 502:
    case 503:
    case 504:
      return "Service is temporarily unreachable. Please try again shortly.";
    default:
      return `Server responded with error status ${status}. Please try again.`;
  }
}

/**
 * Extracts backend error message from unknown error objects or API responses
 */
export function extractBackendErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): string {
  if (!error) return fallbackMessage;

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message && error.message.trim().length > 0) {
      return error.message;
    }
  }

  // Handle object-like structures: { message, error, data }
  if (typeof error === "object") {
    const errObj = error as Record<string, unknown>;

    if (typeof errObj.message === "string" && errObj.message.trim().length > 0) {
      return errObj.message;
    }

    if (typeof errObj.error === "string" && errObj.error.trim().length > 0) {
      return errObj.error;
    }

    if (
      errObj.data &&
      typeof errObj.data === "object" &&
      "message" in (errObj.data as Record<string, unknown>) &&
      typeof (errObj.data as Record<string, unknown>).message === "string"
    ) {
      return (errObj.data as Record<string, unknown>).message as string;
    }

    if (typeof errObj.status === "number") {
      return getErrorMessageFromStatus(
        errObj.status,
        typeof errObj.statusText === "string" ? errObj.statusText : undefined,
      );
    }
  }

  return fallbackMessage;
}

/**
 * Global Toast Trigger Functions
 */
export const showToast = {
  /**
   * Show success toast with prefix check badge and end cancel button
   */
  success(message: React.ReactNode, options?: ToastOptions) {
    return toast.custom(
      (id) => (
        <CustomToastCard
          id={id}
          type="success"
          message={message}
          title={options?.title}
          onClose={options?.onClose}
        />
      ),
      {
        id: options?.id,
        duration: options?.duration ?? 4500,
      },
    );
  },

  /**
   * Show error toast with prefix error badge and end cancel button
   */
  error(message: React.ReactNode, options?: ToastOptions) {
    return toast.custom(
      (id) => (
        <CustomToastCard
          id={id}
          type="error"
          message={message}
          title={options?.title}
          onClose={options?.onClose}
        />
      ),
      {
        id: options?.id,
        duration: options?.duration ?? 5000,
      },
    );
  },

  /**
   * Show warning toast with prefix warning badge and end cancel button
   */
  warning(message: React.ReactNode, options?: ToastOptions) {
    return toast.custom(
      (id) => (
        <CustomToastCard
          id={id}
          type="warning"
          message={message}
          title={options?.title}
          onClose={options?.onClose}
        />
      ),
      {
        id: options?.id,
        duration: options?.duration ?? 4500,
      },
    );
  },

  /**
   * Show info toast with prefix info badge and end cancel button
   */
  info(message: React.ReactNode, options?: ToastOptions) {
    return toast.custom(
      (id) => (
        <CustomToastCard
          id={id}
          type="info"
          message={message}
          title={options?.title}
          onClose={options?.onClose}
        />
      ),
      {
        id: options?.id,
        duration: options?.duration ?? 4500,
      },
    );
  },

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};

/**
 * Helper to handle catch blocks and API failures:
 * Extracts backend message and triggers error toast immediately.
 */
export function handleApiError(
  error: unknown,
  fallbackMessage = "Unable to complete request. Please try again.",
): string {
  const message = extractBackendErrorMessage(error, fallbackMessage);
  showToast.error(message);
  return message;
}

/**
 * Handles an API Response when hitting an endpoint:
 * Parses JSON, inspects HTTP status (400, 401, 403, 500 etc.) and result.success.
 * Shows error toast with backend message on failure, or success toast on success.
 */
export async function handleApiResponse<T = unknown>(
  response: Response,
  options?: {
    successMessage?: string;
    showSuccessToast?: boolean;
    fallbackErrorMessage?: string;
  },
): Promise<{
  success: boolean;
  data?: T;
  message?: string;
  status: number;
}> {
  let result: Record<string, unknown> | null = null;

  try {
    const json = await response.json();
    result = typeof json === "object" && json !== null ? (json as Record<string, unknown>) : null;
  } catch {
    result = null;
  }

  const backendMessage =
    typeof result?.message === "string"
      ? result.message
      : typeof result?.error === "string"
        ? result.error
        : typeof result === "string"
          ? result
          : undefined;

  // If HTTP error (400, 401, 403, 404, 500, etc.) or result.success is false
  if (!response.ok || (result && result.success === false)) {
    const errorMsg = getErrorMessageFromStatus(
      response.status,
      backendMessage ?? options?.fallbackErrorMessage,
    );

    showToast.error(errorMsg);

    return {
      success: false,
      data: (result?.data as T | undefined) ?? undefined,
      message: errorMsg,
      status: response.status,
    };
  }

  // Success handling
  const successMsg = backendMessage ?? options?.successMessage;

  if (options?.showSuccessToast && successMsg) {
    showToast.success(successMsg);
  }

  return {
    success: true,
    data: ((result?.data ?? result) as T | undefined) ?? undefined,
    message: successMsg,
    status: response.status,
  };
}

export default showToast;
