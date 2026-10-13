"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";
import PageLoader from "@/components/PageLoader";

export default function TemplePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { temples, loading } = useAppSelector((state) => state.temples);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        if (temples.length === 0) {
          await dispatch(fetchTemples()).unwrap();
        }
      } catch (error) {
        console.error("Failed to initialize temples page:", error);
      } finally {
        if (isMounted) {
          setBooting(false);
        }
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (booting) {
    return <PageLoader subtitle="Discovering sacred temples..." />;
  }

  return <>{children}</>;
}
