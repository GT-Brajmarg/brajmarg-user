"use client";

import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import TrackOrder from "./TrackOrder";
import Image from "next/image";
import { X } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import OrderDetailsTabs from "./OrderDetailsTabs";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<"details" | "tracking">("details");
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/45 backdrop-blur-[3px]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[900px] overflow-hidden rounded-[28px] border border-[#E2C291] bg-[#FDF7EE] shadow-2xl"
        >
          {/* Paper Texture */}
          <Image
            src="/images/temple-paper-texture.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-[0.58]"
          />

          {/* Mandala */}
          {/* <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={700}
            height={700}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
          /> */}

          <div className="relative z-10 p-8">
            {/* Header */}

            <div className="flex items-start justify-between">
              <div
                style={{
                  marginTop: "20px",
                  marginLeft: "20px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  className={`${cormorantInfant.className} text-[24px] font-bold text-[#3D352F]`}
                >
                  Order ID : BM2502267894
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* Status */}

                <div
                  className="flex items-center gap-2 rounded-[8px] bg-[#C37000]/20 px-4 py-2"
                  style={{
                    marginTop: "20px",
                    marginRight: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    src="/images/processing.svg"
                    alt=""
                    width={18}
                    height={18}
                    style={{ marginLeft: "5px" }}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[18px] text-[#C37000]`}
                    style={{ marginRight: "5px" }}
                  >
                    Processing
                  </span>
                </div>

                {/* Close */}

                <button
                  onClick={onClose}
                  className="rounded-full border border-[#D7B58C] p-2 transition hover:bg-[#FFF2DF]"
                  style={{ marginRight: "20px", marginTop: "8px" }}
                >
                  <X size={25} className="text-[#6B5744]" />
                </button>
              </div>
            </div>

            {/* Divider */}

            {/* <div className="mt-6 border-t border-[#E6C8A2]" /> */}

            {/* Tabs */}

            <OrderDetailsTabs defaultTab={tab} onChange={setTab} />
            <div className="mt-6 max-h-[55vh] overflow-y-auto pr-2">
              {tab === "details" ? (
                <>
                  <OrderSummary
                    placedAt="24 June 2026, 12:15 PM"
                    paymentMethod="Razorpay (UPI)"
                    paymentStatus="Paid"
                    address={`123, Govardhan Marg,
Vaishali Nagar,
Jaipur, Rajasthan - 302021`}
                    phone="+91 9876543210"
                  />

                  <OrderItems
                    items={[
                      {
                        id: "1",
                        image: "/images/demo/product.png",
                        title: "Rajbhog Seva",
                        temple: "Shreenathji Temple, Nathdwara",
                        quantity: 1,
                        price: 1500,
                      },
                      {
                        id: "2",
                        image: "/images/demo/product.png",
                        title: "Mishri Prasad",
                        temple: "Shreenathji Temple, Nathdwara",
                        quantity: 2,
                        price: 800,
                      },
                    ]}
                  />
                  <div
                    className="mt-8 flex flex-col gap-4 sm:flex-row"
                    style={{
                      marginTop: "40px",
                      marginBottom: "40px",
                      marginLeft: "40px",
                      marginRight: "40px",
                    }}
                  >
                    <button className="flex h-[56px] flex-1 items-center justify-center gap-3 rounded-[12px] border border-[#C37000] bg-transparent text-[20px] font-medium text-[#C37000] transition-colors hover:bg-[#FFF8F1]">
                      <Image
                        src="/images/download-invoice.svg"
                        alt="Download Invoice"
                        width={30}
                        height={30}
                      />
                      <span className={cormorantInfant.className}>
                        Download Invoice
                      </span>
                    </button>

                    <button className="flex h-[56px] flex-1 items-center justify-center gap-3 rounded-[12px] bg-[#C37000] text-[20px] font-medium text-white transition-colors hover:bg-[#A85E00]">
                      <Image
                        src="/images/need-help.svg"
                        alt="Need Help"
                        width={30}
                        height={30}
                      />
                      <span className={cormorantInfant.className}>
                        Need Help
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <TrackOrder />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
