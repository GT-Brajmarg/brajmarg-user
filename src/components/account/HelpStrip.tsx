import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export default function HelpStrip({ title, description }: Props) {
  return (
    <div className="rounded-2xl bg-red-50/70 border border-red-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shrink-0">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11a3 3 0 116 0c0 2-3 2-3 4M12 17h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-red">{title}</p>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-white border border-brand-red/30 text-brand-red text-sm font-semibold px-4 py-2 hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors shrink-0"
      >
        Contact Support
      </Link>
    </div>
  );
}
