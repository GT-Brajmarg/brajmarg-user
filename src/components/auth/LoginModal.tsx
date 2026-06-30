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
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActiveTab("login");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[980px] overflow-hidden rounded-[26px] bg-[#F7ECD9] shadow-[0_35px_120px_rgba(0,0,0,.35)] transition-all duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC7A7] bg-white text-[#5F4E3B] transition hover:rotate-90"
        >
          <X size={18} />
        </button>

        <div className="grid min-h-[660px] lg:grid-cols-[48%_52%]">
          {/* Left */}
          <div className="hidden lg:block">
            <AuthLeftPanel />
          </div>

          {/* Right */}
          <div
            className="relative flex flex-col bg-[#F8EEDB]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(214,171,93,.08), transparent 35%),
                radial-gradient(circle at 100% 100%, rgba(214,171,93,.08), transparent 40%)
              `,
            }}
          >
            {/* Mobile Logo */}
            <div
              className="flex flex-col items-center pt-8 lg:hidden"
              style={{ marginTop: "20px" }}
            >
              <img
                src="/images/image 49.png"
                className="h-14 w-auto"
                alt="Brajmarg"
              />

              <h2 className="font-cormorant mt-4 text-3xl font-semibold text-[#0B6971]">
                Brajmarg
              </h2>
            </div>

            {/* Tabs */}
            <div
              className="flex justify-center px-6 pt-8 lg:px-10"
              style={{ marginTop: "50px" }}
            >
              <div className="grid h-[52px] w-full max-w-[330px] grid-cols-2 overflow-hidden rounded-xl border border-[#D8BE92] bg-[#F8F0E3]">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeTab === "login"
                      ? "bg-[#D7B06C] text-[#0D6971]"
                      : "text-[#6C5B48] hover:bg-[#F2E4C8]"
                  }`}
                >
                  <LogIn size={18} strokeWidth={2} />
                  <span className="font-medium">Login</span>
                </button>

                <button
                  onClick={() => setActiveTab("signup")}
                  className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeTab === "signup"
                      ? "bg-[#D7B06C] text-[#0D6971]"
                      : "text-[#6C5B48] hover:bg-[#F2E4C8]"
                  }`}
                >
                  <UserPlus size={18} strokeWidth={2} />
                  <span className="font-medium">Sign Up</span>
                </button>
              </div>
            </div>

            {/* Forms */}
            <div
              className="flex-1 px-6 py-8 lg:px-10"
              style={{ marginTop: "20px" }}
            >
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
