"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Tab = { value: string; label: string };

type Props = {
  tabs: Tab[];
  current: string;
  pathname: string;
  paramName: string;
};

export default function OrderTabs({
  tabs,
  current,
  pathname,
  paramName,
}: Props) {
  const sp = useSearchParams();

  function hrefFor(value: string) {
    const params = new URLSearchParams(sp?.toString() ?? "");
    if (!value || value === tabs[0].value) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    params.delete("page");
    const q = params.toString();
    return q ? `${pathname}?${q}` : pathname;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((t) => {
        const active = t.value === current;
        return (
          <Link
            key={t.value}
            href={hrefFor(t.value)}
            scroll={false}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              active
                ? "bg-brand-red text-white border-brand-red"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
