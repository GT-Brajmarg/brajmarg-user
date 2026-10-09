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
            <div className={`${styles.labelsRow} ${styles.desktopLabels}`}>
              {trustIconLabels.map((label) => (
                <span key={label} className={styles.iconLabel}>
                  {label}
                </span>
              ))}
            </div>

            <div
              className="grid grid-cols-2 gap-x-4 gap-y-3 px-6 text-center md:hidden"
              // style={{ marginTop: "2px" }}
            >
              {trustIconLabels.map((label) => (
                <span key={label} className="text-[11px] text-white">
                  {label}
                </span>
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
            style={{ objectFit: "fill" }}
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
              style={{
                objectFit: "contain",
                objectPosition: "left",
                marginTop: "10px",
              }}
            />
          </div>

          {/* Vertical divider */}
          <div className={styles.footerVDivider} />

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <div className={styles.linksBlock}>
              <h4 className={styles.linksTitle}>Quick Links</h4>
              <div className={styles.linksGrid}>
                <Link href="/" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>Home</span>
                </Link>

                <Link href="/services/seva" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>Seva</span>
                </Link>

                <Link href="/temples" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>Temples</span>
                </Link>

                <Link href="/services/yatra" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>Yatra</span>
                </Link>

                <Link href="/shop" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>Shop</span>
                </Link>

                <Link href="/about" className={styles.linksItem}>
                  <Image
                    src="/images/arrow-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.arrow}
                  />
                  <span>About Us</span>
                </Link>
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
              <Link
                href="https://www.facebook.com/share/18rkd8ebbH/"
                target="_blank"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <span className={styles.socialCircle}>
                  <Image
                    src="/images/facebook.svg" // or facebook.svg
                    alt="Facebook"
                    width={15}
                    height={15}
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
                    src="/images/x.svg" // or /images/x-logo.svg
                    alt="X"
                    width={20}
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
                    src="/images/instagram.svg" // or /images/instagram.svg
                    alt="Instagram"
                    width={20}
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
