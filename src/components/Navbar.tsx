"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMenu, closeMenu, setLoginModalOpen } from "@/store/slices/navSlice";
import { useEffect, useState } from "react";
import { fetchAlerts } from "@/store/slices/alertsSlice";
import { Bell, User, Menu, X, ShoppingCart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "@/components/auth/LoginModal";
import { showToast } from "@/lib/toast";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Temples", href: "/temples" },
  { label: "Shop", href: "/shop" },
  { label: "Seva", href: "/seva" },
  { label: "Yatra", href: "/yatra" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const menuOpen = useAppSelector((state) => state.nav.menuOpen);
  const reduxLoginModalOpen = useAppSelector((state) => state.nav.loginModalOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isCartActive = pathname === "/cart";

  const isAlertsActive = pathname.startsWith("/subscribe-alerts");

  const cartItems = useAppSelector((state) => state.cart.items);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";
      setIsLoggedIn(loggedIn);
    };

    const handleOpenLogin = () => {
      setLoginOpen(true);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("open_login_modal", handleOpenLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("open_login_modal", handleOpenLogin);
    };
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
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
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("brajmarg_temp_user");
    localStorage.removeItem("brajmarg_is_logged_in");

    setIsLoggedIn(false);
    dispatch(closeMenu());
    showToast.success("Logged out successfully");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  useEffect(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);

  return (
    <>
      <header
        style={{ position: "fixed", top: 0, zIndex: 40 }}
        className="w-full border-b border-[#EFDEC7] bg-[#FBF8F3] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          aria-hidden
          className="pointer-events-none object-cover opacity-40"
        />
        <nav className="relative z-10 w-full">
          {/* ══ Mobile & Tablet Top Navbar Bar (strictly lg:hidden) ══ */}
          <div className="flex h-[64px] w-full items-center justify-between px-4 sm:px-6 lg:hidden">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
              <Image
                src="/images/image 49.png"
                alt="Brajmarg"
                width={34}
                height={40}
                className="h-[38px] w-auto object-contain"
              />
              <span className="font-cormorant text-[22px] sm:text-[24px] font-bold tracking-wide text-[#005D63]">
                Brajmarg
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/cart"
                    className="relative flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#005D63] bg-[#EFDEC7] transition active:scale-95"
                    aria-label="Cart"
                  >
                    <ShoppingCart size={17} className="text-[#0F5C66]" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#C37000] px-1 text-[9px] font-bold text-white shadow-xs">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/profile"
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#005D63] bg-[#EFDEC7] transition active:scale-95"
                    aria-label="Profile"
                  >
                    <User size={17} className="text-[#0F5C66]" />
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] border border-[#005D63] bg-[#EFDEC7] px-3 text-[13px] font-medium text-[#0F5C66] cursor-pointer"
                >
                  <User size={15} />
                  <span className="font-cormorant font-semibold">Login</span>
                </button>
              )}

              <button
                onClick={() => dispatch(toggleMenu())}
                className="rounded-md p-1.5 text-[#2D2924] transition hover:bg-[#EFDEC7] active:scale-95"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <X size={26} className="text-[#2D2924]" />
                ) : (
                  <Menu size={26} className="text-[#2D2924]" />
                )}
              </button>
            </div>
          </div>

          {/* ══ Desktop Navbar (strictly visible on lg:flex) ══ */}
          <div className="mx-auto hidden h-[84px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 lg:flex">
            {/* Left: Brand Logo */}
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/image 49.png"
                  alt="Brajmarg"
                  width={64}
                  height={56}
                  className="h-[52px] w-auto object-contain"
                  priority
                />
                <span className="font-cormorant text-[23px] xl:text-[24px] font-bold tracking-wide text-[#005D63]">
                  Brajmarg
                </span>
              </Link>
            </div>

            {/* Center: Nav Links */}
            <ul className="font-cormorant flex flex-1 items-center justify-center gap-7 lg:gap-8 xl:gap-11 2xl:gap-14 px-4">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="relative flex flex-col items-center  transition-transform hover:-translate-y-0.5"
                    >
                      <span
                        className={`text-[17px] xl:text-[18px] font-medium transition-colors ${isActive
                          ? "text-[#C88A2A] font-semibold"
                          : "text-[#2D2924] hover:text-[#005D63]"
                          }`}
                      >
                        {link.label}
                      </span>

                      {isActive && (
                        <Image
                          src="/images/lotus 2.png"
                          alt=""
                          width={48}
                          height={30}
                          className="pointer-events-none absolute top-[28px] left-1/2 -translate-x-1/2"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right: Actions */}
            <div className="flex shrink-0 items-center justify-end gap-2.5 xl:gap-3">
              {/* Subscribe Alerts button */}
              <Link
                href="/subscribe-alerts"
                className={`group relative flex h-[38px] items-center justify-center gap-2 rounded-[10px] px-3.5 xl:px-4 transition ${isAlertsActive
                  ? "border-[1.5px] border-[#C37000] border-b-0 bg-transparent"
                  : "border border-transparent bg-[#005D63] hover:border-[1.5px] hover:border-[#C37000] hover:border-b-0 hover:bg-transparent"
                  }`}
              >
                <Bell
                  size={16}
                  strokeWidth={2}
                  className={`transition-colors ${isAlertsActive
                    ? "text-[#C37000]"
                    : "text-[#F7F1E8] group-hover:text-[#C37000]"
                    }`}
                />
                <span
                  className={`font-cormorant text-[15px] xl:text-[16px] font-semibold whitespace-nowrap transition-colors ${isAlertsActive
                    ? "text-[#C37000]"
                    : "text-[#F7F1E8] group-hover:text-[#C37000]"
                    }`}
                >
                  Subscribe Alerts
                </span>

                {/* Lotus motif ornament: shown when active or on hover, with open bottom border */}
                {isAlertsActive ? (
                  <Image
                    src="/images/lotus 2.png"
                    alt=""
                    width={46}
                    height={46}
                    className="pointer-events-none absolute -bottom-[7px] left-1/2 -translate-x-1/2"
                  />
                ) : (
                  <Image
                    src="/images/lotus 2.png"
                    alt=""
                    width={46}
                    height={46}
                    className="pointer-events-none absolute -bottom-[7px] left-1/2 -translate-x-1/2 hidden group-hover:block"
                  />
                )}
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center gap-2.5 xl:gap-3">
                  {/* Cart */}
                  <Link
                    href="/cart"
                    className={`relative flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border transition ${isCartActive
                      ? "border-[#005D63] bg-[#E2CCA9]"
                      : "border-[#005D63] bg-[#EFDEC7] hover:bg-[#E8D4B8]"
                      }`}
                    aria-label={`Cart with ${cartItemCount} items`}
                  >
                    <ShoppingCart
                      size={18}
                      strokeWidth={2}
                      className="text-[#0F5C66]"
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C37000] px-1 text-[10px] font-bold text-white shadow-xs">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </span>
                    )}
                  </Link>

                  {/* Profile */}
                  <Link
                    href="/profile"
                    className={`flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border transition ${pathname === "/profile"
                      ? "border-[#005D63] bg-[#E2CCA9]"
                      : "border-[#005D63] bg-[#EFDEC7] hover:bg-[#E8D4B8]"
                      }`}
                    aria-label="Profile"
                  >
                    <User
                      size={18}
                      strokeWidth={2}
                      className="text-[#0F5C66]"
                    />
                  </Link>

                  {/* Logout Button */}
                  {/* <button
                    type="button"
                    onClick={handleLogout}
                    className="font-cormorant flex h-[38px] items-center justify-center rounded-[10px] border border-[#B85C38] bg-transparent px-3.5 text-[14px] font-medium text-[#B85C38] transition hover:bg-[#FBE5DA] hover:border-[#9E4725] cursor-pointer whitespace-nowrap"
                  >
                    Logout
                  </button> */}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="flex h-[38px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63] bg-[#EFDEC7] px-4 transition hover:bg-[#E4D1B8] cursor-pointer"
                >
                  <User
                    size={16}
                    strokeWidth={2}
                    className="text-[#0F5C66]"
                  />
                  <span className="font-cormorant bg-transparent text-[14px] font-medium text-[#0F5C66]">
                    Login
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ══ Mobile & Tablet Right-Side Drawer Backdrop ══ */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ touchAction: "none" }}
        onTouchMove={(e) => e.preventDefault()}
        onClick={() => dispatch(closeMenu())}
        aria-hidden="true"
      />

      {/* ══ Mobile & Tablet Right-Side Drawer Panel ══ */}
      <aside
        style={{
          height: "100dvh",
          maxHeight: "100vh",
          width: "320px",
          maxWidth: "85vw",
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FBF8F3",
          borderLeft: "1px solid #D4C3AC",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.35)",
          overscrollBehavior: "contain",
        }}
        className={`transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Paper texture overlay */}
        <div
          style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: "none" }}
        >
          <Image
            src="/images/temple-paper-texture.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* ── Header ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "64px",
            flexShrink: 0,
            paddingLeft: "20px",
            paddingRight: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #D4C3AC",
            backgroundColor: "#F3E7D5",
          }}
        >
          <Link
            href="/"
            onClick={() => dispatch(closeMenu())}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Image src="/images/image 49.png" alt="Brajmarg" width={26} height={34} className="h-7 w-auto object-contain" />
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#005D63",
                letterSpacing: "0.02em",
              }}
            >
              Brajmarg
            </span>
          </Link>
          <button
            onClick={() => dispatch(closeMenu())}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2D2924",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Nav Links (scrollable) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            padding: "20px 18px 16px 18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              paddingLeft: "8px",
              marginBottom: "12px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#8C755E",
              textTransform: "uppercase",
              fontFamily: "var(--font-cormorant), serif",
            }}
          >
            Navigation
          </p>

          <ul style={{ display: "flex", flexDirection: "column", gap: "6px", listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.label} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Link
                    href={link.href}
                    onClick={() => dispatch(closeMenu())}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      backgroundColor: isActive ? "#005D63" : "transparent",
                      color: isActive ? "#FFFFFF" : "#2E241D",
                      fontFamily: "var(--font-cormorant), serif",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxShadow: isActive ? "0 2px 8px rgba(0, 93, 99, 0.25)" : "none",
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: isActive ? 600 : 500 }}>
                      {link.label}
                    </span>
                    {isActive ? (
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#FFFFFF",
                          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "18px", color: "#A28A70", opacity: 0.7 }}>›</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Spiritual blessing badge */}
          <div
            style={{
              marginTop: "auto",
              padding: "12px 14px",
              borderRadius: "12px",
              backgroundColor: "rgba(239, 222, 199, 0.45)",
              border: "1px dashed #D4C3AC",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#8B5E34",
                fontFamily: "var(--font-cormorant), serif",
                letterSpacing: "0.06em",
              }}
            >
              ॥ श्री राधे ॥
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#7A6A55",
                marginTop: "2px",
                fontFamily: "var(--font-cormorant), serif",
              }}
            >
              Braj Darshan & Seva
            </p>
          </div>
        </div>

        {/* ── Footer Actions (pinned bottom with safe-area) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flexShrink: 0,
            borderTop: "1px solid #D4C3AC",
            backgroundColor: "#F3E7D5",
            paddingTop: "16px",
            paddingLeft: "18px",
            paddingRight: "18px",
            paddingBottom: "max(22px, env(safe-area-inset-bottom, 22px))",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Subscribe Alerts */}
          <Link
            href="/subscribe-alerts"
            onClick={() => dispatch(closeMenu())}
            style={{
              height: "44px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              borderRadius: "10px",
              backgroundColor: "#005D63",
              color: "#FFFFFF",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0, 93, 99, 0.25)",
            }}
          >
            <Bell size={16} color="#F7F1E8" />
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#F7F1E8",
                fontFamily: "var(--font-cormorant), serif",
              }}
            >
              Subscribe Alerts
            </span>
          </Link>

          {/* Login / Profile */}
          {isLoggedIn ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  href="/cart"
                  onClick={() => dispatch(closeMenu())}
                  style={{
                    height: "42px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    borderRadius: "10px",
                    border: "1px solid #005D63",
                    backgroundColor: "#EFDEC7",
                    textDecoration: "none",
                  }}
                >
                  <ShoppingCart size={16} color="#0F5C66" />
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#0F5C66",
                      fontFamily: "var(--font-cormorant), serif",
                    }}
                  >
                    Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => dispatch(closeMenu())}
                  style={{
                    height: "42px",
                    width: "46px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    border: "1px solid #005D63",
                    backgroundColor: "#EFDEC7",
                    textDecoration: "none",
                  }}
                  aria-label="Profile"
                >
                  <User size={18} color="#0F5C66" />
                </Link>
              </div>
              {/* <button
                type="button"
                onClick={handleLogout}
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  border: "1px solid #B85C38",
                  backgroundColor: "transparent",
                  color: "#B85C38",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                Logout
              </button> */}
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(closeMenu());
                setLoginOpen(true);
              }}
              style={{
                height: "44px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                borderRadius: "10px",
                border: "2px solid #005D63",
                backgroundColor: "#EFDEC7",
                cursor: "pointer",
              }}
            >
              <User size={16} color="#0F5C66" />
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#0F5C66",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                Login
              </span>
            </button>
          )}

          {/* Tagline */}
          <p
            style={{
              paddingTop: "2px",
              textAlign: "center",
              fontSize: "11px",
              color: "#7A6A55",
              fontFamily: "var(--font-cormorant), serif",
            }}
          >
            Connecting Devotees to Braj Bhoomi
          </p>
        </div>
      </aside>

      <LoginModal
        open={loginOpen || reduxLoginModalOpen}
        onClose={() => {
          setLoginOpen(false);
          dispatch(setLoginModalOpen(false));
        }}
      />
    </>
  );
}
