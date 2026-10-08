// "use client";

// import Image from "next/image";
// import { Cormorant_Infant } from "next/font/google";

// const cormorantInfant = Cormorant_Infant({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// export default function OrdersHero() {
//   return (
//     <section className="relative overflow-hidden rounded-[24px] border border-[#E6C8A2] bg-[#FFF9F2] px-8 py-8">
//       {/* Background Mandala */}
//       <Image
//         src="/images/mandala_bg_1.png"
//         alt=""
//         width={520}
//         height={520}
//         className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
//       />

//       {/* Temple Illustration */}
//       <Image
//         src="/images/dashboard/temple-outline.png"
//         alt=""
//         width={340}
//         height={150}
//         className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 opacity-25"
//       />

//       <div className="relative z-10 max-w-xl">
//         <h1
//           className={`${cormorantInfant.className} text-[44px] leading-none font-semibold text-[#0B6670]`}
//         >
//           My Orders
//         </h1>

//         <div className="mt-3 flex items-center gap-3">
//           <div className="h-px w-20 bg-[#D8B07A]" />

//           <Image
//             src="/images/lotus-divider.svg"
//             alt=""
//             width={18}
//             height={18}
//           />

//           <div className="h-px max-w-[60px] flex-1 bg-[#D8B07A]" />
//         </div>

//         <p className="mt-5 max-w-lg text-[17px] leading-7 text-[#5E4631]">
//           View and manage all your orders in one place.
//         </p>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OrdersHero() {
  return (
    <section className="relative pb-5">
      {/* Temple Illustration */}
      <Image
        src="/images/temple-outline.svg"
        alt=""
        width={448}
        height={200}
        className="pointer-events-none absolute right-0 bottom-0"
      />

      {/* Birds */}

      <div className="relative z-10" style={{ marginTop: "30px" }}>
        <h1
          className={`${cormorantInfant.className} text-[30px] leading-none font-bold text-[#0F5C66]`}
        >
          My Orders
        </h1>

        {/* Divider */}
        <div
          className="mt-4 flex items-center"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <div className="h-[1px] w-[160px] bg-[#D8A96B]" />

          <Image
            src="/images/lotus.png"
            alt=""
            width={30}
            height={20}
            className="mx-3"
            style={{ marginLeft: "5px" }}
          />
        </div>

        <p
          className={`${cormorantInfant.className} mt-6 max-w-xl text-[20px] leading-8 font-bold text-[#3D352F]`}
        >
          View and manage all your orders in one place.
        </p>
      </div>
    </section>
  );
}
