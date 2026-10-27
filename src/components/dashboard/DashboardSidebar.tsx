"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import Image from "next/image";
import { showToast } from "@/lib/toast";

const menu = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Dashboard",
        href: "/profile",
        icon: "/images/dashboard.svg",
      },
    ],
  },
  {
    title: "My Activities",
    items: [
      {
        label: "My Orders",
        href: "/profile/orders",
        icon: "/images/orders.svg",
      },
      {
        label: "My Sevas",
        href: "/profile/sevas",
        icon: "/images/sevas.svg",
      },
      {
        label: "My Yatras",
        href: "/profile/yatras",
        icon: "/images/yatras.svg",
      },
      {
        label: "My Subscription",
        href: "/profile/subscription",
        icon: "/images/subscription.svg",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        href: "/profile/account",
        icon: "/images/profile.svg",
      },
      {
        label: "Payments & Billing",
        href: "/profile/billing",
        icon: "/images/billing.svg",
      },
      {
        label: "Settings",
        href: "/profile/settings",
        icon: "/images/settings.svg",
      },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("brajmarg_temp_user");
    localStorage.removeItem("brajmarg_is_logged_in");
    window.dispatchEvent(new Event("storage"));
    showToast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <aside className="w-full">
      {/* ══ Mobile / Tablet Navigation Bar (lg:hidden) ══ */}
      <div className="block lg:hidden mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide">
          {menu.flatMap((s) => s.items).map((item) => {
            const active =
              item.href === "/profile"
                ? pathname === "/profile"
                : pathname === item.href ||
                pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-all duration-200 ${active
                  ? "border border-[#D8A35D] bg-[#FFF8EE] text-[#C37000] shadow-xs"
                  : "border border-[#C37000]/25 bg-[#FAF3E7]/60 text-[#5F4B38] hover:bg-[#FBF4E8]"
                  }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`shrink-0 transition-all ${active ? "opacity-100" : "opacity-75"
                    }`}
                />
                <span
                  className={`${cormorantInfant.className} text-[16px] whitespace-nowrap ${active ? "font-bold text-[#C37000]" : "text-[#5F4B38]"
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Mobile Logout Pill */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#DC2626]/30 bg-[#FEECEC]/60 px-3.5 py-2 text-[#DC2626] transition hover:bg-[#FEECEC] cursor-pointer"
          >
            <LogOut size={16} strokeWidth={2} className="text-[#DC2626]" />
            <span
              className={`${cormorantInfant.className} text-[16px] font-semibold text-[#DC2626] whitespace-nowrap`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* ══ Desktop Vertical Sidebar (hidden on mobile, sticky on lg:block) ══ */}
      <div className="hidden lg:block sticky top-24 w-full">
        <div className="space-y-8">
          {menu.map((section) => (
            <div key={section.title} className="mb-6">
              <h3
                className={`${cormorantInfant.className} mb-3 px-1 text-[16px] font-bold tracking-[0.12em] text-[#3D352F] uppercase`}
              >
                {section.title}
              </h3>

              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/profile"
                      ? pathname === "/profile"
                      : pathname === item.href ||
                      pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2 transition-all duration-200 ${active
                        ? "border border-[#D8A35D] bg-[#FFF8EE] text-[#C37000]"
                        : "text-[#4D3A2A] hover:bg-[#FBF4E8]"
                        }`}
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={24}
                        height={24}
                        className={`shrink-0 transition-all ${active ? "opacity-100" : "opacity-75"
                          }`}
                      />

                      <span
                        className={`${cormorantInfant.className} text-[18px] ${active ? "font-semibold text-[#C37000]" : "text-[#5F4B38]"
                          }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}

                {section.title === "Account" && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-all duration-200 text-[#DC2626] hover:bg-[#FEECEC]/70 active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                      <LogOut
                        size={20}
                        strokeWidth={2}
                        className="text-[#DC2626] transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <span
                      className={`${cormorantInfant.className} text-[18px] font-medium text-[#DC2626]`}
                    >
                      Logout
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
