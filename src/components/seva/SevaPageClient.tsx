"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFeaturedSevas } from "@/store/slices/sevaPageSlice";
import PageLoader from "@/components/PageLoader";

export default function SevaPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { featuredSevas } = useAppSelector((state) => state.sevaPage);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        if (featuredSevas.length === 0) {
          await dispatch(fetchFeaturedSevas({})).unwrap();
        }
      } catch (error) {
        console.error("Failed to initialize seva page:", error);
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
    return <PageLoader subtitle="Loading sacred sevas for you..." />;
  }

  return <>{children}</>;
}
