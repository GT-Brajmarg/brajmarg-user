"use client";

import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { cormorantInfant } from "@/lib/fonts";
import { useAppDispatch } from "@/store/hooks";
import { setLoginModalOpen } from "@/store/slices/navSlice";

interface Props {
  pkg: {
    id: number;
    name: string;
    subtitle: string;
    price: number;
    popular: boolean;
    features: string[];
  };
  slug?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function PackageCard({ pkg, slug = "braj-yatra" }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRedirect = () => {
    const targetUrl = `/yatra/${slug}/book?package=${pkg.name.toLowerCase()}`;
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

  return (
    <div
      onClick={handleRedirect}
      className="relative flex h-full flex-col justify-between rounded-[20px] bg-[#0F5C66]/5 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-[#0F5C66]"
    >
      <div>
        <h3 className="font-cormorant text-[28px] font-bold text-[#0F5C66] leading-tight">
          {pkg.name}
        </h3>
        <p className="font-cormorant text-[17px] font-bold text-[#C37000] mt-0.5">
          {pkg.subtitle}
        </p>

        <div className="mt-2.5 flex items-baseline">
          <span
            className={`${cormorantInfant.className} font-cormorant-infant text-[32px] sm:text-[36px] font-bold text-[#0F5C66] leading-none tracking-tight`}
          >
            ₹{pkg.price.toLocaleString()}
          </span>
          <span
            className={`${cormorantInfant.className} font-cormorant-infant text-[15px] sm:text-[16px] font-semibold text-[#3D352F] leading-none ml-0.5`}
          >
            /person
          </span>
        </div>

        <div className="mt-3.5 space-y-2">
          {pkg.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <CircleCheck size={16} className="shrink-0 text-[#C37000]" />
              <span className="font-cormorant text-[16px] font-medium text-[#3D352F]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleRedirect();
        }}
        className={`font-cormorant mt-6 w-full rounded-xl border py-2 text-[22px] font-bold transition-all cursor-pointer ${
          pkg.popular
            ? "border-[#0F5C66] bg-[#0F5C66] text-[#EFDEC7] hover:bg-[#0c4b52]"
            : "border-[#0F5C66] bg-[#EFDEC7]/60 text-[#0F5C66] hover:bg-[#0F5C66] hover:text-[#EFDEC7]"
        }`}
      >
        Select Package
      </button>
    </div>
  );
}
