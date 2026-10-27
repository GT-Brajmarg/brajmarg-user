import type { Metadata } from "next";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import BillingContent from "@/components/dashboard/billing/BillingContent";

export const metadata: Metadata = {
  title: "Payments & Billing | Devotee Dashboard",
  description:
    "Manage your saved payment methods and review your seva contributions and transaction history on Brajmarg.",
};

export default function BillingPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F9F2E8]">
      {/* Background paper texture matching other dashboard tabs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Subtle decorative mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />
      </div>

      {/* Foreground Container with responsive sidebar & content */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="flex w-full max-w-[1360px] flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
          {/* Sidebar */}
          <div className="w-full lg:w-[260px] shrink-0 lg:border-r border-[#C37000]/30 lg:pr-6">
            <DashboardSidebar />
          </div>

          {/* Payments & Billing Main Content Area */}
          <div className="flex-1 min-w-0">
            <BillingContent />
          </div>
        </div>
      </div>
    </main>
  );
}
