"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: Props) {
  return (
    <div className="flex h-12 items-center overflow-hidden rounded-xl border border-[#D9A354]">
      <button
        onClick={onDecrease}
        className="flex h-full w-12 items-center justify-center text-[#C67A00] hover:bg-[#FFF7EB]"
      >
        <Minus size={16} />
      </button>

      <div className="flex h-full w-12 items-center justify-center border-x border-[#E9D5AF] font-semibold">
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className="flex h-full w-12 items-center justify-center text-[#0B6670] hover:bg-[#FFF7EB]"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
