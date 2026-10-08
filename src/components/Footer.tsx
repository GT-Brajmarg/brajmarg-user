"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const trustItems = [
  {
    icon: "/images5/trust-1.png",
    alt: "No Hidden Charges",
    line1: "No Hidden",
    line2: "Charges",
  },
  {
    icon: "/images5/trust-2.png",
    alt: "Clear Pricing",
    line1: "Clear",
    line2: "Pricing",
  },
  {
    icon: "/images5/trust-3.png",
    alt: "Secure Payments",
    line1: "Secure",
    line2: "Payments",
  },
  {
    icon: "/images5/trust-4.png",
    alt: "Timely Updates",
    line1: "Timely",
    line2: "Updates",
  },
  {
    icon: "/images5/trust-5.png",
    alt: "Honest Communication",
    line1: "Honest",
    line2: "Communication",
  },
  {
    icon: "/images5/trust-6.png",
    alt: "Devotee First Upreach",
    line1: "Devotee First",
    line2: "Upreach",
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Yatra", href: "/services/yatra" },
  { label: "Temples", href: "/temples" },
  { label: "Seva", href: "/services/seva" },
  { label: "About Us", href: "/about" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ══ PART 1: Teal Trust Banner ══ */}
      <div className={styles.trustBanner}>
        <div className={styles.trustInner}>
          {/* LEFT: headline + body + button */}
          <div className={styles.trustLeft}>
            <h2 className={styles.trustHeading}>
              Built on Transparency.
              <br />
              Devotion with Integrity.
            </h2>
            <p className={styles.trustBody}>
              Brajmarg is a private facilitation platform. We are not owned,
              operated, authorized or managed by any temple trust or authority.
              Our role is coordination and service facilitation only.
            </p>
            <Link href="/disclaimer" className={styles.disclaimerBtn}>
              <span>Read Full Disclaimer</span>
              <span className={styles.disclaimerArrow}>→</span>
            </Link>
          </div>

          {/* Vertical divider */}
          <div className={styles.vDivider} />

          {/* RIGHT: 6 icons with centered labels */}
          <div className={styles.trustRight}>
            <div className={styles.trustGrid}>
              {trustItems.map((item, idx) => (
                <div key={idx} className={styles.trustItem}>
                  <div className={styles.trustIconWrap}>
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={76}
                      height={76}
                      className={styles.trustIconImg}
                    />
                  </div>
                  <div className={styles.trustLabel}>
                    <div>{item.line1}</div>
                    <div>{item.line2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Temple Skyline at bottom of teal section */}
        <div className={styles.skylineWrap}>
          <Image
            src="/images5/Group 27.png"
            alt="Sacred temple skyline"
            fill
            className={styles.skylineImg}
            sizes="100vw"
          />
        </div>
      </div>

      {/* ══ PART 2: Bottom Footer (golden parchment bar) ══ */}
      <div className={styles.bottomFooter}>
        {/* Background texture */}
        <div className={styles.bottomBg}>
          <Image
            src="/images5/Rectangle 55.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.bottomInner}>
          {/* Column 1: Logo + Tagline */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <Image
                src="/images5/image 67.png"
                alt="Brajmarg Elephant"
                width={64}
                height={76}
                style={{ objectFit: "contain", height: "auto" }}
              />
              <Image
                src="/images5/Group 42.png"
                alt="Brajmarg"
                width={130}
                height={43}
                style={{ objectFit: "contain", height: "auto" }}
              />
            </div>
            <div className={styles.taglineWrap}>
              <Image
                src="/images5/Connecting devotees with sacred temples across India through authentic sevas, prasadam and spiritual experiences..png"
                alt="Connecting devotees with sacred temples across India through authentic sevas, prasadam and spiritual experiences."
                width={420}
                height={40}
                style={{
                  objectFit: "contain",
                  objectPosition: "left",
                  width: "100%",
                  maxWidth: "420px",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.footerVDivider} />

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <div className={styles.linksGrid}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={styles.linksItem}
                >
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={16}
                    height={16}
                    className={styles.arrow}
                  />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.footerVDivider} />

          {/* Column 3: Follow Us */}
          <div className={styles.socialCol}>
            <h4 className={styles.socialTitle}>Follow Us</h4>
            <div className={styles.socialIcons}>
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/share/18rkd8ebbH/"
                target="_blank"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <span className={styles.socialCircle}>
                  <Image
                    src="/images/facebook.svg"
                    alt="Facebook"
                    width={16}
                    height={16}
                  />
                </span>
              </Link>
              {/* X (Twitter) */}
              <Link
                href="https://x.com/Brajmarg"
                target="_blank"
                aria-label="X"
                className={styles.socialLink}
              >
                <span className={styles.socialCircle}>
                  <Image
                    src="/images/x.svg"
                    alt="X"
                    width={18}
                    height={18}
                  />
                </span>
              </Link>
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/shreebrajmarg"
                target="_blank"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <span className={styles.socialCircle}>
                  <Image
                    src="/images/instagram.svg"
                    alt="Instagram"
                    width={18}
                    height={18}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PART 3: Copyright bar ══ */}
      <div className={styles.copyrightBar}>
        <p className={styles.copyrightText}>
          © 2026 Brajmarg. Connecting Devotees.
        </p>
      </div>
    </footer>
  );
}
