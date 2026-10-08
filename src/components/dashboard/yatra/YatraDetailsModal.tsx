"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import SevaStatusBadge from "../seva/SevaStatusBadge";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const itinerary = [
  {
    day: "Day 1",
    title: "Haridwar / Rishikesh - Barkot",
    desc: "Arrival at Haridwar/Rishikesh. Drive to Barkot. Overnight stay.",
  },
  {
    day: "Day 2",
    title: "Barkot - Yamunotri - Barkot",
    desc: "Drive to Jankichatti and trek to Yamunotri. Darshan and return.",
  },
  {
    day: "Day 3",
    title: "Barkot - Uttarkashi",
    desc: "Drive to Uttarkashi. Visit Kashi Vishwanath Temple.",
  },
  {
    day: "Day 4",
    title: "Uttarkashi - Gangotri - Uttarkashi",
    desc: "Excursion to Gangotri for darshan. Return to Uttarkashi.",
  },
];

export default function YatraDetailsModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/45 backdrop-blur-[3px]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[#E2C291] bg-[#FDF7EE] shadow-2xl"
        >
          {/* Background */}
          <Image
            src="/images/temple-paper-texture.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-60"
          />

          {/* <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={850}
            height={850}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
          /> */}

          <div className="relative z-10 p-7">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className={`${cormorantInfant.className} text-[30px] font-bold text-[#0F5C66]`}
                  style={{ marginLeft: "20px", marginTop: "20px" }}
                >
                  Char Dham Yatra
                </h2>

                <p
                  className={`${cormorantInfant.className} mt-2 text-[22px] font-bold text-[#5A412C]`}
                  style={{ marginLeft: "20px" }}
                >
                  Booking ID: YT250624001
                </p>
              </div>

              <div
                className="flex items-center gap-4"
                style={{ marginRight: "20px", marginTop: "30px" }}
              >
                <SevaStatusBadge status="upcoming" />

                <button
                  onClick={onClose}
                  className="rounded-full border border-[#D7B58C] p-2 hover:bg-[#FFF2DF]"
                  style={{ marginTop: "-18px" }}
                >
                  <X size={24} className="text-[#6B5744]" />
                </button>
              </div>
            </div>

            {/* Scroll */}
            <div
              className="mt-6 max-h-[70vh] space-y-6 overflow-y-auto pr-2"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              {/* Overview */}

              <div className="rounded-[20px] border border-[#C37000]/60 p-6">
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Yatra Overview
                </h3>

                <div
                  className="space-y-5"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="flex">
                    <Image
                      src="/images/location.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className="ml-4 w-[170px] text-[#3D352F]/80"
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Destinations
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : Yamuna • Gangotri • Kedarnath • Badrinath
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/calendar-1.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className="ml-4 w-[170px] text-[#3D352F]/80"
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Travel Dates
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : 12 July 2026 - 20 July 2026
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/time.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className="ml-4 w-[170px] text-[#3D352F]/80"
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Duration
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : 9 Days / 8 Nights
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/traveller.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className="ml-4 w-[170px] text-[#3D352F]/80"
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Travellers
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : 2 Adults
                    </p>
                  </div>
                </div>
              </div>

              {/* Itinerary */}

              <div
                className="rounded-[20px] border border-[#C37000]/60 p-6"
                style={{ marginTop: "20px" }}
              >
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Day-wise Itinerary
                </h3>

                <div
                  className="space-y-6"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {itinerary.map((item) => (
                    <div key={item.day} className="flex">
                      <div className="w-[90px]">
                        <span
                          className={`${cormorantInfant.className} text-[18px] font-bold text-[#C37000]`}
                        >
                          {item.day}
                        </span>
                      </div>

                      <div>
                        <h4
                          className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                        >
                          {item.title}
                        </h4>

                        <p
                          className={`${cormorantInfant.className} mt-1 text-[14px] leading-7 text-[#6B5744]`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Inclusions */}

              <div
                className="rounded-[20px] border border-[#C37000]/60 p-6"
                style={{ marginTop: "20px" }}
              >
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Inclusions
                </h3>

                <div
                  className="grid grid-cols-3 gap-y-8 text-center"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {[
                    {
                      icon: "/images/transport.svg",
                      title: "Premium Urbania",
                      sub: "17 Seater",
                    },
                    {
                      icon: "/images/manager.svg",
                      title: "Experienced",
                      sub: "Driver",
                    },
                    {
                      icon: "/images/fuel.svg",
                      title: "Fuel & Driver",
                      sub: "Allowance",
                    },
                    {
                      icon: "/images/parking.svg",
                      title: "Toll Tax, Parking",
                      sub: "& Permits",
                    },
                    {
                      icon: "/images/water-bottle.svg",
                      title: "Water",
                      sub: "Bottles",
                    },
                    {
                      icon: "/images/first-aid.svg",
                      title: "First Aid",
                      sub: "Kit",
                    },
                    {
                      icon: "/images/music.svg",
                      title: "Music System &",
                      sub: "Charging Points",
                    },
                    {
                      icon: "/images/accommodation.svg",
                      title: "Accommodation",
                      sub: "(Triple/Quad Sharing)",
                    },
                    {
                      icon: "/images/meals-1.svg",
                      title: "All Meals",
                      sub: "(Veg)",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4">
                      <Image
                        src={item.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="shrink-0"
                      />

                      <div>
                        <p
                          className={`${cormorantInfant.className} text-[18px] leading-5 font-bold text-[#3D352F]`}
                        >
                          {item.title}
                        </p>

                        {item.sub && (
                          <p
                            className={`${cormorantInfant.className} text-[16px] leading-5 text-[#3D352F]`}
                          >
                            {item.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traveller Details */}

              <div
                className="rounded-[20px] border border-[#C37000]/60 p-6"
                style={{ marginTop: "20px" }}
              >
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Traveller Details
                </h3>

                <div
                  className="grid grid-cols-3 gap-6 rounded-[14px] border border-[#C37000] bg-[#C37000]/20 p-5"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/traveller.svg"
                      alt=""
                      width={22}
                      height={22}
                      style={{ marginLeft: "30px" }}
                    />

                    <div>
                      <p
                        className={`${cormorantInfant.className} text-[14px] text-[#7A654F]`}
                        style={{ marginTop: "10px" }}
                      >
                        Travellers
                      </p>

                      <p
                        className={`${cormorantInfant.className} text-[16px] font-bold`}
                        style={{ marginBottom: "10px" }}
                      >
                        2 Adults
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/user.svg"
                      alt=""
                      width={22}
                      height={22}
                    />

                    <div>
                      <p
                        className={`${cormorantInfant.className} text-[14px] text-[#7A654F]`}
                        style={{ marginTop: "10px" }}
                      >
                        Contact Person
                      </p>

                      <p
                        className={`${cormorantInfant.className} text-[16px] font-bold`}
                        style={{ marginBottom: "10px" }}
                      >
                        Rahul Sharma
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/phone.svg"
                      alt=""
                      width={22}
                      height={22}
                    />

                    <div>
                      <p
                        className={`${cormorantInfant.className} text-[14px] text-[#7A654F]`}
                        style={{ marginTop: "10px" }}
                      >
                        Mobile
                      </p>

                      <p
                        className={`${cormorantInfant.className} text-[16px] font-bold`}
                        style={{ marginBottom: "10px" }}
                      >
                        +91 67829 98765
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}

              <div
                className="mt-8 flex gap-5"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <button className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[12px] border border-[#C37000] bg-transparent text-[#C37000] transition hover:bg-[#FFF6EC]">
                  <Image
                    src="/images/download-invoice.svg"
                    alt=""
                    width={28}
                    height={28}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[24px] font-bold`}
                  >
                    Download Itinerary
                  </span>
                </button>

                <button className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[12px] bg-[#C37000] text-white transition hover:bg-[#A85E00]">
                  <Image
                    src="/images/need-help.svg"
                    alt=""
                    width={28}
                    height={28}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[24px] font-bold`}
                  >
                    Need Help
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
