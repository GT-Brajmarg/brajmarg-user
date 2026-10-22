"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { useAppDispatch } from "@/store/hooks";
import { setLoginModalOpen } from "@/store/slices/navSlice";

interface StickyBookingBarProps {
  slug?: string;
}

export default function StickyBookingBar({
  slug = "braj-yatra",
}: StickyBookingBarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedPackage, setSelectedPackage] = useState({
    name: "Standard",
    price: 3999,
  });

  const handleBookYatra = () => {
    const targetUrl = `/yatra/${slug}/book?package=${selectedPackage.name.toLowerCase()}`;
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("brajmarg_login_redirect", targetUrl);
        window.dispatchEvent(new Event("open_login_modal"));
      }
      dispatch(setLoginModalOpen(true));
      return;
    }

    router.push(targetUrl);
  };

  useEffect(() => {
    const handlePackageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string; price: number }>;
      if (customEvent.detail) {
        setSelectedPackage({
          name: customEvent.detail.name,
          price: customEvent.detail.price,
        });
      }
    };
    window.addEventListener("yatra_package_change", handlePackageChange);
    return () => window.removeEventListener("yatra_package_change", handlePackageChange);
  }, []);

  return (
    <div className="z-50 mx-auto my-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[#C37000] bg-[#EFDEC7]/50 px-6 py-3.5 shadow-lg backdrop-blur-md">
        {/* Left: Yatra info */}
        <div className="flex items-center gap-3.5">
          <Image
            src="/images/temple-darshan.svg"
            alt="Yatra"
            width={38}
            height={38}
            className="h-9 w-9 object-contain"
          />

          <div>
            <h3 className="font-cormorant text-[24px] font-bold text-[#0F5C66] leading-tight">
              Braj Yatra
            </h3>
            <p className="font-cormorant text-[15px] font-bold text-[#3D352F] leading-tight">
              Nathdwara to Vrindavan
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Package */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Selected Package
          </p>
          <h4 className="font-cormorant text-[18px] font-bold text-[#C37000] leading-tight">
            {selectedPackage.name} Package
          </h4>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Seats */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Seats Left
          </p>
          <h4 className="font-cormorant text-[18px] font-bold text-[#C37000] leading-tight">
            6 Seats Left
          </h4>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Price */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Price
          </p>
          <div className="flex items-baseline gap-1 leading-tight">
            <span className="font-cormorant text-[20px] font-bold text-[#C37000]">
              ₹{selectedPackage.price.toLocaleString()}
            </span>
            <span className="font-cormorant text-[13px] font-bold text-[#3D352F]">
              /person
            </span>
          </div>
        </div>

        {/* CTA Button — login-gated */}
        <button
          type="button"
          onClick={handleBookYatra}
          className={`${cormorantInfant.className} flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0F5C66] px-6 py-2.5 text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#0C4C54] active:scale-[0.98] cursor-pointer`}
        >
          <span className="text-[#EFDEC7]">Book This Yatra</span>
          <ArrowRight className="text-[#EFDEC7]" size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
