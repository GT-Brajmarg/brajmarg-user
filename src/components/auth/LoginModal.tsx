"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import AuthLeftPanel from "./AuthLeftPanel";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { LogIn, UserPlus } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActiveTab("login");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4 md:p-6 backdrop-blur-md">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 my-auto w-full max-w-[960px] overflow-hidden rounded-2xl sm:rounded-[26px] bg-[#F7ECD9] shadow-[0_25px_80px_rgba(0,0,0,.3)] transition-all duration-300"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close login modal"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC7A7] bg-white text-[#5F4E3B] shadow-sm transition hover:rotate-90 hover:bg-[#FAF4EB]"
        >
          <X size={18} />
        </button>

        <div className="grid lg:grid-cols-[48%_52%]">
          {/* Left */}
          <div className="hidden lg:flex lg:flex-col h-full">
            <AuthLeftPanel />
          </div>

          {/* Right */}
          <div
            className="relative flex flex-col justify-center bg-[#F8EEDB] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 min-h-[540px] lg:min-h-[640px]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(214,171,93,.08), transparent 35%),
                radial-gradient(circle at 100% 100%, rgba(214,171,93,.08), transparent 40%)
              `,
            }}
          >
            {/* Mobile Logo */}
            <div className="flex flex-col items-center pb-4 lg:hidden">
              <img
                src="/images/image 49.png"
                className="h-12 w-auto"
                alt="Brajmarg"
              />

              <h2 className="font-cormorant mt-2 text-2xl font-semibold text-[#0B6971]">
                Brajmarg
              </h2>
            </div>

            {/* Forms */}
            <div className="flex flex-1 flex-col justify-center">
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
