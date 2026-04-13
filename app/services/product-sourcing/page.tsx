"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const categories = [
  {
    title: "Furniture",
    description: "Living room sets, bedroom furniture, office desks, chairs, and outdoor pieces.",
    image: "/furniture.jpg",
  },
  {
    title: "Household Goods",
    description: "Kitchenware, bedding, decor, cleaning supplies, appliances, and home essentials.",
    image: "/Ferguson_pre_spring_4K.png",
  },
  {
    title: "Electronics",
    description: "Televisions, sound systems, computers, tablets, and smart home devices.",
    image: "/ElectronicsiPads2020.jpeg",
  },
  {
    title: "Food Staples",
    description: "Rice, cooking oils, canned goods, spices, and non-perishable food items.",
    image: "/food staples.png",
  },
  {
    title: "Business Equipment",
    description: "Office machinery, point-of-sale systems, commercial appliances, and tools.",
    image: "/business-equipement.jpg",
  },
  {
    title: "Building Materials",
    description: "Hardware, fixtures, plumbing supplies, electrical components, and finishes.",
    image: "/building-material.jpg",
  },
];

const whoIsItFor = [
  {
    title: "Individuals & Families",
    description: "Sending goods to family, furnishing a new home, or purchasing items for personal use.",
  },
  {
    title: "Homeowners",
    description: "Upgrading appliances, sourcing furniture, or getting building materials for renovations.",
  },
  {
    title: "Business Owners",
    description: "Equipping offices, restaurants, retail stores, or service businesses with quality US products.",
  },
  {
    title: "Resellers & Traders",
    description: "Building inventory with sought-after American products for the Gambian market.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Share Your Requirements",
    description: "Tell us what products you need. Be as specific as possible about brands, models, quantities, and any special requirements.",
  },
  {
    number: "02",
    title: "We Source & Quote",
    description: "We locate products from trusted US suppliers, verify availability and condition, and provide a detailed quote including shipping estimates.",
  },
  {
    number: "03",
    title: "Approve & Pay",
    description: "Review the quote, confirm your order, and make the initial payment to begin procurement.",
  },
  {
    number: "04",
    title: "We Procure & Prepare",
    description: "We purchase the products, inspect them, and prepare them for export with proper documentation and packaging.",
  },
  {
    number: "05",
    title: "Shipping & Delivery",
    description: "Products are shipped to The Gambia. We coordinate logistics and keep you updated throughout the journey.",
  },
];

export default function ProductSourcingPage() {
  const isMaximized = useIsMaximized();
  const [activeStep, setActiveStep] = useState(processSteps[0]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/warehouse_boxes.png')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link
                href="/services"
                className="inline-flex items-center text-white/80 hover:text-gold-light transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-gold-light font-bold tracking-wider uppercase">
                Product Sourcing
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Import Products from USA{" "}
              <span className="text-gold-light">to Gambia</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Buy furniture, appliances, electronics, and equipment from American suppliers.
              We handle sourcing, quality checks, and shipping to Banjul.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=product-sourcing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Product Sourcing Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Product Sourcing */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                What We Do
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                What is Product Sourcing?
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                Product sourcing is the process of finding, procuring, and shipping specific
                products from the United States to The Gambia. Instead of navigating US
                suppliers, shipping logistics, and export requirements on your own, you
                tell us what you need and we handle everything.
              </p>
              <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                We work with established suppliers, retailers, and wholesalers across
                America to source quality products at competitive prices. Whether you need
                a single high-value item or multiple products for a project, our structured
                process ensures transparency and reliability.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-gold-dark">100+</div>
                  <div className="text-gray-600 text-sm mt-1">US Suppliers</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-gold-dark">4-6</div>
                  <div className="text-gray-600 text-sm mt-1">Weeks Avg. Delivery</div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/warehouse_boxes.png"
                  alt="Warehouse with products ready for shipping"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 lg:w-52 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden sm:block">
                <Image
                  src="/lcom-discover-warehouse-locations.png"
                  alt="Warehouse loading dock"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              Categories
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What We Source
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              We handle a wide range of product categories. If it&apos;s available in the US market,
              we can likely source it for you.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-navy">{category.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 lg:text-lg">
              Don&apos;t see what you&apos;re looking for?{" "}
              <Link href="/quote?service=product-sourcing" className="text-gold-dark font-semibold hover:text-gold transition-colors">
                Contact us
              </Link>{" "}
              and we&apos;ll let you know if we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                Who It&apos;s For
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Is Product Sourcing Right for You?
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                Our product sourcing service is designed for anyone who needs quality
                American products delivered to The Gambia without the hassle of managing
                international procurement and shipping themselves.
              </p>
            </div>

            <div className="mt-10 lg:mt-0 space-y-4">
              {whoIsItFor.map((item, index) => (
                <div
                  key={index}
                  className="p-6 border-l-4 border-gold bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-navy scroll-mt-24">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[700px]">
          {/* Left Side - Steps */}
          <div className={`py-16 lg:py-20 pl-6 sm:pl-8 pr-4 sm:pr-6 lg:pl-6 lg:pr-8 xl:pr-12 ${isMaximized ? "xl:pl-[15%]" : "xl:pl-8"}`}>
            <div>
              <span className="text-gold-light font-semibold tracking-wide uppercase text-sm">
                The Process
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                How Product Sourcing Works
              </h2>
              <p className="mt-4 text-white/80 lg:text-lg">
                A clear, step-by-step process from your initial request to delivery in The Gambia.
              </p>
            </div>

            <div className="mt-10 lg:mt-14 space-y-0">
              {processSteps.map((step, index) => {
                const isActive = activeStep.number === step.number;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(step)}
                    onMouseEnter={() => setActiveStep(step)}
                    className={`w-full text-left py-5 border-white/10 transition-all duration-300 group relative ${
                      index === 0 ? "border-t border-b" : index === processSteps.length - 1 ? "" : "border-b"
                    }`}
                  >
                    {/* Active indicator bar */}
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-gold rounded-full transition-all duration-300 ${
                        isActive ? "h-8 opacity-100" : "h-0 opacity-0"
                      }`}
                    />
                    <div className={`flex gap-4 items-center transition-all duration-300 ${isActive ? "pl-4" : "pl-0 group-hover:pl-2"}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive ? "border-gold" : "border-white/30 group-hover:border-white/50"
                      }`}>
                        <span className={`font-bold text-sm transition-all duration-300 ${
                          isActive ? "text-gold-light" : "text-white/80 group-hover:text-white"
                        }`}>{step.number}</span>
                      </div>
                      <span className={`text-lg font-bold transition-all duration-300 ${
                        isActive ? "text-gold-light" : "text-white/80 group-hover:text-white"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
            <Image
              src="/dock-loading-warehouse.png"
              alt="Warehouse loading dock with pallets"
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent lg:bg-gradient-to-l lg:from-navy/60 lg:via-transparent lg:to-transparent" />

            {/* Content Overlay Card */}
            <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 max-w-sm lg:max-w-md">
                {/* Gold accent corner */}
                <div className="absolute -top-3 left-8 w-6 h-6 bg-gold transform rotate-45" />

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gold-light font-bold text-2xl">{activeStep.number}</span>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">
                    {activeStep.title}
                  </h3>
                </div>
                <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                  {activeStep.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Ready to Source Products from the US?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Tell us what you need and we&apos;ll provide a detailed quote. No obligation,
              no hidden fees - just a clear breakdown of costs and timelines.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=product-sourcing"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Product Sourcing Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <h3 className="text-xl font-bold text-navy text-center mb-8">Related Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              href="/services/bulk-purchasing"
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Bulk Purchasing
              </span>
            </Link>
            <Link
              href="/services/vehicle-procurement"
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Vehicle Procurement
              </span>
            </Link>
            <Link
              href="/services/vehicle-shipping"
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Vehicle Shipping
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
