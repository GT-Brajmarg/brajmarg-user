"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveLink, toggleMenu, closeMenu } from "@/store/slices/navSlice";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Temples", href: "/temples" },
  { label: "Shop", href: "/shop" },
  { label: "Seva", href: "/seva" },
  { label: "Yatra", href: "/yatra" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const activeLink = useAppSelector((state) => state.nav.activeLink);
  const menuOpen = useAppSelector((state) => state.nav.menuOpen);

  return (
    <header className={styles.headerWrapper}>
      {/* Top dark strip */}
      <div className={styles.topStrip}>
        <span className={styles.topStripText}>Home</span>
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          {/* Logo Section */}
          <Link href="/" className={styles.logoSection} onClick={() => dispatch(setActiveLink("Home"))}>
            <div className={styles.logoIcon}>
              <Image
                src="/images/image 49.png"
                alt="Brajmarg Elephant Logo"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.logoText}>
              <Image
                src="/images/Group 20.png"
                alt="Brajmarg"
                width={100}
                height={30}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${activeLink === link.label ? styles.navLinkActive : ""}`}
                  onClick={() => dispatch(setActiveLink(link.label))}
                >
                  <span className={styles.navLinkText}>{link.label}</span>

                  {/* Lotus decoration shown ONLY under active link */}
                  {activeLink === link.label && (
                    <span className={styles.lotusWrapper}>
                      <Image
                        src="/images/lotus 2.png"
                        alt="active indicator"
                        width={42}
                        height={10}
                        className={styles.lotusImg}
                      />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.btnSubscribe}>
              <span className={styles.bellIcon}>🔔</span>
              Subscribe Alerts
            </button>
            <Link href="/login" className={styles.btnLogin}>
              <Image
                src="/images/Frame 39.png"
                alt="Login"
                width={90}
                height={38}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <button
            className={styles.hamburger}
            onClick={() => dispatch(toggleMenu())}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.mobileNavLink} ${activeLink === link.label ? styles.mobileNavLinkActive : ""}`}
              onClick={() => {
                dispatch(setActiveLink(link.label));
                dispatch(closeMenu());
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileCtas}>
            <button className={styles.btnSubscribe}>🔔 Subscribe Alerts</button>
            <Link href="/login" className={styles.btnLoginMobile}>Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
