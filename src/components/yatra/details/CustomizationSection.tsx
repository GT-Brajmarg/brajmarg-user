"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function CustomizationSection() {
  return (
    <section className="flex h-full flex-col justify-between rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/40 p-5 sm:p-6">
      <div>
        <h2 className="font-cormorant text-[26px] sm:text-[28px] font-bold text-[#C37000] leading-tight">
          Need Customization?
        </h2>

        <p className="font-cormorant mt-3 text-[15px] sm:text-[16px] font-semibold leading-snug text-[#3D352F]">
          Planning for family, friends or a special group?
        </p>

        <p className="font-cormorant mt-2 text-[15px] sm:text-[16px] font-semibold leading-snug text-[#3D352F]">
          We can customize travel, stay and arrangements as per your requirements.
        </p>
      </div>

      <div className="mt-6">
        <button className="font-cormorant flex w-full items-center justify-center gap-2 rounded-xl border border-[#C37000] bg-[#EFDEC7]/60 py-2.5 text-[20px] sm:text-[22px] font-bold text-[#C37000] transition hover:bg-[#C37000] hover:text-white">
          <span>Contact Us</span>
          <Image src="/images/phone.svg" alt="Phone" width={20} height={20} className="h-5 w-5 object-contain" />
        </button>
      </div>
    </section>
  );
}
