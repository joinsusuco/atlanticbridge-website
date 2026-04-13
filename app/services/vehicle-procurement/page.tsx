"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const vehicleTypes = [
  {
    title: "Cars & SUVs",
    description: "Sedans, SUVs, crossovers, and luxury vehicles from US dealers, auctions, and private sellers.",
    examples: ["Toyota Camry", "Honda Accord", "Ford Explorer", "Jeep Grand Cherokee", "BMW X5", "Mercedes-Benz GLE"],
    image: "/benz.jpg",
  },
  {
    title: "Trucks & Pickups",
    description: "Light-duty pickups to heavy-duty work trucks for personal and commercial use.",
    examples: ["Ford F-150", "Chevrolet Silverado", "RAM 1500", "Toyota Tundra", "GMC Sierra", "Ford F-250"],
    image: "/pickup.jpg",
  },
  {
    title: "Vans & Minivans",
    description: "Passenger vans, cargo vans, and minivans for families and businesses.",
    examples: ["Toyota Sienna", "Honda Odyssey", "Ford Transit", "Mercedes Sprinter", "Chrysler Pacifica", "RAM ProMaster"],
    image: "/white-delivery-vans.jpg",
  },
  {
    title: "Heavy Equipment & Machinery",
    description: "Construction equipment, agricultural machinery, and industrial vehicles.",
    examples: ["Excavators", "Bulldozers", "Forklifts", "Tractors", "Loaders", "Backhoes"],
    image: "/view-heavy-machinery-used-construction-industry.jpeg",
  },
];

const sourcingChannels = [
  {
    title: "Dealer Networks",
    description: "Access to certified pre-owned and new vehicles from authorized US dealerships.",
    features: ["Vehicle history reports", "Dealer warranties available", "Certified pre-owned options"],
  },
  {
    title: "Auto Auctions",
    description: "Competitive pricing through Copart, IAAI, Manheim, and other major US auctions.",
    features: ["Wholesale pricing", "Wide selection", "Fleet & lease returns"],
  },
  {
    title: "Private Sellers",
    description: "Direct purchases from private owners for specific makes and models.",
    features: ["Unique finds", "Negotiated pricing", "Full inspection included"],
  },
  {
    title: "Fleet Sales",
    description: "Corporate fleet vehicles and rental car disposals at competitive prices.",
    features: ["Well-maintained vehicles", "Complete service records", "Volume availability"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share your vehicle requirements: make, model, year range, mileage preferences, and budget. The more specific, the better we can match your needs.",
  },
  {
    number: "02",
    title: "We Search & Present Options",
    description: "We search our network of dealers, auctions, and sellers to find vehicles matching your criteria. You'll receive options with photos, specs, and pricing.",
  },
  {
    number: "03",
    title: "Vehicle Inspection",
    description: "Before purchase, we arrange professional inspections to verify condition, identify any issues, and confirm the vehicle meets your expectations.",
  },
  {
    number: "04",
    title: "Purchase & Documentation",
    description: "Once you approve, we handle the purchase, title transfer, and all documentation required for export. Clean titles guaranteed.",
  },
  {
    number: "05",
    title: "Export Preparation",
    description: "Vehicle is prepared for shipping: proper cleaning, securing loose items, and export documentation including title, bill of sale, and customs forms.",
  },
  {
    number: "06",
    title: "Shipping to The Gambia",
    description: "Your vehicle is shipped via RoRo or container to The Gambia. We coordinate with our vehicle shipping service for seamless delivery.",
  },
];

export default function VehicleProcurementPage() {
  const isMaximized = useIsMaximized();
  const [activeStep, setActiveStep] = useState(processSteps[0]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/vehicle-sourcing.jpg')" }}
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
                Vehicle Procurement
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Buy American Cars,{" "}
              <span className="text-gold-light">Ship to Gambia</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Import used cars, trucks, and SUVs from USA to Gambia. We source from
              US dealers and auctions, inspect vehicles, and ship to Banjul.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=vehicle-procurement"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Request Vehicle Procurement
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services/vehicle-shipping"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Already Have a Vehicle?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              What We Source
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Vehicles & Machinery
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              We procure a wide range of vehicles and equipment from across the United States.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {vehicleTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-56 sm:h-64">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">
                    {type.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Popular models:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example, exIndex) => (
                        <span
                          key={exIndex}
                          className="px-3 py-1 bg-gray-50 text-navy text-sm rounded-full border border-gray-200"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Channels */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-start">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                Our Network
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Where We Source Vehicles
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                We tap into multiple sourcing channels across the United States to find
                the best vehicles at competitive prices. Whether you want a specific
                make and model or the best value in a category, we have the connections.
              </p>

              <div className="mt-8 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/vehicle-sourcing.jpg"
                    alt="Vehicle sourcing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 space-y-6">
              {sourcingChannels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-bold text-navy">{channel.title}</h3>
                  <p className="mt-2 text-gray-600">{channel.description}</p>
                  <ul className="mt-4 space-y-2">
                    {channel.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="bg-navy scroll-mt-24">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[700px]">
          {/* Left Side - Steps */}
          <div className={`py-16 lg:py-20 pl-6 sm:pl-8 pr-4 sm:pr-6 lg:pl-6 lg:pr-8 xl:pr-12 ${isMaximized ? "xl:pl-[15%]" : "xl:pl-8"}`}>
            <div>
              <span className="text-gold-light font-semibold tracking-wide uppercase text-sm">
                The Process
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                From Search to Shipment
              </h2>
              <p className="mt-4 text-white/80 lg:text-lg">
                Here&apos;s how we help you find and acquire your vehicle from the United States.
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
              src="/gallery-car-loading.jpg"
              alt="Vehicle being loaded for shipping"
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

      {/* Link to Vehicle Shipping */}
      <section className="py-16 lg:py-20 bg-gold">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-navy">
                Already own a vehicle in the US?
              </h3>
              <p className="mt-2 text-navy/80 lg:text-lg">
                We also ship vehicles you already own or have purchased elsewhere.
              </p>
            </div>
            <Link
              href="/services/vehicle-shipping"
              className="mt-6 lg:mt-0 inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-navy text-white hover:bg-navy-dark hover:-translate-y-0.5 transition-all group"
            >
              Vehicle Shipping Service
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Ready to Find Your Vehicle?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Tell us what you&apos;re looking for and we&apos;ll search our network to find
              the best options. Professional inspection included.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=vehicle-procurement"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Request Vehicle Procurement
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
              href="/services/vehicle-shipping"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Vehicle Shipping
              </span>
            </Link>
            <Link
              href="/services/product-sourcing"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Product Sourcing
              </span>
            </Link>
            <Link
              href="/services/bulk-purchasing"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Bulk Purchasing
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
