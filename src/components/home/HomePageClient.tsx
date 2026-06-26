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
  const templesLoading = useAppSelector((state) => state.temples.loading);

  useEffect(() => {
    dispatch(fetchLiveDarshan());
    dispatch(fetchTemples());
  }, [dispatch]);

  if (heroLoading || templesLoading) {
    return <HomePageLoader />;
  }

  return <>{children}</>;
}
