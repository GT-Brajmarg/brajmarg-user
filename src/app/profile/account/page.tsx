import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProfileHero from "@/components/dashboard/profile/ProfileHero";
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Account Profile",
  description: "Manage your Brajmarg devotee profile, personal details, contact info, and saved address.",
};

export default function AccountProfilePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F9F2E8]">
      {/* Background paper texture matching other dashboard tabs without any grey overlay */}
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
      </div>

      {/* Foreground Container */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="flex w-full max-w-[1360px] flex-col lg:flex-row gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-10">
          {/* Sidebar */}
          <div className="w-full lg:w-[260px] shrink-0 lg:border-r border-[#C37000]/30 lg:pr-6">
            <DashboardSidebar />
          </div>

          {/* Profile Main Content */}
          <div className="flex-1 space-y-6">
            <ProfileHero />
            <ProfileCard />
          </div>
        </div>
      </div>
    </main>
  );
}
