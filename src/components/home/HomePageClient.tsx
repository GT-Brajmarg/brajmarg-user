"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLiveDarshan } from "@/store/slices/heroSlice";
import { fetchTemples } from "@/store/slices/templesSlice";
import HomePageLoader from "./HomePageLoader";

export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const darshan = useAppSelector((state) => state.hero.darshan);
  const temples = useAppSelector((state) => state.temples.temples);

  const hasDarshanData = Boolean(darshan.templeName);
  const hasTemplesData = temples.length > 0;

  // Controls the splash screen during the first app load
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      const promises: Promise<unknown>[] = [];

      if (!hasDarshanData) {
        promises.push(dispatch(fetchLiveDarshan()).unwrap());
      }

      if (!hasTemplesData) {
        promises.push(dispatch(fetchTemples()).unwrap());
      }

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("Failed to initialize homepage:", error);
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
    return <HomePageLoader />;
  }

  return <>{children}</>;
}
