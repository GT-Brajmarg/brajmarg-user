"use client";

import { useState } from "react";
import AddressFields from "./AddressFields";
import SaveAddress from "./SaveAddress";
import { DeliveryAddress } from "../types";

export default function DeliveryForm() {
  const [form, setForm] = useState<DeliveryAddress>({
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: false,
  });

  const inputStyle =
    "h-14 w-full rounded-xl border border-[#E5D7BE] bg-white px-5 outline-none transition focus:border-[#0B6670]";

  return (
    <section className="rounded-3xl border border-[#D79B32] bg-[#FFF9F0] p-8">
      <h2 className="font-cormorant text-5xl font-semibold text-[#0B6670]">
        Delivery Details
      </h2>

      <p className="mt-2 text-[#6A6258]">
        Please enter your delivery information.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Full Name</label>

          <input
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            className={inputStyle}
            placeholder="Full Name"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Mobile Number</label>

          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className={inputStyle}
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      <div className="mt-6">
        <AddressFields form={form} setForm={setForm} />
      </div>

      <SaveAddress
        checked={form.saveAddress}
        onChange={() =>
          setForm({
            ...form,
            saveAddress: !form.saveAddress,
          })
        }
      />
    </section>
  );
}
