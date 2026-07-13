import { Headphones, Phone, Mail, Clock3, ShieldCheck } from "lucide-react";

export default function CartSupportSection() {
  return (
    <section className="mt-12 space-y-8">
      {/* Contact Card */}
      <div className="bg-[#C37000]/05 rounded-2xl border border-[#D28B15] bg-[#C37000]/5 px-8 py-7">
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          {/* Need Help */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center text-[#C67A00]">
              <Headphones size={35} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="font-cormorant text-[25px] leading-none font-semibold text-[#3F3125]">
                Need Help?
              </h3>

              <p className="mt-2 text-[14px] leading-7 text-[#3F3125]">
                We are here to assist you.
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 lg:border-l lg:border-[#E8C995] lg:pl-8">
            <div className="flex h-14 w-14 items-center justify-center text-[#C67A00]">
              <Phone size={35} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="font-cormorant text-[25px] leading-none font-semibold text-[#3F3125]">
                Call / Whatsapp
              </h3>

              <p className="mt-2 text-[14px] text-[#3F3125]">+91 73564 89660</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 lg:border-l lg:border-[#E8C995] lg:pl-8">
            <div className="flex h-14 w-14 items-center justify-center text-[#C67A00]">
              <Mail size={35} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="font-cormorant text-[25px] leading-none font-semibold text-[#3F3125]">
                Email Us
              </h3>

              <p className="mt-2 text-[14px] text-[#3F3125]">
                support@brajmarg.com
              </p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-center gap-4 lg:border-l lg:border-[#E8C995] lg:pl-8">
            <div className="flex h-14 w-14 items-center justify-center text-[#C67A00]">
              <Clock3 size={35} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="font-cormorant text-[25px] leading-none font-semibold text-[#3F3125]">
                Timings
              </h3>

              <p className="mt-2 text-[14px] whitespace-nowrap text-[#3F3125]">
                9:00 AM to 6:00 PM (Mon - Sat)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Temple Support Banner */}
      <div
        className="relative overflow-hidden rounded-2xl border border-[#0B6670] bg-[#0F5C66]/10 px-8 py-8"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <div
          className="flex items-center gap-5"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "20px",
          }}
        >
          <ShieldCheck
            size={44}
            className="shrink-0 text-[#0B6670]"
            strokeWidth={2}
          />

          <p className="font-cormorant text-[25px] font-semibold text-[#0B6670]">
            Every purchase supports temple seva and preservation of our
            spiritual heritage.
          </p>
        </div>
      </div>
    </section>
  );
}
