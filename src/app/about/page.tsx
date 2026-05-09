import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us · Brajmarg",
  description:
    "Brajmarg connects devotees with sacred temples across India — bringing prasad, seva sponsorships, frames and poshak to your doorstep.",
};

const STATS = [
  { value: "10+", label: "Sacred Temples" },
  { value: "50K+", label: "Devotees Served" },
  { value: "100+", label: "Sevas Performed" },
  { value: "99%", label: "Happy Devotees" },
];

const VALUES = [
  {
    title: "Authenticity",
    desc: "Every prasad is sanctified at the temple. Every seva is performed by an ordained priest. No shortcuts, ever.",
    icon: (
      <path d="M12 2l2.39 6.95H22l-6.2 4.5 2.39 6.95L12 16l-6.2 4.4 2.39-6.95L2 8.95h7.61z" />
    ),
  },
  {
    title: "Devotion",
    desc: "We are devotees first, builders second. Each feature is designed with the same care a priest brings to a morning aarti.",
    icon: (
      <path d="M12 21s-7-4.5-9-9.2C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.5 3.5 4 6.8C19 16.5 12 21 12 21z" />
    ),
  },
  {
    title: "Trust",
    desc: "Verified temples, transparent pricing, photo proof where temples permit, and refunds when we miss the mark.",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
    ),
  },
  {
    title: "Accessibility",
    desc: "Distance, age, mobility — none should keep a devotee from darshan. Brajmarg brings the temple to you.",
    icon: (
      <path d="M3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9zm9-5v6m-3-3h6" />
    ),
  },
];

const SERVICES = [
  {
    title: "Prasad Delivery",
    desc: "Sanctified offerings prepared at participating temples and shipped to your home — fresh, sealed, and blessed.",
  },
  {
    title: "Seva Sponsorship",
    desc: "Book poojas, aartis and abhishekams to be performed in your name on auspicious dates and festivals.",
  },
  {
    title: "Frames & Poshak",
    desc: "Devotional photo frames, deity clothing, and religious articles curated from each temple's tradition.",
  },
  {
    title: "Festival Alerts",
    desc: "Never miss a darshan — get personalised reminders for festivals, special timings, and rare events.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_25%_30%,#c41e1e_2px,transparent_2px),radial-gradient(circle_at_75%_70%,#c41e1e_2px,transparent_2px)] [background-size:48px_48px]" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            About Brajmarg
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-serif">
            Bringing the temple <span className="text-brand-red">home.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed">
            Brajmarg is a digital bridge between devotees and India&apos;s most
            sacred temples — a place where ancient devotion meets modern
            convenience.
          </p>
          <p className="mt-3 text-sm text-brand-red font-serif italic">
            ॥ श्री राधे राधे ॥
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-red mb-3">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif leading-tight">
              Every devotee deserves a path to the deity they love.
            </h2>
            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                For generations, the journey to a temple has meant long
                pilgrimages — often impossible for the elderly, the ailing, or
                devotees living far from home. Brajmarg was born to change
                that.
              </p>
              <p>
                We work directly with temple administrations to bring you
                consecrated prasad, perform sevas in your name, and deliver
                devotional articles touched by the rituals of each sacred
                place — all while preserving the authenticity of every
                tradition.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/10 via-amber-200/30 to-orange-100/40 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl bg-card-bg border border-amber-100 p-8 shadow-sm">
              <blockquote className="text-lg sm:text-xl text-gray-800 font-serif leading-relaxed">
                &ldquo;The deity does not live in stone. The deity lives where
                devotion lives. Our job is simply to carry that devotion
                across miles.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-gray-500">
                — The Brajmarg Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — red band */}
      <section className="bg-brand-red text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold font-serif">
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-white/85 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-red mb-3">
            What we offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
            Devotion, delivered with care.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl bg-card-bg border border-gray-200 p-6 hover:border-brand-red/40 hover:shadow-md transition-all"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-brand-red font-bold font-serif">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 font-serif group-hover:text-brand-red transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-header-bg border-y border-amber-200/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-red mb-3">
              Our values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
              The principles we serve by.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-card-bg p-6 border border-gray-200"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    {v.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 font-serif">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red to-brand-red-dark text-white p-10 sm:p-14">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1.5px,transparent_1.5px),radial-gradient(circle_at_80%_80%,white_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                Begin your journey of devotion.
              </h2>
              <p className="mt-2 text-white/85 max-w-xl">
                Explore temples, book your first seva, or reach out — we
                would love to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-white text-brand-red font-semibold px-6 py-3 hover:bg-amber-50 transition"
              >
                Explore Temples
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/30 text-white font-semibold px-6 py-3 hover:bg-white/20 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
