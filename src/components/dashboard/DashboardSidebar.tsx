// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Package,
//   HeartHandshake,
//   Map,
//   Crown,
//   User,
//   CreditCard,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { Cormorant_Infant } from "next/font/google";
// // import clsx from "clsx";

// const cormorantInfant = Cormorant_Infant({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
// });

// const menu = [
//   {
//     title: "Dashboard",
//     items: [
//       {
//         label: "Dashboard",
//         href: "/account",
//         icon: LayoutDashboard,
//       },
//     ],
//   },
//   {
//     title: "My Activities",
//     items: [
//       {
//         label: "My Orders",
//         href: "/account/orders",
//         icon: Package,
//       },
//       {
//         label: "My Sevas",
//         href: "/account/sevas",
//         icon: HeartHandshake,
//       },
//       {
//         label: "My Yatras",
//         href: "/account/yatras",
//         icon: Map,
//       },
//       {
//         label: "My Subscription",
//         href: "/account/subscription",
//         icon: Crown,
//       },
//     ],
//   },
//   {
//     title: "Account",
//     items: [
//       {
//         label: "Profile",
//         href: "/account/profile",
//         icon: User,
//       },
//       {
//         label: "Payments & Billing",
//         href: "/account/billing",
//         icon: CreditCard,
//       },
//       {
//         label: "Settings",
//         href: "/account/settings",
//         icon: Settings,
//       },
//     ],
//   },
// ];

// export default function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="sticky top-24 h-fit w-[270px] rounded-[24px] border border-[#E6C8A2] bg-[#FFF9F2] p-6 shadow-sm">
//       <div className="space-y-8">
//         {menu.map((section) => (
//           <div key={section.title}>
//             <h3
//               className={`${cormorantInfant.className} mb-3 text-sm font-semibold tracking-[0.15em] text-[#9A7A55] uppercase`}
//             >
//               {section.title}
//             </h3>

//             <div className="space-y-2">
//               {section.items.map((item) => {
//                 const Icon = item.icon;

//                 const active =
//                   pathname === item.href ||
//                   pathname.startsWith(item.href + "/");

//                 return (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-all duration-200 ${
//                       active
//                         ? "border border-[#E6C8A2] bg-[#FFF3DF] text-[#C37000]"
//                         : "text-[#5D4A38] hover:bg-[#FFF4E6]"
//                     }`}
//                   >
//                     <Icon
//                       size={18}
//                       className={`${active ? "text-[#C37000]" : "text-[#8D7355]"}`}
//                     />

//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

//         <div className="border-t border-[#E8D8C5] pt-5">
//           <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[#5D4A38] transition hover:bg-[#FFF4E6]">
//             <LogOut size={18} className="text-[#8D7355]" />

//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  HeartHandshake,
  Map,
  Crown,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import Image from "next/image";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

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

  return (
    <aside className="sticky top-24 w-[245px]">
      <div className="space-y-10" style={{ marginTop: "10px" }}>
        {menu.map((section) => (
          <div
            key={section.title}
            style={{ marginBottom: "20px", marginTop: "10px" }}
          >
            <h3
              className={`${cormorantInfant.className} mb-4 text-[15px] font-bold tracking-[0.22em] text-[#3D352F] uppercase`}
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
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                      active
                        ? "border border-[#D8A35D] text-[#C37000]"
                        : "text-[#4D3A2A] hover:bg-[#FBF4E8]"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={26}
                      height={26}
                      className={`ml-[10px] transition-all ${
                        active ? "opacity-100" : "opacity-70"
                      }`}
                    />

                    <span
                      className={`${cormorantInfant.className} text-[18px] ${
                        active ? "text-[#C37000]" : "text-[#5F4B38]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="pt-3">
          <button
            className="flex items-center gap-3 px-3 py-2 text-[#4D3A2A] transition hover:text-[#C37000]"
            style={{ marginBottom: "40px" }}
          >
            <LogOut size={17} strokeWidth={1.8} />

            <span className="font-cormorant-infant text-[18px]">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
