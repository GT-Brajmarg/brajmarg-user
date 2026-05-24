import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions · Brajmarg",
  description:
    "Terms and conditions governing the use of Brajmarg — temple services, prasad delivery, seva sponsorship and devotional commerce in India.",
};

const LAST_UPDATED = "10 April 2026";

const SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of terms" },
  { id: "eligibility", label: "2. Eligibility" },
  { id: "account", label: "3. Account & OTP login" },
  { id: "services", label: "4. Our services" },
  { id: "orders", label: "5. Orders & payments" },
  { id: "delivery", label: "6. Delivery" },
  { id: "cancellations", label: "7. Cancellations & refunds" },
  { id: "seva", label: "8. Seva sponsorships" },
  { id: "conduct", label: "9. User conduct" },
  { id: "ip", label: "10. Intellectual property" },
  { id: "disclaimer", label: "11. Disclaimer of warranties" },
  { id: "liability", label: "12. Limitation of liability" },
  { id: "indemnity", label: "13. Indemnity" },
  { id: "privacy", label: "14. Privacy" },
  { id: "changes", label: "15. Changes to these terms" },
  { id: "law", label: "16. Governing law & jurisdiction" },
  { id: "contact", label: "17. Contact us" },
];

export default function TermsPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-100 p-8 sm:p-12 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            Legal
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl">
            Please read these terms carefully before using Brajmarg. By
            creating an account or placing an order, you agree to be bound by
            them.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Last updated: <span className="font-semibold">{LAST_UPDATED}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          {/* Sticky table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="rounded-xl border border-gray-200 bg-card-bg p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">
                On this page
              </p>
              <ol className="space-y-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-sm text-gray-700 hover:text-brand-red hover:translate-x-0.5 transition-all"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Content */}
          <article className="space-y-10 max-w-3xl">
            <Section id="acceptance" title="1. Acceptance of terms">
              <p>
                These Terms &amp; Conditions (the &ldquo;<strong>Terms</strong>
                &rdquo;) constitute a legally binding agreement between you
                (&ldquo;<strong>you</strong>&rdquo;, the &ldquo;
                <strong>user</strong>&rdquo;, or &ldquo;
                <strong>devotee</strong>&rdquo;) and Brajmarg (&ldquo;
                <strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;,
                or &ldquo;<strong>our</strong>&rdquo;), governing your access
                to and use of the Brajmarg website, mobile applications and
                related services (collectively, the &ldquo;
                <strong>Platform</strong>&rdquo;).
              </p>
              <p>
                By creating an account, requesting a one-time password (OTP),
                placing an order or otherwise using the Platform, you confirm
                that you have read, understood and accepted these Terms in
                full. If you do not agree, please do not use the Platform.
              </p>
            </Section>

            <Section id="eligibility" title="2. Eligibility">
              <p>
                You must be at least 18 years of age and competent to enter
                into a contract under the Indian Contract Act, 1872 to use
                the Platform. By using Brajmarg you represent that you meet
                this requirement and that the information you provide is
                true, accurate and current.
              </p>
              <p>
                The Platform is currently intended for users located in
                India. We may, at our discretion, restrict access from other
                regions.
              </p>
            </Section>

            <Section id="account" title="3. Account & OTP login">
              <p>
                We use a passwordless one-time password (OTP) system. You
                may sign in using either an Indian mobile number (+91) or an
                email address. By requesting an OTP you consent to receive a
                verification code via SMS or email.
              </p>
              <p>
                Your account is created automatically upon successful
                verification of your first OTP. You are responsible for
                maintaining the confidentiality of your OTPs and for all
                activity that occurs through your account.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that
                show signs of fraudulent behaviour, abuse or violation of
                these Terms.
              </p>
            </Section>

            <Section id="services" title="4. Our services">
              <p>Brajmarg connects devotees with sacred temples by offering:</p>
              <ul>
                <li>
                  <strong>Prasad delivery</strong> — sanctified food items
                  prepared at participating temples and shipped to your home.
                </li>
                <li>
                  <strong>Seva sponsorship</strong> — booking of poojas, aartis
                  and other rituals to be performed on your behalf by temple
                  priests.
                </li>
                <li>
                  <strong>Frames and poshak</strong> — devotional photo frames,
                  deity clothing and related religious articles.
                </li>
                <li>
                  <strong>Temple information</strong> — darshan timings,
                  festival schedules and event alerts.
                </li>
              </ul>
              <p>
                Availability of products and sevas depends on each temple
                and may change without prior notice.
              </p>
            </Section>

            <Section id="orders" title="5. Orders & payments">
              <p>
                When you place an order, the contract of sale is formed only
                upon our acceptance and confirmation. We reserve the right to
                refuse or cancel any order at our sole discretion, including
                cases of stock unavailability, pricing errors, suspected
                fraud or restrictions on the delivery location.
              </p>
              <p>
                All prices are listed in Indian Rupees (₹) and are inclusive
                of applicable taxes unless stated otherwise. Payment may be
                made through the methods we make available from time to time
                (such as cash on delivery, UPI, debit / credit card or net
                banking).
              </p>
            </Section>

            <Section id="delivery" title="6. Delivery">
              <p>
                We offer free standard delivery within India for all orders.
                Delivery timelines are estimates and depend on the
                originating temple, shipping address, festival schedules and
                courier availability. Brajmarg is not liable for delays
                caused by force majeure events, courier disruptions or
                incorrect address details supplied by you.
              </p>
              <p>
                Risk and title in the goods pass to you on delivery to the
                address provided at checkout.
              </p>
            </Section>

            <Section id="cancellations" title="7. Cancellations & refunds">
              <p className="font-semibold text-gray-900">
                Cancellation &amp; Refund Policy
              </p>
              <ul>
                <li>
                  <strong>Free Cancellation:</strong> up to 24 hours before
                  pickup time.
                </li>
                <li>
                  <strong>50% Refund:</strong> 12&ndash;24 hours before pickup
                  time.
                </li>
                <li>
                  <strong>No Refund:</strong> less than 12 hours before pickup
                  time, or in case of a no-show.
                </li>
                <li>
                  <strong>Refund Processing:</strong> approved refunds are
                  processed within 5&ndash;7 business days to the original
                  payment method.
                </li>
              </ul>
              <p>
                You can request a cancellation from{" "}
                <Link href="/account/orders">My Orders</Link>. The applicable
                refund tier is determined automatically from the time remaining
                until pickup. For orders paid online, the approved refund is
                returned to your original payment method; Cash-on-Delivery
                orders have nothing to refund unless already collected.
              </p>
              <p>
                Because prasad and seva offerings are consecrated items, we do
                not accept returns once the order has been delivered or the
                seva completed. Beyond the pickup-time tiers above, refunds are
                otherwise processed only for damaged items, shipping errors or
                sevas that we were unable to perform.
              </p>
            </Section>

            <Section id="seva" title="8. Seva sponsorships">
              <p>
                Seva sponsorships are religious offerings carried out by
                temple priests on your behalf. Brajmarg acts solely as a
                facilitator between you and the temple. The exact ritual
                date and timing are determined by the temple and the
                <em>panchang</em> and may differ from your booking date.
              </p>
              <p>
                Photographs, audio or video proof of a seva is provided only
                where the temple expressly permits it and cannot be
                guaranteed.
              </p>
            </Section>

            <Section id="conduct" title="9. User conduct">
              <p>You agree not to use the Platform to:</p>
              <ul>
                <li>
                  Upload, post or transmit any content that is unlawful,
                  obscene, defamatory, hateful or offensive to religious
                  sentiments.
                </li>
                <li>
                  Impersonate any person, misuse another devotee&apos;s
                  account or interfere with another user&apos;s access.
                </li>
                <li>
                  Attempt to gain unauthorised access to the Platform, its
                  servers, databases or related systems.
                </li>
                <li>
                  Use any automated means (bots, scrapers, crawlers) to
                  collect data without our prior written consent.
                </li>
                <li>
                  Resell or commercially exploit the products purchased
                  from Brajmarg.
                </li>
              </ul>
            </Section>

            <Section id="ip" title="10. Intellectual property">
              <p>
                All content on the Platform — including the Brajmarg name,
                logo, illustrations, photographs, written copy, layouts,
                trademarks and any associated software — is owned by us or
                licensed to us. You may not copy, reproduce, modify,
                distribute or create derivative works without our prior
                written permission.
              </p>
            </Section>

            <Section id="disclaimer" title="11. Disclaimer of warranties">
              <p>
                The Platform and all products and services made available
                through it are provided on an &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; basis. To the maximum extent
                permitted by law, we disclaim all warranties of any kind,
                whether express or implied, including warranties of
                merchantability, fitness for a particular purpose and
                non-infringement.
              </p>
            </Section>

            <Section id="liability" title="12. Limitation of liability">
              <p>
                In no event will Brajmarg, its directors, employees or
                affiliates be liable for any indirect, incidental, special,
                consequential or punitive damages arising out of or related
                to your use of the Platform. Our total aggregate liability to
                you for any claim arising under these Terms shall not exceed
                the amount paid by you to Brajmarg for the specific order
                giving rise to the claim.
              </p>
            </Section>

            <Section id="indemnity" title="13. Indemnity">
              <p>
                You agree to indemnify and hold harmless Brajmarg, its
                affiliates, officers and employees from and against any
                claims, liabilities, damages, losses and expenses (including
                reasonable legal fees) arising out of your breach of these
                Terms or your misuse of the Platform.
              </p>
            </Section>

            <Section id="privacy" title="14. Privacy">
              <p>
                Our handling of your personal information is governed by
                our Privacy Policy. By using the Platform you consent to the
                collection and use of your information as described therein.
              </p>
            </Section>

            <Section id="changes" title="15. Changes to these terms">
              <p>
                We may revise these Terms from time to time. The updated
                version will be posted on this page with a new
                &ldquo;Last updated&rdquo; date. Your continued use of the
                Platform after such changes constitutes acceptance of the
                revised Terms.
              </p>
            </Section>

            <Section id="law" title="16. Governing law & jurisdiction">
              <p>
                These Terms shall be governed by and construed in
                accordance with the laws of India. Any dispute arising out
                of or in connection with these Terms or the Platform shall
                be subject to the exclusive jurisdiction of the courts at
                Vrindavan, Uttar Pradesh.
              </p>
            </Section>

            <Section id="contact" title="17. Contact us">
              <p>
                If you have questions or concerns about these Terms or about
                Brajmarg, please reach out to us at{" "}
                <a
                  href="mailto:support@brajmarg.com"
                  className="text-brand-red font-semibold hover:underline"
                >
                  support@brajmarg.com
                </a>
                . We will do our best to respond promptly.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                ॥ श्री राधे राधे ॥
              </p>
            </Section>

            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline"
              >
                ← Back to login
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-gray-700 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-brand-red [&_a]:underline">
        {children}
      </div>
    </section>
  );
}
