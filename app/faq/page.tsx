"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const faqCategories = [
  {
    id: "general",
    title: "General",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "products",
    title: "Product Sourcing",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: "vehicles",
    title: "Vehicles",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 9l2.5-5h9l4 5M3 9h18v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
  },
  {
    id: "shipping",
    title: "Shipping",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const faqs = [
  // General
  {
    category: "general",
    question: "What is Atlantic Bridge?",
    answer: "Atlantic Bridge is a US-based sourcing, procurement, and export company serving The Gambia. We help buyers access American products, vehicles, and bulk goods through a structured, transparent, and reliable process.",
  },
  {
    category: "general",
    question: "Where are you located?",
    answer: "We operate from the United States with a dedicated focus on serving buyers in The Gambia. Our US base allows us to directly access suppliers, manage procurement, and coordinate shipping efficiently.",
  },
  {
    category: "general",
    question: "Who do you serve?",
    answer: "We serve individuals, businesses, and organizations in The Gambia who need products, vehicles, or bulk goods from the United States. This includes homeowners, business owners, resellers, restaurants, and commercial buyers.",
  },
  {
    category: "general",
    question: "How do I get started?",
    answer: "Simply submit a quote request through our website. Tell us what you need - whether it's products, vehicles, or bulk goods - and we'll respond with a detailed quote including pricing, timeline, and next steps.",
  },
  {
    category: "general",
    question: "Do you offer support in local languages?",
    answer: "Yes, we can communicate in English and work with interpreters as needed. Our goal is to ensure clear communication throughout the process.",
  },

  // Product Sourcing
  {
    category: "products",
    question: "What types of products can you source?",
    answer: "We source a wide range of products including furniture, appliances, electronics, household goods, business equipment, building materials, and more. If it's available in the US market, we can likely help you procure it.",
  },
  {
    category: "products",
    question: "Can you source specific brands or models?",
    answer: "Yes, if you have specific brands, models, or exact products in mind, let us know. We'll search our supplier network to find exactly what you need, or suggest comparable alternatives if the specific item isn't available.",
  },
  {
    category: "products",
    question: "How do you ensure product quality?",
    answer: "We work with established US suppliers and retailers. Before shipping, we verify product condition and authenticity. For high-value items, we provide photo documentation and condition reports.",
  },
  {
    category: "products",
    question: "What's the minimum order for product sourcing?",
    answer: "There's no strict minimum, but shipping costs make it more economical to consolidate multiple items. We'll help you understand the cost-benefit analysis for any order size.",
  },
  {
    category: "products",
    question: "Can you source used or refurbished products?",
    answer: "Yes, we can source quality used and refurbished items, particularly electronics and appliances. We verify condition before purchase and clearly communicate the item's state in your quote.",
  },

  // Vehicles
  {
    category: "vehicles",
    question: "What types of vehicles can you procure?",
    answer: "We procure cars, SUVs, trucks, vans, and heavy equipment including construction machinery and agricultural vehicles. We source from dealers, auctions, private sellers, and fleet sales.",
  },
  {
    category: "vehicles",
    question: "Do you only work with clean titles?",
    answer: "Yes, we only procure vehicles with clean, exportable titles. We don't work with salvage, flood, or branded titles. This ensures your vehicle clears customs smoothly in The Gambia.",
  },
  {
    category: "vehicles",
    question: "Can you find a specific vehicle for me?",
    answer: "Yes, tell us the make, model, year range, mileage preference, and budget. We'll search our network and present options that match your criteria. We can also set up alerts for rare or specific vehicles.",
  },
  {
    category: "vehicles",
    question: "Do you inspect vehicles before purchase?",
    answer: "Yes, we arrange professional inspections for all vehicles before purchase. You'll receive a detailed condition report including any issues identified. This is included in our service.",
  },
  {
    category: "vehicles",
    question: "Can I ship a vehicle I already own in the US?",
    answer: "Absolutely. Our vehicle shipping service handles vehicles you already own or have purchased elsewhere. We manage export documentation, port handling, and shipping coordination.",
  },
  {
    category: "vehicles",
    question: "Do you ship non-running vehicles?",
    answer: "We only ship vehicles that are running and drivable. This is required for RoRo shipping and ensures safe loading and unloading at both ports.",
  },

  // Shipping
  {
    category: "shipping",
    question: "How long does shipping to The Gambia take?",
    answer: "Ocean freight from Seattle-Tacoma to Banjul typically takes 5-7 weeks. This varies based on shipping line schedules and any transit stops. We provide estimated timelines with every quote.",
  },
  {
    category: "shipping",
    question: "What shipping methods are available for vehicles?",
    answer: "We offer RoRo (Roll-on/Roll-off) for drivable vehicles - the most cost-effective option - and container shipping for maximum protection of high-value vehicles. We only ship running, drivable vehicles.",
  },
  {
    category: "shipping",
    question: "Which US ports do you ship from?",
    answer: "We ship from Seattle-Tacoma, Washington. Vehicles and goods are consolidated at our departure port for regular sailings to Banjul, The Gambia.",
  },
  {
    category: "shipping",
    question: "Do you handle customs clearance?",
    answer: "We handle all US export documentation and coordinate shipping logistics. For customs clearance in The Gambia, we can connect you with trusted local clearing agents or work with your preferred agent.",
  },
  {
    category: "shipping",
    question: "Is insurance included?",
    answer: "Basic marine insurance is included in our shipping quotes. Additional comprehensive coverage is available for high-value vehicles and products. We'll discuss options when preparing your quote.",
  },
  {
    category: "shipping",
    question: "Can I track my shipment?",
    answer: "Yes, we provide tracking information once your goods are shipped. You'll receive updates on vessel departure, transit progress, and estimated arrival. We also notify you when the shipment arrives in Banjul.",
  },

  // Payment
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer: "We accept bank wire transfers and other secure payment methods. All payment options are outlined in your quote. We don't accept cash or cryptocurrency at this time.",
  },
  {
    category: "payment",
    question: "Do you require a deposit?",
    answer: "Yes, we typically require a deposit to begin procurement (usually 50% of the total cost). The remaining balance is due before shipping. Exact terms are specified in each quote.",
  },
  {
    category: "payment",
    question: "When is full payment due?",
    answer: "Full payment is required before goods are shipped. We'll notify you when your order is ready to ship and provide instructions for the final payment.",
  },
  {
    category: "payment",
    question: "Are your prices in USD?",
    answer: "Yes, all our quotes and pricing are in US Dollars (USD). This allows for clear, consistent pricing across all transactions.",
  },
  {
    category: "payment",
    question: "What's included in your quotes?",
    answer: "Our quotes include product/vehicle cost, our service fee, export documentation, port handling, and ocean freight. We break down each cost clearly so there are no surprises. Import duties and local clearing costs in The Gambia are additional.",
  },
  {
    category: "payment",
    question: "Are there any hidden fees?",
    answer: "No. We believe in transparent pricing. All costs are itemized in your quote. If any unexpected costs arise during the process, we'll communicate them immediately and get your approval before proceeding.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isMaximized = useIsMaximized();

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(0);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/gallery-boxes-packages.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">
              FAQ
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Shipping to Gambia FAQ
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl leading-relaxed">
              How to ship cars, cargo, and products from USA to Banjul. Costs, timelines, and process explained.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeCategory === category.id
                          ? "bg-gold text-navy font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className={activeCategory === category.id ? "text-navy" : "text-gray-400"}>
                        {category.icon}
                      </span>
                      {category.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-bold text-navy mb-2">Still have questions?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Can't find what you're looking for? We're here to help.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-gold font-semibold text-sm hover:text-gold-dark transition-colors"
                  >
                    Contact Us
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3 mt-10 lg:mt-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-navy">
                  {faqCategories.find((c) => c.id === activeCategory)?.title}
                </h2>
                <span className="text-gray-400 text-sm">
                  {filteredFaqs.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-bold text-navy text-lg pr-4">
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          openIndex === index
                            ? "bg-gold text-navy rotate-180"
                            : "bg-white text-gray-500 border border-gray-200"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
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
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
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
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
              Have a specific request? Tell us what you need and we'll provide
              a detailed quote tailored to your requirements.
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
    </>
  );
}
