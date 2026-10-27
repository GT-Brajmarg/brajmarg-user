export const BRAND_TAGLINE = "Brajmarg - Connecting Devotees to the Divine";

function formatSegment(segment: string): string {
  try {
    const decoded = decodeURIComponent(segment);
    return decoded
      .replace(/[-_]+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } catch {
    return segment;
  }
}

export function getDynamicTitle(pathname: string): string {
  if (!pathname || pathname === "/") {
    return BRAND_TAGLINE;
  }

  // Exact static routes
  const staticRouteMap: Record<string, string> = {
    "/about": "About Us",
    "/contact": "Contact Us",
    "/temples": "Temples",
    "/yatra": "Yatra",
    "/seva": "Seva",
    "/shop": "Shop",
    "/shop/search": "Search Products",
    "/cart": "Cart",
    "/checkout": "Checkout",
    "/checkout/confirmation": "Order Confirmation",
    "/payment": "Payment",
    "/terms": "Terms of Use",
    "/privacy": "Privacy Policy",
    "/profile": "Profile",
    "/profile/account": "Profile",
    "/profile/orders": "My Orders",
    "/profile/sevas": "My Sevas",
    "/profile/yatras": "My Yatras",
    "/subscribe-alerts": "Daily Darshan Alerts",
    "/subscribe-alerts/temples": "Select Temples",
    "/subscribe-alerts/preferences": "Preferences",
    "/subscribe-alerts/review-subscription": "Review Subscription",
    "/subscribe-alerts/payment": "Subscription Payment",
  };

  if (staticRouteMap[pathname]) {
    return `${staticRouteMap[pathname]} | ${BRAND_TAGLINE}`;
  }

  // Dynamic routes
  if (pathname.startsWith("/temples/")) {
    const parts = pathname.split("/").filter(Boolean);
    const slug = parts[1];
    const subType = parts[2]; // sevas, prasad, frames, cloth
    const templeName = slug ? formatSegment(slug) : "Temple";

    if (subType === "sevas") return `Book Seva - ${templeName} | ${BRAND_TAGLINE}`;
    if (subType === "prasad") return `Holy Prasad - ${templeName} | ${BRAND_TAGLINE}`;
    if (subType === "frames") return `Sacred Frames - ${templeName} | ${BRAND_TAGLINE}`;
    if (subType === "cloth") return `Sacred Cloth - ${templeName} | ${BRAND_TAGLINE}`;
    return `${templeName} | ${BRAND_TAGLINE}`;
  }

  if (pathname.startsWith("/yatra/")) {
    const parts = pathname.split("/").filter(Boolean);
    const slug = parts[1];
    const isBook = parts[2] === "book";
    const yatraName = slug ? formatSegment(slug) : "Yatra";

    if (isBook) return `Book ${yatraName} | ${BRAND_TAGLINE}`;
    return `${yatraName} | ${BRAND_TAGLINE}`;
  }

  if (pathname.startsWith("/shop/featured/")) {
    const parts = pathname.split("/shop/featured/")[1]?.split("/").filter(Boolean) || [];
    const collection = parts[0] ? formatSegment(parts[0]) : "Featured";
    return `${collection} Collection | ${BRAND_TAGLINE}`;
  }

  if (pathname.startsWith("/shop/")) {
    const parts = pathname.split("/").filter(Boolean);
    const category = parts[1] ? formatSegment(parts[1]) : "Shop";
    return `${category} | ${BRAND_TAGLINE}`;
  }

  // Fallback for any unknown segment
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const last = formatSegment(segments[segments.length - 1]);
    return `${last} | ${BRAND_TAGLINE}`;
  }

  return BRAND_TAGLINE;
}
