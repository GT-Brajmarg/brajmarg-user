import Link from "next/link";
import type { Temple } from "@/types/database";
import { slugify } from "@/lib/slug";

export default function TempleCard({ temple }: { temple: Temple }) {
  const href = temple.is_coming_soon
    ? "#"
    : `/temple/${slugify(temple.name)}`;

  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-xl ${
        temple.is_coming_soon ? "pointer-events-none opacity-70" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-52 sm:h-60 bg-gray-300">
        {temple.image_url ? (
          <img
            src={temple.image_url}
            alt={temple.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-400 to-gray-600" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Coming Soon badge */}
        {temple.is_coming_soon && (
          <div className="absolute top-3 right-3 bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
            Coming Soon
          </div>
        )}

        {/* Temple name + location */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white leading-tight">
            {temple.name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-gray-200 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            {temple.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
