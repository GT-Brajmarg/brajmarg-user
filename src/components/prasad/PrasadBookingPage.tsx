"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPrasadDetails,
  fetchPrasadQuantities,
} from "@/store/slices/prasadBookingSlice";

import PrasadHero from "./prasadHero";
import Booking from "./Booking";
import ImportantNotes from "./ImportantNotes";
import BookingSummary from "./BookingSummary";

interface Props {
  slug: string;
  prasadId: string;
}

export default function PrasadBookingPage({ slug, prasadId }: Props) {
  const dispatch = useAppDispatch();

  const { prasad, quantities, loading, error } = useAppSelector(
    (state) => state.prasadBooking,
  );

  useEffect(() => {
    if (!prasadId) return;

    dispatch(fetchPrasadDetails(prasadId));
    dispatch(fetchPrasadQuantities(prasadId));
  }, [dispatch, prasadId]);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#0B6670]">Loading Prasad...</div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!prasad) {
    return <div className="py-20 text-center">Prasad not found.</div>;
  }

  return (
    <>
      <main className="bg-[#F8F2E8]">
        <div className="mx-auto flex justify-center">
          <div className="w-full max-w-[1200px] px-4 py-10">
            <PrasadHero
              templeSlug={slug}
              temple={prasad.temples}
              prasad={prasad}
            />
            <div>
              <Booking />
            </div>

            <div style={{ marginTop: "30px" }}>
              <ImportantNotes />
            </div>
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
              <BookingSummary prasad={prasad} temple={prasad.temple} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
