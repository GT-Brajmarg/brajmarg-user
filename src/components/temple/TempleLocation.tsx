// "use client";

// import Image from "next/image";
// import { Navigation } from "lucide-react";

// const nearbyPlaces = [
//   { name: "Haldighati", distance: "17-20 Km" },
//   { name: "Dwarkadheesh Temple", distance: "15-18 Km" },
//   { name: "Shri Eklingji Prabhu Temple", distance: "25-30 Km" },
//   { name: "Charbhuja Temple", distance: "29-35 Km" },
//   { name: "Kumbhalgarh Fort", distance: "45 Km" },
//   { name: "Udaipur", distance: "45 Km" },
// ];

// export default function TempleLocation() {
//   return (
//     <section className="relative overflow-hidden rounded-[18px] border border-[#D89A3D] bg-[#FBF6EE]">
//       {/* Pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.06]"
//         style={{
//           backgroundImage: "url('/images/mandala-pattern.png')",
//           backgroundSize: "280px",
//           backgroundRepeat: "repeat",
//         }}
//       />

//       <div className="relative flex h-[170px]">
//         {/* LEFT */}
//         <div className="flex w-[300px] items-center justify-center border-r border-[#D89A3D] px-6">
//           <div className="w-full max-w-[220px]">
//             <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
//               Temple Location
//             </h3>

//             <div
//               className="mt-3 text-[14px] leading-[1.5] text-[#4D433B]"
//               style={{ marginTop: "5px" }}
//             >
//               <p>Shrinathji Temple</p>
//               <p>NH 8, Shiv Nagar,</p>
//               <p>Nathdwara, Rajasthan</p>
//               <p>313301</p>
//             </div>

//             <button
//               className="mt-6 flex h-[34px] items-center gap-2 rounded-[8px] border border-[#0B6670] bg-white px-3 text-[13px] font-medium text-[#0B6670] hover:bg-[#F5EEE2]"
//               style={{ marginTop: "10px" }}
//             >
//               Open in Google Maps
//               <Navigation size={14} />
//             </button>
//           </div>
//         </div>

//         {/* MAP */}
//         <div className="relative flex-1 border-r border-[#D89A3D]">
//           <Image
//             src="/images/location-map.jpg"
//             alt="Temple Location"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="flex w-[300px] items-center justify-center px-6">
//           <div className="w-full max-w-[230px]">
//             <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
//               Nearby Places
//             </h3>

//             <div className="mt-3 space-y-1">
//               {nearbyPlaces.map((place) => (
//                 <div
//                   key={place.name}
//                   className="flex justify-between text-[13px] text-[#4D433B]"
//                 >
//                   <span>{place.name}</span>
//                   <span className="text-[#7A6E5F]">~{place.distance}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleLocation } from "@/store/slices/templeLocationSlice";

interface TempleLocationProps {
  templeId: string;
}

export default function TempleLocation({ templeId }: TempleLocationProps) {
  const dispatch = useAppDispatch();

  const { location, nearbyPlaces, loading } = useAppSelector(
    (state) => state.templeLocation,
  );

  useEffect(() => {
    if (templeId) {
      dispatch(getTempleLocation(templeId));
    }
  }, [dispatch, templeId]);

  if (loading) {
    return null;
  }

  if (!location) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-[18px] border border-[#D89A3D] bg-[#FBF6EE]">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/mandala-pattern.png')",
          backgroundSize: "280px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ========================= Desktop ========================= */}
      <div className="relative hidden h-[270px] lg:flex">
        {/* LEFT */}
        <div className="flex w-[300px] items-center justify-center border-r border-[#D89A3D] px-6">
          <div className="w-full max-w-[220px]">
            <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
              Temple Location
            </h3>

            <div
              className="mt-3 text-[14px] leading-[1.5] text-[#4D433B]"
              style={{ marginTop: "10px" }}
            >
              <p>{location.temple_name}</p>
              <p>{location.address_line_1}</p>

              {location.address_line_2 && <p>{location.address_line_2}</p>}

              <p>
                {location.city}, {location.state}
              </p>

              <p>{location.pincode}</p>
            </div>

            <a
              href={location.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-[#0B6670] bg-white px-3 text-[13px] font-medium text-[#0B6670] transition hover:bg-[#F5EEE2]"
              style={{ marginTop: "10px" }}
            >
              Open in Google Maps
              <Navigation size={14} />
            </a>
          </div>
        </div>

        {/* MAP */}
        <div className="relative flex-1 overflow-hidden border-r border-[#D89A3D]">
          <iframe
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16&output=embed`}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* RIGHT */}
        <div className="flex w-[300px] items-center justify-center px-6">
          <div className="w-full max-w-[230px]">
            <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
              Nearby Places
            </h3>

            <div className="mt-3 space-y-1">
              {nearbyPlaces.map((place) => (
                <div
                  key={place.id}
                  className="flex justify-between text-[13px] text-[#4D433B]"
                >
                  <span>{place.place_name}</span>
                  <span className="text-[#7A6E5F]">~{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================= Mobile ========================= */}
      <div className="relative flex flex-col lg:hidden">
        {/* Temple Location */}
        <div className="flex flex-col items-center border-b border-[#D89A3D] p-5 text-center">
          <h3 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
            Temple Location
          </h3>

          <div className="mt-3 space-y-1 text-[15px] leading-6 text-[#4D433B]">
            <p>{location.temple_name}</p>
            <p>{location.address_line_1}</p>

            {location.address_line_2 && <p>{location.address_line_2}</p>}

            <p>
              {location.city}, {location.state}
            </p>

            <p>{location.pincode}</p>
          </div>

          <a
            href={location.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#0B6670] bg-white px-5 text-[14px] font-medium text-[#0B6670] transition hover:bg-[#F5EEE2]"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            Open in Google Maps
            <Navigation size={16} />
          </a>
        </div>

        {/* Map */}
        <div className="relative h-[260px] border-b border-[#D89A3D]">
          <iframe
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16&output=embed`}
            width="100%"
            height="100%"
            className="absolute inset-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Nearby Places */}
        <div className="p-5">
          <h3 className="font-cormorant text-center text-[30px] font-semibold text-[#0B6670]">
            Nearby Places
          </h3>

          <div className="mt-4 space-y-3">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between rounded-xl border border-[#E6D5B6] bg-white px-4 py-3"
              >
                <span className="text-[15px] font-medium text-[#3E342D]">
                  {place.place_name}
                </span>

                <span className="rounded-full bg-[#FFF4DD] px-3 py-1 text-[13px] font-medium text-[#A06A15]">
                  {place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
