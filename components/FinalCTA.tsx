"use client";

import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

export default function FinalCTA() {
  const isMaximized = useIsMaximized();

  return (
    <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/gallery-maersk-container.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/90" />

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative px-2 sm:px-4 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Source from the US?
          </h2>
          <p className="mt-6 text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">
            Tell us what you need. Whether it's a vehicle, bulk goods, or specific products,
            we'll provide a clear quote and handle the rest.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
            >
              Request a Quote
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
  );
}
