"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SubscriptionSection.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans } from "@/store/slices/subscriptionSlice";

export default function SubscriptionSection() {
  const dispatch = useAppDispatch();

  const { plans, loading } = useAppSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const monthlyPlan = plans.find((plan) => plan.plan_type === "monthly");

  const yearlyPlan = plans.find((plan) => plan.plan_type === "yearly");

  if (loading || !monthlyPlan || !yearlyPlan) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>Loading subscription plans...</div>
      </section>
    );
  }
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
                <span className={styles.price}>{monthlyPlan.price}</span>
                <span className={styles.period}>/month</span>
              </div>

              {/* Features */}
              <ul className={styles.featureList}>
                {monthlyPlan.features.map((f: string) => (
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
              <Link
                href="/subscribe?plan=monthly"
                className={styles.btnMonthly}
              >
                {monthlyPlan.button_text} →
              </Link>
            </div>
          </div>

          {/* Yearly Card */}
          <div className={`${styles.card} ${styles.cardYearly}`}>
            {/* Best Value badge */}
            <div className={styles.bestValueBadge}>
              {yearlyPlan.badge_text && (
                <div className={styles.bestValueBadge}>
                  <span>{yearlyPlan.badge_text}</span>
                </div>
              )}
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
                <span className={`${styles.currency} ${styles.currencyGold}`}>
                  ₹
                </span>
                <span className={`${styles.price} ${styles.priceGold}`}>
                  {yearlyPlan.price}
                </span>
                <span className={`${styles.period} ${styles.periodGold}`}>
                  /month
                </span>
                <span className={styles.saveBadge}>
                  {yearlyPlan.savings_text}
                </span>
              </div>

              {/* Features */}
              <ul className={styles.featureList}>
                {yearlyPlan.features.map((f: string) => (
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
                {yearlyPlan.button_text} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
