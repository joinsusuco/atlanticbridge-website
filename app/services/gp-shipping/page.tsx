"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const benefits = [
  {
    title: "Cost-Effective",
    description:
      "Share container or cargo space with other senders. Pay only for what you ship — no need to fill a full container.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Regular Departures",
    description:
      "We consolidate parcels on a regular schedule so your items move quickly without waiting for a full load.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Two-Way Service",
    description:
      "Send from Seattle to Senegal and Gambia, or receive parcels from West Africa to Seattle. We handle both directions.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    title: "Tracked & Secure",
    description:
      "Every parcel is logged, labeled, and tracked from drop-off to delivery. You know where your items are at all times.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const whatWeHandle = [
  {
    title: "Parcel Intake",
    items: [
      "Drop-off at our location",
      "Weight & size verification",
      "Packaging inspection",
      "Labeling & documentation",
      "Photo documentation",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Consolidation",
    items: [
      "Group parcels by destination",
      "Optimize packing for safety",
      "Prohibited items screening",
      "Customs documentation",
      "Shipment manifest preparation",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Delivery",
    items: [
      "Shipment tracking updates",
      "Arrival notification",
      "Local distribution coordination",
      "Recipient confirmation",
      "Delivery proof",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const routes = [
  {
    direction: "US to West Africa",
    from: "Seattle, WA",
    to: "Dakar, Senegal & Banjul, The Gambia",
    description:
      "Send parcels from Seattle to Senegal and The Gambia. We consolidate shipments and dispatch on a regular schedule.",
  },
  {
    direction: "West Africa to US",
    from: "Gambia & Senegal",
    to: "Seattle, WA",
    description:
      "Receive parcels from family and suppliers in Gambia and Senegal, consolidated and delivered to you in Seattle.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need to Send",
    description:
      "Describe your parcel: what it is, how much it weighs, where it needs to go, and how soon.",
  },
  {
    number: "02",
    title: "Drop Off Your Parcel",
    description:
      "Bring your parcel to our consolidation point. We inspect, weigh, label, and log it into the shipment.",
  },
  {
    number: "03",
    title: "We Consolidate & Ship",
    description:
      "Your parcel is grouped with other shipments heading to the same destination. We handle all documentation and dispatch.",
  },
  {
    number: "04",
    title: "Track Your Shipment",
    description:
      "Receive updates as your consolidated shipment moves. We keep you informed from departure to arrival.",
  },
  {
    number: "05",
    title: "Delivery & Confirmation",
    description:
      "Parcel arrives at the destination and is distributed to the recipient. You receive delivery confirmation.",
  },
];

const commonItems = [
  "Electronics & phones",
  "Clothing & shoes",
  "Documents & paperwork",
  "Medication (non-restricted)",
  "Food items (sealed, non-perishable)",
  "Gifts & personal items",
  "Small appliances",
  "Baby supplies",
];

export default function GPShippingPage() {
  const isMaximized = useIsMaximized();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/fake.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div
          className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link
                href="/services"
                className="inline-flex items-center text-white/80 hover:text-gold-light transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                All Services
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-gold-light font-bold tracking-wider uppercase">
                GP Shipping
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              GP Shipping{" "}
              <span className="text-gold-light">
                Seattle to Senegal & Gambia
              </span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Consolidated parcel shipping between Seattle and West Africa.
              We group your parcels with other shipments for cost-effective,
              reliable delivery to Senegal and The Gambia — and back.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote?service=gp-shipping"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Send a Parcel
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-gray-100">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-navy">Two-Way</div>
              <div className="text-sm text-gray-600">US & West Africa</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">Consolidated</div>
              <div className="text-sm text-gray-600">Grouped Parcels</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">Senegal</div>
              <div className="text-sm text-gray-600">& The Gambia</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">Affordable</div>
              <div className="text-sm text-gray-600">Share the Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why GP Shipping */}
      <section className="py-20 lg:py-28 bg-white">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              Why GP Shipping
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Consolidated Parcel Shipping
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              Multiple parcels from different senders grouped together for
              cost-effective shipping. Ideal for items that don&apos;t need a full
              container.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-gold/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              End-to-End Service
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What We Handle for You
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              From parcel intake to final delivery, we manage the entire
              consolidation and shipping process.
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
                <h3 className="text-xl font-bold text-navy">
                  {category.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-gold flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
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

      {/* Routes - Two-Way */}
      <section className="py-20 lg:py-28 bg-navy relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div
          className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              Two-Way Service
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Seattle & West Africa
            </h2>
            <p className="mt-4 text-white/80 lg:text-lg">
              Our GP service works in both directions — send and receive.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {routes.map((route, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    {index === 0 ? (
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gold-light font-bold uppercase text-sm tracking-wider">
                    {route.direction}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-white/60 text-sm">From</p>
                    <p className="text-white font-semibold text-lg">
                      {route.from}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">To</p>
                    <p className="text-white font-semibold text-lg">
                      {route.to}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-white/80 text-sm leading-relaxed">
                  {route.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Send */}
      <section className="py-20 lg:py-28 bg-white">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                Common Items
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                What You Can Send
              </h2>
              <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                GP shipping is ideal for personal items and smaller parcels
                that don&apos;t justify a full container.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {commonItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-600"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gold flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-navy/5 rounded-xl border border-navy/10">
                <p className="text-sm text-navy font-semibold mb-1">
                  Restricted items
                </p>
                <p className="text-sm text-gray-600">
                  Flammable materials, weapons, illegal substances, perishable
                  food, and hazardous goods cannot be included in consolidated
                  shipments.
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/fake.jpg')",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              The Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              How GP Shipping Works
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              A clear, step-by-step process from your parcel to its destination.
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
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gold text-navy"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold transition-colors duration-300 ${
                        activeStep === index ? "text-navy" : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeStep === index
                          ? "max-h-40 mt-2 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      activeStep === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-navy">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Send a Parcel?
            </h2>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl mx-auto">
              Whether you&apos;re sending from Seattle to Senegal or receiving
              from Gambia, we&apos;ll get your parcel there.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote?service=gp-shipping"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Get a GP Shipping Quote
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
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div
          className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
        >
          <h3 className="text-xl font-bold text-navy text-center mb-8">
            Related Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              href="/services/cargo-shipping"
              className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Cargo Shipping
              </span>
            </Link>
            <Link
              href="/services/product-sourcing"
              className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Product Sourcing
              </span>
            </Link>
            <Link
              href="/services/bulk-purchasing"
              className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-center group"
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
