// import DashboardHero from "@/components/dashboard/DashboardHero";
// // import DashboardOverview from "@/components/dashboard/DashboardOverview";
// // import RecentActivity from "@/components/dashboard/RecentActivity";
// import Image from "next/image";

// export default function DashboardPage() {
//   return (
//     <main className="relative isolate overflow-hidden bg-[#F8F2E8]">
//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         {/* Paper Texture */}
//         <Image
//           src="/images/temple-paper-texture.png"
//           alt=""
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover opacity-[0.24]"
//         />

//         {/* Decorative Mandalas */}
//         <Image
//           src="/images/mandala_bg_1.png"
//           alt=""
//           width={1050}
//           height={1050}
//           className="absolute top-[250px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
//         />

//         <Image
//           src="/images/mandala_bg_1.png"
//           alt=""
//           width={950}
//           height={950}
//           className="absolute top-[1100px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.035]"
//         />
//       </div>

//       {/* Hero */}

//       {/* Content */}
//       <div className="relative z-10">
//         <DashboardHero />
//       </div>
//       {/* <DashboardOverview />

//           <RecentActivity /> */}
//     </main>
//   );
// }
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
// import DashboardOverview from "@/components/dashboard/DashboardOverview";
// import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-[#F8F2E8]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Full payment page paper texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Mandala behind payment heading / stepper */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind payment methods */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[850px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Mandala behind order summary / bottom payment content */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1700px] left-1/2 w-[700px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="flex w-full max-w-[1200px] gap-8 px-4 py-10">
          {/* Sidebar */}
          <div className="w-[270px] shrink-0 border-r border-[#C37000]/30">
            <DashboardSidebar />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8" style={{ marginTop: "30px" }}>
            <DashboardHero />
            <DashboardOverview />
            <RecentActivity />

            {/* <DashboardOverview />

            <RecentActivity /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
