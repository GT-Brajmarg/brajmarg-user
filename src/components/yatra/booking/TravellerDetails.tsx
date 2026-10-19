"use client";

import { useState, useEffect } from "react";
import { Users, Info } from "lucide-react";

interface TravellerDetailsProps {
  travellerCount?: number;
  submitted?: boolean;
  onChange?: (names: string[]) => void;
}

export default function TravellerDetails({
  travellerCount = 2,
  submitted = false,
  onChange,
}: TravellerDetailsProps) {
  const [names, setNames] = useState<string[]>(
    Array(travellerCount).fill("")
  );
  const [touched, setTouched] = useState<boolean[]>(
    Array(travellerCount).fill(false)
  );
  const [errors, setErrors] = useState<string[]>(
    Array(travellerCount).fill("")
  );

  // Sync list length when travellerCount changes
  useEffect(() => {
    setNames((prev) => {
      const updated = [...prev];
      while (updated.length < travellerCount) updated.push("");
      return updated.slice(0, travellerCount);
    });
    setTouched((prev) => {
      const updated = [...prev];
      while (updated.length < travellerCount) updated.push(false);
      return updated.slice(0, travellerCount);
    });
    setErrors((prev) => {
      const updated = [...prev];
      while (updated.length < travellerCount) updated.push("");
      return updated.slice(0, travellerCount);
    });
  }, [travellerCount]);

  // When parent submits, force-show all traveller name errors
  useEffect(() => {
    if (submitted) {
      setTouched(Array(travellerCount).fill(true));
      setErrors(names.map((n) => validateName(n)));
    }
  }, [submitted, travellerCount, names]);

  const validateName = (val: string) => {
    if (!val.trim()) return "Full Name as per ID is required";
    return "";
  };

  const handleNameChange = (index: number, val: string) => {
    const updatedNames = [...names];
    updatedNames[index] = val;
    setNames(updatedNames);

    if (touched[index]) {
      const updatedErrors = [...errors];
      updatedErrors[index] = validateName(val);
      setErrors(updatedErrors);
    }

    onChange?.(updatedNames);
  };

  const handleBlur = (index: number, val: string) => {
    const updatedTouched = [...touched];
    updatedTouched[index] = true;
    setTouched(updatedTouched);

    const updatedErrors = [...errors];
    updatedErrors[index] = validateName(val);
    setErrors(updatedErrors);
  };

  const inputBase =
    "font-cormorant w-full h-[44px] px-3 rounded-[8px] border text-[16px] font-bold text-[#3D352F] placeholder:text-[#3D352F]/40 placeholder:font-bold focus:outline-none transition bg-transparent";

  const labelClass =
    "font-cormorant text-[14px] font-bold text-[#3D352F] leading-tight mb-1 block";

  return (
    <section className="w-full px-5 sm:px-6 py-5 sm:py-6 border-t border-[#C37000]/25">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
        <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
          Traveller Details
        </h2>
      </div>

      {/* Info alert */}
      <div className="mb-4 flex items-center gap-2.5 rounded-[8px] border border-[#C37000]/60 bg-[#C37000]/10 px-3.5 py-2.5">
        <Info size={16} strokeWidth={2.2} className="shrink-0 text-[#C37000]" />
        <p className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]">
          Travellers will be added automatically based on the number of
          travellers selected.
        </p>
      </div>

      {/* One card per traveller — Full Name as per ID */}
      <div className="space-y-3">
        {names.map((name, index) => {
          const hasError = touched[index] && !!errors[index];

          return (
            <div
              key={index}
              className="rounded-[10px] border border-[#C37000]/40 bg-transparent px-4 py-3.5"
              style={{ backgroundColor: "transparent" }}
            >
              <p className="font-cormorant text-[16px] font-bold text-[#C37000] leading-tight">
                Traveller {index + 1}
              </p>
              <label className={`${labelClass} mt-1`}>
                Full Name as per ID <span className="text-[#D04B16]">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                onBlur={(e) => handleBlur(index, e.target.value)}
                className={`${inputBase} ${
                  hasError
                    ? "border-[#D04B16] focus:border-[#D04B16]"
                    : "border-[#C37000]/50 focus:border-[#C37000]"
                }`}
                style={{ backgroundColor: "transparent" }}
              />
              {hasError && (
                <p className="font-cormorant text-[13px] font-bold text-[#D04B16] mt-0.5">
                  {errors[index]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

