import type { Metadata } from "next";
import Link from "next/link";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";

export const metadata: Metadata = {
  title: "Terms of Use | Brajmarg - Sacred Devotional Services",
  description:
    "Review the Terms of Use and devotional service guidelines for Brajmarg. Transparent policies governing temple sevas, holy prasad, and yatra pilgrimage facilitation.",
};

export default function TermsOfUsePage() {
  const appName = "Brajmarg";
  const appFullName = "Brajmarg Devotional Services";
  const contactEmail = "support@brajmarg.com";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance & Service Scope",
      content: [
        `These Terms of Use govern your access to ${appFullName} (${appName}). By booking a seva, ordering holy prasad, registering for a pilgrimage yatra, or using our platform, you agree to these Terms and our Privacy Policy.`,
        `Brajmarg provides a spiritual facilitation bridge that allows devotees in India and worldwide to connect with sacred shrines, participate in authentic Vedic rituals remotely, and receive sanctified temple offerings at home.`,
      ],
    },
    {
      id: "facilitation-role",
      title: "2. Independent Facilitation Platform",
      content: [
        `Brajmarg is an independent devotional facilitation platform. We are not owned, operated, or managed by any temple trust, Devasthanam board, or government religious committee unless explicitly stated.`,
        `Our role is coordination and service facilitation: we work directly with verified local sevayats (pujaris) and trusted coordinators to perform rituals strictly according to Vedic traditions on your behalf.`,
        `All devotional offerings and divine darshans are matters of personal faith. While we ensure authentic facilitation with utmost devotion and purity, Brajmarg does not guarantee specific metaphysical outcomes.`,
      ],
    },
    {
      id: "sevas-prasad-yatra",
      title: "3. Sevas, Holy Prasad & Yatras",
      content: [
        `Sevas & Sankalp: Rituals are performed according to auspicious tithi schedules and temple customs. Proof of seva (photos, sanctified videos, or blessings) is shared digitally via your registered email or WhatsApp.`,
        `Holy Prasad Delivery: Blessed prasad is sourced directly from consecrated temple premises and dispatched in sealed, hygienic packaging via reputable national couriers.`,
        `Pilgrimage Yatras: Yatra schedules, verified accommodations, and transportation are arranged with devotion. Devotees agree to adhere to group reporting times and sacred temple guidelines.`,
      ],
    },
    {
      id: "pricing-cancellation",
      title: "4. Transparent Pricing & Refunds",
      content: [
        `No Hidden Charges: All costs — including priest dakshina, puja samagri, packaging, platform coordination, and courier delivery — are clearly itemized before checkout.`,
        `Cancellations & Rescheduling: Seva bookings can be cancelled or rescheduled up to 24 hours prior to the scheduled ritual. Once priest dakshina and materials are allocated or ceremonies initiated, cancellations cannot be processed.`,
        `Prasad Orders: Due to the consecrated and perishable nature of holy prasad, returns are not accepted after dispatch. If prasad arrives damaged, please report it within 24 hours for immediate resolution.`,
      ],
    },
    {
      id: "devotee-conduct",
      title: "5. Devotee Conduct & Sacred Etiquette",
      content: [
        `Devotees are requested to maintain reverence and harmony. You agree to provide accurate devotee names, gotra, and delivery addresses for sacred sankalps.`,
        `Misuse of the platform, fraudulent payments, offensive remarks toward deities or communities, or attempting to compromise platform security is strictly prohibited.`,
      ],
    },
    {
      id: "liability-support",
      title: "6. Liability, Jurisdiction & Support",
      content: [
        `Brajmarg acts with integrity and diligence. We are not liable for unforeseen temple closures, VIP curfews, or administrative protocol changes mandated by local authorities.`,
        `These Terms are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Mathura / Uttar Pradesh, India.`,
        `Our Devotee Care desk is always available to assist you with warmth and devotion. Reach us anytime at ${contactEmail} (Monday to Saturday, 9:00 AM – 7:00 PM IST).`,
      ],
    },
  ];

  return (
    <>
      <main className="legal-page-root">
        {/* ── HERO ── */}
        <div className="legal-hero">
          <Link
            href="/"
            className="legal-back-btn"
            id="terms-back-home-btn"
            aria-label="Back to Home"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className="legal-hero-inner">
            <h1 className="legal-hero-title">Terms of Use</h1>
            <p className="legal-hero-subtitle">
              Clear, transparent, and respectful guidelines for using {appName} —
              connecting devotees with sacred temples, authentic sevas, and holy
              prasadam.
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          className="legal-body"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <LegalTableOfContents
            sections={sections.map((s) => ({ id: s.id, title: s.title }))}
          />

          <article className="legal-content">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
              >
                <h2 className="legal-section-title">{section.title}</h2>
                <div className="legal-section-body">
                  {section.content.map((para, i) => (
                    <p key={i} className="legal-para">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="legal-footer-note">
              <p>
                Have questions regarding our Terms of Use? Reach out anytime to our
                Devotee Care desk at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="legal-email-link"
                >
                  {contactEmail}
                </a>
                .
              </p>
            </div>
          </article>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{ __html: BRAJMARG_LEGAL_STYLES }} />
    </>
  );
}

const BRAJMARG_LEGAL_STYLES = `
  /* ─── Reset & Root (Brajmarg Standard Theme) ───────────────────────── */
  .legal-page-root {
    min-height: 100vh;
    background: #FAF5ED;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(214,171,93,0.06), transparent 35%),
      radial-gradient(circle at 90% 80%, rgba(11,105,113,0.04), transparent 40%),
      url('/images/paper-texture.png');
    background-size: cover;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #3D2E1E;
    width: 100%;
    position: relative;
  }

  /* ─── Hero Section ──────────────────────────────────────────────────── */
  .legal-hero {
    background: linear-gradient(135deg, #053338 0%, #0B6971 52%, #147A83 100%);
    padding: clamp(68px, 8vw, 88px) 20px clamp(36px, 5vw, 56px);
    text-align: center;
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid #E6D3B5;
  }
  .legal-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(217,169,94,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(5,51,56,0.6) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Back button */
  .legal-back-btn {
    position: absolute;
    top: 20px;
    left: clamp(16px, 4vw, 48px);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #F7EAD5;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(230, 211, 181, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 24px;
    padding: 7px 16px 7px 10px;
    transition: all 0.2s ease;
    z-index: 20;
  }
  .legal-back-btn:hover {
    background: rgba(255, 255, 255, 0.22);
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateX(-2px);
  }

  /* Hero inner content */
  .legal-hero-inner {
    position: relative;
    max-width: 760px;
    margin: 0 auto;
    z-index: 10;
  }

  .legal-hero-title {
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 12px 0;
    line-height: 1.15;
    letter-spacing: -0.02em;
    font-family: Georgia, 'Cormorant Garamond', serif;
  }
  .legal-hero-subtitle {
    font-size: clamp(14px, 2.2vw, 16px);
    line-height: 1.6;
    color: #EFDEC7;
    margin: 0 auto;
    max-width: 620px;
  }

  /* ─── Body Layout ───────────────────────────────────────────────────── */
  .legal-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 44px 24px 80px;
    display: flex;
    gap: 36px;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  /* ─── Sticky Table of Contents ──────────────────────────────────────── */
  .legal-toc {
    width: 290px;
    flex-shrink: 0;
    position: -webkit-sticky;
    position: sticky;
    top: 96px;
    z-index: 20;
    align-self: flex-start;
  }
  .legal-toc-card {
    background: #FFFFFF;
    border: 1px solid #E6D3B5;
    border-radius: 16px;
    padding: 20px 16px;
    box-shadow: 0 4px 20px rgba(95, 78, 59, 0.06);
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }
  .legal-toc-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0B6971;
    margin: 0 0 12px 0;
    padding-bottom: 10px;
    border-bottom: 1.5px solid #F2E4D0;
  }
  .legal-toc-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
  }
  .legal-toc-item { list-style: none; }
  .legal-toc-link {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.4;
    color: #6C5A45;
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 12px;
    border-radius: 8px;
    border-left: 3px solid transparent;
  }
  .legal-toc-link:hover {
    color: #0B6971;
    background: #F7EFE3;
    border-left-color: rgba(11, 105, 113, 0.35);
  }
  .legal-toc-link--active {
    color: #0B6971 !important;
    font-weight: 700;
    background: #EAF5F6 !important;
    border-left: 3px solid #0B6971 !important;
  }
  .legal-toc-text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .legal-toc-pointer {
    flex-shrink: 0;
    color: #0B6971;
    display: inline-flex;
    align-items: center;
    margin-left: 6px;
    font-weight: 700;
  }

  /* ─── Article Content ───────────────────────────────────────────────── */
  .legal-content {
    flex: 1;
    min-width: 0;
    width: 100%;
  }
  .legal-section {
    background: #FFFFFF;
    border: 1px solid #E6D3B5;
    border-radius: 18px;
    padding: 28px 32px;
    margin-bottom: 18px;
    transition: box-shadow 0.22s ease, border-color 0.22s ease;
    scroll-margin-top: 100px;
    box-shadow: 0 2px 12px rgba(95, 78, 59, 0.04);
  }
  .legal-section:hover {
    box-shadow: 0 8px 26px rgba(11, 105, 113, 0.08);
    border-color: #D4A359;
  }
  .legal-section:last-of-type {
    margin-bottom: 24px;
  }
  .legal-section-title {
    font-size: clamp(17px, 2.5vw, 20px);
    font-weight: 700;
    color: #0B6971;
    margin: 0 0 14px 0;
    padding-bottom: 12px;
    border-bottom: 1.5px solid #F0E2CE;
    line-height: 1.35;
    font-family: Georgia, 'Cormorant Garamond', serif;
  }
  .legal-section-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .legal-para {
    margin: 0;
    font-size: clamp(13.5px, 2.2vw, 14.5px);
    line-height: 1.75;
    color: #4A3E31;
    word-break: break-word;
  }

  /* ─── Footer Note ───────────────────────────────────────────────────── */
  .legal-footer-note {
    background: #F7EEDB;
    border: 1px solid #E2D1B7;
    border-radius: 14px;
    padding: 20px 26px;
    margin-top: 8px;
    text-align: center;
  }
  .legal-footer-note p {
    margin: 0;
    font-size: 14px;
    color: #4B3B2B;
    line-height: 1.6;
  }
  .legal-email-link {
    color: #0B6971;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.18s ease;
  }
  .legal-email-link:hover { color: #074C52; }



  /* ─── Responsive ────────────────────────────────────────────────────── */
  @media (max-width: 1023px) {
    .legal-body {
      padding: 28px 18px 60px;
      display: block;
    }
    .legal-toc {
      display: none !important;
    }
    .legal-section {
      padding: 22px 20px;
      border-radius: 14px;
      margin-bottom: 14px;
    }
    .legal-footer-note {
      padding: 16px 18px;
    }
  }
  @media (max-width: 640px) {
    .legal-hero {
      padding: 68px 16px 32px;
    }
    .legal-back-btn {
      top: 14px;
      left: 12px;
      font-size: 12px;
      padding: 6px 12px 6px 8px;
    }
    .legal-section {
      padding: 18px 15px;
    }
  }
`;
