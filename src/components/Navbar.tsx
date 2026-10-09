"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMenu, closeMenu } from "@/store/slices/navSlice";
import { useEffect, useState } from "react";
import { fetchAlerts } from "@/store/slices/alertsSlice";
import { Bell, User, Menu, X, ShoppingCart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "@/components/auth/LoginModal";

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
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isCartActive = pathname === "/cart";

  const isAlertsActive = pathname.startsWith("/subscribe-alerts");

  const [showAlerts, setShowAlerts] = useState(false);

  const alerts = useAppSelector((state) => state.alerts.alerts);
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

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  // Prevent background scroll when mobile drawer or login modal is open
  useEffect(() => {
    if (menuOpen || loginOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow || "";
        document.documentElement.style.overflow = originalHtmlOverflow || "";
        document.body.style.touchAction = originalBodyTouchAction || "";
      };
    }
  }, [menuOpen, loginOpen]);

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
      <header
        style={{ position: "fixed", top: 0, zIndex: 40 }}
        className="w-full overflow-hidden border-[#2F2A24] bg-[#FBF8F3] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          aria-hidden
          className="pointer-events-none object-cover opacity-40"
        />
        <nav className="relative z-10 w-full border-b-[1px] border-[#EFDEC7]">
          <div className="w-full xl:px-20">
            {/* Mobile & Tablet Top Navbar Bar (strictly xl:hidden) */}
            <div
              style={{
                height: "64px",
                width: "100%",
                paddingLeft: "clamp(24px, 6vw, 64px)",
                paddingRight: "clamp(24px, 6vw, 64px)",
                boxSizing: "border-box",
              }}
              className="flex items-center justify-between xl:hidden"
            >
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/images/image 49.png"
                  alt="Brajmarg"
                  width={30}
                  height={38}
                />
                <span className="font-cormorant text-[22px] sm:text-[24px] font-bold tracking-wide text-[#005D63]">
                  Brajmarg
                </span>
              </Link>

              <button
                onClick={() => dispatch(toggleMenu())}
                className="rounded-md p-2 text-[#2D2924] transition hover:bg-[#EFDEC7]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <X size={26} className="text-[#2D2924]" />
                ) : (
                  <Menu size={26} className="text-[#2D2924]" />
                )}
              </button>
            </div>

            {/* Desktop Navbar (strictly hidden on mobile & tablet, visible on xl:grid) */}
            <div className="hidden h-[84px] grid-cols-[280px_1fr_340px] items-center xl:grid">
              {/* Logo */}
              <div className="flex justify-end pr-40">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/images/image 49.png"
                    alt="Brajmarg"
                    width={102}
                    height={62}
                    className="h-[56px] w-auto object-contain"
                  />
                  <span className="font-cormorant text-[21px] font-bold tracking-wide text-[#005D63]">
                    Brajmarg
                  </span>
                </Link>
              </div>

              {/* Nav Links */}
              <ul
                className="font-cormorant flex items-center justify-center gap-14"
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
                          className={`text-[18px] font-medium transition-colors ${isActive ? "text-[#C88A2A]" : "text-[#2D2924]"
                            }`}
                        >
                          {link.label}
                        </span>

                        {isActive && (
                          <Image
                            src="/images/lotus 2.png"
                            alt=""
                            width={40}
                            height={22}
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
                  className="flex h-[38px] w-[165px] items-center justify-center gap-2 rounded-[10px] bg-[#005D63] transition hover:bg-[#004e54]"
                >
                  <Bell size={16} strokeWidth={2} className="text-[#F7F1E8]" />
                  <span
                    className="font-cormorant text-[14px] font-medium text-[#F7F1E8]"
                  >
                    Subscribe Alerts
                  </span>

                  {isAlertsActive && (
                    <Image
                      src="/images/lotus 2.png"
                      alt=""
                      width={28}
                      height={8}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                    />
                  )}
                </button>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/cart"
                      className={`relative flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border transition ${isCartActive
                        ? "border-[#0F5C66] bg-[rgba(195,112,0,0.4)]"
                        : "border-[#005D63] bg-[#EFDEC7] hover:bg-[#F3E5D2]"
                        }`}
                      aria-label={`Cart with ${cartItemCount} items`}
                    >
                      <ShoppingCart
                        size={18}
                        strokeWidth={2}
                        className={
                          isCartActive ? "text-[#0F5C66]" : "text-[#0F5C66]"
                        }
                      />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C37000] px-1 text-[10px] font-bold text-white">
                          {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/profile"
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#005D63] bg-[#EFDEC7] transition hover:bg-[#F3E5D2]"
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
                      className="font-cormorant flex h-[38px] items-center justify-center rounded-[10px] border border-[#B85C38] px-3 text-[14px] font-medium text-[#B85C38] transition hover:bg-[#FBE5DA]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="flex h-[38px] w-[92px] items-center justify-center gap-2 rounded-[10px] border border-[#005D63] bg-[#EFDEC7] transition hover:bg-[#e4d1b8]"
                  >
                    <User
                      size={16}
                      strokeWidth={2}
                      className="text-[#0F5C66]"
                    />
                    <span
                      className="font-cormorant bg-transparent text-[14px] font-medium text-[#0F5C66]"
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

      {/* ══ Mobile & Tablet Right-Side Drawer Backdrop ══ */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
        className={`transition-transform duration-300 ease-in-out xl:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
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
          <button
            onClick={() => {
              setShowAlerts((prev) => !prev);
              dispatch(closeMenu());
            }}
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
              border: "none",
              cursor: "pointer",
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
          </button>

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
              <button
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
              </button>
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

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
