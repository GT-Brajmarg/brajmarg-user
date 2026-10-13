"use client";

import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import PageLoader from "@/components/PageLoader";

export default function ShopSearchPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAppSelector((state) => state.shop);
  const [isReady, setIsReady] = useState(false);
  const hasTriggeredLoading = useRef(false);

  useEffect(() => {
    if (loading) {
      hasTriggeredLoading.current = true;
    } else if (hasTriggeredLoading.current) {
      setIsReady(true);
    }
  }, [loading]);

  // Fallback for categories or collections that don't trigger a fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        setIsReady(true);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {!isReady && (
        <PageLoader subtitle="Searching devotional products..." />
      )}
      {children}
    </>
  );
}
