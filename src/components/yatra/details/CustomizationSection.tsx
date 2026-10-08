"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function CustomizationSection() {
  return (
    <section className="flex h-full flex-col rounded-[20px] border-2 border-[#C37000] bg-[#C37000]/10 p-6">
      <h2
        className="font-cormorant text-[32px] font-bold text-[#C37000]"
        style={{ marginLeft: "20px" }}
      >
        Need Customization?
      </h2>

      <p
        className={`${cormorantInfant.className} mt-4 text-[20px] leading-8 font-bold text-[#3D352F]`}
        style={{ marginLeft: "20px" }}
      >
        Planning for family, friends or a special group?
      </p>

      <p
        className={`${cormorantInfant.className} mt-4 text-[20px] leading-8 font-bold text-[#3D352F]`}
        style={{ marginLeft: "20px" }}
      >
        We can customize travel, stay and arrangements as per your requirements.
      </p>

      <div
        className="mt-auto pt-10"
        style={{ marginTop: "30px", marginLeft: "40px" }}
      >
        <button className="font-cormorant flex w-[300px] items-center justify-center gap-3 rounded-xl border border-[#C37000] py-3 text-[28px] font-semibold text-[#C37000] transition hover:bg-[#C37000] hover:text-white">
          Contact Us
          <Image src="/images/phone.svg" alt="Phone" width={22} height={22} />
        </button>
      </div>
    </section>
  );
}
