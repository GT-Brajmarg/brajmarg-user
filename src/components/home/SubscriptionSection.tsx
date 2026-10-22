"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./SubscriptionSection.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans } from "@/store/slices/subscriptionSlice";
import { setLoginModalOpen } from "@/store/slices/navSlice";

export default function SubscriptionSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { plans, loading } = useAppSelector((state) => state.subscriptions);

  const handleSubscribe = (planType: "monthly" | "yearly") => {
    const targetUrl = `/subscribe-alerts/temples?plan=${planType}`;
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("brajmarg_login_redirect", targetUrl);
        window.dispatchEvent(new Event("open_login_modal"));
      }
      dispatch(setLoginModalOpen(true));
      return;
    }

    router.push(targetUrl);
  };

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
          <h2 className={`${styles.title}`}>Never Miss a Festival Update</h2>
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
                    <span className={styles.featureTextMonthly}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleSubscribe("monthly")}
                className={styles.btnMonthly}
              >
                <span>{monthlyPlan.button_text}</span>
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M1 7H19M13 1L19 7L13 13"
                    stroke="#EFDEC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Yearly Card */}
          <div className={`${styles.card} ${styles.cardYearly}`}>
            {/* Best Value badge */}
            {yearlyPlan.badge_text && (
              <div className={styles.bestValueBadge}>
                {yearlyPlan.badge_text}
              </div>
            )}

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

                <span className={styles.period}>/month</span>
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
                    <span className={styles.featureTextYearly}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleSubscribe("yearly")}
                className={styles.btnYearly}
              >
                <span>{yearlyPlan.button_text}</span>
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M1 7H19M13 1L19 7L13 13"
                    stroke="#EFDEC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
