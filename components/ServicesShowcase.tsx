"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const services = [
  {
    id: "product-sourcing",
    title: "Product Sourcing",
    description:
      "From furniture and appliances to household goods and business essentials, we source quality products from trusted US suppliers.",
    image: "/household-appliance-realistic.jpg",
    href: "/services/product-sourcing",
  },
  {
    id: "bulk-purchasing",
    title: "Bulk Purchasing",
    description:
      "We connect businesses and resellers with wholesale suppliers across the United States. From food staples to retail inventory.",
    image: "/food staples.png",
    href: "/services/bulk-purchasing",
  },
  {
    id: "vehicle-procurement",
    title: "Vehicle Procurement",
    description:
      "We source cars, trucks, SUVs, and commercial machinery from US dealers, private sellers, and auctions.",
    image: "/vehicle-sourcing.jpg",
    href: "/services/vehicle-procurement",
  },
  {
    id: "vehicle-shipping",
    title: "Vehicle Shipping",
    description:
      "Already own a vehicle in the US? We provide end-to-end export and shipping services to The Gambia.",
    image: "/Roro-transporting.jpg",
    href: "/services/vehicle-shipping",
  },
  {
    id: "cargo-shipping",
    title: "Cargo Shipping",
    description:
      "Have goods you need shipped? We handle freight forwarding for items you already own or purchased from US suppliers.",
    image: "/cargo.png",
    href: "/services/cargo-shipping",
  },
];

export default function ServicesShowcase() {
  const [activeService, setActiveService] = useState(services[0]);
  const isMaximized = useIsMaximized();

  return (
    <section className="bg-navy">
      <div className="lg:grid lg:grid-cols-2 lg:min-h-[700px]">
        {/* Left Side - Service List */}
        <div className={`pt-16 pb-8 lg:py-20 pl-6 sm:pl-8 pr-4 sm:pr-6 lg:pl-6 lg:pr-8 xl:pr-12 ${isMaximized ? "xl:pl-[15%]" : "xl:pl-8"}`}>
          <div className="text-center lg:text-left">
            <span className="text-gold font-semibold tracking-wide uppercase text-sm">
              Services We Offer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              What We Do
            </h2>
          </div>

          {/* Service List */}
          <div className="mt-10 lg:mt-14 space-y-0">
            {services.map((service, index) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  onMouseEnter={() => setActiveService(service)}
                  className={`w-full text-left py-5 border-white/10 transition-all duration-300 group relative ${
                    index === 0 ? "border-t border-b" : index === services.length - 1 ? "" : "border-b"
                  }`}
                >
                  {/* Active indicator bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-gold rounded-full transition-all duration-300 ${
                      isActive ? "h-8 opacity-100" : "h-0 opacity-0"
                    }`}
                  />
                  <span
                    className={`text-xl lg:text-2xl font-bold transition-all duration-300 inline-block ${
                      isActive
                        ? "text-gold pl-4"
                        : "text-white/60 group-hover:text-white group-hover:pl-2 pl-0"
                    }`}
                  >
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
          {/* Background Images */}
          {services.map((service) => (
            <div
              key={service.id}
              className={`absolute inset-0 transition-all duration-700 ${
                activeService.id === service.id ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent lg:bg-gradient-to-l lg:from-navy/60 lg:via-transparent lg:to-transparent" />
            </div>
          ))}

          {/* Content Overlay Card */}
          <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-auto lg:bottom-10 lg:left-10">
            <div className="bg-navy/95 rounded-2xl p-6 lg:p-8 border border-gold/30 max-w-sm lg:max-w-md shadow-xl">
              {/* Gold accent corner */}
              <div className="absolute -top-3 left-8 w-6 h-6 bg-gold transform rotate-45" />

              <h3 className="text-xl lg:text-2xl font-bold text-white">
                {activeService.title}
              </h3>
              <p className="mt-3 text-white/90 text-sm lg:text-base leading-relaxed">
                {activeService.description}
              </p>
              <Link
                href={activeService.href}
                className="inline-flex items-center mt-5 text-gold font-semibold text-sm hover:gap-2 gap-1 transition-all group"
              >
                Learn More
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
