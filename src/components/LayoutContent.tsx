"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// export default function LayoutContent({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   // Hide footer on dashboard pages
//   const hideFooter =
//     pathname.startsWith("/profile") ||
//     pathname.startsWith("/cart") ||
//     pathname.startsWith("/checkout") ||
//     pathname.startsWith("/payment") ||
//     pathname.includes("/sevas/") ||
//     pathname.includes("/prasad/") ||
//     pathname.includes("/frames/") ||
//     pathname.includes("/cloth/") ||
//     pathname.startsWith("/subscribe-alerts/temples") ||
//     pathname.startsWith("/subscribe-alerts/preferences") ||
//     pathname.startsWith("/subscribe-alerts/review-subscription") ||
//     pathname.startsWith("/subscribe-alerts/payment");
//   return (
//     <>
//       <Navbar />
//       {children}
//       {!hideFooter && <Footer />}
//     </>
//   );
// }
export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideFooter =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment") ||
    pathname.includes("/sevas/") ||
    pathname.includes("/prasad/") ||
    pathname.includes("/frames/") ||
    pathname.includes("/cloth/") ||
    pathname.startsWith("/subscribe-alerts/temples") ||
    pathname.startsWith("/subscribe-alerts/preferences") ||
    pathname.startsWith("/subscribe-alerts/review-subscription") ||
    pathname.startsWith("/subscribe-alerts/payment");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[76px]">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
