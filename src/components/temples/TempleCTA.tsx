"use client";

import { useState } from "react";
import Image from "next/image";
import RequestTempleModal from "./RequestTempleModal";

export default function TempleCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="mx-auto mt-10 w-full max-w-[1260px] px-4 md:mt-16">
        <div className="flex flex-col items-center gap-6 rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 px-5 py-6 text-center md:h-[120px] md:flex-row md:px-[60px] md:text-left">
          <div className="flex flex-1 flex-col items-center gap-4 md:flex-row">
            <Image
              src="/images/temple-icon-orange.png"
              alt=""
              width={202}
              height={202}
              className="h-[150px] w-[150px] object-contain md:h-[200px] md:w-[200px]"
            />

            <div style={{ marginLeft: "-40px" }}>
              <h3 className="font-cormorant text-[24px] font-semibold text-[#0D6B73] md:text-[28px]">
                Can’t find your Temple?
              </h3>

              <p
                className="mt-2 text-[20px] leading-6 text-[#3D352F] md:text-[15px]"
                style={{ fontWeight: "500" }}
              >
                Request us to add a temple and help others connect with divine
                places.
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="ml-auto hidden h-[42px] min-w-[185px] items-center justify-center rounded-[8px] bg-[#0D6B73] px-6 text-[22px] font-medium text-[#EFDEC7] transition hover:bg-[#0A5960] md:flex"
            style={{ marginRight: "55px" }}
          >
            <p className="font-cormorant text-[16px]">Request a Temple →</p>
          </button>
        </div>
      </section>

      <RequestTempleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
