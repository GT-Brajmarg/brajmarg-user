// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import RequestTempleModal from "./RequestTempleModal";

// export default function TempleCTA() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <section className="mx-auto mt-10 w-full max-w-[1260px] px-4 md:mt-16">
//         <div className="flex flex-col items-center gap-6 rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 px-5 py-6 text-center md:h-[120px] md:flex-row md:px-[60px] md:text-left">
//           <div className="flex flex-1 flex-col items-center gap-4 md:flex-row">
//             <Image
//               src="/images/temple-icon-orange.png"
//               alt=""
//               width={202}
//               height={202}
//               className="h-[150px] w-[150px] object-contain md:h-[200px] md:w-[200px]"
//             />

//             <div style={{ marginLeft: "-40px" }}>
//               <h3 className="font-cormorant text-[24px] font-semibold text-[#0D6B73] md:text-[28px]">
//                 Can’t find your Temple?
//               </h3>

//               <p
//                 className="mt-2 text-[20px] leading-6 text-[#3D352F] md:text-[15px]"
//                 style={{ fontWeight: "500" }}
//               >
//                 Request us to add a temple and help others connect with divine
//                 places.
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setOpen(true)}
//             className="ml-auto hidden h-[42px] min-w-[185px] items-center justify-center rounded-[8px] bg-[#0D6B73] px-6 text-[22px] font-medium text-[#EFDEC7] transition hover:bg-[#0A5960] md:flex"
//             style={{ marginRight: "55px" }}
//           >
//             <p className="font-cormorant text-[16px]">Request a Temple →</p>
//           </button>
//         </div>
//       </section>

//       <RequestTempleModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import RequestTempleModal from "./RequestTempleModal";

export default function TempleCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="mx-auto mt-10 w-full max-w-[1260px] px-4 md:mt-16">
        <div className="flex flex-col items-center gap-6 rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 px-5 py-6 text-center md:flex-row md:items-center md:gap-4 md:px-8 md:py-5 md:text-left lg:h-[120px] lg:px-[60px]">
          <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:items-center">
            <Image
              src="/images/temple-icon-orange.png"
              alt=""
              width={202}
              height={202}
              className="h-[110px] w-[110px] object-contain md:h-[90px] md:w-[90px] lg:h-[200px] lg:w-[200px]"
            />

            <div className="text-center md:ml-0 md:text-left">
              <h3 className="font-cormorant text-[24px] font-semibold text-[#0D6B73] md:text-[22px] lg:text-[28px]">
                Can't find your Temple?
              </h3>

              <p
                className="mt-1 text-[14px] leading-5 text-[#3D352F] md:text-[13px] lg:text-[15px]"
                style={{ fontWeight: "500" }}
              >
                Request us to add a temple and help others connect with divine
                places.
              </p>
            </div>
          </div>

          {/* Desktop & Tablet Button */}
          <button
            onClick={() => setOpen(true)}
            className="ml-auto hidden h-[42px] min-w-[160px] items-center justify-center gap-[10px] rounded-[8px] bg-[#0D6B73] px-5 text-[#EFDEC7] transition hover:bg-[#0A5960] md:flex md:flex-shrink-0 lg:min-w-[185px] lg:px-6"
            style={{ marginRight: "16px" }}
          >
            <p className="font-cormorant text-[15px] lg:text-[16px]">Request a Temple</p>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M1 7H19M19 7L13 1M19 7L13 13" stroke="#EFDEC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-[46px] w-full max-w-[260px] items-center justify-center gap-[10px] rounded-[8px] bg-[#0D6B73] px-6 text-[#EFDEC7] transition hover:bg-[#0A5960] md:hidden"
            style={{ marginBottom: "30px" }}
          >
            <p className="font-cormorant text-[18px]">Request a Temple</p>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M1 7H19M19 7L13 1M19 7L13 13" stroke="#EFDEC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      <RequestTempleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
