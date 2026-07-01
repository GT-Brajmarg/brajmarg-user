"use client";

import { DeliveryAddress } from "../types";

interface Props {
  form: DeliveryAddress;
  setForm: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
}

export default function AddressFields({ form, setForm }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const inputStyle =
    "h-14 w-full rounded-xl border border-[#E5D7BE] bg-white px-5 outline-none transition focus:border-[#0B6670]";

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block font-medium text-[#4B4035]">
          Address Line 1
        </label>

        <input
          name="address1"
          value={form.address1}
          onChange={handleChange}
          placeholder="House / Flat / Street"
          className={inputStyle}
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium text-[#4B4035]">
          Address Line 2
        </label>

        <input
          name="address2"
          value={form.address2}
          onChange={handleChange}
          placeholder="Area / Landmark"
          className={inputStyle}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-[#4B4035]">City</label>

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className={inputStyle}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-[#4B4035]">State</label>

        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className={inputStyle}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-[#4B4035]">Pincode</label>

        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className={inputStyle}
        />
      </div>
    </div>
  );
}
