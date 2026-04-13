"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const shippingOptions = [
  {
    title: "Pickup Service",
    description: "We can arrange pickup from your location.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Drop-off Option",
    description: "Bring items to our consolidation warehouse.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Container Consolidation",
    description: "Combine shipments to reduce costs.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Full Container Load",
    description: "Exclusive container for larger shipments.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    number: "01",
    title: "Submit Your Cargo Details",
    description: "What it is, how much it weighs, where it's located.",
  },
  {
    number: "02",
    title: "Pickup or Drop-off",
    description: "We pick up, or you bring it to our warehouse.",
  },
  {
    number: "03",
    title: "Get a Quote",
    description: "Freight, documentation, port fees—all included.",
  },
  {
    number: "04",
    title: "We Ship It",
    description: "Export docs, container loading, ocean freight.",
  },
  {
    number: "05",
    title: "Arrival in Banjul",
    description: "Track your shipment until it reaches The Gambia.",
  },
];

export default function CargoShippingPage() {
  const isMaximized = useIsMaximized();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/gallery-forklift-loading.jpg')" }}
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
                Cargo Shipping
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Cargo Shipping from USA{" "}
              <span className="text-gold-light">to Gambia</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Freight forwarding to Banjul port. Ship cargo from USA to West Africa
              via LCL or full container. Reliable shipping services.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=cargo-shipping"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-navy">5-7 Weeks</div>
              <div className="text-sm text-gray-600">Transit Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">Pickup</div>
              <div className="text-sm text-gray-600">Or Drop-off</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">Banjul</div>
              <div className="text-sm text-gray-600">Destination Port</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">All Docs</div>
              <div className="text-sm text-gray-600">Handled by Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">
              How You Can Ship
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto bg-navy/5 rounded-xl flex items-center justify-center text-navy mb-4">
                  {option.icon}
                </div>
                <h3 className="font-bold text-navy">{option.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                The Process
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
                How Cargo Shipping Works
              </h2>
              <p className="mt-4 text-gray-600 lg:text-lg">
                A clear, step-by-step process from pickup to Banjul.
              </p>

              <div className="mt-10 space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`w-full text-left flex gap-6 items-start p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      activeStep === index
                        ? "border-gold"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gold text-navy"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className="font-bold text-sm">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        activeStep === index ? "text-navy" : "text-gray-600"
                      }`}>{step.title}</h3>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        activeStep === index ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 transition-transform duration-300 ${
                      activeStep === index ? "rotate-180" : ""
                    }`}>
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/cargo.png"
                  alt="Cargo ready for shipping"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-navy">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Ship?
            </h2>
            <p className="mt-4 text-white/80 lg:text-lg">
              Tell us what you need to ship and get a quote.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=cargo-shipping"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a Quote
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

      {/* Related Services */}
      <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <h3 className="text-lg font-bold text-navy text-center mb-6">Related Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <Link
              href="/services/product-sourcing"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy text-sm font-semibold group-hover:text-gold transition-colors">
                Product Sourcing
              </span>
            </Link>
            <Link
              href="/services/bulk-purchasing"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy text-sm font-semibold group-hover:text-gold transition-colors">
                Bulk Purchasing
              </span>
            </Link>
            <Link
              href="/services/vehicle-procurement"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy text-sm font-semibold group-hover:text-gold transition-colors">
                Vehicle Procurement
              </span>
            </Link>
            <Link
              href="/services/vehicle-shipping"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy text-sm font-semibold group-hover:text-gold transition-colors">
                Vehicle Shipping
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
