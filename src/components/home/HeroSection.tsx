"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { tickCountdown } from "@/store/slices/heroSlice";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const darshan = useAppSelector((state) => state.hero.darshan);

  // Live countdown ticker
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tickCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className={styles.hero}>
      {/* Background temple image */}
      <Image
        src="/images2/image 53.png"
        alt="Temple background"
        fill
        className={styles.heroBg}
        priority
      />
      {/* Gradient overlay */}
      <div className={styles.heroOverlay} />

      <div className={styles.heroInner}>
        {/* ── Left: Heading + CTA ── */}
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Stay Connected to<br />
            Your Temple,<br />
            Wherever You Are.
          </h1>
          <p className={styles.heroSubtitle}>
            Receive temple prasad, book yatra services,<br />
            participate in seva and stay connected with<br />
            live temple updates.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/shop" className={styles.btnPrimary}>
              Receive Shop →
            </Link>
            <Link href="/yatra" className={styles.btnSecondary}>
              Book Yatra
            </Link>
          </div>
        </div>

        {/* ── Right: Live Darshan Card ── */}
        <div className={styles.darshaniCard}>
          {/* LIVE badge */}
          <div className={styles.liveBadgeRow}>
            <span className={styles.liveDot} />
            <span className={styles.liveBadgeText}>LIVE DARSHAN UPDATE</span>
          </div>

          <p className={styles.nextDarshanLabel}>Next Darshan —</p>
          <h2 className={styles.templeName}>{darshan.templeName}</h2>
          <p className={styles.templeLocation}>{darshan.location}</p>

          <p className={styles.countdownLabel}>{darshan.label}</p>

          {/* Countdown */}
          <div className={styles.countdown}>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(darshan.hours)}</span>
              <span className={styles.countLabel}>HOURS</span>
            </div>
            <span className={styles.countColon}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(darshan.minutes)}</span>
              <span className={styles.countLabel}>MINUTES</span>
            </div>
            <span className={styles.countColon}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(darshan.seconds)}</span>
              <span className={styles.countLabel}>SECONDS</span>
            </div>
          </div>

          <div className={styles.darshaniFooter}>
            <div className={styles.dateRow}>
              <span className={styles.calIcon}>📅</span>
              <span className={styles.dateText}>{darshan.date}</span>
            </div>
            <Link href="/darshan" className={styles.allTimingsLink}>
              View All Darshan Timings →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
