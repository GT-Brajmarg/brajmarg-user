"use client";

import Image from "next/image";
import Link from "next/link";
// import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveLink, toggleMenu, closeMenu } from "@/store/slices/navSlice";
import { useEffect, useState } from "react";
import { fetchAlerts } from "@/store/slices/alertsSlice";
import { Cormorant_Garamond } from "next/font/google";
import { Bell, User, Menu, X } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Temples", href: "/temples" },
  { label: "Shop", href: "/shop" },
  { label: "Seva", href: "/seva" },
  { label: "Yatra", href: "/yatra" },
  { label: "About Us", href: "/about" },
];
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const menuOpen = useAppSelector((state) => state.nav.menuOpen);
  const dispatch = useAppDispatch();
  const activeLink = useAppSelector((state) => state.nav.activeLink);

  const [showAlerts, setShowAlerts] = useState(false);

  const alerts = useAppSelector((state) => state.alerts.alerts);

  const alertCount = alerts.length;

  const latestAlerts = alerts.slice(0, 3);

  useEffect(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);
  return (
    <>
      <header className="w-full border-t-[3px] border-[#2F2A24] bg-[#EFDEC7]">
        <nav className="w-full border-b">
          <div className="w-full px-8 lg:px-20">
            {/* Mobile Navbar */}
            <div className="flex h-[72px] items-center justify-between md:hidden">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/image 49.png"
                  alt="Brajmarg"
                  width={30}
                  height={38}
                />

                <Image
                  src="/images/Group 20.png"
                  alt="Brajmarg"
                  width={100}
                  height={26}
                />
              </Link>

              <button
                onClick={() => dispatch(toggleMenu())}
                className="rounded-md p-2"
              >
                {menuOpen ? (
                  <X size={28} className="text-[#2D2924]" />
                ) : (
                  <Menu size={28} className="text-[#2D2924]" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="border-t border-[#D9C8B2] bg-[#EFDEC7] py-6 md:hidden">
                <ul
                  className={`${cormorant.className} flex flex-col items-center gap-5`}
                >
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          dispatch(setActiveLink(link.label));
                          dispatch(closeMenu());
                        }}
                        className={`text-[20px] font-semibold ${
                          activeLink === link.label
                            ? "text-[#C88A2A]"
                            : "text-[#2D2924]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  className="mx-auto mt-6 flex flex-col items-center gap-3"
                  style={{ marginTop: "30px" }}
                >
                  <button
                    onClick={() => setShowAlerts((prev) => !prev)}
                    className="flex h-[44px] w-[280px] items-center justify-center gap-2 rounded-[10px] bg-[#005D63]"
                  >
                    <Bell size={18} className="text-[#F7F1E8]" />

                    <span
                      className={`${cormorant.className} text-[15px] font-medium text-[#F7F1E8]`}
                    >
                      Subscribe Alerts
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      dispatch(closeMenu());
                      setLoginOpen(true);
                    }}
                    className="flex h-[44px] w-[280px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63]"
                  >
                    <User size={18} className="text-[#2D2924]" />

                    <span
                      className={`${cormorant.className} text-[15px] font-medium text-[#2D2924]`}
                    >
                      Login
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Navbar */}
            <div className="hidden h-[84px] grid-cols-[280px_1fr_340px] items-center md:grid">
              {/* Logo */}
              <div className="flex justify-end pr-40">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/images/image 49.png"
                    alt="Brajmarg"
                    width={42}
                    height={52}
                  />

                  <Image
                    src="/images/Group 20.png"
                    alt="Brajmarg"
                    width={130}
                    height={34}
                  />
                </Link>
              </div>

              {/* Nav Links */}
              <ul
                className={`${cormorant.className} flex items-center justify-center gap-14`}
              >
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => dispatch(setActiveLink(link.label))}
                      className="relative flex flex-col items-center"
                    >
                      <span
                        className={`text-[18px] font-semibold ${
                          activeLink === link.label
                            ? "text-[#C88A2A]"
                            : "text-[#2D2924]"
                        }`}
                      >
                        {link.label}
                      </span>

                      {activeLink === link.label && (
                        <Image
                          src="/images/lotus 2.png"
                          alt=""
                          width={26}
                          height={6}
                          className="absolute top-[24px]"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right Side */}
              <div
                className="flex items-center justify-end gap-3 pr-8"
                style={{ marginRight: "30px" }}
              >
                <button
                  onClick={() => setShowAlerts((prev) => !prev)}
                  className="flex h-[38px] w-[165px] items-center justify-center gap-2 rounded-[10px] bg-[#005D63]"
                >
                  <Bell size={16} strokeWidth={2} className="text-[#F7F1E8]" />

                  <span
                    className={`${cormorant.className} text-[14px] font-medium text-[#F7F1E8]`}
                  >
                    Subscribe Alerts
                  </span>
                </button>

                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex h-[38px] w-[92px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63]"
                >
                  <User size={16} strokeWidth={2} className="text-[#2D2924]" />

                  <span
                    className={`${cormorant.className} text-[14px] font-medium text-[#2D2924]`}
                  >
                    Login
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
