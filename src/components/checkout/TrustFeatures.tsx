import { BadgeCheck, Headphones, RefreshCcw, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your transactions are 100% safe and secure",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Return accepted within 7 days of delivery",
  },
  {
    icon: BadgeCheck,
    title: "Authentic & Blessed",
    description: "All items are temple blessed and authentic.",
  },
  {
    icon: Headphones,
    title: "Need Help?",
    description: "+91 73564 89660 | support@brajmarg.com",
  },
];

export default function TrustFeatures() {
  return (
    <aside
      className="relative overflow-hidden rounded-[18px] border border-[#D79A43] bg-transparent p-5 shadow-[0_8px_22px_rgba(173,111,30,0.10)]"
      style={{ marginBottom: "20px" }}
    >
      <div
        className="grid grid-cols-1 gap-x-4 gap-y-5"
        style={{ marginLeft: "100px", marginTop: "10px", marginBottom: "10px" }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex gap-2">
              <Icon
                size={18}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#C67A00]"
              />

              <div>
                <h3 className="font-cormorant text-[14px] leading-none font-semibold text-[#0B6670]">
                  {feature.title}
                </h3>

                <p className="font-infant mt-1 text-[10px] leading-tight text-[#66513C]">
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
