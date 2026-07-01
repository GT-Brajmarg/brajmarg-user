// "use client";

// import { Lock } from "lucide-react";
// import { useState } from "react";

// const quantities = [
//   {
//     id: "1",
//     quantity_label: "100 gm",
//     price: 251,
//   },
//   {
//     id: "2",
//     quantity_label: "200 gm",
//     price: 501,
//   },
//   {
//     id: "3",
//     quantity_label: "500 gm",
//     price: 751,
//   },
//   {
//     id: "4",
//     quantity_label: "1 kg",
//     price: 1101,
//   },
//   {
//     id: "5",
//     quantity_label: "2 kg",
//     price: 2251,
//   },
// ];

// export default function Booking() {
//   const [selectedQuantity, setSelectedQuantity] = useState(quantities[0].id);

//   return (
//     <section className="mt-10 rounded-[22px] border border-[#D89A3D] bg-[#FCF8F1] p-8">
//       {/* Heading */}
//       <div className="flex items-start gap-3" style={{ marginTop: "20px" }}>
//         <Lock
//           size={22}
//           className="mt-1 text-[#D89A3D]"
//           style={{ marginTop: "20px", marginLeft: "20px" }}
//         />

//         <div>
//           <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
//             Choose Quantity
//           </h2>

//           <p className="text-[14px] text-[#6B6258]">
//             Select the pack size of prasad you wish to order.
//           </p>
//         </div>
//       </div>

//       {/* Quantity Cards */}
//       <div
//         className="mt-8 flex justify-center"
//         style={{ marginTop: "30px", marginBottom: "20px" }}
//       >
//         <div className="flex max-w-[700px] flex-wrap justify-center gap-4">
//           {quantities.map((item) => {
//             const active = selectedQuantity === item.id;

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setSelectedQuantity(item.id)}
//                 className={`flex h-[86px] w-[118px] flex-col items-center justify-center rounded-xl border transition-all duration-200 ${
//                   active
//                     ? "border-[#0B6670] bg-[#F8FCFC] shadow-sm"
//                     : "border-[#E5C48A] bg-white hover:border-[#D89A3D]"
//                 }`}
//               >
//                 <div className="mb-2 flex items-center gap-2">
//                   <div
//                     className={`flex h-4 w-4 items-center justify-center rounded-full border ${
//                       active ? "border-[#0B6670]" : "border-[#D89A3D]"
//                     }`}
//                   >
//                     {active && (
//                       <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
//                     )}
//                   </div>

//                   <span className="text-[16px] font-medium text-[#2B2B2B]">
//                     {item.quantity_label}
//                   </span>
//                 </div>

//                 <span className="text-[30px] font-semibold text-[#0B6670]">
//                   ₹ {item.price}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { Lock } from "lucide-react";

interface QuantityOption {
  id: string;
  quantity_label: string;
  price: number;
}

interface Props {
  quantities: QuantityOption[];
  selectedQuantity: string;
  onQuantityChange: (id: string) => void;
}

export default function Booking({
  quantities,
  selectedQuantity,
  onQuantityChange,
}: Props) {
  return (
    <section className="mt-10 rounded-[22px] border border-[#D89A3D] bg-[#FCF8F1] p-8">
      {/* Heading */}

      <div className="flex items-start gap-3" style={{ marginTop: "20px" }}>
        <Lock
          size={22}
          className="mt-1 text-[#D89A3D]"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        />

        <div>
          <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
            Choose Quantity
          </h2>

          <p className="text-[14px] text-[#6B6258]">
            Select the pack size of prasad you wish to order.
          </p>
        </div>
      </div>

      {/* Quantity Cards */}

      <div
        className="mt-8 flex justify-center"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <div className="flex max-w-[700px] flex-wrap justify-center gap-4">
          {quantities.map((item) => {
            const active = selectedQuantity === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onQuantityChange(item.id)}
                className={`flex h-[86px] w-[118px] flex-col items-center justify-center rounded-xl border transition-all duration-200 ${
                  active
                    ? "border-[#0B6670] bg-[#F8FCFC] shadow-sm"
                    : "border-[#E5C48A] bg-white hover:border-[#D89A3D]"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? "border-[#0B6670]" : "border-[#D89A3D]"
                    }`}
                  >
                    {active && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
                    )}
                  </div>

                  <span className="text-[16px] font-medium text-[#2B2B2B]">
                    {item.quantity_label}
                  </span>
                </div>

                <span className="text-[30px] font-semibold text-[#0B6670]">
                  ₹ {item.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
