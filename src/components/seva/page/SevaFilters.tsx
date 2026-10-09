"use client";

import Image from "next/image";
import OfferDateSelector from "./OfferDateSelector";
import SevaTypeSelector from "./SevaTypeSelector";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearFilters,
  setSelectedDate,
  setSelectedSevaType,
} from "@/store/slices/sevaPageSlice";

export default function SevaFilters() {
  const dispatch = useAppDispatch();

  const { selectedDate, selectedSevaType, featuredSevas } = useAppSelector(
    (state) => state.sevaPage,
  );

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };
  return (
    <section className="relative py-10">
      <div
        className="mb-8 flex items-center justify-center gap-3"
        style={{ marginTop: "30px", marginBottom: "10px" }}
      >
        <Image src="/images/lotus.png" alt="" width={54} height={36} />

        <h2 className="font-cormorant text-[36px] font-semibold text-[#0B6670]">
          Find the Seva You Wish to Offer
        </h2>

        <Image src="/images/lotus.png" alt="" width={54} height={36} />
      </div>

      <div className="space-y-6">
        <OfferDateSelector />

        <SevaTypeSelector />
        {(selectedDate || selectedSevaType) && (
          <div
            className="mt-6 flex items-center justify-between rounded-[16px] border border-[#0F5C66] bg-[#0F5C66]/20 px-6 py-4"
            style={{ marginTop: "20px" }}
          >
            <div
              className="flex items-center gap-3"
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                marginBottom: "10px",
              }}
            >
              <p className="font-cormorant text-[24px] font-semibold text-[#0B6670]">
                Showing Results :
              </p>

              {selectedDate && (
                <button
                  onClick={() => dispatch(setSelectedDate(null))}
                  className="flex items-center gap-2 rounded-lg border border-[#0F5C66] bg-[#F9F0E3]/80 px-3 py-1"
                >
                  <span
                    className="font-cormorant text-[20px] text-[#3D352F]"
                    style={{ marginLeft: "5px" }}
                  >
                    {formatDate(selectedDate)}
                  </span>

                  <X
                    size={18}
                    className="text-[#0B6670]"
                    style={{ marginRight: "5px" }}
                  />
                </button>
              )}

              {selectedSevaType && (
                <button
                  onClick={() => dispatch(setSelectedSevaType(null))}
                  className="flex items-center gap-2 rounded-lg border border-[#0F5C66] bg-[#F9F0E3]/80 px-3 py-1"
                >
                  <span
                    className="font-cormorant text-[20px] text-[#3D352F]"
                    style={{ marginLeft: "5px" }}
                  >
                    {selectedSevaType}
                  </span>

                  <X
                    size={18}
                    className="text-[#0B6670]"
                    style={{ marginRight: "5px" }}
                  />
                </button>
              )}

              {/* {(selectedDate || selectedSevaType) && (
                <button
                  onClick={() => dispatch(clearFilters())}
                  className="font-cormorant ml-3 text-[20px] text-[#B64B36] underline"
                >
                  Clear All
                </button>
              )} */}
            </div>

            <p
              className="font-cormorant text-[24px] font-semibold text-[#0B6670]"
              style={{ marginRight: "20px" }}
            >
              {featuredSevas.length} Sevas Found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
