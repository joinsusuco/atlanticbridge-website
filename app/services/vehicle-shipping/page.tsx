"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const shippingMethods = [
  {
    title: "RoRo (Roll-on/Roll-off)",
    description: "Vehicles are driven onto the ship and secured for transport. Most cost-effective for standard vehicles.",
    best_for: "Cars, SUVs, trucks, and vehicles that can be driven",
    features: ["Lower cost", "Faster loading", "Regular schedules"],
    image: "/Roro-transporting.jpg",
  },
  {
    title: "Container Shipping",
    description: "Vehicle is loaded into a secure shipping container for maximum protection during transit.",
    best_for: "Luxury vehicles, classic cars, motorcycles, or when extra protection is needed",
    features: ["Maximum protection", "Shared or exclusive", "Ideal for high-value"],
    image: "/car-shipping.webp",
  },
];

const whatWeHandle = [
  {
    title: "Export Documentation",
    items: ["Title verification & processing", "Bill of lading preparation", "Certificate of origin", "Commercial invoice", "Export declaration"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Vehicle Preparation",
    items: ["Pre-shipping inspection", "Secure loose items", "Battery & fuel handling", "Photo documentation", "Condition report"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Logistics Coordination",
    items: ["Port handling & loading", "Shipping line booking", "Transit tracking", "Arrival coordination", "Clearing agent liaison"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

const routeDetails = {
  departure: ["Seattle-Tacoma, WA"],
  arrival: "Port of Banjul, The Gambia",
  transitTime: "5-7 weeks (typical)",
  frequency: "Regular sailings",
};

const processSteps = [
  {
    number: "01",
    title: "Submit Vehicle Details",
    description: "Provide vehicle information: make, model, year, VIN, current location, and any special requirements.",
  },
  {
    number: "02",
    title: "Receive Shipping Quote",
    description: "We provide a detailed quote including port fees, ocean freight, documentation costs, and estimated timeline.",
  },
  {
    number: "03",
    title: "Vehicle Pickup or Drop-off",
    description: "Arrange to have your vehicle delivered to the port, or we can coordinate inland transport from your location.",
  },
  {
    number: "04",
    title: "Documentation & Export",
    description: "We handle all export paperwork, customs procedures, and ensure compliance with both US and Gambian requirements.",
  },
  {
    number: "05",
    title: "Ocean Transit",
    description: "Your vehicle is loaded and shipped. We provide tracking updates throughout the journey.",
  },
  {
    number: "06",
    title: "Arrival in The Gambia",
    description: "Vehicle arrives at Banjul port. We coordinate with local clearing agents to facilitate smooth customs clearance.",
  },
];


export default function VehicleShippingPage() {
  const isMaximized = useIsMaximized();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Roro-transporting.jpg')" }}
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
                Vehicle Shipping
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Ship Car from USA{" "}
              <span className="text-gold">to Gambia</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Export your vehicle to Banjul via RoRo or container shipping.
              We handle documentation, port handling, and shipping to West Africa.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=vehicle-shipping"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Vehicle Shipping Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services/vehicle-procurement"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Need to Find a Vehicle?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              Shipping Options
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              How We Ship Your Vehicle
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              Choose the shipping method that best fits your vehicle and budget.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shippingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={method.image}
                    alt={method.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <p className="text-gray-600 leading-relaxed">{method.description}</p>

                  <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/20">
                    <p className="text-sm text-gold font-semibold mb-1">Best for:</p>
                    <p className="text-navy font-medium">{method.best_for}</p>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {method.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              End-to-End Service
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What We Handle for You
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              From documentation to delivery, we manage every aspect of the export process.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whatWeHandle.map((category, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-navy">{category.title}</h3>
                <ul className="mt-4 space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Information */}
      <section className="py-20 lg:py-28 bg-navy relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div>
              <span className="text-gold font-bold tracking-wider uppercase text-sm">
                Shipping Route
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                US to The Gambia
              </h2>
              <p className="mt-6 text-white/80 lg:text-lg leading-relaxed">
                We ship from Seattle-Tacoma, Washington with regular sailings to Banjul, The Gambia.
                Our established relationships with shipping lines ensure reliable schedules
                and competitive rates.
              </p>

              <div className="mt-8 space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <p className="text-white/60 text-sm mb-2">Departure Ports</p>
                  <div className="flex flex-wrap gap-2">
                    {routeDetails.departure.map((port, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <p className="text-white/60 text-sm mb-1">Destination</p>
                    <p className="text-white font-semibold">{routeDetails.arrival}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <p className="text-white/60 text-sm mb-1">Transit Time</p>
                    <p className="text-white font-semibold">{routeDetails.transitTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white/10">
                <Image
                  src="/Roro-transporting.jpg"
                  alt="RoRo vehicle shipping"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              The Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              How Vehicle Shipping Works
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              A clear, step-by-step process from your vehicle to Banjul.
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`w-full text-left flex gap-6 items-start p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    activeStep === index
                      ? "border-gold"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gold text-navy"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    <span className="font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${
                      activeStep === index ? "text-navy" : "text-gray-600"
                    }`}>{step.title}</h3>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeStep === index ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${
                    activeStep === index ? "rotate-180" : ""
                  }`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Link to Vehicle Procurement */}
      <section className="py-16 lg:py-20 bg-gold">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-navy">
                Need help finding a vehicle first?
              </h3>
              <p className="mt-2 text-navy/80 lg:text-lg">
                We source vehicles from US dealers, auctions, and private sellers.
              </p>
            </div>
            <Link
              href="/services/vehicle-procurement"
              className="mt-6 lg:mt-0 inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-navy text-white hover:bg-navy-dark hover:-translate-y-0.5 transition-all group"
            >
              Vehicle Procurement
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
              Ready to Ship Your Vehicle?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Get a quote for shipping your vehicle from the US to The Gambia.
              Fast response, transparent pricing, no hidden fees.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=vehicle-shipping"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Vehicle Shipping Quote
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
              href="/services/vehicle-procurement"
              className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Vehicle Procurement
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
