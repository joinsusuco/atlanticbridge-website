"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const services = [
  {
    id: "product-sourcing",
    title: "Product Sourcing",
    description: "From furniture and appliances to household goods and business equipment, we source quality products from trusted US suppliers and handle the entire procurement and shipping process.",
    features: [
      "Furniture & home goods",
      "Appliances & electronics",
      "Business equipment",
      "Building materials",
    ],
    image: "/household-appliance-realistic.jpg",
    href: "/services/product-sourcing",
  },
  {
    id: "bulk-purchasing",
    title: "Bulk Purchasing",
    description: "Connect with US wholesalers for food staples, retail inventory, and commercial goods. Perfect for mini markets, restaurants, resellers, and commercial buyers.",
    features: [
      "Food staples & groceries",
      "Retail stock",
      "Wholesale supply",
      "Container loads",
    ],
    image: "/food staples.png",
    href: "/services/bulk-purchasing",
  },
  {
    id: "vehicle-procurement",
    title: "Vehicle Procurement",
    description: "We source cars, trucks, SUVs, and heavy equipment from US dealers, auctions, and private sellers. Professional inspections and clean titles guaranteed.",
    features: [
      "Cars & SUVs",
      "Trucks & pickups",
      "Heavy equipment",
      "Professional inspections",
    ],
    image: "/vehicle-sourcing.jpg",
    href: "/services/vehicle-procurement",
  },
  {
    id: "vehicle-shipping",
    title: "Vehicle Shipping",
    description: "Ship vehicles you already own or have purchased elsewhere to The Gambia. We handle export documentation, port handling, and shipping coordination.",
    features: [
      "RoRo shipping",
      "Container shipping",
      "Export documentation",
      "Full coordination",
    ],
    image: "/Roro-transporting.jpg",
    href: "/services/vehicle-shipping",
  },
  {
    id: "cargo-shipping",
    title: "Cargo Shipping",
    description: "Already have goods you need shipped? We handle freight forwarding for items you already own or have purchased from US suppliers.",
    features: [
      "Pickup or drop-off",
      "Container consolidation",
      "Door-to-port service",
      "Freight forwarding",
    ],
    image: "/cargo.png",
    href: "/services/cargo-shipping",
  },
];

export default function ServicesPage() {
  const isMaximized = useIsMaximized();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-logistics-multimodal.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Ship to Gambia from USA
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl leading-relaxed">
              Export vehicles, products, and cargo from the United States to Banjul.
              Reliable shipping services to West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="space-y-20 lg:space-y-28">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-2xl" />
                </div>

                {/* Content */}
                <div className={`mt-10 lg:mt-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy leading-tight">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href={`/quote?service=${service.id}`}
                      className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-logistics-multimodal.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Not Sure Which Service You Need?
            </h2>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl mx-auto">
              Tell us what you&apos;re looking for and we&apos;ll guide you to the right solution.
              No obligation, just a conversation to understand your needs.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Request a Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
