"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const values = [
  {
    title: "Transparency",
    description: "Clear pricing, honest timelines, and straightforward communication. No hidden fees, no surprises. You'll always know what to expect.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description: "When we commit to a timeline or quote, we deliver. Our processes are structured to minimize delays and ensure consistent service.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Quality",
    description: "We verify products and vehicles before shipping. Our supplier network is built on quality, not just price.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Accountability",
    description: "We take ownership of every order from start to finish. If something goes wrong, we make it right.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const teamValues = [
  "Direct communication - no middlemen or runaround",
  "Responsive support throughout your order",
  "Problem-solving approach when issues arise",
  "Long-term relationships over one-time transactions",
];

export default function AboutPage() {
  const isMaximized = useIsMaximized();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-4xl">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              About Us
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              USA to Gambia{" "}
              <span className="text-gold-light">Shipping Company</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Atlantic Bridge exports vehicles, products, and cargo from the United States
              to Banjul. Your trusted partner for shipping to West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div>
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Why Atlantic Bridge Exists
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                International sourcing and shipping can be complicated, expensive, and unreliable.
                We&apos;ve seen too many Gambian buyers struggle with unclear pricing, delayed shipments,
                damaged goods, and suppliers who disappear after payment.
              </p>
              <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                Atlantic Bridge was created to solve these problems. We bring structure, transparency,
                and accountability to US-Gambia trade. Our goal is simple: make it easy for Gambian
                buyers to access American products and vehicles through a service they can actually trust.
              </p>
              <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                We&apos;re not trying to be the biggest. We&apos;re focused on being the most reliable. Every
                order matters, every customer relationship is built on follow-through, and every
                commitment is one we intend to keep.
              </p>
            </div>

            <div className="mt-12 lg:mt-0 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/hero-logistics-multimodal.jpg"
                  alt="Global logistics operations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 lg:w-52 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden sm:block">
                <Image
                  src="/gallery-maersk-container.jpg"
                  alt="Container shipping"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What We Stand For
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              These principles guide every interaction, every order, and every decision we make.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-navy">{value.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Milestones - Hidden for now
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Building Something Real
            </h2>
          </div>

          <div className="mt-14 max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-6 lg:gap-8"
                >
                  <div className="flex-shrink-0 w-24">
                    <span className="text-gold font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pb-8 border-b border-gray-200 last:border-0">
                    <h3 className="text-xl font-bold text-navy">{milestone.title}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* How We Work */}
      <section className="py-20 lg:py-28 bg-navy relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/gallery-forklift-loading.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div>
              <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
                How We Work
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Working With Atlantic Bridge
              </h2>
              <p className="mt-6 text-white/80 lg:text-lg leading-relaxed">
                We believe in building relationships, not just processing transactions.
                When you work with us, you get a team that&apos;s invested in your success
                and responsive to your needs.
              </p>

              <ul className="mt-8 space-y-4">
                {teamValues.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-4 text-white text-lg">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-white mb-6">What Sets Us Apart</h3>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-white/10">
                    <h4 className="text-gold-light font-semibold mb-2">Structured Process</h4>
                    <p className="text-white/80">Clear steps from quote to delivery. You always know where your order stands.</p>
                  </div>
                  <div className="pb-6 border-b border-white/10">
                    <h4 className="text-gold-light font-semibold mb-2">Quality Verification</h4>
                    <p className="text-white/80">We inspect products and vehicles before shipping. No surprises on arrival.</p>
                  </div>
                  <div className="pb-6 border-b border-white/10">
                    <h4 className="text-gold-light font-semibold mb-2">Transparent Pricing</h4>
                    <p className="text-white/80">Full breakdown of costs upfront. No hidden fees or unexpected charges.</p>
                  </div>
                  <div>
                    <h4 className="text-gold-light font-semibold mb-2">End-to-End Support</h4>
                    <p className="text-white/80">From sourcing to delivery, we handle everything. You get a single point of contact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location / Reach */}
      <section className="py-20 lg:py-28 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
            <div className="order-2 lg:order-1 mt-12 lg:mt-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/hero-cargo-ship-aerial.jpg"
                  alt="US to Gambia shipping route"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm text-white/80">From</p>
                      <p className="font-bold text-lg">United States</p>
                    </div>
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="text-right">
                      <p className="text-sm text-white/80">To</p>
                      <p className="font-bold text-lg">The Gambia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">
                Our Reach
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                US Operations, Gambian Focus
              </h2>
              <p className="mt-6 text-gray-600 lg:text-lg leading-relaxed">
                Atlantic Bridge operates from the United States with a singular focus:
                serving buyers in The Gambia. We&apos;re positioned to access American suppliers,
                coordinate with US ports, and manage the export process efficiently.
              </p>
              <p className="mt-4 text-gray-600 lg:text-lg leading-relaxed">
                Our understanding of the Gambian market means we know what works, what&apos;s
                needed, and how to navigate the process. We&apos;re not a generic export company -
                we&apos;re built specifically for this route.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Based In</p>
                  <p className="font-bold text-navy">United States</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Serving</p>
                  <p className="font-bold text-navy">The Gambia</p>
                </div>
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
              Ready to Work With Us?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Whether you need products, vehicles, or bulk goods from the US,
              we&apos;re here to help. Tell us what you need and let&apos;s get started.
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
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <h3 className="text-xl font-bold text-navy text-center mb-8">Explore Our Services</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/services/product-sourcing"
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="text-navy font-semibold group-hover:text-gold transition-colors">
                Product Sourcing
              </span>
            </Link>
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
