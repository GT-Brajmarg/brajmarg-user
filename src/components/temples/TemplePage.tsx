// import TempleHero from "./TempleHero";
// import TempleSearch from "./TempleSearch";
// import TempleGrid from "./TempleGrid";
// import TempleCTA from "./TempleCTA";

// export default function TemplePage() {
//   return (
//     <main className="min-h-screen bg-[#F7F0E5]">
//       <section className="relative h-[340px] overflow-visible">
//         <TempleHero />

//         <div className="absolute bottom-[-200px] left-1/2 z-20 w-full max-w-[1180px] -translate-x-1/2 px-5 md:bottom-[-95px]">
//           <TempleSearch />
//         </div>
//       </section>

//       <section
//         className="pt-[200px]"
//         style={{ marginTop: "260px", marginLeft: "120px" }}
//       >
//         <TempleGrid />
//       </section>
//       <section
//         className="pt-8"
//         style={{ marginBottom: "50px", marginLeft: "120px" }}
//       >
//         <TempleCTA />
//       </section>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import TempleHero from "./TempleHero";
import TempleSearch from "./TempleSearch";
import TempleGrid from "./TempleGrid";
import TempleCTA from "./TempleCTA";

export default function TemplePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="min-h-screen bg-[#F7F0E5]">
      <section className="relative h-[550px] overflow-visible md:h-[340px]">
        <TempleHero />

        <div className="absolute bottom-[-50px] left-1/2 z-20 w-full max-w-[1180px] -translate-x-1/2 px-5 md:bottom-[-95px]">
          <TempleSearch onSearch={setSearchTerm} />
        </div>
      </section>

      <section
        className="mt-[220px] md:mt-[500px]"
        style={{ marginTop: "120px" }}
      >
        <TempleGrid searchTerm={searchTerm} />
      </section>
      <section
        className="mb-[50px] flex justify-center pt-8"
        style={{ marginBottom: "50px" }}
      >
        <TempleCTA />
      </section>
    </main>
  );
}
