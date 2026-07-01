"use client";

import { MapPin } from "lucide-react";

export default function DeliveryDetails() {
  const input =
    "h-[46px] w-full rounded-lg border border-[#E8C78D] bg-transparent px-4 text-[14px] placeholder:text-[#B59D79] outline-none transition focus:border-[#0B6670]";

  return (
    <section className="rounded-2xl border border-[#D59A33] bg-[#FFF9F0]/80 p-6">
      {/* Header */}

      <div className="flex items-center gap-2 border-b border-[#F1DFC1] pb-4">
        <MapPin
          size={18}
          className="text-[#C67A00]"
          style={{ marginLeft: "10px" }}
        />

        <h2
          className="font-cormorant text-[25px] font-semibold text-[#0B6670]"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Delivery Details
        </h2>
      </div>

      <p
        className="mt-5 text-xs font-medium text-[#6F6356]"
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        All fields are required *
      </p>

      {/* Row */}

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="mb-2 block text-[13px] text-[#4D443B]"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Full Name
          </label>

          <input
            placeholder="Enter your Full Name"
            className={input}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[13px] text-[#4D443B]"
            style={{ marginTop: "10px" }}
          >
            Mobile Number
          </label>

          <div
            className="flex h-[46px] overflow-hidden rounded-lg border border-[#E8C78D] bg-transparent"
            style={{ marginTop: "4px", marginRight: "10px" }}
          >
            <div className="flex h-full w-[70px] items-center justify-center border-r border-[#E8C78D] text-[14px] text-[#4D443B]">
              🇮🇳 +91
            </div>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="h-full flex-1 bg-transparent px-4 text-[14px] text-[#4D443B] placeholder:text-[#B59D79] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Address */}

      <div className="mt-4" style={{ marginLeft: "10px", marginRight: "10px" }}>
        <label
          className="mb-2 block text-[13px] text-[#4D443B]"
          style={{ marginTop: "10px" }}
        >
          Address Line 1
        </label>

        <input
          placeholder="House / Building / Street / Area"
          className={input}
        />
      </div>

      <div className="mt-4" style={{ marginLeft: "10px", marginRight: "10px" }}>
        <label
          className="mb-2 block text-[13px] text-[#4D443B]"
          style={{ marginTop: "10px" }}
        >
          Address Line 2 (Optional)
        </label>

        <input
          placeholder="House / Building / Street / Area"
          className={input}
        />
      </div>

      {/* City */}

      <div
        className="mt-4 grid grid-cols-2 gap-4"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <div>
          <label
            className="mb-2 block text-[13px] text-[#4D443B]"
            style={{ marginTop: "10px" }}
          >
            City
          </label>

          <input placeholder="Enter City" className={input} />
        </div>

        <div>
          <label
            className="mb-2 block text-[13px] text-[#4D443B]"
            style={{ marginTop: "10px" }}
          >
            State
          </label>

          <select className={input}>
            <option>Select State</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
            <option>Gujarat</option>
          </select>
        </div>
      </div>

      {/* Pincode */}

      <div className="mt-4" style={{ marginLeft: "10px", marginRight: "10px" }}>
        <label
          className="mb-2 block text-[13px] text-[#4D443B]"
          style={{ marginTop: "10px" }}
        >
          Pincode
        </label>

        <input placeholder="Enter Pincode" className={input} />
      </div>

      {/* Checkbox */}

      <label className="mt-8 flex cursor-pointer gap-3">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-[#D59A33] accent-[#0B6670]"
          style={{ marginLeft: "10px", marginTop: "30px" }}
        />

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3 className="font-cormorant text-[20px] font-semibold text-[#0B6670]">
            Save this address for future orders
          </h3>

          <p className="text-[13px] text-[#7C7368]">
            Easily place orders faster next time.
          </p>
        </div>
      </label>
    </section>
  );
}
