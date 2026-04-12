"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

export default function AboutIntro() {
  const isMaximized = useIsMaximized();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 lg:items-center">
          {/* Image Composition */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/hero-cargo-ship-aerial.jpg"
                alt="Atlantic Bridge shipping operations"
                fill
                className="object-cover"
              />
            </div>
            {/* Secondary floating image */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 w-28 sm:w-40 lg:w-52 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/gallery-maersk-container.jpg"
                alt="Container shipping"
                fill
                className="object-cover"
              />
            </div>
            {/* Gold accent */}
            <div className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-2xl" />
          </div>

          {/* Content */}
          <div className="mt-12 lg:mt-0">
            <span className="text-gold font-bold tracking-wider uppercase text-base">
              About Atlantic Bridge
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Connecting US Supply with Gambian Demand
            </h2>
            <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
              Atlantic Bridge is a US-based sourcing, procurement, and export company serving
              The Gambia. We help buyers access quality American products, vehicles, and bulk
              goods through a structured, transparent, and reliable process.
            </p>
            <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
              Focused on clear communication and dependable service, Atlantic Bridge creates
              a stronger link between American supply and Gambian demand.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center mt-8 px-8 py-4 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
            >
              Learn More About Us
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
