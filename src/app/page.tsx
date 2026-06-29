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
