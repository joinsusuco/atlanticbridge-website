import HeroCarousel from "@/components/HeroCarousel";
import DepartureSection from "@/components/DepartureSection";
import AboutIntro from "@/components/AboutIntro";
import ServicesShowcase from "@/components/ServicesShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import FAQPreview from "@/components/FAQPreview";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Next Departure Banner */}
      <DepartureSection />

      {/* About Kalajulas Xpress */}
      <AboutIntro />

      {/* What We Do - Services Showcase */}
      <ServicesShowcase />

      {/* Why Choose Kalajulas Xpress */}
      <WhyChooseUs />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Preview */}
      <FAQPreview />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
