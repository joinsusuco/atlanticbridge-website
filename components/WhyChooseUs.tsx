"use client";

import Image from "next/image";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const trustPillars = [
  {
    title: "US-Based Sourcing Access",
    description:
      "Direct access to American suppliers, dealers, and auctions across the United States.",
  },
  {
    title: "Structured Procurement Process",
    description:
      "Organized workflow from initial inquiry through purchasing, inspection, and export.",
  },
  {
    title: "Clear Communication",
    description:
      "Regular updates and dependable coordination throughout every step of the process.",
  },
  {
    title: "Focused on The Gambia Market",
    description:
      "Built specifically around the US-Gambia corridor and its unique buyer needs.",
  },
];

export default function WhyChooseUs() {
  const isMaximized = useIsMaximized();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div
        className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
          {/* Left Side - Heading + Image Composition */}
          <div>
            <span className="text-gold font-bold tracking-wider uppercase text-base">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Why Choose Atlantic Bridge?
            </h2>

            {/* Image Composition */}
            <div className="mt-10 relative flex justify-center lg:justify-start">
              {/* Main diagonal composition */}
              <div className="relative w-full max-w-md">
                {/* Top image */}
                <div className="relative w-48 sm:w-56 aspect-[4/3] rounded-lg overflow-hidden shadow-lg ml-auto">
                  <Image
                    src="/hero-cargo-ship-aerial.jpg"
                    alt="Cargo ship operations"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Middle image - offset left */}
                <div className="relative w-48 sm:w-56 aspect-[4/3] rounded-lg overflow-hidden shadow-lg -mt-8 ml-8">
                  <Image
                    src="/gallery-car-loading.jpg"
                    alt="Vehicle loading"
                    fill
                    className="object-cover"
                  />
                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold border-l-[40px] border-l-transparent" />
                </div>

                {/* Bottom image - offset right */}
                <div className="relative w-48 sm:w-56 aspect-[4/3] rounded-lg overflow-hidden shadow-lg -mt-8 ml-auto mr-8">
                  <Image
                    src="/gallery-container-appliances.jpg"
                    alt="Container with appliances"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Decorative gold line */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gold rounded-full hidden lg:block" />
              </div>
            </div>
          </div>

          {/* Right Side - Trust Pillars Grid */}
          <div className="mt-12 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {trustPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="p-6 border-l-4 border-gold bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg lg:text-xl font-bold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm lg:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
