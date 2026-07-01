"use client";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchClothDetails,
  fetchClothSizes,
  fetchClothColors,
} from "@/store/slices/clothBookingSlice";

import ClothHero from "./ClothHero";
import Booking from "./Booking";
import ImportantNotes from "./ImportantNotes";
import BookingSummary from "./BookingSummary";

interface Props {
  slug: string;
  clothId: string;
}

export default function ClothBookingPage({ slug, clothId }: Props) {
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { cloth, sizes, colors, loading, error } = useAppSelector(
    (state) => state.clothBooking,
  );

  useEffect(() => {
    if (!clothId) return;

    dispatch(fetchClothDetails(clothId));
    dispatch(fetchClothSizes(clothId));
    dispatch(fetchClothColors(clothId));
  }, [dispatch, clothId]);

  useEffect(() => {
    if (sizes.length && !selectedSize) {
      setSelectedSize(sizes[0].id);
    }
  }, [sizes, selectedSize]);

  useEffect(() => {
    if (colors.length && !selectedColor) {
      setSelectedColor(colors[0].id);
    }
  }, [colors, selectedColor]);

  const selectedSizeObj = sizes.find((s) => s.id === selectedSize);

  const selectedColorObj = colors.find((c) => c.id === selectedColor);

  const finalPrice =
    (selectedSizeObj?.price ?? 0) + (selectedColorObj?.extra_price ?? 0);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#0B6670]">Loading Cloth...</div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!cloth) {
    return <div className="py-20 text-center">Cloth not found.</div>;
  }

  return (
    <>
      <ClothHero templeSlug={slug} temple={cloth.temples} cloth={cloth} />

      <div className="mt-8">
        <Booking
          sizes={sizes}
          colors={colors}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeChange={setSelectedSize}
          onColorChange={setSelectedColor}
        />
      </div>

      <div className="mt-8" style={{ marginTop: "20px" }}>
        <ImportantNotes />
      </div>

      <div
        className="my-8"
        style={{
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <BookingSummary
          cloth={cloth}
          temple={cloth.temples}
          selectedSize={selectedSizeObj?.label}
          selectedColor={selectedColorObj?.color_name}
          finalPrice={finalPrice}
        />
      </div>
    </>
  );
}
