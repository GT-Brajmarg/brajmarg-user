"use client";

/**
 * Small overlay button that opens the {@link ImageLightbox}. Sits on
 * top of a card's image. On cards that are themselves links (frame /
 * cloth), it stops propagation so a tap zooms instead of navigating —
 * giving a first-time devotee a way to inspect the offering closely
 * before committing.
 */
export function ZoomTrigger({
  onOpen,
  label = "Tap to zoom",
}: {
  onOpen: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen();
      }}
      className="pointer-events-auto absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-medium text-white opacity-90 backdrop-blur transition hover:bg-black/75 sm:opacity-0 sm:group-hover:opacity-100"
    >
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
      </svg>
      {label}
    </button>
  );
}
