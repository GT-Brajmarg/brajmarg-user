// // // // // "use client";

// // // // // import { X } from "lucide-react";
// // // // // import { useEffect } from "react";

// // // // // interface Props {
// // // // //   open: boolean;
// // // // //   onClose: () => void;
// // // // //   children: React.ReactNode;
// // // // // }

// // // // // export default function RequestTempleModal({ open, onClose, children }: Props) {
// // // // //   useEffect(() => {
// // // // //     if (open) {
// // // // //       document.body.style.overflow = "hidden";
// // // // //     } else {
// // // // //       document.body.style.overflow = "auto";
// // // // //     }

// // // // //     return () => {
// // // // //       document.body.style.overflow = "auto";
// // // // //     };
// // // // //   }, [open]);

// // // // //   useEffect(() => {
// // // // //     const handleKeyDown = (e: KeyboardEvent) => {
// // // // //       if (e.key === "Escape") onClose();
// // // // //     };

// // // // //     window.addEventListener("keydown", handleKeyDown);

// // // // //     return () => window.removeEventListener("keydown", handleKeyDown);
// // // // //   }, [onClose]);

// // // // //   if (!open) return null;

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
// // // // //       {/* Overlay */}
// // // // //       <div
// // // // //         onClick={onClose}
// // // // //         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// // // // //       />

// // // // //       {/* Modal */}
// // // // //       <div className="relative z-10 max-h-[90vh] w-[95%] max-w-[1200px] animate-[fadeIn_.25s_ease] overflow-hidden rounded-3xl bg-[#F8F1E6] shadow-2xl">
// // // // //         <button
// // // // //           onClick={onClose}
// // // // //           className="absolute top-5 right-5 z-20 rounded-full bg-white p-2 shadow hover:bg-gray-100"
// // // // //         >
// // // // //           <X size={20} />
// // // // //         </button>

// // // // //         <div className="max-h-[90vh] overflow-y-auto">{children}</div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { X } from "lucide-react";
// // // // import { useEffect } from "react";

// // // // interface Props {
// // // //   open: boolean;
// // // //   onClose: () => void;
// // // // }

// // // // export default function RequestTempleModal({ open, onClose }: Props) {
// // // //   useEffect(() => {
// // // //     document.body.style.overflow = open ? "hidden" : "auto";

// // // //     return () => {
// // // //       document.body.style.overflow = "auto";
// // // //     };
// // // //   }, [open]);

// // // //   useEffect(() => {
// // // //     const handleKeyDown = (e: KeyboardEvent) => {
// // // //       if (e.key === "Escape") onClose();
// // // //     };

// // // //     window.addEventListener("keydown", handleKeyDown);

// // // //     return () => window.removeEventListener("keydown", handleKeyDown);
// // // //   }, [onClose]);

// // // //   if (!open) return null;

// // // //   return (
// // // //     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
// // // //       {/* Overlay */}
// // // //       <div
// // // //         onClick={onClose}
// // // //         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// // // //       />

// // // //       {/* Modal */}
// // // //       <div className="relative z-10 max-h-[90vh] w-[95%] max-w-[1200px] animate-[fadeIn_.25s_ease] overflow-hidden rounded-3xl bg-[#F8F1E6] shadow-2xl">
// // // //         {/* Close Button */}
// // // //         <button
// // // //           onClick={onClose}
// // // //           className="absolute top-5 right-5 z-20 rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
// // // //         >
// // // //           <X size={20} />
// // // //         </button>

// // // //         {/* Modal Content */}
// // // //         <div className="max-h-[90vh] overflow-y-auto p-10">
// // // //           <h2 className="font-cormorant text-5xl font-semibold text-[#0D6B73]">
// // // //             Request a Temple
// // // //           </h2>

// // // //           <p className="mt-3 max-w-2xl text-[#6A5C49]">
// // // //             Help us expand Brajmarg by submitting details of a temple that is
// // // //             not currently listed. Our team will review the information before
// // // //             publishing it.
// // // //           </p>

// // // //           {/* TODO: Replace this with your form */}
// // // //           <div className="mt-10 rounded-2xl border border-dashed border-[#D8B77B] bg-white p-16 text-center">
// // // //             <p className="text-lg text-gray-500">
// // // //               Temple Request Form goes here
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import {
// // //   X,
// // //   Flower2,
// // //   Landmark,
// // //   User,
// // //   UploadCloud,
// // //   Lightbulb,
// // //   Search,
// // //   ShieldCheck,
// // //   HeartHandshake,
// // //   Mail,
// // // } from "lucide-react";
// // // import { useEffect, useState } from "react";

// // // interface Props {
// // //   open: boolean;
// // //   onClose: () => void;
// // // }

// // // const ACCESS_OPTIONS = [
// // //   "Prasad",
// // //   "Seva Booking",
// // //   "Darshan Updates",
// // //   "Puja / Havan",
// // //   "Temple Yatra",
// // //   "Frames & Photos",
// // //   "Poshak / Temple items",
// // // ];

// // // const NEXT_STEPS = [
// // //   {
// // //     icon: Search,
// // //     title: "Our team reviews your request",
// // //   },
// // //   {
// // //     icon: ShieldCheck,
// // //     title: "Temple authenticity is verified",
// // //   },
// // //   {
// // //     icon: HeartHandshake,
// // //     title: "Approved temples are added to Brajmarg",
// // //   },
// // //   {
// // //     icon: Mail,
// // //     title: "You'll receive an update via email",
// // //   },
// // // ];

// // // export default function RequestTempleModal({ open, onClose }: Props) {
// // //   const [address, setAddress] = useState("");
// // //   const [selectedAccess, setSelectedAccess] = useState<string[]>([
// // //     "Frames & Photos",
// // //   ]);

// // //   useEffect(() => {
// // //     document.body.style.overflow = open ? "hidden" : "auto";

// // //     return () => {
// // //       document.body.style.overflow = "auto";
// // //     };
// // //   }, [open]);

// // //   if (!open) return null;

// // //   const toggleAccess = (option: string) => {
// // //     setSelectedAccess((prev) =>
// // //       prev.includes(option)
// // //         ? prev.filter((item) => item !== option)
// // //         : [...prev, option],
// // //     );
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
// // //       {/* Overlay */}
// // //       <div
// // //         onClick={onClose}
// // //         className="absolute inset-0 bg-black/70 backdrop-blur-md"
// // //       />

// // //       {/* Modal */}
// // //       <div className="relative z-10 h-[92vh] w-[95%] max-w-4xl overflow-hidden rounded-[28px] bg-[#FBF3E3] shadow-[0_40px_120px_rgba(0,0,0,.35)]">
// // //         {/* Close */}
// // //         <button
// // //           onClick={onClose}
// // //           className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#6D5E4C] shadow-md transition hover:scale-105 hover:bg-white"
// // //         >
// // //           <X size={18} />
// // //         </button>

// // //         <div className="h-full overflow-y-auto">
// // //           {/* ================= Header ================= */}
// // //           <div className="relative overflow-hidden rounded-t-3xl bg-[#F6E7C8] px-8 py-8 md:px-10">
// // //             {/* Background Texture */}
// // //             {/* <div
// // //               className="absolute inset-0 opacity-20"
// // //               style={{
// // //                 backgroundImage: "url('/images/paper-texture.png')",
// // //                 backgroundSize: "cover",
// // //               }}
// // //             /> */}

// // //             {/* Temple Illustration */}
// // //             <div className="pointer-events-none absolute right-0 bottom-0 w-[320px] md:w-[420px]">
// // //               <img
// // //                 src="/images/temple-banner.png"
// // //                 alt="Temple"
// // //                 width={550}
// // //                 height={550}
// // //                 className="translate-y-14 object-contain opacity-95"
// // //               />
// // //             </div>

// // //             {/* Flying Birds */}
// // //             {/* <div className="absolute top-8 right-56 hidden text-xs text-[#C99A4D]/60 md:block">
// // //               ✦ ✦ ✦
// // //             </div> */}

// // //             {/* Content */}
// // //             <div className="relative z-10 ml-3 flex w-[360px] flex-col">
// // //               {/* Heading */}
// // //               <h1
// // //                 className="font-cormorant text-[40px] leading-[0.95] font-semibold text-[#0D6B73]"
// // //                 style={{ letterSpacing: "-0.02em" }}
// // //               >
// // //                 Request a Temple
// // //               </h1>

// // //               {/* Ornament */}
// // //               <div className="mt-4 mb-4 flex items-center">
// // //                 <div className="mt-4 flex items-center gap-3">
// // //                   <div className="h-[1px] w-10 bg-[#C79A4A]" />

// // //                   <img src="/images/lotus.png" className="h-7 w-7" />

// // //                   <div className="h-[1px] w-10 bg-[#C79A4A]" />
// // //                 </div>
// // //               </div>

// // //               {/* Description */}
// // //               <p
// // //                 className="max-w-[300px] text-[20px] text-[#5F4D3B]"
// // //                 style={{
// // //                   fontFamily: "Cormorant Garamond, serif",
// // //                   lineHeight: "1.05",
// // //                   fontWeight: 400,
// // //                 }}
// // //               >
// // //                 Can't find your temple in the list?
// // //                 <br />
// // //                 Share the details and we'll review it for addition to Brajmarg.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* ================= Body ================= */}
// // //           <div className="space-y-6 p-8">
// // //             {/* Temple Details */}
// // //             <div className="rounded-2xl border border-[#E8D8BF] bg-white/70 p-6">
// // //               <div className="mb-5 flex items-center gap-2 text-[#D89A3D]">
// // //                 <Landmark size={18} />
// // //                 <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
// // //                   Temple Details
// // //                 </h2>
// // //               </div>

// // //               <div className="grid gap-4 md:grid-cols-3">
// // //                 <div>
// // //                   <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                     Temple Name *
// // //                   </label>
// // //                   <input
// // //                     placeholder="Enter Temple Name"
// // //                     className="w-full rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm outline-none focus:border-[#D89A3D]"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                     City / Town *
// // //                   </label>
// // //                   <input
// // //                     placeholder="Enter City"
// // //                     className="w-full rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm outline-none focus:border-[#D89A3D]"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                     State *
// // //                   </label>
// // //                   <select className="w-full rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm text-[#6D5E4C] outline-none focus:border-[#D89A3D]">
// // //                     <option>Select State</option>
// // //                   </select>
// // //                 </div>
// // //               </div>

// // //               <div className="mt-4">
// // //                 <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                   Full Temple Address *
// // //                 </label>
// // //                 <textarea
// // //                   rows={3}
// // //                   maxLength={300}
// // //                   value={address}
// // //                   onChange={(e) => setAddress(e.target.value)}
// // //                   placeholder="Enter complete address of the temple"
// // //                   className="w-full resize-none rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm outline-none focus:border-[#D89A3D]"
// // //                 />
// // //                 <div className="mt-1 text-right text-xs text-[#A89A86]">
// // //                   {address.length}/300
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Access + Upload */}
// // //             <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
// // //               {/* Access options */}
// // //               <div className="rounded-2xl border border-[#E8D8BF] bg-white/70 p-6">
// // //                 <div className="mb-1 flex items-center gap-2 text-[#D89A3D]">
// // //                   <User size={18} />
// // //                   <h2 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
// // //                     What would you like to access from this temple?
// // //                   </h2>
// // //                 </div>
// // //                 <p className="mb-4 text-xs text-[#A89A86]">
// // //                   Select all that apply
// // //                 </p>

// // //                 <div className="flex flex-wrap gap-3">
// // //                   {ACCESS_OPTIONS.map((option) => {
// // //                     const checked = selectedAccess.includes(option);
// // //                     return (
// // //                       <button
// // //                         key={option}
// // //                         type="button"
// // //                         onClick={() => toggleAccess(option)}
// // //                         className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
// // //                           checked
// // //                             ? "border-[#D89A3D] bg-[#FFF4E3] text-[#8A6232]"
// // //                             : "border-[#E5D7C2] bg-white text-[#6D5E4C]"
// // //                         }`}
// // //                       >
// // //                         <span
// // //                           className={`flex h-4 w-4 items-center justify-center rounded border ${
// // //                             checked
// // //                               ? "border-[#D89A3D] bg-[#D89A3D] text-white"
// // //                               : "border-[#C9BBA3]"
// // //                           }`}
// // //                         >
// // //                           {checked && (
// // //                             <svg
// // //                               viewBox="0 0 12 12"
// // //                               className="h-2.5 w-2.5"
// // //                               fill="none"
// // //                             >
// // //                               <path
// // //                                 d="M2 6l3 3 5-6"
// // //                                 stroke="currentColor"
// // //                                 strokeWidth="1.6"
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                               />
// // //                             </svg>
// // //                           )}
// // //                         </span>
// // //                         {option}
// // //                       </button>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               </div>

// // //               {/* Upload */}
// // //               <div className="space-y-4">
// // //                 <div className="rounded-2xl border border-dashed border-[#D89A3D] bg-white/70 p-6 text-center">
// // //                   <h3 className="text-sm font-medium text-[#0D6B73]">
// // //                     Upload Temple Image{" "}
// // //                     <span className="text-[#A89A86]">(Optional)</span>
// // //                   </h3>

// // //                   <div className="mt-4 flex flex-col items-center gap-2 text-[#0D6B73]">
// // //                     <UploadCloud size={22} />
// // //                     <p className="text-xs font-medium text-[#0D6B73]">
// // //                       Click to upload or drag and drop
// // //                     </p>
// // //                     <p className="text-[10px] text-[#A89A86]">
// // //                       PNG, JPG upto 5MB
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-3 rounded-2xl bg-[#FFF4E3] p-4">
// // //                   <Lightbulb
// // //                     size={18}
// // //                     className="mt-0.5 shrink-0 text-[#D89A3D]"
// // //                   />
// // //                   <p className="text-xs leading-5 text-[#6D5E4C]">
// // //                     <span className="font-medium text-[#8A6232]">Tip:</span>{" "}
// // //                     Clear images of the temple, deity, or entrance help us
// // //                     review faster.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Your Details */}
// // //             <div className="rounded-2xl border border-[#E8D8BF] bg-white/70 p-6">
// // //               <div className="mb-4 flex items-center gap-2 text-[#D89A3D]">
// // //                 <User size={18} />
// // //                 <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
// // //                   Your Details
// // //                 </h2>
// // //               </div>
// // //               <p className="-mt-2 mb-4 text-xs text-[#A89A86]">
// // //                 We&apos;ll only use these details to update you regarding this
// // //                 temple request.
// // //               </p>

// // //               <div className="grid gap-4 md:grid-cols-2">
// // //                 <div>
// // //                   <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                     Full Name *
// // //                   </label>
// // //                   <input
// // //                     placeholder="Enter your full name"
// // //                     className="w-full rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm outline-none focus:border-[#D89A3D]"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="mb-1.5 block text-xs font-medium text-[#6D5E4C]">
// // //                     Email Address *
// // //                   </label>
// // //                   <input
// // //                     placeholder="Enter your email address"
// // //                     className="w-full rounded-xl border border-[#E5D7C2] bg-white p-3 text-sm outline-none focus:border-[#D89A3D]"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* What happens next */}
// // //             <div className="rounded-2xl border border-[#E8C896] bg-[#FBE9C9] p-6">
// // //               <div className="mb-4 flex items-center gap-2">
// // //                 <Landmark size={18} className="text-[#D89A3D]" />
// // //                 <h3 className="font-cormorant text-lg font-semibold text-[#8A6232]">
// // //                   What Happens Next?
// // //                 </h3>
// // //               </div>

// // //               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
// // //                 {NEXT_STEPS.map(({ icon: Icon, title }) => (
// // //                   <div
// // //                     key={title}
// // //                     className="flex flex-col items-center text-center"
// // //                   >
// // //                     <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#D89A3D]">
// // //                       <Icon size={18} />
// // //                     </div>
// // //                     <p className="text-xs leading-5 text-[#6D5E4C]">{title}</p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Footer */}
// // //           <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#EADFC9] bg-[#FBF3E3] px-8 py-4">
// // //             <button
// // //               onClick={onClose}
// // //               className="rounded-xl border border-[#E5D7C2] bg-white px-6 py-3 text-sm font-medium text-[#6D5E4C]"
// // //             >
// // //               Cancel
// // //             </button>

// // //             <button className="rounded-xl bg-[#0D6B73] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#09565D]">
// // //               Submit Request →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import {
// //   X,
// //   UploadCloud,
// //   User,
// //   Search,
// //   ShieldCheck,
// //   HeartHandshake,
// //   Mail,
// // } from "lucide-react";
// // import { useEffect, useState } from "react";

// // interface Props {
// //   open: boolean;
// //   onClose: () => void;
// // }

// // /** Small temple / shikhara glyph used across section headers — closer to the
// //  *  reference art than lucide's "Landmark" (which reads as a Greco-Roman building). */
// // function TempleGlyph({
// //   size = 18,
// //   className = "",
// // }: {
// //   size?: number;
// //   className?: string;
// // }) {
// //   return (
// //     <svg
// //       width={size}
// //       height={size}
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       className={className}
// //     >
// //       <path
// //         d="M12 2.5 L13.4 5.2 L11.9 5.2 L13 7.4 L11 7.4 L12 9.6 L7.5 9.6 L9 6.6 L7.7 6.6 L9.4 4 L8.2 4 L12 2.5 Z"
// //         fill="currentColor"
// //       />
// //       <rect x="10.3" y="9.6" width="3.4" height="2.1" fill="currentColor" />
// //       <path
// //         d="M5 21 L5 13.2 L7.4 9.7 L16.6 9.7 L19 13.2 L19 21 Z"
// //         fill="currentColor"
// //       />
// //       <rect
// //         x="2.5"
// //         y="20.2"
// //         width="19"
// //         height="1.4"
// //         rx="0.4"
// //         fill="currentColor"
// //       />
// //       <rect x="10.7" y="14.5" width="2.6" height="6.5" fill="#FBF3E3" />
// //     </svg>
// //   );
// // }

// // const ACCESS_OPTIONS = [
// //   "Prasad",
// //   "Seva Booking",
// //   "Darshan Updates",
// //   "Puja / Havan",
// //   "Temple Yatra",
// //   "Frames & Photos",
// //   "Poshak / Temple items",
// // ];

// // const NEXT_STEPS = [
// //   { icon: Search, title: "Our team reviews your request" },
// //   { icon: ShieldCheck, title: "Temple authenticity is verified" },
// //   { icon: HeartHandshake, title: "Approved temples are added to Brajmarg" },
// //   { icon: Mail, title: "You'll receive an update via email" },
// // ];

// // export default function RequestTempleModal({ open, onClose }: Props) {
// //   const [address, setAddress] = useState("");
// //   const [selectedAccess, setSelectedAccess] = useState<string[]>([
// //     "Seva Booking",
// //     "Frames & Photos",
// //   ]);

// //   useEffect(() => {
// //     document.body.style.overflow = open ? "hidden" : "auto";
// //     return () => {
// //       document.body.style.overflow = "auto";
// //     };
// //   }, [open]);

// //   if (!open) return null;

// //   const toggleAccess = (option: string) => {
// //     setSelectedAccess((prev) =>
// //       prev.includes(option)
// //         ? prev.filter((item) => item !== option)
// //         : [...prev, option],
// //     );
// //   };

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
// //       <div
// //         onClick={onClose}
// //         className="absolute inset-0 bg-black/70 backdrop-blur-md"
// //       />

// //       <div
// //         className="relative z-10 max-h-[92vh] w-[95%] max-w-2xl overflow-hidden rounded-[28px] shadow-[0_40px_120px_rgba(0,0,0,.35)]"
// //         style={{
// //           backgroundColor: "#FBF3E3",
// //           backgroundImage:
// //             "radial-gradient(circle at 15% 20%, rgba(193,150,95,0.07), transparent 40%), radial-gradient(circle at 85% 75%, rgba(193,150,95,0.06), transparent 45%)",
// //         }}
// //       >
// //         <button
// //           onClick={onClose}
// //           className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6D5E4C] shadow-md transition hover:scale-105"
// //         >
// //           <X size={18} />
// //         </button>

// //         <div className="max-h-[92vh] overflow-y-auto">
// //           {/* ================= Header ================= */}
// //           <div className="relative px-8 pt-8 pb-2">
// //             {/* Birds */}
// //             <svg
// //               viewBox="0 0 80 24"
// //               className="absolute top-3 right-28 h-5 w-20 text-[#C9A565]"
// //             >
// //               <path
// //                 d="M2 14 q4 -7 8 0 q4 -7 8 0"
// //                 stroke="currentColor"
// //                 strokeWidth="1.6"
// //                 fill="none"
// //                 strokeLinecap="round"
// //               />
// //               <path
// //                 d="M26 6 q4 -6 8 0 q4 -6 8 0"
// //                 stroke="currentColor"
// //                 strokeWidth="1.6"
// //                 fill="none"
// //                 strokeLinecap="round"
// //                 opacity="0.8"
// //               />
// //               <path
// //                 d="M50 16 q4 -6 8 0 q4 -6 8 0"
// //                 stroke="currentColor"
// //                 strokeWidth="1.6"
// //                 fill="none"
// //                 strokeLinecap="round"
// //                 opacity="0.6"
// //               />
// //             </svg>

// //             {/* Temple skyline illustration */}
// //             <svg
// //               viewBox="0 0 240 130"
// //               className="pointer-events-none absolute top-0 right-0 h-[110px] w-[230px] text-[#C9A565]"
// //               fill="currentColor"
// //             >
// //               <path
// //                 d="M150 130 L150 92 L161 76 L172 92 L172 130 Z"
// //                 opacity="0.45"
// //               />
// //               <path
// //                 d="M182 130 L182 80 L194 62 L206 80 L206 130 Z"
// //                 opacity="0.6"
// //               />
// //               <path
// //                 d="M95 130 L95 88 L101 88 L101 76 L96 76 L104 56 L112 38 L104 24 L112 14 L120 24 L112 38 L120 56 L128 76 L123 76 L123 88 L129 88 L129 130 Z"
// //                 opacity="0.95"
// //               />
// //               <path
// //                 d="M133 130 L133 84 L142 66 L151 84 L151 130 Z"
// //                 opacity="0.8"
// //               />
// //               <path
// //                 d="M60 130 L60 100 L68 86 L76 100 L76 130 Z"
// //                 opacity="0.35"
// //               />
// //               <rect x="55" y="126" width="160" height="4" opacity="0.3" />
// //             </svg>

// //             <h1 className="font-cormorant text-4xl font-semibold text-[#0D6B73]">
// //               Request a Temple
// //             </h1>

// //             <div className="my-3 flex items-center gap-2">
// //               <span className="h-px w-7 bg-[#C9A565]/60" />
// //               <svg
// //                 width="14"
// //                 height="14"
// //                 viewBox="0 0 24 24"
// //                 className="text-[#C9A565]"
// //               >
// //                 <path
// //                   d="M12 21c-4-2-6-5.5-6-9 1.8 0 3.6.7 5 2 .3-2 1-3.6 1-7 0 3.4.7 5 1 7 1.4-1.3 3.2-2 5-2 0 3.5-2 7-6 9Z"
// //                   fill="currentColor"
// //                 />
// //               </svg>
// //               <span className="h-px w-7 bg-[#C9A565]/60" />
// //             </div>

// //             <p className="max-w-[300px] text-sm leading-6 text-[#6D5E4C]">
// //               Can&apos;t find your temple in the list? Share the details and
// //               we&apos;ll review it for addition to Brajmarg.
// //             </p>
// //           </div>

// //           {/* ================= Unified form card ================= */}
// //           <div className="px-8 pt-6">
// //             <div className="space-y-7 rounded-3xl border border-[#E8D8BF] p-7">
// //               {/* Temple Details */}
// //               <div>
// //                 <div className="mb-4 flex items-center gap-2">
// //                   <TempleGlyph size={16} className="text-[#D89A3D]" />
// //                   <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
// //                     Temple Details
// //                   </h2>
// //                 </div>

// //                 <div className="grid gap-3 sm:grid-cols-3">
// //                   <div>
// //                     <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                       Temple Name <span className="text-[#D89A3D]">*</span>
// //                     </label>
// //                     <input
// //                       placeholder="Enter Temple Name"
// //                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                       City / Town <span className="text-[#D89A3D]">*</span>
// //                     </label>
// //                     <input
// //                       placeholder="Enter City"
// //                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                       State <span className="text-[#D89A3D]">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <select className="w-full appearance-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#A89A86] outline-none focus:border-[#D89A3D]">
// //                         <option>Select State</option>
// //                       </select>
// //                       <svg
// //                         className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#A89A86]"
// //                         width="14"
// //                         height="14"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path
// //                           d="M6 9l6 6 6-6"
// //                           stroke="currentColor"
// //                           strokeWidth="2"
// //                           fill="none"
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                         />
// //                       </svg>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="mt-3">
// //                   <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                     Full Temple Address{" "}
// //                     <span className="text-[#D89A3D]">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <textarea
// //                       rows={3}
// //                       maxLength={300}
// //                       value={address}
// //                       onChange={(e) => setAddress(e.target.value)}
// //                       placeholder="Enter complete address of the temple"
// //                       className="w-full resize-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
// //                     />
// //                     <span className="absolute right-3 bottom-2 text-[11px] text-[#A89A86]">
// //                       {address.length}/300
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Access + Upload */}
// //               <div className="grid gap-5 sm:grid-cols-[1.5fr_1fr]">
// //                 <div>
// //                   <div className="mb-1 flex items-center gap-2">
// //                     <User size={15} className="text-[#D89A3D]" />
// //                     <h2 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
// //                       What would you like to access from this temple?
// //                     </h2>
// //                   </div>
// //                   <p className="mb-3 text-xs text-[#A89A86]">
// //                     (Select all that apply)
// //                   </p>

// //                   <div className="flex flex-wrap gap-2.5">
// //                     {ACCESS_OPTIONS.map((option) => {
// //                       const checked = selectedAccess.includes(option);
// //                       return (
// //                         <button
// //                           key={option}
// //                           type="button"
// //                           onClick={() => toggleAccess(option)}
// //                           className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition ${
// //                             checked
// //                               ? "border-[#D9A75C] bg-[#F7E8C9] text-[#6D5E4C]"
// //                               : "border-[#E5D7C2] bg-white text-[#6D5E4C]"
// //                           }`}
// //                         >
// //                           <span
// //                             className={`h-3.5 w-3.5 rounded-[3px] border ${
// //                               checked ? "border-[#D89A3D]" : "border-[#C9BBA3]"
// //                             }`}
// //                           />
// //                           {option}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //                 <div className="space-y-3">
// //                   <p className="text-sm font-medium text-[#0D6B73]">
// //                     Upload Temple Image{" "}
// //                     <span className="font-normal text-[#A89A86]">
// //                       (Optional)
// //                     </span>
// //                   </p>

// //                   <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#E5D7C2] bg-white px-4 py-6 text-center">
// //                     <UploadCloud size={20} className="text-[#0D6B73]" />
// //                     <p className="text-xs font-semibold text-[#0D6B73]">
// //                       Click to upload or drag and drop
// //                     </p>
// //                     <p className="text-[10px] text-[#A89A86]">
// //                       PNG, JPG upto 5MB
// //                     </p>
// //                   </div>

// //                   <div className="rounded-xl bg-[#FBE9C9] p-3">
// //                     <div className="mb-1 flex items-center gap-1.5">
// //                       <TempleGlyph size={13} className="text-[#D89A3D]" />
// //                       <span className="text-xs font-semibold text-[#0D6B73]">
// //                         Tip
// //                       </span>
// //                     </div>
// //                     <p className="text-[11px] leading-4 text-[#6D5E4C]">
// //                       Clear images of the temple, deity, or entrance help us
// //                       review faster.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Your Details */}
// //               <div>
// //                 <div className="mb-1 flex items-center gap-2">
// //                   <User size={15} className="text-[#D89A3D]" />
// //                   <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
// //                     Your Details
// //                   </h2>
// //                 </div>
// //                 <p className="mb-3 text-xs text-[#A89A86]">
// //                   We&apos;ll only use these details to update you regarding this
// //                   temple request.
// //                 </p>

// //                 <div className="grid gap-3 sm:grid-cols-2">
// //                   <div>
// //                     <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                       Full Name <span className="text-[#D89A3D]">*</span>
// //                     </label>
// //                     <input
// //                       placeholder="Enter your full name"
// //                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="mb-1 block text-xs text-[#6D5E4C]">
// //                       Email Address <span className="text-[#D89A3D]">*</span>
// //                     </label>
// //                     <input
// //                       placeholder="Enter your email address"
// //                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* What Happens Next */}
// //           <div className="px-8 py-6">
// //             <div className="flex flex-col gap-4 rounded-2xl bg-[#F6E1B0] p-5 sm:flex-row sm:items-center sm:gap-6">
// //               <div className="flex items-center gap-2 sm:w-[170px] sm:shrink-0">
// //                 <TempleGlyph size={22} className="text-[#D89A3D]" />
// //                 <h3 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
// //                   What Happens Next?
// //                 </h3>
// //               </div>

// //               <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
// //                 {NEXT_STEPS.map(({ icon: Icon, title }) => (
// //                   <div
// //                     key={title}
// //                     className="flex flex-col items-center text-center"
// //                   >
// //                     <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#D89A3D]">
// //                       <Icon size={16} />
// //                     </div>
// //                     <p className="text-[11px] leading-4 text-[#6D5E4C]">
// //                       {title}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Footer */}
// //           <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#EADFC9] bg-[#FBF3E3] px-8 py-4">
// //             <button
// //               onClick={onClose}
// //               className="rounded-xl border border-[#E5D7C2] bg-white px-6 py-2.5 text-sm font-medium text-[#6D5E4C]"
// //             >
// //               Cancel
// //             </button>
// //             <button className="rounded-xl bg-[#0D6B73] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#09565D]">
// //               Submit Request →
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import {
//   X,
//   UploadCloud,
//   User,
//   Search,
//   ShieldCheck,
//   HeartHandshake,
//   Mail,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// /** Small temple / shikhara glyph used across section headers. */
// function TempleGlyph({
//   size = 18,
//   className = "",
// }: {
//   size?: number;
//   className?: string;
// }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       className={className}
//     >
//       <path
//         d="M12 2.5 L13.4 5.2 L11.9 5.2 L13 7.4 L11 7.4 L12 9.6 L7.5 9.6 L9 6.6 L7.7 6.6 L9.4 4 L8.2 4 L12 2.5 Z"
//         fill="currentColor"
//       />
//       <rect x="10.3" y="9.6" width="3.4" height="2.1" fill="currentColor" />
//       <path
//         d="M5 21 L5 13.2 L7.4 9.7 L16.6 9.7 L19 13.2 L19 21 Z"
//         fill="currentColor"
//       />
//       <rect
//         x="2.5"
//         y="20.2"
//         width="19"
//         height="1.4"
//         rx="0.4"
//         fill="currentColor"
//       />
//       <rect x="10.7" y="14.5" width="2.6" height="6.5" fill="#FBF3E3" />
//     </svg>
//   );
// }

// const ICON_ORANGE = "#C76A24";
// const GOLD = "#D89A3D";

// const ACCESS_OPTIONS = [
//   "Prasad",
//   "Seva Booking",
//   "Darshan Updates",
//   "Puja / Havan",
//   "Temple Yatra",
//   "Frames & Photos",
//   "Poshak / Temple items",
// ];

// const NEXT_STEPS = [
//   { icon: Search, title: "Our team reviews your request" },
//   { icon: ShieldCheck, title: "Temple authenticity is verified" },
//   { icon: HeartHandshake, title: "Approved temples are added to Brajmarg" },
//   { icon: Mail, title: "You'll receive an update via email" },
// ];

// export default function RequestTempleModal({ open, onClose }: Props) {
//   const [address, setAddress] = useState("");
//   const [selectedAccess, setSelectedAccess] = useState<string[]>([
//     "Seva Booking",
//     "Frames & Photos",
//   ]);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   if (!open) return null;

//   const toggleAccess = (option: string) => {
//     setSelectedAccess((prev) =>
//       prev.includes(option)
//         ? prev.filter((item) => item !== option)
//         : [...prev, option],
//     );
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/70 backdrop-blur-md"
//       />

//       <div
//         className="relative z-10 max-h-[92vh] w-[95%] max-w-2xl overflow-hidden rounded-[28px] shadow-[0_40px_120px_rgba(0,0,0,.35)]"
//         style={{
//           backgroundColor: "#FBF3E3",
//           backgroundImage:
//             "radial-gradient(circle at 0% 0%, rgba(150,110,60,0.10), transparent 38%), radial-gradient(circle at 100% 100%, rgba(150,110,60,0.08), transparent 40%), radial-gradient(circle at 20% 60%, rgba(193,150,95,0.06), transparent 45%), radial-gradient(circle at 80% 15%, rgba(193,150,95,0.08), transparent 40%)",
//         }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6D5E4C] shadow-md transition hover:scale-105"
//         >
//           <X size={18} />
//         </button>

//         <div className="max-h-[92vh] overflow-y-auto">
//           {/* ================= Header ================= */}
//           <div className="relative px-8 pt-8 pb-2">
//             {/* soft glow behind illustration */}
//             <div className="pointer-events-none absolute top-0 right-0 h-36 w-56 rounded-full bg-[#D89A3D]/15 blur-3xl" />

//             {/* Birds */}
//             <svg
//               viewBox="0 0 80 24"
//               className="absolute top-2 right-40 h-5 w-20 text-[#C9A565]"
//             >
//               <path
//                 d="M2 14 q4 -7 8 0 q4 -7 8 0"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 fill="none"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M26 6 q4 -6 8 0 q4 -6 8 0"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 fill="none"
//                 strokeLinecap="round"
//                 opacity="0.8"
//               />
//               <path
//                 d="M50 16 q4 -6 8 0 q4 -6 8 0"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 fill="none"
//                 strokeLinecap="round"
//                 opacity="0.6"
//               />
//               <path
//                 d="M10 4 q3 -5 6 0 q3 -5 6 0"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 fill="none"
//                 strokeLinecap="round"
//                 opacity="0.5"
//               />
//             </svg>

//             {/* Temple skyline illustration */}
//             <svg
//               viewBox="0 0 240 130"
//               className="pointer-events-none absolute top-0 right-0 h-[135px] w-[275px] text-[#C9A565]"
//               fill="currentColor"
//             >
//               <path
//                 d="M145 130 L145 92 L156 76 L167 92 L167 130 Z"
//                 opacity="0.4"
//               />
//               <path
//                 d="M178 130 L178 80 L190 62 L202 80 L202 130 Z"
//                 opacity="0.55"
//               />
//               <path
//                 d="M95 130 L95 88 L101 88 L101 76 L96 76 L104 56 L112 38 L104 24 L112 14 L120 24 L112 38 L120 56 L128 76 L123 76 L123 88 L129 88 L129 130 Z"
//                 opacity="0.95"
//               />
//               <path
//                 d="M133 130 L133 84 L142 66 L151 84 L151 130 Z"
//                 opacity="0.8"
//               />
//               <path
//                 d="M206 130 L206 92 L215 78 L224 92 L224 130 Z"
//                 opacity="0.45"
//               />
//               <path
//                 d="M60 130 L60 100 L68 86 L76 100 L76 130 Z"
//                 opacity="0.3"
//               />
//               <rect x="55" y="126" width="170" height="4" opacity="0.28" />
//             </svg>

//             <h1 className="font-cormorant text-4xl font-semibold text-[#0D6B73]">
//               Request a Temple
//             </h1>

//             <div className="my-3 flex items-center gap-2">
//               <span className="h-px w-7 bg-[#C9A565]/60" />
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 className="text-[#C9A565]"
//               >
//                 <path
//                   d="M12 21c-4-2-6-5.5-6-9 1.8 0 3.6.7 5 2 .3-2 1-3.6 1-7 0 3.4.7 5 1 7 1.4-1.3 3.2-2 5-2 0 3.5-2 7-6 9Z"
//                   fill="currentColor"
//                 />
//               </svg>
//               <span className="h-px w-7 bg-[#C9A565]/60" />
//             </div>

//             <p className="max-w-[230px] text-sm leading-6 text-[#6D5E4C]">
//               Can&apos;t find your temple in the list?
//               <br />
//               Share the details and we&apos;ll review it for addition to
//               Brajmarg.
//             </p>
//           </div>

//           {/* ================= Unified form card ================= */}
//           <div className="px-8 pt-6">
//             <div className="space-y-7 rounded-3xl border border-[#E8D8BF] p-6">
//               {/* Temple Details */}
//               <div>
//                 <div className="mb-4 flex items-center gap-2">
//                   <TempleGlyph size={16} className="text-[#C76A24]" />
//                   <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
//                     Temple Details
//                   </h2>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-3">
//                   <div>
//                     <label className="mb-1 block text-xs text-[#6D5E4C]">
//                       Temple Name <span className="text-[#C76A24]">*</span>
//                     </label>
//                     <input
//                       placeholder="Enter Temple Name"
//                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1 block text-xs text-[#6D5E4C]">
//                       City / Town <span className="text-[#C76A24]">*</span>
//                     </label>
//                     <input
//                       placeholder="Enter City"
//                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1 block text-xs text-[#6D5E4C]">
//                       State <span className="text-[#C76A24]">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full appearance-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#A89A86] outline-none focus:border-[#D89A3D]">
//                         <option>Select State</option>
//                       </select>
//                       <svg
//                         className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#A89A86]"
//                         width="14"
//                         height="14"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           d="M6 9l6 6 6-6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           fill="none"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <label className="mb-1 block text-xs text-[#6D5E4C]">
//                     Full Temple Address{" "}
//                     <span className="text-[#C76A24]">*</span>
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       rows={3}
//                       maxLength={300}
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       placeholder="Enter complete address of the temple"
//                       className="w-full resize-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
//                     />
//                     <span className="absolute right-3 bottom-2 text-[11px] text-[#A89A86]">
//                       {address.length}/300
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Access + Upload */}
//               <div className="grid gap-5 sm:grid-cols-[1.5fr_1fr]">
//                 <div>
//                   <div className="mb-1 flex items-center gap-2">
//                     <User size={15} className="text-[#C76A24]" />
//                     <h2 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
//                       What would you like to access from this temple?
//                     </h2>
//                   </div>
//                   <p className="mb-3 text-xs text-[#A89A86]">
//                     (Select all that apply)
//                   </p>

//                   <div className="flex flex-wrap gap-2.5">
//                     {ACCESS_OPTIONS.map((option) => {
//                       const checked = selectedAccess.includes(option);
//                       return (
//                         <button
//                           key={option}
//                           type="button"
//                           onClick={() => toggleAccess(option)}
//                           className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[13px] transition ${
//                             checked
//                               ? "border-[#D9A75C] bg-[#F7E8C9] text-[#6D5E4C]"
//                               : "border-[#E5D7C2] bg-white text-[#6D5E4C]"
//                           }`}
//                         >
//                           <span
//                             className={`h-3.5 w-3.5 rounded-[3px] border ${
//                               checked ? "border-[#D89A3D]" : "border-[#C9BBA3]"
//                             }`}
//                           />
//                           {option}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <p className="text-sm font-medium text-[#0D6B73]">
//                     Upload Temple Image{" "}
//                     <span className="font-normal text-[#A89A86]">
//                       (Optional)
//                     </span>
//                   </p>

//                   <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#E5D7C2] bg-white px-4 py-6 text-center">
//                     <UploadCloud size={20} className="text-[#0D6B73]" />
//                     <p className="text-xs font-semibold text-[#0D6B73]">
//                       Click to upload or drag and drop
//                     </p>
//                     <p className="text-[10px] text-[#A89A86]">
//                       PNG, JPG upto 5MB
//                     </p>
//                   </div>

//                   <div className="rounded-xl bg-[#FBE9C9] p-3">
//                     <div className="mb-1 flex items-center gap-1.5">
//                       <TempleGlyph size={13} className="text-[#C76A24]" />
//                       <span className="text-xs font-semibold text-[#0D6B73]">
//                         Tip
//                       </span>
//                     </div>
//                     <p className="text-[11px] leading-4 text-[#6D5E4C]">
//                       Clear images of the temple, deity, or entrance help us
//                       review faster.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Your Details */}
//               <div>
//                 <div className="mb-1 flex items-center gap-2">
//                   <User size={15} className="text-[#C76A24]" />
//                   <h2 className="font-cormorant text-xl font-semibold text-[#0D6B73]">
//                     Your Details
//                   </h2>
//                 </div>
//                 <p className="mb-3 text-xs text-[#A89A86]">
//                   We&apos;ll only use these details to update you regarding this
//                   temple request.
//                 </p>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-1 block text-xs text-[#6D5E4C]">
//                       Full Name <span className="text-[#C76A24]">*</span>
//                     </label>
//                     <input
//                       placeholder="Enter your full name"
//                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1 block text-xs text-[#6D5E4C]">
//                       Email Address <span className="text-[#C76A24]">*</span>
//                     </label>
//                     <input
//                       placeholder="Enter your email address"
//                       className="w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* What Happens Next */}
//           <div className="px-8 pt-6 pb-3">
//             <div className="flex flex-col gap-4 rounded-2xl bg-[#F3D9A0] p-5 sm:flex-row sm:items-center sm:gap-6">
//               <div className="flex items-center gap-2 sm:w-[170px] sm:shrink-0">
//                 <TempleGlyph size={24} className="text-[#C76A24]" />
//                 <h3 className="font-cormorant text-lg font-semibold text-[#0D6B73]">
//                   What Happens Next?
//                 </h3>
//               </div>

//               <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
//                 {NEXT_STEPS.map(({ icon: Icon, title }) => (
//                   <div
//                     key={title}
//                     className="flex flex-col items-center text-center"
//                   >
//                     <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#D89A3D]">
//                       <Icon size={16} />
//                     </div>
//                     <p className="text-[11px] leading-4 text-[#6D5E4C]">
//                       {title}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#EADFC9] bg-[#FBF3E3] px-8 py-4">
//             <button
//               onClick={onClose}
//               className="rounded-xl border border-[#E5D7C2] bg-white px-6 py-2.5 text-sm font-medium text-[#6D5E4C]"
//             >
//               Cancel
//             </button>
//             <button className="rounded-xl bg-[#0D6B73] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#09565D]">
//               Submit Request →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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

const ACCESS_OPTIONS = [
  "Prasad",
  "Seva Booking",
  "Darshan Updates",
  "Puja / Havan",
  "Temple Yatra",
  "Frames & Photos",
  "Poshak / Temple items",
];

const NEXT_STEPS = [
  { icon: Search, title: "Our team reviews your request" },
  { icon: ShieldCheck, title: "Temple authenticity is verified" },
  { icon: HeartHandshake, title: "Approved temples are added to Brajmarg" },
  { icon: Mail, title: "You'll receive an update via email" },
];

export default function RequestTempleModal({ open, onClose }: Props) {
  const [address, setAddress] = useState("");
  const [selectedAccess, setSelectedAccess] = useState<string[]>([
    "Seva Booking",
    "Frames & Photos",
  ]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const toggleAccess = (option: string) => {
    setSelectedAccess((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

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
                className="pointer-events-none absolute top-4 right-8 h-[155px] w-[275px] object-contain opacity-90"
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
                      placeholder="Enter Temple Name"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-3.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      City / Town <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
                      placeholder="Enter City"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      State <span className="text-[#C76A24]">*</span>
                    </label>
                    <div className="relative">
                      <select className="h-8 w-full appearance-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#A89A86] outline-none focus:border-[#D89A3D]">
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter complete address of the temple"
                      className="w-full resize-none rounded-xl border border-[#E5D7C2] bg-white p-2.5 pb-6 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                    <span className="absolute right-3 bottom-2 text-[11px] text-[#A89A86]">
                      {address.length}/300
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
                    {ACCESS_OPTIONS.map((option) => {
                      const checked = selectedAccess.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleAccess(option)}
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
                          {option}
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
                      placeholder="Enter your full name"
                      className="h-8 w-full rounded-xl border border-[#E5D7C2] bg-white p-2.5 text-sm text-[#3F362B] placeholder-[#A89A86] outline-none focus:border-[#D89A3D]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6D5E4C]">
                      Email Address <span className="text-[#C76A24]">*</span>
                    </label>
                    <input
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
              className="rounded-xl bg-[#0D6B73] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#09565D]"
              style={{ height: "35px", width: "150px", marginRight: "20px" }}
            >
              Submit Request →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
