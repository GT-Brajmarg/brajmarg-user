"use client";

import Image from "next/image";
import Link from "next/link";
// import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMenu, closeMenu } from "@/store/slices/navSlice";
import { useEffect, useState } from "react";
import { fetchAlerts } from "@/store/slices/alertsSlice";
import { Cormorant_Garamond } from "next/font/google";
import { Bell, User, Menu, X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/auth/LoginModal";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const [showAlerts, setShowAlerts] = useState(false);

  const alerts = useAppSelector((state) => state.alerts.alerts);
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const alertCount = alerts.length;

  const latestAlerts = alerts.slice(0, 3);

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("brajmarg_temp_user");
    localStorage.removeItem("brajmarg_is_logged_in");

    setIsLoggedIn(false);
    dispatch(closeMenu());
    router.push("/");
  };

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
                          dispatch(closeMenu());
                        }}
                        className={`text-[20px] font-semibold ${
                          (
                            link.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(link.href)
                          )
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

                  {isLoggedIn ? (
                    <div className="flex w-[280px] gap-3">
                      <Link
                        href="/cart"
                        onClick={() => dispatch(closeMenu())}
                        className="flex h-[44px] flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#005D63] bg-[#FFF8EF]"
                      >
                        <ShoppingCart size={18} className="text-[#0F5C66]" />

                        <span
                          className={`${cormorant.className} text-[15px] font-medium text-[#0F5C66]`}
                        >
                          Cart
                        </span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => dispatch(closeMenu())}
                        className="flex h-[44px] w-[52px] items-center justify-center rounded-[10px] border border-[#005D63]"
                        aria-label="Profile"
                      >
                        <User size={19} className="text-[#0F5C66]" />
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(closeMenu());
                        setLoginOpen(true);
                      }}
                      className="flex h-[44px] w-[280px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63]"
                      style={{ color: "#0F5C66" }}
                    >
                      <User size={18} className="text-[#0F5C66]" />

                      <span
                        className={`${cormorant.className} text-[15px] font-medium text-[#0F5C66]`}
                      >
                        Login
                      </span>
                    </button>
                  )}
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
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="relative flex flex-col items-center"
                      >
                        <span
                          className={`text-[18px] font-semibold transition-colors ${
                            isActive ? "text-[#C88A2A]" : "text-[#2D2924]"
                          }`}
                        >
                          {link.label}
                        </span>

                        {isActive && (
                          <Image
                            src="/images/lotus 2.png"
                            alt=""
                            width={26}
                            height={6}
                            className="absolute top-[28px] left-1/2 -translate-x-1/2"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
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

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/cart"
                      className="relative flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#005D63] bg-[#FFF8EF] transition hover:bg-[#F3E5D2]"
                      aria-label={`Cart with ${cartItemCount} items`}
                    >
                      <ShoppingCart
                        size={18}
                        strokeWidth={2}
                        className="text-[#0F5C66]"
                      />

                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C67A00] px-1 text-[10px] font-bold text-white">
                          {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/profile"
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#005D63] bg-[#FFF8EF] transition hover:bg-[#F3E5D2]"
                      aria-label="Profile"
                    >
                      <User
                        size={18}
                        strokeWidth={2}
                        className="text-[#0F5C66]"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`${cormorant.className} flex h-[38px] items-center justify-center rounded-[10px] border border-[#B85C38] px-3 text-[14px] font-medium text-[#B85C38] transition hover:bg-[#FBE5DA]`}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="flex h-[38px] w-[92px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63] bg-[#EFDEC7]"
                  >
                    <User
                      size={16}
                      strokeWidth={2}
                      className="text-[#0F5C66]"
                    />

                    <span
                      className={`${cormorant.className} bg-[#EFDEC7] text-[14px] font-medium text-[#0F5C66]`}
                    >
                      Login
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
