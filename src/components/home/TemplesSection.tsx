"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import styles from "./TemplesSection.module.css";

export default function TemplesSection() {
  const temples = useAppSelector((state) => state.temples.temples);

  return (
    <section className={styles.section}>
      {/* ── Cream parchment background (like navbar) ── */}
      <div className={styles.sectionBg}>
        <Image
          src="/images/image 9.png"
          alt=""
          fill
          className={styles.parchmentTexture}
          priority
        />
      </div>

      <div className={styles.inner}>
        {/* ── Section Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.titleRow}>
              <Image src="/images/lotus 2.png" alt="" width={36} height={14} />
              <h2 className={styles.title}>Explore Sacred Temples</h2>
              <Image src="/images/lotus 2.png" alt="" width={36} height={14} />
            </div>
            <p className={styles.subtitle}>
              Search and discover temples across India
            </p>
          </div>
          <Link href="/temples" className={styles.viewAllBtn}>
            View All Temples →
          </Link>
        </div>

        {/* ── Temple Cards Grid ── */}
        <div className={styles.grid}>
          {temples.map((temple) => (
            <div key={temple.id} className={styles.card}>
              {/* ── Scroll Frame Overlay wrapping the entire card ── */}
              <div className={styles.frameOverlay}>
                <Image
                  src="/images2/image 45.png"
                  alt=""
                  fill
                  style={{ objectFit: "fill" }}
                  priority
                />
              </div>

              {/* ── Card Inner Content ── */}
              <div className={styles.cardContent}>
                {/* Image Area with Arch mask */}
                <div className={styles.imageArea}>
                  {/* Status badge */}
                  <span
                    className={`${styles.badge} ${
                      temple.status === "LIVE" ? styles.badgeLive : styles.badgeSoon
                    }`}
                  >
                    {temple.status === "LIVE" && (
                      <span className={styles.badgeDot} />
                    )}
                    {temple.status}
                  </span>

                  <div className={styles.archMask}>
                    <Image
                      src={temple.image}
                      alt={temple.name}
                      fill
                      className={styles.templePhoto}
                    />
                  </div>
                </div>

                {/* Card Body text and CTA */}
                <div className={styles.cardBody}>
                  <h3 className={styles.templeName}>{temple.name}</h3>
                  
                  <div className={styles.locationRow}>
                    <svg className="w-3.5 h-3.5 text-[#c8860a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" style={{ width: '12px', height: '12px', color: '#c8860a' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className={styles.templeLocation}>{temple.location}</span>
                  </div>

                  <Link href={temple.href} className={styles.visitBtn}>
                    Visit Temple
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
