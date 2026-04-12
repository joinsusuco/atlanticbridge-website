"use client";

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

      {/* About Atlantic Bridge */}
      <AboutIntro />

      {/* What We Do - Services Showcase */}
      <ServicesShowcase />

      {/* Why Choose Atlantic Bridge */}
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
