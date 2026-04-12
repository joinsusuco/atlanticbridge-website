"use client";

import Image from "next/image";
import Link from "next/link";
import { shippingSchedule } from "@/config/shipping-schedule";

interface DepartureBannerProps {
  variant?: "full" | "compact";
}

export default function DepartureBanner({ variant = "full" }: DepartureBannerProps) {
  if (!shippingSchedule.showBanner) return null;

  if (variant === "compact") {
    return (
      <div className="bg-navy rounded-2xl overflow-hidden border border-white/10">
        <div className="p-6 lg:p-8">
          <h3 className="text-gold font-bold tracking-wider uppercase text-sm mb-4">
            Next Ocean Departure
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Departure</span>
              <span className="text-white font-bold">{shippingSchedule.departureDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Est. Arrival</span>
              <span className="text-white font-bold">{shippingSchedule.arrivalDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Book By</span>
              <span className="text-gold font-bold">{shippingSchedule.bookingDeadline}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy rounded-2xl overflow-hidden">
      <div className="lg:grid lg:grid-cols-5">
        {/* Content */}
        <div className="lg:col-span-3 p-8 lg:p-10 xl:p-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Next Ocean Departure
            </h2>
            <span className="text-2xl">🇬🇲</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-white/70 font-semibold w-36 lg:w-44">DEPARTURE DATE</span>
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold text-lg lg:text-xl">{shippingSchedule.departureDate}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/70 font-semibold w-36 lg:w-44">ARRIVAL DATE</span>
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold text-lg lg:text-xl">{shippingSchedule.arrivalDate}</span>
            </div>
          </div>

          <p className="mt-6 text-gold font-semibold">
            We must receive all shipments by {shippingSchedule.bookingDeadline}
          </p>
          <p className="mt-2 text-white/50 text-sm">
            Please note that all dates are estimated. We have no control of vessel schedule changes.
          </p>

          <Link
            href="/quote?service=vehicle-shipping"
            className="inline-flex items-center mt-8 px-8 py-4 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
          >
            Book Your Shipment
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Image - Hidden on mobile */}
        <div className="hidden lg:block lg:col-span-2 relative">
          <Image
            src="/Roro-transporting.jpg"
            alt="Vehicle shipping via RoRo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
