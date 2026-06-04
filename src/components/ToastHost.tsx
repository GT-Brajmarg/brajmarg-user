"use client";

import { useEffect } from "react";

export default function ToastHost({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(onDismiss, 3200);
    return () => window.clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 px-4 w-[min(100%,28rem)]"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-full bg-gray-900 text-white text-sm font-medium shadow-lg px-5 py-3 text-center">
        {message}
      </div>
    </div>
  );
}
