"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import SevaStatusBadge from "../seva/SevaStatusBadge";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type SevaStatus = "upcoming" | "completed" | "cancelled";

interface Seva {
  image: string;
  bookingId: string;
  seva: string;
  temple: string;
  date: string;
  amount: number;
  status: SevaStatus;
}

interface Props {
  open: boolean;
  onClose: () => void;
  seva: Seva | null;
}

export default function SevaDetailsModal({ open, onClose, seva }: Props) {
  if (!open || !seva) return null;
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
          className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[#E2C291] bg-[#FDF7EE] shadow-2xl"
        >
          {/* Background */}
          <Image
            src="/images/temple-paper-texture.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-60"
          />

          {/* <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={850}
            height={850}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
          /> */}

          <div className="relative z-10 p-7">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className={`${cormorantInfant.className} text-[30px] font-bold text-[#0F5C66]`}
                  style={{ marginLeft: "20px", marginTop: "20px" }}
                >
                  {seva?.seva}
                </h2>

                <p
                  className={`${cormorantInfant.className} mt-2 text-[22px] font-bold text-[#5A412C]`}
                  style={{ marginLeft: "20px" }}
                >
                  Booking ID : {seva?.bookingId}
                </p>
              </div>

              <div
                className="flex items-center gap-4"
                style={{ marginRight: "20px", marginTop: "30px" }}
              >
                {seva && <SevaStatusBadge status={seva.status} />}

                <button
                  onClick={onClose}
                  className="rounded-full border border-[#D7B58C] p-2 hover:bg-[#FFF2DF]"
                  style={{ marginTop: "-18px" }}
                >
                  <X size={24} className="text-[#6B5744]" />
                </button>
              </div>
            </div>

            {/* Scroll */}
            <div
              className="mt-6 max-h-[70vh] space-y-6 overflow-y-auto pr-2"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              {/* Overview */}

              <div className="rounded-[20px] border border-[#C37000]/60 p-6">
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Seva Details
                </h3>

                <div
                  className="space-y-5"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="flex">
                    <Image
                      src="/images/hand.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className={`${cormorantInfant.className} ml-4 w-[170px] font-bold text-[#3D352F]/80`}
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Seva Name
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : {seva?.seva}
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/location.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className={`${cormorantInfant.className} ml-4 w-[170px] font-bold text-[#3D352F]/80`}
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Offered at
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : {seva?.temple}
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/calendar-1.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className={`${cormorantInfant.className} ml-4 w-[170px] font-bold text-[#3D352F]/80`}
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Seva Date
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : {seva?.date}
                    </p>
                  </div>

                  <div className="flex">
                    <Image
                      src="/images/time.svg"
                      alt=""
                      width={18}
                      height={18}
                    />

                    <p
                      className={`${cormorantInfant.className} ml-4 w-[170px] font-bold text-[#3D352F]/80`}
                      style={{ marginTop: "2px", marginLeft: "10px" }}
                    >
                      Seva Time
                    </p>

                    <p
                      className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                    >
                      : 7:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {seva.status === "upcoming" ? (
                <div
                  className="rounded-[16px] border border-[#C37000] p-5"
                  style={{ marginTop: "20px" }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
                        style={{ marginTop: "10px", marginLeft: "20px" }}
                      >
                        Seva Glimpses
                      </h3>

                      <p
                        className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]/75`}
                        style={{ marginBottom: "10px", marginLeft: "20px" }}
                      >
                        Photos & videos uploaded after your seva was performed.
                      </p>
                    </div>

                    <button
                      className="flex items-center gap-2 rounded-lg border border-[#C37000] px-4 py-2 text-[#C37000] hover:bg-[#FFF3E0]"
                      style={{ marginTop: "10px", marginRight: "20px" }}
                    >
                      <Image
                        src="/images/download.svg"
                        alt=""
                        width={18}
                        height={18}
                        style={{ marginLeft: "10px" }}
                      />

                      <span
                        className={`${cormorantInfant.className} text-[18px] font-bold`}
                        style={{
                          marginRight: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        Download All
                      </span>
                    </button>
                  </div>

                  {/* Images */}
                  <div
                    className="mt-5 flex gap-3 overflow-x-auto"
                    style={{ marginLeft: "20px", marginBottom: "10px" }}
                  >
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-[#D99A33]"
                      >
                        {/* Replace with actual image */}
                        {/* <Image src={...} fill className="object-cover" alt="" /> */}

                        <button className="absolute right-2 bottom-2 rounded-full bg-white p-1.5 shadow">
                          <Image
                            src="/images/download.svg"
                            alt=""
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    ))}
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C37000] bg-[#F5D29A] hover:bg-[#EDC47D]"
                      style={{ marginTop: "30px", marginRight: "10px" }}
                    >
                      <ChevronRight size={18} className="text-[#8A5A12]" />
                    </button>
                  </div>
                </div>
              ) : seva.status === "cancelled" ? (
                <div
                  className="rounded-[16px] border border-[#D04B16] bg-[#D04B16]/20 px-6 py-5"
                  style={{ marginTop: "20px" }}
                >
                  <div className="flex items-center gap-6">
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          marginTop: "15px",
                          marginLeft: "20px",
                          marginBottom: "15px",
                        }}
                      >
                        <Image
                          src="/images/hand-cancelled.svg" // or your existing hand icon
                          alt=""
                          width={72}
                          height={72}
                        />
                      </div>

                      <div
                        style={{
                          marginLeft: "20px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <p
                          className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                        >
                          This seva has
                          <br />
                          been cancelled.
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-16 w-px bg-[#D04B16]" />

                    {/* Right */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/info.svg"
                          alt=""
                          width={18}
                          height={18}
                        />

                        <p
                          className={`${cormorantInfant.className} text-[18px] font-bold text-[#D04B16]`}
                        >
                          Cancellation Policy
                        </p>
                      </div>

                      <p
                        className={`${cormorantInfant.className} mt-2 text-[14px] leading-6 font-bold text-[#3D352F]`}
                        style={{ marginRight: "20px" }}
                      >
                        If you were eligible, your refund will be processed
                        within
                        <strong> 5–7 working days</strong> and credited to your
                        original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="relative overflow-hidden rounded-[16px] border border-[#C37000] bg-[#C37000]/20 px-5 py-4"
                  style={{ marginTop: "20px" }}
                >
                  <Image
                    src="/images/temple-outline-2.svg"
                    alt=""
                    width={140}
                    height={75}
                    className="pointer-events-none absolute right-4 bottom-0"
                  />

                  <div className="relative flex items-start gap-4">
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full"
                      style={{ marginTop: "15px", marginLeft: "20px" }}
                    >
                      <Image
                        src="/images/hand-1.svg"
                        alt=""
                        width={72}
                        height={72}
                      />
                    </div>

                    <div
                      className="flex-1"
                      style={{
                        marginLeft: "40px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p
                        className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                      >
                        Your seva will be performed with <br />
                        devotion by our temple priests on <br />
                        the selected date and time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Traveller Details */}

              <div
                className="rounded-[20px] border border-[#C37000]/60 p-6"
                style={{ marginTop: "20px" }}
              >
                <h3
                  className={`${cormorantInfant.className} mb-6 text-[20px] font-bold text-[#3D352F]`}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  Booking Summary
                </h3>

                <div
                  className="mt-5 grid grid-cols-2 gap-x-12 gap-y-5"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {/* Booked On */}
                  <div className="flex items-center">
                    <span
                      className={`${cormorantInfant.className} w-[95px] text-[15px] font-bold text-[#3D352F]/80`}
                    >
                      Booked On
                    </span>
                    <span className="mr-3 text-[#7A5A40]">:</span>{" "}
                    <span
                      className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                      style={{ marginLeft: "5px" }}
                    >
                      {seva?.date}
                    </span>
                  </div>

                  {/* Paid Via */}
                  <div className="flex items-center">
                    <span
                      className={`${cormorantInfant.className} w-[95px] text-[15px] font-bold text-[#3D352F]/80`}
                    >
                      Paid Via
                    </span>
                    <span className="mr-3 text-[#7A5A40]">:</span>
                    <span
                      className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                      style={{ marginLeft: "5px" }}
                    >
                      UPI
                    </span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center">
                    <span
                      className={`${cormorantInfant.className} w-[95px] text-[15px] font-bold text-[#3D352F]/80`}
                    >
                      Total Amount
                    </span>
                    <span className="mr-3 text-[#7A5A40]">:</span>
                    <span
                      className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                      style={{ marginLeft: "5px" }}
                    >
                      ₹{seva?.amount}
                    </span>
                  </div>

                  {/* Payment Status */}
                  <div className="flex items-center">
                    <span
                      className={`${cormorantInfant.className} w-[95px] text-[15px] font-bold text-[#3D352F]/80`}
                    >
                      Payment Status
                    </span>
                    <span className="mr-3 text-[#7A5A40]">:</span>

                    <span
                      className={`${cormorantInfant.className} text-[16px] font-semibold ${
                        seva.status === "cancelled"
                          ? "text-[#D32F2F]"
                          : "text-[#3D9A44]"
                      }`}
                      style={{ marginLeft: "5px" }}
                    >
                      {seva.status === "cancelled"
                        ? "Refund Initiated"
                        : "Paid"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}

              <div
                className="mt-8 flex gap-5"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <button className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[12px] border border-[#C37000] bg-transparent text-[#C37000] transition hover:bg-[#FFF6EC]">
                  <Image
                    src="/images/download-invoice.svg"
                    alt=""
                    width={28}
                    height={28}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[24px] font-bold`}
                  >
                    Download Receipt
                  </span>
                </button>

                <button className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[12px] bg-[#C37000] text-white transition hover:bg-[#A85E00]">
                  <Image
                    src="/images/need-help.svg"
                    alt=""
                    width={28}
                    height={28}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[24px] font-bold`}
                  >
                    Need Help
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
