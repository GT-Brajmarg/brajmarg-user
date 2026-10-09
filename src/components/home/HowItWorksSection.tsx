"use client";

import Image from "next/image";
import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    id: 1,
    icon: "/images4/Group 33.png",
    textImg: "/images4/Group 37.png",
    title: "Choose Service",
  },
  {
    id: 2,
    icon: "/images4/Frame 53 (1).png",
    textImg: "/images4/Group 38.png",
    title: "We Coordinate",
    useCalendarIcon: true,
  },
  {
    id: 3,
    icon: "/images4/Group 35.png",
    textImg: "/images4/Group 39.png",
    title: "Proof & Updates",
  },
  {
    id: 4,
    icon: "/images4/Group (1).png",
    textImg: "/images4/Group 40.png",
    title: "Safe Delivery",
  },
];

export default function HowItWorksSection() {
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

      {/* Decorative border top */}
      <div className={styles.borderTop} />

      <div className={styles.inner}>
        {/* Title using image asset */}
        <div className={styles.titleRow}>
          <Image
            src="/images4/image-Photoroom (11) 3.png"
            alt="lotus"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/images4/How Brajmarg Works.png"
            alt="How Brajmarg Works"
            width={260}
            height={36}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/images4/image-Photoroom (11) 3.png"
            alt="lotus"
            width={40}
            height={40}
            style={{ objectFit: "contain", transform: "scaleX(-1)" }}
          />
        </div>

        {/* Use the complete pre-built graphic for desktop */}
        <div className={styles.fullGraphic}>
          <Image
            src="/images4/Group 41.png"
            alt="How Brajmarg Works — 4 steps"
            width={1000}
            height={200}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* Mobile fallback — individual steps */}
        <div className={styles.stepsRowMobile}>
          {steps.map((step, idx) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div className={styles.step}>
                <div className={styles.iconCircle}>
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={52}
                    height={52}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={styles.stepText}>
                  <Image
                    src={step.textImg}
                    alt={step.title}
                    width={150}
                    height={70}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={styles.arrow}>
                  <Image
                    src="/images4/Vector (1).png"
                    alt="→"
                    width={28}
                    height={18}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
