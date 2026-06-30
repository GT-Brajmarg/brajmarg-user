"use client";

import {
  CalendarDays,
  Clock3,
  UserRound,
  MessageSquare,
  Info,
  Circle,
} from "lucide-react";

const dates = [
  { day: 20, month: "June", week: "Sat" },
  { day: 21, month: "June", week: "Sun" },
  { day: 22, month: "June", week: "Mon", active: true },
  { day: 23, month: "June", week: "Tue" },
  { day: 24, month: "June", week: "Wed" },
  { day: 25, month: "June", week: "Thu" },
  { day: 26, month: "June", week: "Fri" },
  { day: 27, month: "June", week: "Sat" },
];

const slots = [
  {
    time: "12:30 PM",
    status: "2 Slots Available",
    color: "text-[#22A547]",
  },
  {
    time: "1:00 PM",
    status: "2 Slots Available",
    color: "text-[#22A547]",
    active: true,
  },
  {
    time: "1:30 PM",
    status: "Only 1 Slot Left",
    color: "text-[#D98200]",
  },
  {
    time: "2:00 PM",
    status: "2 Slots Available",
    color: "text-[#22A547]",
  },
  {
    time: "2:30 PM",
    status: "Only 1 Slot Left",
    color: "text-[#D98200]",
  },
];

export default function Booking() {
  return (
    <section className="mt-16 rounded-[28px] border border-[#D89A3D] bg-[#FCF8F1] p-8 shadow-sm lg:p-10">
      {/* ================= Date Selection ================= */}
      <div>
        <div
          className="mb-6 flex items-start gap-3"
          style={{ marginTop: "10px" }}
        >
          <CalendarDays
            className="mt-1 h-6 w-6 text-[#D89A3D]"
            style={{ marginTop: "15px", marginLeft: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
              Select Seva Date
            </h2>

            <p className="text-sm text-[#6D6259]">
              Choose the date on which you wish to perform this seva
            </p>
          </div>
        </div>

        {/* Date Slider */}
        <div className="flex items-center gap-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D89A3D] text-[#D89A3D] transition hover:bg-[#FFF4E8]"
            style={{ marginLeft: "5px" }}
          >
            ❮
          </button>

          <div
            className="flex flex-1 justify-between gap-3"
            style={{ marginTop: "10px" }}
          >
            {dates.map((date) => (
              <div
                key={date.day}
                className={`flex h-[106px] w-[106px] cursor-pointer flex-col items-center justify-center rounded-xl border transition ${
                  date.active
                    ? "border-[#0B6670] bg-[#0B6670] text-white"
                    : "border-[#E5C48A] bg-white text-[#0B6670] hover:border-[#D89A3D]"
                }`}
              >
                <span className="text-[22px] leading-none font-bold">
                  {date.day}
                </span>

                <span className="font-cormorant mt-1 text-[22px]">
                  {date.month}
                </span>

                <span className="text-xs opacity-80">{date.week}</span>
              </div>
            ))}
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D89A3D] text-[#D89A3D] transition hover:bg-[#FFF4E8]"
            style={{ marginRight: "5px" }}
          >
            ❯
          </button>
        </div>
      </div>

      {/* ================= Time Slot ================= */}
      <div className="mt-10">
        <div
          className="mb-6 flex items-start gap-3"
          style={{ marginTop: "20px" }}
        >
          <Clock3
            className="mt-1 h-6 w-6 text-[#D89A3D]"
            style={{ marginTop: "15px", marginLeft: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
              Select Time Slot
            </h2>

            <p className="text-sm text-[#6D6259]">Timings are in IST</p>
          </div>
        </div>

        {/* Time Slots */}
        <div
          className="grid grid-cols-5 gap-4"
          style={{ marginLeft: "40px", marginRight: "40px", marginTop: "10px" }}
        >
          {slots.map((slot) => (
            <div
              key={slot.time}
              className={`h-[60px] w-[200px] cursor-pointer rounded-xl border bg-white px-5 py-4 text-center transition ${
                slot.active
                  ? "border-2 border-[#0B6670] shadow-sm"
                  : "border-[#E5C48A] hover:border-[#D89A3D]"
              }`}
            >
              <p className="text-[18px] font-semibold text-[#0B6670]">
                {slot.time}
              </p>

              <p className={`mt-1 text-sm ${slot.color}`}>{slot.status}</p>
            </div>
          ))}
        </div>

        {/* Info */}
        <div
          className="mt-4 flex items-center gap-2"
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Info size={16} className="text-[#D89A3D]" strokeWidth={2} />

          <p className="text-sm text-[#6D6259]">
            Rajbhog Seva is performed during the afternoon bhog.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-[#E8DCC8]" />

      {/* ================= Devotee Details ================= */}
      {/* ================= Devotee Details ================= */}
      <div>
        {/* Heading */}
        <div
          className="mb-6 flex items-start gap-3"
          style={{ marginTop: "10px" }}
        >
          <UserRound
            className="mt-1 h-6 w-6 text-[#D89A3D]"
            style={{ marginTop: "15px", marginLeft: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
              Devotee Details
            </h2>

            <p className="text-sm text-[#6D6259]">
              Provide details for whom the seva is being performed
            </p>
          </div>
        </div>

        {/* Radio Cards */}
        <div
          className="grid gap-8 lg:grid-cols-2"
          style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px" }}
        >
          {/* Myself */}
          <button className="flex items-start gap-4 rounded-2xl border-2 border-[#0B6670] bg-white px-6 py-5 transition">
            <div
              className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#0B6670]"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              <div className="h-3.5 w-3.5 rounded-full bg-[#0B6670]" />
            </div>

            <div className="text-left">
              <h3 className="font-cormorant text-[22px] font-semibold text-[#0B6670]">
                For Myself / My Family
              </h3>

              <p className="mt-1 text-sm text-[#6D6259]">
                Seva will be performed in your name
              </p>
            </div>
          </button>

          {/* Someone Else */}
          <button className="flex items-start gap-4 rounded-2xl border border-[#D89A3D] bg-white px-6 py-5 transition hover:border-[#0B6670]">
            <div
              className="mt-1 h-6 w-6 rounded-full border border-[#D89A3D]"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            />

            <div className="text-left">
              <h3 className="font-cormorant text-[22px] font-semibold text-[#0B6670]">
                For Someone Else
              </h3>

              <p className="mt-1 text-sm text-[#6D6259]">
                Seva will be performed on behalf of others
              </p>
            </div>
          </button>
        </div>

        {/* Form */}
        <div
          className="mt-8 grid gap-6 lg:grid-cols-3"
          style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px" }}
        >
          {/* Name */}
          <div>
            <label className="font-cormorant mb-2 block text-[20px] text-[#0B6670]">
              Full Name <span className="text-[#D89A3D]">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter Full Name"
              className="h-12 w-full rounded-xl border border-[#D89A3D] bg-white px-5 text-[#4F4941] outline-none placeholder:pl-2 placeholder:text-[#9B948B] focus:border-[#0B6670]"
            />
          </div>

          {/* Gotra */}
          <div>
            <label className="font-cormorant mb-2 block text-[20px] text-[#0B6670]">
              Gotra (Optional)
            </label>

            <input
              type="text"
              placeholder="Enter Gotra"
              className="h-12 w-full rounded-xl border border-[#D89A3D] bg-white px-5 text-[#4F4941] outline-none placeholder:pl-3 placeholder:text-[#9B948B] focus:border-[#0B6670]"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="font-cormorant mb-2 block text-[20px] text-[#0B6670]">
              Mobile Number <span className="text-[#D89A3D]">*</span>
            </label>

            <div className="flex h-12 overflow-hidden rounded-xl border border-[#D89A3D] bg-white">
              <div className="flex w-[50px] items-center gap-2 border-r border-[#E7D5B5] px-4">
                {/* <span className="text-lg">🇮🇳</span> */}
                <span className="text-[#4F4941]">+91</span>
              </div>

              <input
                type="tel"
                placeholder="Enter Mobile Number"
                className="flex-1 px-4 outline-none placeholder:pl-3 placeholder:text-[#9B948B]"
              />
            </div>
          </div>
        </div>

        {/* Whatsapp */}
        <div
          className="mt-8 flex items-start gap-4"
          style={{
            marginLeft: "20px",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-[#D89A3D] accent-[#0B6670]"
            style={{ marginTop: "15px" }}
          />

          <div>
            <h3 className="font-cormorant text-[22px] font-semibold text-[#0B6670]">
              Send Seva Updates on Whatsapp
            </h3>

            <p className="text-sm text-[#6D6259]">
              Provide details for whom the seva is being performed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
