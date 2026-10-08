"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setUpdateTypes } from "@/store/slices/subscriptionSlice";

type UpdateType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const updateTypes: UpdateType[] = [
  {
    id: "darshan",
    title: "Darshan Timings",
    description: "Get notified about darshan timings and temple updates.",
    image: "/images/darshan.svg",
  },
  {
    id: "festival",
    title: "Festival Alerts",
    description:
      "Receive updates on Ekadashi, Janmashtami and other festivals.",
    image: "/images/festival.svg",
  },
  {
    id: "aarti",
    title: "Aarti Reminders",
    description: "Never miss aarti ceremonies and special prayers.",
    image: "/images/aarti.svg",
  },
  {
    id: "yatra",
    title: "Yatra Updates",
    description: "Stay informed about yatra schedules and announcements.",
    image: "/images/yatra.svg",
  },
  {
    id: "prasad",
    title: "Prasad Dispatch",
    description: "Get updates on prasad booking and dispatch status.",
    image: "/images/prasad.svg",
  },
  {
    id: "seva",
    title: "Seva Availability",
    description: "Know when seva bookings are available.",
    image: "/images/seva.svg",
  },
];

export default function UpdateTypes() {
  const [selected, setSelected] = useState<string[]>([
    "darshan",
    "festival",
    "aarti",
    "yatra",
    "seva",
  ]);

  useEffect(() => {
    dispatch(setUpdateTypes(selected));
  }, []);

  const dispatch = useAppDispatch();

  const toggle = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setSelected(updated);

    dispatch(setUpdateTypes(updated));
  };

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Heading */}

      <div
        className="flex items-center gap-2"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        <Image src="/images/bell-1.svg" alt="" width={34} height={34} />

        <h2 className="font-cormorant text-[28px] font-bold text-[#0F5C66]">
          Types of Updates
        </h2>
      </div>

      <p
        className="font-cormorant mt-1 ml-6 text-[16px] text-[#3D352F]"
        style={{ marginLeft: "50px" }}
      >
        Choose the types of updates you want to receive.
      </p>

      {/* Cards */}

      <div
        className="mt-5 grid grid-cols-3 gap-3"
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {updateTypes.map((item) => {
          const active = selected.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`group relative rounded-[10px] border p-4 text-center transition-all duration-300 ${
                active
                  ? "border-[#0F5C66]"
                  : "border-[#D7B06B] hover:border-[#C37000]"
              }`}
            >
              {/* Tick */}

              <div
                className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border ${
                  active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D7B06B]"
                }`}
              >
                {active && (
                  <Check size={12} strokeWidth={3} className="text-white" />
                )}
              </div>

              {/* Icon */}

              <div
                className="flex justify-center"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>

              {/* Title */}

              <h3 className="font-cormorant mt-3 text-[20px] font-semibold text-[#3D352F]">
                {item.title}
              </h3>

              {/* Divider */}

              <div className="my-2 flex justify-center">
                <Image
                  src="/images/lotus-divider-1.svg"
                  alt=""
                  width={70}
                  height={10}
                  className="object-contain"
                />
              </div>

              {/* Description */}

              <p
                className="font-cormorant text-[14px] leading-4 text-[#6B5C4D]"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
