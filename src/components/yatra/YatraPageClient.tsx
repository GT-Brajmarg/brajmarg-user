"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/PageLoader";

export default function YatraPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Yatra page is mostly static; wait for component mount
    setBooting(false);
  }, []);

  if (booting) {
    return <PageLoader subtitle="Planning your sacred yatra..." />;
  }

  return <>{children}</>;
}
