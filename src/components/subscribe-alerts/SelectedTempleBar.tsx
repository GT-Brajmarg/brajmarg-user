"use client";

import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

interface Temple {
  id: string;
  name: string;
}

interface SelectedTempleBarProps {
  temples: Temple[];
  onRemove: (id: string) => void;
  onContinue: () => void;
}

export default function SelectedTempleBar({
  temples,
  onRemove,
  onContinue,
}: SelectedTempleBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") || "monthly";
  return (
    <div
      className="rounded-[18px] border-[2px] border-[#C37000] p-4 shadow-md"
      style={{ marginBottom: "40px" }}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="flex items-start gap-3">
            <Image
              src="/images/lotus.png"
              alt=""
              width={65}
              height={56}
              style={{ marginTop: "20px", marginLeft: "20px" }}
            />

            <div>
              <h3
                className={`${cormorantInfant.className} text-[28px] font-bold text-[#3D352F]`}
                style={{ marginTop: "10px" }}
              >
                {temples.length} Temple
                {temples.length > 1 ? "s" : ""} Selected
              </h3>

              <p
                className={`${cormorantInfant.className} text-[20px] font-bold text-[#6B5C4D]`}
                style={{ marginBottom: "10px" }}
              >
                You can add more temples later if you wish.
              </p>
            </div>
          </div>

          {/* Selected Temples */}
          <div className="flex flex-wrap gap-2">
            {temples.map((temple) => (
              <div
                key={temple.id}
                className="flex items-center gap-2 rounded-md border border-[#6FAAB0] bg-[#DDEFF0] px-3 py-2"
              >
                <span
                  className={`${cormorantInfant.className} text-[24px] text-[#0F5C66]`}
                  style={{ marginLeft: "10px" }}
                >
                  {temple.name}
                </span>

                <button onClick={() => onRemove(temple.id)}>
                  <X
                    size={16}
                    className="text-[#0B6670]"
                    style={{ marginRight: "10px" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onContinue}
          className="flex h-[48px] items-center gap-2 rounded-md bg-[#0B6670] px-8 transition hover:bg-[#084F57]"
          style={{ marginRight: "10px" }}
        >
          <span
            className={`${cormorantInfant.className} text-[24px] text-[#EFDEC7]`}
            style={{ marginLeft: "10px" }}
          >
            Continue
          </span>

          <ArrowRight
            size={24}
            className="text-[#EFDEC7]"
            style={{ marginRight: "5px" }}
          />
        </button>
      </div>
    </div>
  );
}
