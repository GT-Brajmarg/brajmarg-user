"use client";

import {
  CalendarDays,
  Clock3,
  UserRound,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";

interface AvailableDate {
  id: string;
  available_date: string;
}

interface Slot {
  id: string;
  slot_time: string;
  capacity: number;
  booked_count: number;
}

interface BookingProps {
  dates: AvailableDate[];
  slots: Slot[];
  slotsLoading: boolean;
  selectedDate: string;
  selectedSlot: string;
  onDateChange: (id: string) => void;
  onSlotChange: (id: string) => void;
}

export default function Booking({
  dates,
  slots,
  selectedDate,
  selectedSlot,
  slotsLoading,
  onDateChange,
  onSlotChange,
}: BookingProps) {
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self");
  const datesScrollRef = useRef<HTMLDivElement>(null);

  const scrollDates = (direction: "left" | "right") => {
    if (datesScrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      datesScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const sortedDates = [...dates].sort(
    (a, b) =>
      new Date(a.available_date).getTime() - new Date(b.available_date).getTime(),
  );

  return (
    <section className="relative mt-8 sm:mt-10 overflow-hidden rounded-[24px] sm:rounded-[28px] border-[2px] border-[#C37000] bg-[#EFDEC7]/20 p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_12px_36px_rgba(126,83,26,0.10)]">
      {/* ================= Date Selection ================= */}
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 sm:h-6 sm:w-6 text-[#D89A3D] shrink-0" />
          <div>
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670] leading-tight">
              Select Seva Date
            </h2>
            <p className="font-cormorant mt-0.5 text-[14px] sm:text-[15px] text-[#6D6259]">
              Choose the date on which you wish to perform this seva
            </p>
          </div>
        </div>

        {/* Date Slider */}
        <div className="mt-5 flex justify-center items-center gap-2 sm:gap-3">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => scrollDates("left")}
            aria-label="Previous dates"
            className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F7F0E5] text-[#0B6670] shadow-sm transition hover:bg-[#F3DFC2] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          {/* Dates Container */}
          <div
            ref={datesScrollRef}
            className="scrollbar-hide flex max-w-full justify-center items-center gap-2.5 sm:gap-3.5 overflow-x-auto scroll-smooth py-1 px-1"
          >
            {sortedDates.map((date) => {
              const d = new Date(date.available_date);
              const active = selectedDate === date.available_date;

              return (
                <button
                  key={date.id}
                  type="button"
                  onClick={() => onDateChange(date.available_date)}
                  className={`flex h-[106px] sm:h-[116px] w-[84px] sm:w-[96px] lg:w-[104px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[14px] sm:rounded-[16px] transition-all duration-200 ${
                    active
                      ? "border-[2px] border-[#0B6670] bg-[#0B6670] text-[#EFDEC7] shadow-sm"
                      : "border border-[#C18426]/70 bg-transparent text-[#0B6670] hover:bg-[#FAF0E2]"
                  }`}
                >
                  <span className="font-cormorant text-[30px] sm:text-[34px] font-bold leading-none">
                    {d.getDate()}
                  </span>

                  <span className="font-cormorant text-[17px] sm:text-[19px] font-medium leading-tight mt-1">
                    {d.toLocaleString("en-IN", {
                      month: "long",
                    })}
                  </span>

                  <span className="font-cormorant text-[14px] sm:text-[15px] font-medium leading-tight opacity-90">
                    {d.toLocaleString("en-IN", {
                      weekday: "short",
                    })}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => scrollDates("right")}
            aria-label="Next dates"
            className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F7F0E5] text-[#0B6670] shadow-sm transition hover:bg-[#F3DFC2] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      {/* ================= Time Slot ================= */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Clock3 className="mt-0.5 h-5 w-5 sm:h-6 sm:w-6 text-[#D89A3D] shrink-0" />
          <div>
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670] leading-tight">
              Select Time Slot
            </h2>
            <p className="font-cormorant mt-0.5 text-[14px] sm:text-[15px] text-[#6D6259]">
              Timings are in IST
            </p>
          </div>
        </div>

        {/* Time Slots Grid */}
        {slotsLoading ? (
          <div className="flex h-[90px] items-center justify-center font-cormorant text-[18px] text-[#0B6670]">
            Loading available slots...
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            {slots.map((slot) => {
              const available = slot.capacity - slot.booked_count;
              const active = selectedSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSlotChange(slot.id)}
                  className={`flex flex-col items-center justify-center rounded-[14px] py-4 px-6 min-h-[82px] sm:min-h-[90px] min-w-[140px] sm:min-w-[160px] text-center transition-all cursor-pointer ${
                    active
                      ? "border-[2px] border-[#0B6670] bg-[#FAF3E8] shadow-sm"
                      : "border border-[#C18426]/70 bg-transparent hover:border-[#0B6670]"
                  }`}
                >
                  <p className="font-cormorant text-[22px] sm:text-[26px] font-bold leading-tight text-[#0B6670]">
                    {new Date(
                      `1970-01-01T${slot.slot_time}`,
                    ).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>

                  <p
                    className={`font-cormorant text-[14px] sm:text-[15px] font-semibold mt-1 leading-tight ${
                      available <= 1 ? "text-[#C37000]" : "text-[#1B7A5C]"
                    }`}
                  >
                    {available <= 1
                      ? "Only 1 Slot Left"
                      : `${available} Slots Available`}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Info */}
        <div className="mt-4 flex items-center gap-2 text-[14px] sm:text-[15px] text-[#6D6259]">
          <Info size={16} className="text-[#D89A3D] shrink-0" strokeWidth={2} />
          <p className="font-cormorant text-[14px] sm:text-[15px] text-[#6D6259]">
            Rajbhog Seva is performed during the afternoon bhog.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 sm:my-10 border-t border-[#E8DCC8]" />

      {/* ================= Devotee Details ================= */}
      <div>
        {/* Heading */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <UserRound className="mt-0.5 h-5 w-5 sm:h-6 sm:w-6 text-[#D89A3D] shrink-0" />
          <div>
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670] leading-tight">
              Devotee Details
            </h2>
            <p className="font-cormorant mt-0.5 text-[14px] sm:text-[15px] text-[#6D6259]">
              Provide details for whom the seva is being performed
            </p>
          </div>
        </div>

        {/* Radio Cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* For Myself / My family */}
          <button
            type="button"
            onClick={() => setBookingFor("self")}
            className={`flex items-start gap-3.5 rounded-[16px] sm:rounded-[18px] border px-5 py-3.5 sm:py-4 transition-all cursor-pointer text-left ${
              bookingFor === "self"
                ? "border-[#0B6670] bg-[#0B6670]/5 shadow-sm"
                : "border border-[#C18426]/70 bg-transparent hover:border-[#0B6670]"
            }`}
          >
            <div
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                bookingFor === "self" ? "border-[#0B6670]" : "border-[#C18426]"
              }`}
            >
              {bookingFor === "self" && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
              )}
            </div>

            <div>
              <h3 className="font-cormorant text-[19px] sm:text-[21px] font-semibold text-[#0B6670] leading-tight">
                For Myself / My family
              </h3>
              <p className="font-cormorant mt-1 text-[13.5px] sm:text-[14.5px] text-[#6D6259]">
                Seva will be performed in your name
              </p>
            </div>
          </button>

          {/* For Someone Else */}
          <button
            type="button"
            onClick={() => setBookingFor("other")}
            className={`flex items-start gap-3.5 rounded-[16px] sm:rounded-[18px] border px-5 py-3.5 sm:py-4 transition-all cursor-pointer text-left ${
              bookingFor === "other"
                ? "border-[#0B6670] bg-[#0B6670]/5 shadow-sm"
                : "border border-[#C18426]/70 bg-transparent hover:border-[#0B6670]"
            }`}
          >
            <div
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                bookingFor === "other" ? "border-[#0B6670]" : "border-[#C18426]"
              }`}
            >
              {bookingFor === "other" && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
              )}
            </div>

            <div>
              <h3 className="font-cormorant text-[19px] sm:text-[21px] font-semibold text-[#0B6670] leading-tight">
                For Someone Else
              </h3>
              <p className="font-cormorant mt-1 text-[13.5px] sm:text-[14.5px] text-[#6D6259]">
                Seva will be performed on behalf of others
              </p>
            </div>
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Full Name */}
          <div>
            <label className="font-cormorant mb-1.5 block text-[17px] sm:text-[19px] font-medium text-[#0B6670]">
              Full Name <span className="text-[#D89A3D]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="h-11 sm:h-12 w-full rounded-[12px] border border-[#C18426]/70 bg-transparent px-3.5 sm:px-4 font-cormorant text-[16px] sm:text-[17px] text-[#3D352F] placeholder:text-[#9B948B] outline-none focus:border-[#0B6670]"
            />
          </div>

          {/* Gotra */}
          <div>
            <label className="font-cormorant mb-1.5 block text-[17px] sm:text-[19px] font-medium text-[#0B6670]">
              Gotra (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter Gotra"
              className="h-11 sm:h-12 w-full rounded-[12px] border border-[#C18426]/70 bg-transparent px-3.5 sm:px-4 font-cormorant text-[16px] sm:text-[17px] text-[#3D352F] placeholder:text-[#9B948B] outline-none focus:border-[#0B6670]"
            />
          </div>

          {/* Mobile Number */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="font-cormorant mb-1.5 block text-[17px] sm:text-[19px] font-medium text-[#0B6670]">
              Mobile Number <span className="text-[#D89A3D]">*</span>
            </label>
            <div className="flex h-11 sm:h-12 overflow-hidden rounded-[12px] border border-[#C18426]/70 bg-transparent focus-within:border-[#0B6670]">
              <div className="flex items-center gap-1.5 border-r border-[#C18426]/70 bg-transparent px-3 shrink-0">
                <span className="text-base leading-none">🇮🇳</span>
                <span className="font-cormorant text-[16px] font-semibold text-[#3D352F]">
                  +91
                </span>
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                className="flex-1 bg-transparent px-3 font-cormorant text-[16px] sm:text-[17px] text-[#3D352F] placeholder:text-[#9B948B] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Whatsapp Checkbox */}
        <div className="mt-6 flex items-start gap-3">
          <input
            type="checkbox"
            id="whatsapp-updates"
            className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border border-[#C18426] accent-[#0B6670] cursor-pointer"
          />
          <label htmlFor="whatsapp-updates" className="cursor-pointer">
            <h3 className="font-cormorant text-[18px] sm:text-[20px] font-semibold text-[#0B6670] leading-tight">
              Send Seva Updates on Whatsapp
            </h3>
            <p className="font-cormorant mt-0.5 text-[13px] sm:text-[14px] text-[#6D6259]">
              Provide details for whom the seva is being performed
            </p>
          </label>
        </div>
      </div>
    </section>
  );
}
