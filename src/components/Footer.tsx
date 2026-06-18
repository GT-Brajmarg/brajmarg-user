"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const trustIconLabels = [
  "No Hidden Charges",
  "Clear Pricing",
  "Secure Payments",
  "Timely Updates",
  "Honest Communication",
  "Devotee First Upreach",
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
              Built on Transparency.<br />
              Devotion with Integrity.
            </h2>
            <p className={styles.trustBody}>
              Brajmarg is a private facilitation platform. We are not owned,
              operated, authorized or managed by any temple trust or authority.
              Our role is coordination and service facilitation only.
            </p>
            <Link href="/disclaimer" className={styles.disclaimerBtn}>
              Read Full Disclaimer &nbsp;→
            </Link>
          </div>

          {/* Vertical divider */}
          <div className={styles.vDivider} />

          {/* RIGHT: 6 icons row */}
          <div className={styles.trustRight}>
            <div className={styles.iconsRow}>
              <Image
                src="/images5/Frame 72.png"
                alt="Trust icons"
                width={600}
                height={80}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
            <div className={styles.labelsRow}>
              {trustIconLabels.map((label) => (
                <span key={label} className={styles.iconLabel}>{label}</span>
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

      {/* ══ PART 2: Bottom Footer (golden bar) ══ */}
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
                width={52}
                height={56}
                style={{ objectFit: "contain" }}
              />
              <Image
                src="/images5/Group 42.png"
                alt="Brajmarg"
                width={110}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <Image
              src="/images5/Connecting devotees with sacred temples across India through authentic sevas, prasadam and spiritual experiences..png"
              alt="Connecting devotees with sacred temples across India through authentic sevas, prasadam and spiritual experiences."
              width={270}
              height={56}
              style={{ objectFit: "contain", objectPosition: "left", marginTop: "10px" }}
            />
          </div>

          {/* Vertical divider */}
          <div className={styles.footerVDivider} />

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <div className={styles.linksBlock}>
              <h4 className={styles.linksTitle}>Quick Links</h4>
              <div className={styles.linksGrid}>
                <Link href="/" className={styles.linksItem}>Home</Link>
                <Link href="/services/seva" className={styles.linksItem}>Seva</Link>
                <Link href="/temples" className={styles.linksItem}>Temples</Link>
                <Link href="/services/yatra" className={styles.linksItem}>Yatra</Link>
                <Link href="/shop" className={styles.linksItem}>Shop</Link>
                <Link href="/about" className={styles.linksItem}>About Us</Link>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.footerVDivider} />

          {/* Column 3: Follow Us */}
          <div className={styles.socialCol}>
            <h4 className={styles.socialTitle}>Follow Us</h4>
            <div className={styles.socialIcons}>
              {/* Facebook */}
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className={styles.socialLink}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="21" stroke="#08545e" strokeWidth="1.5"/>
                  <path d="M24.5 15h-2.5a1.5 1.5 0 0 0-1.5 1.5v2.5h-2v3.5h2v8.5h3.5v-8.5h2.3l.7-3.5h-3v-1.5a.5.5 0 0 1 .5-.5h2.5V15Z" fill="#08545e"/>
                </svg>
              </Link>
              {/* X (Twitter) */}
              <Link href="https://x.com" target="_blank" aria-label="X" className={styles.socialLink}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="21" stroke="#08545e" strokeWidth="1.5"/>
                  <path d="M13 14h5.5l3.8 5.2L26.5 14H31l-7 8.5 7.5 8.5H26l-4.2-5.5L17 31h-4.5l7.3-8.5L13 14Z" fill="#08545e"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className={styles.socialLink}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="21" stroke="#08545e" strokeWidth="1.5"/>
                  <rect x="13" y="13" width="18" height="18" rx="5" stroke="#08545e" strokeWidth="1.5"/>
                  <circle cx="22" cy="22" r="4.5" stroke="#08545e" strokeWidth="1.5"/>
                  <circle cx="27.5" cy="16.5" r="1.2" fill="#08545e"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PART 3: Copyright bar ══ */}
      <div className={styles.copyrightBar}>
        <p className={styles.copyrightText}>© 2026 Brajmarg. Connecting Devotees.</p>
      </div>

    </footer>
  );
}
