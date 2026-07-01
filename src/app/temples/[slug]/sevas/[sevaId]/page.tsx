"use client";

import SevaHero from "@/components/seva/SevaHero";
import Booking from "@/components/seva/Booking";
import ImportantNotes from "@/components/seva/ImportantNotes";
import BookingSummary from "@/components/seva/BookingSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchSevaDetails,
  fetchAvailableDates,
  fetchAvailableSlots,
} from "@/store/slices/sevaBookingSlice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// interface Props {
//   params: Promise<{
//     slug: string;
//     sevaId: string;
//   }>;
// }

export default function Page() {
  const params = useParams();

  const dispatch = useAppDispatch();

  const { seva, dates, slots, loading, error } = useAppSelector(
    (state) => state.sevaBooking,
  );

  // console.log({
  //   seva,
  //   loading,
  //   error,
  // });

  const slug = params.slug as string;
  const sevaId = params.sevaId as string;

  // const seva = await fetchSevaDetailsService(sevaId);
  // const [seva, setSeva] = useState<any>(null);

  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function loadSeva() {
  //     try {
  //       const data = await fetchSevaDetailsService(sevaId);

  //       setSeva(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (sevaId) {
  //     loadSeva();
  //   }
  // }, [sevaId]);

  // if (loading) {
  //   return <div className="py-20 text-center">Loading...</div>;
  // }

  // if (!seva) {
  //   return <div className="py-20 text-center">Seva not found</div>;
  // }

  // console.log("Params:", {
  //   slug,
  //   sevaId,
  // });

  // console.log("Redux:", {
  //   seva,
  //   loading,
  //   error,
  // });

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  console.log("Params:", {
    slug,
    sevaId,
  });

  useEffect(() => {
    if (!slug || !sevaId) return;

    // console.log("Dispatching fetchSevaDetails", { slug, sevaId });

    dispatch(fetchSevaDetails({ slug, sevaId }));
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
    <main className="bg-[#F8F2E8]">
      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <SevaHero templeSlug={slug} temple={temple} seva={seva} />
          <Booking
            dates={dates}
            slots={slots}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateChange={setSelectedDate}
            onSlotChange={setSelectedSlot}
          />
          <div style={{ marginTop: "30px" }}>
            <ImportantNotes />
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <BookingSummary
              seva={seva}
              temple={temple}
              selectedDate={selectedDate}
              selectedTime={selectedSlot}
            />
          </div>
        </div>{" "}
      </div>
    </main>
  );
}
