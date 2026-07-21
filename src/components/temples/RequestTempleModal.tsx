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
import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
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
  {
    image: "/images/review-icon.svg",
    title: "Our team reviews your request",
  },
  {
    image: "/images/verified-icon.svg",
    title: "Temple authenticity is verified",
  },
  {
    image: "/images/approved-icon.svg",
    title: "Approved temples are added to Brajmarg",
  },
  {
    image: "/images/mail-icon.svg",
    title: "You'll receive an update via email",
  },
];

export default function RequestTempleModal({ open, onClose }: Props) {
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <div
        className="relative z-10 max-h-[92vh] w-[95%] overflow-hidden rounded-[28px] shadow-[0_40px_120px_rgba(0,0,0,.35)]"
        style={{
          maxWidth: "660px",
          backgroundColor: "#FBF3E3",
          backgroundImage: "url('/images/paper-texture.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Texture */}
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none object-cover opacity-60"
        />

        {/* Cream Overlay */}
        {/* <div className="absolute inset-0 bg-[#FBF3E3]/55" /> */}

        {/* Content */}
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-[#6D5E4C] shadow-md transition hover:scale-105"
          >
            <X size={18} />
          </button>

          <div className="max-h-[92vh] overflow-y-auto">
            {/* ================= Header ================= */}
            <div className="relative px-8 pt-8 pb-2">
              {/* soft glow behind illustration */}

              {/* Temple skyline illustration */}
              <div className="pointer-events-none absolute top-0 right-0 h-[235px] w-[275px]">
                <Image
                  src="/images/temple-banner-1.png"
                  alt=""
                  width={305}
                  height={335}
                  className="pointer-events-none absolute top-9 right-8 h-[155px] w-[290px] object-contain"
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
                style={{
                  marginLeft: "80px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <span className="h-px w-7 bg-[#C9A565]/60" />

                <Image
                  src="/images/lotus.png" // Replace with your image
                  alt="Lotus"
                  width={50}
                  height={40}
                  className="object-contain"
                />

                <span className="h-px w-7 bg-[#C9A565]/60" />
              </div>

              <p
                className="font-cormorant max-w-[250px] text-sm leading-6 text-[#3D352F]"
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
                className="space-y-7 rounded-3xl border border-[#C37000]/50 p-6"
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
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    <Image
                      src="/images/temple-icon.png" // Replace with your image path
                      alt="Temple"
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                    <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
                      Temple Details
                    </h2>
                  </div>

                  <div
                    className="grid gap-4 sm:grid-cols-3"
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <div>
                      <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
                        Temple Name <span className="text-[#C76A24]">*</span>
                      </label>
                      <input
                        value={form.temple_name}
                        onChange={(e) =>
                          updateField("temple_name", e.target.value)
                        }
                        placeholder="Enter Temple Name"
                        className="font-cormorant h-8 w-full rounded-[8px] border border-[#C37000]/50 p-3.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                      />
                    </div>
                    <div>
                      <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
                        City / Town <span className="text-[#C76A24]">*</span>
                      </label>
                      <input
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Enter City"
                        className="font-cormorant h-8 w-full rounded-[8px] border border-[#C37000]/50 p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                      />
                    </div>
                    <div>
                      <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
                        State <span className="text-[#C76A24]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={form.state}
                          onChange={(e) => updateField("state", e.target.value)}
                          className="font-cormorant h-8 w-full appearance-none rounded-[8px] border border-[#C37000]/50 p-2.5 text-sm text-[#A89A86] outline-none focus:border-[#D89A3D]"
                        >
                          <option>Select State</option>
                        </select>
                        <svg
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0F5C66]"
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
                    <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
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
                        className="font-cormorant w-full resize-none rounded-[8px] border border-[#C37000]/50 p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                      />
                      <span
                        className={`${cormorantInfant.className} absolute right-3 bottom-2 text-[11px] text-[#A89A86]`}
                      >
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
                      <Image
                        src="/images/user-icon.png" // Replace with your image path
                        alt="User"
                        width={15}
                        height={15}
                        className="object-contain"
                      />
                      <h2
                        className={`${cormorantInfant.className} text-lg font-bold text-[#0D6B73]`}
                        style={{ marginLeft: "5px" }}
                      >
                        What would you like to access from this temple?
                      </h2>
                    </div>
                    <p className="font-cormorant mb-3 text-xs text-[#3D352F]">
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
                            className={`font-cormorant flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs whitespace-nowrap text-[#3D352F] transition ${
                              checked
                                ? "border-[#E5D7C2] bg-[#FDF1DD] text-[#3D352F]"
                                : "border-[#C37000] text-[#3D352F]"
                            }`}
                          >
                            <span
                              className={`h-3.5 w-3.5 rounded-[3px] border ${
                                checked
                                  ? "border-[#D89A3D] bg-[#FDF1DD]"
                                  : "border-[#C37000]"
                              }`}
                              style={{
                                marginLeft: "4px",
                                marginTop: "4px",
                                marginBottom: "4px",
                              }}
                            />
                            <span style={{ marginRight: "4px" }}>
                              {" "}
                              {option.name}
                            </span>
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
                    <p className="font-cormorant text-[16px] font-bold text-[#3D352F]">
                      Upload Temple Image (Optional)
                    </p>

                    <div
                      className="flex flex-col items-center gap-1.5 rounded-[16px] border border-[#C37000]/50 px-4 py-6 text-center"
                      style={{ marginTop: "10px" }}
                    >
                      <UploadCloud
                        size={20}
                        className="text-[#0D6B73]"
                        style={{ marginTop: "5px" }}
                      />
                      <p className="font-cormorant text-[14px] font-semibold text-[#0D6B73]">
                        Click to upload or drag and drop
                      </p>
                      <p className="font-cormorant text-[10px] text-[#A89A86]">
                        PNG, JPG upto 5MB
                      </p>
                    </div>

                    <div
                      className="rounded-xl border border-[#C37000]/50 bg-[#C37000]/10 p-5"
                      style={{ marginTop: "15px" }}
                    >
                      <div className="flex items-start gap-3">
                        <Image
                          src="/images/temple-icon-1.png"
                          alt="Temple"
                          width={94}
                          height={44}
                          className="mt-1 shrink-0 object-contain"
                          style={{ marginTop: "20px" }}
                        />

                        <div
                          className="flex flex-col"
                          style={{
                            marginTop: "10px",
                            marginLeft: "-15px",
                            marginBottom: "10px",
                          }}
                        >
                          <h4 className="font-cormorant text-[16px] leading-none font-semibold text-[#0D6B73]">
                            Tip
                          </h4>

                          <p className="font-cormorant mt-1 text-[11px] leading-[16px] text-[#6D5E4C]">
                            Clear images of the temple, deity,
                            <br />
                            or entrance help us review faster.
                          </p>
                        </div>
                      </div>
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
                    <Image
                      src="/images/user-icon.png" // Replace with your image path
                      alt="User"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                    <h2
                      className={`${cormorantInfant.className} text-xl font-bold text-[#0D6B73]`}
                      style={{ marginLeft: "10px" }}
                    >
                      Your Details
                    </h2>
                  </div>
                  <p className="font-cormorant mb-3 text-xs text-[#3D352F]">
                    We&apos;ll only use these details to update you regarding
                    this temple request.
                  </p>

                  <div
                    className="grid gap-4 sm:grid-cols-2"
                    style={{ marginTop: "10px" }}
                  >
                    <div>
                      <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
                        Full Name <span className="text-[#C76A24]">*</span>
                      </label>
                      <input
                        value={form.requester_name}
                        onChange={(e) =>
                          updateField("requester_name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="font-cormorant h-8 w-full resize-none rounded-[8px] border border-[#C37000]/50 p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                      />
                    </div>
                    <div>
                      <label className="font-cormorant mb-1 block text-[15px] text-[#3D352F]">
                        Email Address <span className="text-[#C76A24]">*</span>
                      </label>
                      <input
                        value={form.requester_email}
                        onChange={(e) =>
                          updateField("requester_email", e.target.value)
                        }
                        placeholder="Enter your email address"
                        className="font-cormorant h-8 w-full resize-none rounded-[8px] border border-[#C37000]/50 p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
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
              <div className="flex flex-col gap-4 rounded-2xl border-2 border-[#C37000] bg-[#C37000]/20 p-5 sm:flex-row sm:items-center sm:gap-6">
                <div
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap"
                  style={{ marginLeft: "10px" }}
                >
                  <Image
                    src="/images/temple-icon-1.png" // Your temple image
                    alt="Temple"
                    width={134}
                    height={24}
                    className="shrink-0 object-contain"
                    style={{ marginLeft: "-30px" }}
                  />
                  <h3
                    className="font-cormorant text-lg font-semibold text-[#0D6B73]"
                    style={{ marginLeft: "-30px" }}
                  >
                    What Happens Next?
                  </h3>
                </div>

                <div
                  className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4"
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginRight: "10px",
                  }}
                >
                  {NEXT_STEPS.map(({ image, title }) => (
                    <div
                      key={title}
                      className="flex flex-col items-center text-center"
                      style={{ marginTop: "5px" }}
                    >
                      <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full">
                        <Image
                          src={image}
                          alt={title}
                          width={28}
                          height={18}
                          className="object-contain"
                        />
                      </div>

                      <p className="font-cormorant text-[11px] leading-4 text-[#3D352F]">
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="sticky bottom-0 flex items-center justify-end gap-3 px-8 py-8"
              style={{ marginTop: "10px", height: "50px" }}
            >
              <button
                onClick={onClose}
                className="font-cormorant rounded-xl border border-[#0F5C66] px-6 py-4 text-sm font-medium text-[#0F5C66]"
                style={{ height: "35px", width: "60px" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="font-cormorant rounded-xl bg-[#0D6B73] px-6 py-2.5 text-sm font-medium text-[#EFDEC7] transition hover:bg-[#09565D]"
                style={{ height: "35px", width: "150px", marginRight: "20px" }}
              >
                {submitting ? "Submitting..." : "Submit Request →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
