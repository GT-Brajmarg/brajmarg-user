// "use client";

// import Link from "next/link";
// import {
//   startTransition,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { CART_CHANGE_EVENT, getCartCount } from "@/lib/cart-store";

// export default function CartLinkWithBadge() {
//   const [count, setCount] = useState<number | null>(null);
//   const [bumping, setBumping] = useState(false);
//   const prevCount = useRef<number | null>(null);
//   const bumpTimer = useRef<number | null>(null);

//   const load = useCallback(async () => {
//     const c = await getCartCount();
//     startTransition(() => setCount(c));
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     const onVis = () => {
//       if (document.visibilityState === "visible") void load();
//     };
//     document.addEventListener("visibilitychange", onVis);
//     return () => document.removeEventListener("visibilitychange", onVis);
//   }, [load]);

//   useEffect(() => {
//     const onCart = () => void load();
//     window.addEventListener(CART_CHANGE_EVENT, onCart);
//     return () => window.removeEventListener(CART_CHANGE_EVENT, onCart);
//   }, [load]);

//   // Cross-tab sync: when localStorage changes in another tab
//   useEffect(() => {
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "brajmarg:cart:v1") void load();
//     };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, [load]);

//   // Trigger bump animation when count increases
//   useEffect(() => {
//     if (count == null) return;
//     const prev = prevCount.current;
//     if (prev != null && count > prev) {
//       setBumping(true);
//       if (bumpTimer.current != null) window.clearTimeout(bumpTimer.current);
//       bumpTimer.current = window.setTimeout(() => {
//         setBumping(false);
//         bumpTimer.current = null;
//       }, 600);
//     }
//     prevCount.current = count;
//     return () => {
//       if (bumpTimer.current != null) {
//         window.clearTimeout(bumpTimer.current);
//         bumpTimer.current = null;
//       }
//     };
//   }, [count]);

//   const n = count ?? 0;

//   // Hide the cart entirely while loading and when empty.
//   // Listeners above keep running so it reappears instantly
//   // on cart-change or storage events.
//   if (count == null || n === 0) return null;

//   return (
//     <Link
//       href="/cart"
//       className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:text-brand-red hover:bg-red-50 transition-colors"
//       aria-label="Cart"
//     >
//       <span
//         className={`inline-flex ${bumping ? "animate-cart-bump" : ""}`}
//         key={bumping ? "bump" : "idle"}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.5}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
//           />
//         </svg>
//       </span>
//       <span
//         key={`badge-${n}`}
//         className="absolute top-0.5 right-0.5 min-w-[20px] h-[20px] rounded-full bg-brand-red px-1.5 text-[11px] font-bold leading-[20px] text-white text-center shadow-sm ring-2 ring-header-bg animate-badge-pop"
//       >
//         {n > 9 ? "9+" : n}
//       </span>
//     </Link>
//   );
// }
"use client";

/**
 * Header cart entry point — intentionally renders nothing.
 *
 * The cart icon was removed from the header; the floating cart bubble
 * (CartFab) is now the only cart UI and navigates straight to /cart.
 * This component is kept as a no-op so the Header import and layout
 * don't need to change.
 */
export default function CartLinkWithBadge() {
  return null;
}