"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const targetAudiences = [
  {
    title: "Mini Markets & Corner Shops",
    description: "Stock your shelves with quality American brands your customers trust. From canned goods to personal care items, we help small retailers compete.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Restaurants & Food Services",
    description: "Source quality ingredients, kitchen equipment, and supplies in bulk. Maintain consistency in your menu with reliable US suppliers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Resellers & Distributors",
    description: "Build your inventory with in-demand American products. We handle procurement and shipping so you can focus on selling.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Commercial & Industrial Buyers",
    description: "Procure supplies, equipment, and materials for large-scale operations. From construction projects to hospitality ventures.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const productCategories = [
  {
    category: "Food Staples",
    items: ["Rice & Grains", "Cooking Oils", "Canned Goods", "Pasta & Noodles", "Condiments & Sauces", "Spices & Seasonings"],
    image: "/food staples.png",
  },
  {
    category: "Retail Stock",
    items: ["Personal Care", "Household Items", "Baby Products", "Beauty & Cosmetics", "Health & Wellness", "Cleaning Supplies"],
    image: "/retail stock.jpg",
  },
  {
    category: "Wholesale Supply",
    items: ["Electronics", "Clothing & Apparel", "Footwear", "Accessories", "Toys & Games", "Stationery"],
    image: "/wholesale-supply.png",
  },
];

const benefits = [
  {
    title: "Competitive Pricing",
    description: "Access US wholesale prices and economies of scale. The more you order, the better the value.",
  },
  {
    title: "Quality Assurance",
    description: "We verify product quality and authenticity before shipping. No surprises when your goods arrive.",
  },
  {
    title: "Reliable Supply Chain",
    description: "Established relationships with US suppliers mean consistent availability and timely shipments.",
  },
  {
    title: "Consolidated Shipping",
    description: "Combine multiple product types in one shipment to maximize container space and reduce costs.",
  },
  {
    title: "Documentation Support",
    description: "We handle export paperwork, certificates of origin, and shipping documentation.",
  },
  {
    title: "Flexible Order Sizes",
    description: "From minimum order quantities to full container loads, we work with your budget and storage capacity.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Submit Your Product List",
    description: "Share your product requirements including brands, quantities, and any specific preferences. Include target budget if available.",
  },
  {
    number: "02",
    title: "Supplier Sourcing",
    description: "We identify the best US suppliers for your products, comparing prices, availability, and quality across our network.",
  },
  {
    number: "03",
    title: "Detailed Quote",
    description: "Receive a comprehensive quote including product costs, shipping estimates, and projected delivery timeline.",
  },
  {
    number: "04",
    title: "Order Confirmation",
    description: "Approve the quote and make the initial payment. We begin procurement immediately upon confirmation.",
  },
  {
    number: "05",
    title: "Procurement & Consolidation",
    description: "Products are purchased, inspected, and consolidated at our warehouse for efficient container loading.",
  },
  {
    number: "06",
    title: "Shipping & Delivery",
    description: "Your goods are shipped to The Gambia with full tracking. We coordinate with clearing agents for smooth arrival.",
  },
];

export default function BulkPurchasingPage() {
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
                className="inline-flex items-center text-white/60 hover:text-gold transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-gold font-bold tracking-wider uppercase">
                Bulk Purchasing
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Bulk Import from USA{" "}
              <span className="text-gold">to Gambia</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Wholesale shipping to West Africa. Import food staples, retail stock, and
              commercial goods from US suppliers. Container shipping to Banjul port.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=bulk-purchasing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Request a Bulk Purchase Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#who-its-for"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Is This For Me?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For - Target Audiences */}
      <section id="who-its-for" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              Who It's For
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Built for Business Buyers
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              Our bulk purchasing service is designed for businesses that need volume,
              reliability, and competitive pricing.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {targetAudiences.map((audience, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                  {audience.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{audience.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Source */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              Product Categories
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What We Source in Bulk
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              From food staples to retail inventory, we source across multiple categories
              to meet your business needs.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.category}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 lg:text-lg">
              Need something specific?{" "}
              <Link href="/quote?service=bulk-purchasing" className="text-gold font-semibold hover:text-gold-dark transition-colors">
                Send us your product list
              </Link>{" "}
              and we'll source it.
            </p>
          </div>
        </div>
      </section>

      {/* Procurement Support */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/gallery-forklift-loading.jpg"
                  alt="Warehouse operations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold text-navy p-6 rounded-2xl shadow-xl hidden sm:block">
                <div className="text-3xl font-bold">Full</div>
                <div className="text-sm font-medium">Container Loads</div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <span className="text-gold font-bold tracking-wider uppercase text-sm">
                Procurement Support
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                We Handle the Heavy Lifting
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                Bulk purchasing from US suppliers involves coordination across multiple
                vendors, price negotiations, quality verification, and logistics planning.
                We manage all of this so you don't have to.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Alternating Cards */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              The Atlantic Bridge Advantage
            </h2>
          </div>

          <div className="space-y-6 lg:space-y-8">
            {benefits.map((benefit, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Number/Visual Side */}
                  <div className={`lg:w-1/3 bg-navy rounded-2xl p-8 lg:p-10 flex items-center justify-center ${
                    isEven ? "lg:rounded-r-none" : "lg:rounded-l-none"
                  }`}>
                    <div className="text-center">
                      <span className="text-6xl lg:text-7xl font-bold text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:w-2/3 bg-white rounded-2xl p-8 lg:p-10 flex flex-col justify-center border border-gray-200 ${
                    isEven ? "lg:rounded-l-none lg:border-l-0" : "lg:rounded-r-none lg:border-r-0"
                  }`}>
                    <h3 className="text-xl lg:text-2xl font-bold text-navy">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-gray-600 lg:text-lg leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-navy scroll-mt-24">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[700px]">
          {/* Left Side - Steps */}
          <div className={`py-16 lg:py-20 pl-6 sm:pl-8 pr-4 sm:pr-6 lg:pl-6 lg:pr-8 xl:pr-12 ${isMaximized ? "xl:pl-[15%]" : "xl:pl-8"}`}>
            <div>
              <span className="text-gold font-semibold tracking-wide uppercase text-sm">
                The Process
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                How Bulk Purchasing Works
              </h2>
              <p className="mt-4 text-white/70 lg:text-lg">
                From your initial product list to delivery in The Gambia, here's how it works.
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
                          isActive ? "text-gold" : "text-white/50 group-hover:text-white"
                        }`}>{step.number}</span>
                      </div>
                      <span className={`text-lg font-bold transition-all duration-300 ${
                        isActive ? "text-gold" : "text-white/60 group-hover:text-white"
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
              src="/warehouse_boxes.png"
              alt="Warehouse with products ready for bulk purchasing"
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
                  <span className="text-gold font-bold text-2xl">{activeStep.number}</span>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Ready to Order in Bulk?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Send us your product list and we'll get back to you with a detailed quote
              including pricing, shipping estimates, and timeline.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=bulk-purchasing"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Request a Bulk Purchase Quote
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
      <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <h3 className="text-xl font-bold text-navy text-center mb-8">Related Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              href="/services/product-sourcing"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Product Sourcing
              </span>
            </Link>
            <Link
              href="/services/vehicle-procurement"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Vehicle Procurement
              </span>
            </Link>
            <Link
              href="/services/vehicle-shipping"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
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
