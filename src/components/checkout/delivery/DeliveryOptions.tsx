// "use client";

// import { Truck } from "lucide-react";
// import { useState } from "react";

// export default function DeliveryOptions() {
//   const [selected, setSelected] = useState("standard");

//   const options = [
//     {
//       id: "standard",
//       title: "Standard Delivery",
//       duration: "4–7 Business Days",
//       price: "FREE",
//     },
//     {
//       id: "express",
//       title: "Express Delivery",
//       duration: "1–3 Business Days",
//       price: "₹149",
//     },
//   ];

//   return (
//     <div className="rounded-3xl border border-[#D79B32] bg-[#FFF9F0] p-8">
//       <h2 className="font-cormorant text-4xl font-semibold text-[#0B6670]">
//         Delivery Method
//       </h2>

//       <div className="mt-6 space-y-4">
//         {options.map((option) => {
//           const active = selected === option.id;

//           return (
//             <button
//               key={option.id}
//               onClick={() => setSelected(option.id)}
//               className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
//                 active
//                   ? "border-[#0B6670] bg-[#F2FBFA]"
//                   : "border-[#E4D3B3] bg-white"
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <Truck className="text-[#C67A00]" />

//                 <div>
//                   <h3 className="font-semibold text-[#0B6670]">
//                     {option.title}
//                   </h3>

//                   <p className="text-sm text-[#666]">{option.duration}</p>
//                 </div>
//               </div>

//               <span className="font-semibold text-[#0B6670]">
//                 {option.price}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import { Truck } from "lucide-react";
import { useState } from "react";

export default function DeliveryOptions() {
  const [selected, setSelected] = useState("standard");

  const options = [
    {
      id: "standard",
      title: "Standard Delivery",
      days: "2–4 Business Days",
      price: "₹49",
    },
    {
      id: "express",
      title: "Express Delivery",
      days: "1–2 Business Days",
      price: "₹99",
    },
  ];

  return (
    <section className="mt-5 rounded-2xl border border-[#D59A33] bg-[#FFF9F0]/80 p-5">
      <div className="mb-5 flex items-center gap-2">
        <Truck
          size={18}
          className="text-[#C67A00]"
          style={{ margin: "10px" }}
        />

        <h2 className="font-cormorant text-[25px] font-semibold text-[#0B6670]">
          Delivery Options
        </h2>
      </div>

      <div
        className="grid grid-cols-2 gap-4"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        {options.map((option) => {
          const active = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`rounded-xl border p-4 text-left transition ${
                active ? "border-[#0B6670] bg-[#F3FBFA]" : "border-[#E8C78D]"
              }`}
            >
              <div
                className="flex items-center gap-2"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              >
                <div
                  className={`h-4 w-4 rounded-full border ${
                    active
                      ? "border-[#0B6670] bg-[#0B6670]"
                      : "border-[#C8B08B]"
                  }`}
                />

                <h3 className="text-[15px] font-medium">{option.title}</h3>
              </div>

              <div
                className="mt-2 flex justify-between text-sm text-[#6F6356]"
                style={{ marginLeft: "30px", marginBottom: "10px" }}
              >
                <span>{option.days}</span>

                <span style={{ marginRight: "30px" }}>{option.price}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
