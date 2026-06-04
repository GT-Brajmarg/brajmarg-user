"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

type Props = {
  paramName: string;
  value: string;
  options: Option[];
  /** Pathname this control belongs to — same path is preserved on change. */
  pathname: string;
};

export default function StatusFilter({
  paramName,
  value,
  options,
  pathname,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  function onChange(next: string) {
    const params = new URLSearchParams(sp?.toString() ?? "");
    if (!next || next === options[0]?.value) {
      params.delete(paramName);
    } else {
      params.set(paramName, next);
    }
    // Reset pagination when filter changes
    params.delete("page");
    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-9 py-2 text-sm text-gray-700 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
