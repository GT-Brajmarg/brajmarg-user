"use client";

import Image from "next/image";
import { Cormorant_Infant, Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function BillDetailsCard({}) {
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") === "monthly" ? "monthly" : "yearly";

  const membershipName =
    plan === "yearly"
      ? "Yearly Alerts Membership"
      : "Monthly Alerts Membership";

  const amount = plan === "yearly" ? 799 : 99;

  return (
    <section
      className="rounded-[16px] border border-[#C37000] bg-[#C37000]/4 p-5"
      style={{ marginTop: "20px" }}
    >
      {/* Header */}

      <div
        className="mb-4 flex items-center gap-2"
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        <Image src="/images/bill.svg" alt="" width={36} height={36} />

        <h2
          className={`${cormorantInfant.className} text-[32px] font-bold text-[#0F5C66]`}
        >
          Bill Details
        </h2>
      </div>

      {/* Bill */}

      <div
        className="space-y-4"
        style={{
          marginLeft: "20px",
          marginTop: "10px",
          marginRight: "20px",
          marginBottom: "10px",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3
              className={`${cormorantInfant.className} text-[22px] font-bold text-[#3D352F]`}
            >
              {membershipName}
            </h3>
          </div>

          <span
            className={`${cormorantInfant.className} text-[22px] font-bold text-[#3D352F]`}
          >
            ₹ {amount} / {plan}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-dashed border-[#D89A3D] pb-4">
          <span
            className={`${cormorantInfant.className} text-[22px] font-bold text-[#3D352F]`}
          >
            Taxes
          </span>

          <span
            className={`${cormorantInfant.className} text-[22px] font-bold text-[#3D352F]`}
          >
            Included
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`${cormorantInfant.className} text-[26px] font-bold text-[#3D352F]`}
          >
            Total Amount
          </span>

          <span
            className={`${cormorantInfant.className} text-[32px] font-semibold text-[#C37000]`}
          >
            ₹ {amount}.00
          </span>
        </div>
      </div>
    </section>
  );
}
