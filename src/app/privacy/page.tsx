import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · Brajmarg",
  description:
    "How Brajmarg collects, uses, shares and protects your personal information when you use our temple darshan, prasad delivery, seva sponsorship and yatra services.",
};

const LAST_UPDATED = "26 May 2026";

const SECTIONS = [
  { id: "intro", label: "1. Introduction" },
  { id: "information", label: "2. Information we collect" },
  { id: "how-we-use", label: "3. How we use your information" },
  { id: "sharing", label: "4. Who we share information with" },
  { id: "cookies", label: "5. Cookies & local storage" },
  { id: "security", label: "6. How we protect your information" },
  { id: "retention", label: "7. How long we keep your information" },
  { id: "rights", label: "8. Your rights & choices" },
  { id: "children", label: "9. Children" },
  { id: "third-party-links", label: "10. Third-party links" },
  { id: "changes", label: "11. Changes to this policy" },
  { id: "grievance", label: "12. Grievance officer & contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-100 p-8 sm:p-12 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            Legal
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl">
            This policy explains what information Brajmarg collects, why we
            collect it, who we share it with, and the choices you have. We aim
            to collect only what we need to provide our services.
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
            <Section id="intro" title="1. Introduction">
              <p>
                Brajmarg (&ldquo;<strong>Brajmarg</strong>&rdquo;, &ldquo;
                <strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;
                or &ldquo;<strong>our</strong>&rdquo;) operates the Brajmarg
                website and related services (the &ldquo;
                <strong>Platform</strong>&rdquo;), through which users (&ldquo;
                <strong>you</strong>&rdquo; or &ldquo;
                <strong>devotee</strong>&rdquo;) can view temple darshan
                timings, order prasad, sponsor seva, purchase devotional frames
                and poshak, and book yatra packages.
              </p>
              <p>
                This Privacy Policy applies to personal information processed
                by us in connection with the Platform. It is published in
                accordance with the Digital Personal Data Protection Act, 2023
                (DPDPA), the Information Technology Act, 2000 and the
                Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011 of India.
              </p>
              <p>
                By using the Platform you consent to the practices described
                in this policy. If you do not agree, please do not use the
                Platform.
              </p>
            </Section>

            <Section id="information" title="2. Information we collect">
              <p>
                We collect only the information we need to operate our
                services. Specifically:
              </p>

              <p>
                <strong>Information you give us directly</strong>
              </p>
              <ul>
                <li>
                  <strong>Account &amp; login:</strong> your Indian mobile
                  number (in +91 format) or email address, which we use to
                  send a one-time password (OTP) and create your account.
                </li>
                <li>
                  <strong>Profile:</strong> full name, email, phone, date of
                  birth (optional), and your saved address (line 1, line 2,
                  city, state and pincode) used to pre-fill checkout.
                </li>
                <li>
                  <strong>Order &amp; booking details:</strong> the items in
                  your cart, your shipping address, contact details for the
                  order, payment method (Cash on Delivery or online via
                  Razorpay), and any notes you provide. For seva
                  registrations we may also collect your gotra if you choose
                  to share it.
                </li>
                <li>
                  <strong>Contact form:</strong> name, email, optional phone,
                  the subject and the message you submit when you write to
                  us.
                </li>
              </ul>

              <p>
                <strong>Information collected automatically</strong>
              </p>
              <ul>
                <li>
                  <strong>Technical information:</strong> when you submit our
                  contact form we record the user agent (browser/device
                  string) and IP address of the submission. We use this to
                  detect spam and abuse.
                </li>
                <li>
                  <strong>Cart data:</strong> while you are signed out, your
                  cart is stored locally in your browser so you can return to
                  it later. See &ldquo;Cookies &amp; local storage&rdquo; below.
                </li>
                <li>
                  <strong>Payment metadata:</strong> when you pay online, our
                  payment partner returns a payment ID and the corresponding
                  Razorpay order ID, which we store against your order for
                  reconciliation. <em>We never receive, store or have access
                  to your full card number, UPI PIN, CVV or net-banking
                  credentials.</em>
                </li>
              </ul>

              <p>
                We do <strong>not</strong> currently run any third-party
                analytics, advertising or tracking pixels on the Platform.
              </p>
            </Section>

            <Section id="how-we-use" title="3. How we use your information">
              <ul>
                <li>
                  To authenticate your account and send you OTPs for login.
                </li>
                <li>
                  To process and fulfil your orders, seva sponsorships and
                  yatra bookings — including payment, packaging, shipment and
                  delivery.
                </li>
                <li>
                  To communicate with you about your orders, bookings,
                  refunds, support requests and important account or service
                  notices.
                </li>
                <li>
                  To pre-fill your details on checkout and show you your
                  order history in your account dashboard.
                </li>
                <li>
                  To respond to messages you send through our contact form.
                </li>
                <li>
                  To detect, prevent and address fraud, abuse and security
                  issues.
                </li>
                <li>
                  To comply with applicable laws, court orders and lawful
                  requests by government authorities.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> sell your personal information, and
                we do not use your personal information for advertising
                profiling or to train AI models.
              </p>
            </Section>

            <Section id="sharing" title="4. Who we share information with">
              <p>
                We share personal information only with the service providers
                we need to deliver our services to you, and only the minimum
                information required for each purpose. Each provider is
                independently responsible for its own handling of your data
                under its own privacy policy.
              </p>

              <p>
                <strong>Service providers we use</strong>
              </p>
              <ul>
                <li>
                  <strong>Supabase</strong> — our database and authentication
                  platform. Your profile, orders, bookings and contact
                  messages are stored on Supabase&rsquo;s managed
                  infrastructure.
                </li>
                <li>
                  <strong>2Factor.in</strong> — sends the OTP SMS for phone
                  logins. We share only your mobile number for the purpose of
                  sending the OTP.
                </li>
                <li>
                  <strong>Razorpay</strong> — processes online payments. When
                  you pay online we pass your name, email, phone, the order
                  amount and order reference to Razorpay so they can process
                  the transaction. Card / UPI / net-banking details are
                  entered directly into Razorpay&rsquo;s payment interface and
                  are not visible to us.
                </li>
                <li>
                  <strong>Shiprocket</strong> — handles fulfilment and
                  delivery. We share the shipping name, address, pincode,
                  phone, email, order number and item list so the courier
                  partner can deliver your order.
                </li>
              </ul>

              <p>
                We may also disclose information when we are required to do so
                by law, by a court of competent jurisdiction or by a
                government authority acting under valid legal authority; or
                when we believe in good faith that disclosure is necessary to
                protect the rights, property or safety of Brajmarg, our users
                or others.
              </p>
              <p>
                If we ever transfer the business (for example through a
                merger, acquisition or sale of assets), your information may
                form part of that transfer. We will notify you of any such
                change in this policy.
              </p>
            </Section>

            <Section id="cookies" title="5. Cookies & local storage">
              <p>
                We use the minimum browser storage necessary to run the
                Platform. We do <strong>not</strong> set any advertising,
                analytics or third-party tracking cookies.
              </p>
              <ul>
                <li>
                  <strong>Authentication cookie:</strong> set by Supabase when
                  you sign in, so the server can recognise you on subsequent
                  requests. Without it you would have to log in on every
                  page.
                </li>
                <li>
                  <strong>Pending-cart cookie</strong> (<code>
                    brajmarg_pending_cart
                  </code>): set only on the login page, so that items you
                  added before signing in can be merged into your account
                  after you log in. It is short-lived (10 minutes) and is
                  deleted by the server immediately after the merge.
                </li>
                <li>
                  <strong>Browser local storage:</strong> we save your
                  guest-mode cart and small interface preferences (such as
                  whether you have seen the onboarding tour) in your
                  browser&rsquo;s local storage. This data stays on your
                  device and is not transmitted to us unless you log in, at
                  which point your cart is merged into your account.
                </li>
              </ul>
              <p>
                You can clear cookies and local storage at any time through
                your browser settings. Doing so will sign you out and reset
                your guest-mode cart.
              </p>
            </Section>

            <Section id="security" title="6. How we protect your information">
              <p>
                We follow reasonable security practices and procedures as
                contemplated by the IT Rules, 2011, including:
              </p>
              <ul>
                <li>HTTPS encryption in transit for all Platform traffic.</li>
                <li>
                  Database-level row-level security and least-privilege access
                  controls on Supabase, so users can only read and modify
                  their own data.
                </li>
                <li>
                  Server-side validation of sensitive operations such as
                  payment verification, using cryptographic signatures issued
                  by Razorpay.
                </li>
                <li>
                  Storing only the minimum information required to operate
                  the service, and never storing full card, UPI PIN or
                  net-banking credentials.
                </li>
              </ul>
              <p>
                No method of transmission over the internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your information, we
                cannot guarantee its absolute security.
              </p>
            </Section>

            <Section id="retention" title="7. How long we keep your information">
              <p>
                We retain your personal information for as long as your
                account is active and for as long as is reasonably necessary
                to provide our services, comply with our legal and tax
                obligations (including financial record-keeping under Indian
                law), resolve disputes and enforce our agreements.
              </p>
              <p>
                Order and payment records are typically retained for the
                period required by applicable accounting, tax and consumer
                protection laws. Contact-form messages are retained until
                they are archived by our support team. When information is no
                longer required, we delete or anonymise it.
              </p>
            </Section>

            <Section id="rights" title="8. Your rights & choices">
              <p>
                Subject to applicable law (including the DPDPA, 2023), you may
                exercise the following rights in respect of your personal
                information:
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> ask us for a summary of the
                  personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> ask us to correct information
                  that is inaccurate, incomplete or out of date. You can also
                  update most of your profile information yourself from your
                  account dashboard.
                </li>
                <li>
                  <strong>Erasure:</strong> ask us to delete your account and
                  the personal information associated with it. We may need to
                  retain certain information where required by law (for
                  example, financial and tax records) or where it is
                  necessary to complete an ongoing order.
                </li>
                <li>
                  <strong>Withdraw consent:</strong> where processing is based
                  on your consent, you can withdraw it. Withdrawing consent
                  may affect our ability to provide some services to you.
                </li>
                <li>
                  <strong>Grievance redressal:</strong> raise a complaint with
                  our Grievance Officer (see below).
                </li>
              </ul>
              <p>
                To exercise any of these rights, please email us at{" "}
                <a href="mailto:support@brajmarg.com">support@brajmarg.com</a>{" "}
                from the email address associated with your account, or
                contact us through our{" "}
                <Link href="/contact">contact form</Link>. We will respond
                within a reasonable time and within the timelines required by
                applicable law.
              </p>
            </Section>

            <Section id="children" title="9. Children">
              <p>
                The Platform is intended for users who are 18 years of age or
                older. We do not knowingly collect personal information from
                children under 18. If you believe a child has provided us with
                personal information, please contact us and we will take
                appropriate steps to delete it.
              </p>
            </Section>

            <Section id="third-party-links" title="10. Third-party links">
              <p>
                The Platform may contain links to third-party websites or
                services (for example, a Google Maps link to a temple
                location). We are not responsible for the privacy practices of
                those third parties. We encourage you to read the privacy
                policies of any third-party site you visit through a link on
                Brajmarg.
              </p>
            </Section>

            <Section id="changes" title="11. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our services, applicable law or our internal
                practices. When we do, we will update the &ldquo;Last
                updated&rdquo; date at the top of this page. Significant
                changes will be highlighted on the Platform. Your continued
                use of the Platform after an update means that you accept the
                revised policy.
              </p>
            </Section>

            <Section id="grievance" title="12. Grievance officer & contact">
              <p>
                In accordance with the Information Technology Act, 2000 and
                the rules made thereunder, the Grievance Officer for Brajmarg
                can be contacted as follows:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@brajmarg.com">
                    support@brajmarg.com
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> Brajmarg, Nathdwara, Rajasthan
                  313301, India
                </li>
                <li>
                  <strong>Working hours:</strong> Monday to Saturday, 9:00 AM
                  to 7:00 PM IST (excluding public holidays)
                </li>
              </ul>
              <p>
                We aim to acknowledge grievances within a reasonable time and
                resolve them within the timelines required by applicable law.
              </p>
              <p>
                For any other privacy-related question you can also reach us
                through our <Link href="/contact">contact form</Link>.
              </p>
            </Section>

            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline"
              >
                ← Back to home
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
