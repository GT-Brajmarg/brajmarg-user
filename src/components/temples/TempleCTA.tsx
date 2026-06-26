// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import RequestTempleModal from "./RequestTempleModal";
// import RequestTempleForm from "./RequestTempleForm"; // Your existing form component

// export default function TempleCTA() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <section className="mx-auto mt-10 w-full max-w-[1180px] px-4 md:mt-16">
//         <div className="flex flex-col items-center gap-6 rounded-[18px] border border-[#D49A2A] bg-[#F8F1E6] px-5 py-6 text-center md:h-[120px] md:flex-row md:px-[60px] md:text-left">
//           {/* Left */}
//           <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:gap-5">
//             <Image
//               src="/images/temple-icon-orange.png"
//               alt=""
//               width={202}
//               height={202}
//               className="h-[80px] w-[80px] object-contain md:h-[120px] md:w-[120px]"
//             />

//             <div>
//               <h3 className="font-cormorant text-[24px] font-semibold text-[#0D6B73] md:text-[28px]">
//                 Can’t find your Temple?
//               </h3>

//               <p className="mt-2 text-[14px] leading-6 text-[#5F5140] md:text-[15px]">
//                 Request us to add a temple and help others connect with divine
//                 places.
//               </p>
//             </div>
//           </div>

//           {/* Desktop Button */}
//           <button
//             onClick={() => setOpen(true)}
//             className="ml-auto hidden h-[42px] min-w-[185px] items-center justify-center rounded-[8px] bg-[#0D6B73] px-6 text-[15px] font-medium text-white transition hover:bg-[#0A5960] md:flex"
//             style={{ marginRight: "55px" }}
//           >
//             <p className="font-cormorant text-[16px]">Request a Temple →</p>
//           </button>

//           {/* Mobile Button */}
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-[42px] min-w-[185px] items-center justify-center rounded-[8px] bg-[#0D6B73] px-6 text-[15px] font-medium text-white transition hover:bg-[#0A5960] md:hidden"
//             style={{ marginBottom: "20px" }}
//           >
//             <p className="font-cormorant">Request a Temple →</p>
//           </button>
//         </div>
//       </section>

//       {/* Popup */}
//       <RequestTempleModal open={open} onClose={() => setOpen(false)}>
//         <RequestTempleForm />
//       </RequestTempleModal>
//     </>
//   );
// }
//
"use client";

import { useState } from "react";
import Image from "next/image";
import RequestTempleModal from "./RequestTempleModal";

export default function TempleCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="mx-auto mt-10 w-full max-w-[1180px] px-4 md:mt-16">
        <div className="flex flex-col items-center gap-6 rounded-[18px] border border-[#D49A2A] bg-[#F8F1E6] px-5 py-6 text-center md:h-[120px] md:flex-row md:px-[60px] md:text-left">
          <div className="flex flex-1 flex-col items-center gap-4 md:flex-row">
            <Image
              src="/images/temple-icon-orange.png"
              alt=""
              width={202}
              height={202}
              className="h-[80px] w-[80px] object-contain md:h-[120px] md:w-[120px]"
            />

            <div>
              <h3 className="font-cormorant text-[24px] font-semibold text-[#0D6B73] md:text-[28px]">
                Can’t find your Temple?
              </h3>

              <p className="mt-2 text-[14px] leading-6 text-[#5F5140] md:text-[15px]">
                Request us to add a temple and help others connect with divine
                places.
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-[#0D6B73] px-6 py-3 text-white"
          >
            Request a Temple →
          </button>
        </div>
      </section>

      <RequestTempleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
