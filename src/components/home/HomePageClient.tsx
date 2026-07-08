"use client";

import { useEffect } from "react";
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

  const heroLoading = useAppSelector((state) => state.hero.loading);
  const darshan = useAppSelector((state) => state.hero.darshan);

  const templesLoading = useAppSelector((state) => state.temples.loading);
  const temples = useAppSelector((state) => state.temples.temples);

  const hasDarshanData = Boolean(darshan.templeName);
  const hasTemplesData = temples.length > 0;

  useEffect(() => {
    if (!hasDarshanData && !heroLoading) {
      dispatch(fetchLiveDarshan());
    }

    if (!hasTemplesData && !templesLoading) {
      dispatch(fetchTemples());
    }
  }, [dispatch, hasDarshanData, hasTemplesData, heroLoading, templesLoading]);

  const isInitialLoading =
    (heroLoading && !hasDarshanData) || (templesLoading && !hasTemplesData);

  if (isInitialLoading) {
    return <HomePageLoader />;
  }

  return <>{children}</>;
}
