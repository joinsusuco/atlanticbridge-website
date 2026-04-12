"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { shippingSchedule } from "@/config/shipping-schedule";

export default function FloatingDepartureBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24); // 24px = bottom-6

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Find the divider (border-t element) in the footer
      const divider = footer.querySelector(".border-t");
      if (!divider) return;

      const dividerRect = divider.getBoundingClientRect();

      // If the divider is visible in viewport, push the banner up
      if (dividerRect.top < windowHeight) {
        const overlap = windowHeight - dividerRect.top + 24; // 24px margin above divider
        setBottomOffset(Math.max(24, overlap));
      } else {
        setBottomOffset(24);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!shippingSchedule.showBanner) return null;

  return (
    <div
      className="fixed right-6 z-40 transition-all duration-200"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {/* Expanded View */}
      <div
        className={`bg-navy rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-6 w-72">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gold font-bold text-sm uppercase tracking-wide">
                Next Departure
              </span>
              <span>🇬🇲</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Departure</span>
              <span className="text-white font-bold">{shippingSchedule.departureDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Est. Arrival</span>
              <span className="text-white font-bold">{shippingSchedule.arrivalDate}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-white/60 text-sm">Book By</span>
              <span className="text-gold font-bold">{shippingSchedule.bookingDeadline}</span>
            </div>
          </div>

          {/* Route */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">{shippingSchedule.departurePort}</span>
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-white/60">{shippingSchedule.arrivalPort.replace(", The Gambia", "")}</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/quote?service=vehicle-shipping"
            className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold rounded-full bg-gold text-navy hover:bg-gold-light transition-all"
          >
            Book Your Shipment
          </Link>

          {/* Disclaimer */}
          <p className="mt-3 text-white/40 text-xs text-center">
            Dates are estimated and subject to change
          </p>
        </div>
      </div>

      {/* Collapsed Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-3 bg-gold text-navy px-5 py-3 rounded-full shadow-lg hover:bg-gold-light hover:shadow-xl transition-all font-bold ${
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Next Departure: {shippingSchedule.departureDate}
      </button>
    </div>
  );
}
