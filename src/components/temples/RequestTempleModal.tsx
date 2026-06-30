"use client";

import {
  X,
  UploadCloud,
  User,
  Search,
  ShieldCheck,
  HeartHandshake,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getTempleRequestAccessOptions,
  submitTempleRequest,
  resetTempleRequest,
} from "@/store/slices/requestTempleSlice";
// import { headers } from "next/headers";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Small temple / shikhara glyph used across section headers. */
function TempleGlyph({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2.5 L13.4 5.2 L11.9 5.2 L13 7.4 L11 7.4 L12 9.6 L7.5 9.6 L9 6.6 L7.7 6.6 L9.4 4 L8.2 4 L12 2.5 Z"
        fill="currentColor"
      />
      <rect x="10.3" y="9.6" width="3.4" height="2.1" fill="currentColor" />
      <path
        d="M5 21 L5 13.2 L7.4 9.7 L16.6 9.7 L19 13.2 L19 21 Z"
        fill="currentColor"
      />
      <rect
        x="2.5"
        y="20.2"
        width="19"
        height="1.4"
        rx="0.4"
        fill="currentColor"
      />
      <rect x="10.7" y="14.5" width="2.6" height="6.5" fill="#FBF3E3" />
    </svg>
  );
}

const ICON_ORANGE = "#C76A24";
const GOLD = "#D89A3D";

const NEXT_STEPS = [
  { icon: Search, title: "Our team reviews your request" },
  { icon: ShieldCheck, title: "Temple authenticity is verified" },
  { icon: HeartHandshake, title: "Approved temples are added to Brajmarg" },
  { icon: Mail, title: "You'll receive an update via email" },
];

export default function RequestTempleModal({ open, onClose }: Props) {
  //   const [address, setAddress] = useState("");
  //   const [selectedAccess, setSelectedAccess] = useState<string[]>([
  //     "Seva Booking",
  //     "Frames & Photos",
  //   ]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const dispatch = useAppDispatch();

  const { accessOptions, loading, submitting, success } = useAppSelector(
    (state) => state.requestTemple,
  );

  const initialForm = {
    temple_name: "",
    city: "",
    state: "",
    address: "",
    requester_name: "",
    requester_email: "",
    requested_access: [] as string[],
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      dispatch(getTempleRequestAccessOptions());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (success) {
      setForm(initialForm);
      dispatch(resetTempleRequest());
      onClose();
    }
  }, [success, dispatch, onClose]);

  useEffect(() => {
    dispatch(getTempleRequestAccessOptions());
  }, [dispatch]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAccess = (option: string) => {
    setForm((prev) => ({
      ...prev,
      requested_access: prev.requested_access.includes(option)
        ? prev.requested_access.filter((item) => item !== option)
        : [...prev.requested_access, option],
    }));
  };

  const handleSubmit = () => {
    dispatch(submitTempleRequest(form));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <div
        className="relative z-10 max-h-[92vh] w-[95%] overflow-hidden rounded-[28px] shadow-[0_40px_120px_rgba(0,0,0,.35)]"
        style={{
          maxWidth: "660px",
          backgroundColor: "#FBF3E3",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(150,110,60,0.10), transparent 38%), radial-gradient(circle at 100% 100%, rgba(150,110,60,0.08), transparent 40%), radial-gradient(circle at 20% 60%, rgba(193,150,95,0.06), transparent 45%), radial-gradient(circle at 80% 15%, rgba(193,150,95,0.08), transparent 40%)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6D5E4C] shadow-md transition hover:scale-105"
        >
          <X size={18} />
        </button>

        <div className="max-h-[92vh] overflow-y-auto">
          {/* ================= Header ================= */}
          <div className="relative px-8 pt-8 pb-2">
            {/* soft glow behind illustration */}
            <div className="pointer-events-none absolute top-0 right-0 h-36 w-56 rounded-full bg-[#D89A3D]/15 blur-3xl" />

            {/* Temple skyline illustration */}
            <div className="pointer-events-none absolute top-0 right-0 h-[235px] w-[275px]">
              <Image
                src="/images/temple-banner.png"
                alt=""
                width={275}
                height={335}
                className="pointer-events-none absolute top-4 right-8 h-[155px] w-[275px] object-contain opacity-30"
                aria-hidden="true"
              />
            </div>

            <h1
              className="font-cormorant text-4xl font-semibold text-[#0D6B73]"
              style={{ marginLeft: "40px", marginTop: "20px" }}
            >
              Request a Temple
            </h1>

            <div
              className="my-3 flex items-center gap-2"
              style={{ marginLeft: "40px", marginTop: "10px" }}
            >
              <span className="h-px w-7 bg-[#C9A565]/60" />

              <Image
                src="/images/lotus.png" // Replace with your image
                alt="Lotus"
                width={30}
                height={30}
                className="object-contain"
              />

              <span className="h-px w-7 bg-[#C9A565]/60" />
            </div>

            <p
              className="max-w-[230px] text-sm leading-6 text-[#6D5E4C]"
              style={{ marginLeft: "40px" }}
            >
              Can&apos;t find your temple in the list?
              <br />
              Share the details and we&apos;ll review it for addition to
              Brajmarg.
            </p>
          </div>

          {/* ================= Unified form card ================= */}
          <div className="px-8 pt-6">
            <div
              className="space-y-7 rounded-3xl border border-[#E8D8BF] p-6"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
              }}
            >
              {/* Temple Details */}
              <div>
                <div
                  className="mb-4 flex items-center gap-2"
                  style={{ marginLeft: "10px" }}
                >
                  <TempleGlyph size={16} className="text-[#C76A24]" />
                  <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
                    Temple Details
                  </h2>
                </div>

                <div
                  className="grid gap-4 sm:grid-cols-3"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      Temple Name <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
                      value={form.temple_name}
                      onChange={(e) =>
                        updateField("temple_name", e.target.value)
                      }
                      placeholder="Enter Temple Name"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-3.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      City / Town <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Enter City"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      State <span className="text-[#C76A24]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        className="h-8 w-full appearance-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#A89A86] outline-none focus:border-[#D89A3D]"
                      >
                        <option>Select State</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#A89A86]"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <label className="mb-1 block text-xs text-[#6D5E4C]">
                    Full Temple Address{" "}
                    <span className="text-[#C76A24]">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      maxLength={300}
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Enter complete address of the temple"
                      className="w-full resize-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                    <span className="absolute right-3 bottom-2 text-[11px] text-[#A89A86]">
                      {form.address.length}/300
                    </span>
                  </div>
                </div>
              </div>

              {/* Access + Upload */}
              <div className="grid gap-5 sm:grid-cols-[1.8fr_1fr]">
                <div
                  style={{
                    marginLeft: "20px",

                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <User size={15} className="text-[#C76A24]" />
                    <h2 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
                      What would you like to access from this temple?
                    </h2>
                  </div>
                  <p className="mb-3 text-xs text-[#A89A86]">
                    (Select all that apply)
                  </p>

                  <div
                    className="flex flex-wrap gap-2"
                    style={{ marginTop: "10px" }}
                  >
                    {accessOptions.map((option) => {
                      const checked = form.requested_access.includes(
                        option.name,
                      );
                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => toggleAccess(option.name)}
                          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs whitespace-nowrap transition ${
                            checked
                              ? "border-[#D9A75C] bg-[#F7E8C9] text-[#6D5E4C]"
                              : "border-[#E5D7C2] bg-white text-[#6D5E4C]"
                          }`}
                        >
                          <span
                            className={`h-5.5 w-5.5 rounded-[3px] border ${
                              checked ? "border-[#D89A3D]" : "border-[#C9BBA3]"
                            }`}
                          />
                          {option.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="space-y-3"
                  style={{
                    marginRight: "20px",

                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <p className="text-sm font-medium text-[#0D6B73]">
                    Upload Temple Image{" "}
                    <span className="font-normal text-[#A89A86]">
                      (Optional)
                    </span>
                  </p>

                  <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#E5D7C2] bg-white px-4 py-6 text-center">
                    <UploadCloud size={20} className="text-[#0D6B73]" />
                    <p className="text-xs font-semibold text-[#0D6B73]">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[10px] text-[#A89A86]">
                      PNG, JPG upto 5MB
                    </p>
                  </div>

                  <div
                    className="rounded-xl bg-[#FBE9C9] p-5"
                    style={{ marginTop: "15px" }}
                  >
                    <div
                      className="mb-1 flex items-center gap-1.5"
                      style={{ marginLeft: "5px" }}
                    >
                      <TempleGlyph size={13} className="text-[#C76A24]" />
                      <span className="text-xs font-semibold text-[#0D6B73]">
                        Tip
                      </span>
                    </div>
                    <p className="text-[11px] leading-4 text-[#6D5E4C]">
                      Clear images of the temple, deity, or entrance help us
                      review faster.
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Details */}
              <div
                style={{
                  marginLeft: "20px",
                  marginBottom: "20px",
                  marginRight: "20px",
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <User size={15} className="text-[#C76A24]" />
                  <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
                    Your Details
                  </h2>
                </div>
                <p className="mb-3 text-xs text-[#A89A86]">
                  We&apos;ll only use these details to update you regarding this
                  temple request.
                </p>

                <div
                  className="grid gap-4 sm:grid-cols-2"
                  style={{ marginTop: "10px" }}
                >
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      Full Name <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
                      value={form.requester_name}
                      onChange={(e) =>
                        updateField("requester_name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      Email Address <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
                      value={form.requester_email}
                      onChange={(e) =>
                        updateField("requester_email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div
            className="px-8 pt-6 pb-3"
            style={{
              marginTop: "20px",
              marginRight: "20px",
              marginLeft: "20px",
              //   height: "30px",
            }}
          >
            <div className="flex flex-col gap-4 rounded-2xl bg-[#F3D9A0] p-5 sm:flex-row sm:items-center sm:gap-6">
              <div
                className="flex shrink-0 items-center gap-2 whitespace-nowrap"
                style={{ marginLeft: "10px" }}
              >
                <TempleGlyph size={24} className="text-[#C76A24]" />
                <h3 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
                  What Happens Next?
                </h3>
              </div>

              <div
                className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                {NEXT_STEPS.map(({ icon: Icon, title }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#D89A3D]">
                      <Icon size={16} />
                    </div>
                    <p className="text-[11px] leading-4 text-[#6D5E4C]">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#EADFC9] bg-[#FBF3E3] px-8 py-8"
            style={{ marginTop: "10px", height: "50px" }}
          >
            <button
              onClick={onClose}
              className="rounded-xl border border-[#E5D7C2] bg-white px-6 py-4 text-sm font-medium text-[#6D5E4C]"
              style={{ height: "35px", width: "60px" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-xl bg-[#0D6B73] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#09565D]"
              style={{ height: "35px", width: "150px", marginRight: "20px" }}
            >
              {submitting ? "Submitting..." : "Submit Request →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
