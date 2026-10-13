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
    <section className="relative pt-0 py-5">
      <div
        className="mt-4 sm:mt-6 md:mt-[30px] mb-6 sm:mb-8 md:mb-[45px] flex items-center justify-center gap-2 sm:gap-3"
      >
        <Image
          src="/images/lotus.png"
          alt=""
          width={54}
          height={36}
          className="h-6 w-9 sm:h-7 sm:w-11 md:h-9 md:w-14 object-contain"
        />

        <h2 className="font-cormorant text-[22px] sm:text-[28px] md:text-[36px] font-semibold text-[#0B6670] text-center">
          Find the Seva You Wish to Offer
        </h2>

        <Image
          src="/images/lotus.png"
          alt=""
          width={54}
          height={36}
          className="h-6 w-9 sm:h-7 sm:w-11 md:h-9 md:w-14 object-contain"
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <OfferDateSelector />

        <SevaTypeSelector />
        {(selectedDate || selectedSevaType) && (
          <div
            className="mt-4 sm:mt-6 flex flex-row items-center justify-between gap-2 sm:gap-3 rounded-[14px] sm:rounded-[16px] border border-[#0F5C66] bg-[#0F5C66]/20 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4"
          >
            <div
              className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 md:gap-3 md:ml-[20px]"
            >
              <p className="font-cormorant text-[14px] sm:text-[17px] md:text-[22px] font-semibold text-[#0B6670] whitespace-nowrap">
                Showing Results :
              </p>

              {selectedDate && (
                <button
                  onClick={() => dispatch(setSelectedDate(null))}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-md sm:rounded-lg border border-[#0F5C66] bg-[#F9F0E3]/80 px-2 py-0.5 sm:px-3 sm:py-1"
                >
                  <span
                    className="font-cormorant text-[13px] sm:text-[16px] md:text-[18px] text-[#3D352F] ml-0.5 sm:ml-1"
                  >
                    {formatDate(selectedDate)}
                  </span>

                  <X
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px] text-[#0B6670] mr-0.5 sm:mr-1"
                  />
                </button>
              )}

              {selectedSevaType && (
                <button
                  onClick={() => dispatch(setSelectedSevaType(null))}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-md sm:rounded-lg border border-[#0F5C66] bg-[#F9F0E3]/80 px-2 py-0.5 sm:px-3 sm:py-1"
                >
                  <span
                    className="font-cormorant text-[13px] sm:text-[16px] md:text-[20px] text-[#3D352F] ml-0.5 sm:ml-1"
                  >
                    {selectedSevaType}
                  </span>

                  <X
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px] text-[#0B6670] mr-0.5 sm:mr-1"
                  />
                </button>
              )}
            </div>

            <p
              className="font-cormorant text-[13px] sm:text-[17px] md:text-[22px] font-semibold text-[#0B6670] whitespace-nowrap shrink-0 md:mr-[20px]"
            >
              {featuredSevas.length} Sevas Found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
