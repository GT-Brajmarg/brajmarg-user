// import HeroSection from "@/components/home/HeroSection";
// import TemplesSection from "@/components/home/TemplesSection";
// import ServicesSection from "@/components/home/ServicesSection";
// import SubscriptionSection from "@/components/home/SubscriptionSection";
// import HowItWorksSection from "@/components/home/HowItWorksSection";

// export default function HomePage() {
//   return (
//     <main>
//       {/* Section 1: Hero Banner with Live Darshan Countdown */}
//       <HeroSection />

//       {/* Section 2: Explore Sacred Temples Grid */}
//       <TemplesSection />

//       {/* Section 3: Our Devotional Services Grid */}
//       <ServicesSection />

//       {/* Section 4: Never Miss a Festival Update – Subscription Plans */}
//       <SubscriptionSection />

//       {/* Section 5: How Brajmarg Works – 4-Step Process */}
//       <HowItWorksSection />
//     </main>
//   );
// }
import HeroSection from "@/components/home/HeroSection";
import TemplesSection from "@/components/home/TemplesSection";
import ServicesSection from "@/components/home/ServicesSection";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import HomePageClient from "@/components/home/HomePageClient";

export default function HomePage() {
  return (
    <HomePageClient>
      <main>
        <HeroSection />
        <TemplesSection />
        <ServicesSection />
        <SubscriptionSection />
        <HowItWorksSection />
      </main>
    </HomePageClient>
  );
}
