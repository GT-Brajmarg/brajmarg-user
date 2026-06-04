import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us · Brajmarg",
  description:
    "Get in touch with Brajmarg — we're here to help with orders, sevas, temple partnerships and more.",
};

const CONTACT_INFO = [
  {
    title: "Call us",
    primary: "+91 98765 43210",
    secondary: "Mon–Sat · 9 AM to 7 PM IST",
    href: "tel:+919876543210",
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.66 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0122 16.92z" />
    ),
  },
  {
    title: "Email us",
    primary: "support@brajmarg.com",
    secondary: "We reply within 24 hours",
    href: "mailto:support@brajmarg.com",
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    title: "Visit us",
    primary: "Nathdwara, Rajasthan",
    secondary: "India · 313301",
    href: "https://maps.google.com/?q=Nathdwara,+Rajasthan",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: "Live chat",
    primary: "Chat with our team",
    secondary: "Available during business hours",
    href: "#",
    icon: (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    ),
  },
];

const FAQS = [
  {
    q: "How long until I receive a response?",
    a: "Our team replies within 24 hours on working days. Urgent order issues are usually resolved the same day.",
  },
  {
    q: "Can I track my prasad order?",
    a: "Yes — once dispatched, a tracking link is sent to your registered phone and email.",
  },
  {
    q: "How do I partner my temple with Brajmarg?",
    a: "Choose the “Temple partnership” subject in the form and our outreach team will get in touch.",
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Hero on red banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-red to-brand-red-dark text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_15%_25%,white_1.5px,transparent_1.5px),radial-gradient(circle_at_85%_75%,white_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-32 sm:pb-40">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              Get in touch
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              We&apos;d love to hear <br className="hidden sm:block" />
              from you.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
              Questions about an order, a seva, or a temple partnership? Send
              us a message and our team will respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Floating card overlapping the red banner */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 lg:gap-8">
          {/* Info column */}
          <aside className="rounded-2xl bg-card-bg border border-gray-100 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              Reach us directly
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Pick the channel that suits you best — we&apos;re always close at
              hand.
            </p>

            <ul className="mt-6 space-y-4">
              {CONTACT_INFO.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-4 rounded-xl p-3 -mx-3 hover:bg-red-50/60 transition-colors"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white group-hover:bg-brand-red-dark transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        {item.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-gray-900 group-hover:text-brand-red transition-colors break-words">
                        {item.primary}
                      </p>
                      <p className="text-xs text-gray-500">{item.secondary}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl bg-gradient-to-br from-amber-50 to-red-50 border border-amber-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">
                Office hours
              </p>
              <p className="mt-2 text-sm text-gray-700">
                Mon – Sat · <span className="font-semibold">9 AM – 7 PM IST</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Closed on Sundays and major festivals.
              </p>
            </div>
          </aside>

          {/* Form column */}
          <div className="rounded-2xl bg-card-bg border border-gray-100 p-6 sm:p-10 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill out the form below and we&apos;ll get back to you shortly.
                <span className="text-brand-red"> *</span> indicates required
                fields.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-red mb-3">
            Frequently asked
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
            Before you write to us…
          </h2>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl bg-card-bg border border-gray-200 p-5 open:border-brand-red/40 open:shadow-sm transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                  {f.q}
                </span>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red transition-transform group-open:rotate-45">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
