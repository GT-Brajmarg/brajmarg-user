"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPrasadDetails,
  fetchPrasadQuantities,
} from "@/store/slices/prasadBookingSlice";

import PrasadHero from "./prasadHero";
import Booking from "./Booking";
import ImportantNotes from "./ImportantNotes";
import BookingSummary from "./BookingSummary";
import PageLoader from "@/components/PageLoader";

interface Props {
  slug: string;
  prasadId: string;
}

export default function PrasadBookingPage({ slug, prasadId }: Props) {
  const dispatch = useAppDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState("");

  const { prasad, quantities, loading, error } = useAppSelector(
    (state) => state.prasadBooking,
  );

  useEffect(() => {
    if (!prasadId) return;

    dispatch(fetchPrasadDetails(prasadId));
    dispatch(fetchPrasadQuantities(prasadId));
  }, [dispatch, prasadId]);

  useEffect(() => {
    if (quantities.length && !selectedQuantity) {
      setSelectedQuantity(quantities[0].id);
    }
  }, [quantities, selectedQuantity]);

  const selectedQuantityObj = quantities.find((q) => q.id === selectedQuantity);

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!prasad) {
    return loading ? (
      <PageLoader subtitle="Preparing your prasad booking..." />
    ) : (
      <div className="py-20 text-center">Prasad not found.</div>
    );
  }

  return (
    <>
      {loading && <PageLoader subtitle="Preparing your prasad booking..." />}
      <main className="relative overflow-hidden bg-[#F8F2E8]">
        {/* Background Mandalas */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />
        {/* Lite Lotus BG — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute top-[-60px] inset-0 z-0 overflow-hidden">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={1500}
            height={100}
            className="object-cover opacity-70"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
          />

          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
          />

          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10 mx-auto flex justify-center">
          <div className="w-full max-w-[1340px] px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <PrasadHero
              templeSlug={slug}
              temple={prasad.temples}
              prasad={prasad}
            />

            <div className="mt-8">
              <Booking
                quantities={quantities}
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
              />
            </div>

            <div className="mt-8" style={{ marginTop: "30px" }}>
              <ImportantNotes />
            </div>

            <div
              className="my-8"
              style={{ marginTop: "30px", marginBottom: "50px" }}
            >
              <BookingSummary
                prasad={prasad}
                temple={prasad.temples}
                selectedQuantity={selectedQuantityObj?.quantity_label}
                finalPrice={selectedQuantityObj?.price ?? 0}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
