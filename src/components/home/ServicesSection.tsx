"use client";

import Link from "next/link";
import styles from "./ServicesSection.module.css";

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  btnText: string;
  href: string;
  iconSrc: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Prasad",
    desc: "Receive blessed prasad from your chosen temple, offered to the deity and delivered to your home.",
    btnText: "Order Prasad",
    href: "/services/prasad",
    iconSrc: "/images3/image%2061.png",
  },
  {
    id: 2,
    title: "Seva",
    desc: "Book special sevas — Abhishek, Shringar, Bhog offering — at temples across Braj.",
    btnText: "Book Seva",
    href: "/services/seva",
    iconSrc: "/images3/image%2064.png",
  },
  {
    id: 3,
    title: "Frames",
    desc: "Premium deity frames and divine portraits crafted with devotion for your home altar.",
    btnText: "Shop Frames",
    href: "/services/frames",
    iconSrc: "/images3/image%2063.png",
  },
  {
    id: 4,
    title: "Poshak",
    desc: "Divine garments for deities, handcrafted by skilled artisans following ancient traditions.",
    btnText: "Shop Poshak",
    href: "/services/poshak",
    iconSrc: "/images3/image%2065.png",
  },
  {
    id: 5,
    title: "Puja & Havan",
    desc: "Online puja and havan services conducted by experienced priests with complete rituals.",
    btnText: "Explore Now",
    href: "/services/puja-havan",
    iconSrc: "/images3/image-Photoroom%20(13)%201.png",
  },
  {
    id: 6,
    title: "Yatra",
    desc: "Curated pilgrimage packages to the sacred Dham sites of Braj and across India.",
    btnText: "Book Yatra",
    href: "/services/yatra",
    iconSrc: "/images3/image%2062.png",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      {/* Background decoration: Flower vector on bottom left */}
      <div className={styles.bgDecoLeft}>
        <img
          src="/images4/image-Photoroom%20(11)%203.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Background decoration: Flower vector on bottom right */}
      <div className={styles.bgDecoRight}>
        <img
          src="/images4/image-Photoroom%20(11)%203.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div className={styles.inner}>
        {/* Title Row with Lotus Icons */}
        <div className={styles.titleRow}>
          {/* Left lotus */}
          <img
            src="/images3/image-Photoroom%20(10)%205.png"
            alt=""
            style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
          />

          <h2 className={styles.title}>
            Our Devotional Services
          </h2>

          {/* Right lotus (mirrored) */}
          <img
            src="/images3/image-Photoroom%20(10)%205.png"
            alt=""
            style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0, transform: "scaleX(-1)" }}
          />
        </div>

        {/* Subtitle — narrower max-width so it wraps to 2 lines */}
        <p className={styles.subtitle}>
          From prasad delivery to yatra packages — everything you need to stay connected with the divine.
        </p>

        {/* 6-Card Services Grid */}
        <div className={styles.grid}>
          {services.map((service) => (
            <div
              key={service.id}
              className={styles.card}
              style={{
                backgroundImage: 'url("/images3/Rectangle%2046.png")',
              }}
            >
              <div className={styles.cardContent}>
                {/* Icon wrapper */}
                <div className={styles.iconWrap}>
                  <img
                    src={service.iconSrc}
                    alt={service.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                {/* Service Card Title */}
                <h3 className={styles.cardTitle}>
                  {service.title}
                </h3>

                {/* Service Card Description */}
                <p className={styles.cardDesc}>
                  {service.desc}
                </p>
              </div>

              {/* Rounded pill CTA button — centered with horizontal margin */}
              <div className={styles.btnWrap}>
                <Link
                  href={service.href}
                  className={styles.btn}
                >
                  {service.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
