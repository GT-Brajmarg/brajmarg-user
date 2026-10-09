"use client";

interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function SaveAddress({ checked, onChange }: Props) {
  return (
    <label className="mt-6 flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-[#0B6670]"
      />

      <span className="text-[#4B4035]">
        Save this address for future orders
      </span>
    </label>
  );
}
