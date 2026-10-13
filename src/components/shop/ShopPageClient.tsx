"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/PageLoader";

export default function ShopPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Shop landing page is mostly static (categories, featured collections)
    setBooting(false);
  }, []);

  if (booting) {
    return <PageLoader subtitle="Loading devotional collections..." />;
  }

  return <>{children}</>;
}
