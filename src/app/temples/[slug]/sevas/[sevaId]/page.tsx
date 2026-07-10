"use client";

import SevaHero from "@/components/seva/SevaHero";
import Booking from "@/components/seva/Booking";
import ImportantNotes from "@/components/seva/ImportantNotes";
import BookingSummary from "@/components/seva/BookingSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";

import {
  fetchSevaDetails,
  fetchAvailableDates,
  fetchAvailableSlots,
} from "@/store/slices/sevaBookingSlice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const dispatch = useAppDispatch();

  const { seva, dates, slots, loading, error } = useAppSelector(
    (state) => state.sevaBooking,
  );

  const slug = params.slug as string;
  const sevaId = params.sevaId as string;

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  console.log("Params:", {
    slug,
    sevaId,
  });

  useEffect(() => {
    if (!slug || !sevaId) return;

    dispatch(fetchSevaDetails({ slug, sevaId }));

    dispatch(
      fetchAvailableDates({
        templeId: slug,
        sevaId,
      }),
    );
  }, [dispatch, slug, sevaId]);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].available_date);
    }
  }, [dates, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;

    dispatch(
      fetchAvailableSlots({
        templeId: slug,
        sevaId,
        date: selectedDate,
      }),
    );
  }, [dispatch, slug, sevaId, selectedDate]);

  useEffect(() => {
    if (slots.length > 0 && !selectedSlot) {
      setSelectedSlot(slots[0].id);
    }
  }, [slots, selectedSlot]);

  const selectedSlotObj = slots.find((slot) => slot.id === selectedSlot);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#0B6670]">Loading Seva...</div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!seva) {
    return <div className="py-20 text-center">Seva not found.</div>;
  }

  const temple = seva.temples;

  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      {/* Background: 3 paper-texture sections + 3 centered mandalas */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Full-page paper texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        {/* Mandalas aligned with max-w-[1200px] content */}
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
            width={900}
            height={900}
            className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
          />

          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.030]"
          />
        </div>
      </div>

      {/* Foreground page content */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <SevaHero templeSlug={slug} temple={temple} seva={seva} />

          <div className="mt-[30px]">
            <Booking
              dates={dates}
              slots={slots}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onDateChange={setSelectedDate}
              onSlotChange={setSelectedSlot}
            />
          </div>

          <div className="mt-[30px]" style={{ marginTop: "30px" }}>
            <ImportantNotes />
          </div>

          <div
            className="mt-[30px] mb-[30px]"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <BookingSummary
              seva={{
                id: seva.id || seva.seva_id || sevaId,
                name: seva.name,
                image_url: seva.image_url,
                price: seva.price,
              }}
              temple={{
                name: temple.name,
                location: temple.location,
              }}
              selectedDate={selectedDate}
              selectedTime={
                selectedSlotObj?.start_time ||
                selectedSlotObj?.slot_time ||
                selectedSlotObj?.time ||
                selectedSlot
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
