"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SubscriptionSection.module.css";

const monthlyFeatures = [
  "Festival & Ekadashi reminders",
  "Temple darshan timing alerts",
  "WhatsApp notifications",
  "Upcoming events calendar",
  "Weekly prasad availability alerts",
  "Priority customer support",
];

const yearlyFeatures = [
  "Everything in Monthly Plan",
  "Live darshan notifications",
  "Exclusive festival updates",
  "Early access to seva bookings",
  "Exclusive yatra discounts (10%)",
  "Birthday & anniversary puja reminders",
  "Priority WhatsApp support",
  "Exclusive member prasad boxes",
];

export default function SubscriptionSection() {
  return (
    <section className={styles.section}>
      {/* Parchment background */}
      <div className={styles.sectionBg}>
        <Image
          src="/images4/image 66.png"
          alt=""
          fill
          className={styles.bgTexture}
          priority
        />
      </div>

      <div className={styles.inner}>
        {/* Section Title */}
        <div className={styles.titleRow}>
          <Image
            src="/images4/image-Photoroom (11) 3.png"
            alt="lotus"
            width={48}
            height={48}
            style={{ objectFit: "contain" }}
          />
          <h2 className={styles.title}>Never Miss a Festival Update</h2>
          <Image
            src="/images4/image-Photoroom (11) 3.png"
            alt="lotus"
            width={48}
            height={48}
            style={{ objectFit: "contain", transform: "scaleX(-1)" }}
          />
        </div>
        <p className={styles.subtitle}>
          Get timely reminders, darshan updates and special announcements
        </p>

        {/* Pricing Cards */}
        <div className={styles.cardsRow}>
          {/* Monthly Card */}
          <div className={styles.card}>
            {/* Card background */}
            <div className={styles.cardBg}>
              <Image
                src="/images4/Rectangle 52.png"
                alt=""
                fill
                style={{ objectFit: "fill" }}
              />
            </div>

            <div className={styles.cardContent}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <Image
                  src="/images4/Frame 53.png"
                  alt="Monthly Alerts"
                  width={180}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Price */}
              <div className={styles.priceRow}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>99</span>
                <span className={styles.period}>/month</span>
              </div>

              {/* Features */}
              <ul className={styles.featureList}>
                {monthlyFeatures.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <Image
                      src="/images4/iconstack.io - (Ticktick).png"
                      alt="✓"
                      width={16}
                      height={16}
                      className={styles.tickIcon}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/subscribe?plan=monthly" className={styles.btnMonthly}>
                Subscribe Monthly →
              </Link>
            </div>
          </div>

          {/* Yearly Card */}
          <div className={`${styles.card} ${styles.cardYearly}`}>
            {/* Best Value badge */}
            <div className={styles.bestValueBadge}>
              <Image
                src="/images4/Best Value.png"
                alt="Best Value"
                width={90}
                height={22}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Card background */}
            <div className={styles.cardBg}>
              <Image
                src="/images4/Rectangle 53.png"
                alt=""
                fill
                style={{ objectFit: "fill" }}
              />
            </div>

            <div className={styles.cardContent}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <Image
                  src="/images4/Frame 61.png"
                  alt="Yearly Alerts"
                  width={160}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Price */}
              <div className={styles.priceRow}>
                <span className={`${styles.currency} ${styles.currencyGold}`}>₹</span>
                <span className={`${styles.price} ${styles.priceGold}`}>799</span>
                <span className={`${styles.period} ${styles.periodGold}`}>/month</span>
                <span className={styles.saveBadge}>Save 43%</span>
              </div>

              {/* Features */}
              <ul className={styles.featureList}>
                {yearlyFeatures.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <Image
                      src="/images4/iconstack.io - (Ticktick) (1).png"
                      alt="✓"
                      width={16}
                      height={16}
                      className={styles.tickIconGold}
                      style={{ objectFit: "contain" }}
                    />
                    <span className={styles.featureTextGold}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/subscribe?plan=yearly" className={styles.btnYearly}>
                Subscribe Yearly →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
