"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "What types of products can you source from the US?",
    answer:
      "We source a wide range of products including furniture, appliances, electronics, household goods, business equipment, and bulk inventory for resellers. If it's available in the US market, we can likely help you procure it.",
  },
  {
    question: "How long does shipping to The Gambia typically take?",
    answer:
      "Shipping times vary depending on the type of goods and shipping method. Container shipments typically take 5-7 weeks from US port departure to arrival in Banjul. We provide estimated timelines with every quote.",
  },
  {
    question: "Do you handle customs clearance?",
    answer:
      "We coordinate the export documentation and shipping logistics from the US side. For customs clearance in The Gambia, we can connect you with trusted local clearing agents or work with your preferred agent.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers and other secure payment methods. Payment terms are outlined clearly in each quote, typically requiring a deposit to initiate procurement and the balance before shipping.",
  },
];

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="px-6 sm:px-8 lg:px-6 xl:px-8 2xl:px-[7.5%]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-start">
          {/* Left Side - Header + Image */}
          <div className="lg:sticky lg:top-32">
            <span className="text-gold-dark font-bold tracking-wider uppercase text-base">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Common Questions
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg">
              Quick answers to help you understand how Atlantic Bridge works.
            </p>

            {/* Image */}
            <div className="mt-10 hidden lg:block">
              <div className="relative max-w-[594px] aspect-[594/376] overflow-hidden rounded-2xl">
                <Image
                  src="/fake.jpg"
                  alt="Package delivery"
                  fill
                  sizes="594px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div className="mt-10 lg:mt-0">
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-navy text-lg lg:text-xl pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index
                          ? "bg-gold text-navy rotate-180"
                          : "bg-gray-100 text-gray-500"
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
                      openIndex === index ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 lg:px-8 pb-6 lg:pb-8 text-gray-600 text-base lg:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All FAQs Button */}
            <Link
              href="/faq"
              className="inline-flex items-center mt-8 px-6 py-3 text-base font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all group"
            >
              View All FAQs
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
          </div>
        </div>
      </div>
    </section>
  );
}
