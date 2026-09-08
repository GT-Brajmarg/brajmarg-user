// "use client";

// interface Props {
//   active: string;
//   onChange: (tab: string) => void;
// }

// const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

// export default function OrdersTabs({ active, onChange }: Props) {
//   return (
//     <div
//       className="rounded-[16px] border border-[#C37000]/64 px-6"
//       style={{ marginTop: "20px" }}
//     >
//       <div className="flex gap-10 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => onChange(tab)}
//             className={`relative h-[58px] text-[18px] whitespace-nowrap transition-colors ${
//               active === tab
//                 ? "font-semibold text-[#5A412C]"
//                 : "text-[#6E5B49] hover:text-[#5A412C]"
//             }`}
//           >
//             {tab}

//             {active === tab && (
//               <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#C37000]" />
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersTabs({ active, onChange }: Props) {
  return (
    <div
      className="rounded-[16px] border border-[#C37000]/64 px-6"
      style={{ marginTop: "20px" }}
    >
      <div
        className="flex gap-10 overflow-x-auto"
        style={{ paddingLeft: "20px" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`${cormorantInfant.className} relative h-[50px] text-[18px] whitespace-nowrap transition-colors ${
              active
                ? "font-semibold text-[#3D352F]"
                : "text-[#3D352F] hover:text-[#5A412C]"
            }`}
          >
            {tab}

            {active === tab && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#C37000]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
