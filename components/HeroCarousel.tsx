"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const slides = [
  {
    image: "/hero-cargo-ship-aerial.jpg",
    alt: "Ship cargo from USA to Gambia",
    heading: (
      <>
        <span className="text-gold whitespace-nowrap">Ship to Gambia</span>
        <br />
        <span className="whitespace-nowrap">from USA</span>
      </>
    ),
    description:
      "Export vehicles, products, and cargo from the United States to Banjul. Reliable shipping to West Africa.",
    featureImage: "/gallery-maersk-container.jpg",
    featureAlt: "Container shipping to Gambia",
  },
  {
    image: "/hero-logistics-multimodal.jpg",
    alt: "Import products from USA to Gambia",
    heading: (
      <>
        <span className="text-gold whitespace-nowrap">Import Products</span>
        <br />
        <span className="whitespace-nowrap">from America</span>
      </>
    ),
    description:
      "Buy furniture, appliances, and electronics from US suppliers. Shipping to Banjul, Gambia.",
    featureImage: "/gallery-container-appliances.jpg",
    featureAlt: "American appliances for Gambia",
  },
  {
    image: "/hero-truck-highway.jpg",
    alt: "Buy American cars and ship to Gambia",
    heading: (
      <>
        <span className="text-gold whitespace-nowrap">Buy American Cars</span>
        <br />
        <span className="whitespace-nowrap">Ship to Gambia</span>
      </>
    ),
    description:
      "Import used cars, trucks, and SUVs from USA. Vehicle shipping to Banjul via RoRo or container.",
    featureImage: "/gallery-car-loading.jpg",
    featureAlt: "Car shipping to Gambia",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMaximized = useIsMaximized();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative pt-[78px] sm:pt-[88px] xl:pt-0 min-h-[540px] h-[100svh] max-h-[680px] sm:h-[75vw] sm:max-h-[660px] md:h-[65vw] md:max-h-[768px] lg:min-h-0 lg:h-[55vw] lg:max-h-[850px] xl:h-[calc(100vh-100px)] xl:max-h-none 2xl:h-screen flex items-center overflow-hidden bg-navy">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            fetchPriority={index === 0 ? "high" : undefined}
            className="object-cover"
            priority={index === 0}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-navy/20" />
        </div>
      ))}

      {/* Hero Content - Left Aligned */}
      <div className={`relative z-10 w-full pt-4 sm:pt-6 md:pt-0 px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${
                  index === currentSlide
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="max-w-[72%] sm:max-w-[60%] lg:max-w-none select-none">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight">
                    {slide.heading}
                  </h1>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-2xl text-white/90 max-w-2xl 2xl:max-w-3xl">
                    {slide.description}
                  </p>
                </div>

                <div className="mt-8 sm:mt-10 2xl:mt-12 flex flex-row gap-4">
                  <a
                    href="/quote"
                    className="inline-flex items-center justify-center px-5 sm:px-8 2xl:px-10 py-3 sm:py-4 2xl:py-5 text-sm sm:text-base 2xl:text-lg font-semibold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md transition-all duration-200"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center justify-center px-5 sm:px-8 2xl:px-10 py-3 sm:py-4 2xl:py-5 text-sm sm:text-base 2xl:text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-navy hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md transition-all duration-200"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Decorative Circular Image (pushed to far right, half visible) */}
          <div className="hidden lg:block" />
        </div>
      </div>


      {/* Right Side - Decorative Circular Image (half visible) */}
      <div className="hidden xl:block absolute right-0 top-[20%] 2xl:top-[20%] translate-x-[50%] z-10">
        {slides.map((slide, index) => (
          <div
            key={`feature-${index}`}
            className={`transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            {/* Outer decorative ring */}
            <div className="relative w-[550px] h-[550px] 2xl:w-[750px] 2xl:h-[750px]">
              {/* Curved accent border */}
              <div className="absolute inset-0 rounded-full border-[3px] border-gold/30" />
              <div
                className="absolute inset-0 rounded-full border-[3px] border-transparent"
                style={{
                  borderTopColor: '#D4A853',
                  borderRightColor: '#D4A853',
                  transform: 'rotate(-45deg)',
                }}
              />

              {/* Inner image circle */}
              <div className="absolute inset-4 xl:inset-5 2xl:inset-6 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={slide.featureImage}
                  alt={slide.featureAlt}
                  fill
                  sizes="(min-width: 1536px) 720px, (min-width: 1280px) 520px, 50vw"
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-navy/10" />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators - Hidden on mobile */}
      <div className={`hidden sm:flex absolute bottom-8 left-6 sm:left-8 lg:left-6 ${isMaximized ? "xl:left-[7.5%]" : "xl:left-8"} z-10 gap-3`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
