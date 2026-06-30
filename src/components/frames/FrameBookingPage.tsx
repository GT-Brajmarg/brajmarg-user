"use client";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchFrameDetails,
  fetchFrameMaterials,
  fetchFrameSizes,
} from "@/store/slices/frameBookingSlice";

import FrameHero from "./FrameHero";
import Booking from "./Booking";
import ImportantNotes from "./ImportantNotes";
import BookingSummary from "./BookingSummary";

interface Props {
  slug: string;
  frameId: string;
}

export default function FrameBookingPage({ slug, frameId }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const dispatch = useAppDispatch();

  const { frame, sizes, materials, loading, error } = useAppSelector(
    (state) => state.frameBooking,
  );

  useEffect(() => {
    if (!frameId) return;

    dispatch(fetchFrameDetails(frameId));
    dispatch(fetchFrameSizes(frameId));
    dispatch(fetchFrameMaterials(frameId));
  }, [dispatch, frameId]);

  useEffect(() => {
    if (sizes.length && !selectedSize) {
      setSelectedSize(sizes[0].id);
    }
  }, [sizes]);

  useEffect(() => {
    if (materials.length && !selectedMaterial) {
      setSelectedMaterial(materials[0].id);
    }
  }, [materials]);
  const selectedSizeObj = sizes.find((s) => s.id === selectedSize);

  const selectedMaterialObj = materials.find((m) => m.id === selectedMaterial);

  const finalPrice =
    (selectedSizeObj?.price ?? 0) + (selectedMaterialObj?.extraPrice ?? 0);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#0B6670]">Loading Frame...</div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!frame) {
    return <div className="py-20 text-center">Frame not found.</div>;
  }

  return (
    <>
      <FrameHero templeSlug={slug} temple={frame.temples} frame={frame} />

      <div className="mt-8">
        <Booking />
      </div>

      <div className="mt-8" style={{ marginTop: "20px" }}>
        <ImportantNotes />
      </div>

      <div className="my-8" style={{ marginTop: "20px", marginBottom: "40px" }}>
        <BookingSummary
          frame={frame}
          temple={frame.temples}
          selectedSize={selectedSizeObj?.label}
          selectedMaterial={selectedMaterialObj?.name}
          finalPrice={finalPrice}
        />
      </div>
    </>
  );
}
