import { BadgeCheck, Headphones, RefreshCcw, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const features = [
  {
    icon: "/images/shield-check.svg",
    title: "Secure Payments",
    description: "Your transactions are 100% safe and secure",
  },
  {
    icon: "/images/refresh-ccw.svg",
    title: "Easy Returns",
    description: "Return accepted within 7 days of delivery",
  },
  {
    icon: "/images/badge-check.svg",
    title: "Authentic & Blessed",
    description: "All items are temple blessed and authentic.",
  },
  {
    icon: "/images/headphones.svg",
    title: "Need Help?",
    description: "+91 73564 89660 | support@brajmarg.com",
  },
];

export default function TrustFeatures() {
  return (
    <aside
      className="relative overflow-hidden rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5 shadow-[0_8px_22px_rgba(173,111,30,0.10)]"
      style={{ marginBottom: "20px" }}
    >
      <div
        className="grid grid-cols-1 gap-x-4 gap-y-5"
        style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex gap-2">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={24}
                height={24}
                className="object-contain"
              />

              <div>
                <h3 className="font-cormorant text-[22px] leading-none font-semibold text-[#0B6670]">
                  {feature.title}
                </h3>

                <p
                  className={`${cormorantInfant.className} mt-1 text-[18px] leading-tight text-[#66513C]`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
