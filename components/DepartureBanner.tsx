"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShippingSchedule } from "@/config/shipping-schedule";
import { defaultContainerSchedule, defaultGPSchedule } from "@/config/shipping-schedule";

interface DepartureBannerProps {
  variant?: "full" | "compact";
}

export default function DepartureBanner({ variant = "full" }: DepartureBannerProps) {
  const [container, setContainer] = useState<ShippingSchedule>(defaultContainerSchedule);
  const [gp, setGp] = useState<ShippingSchedule>(defaultGPSchedule);

  useEffect(() => {
    fetch("/api/schedules")
      .then((res) => res.json())
      .then((data) => {
        if (data.container) setContainer(data.container);
        if (data.gp) setGp(data.gp);
      })
      .catch(() => {});
  }, []);

  const showContainer = container.show_banner;
  const showGP = gp.show_banner;

  if (!showContainer && !showGP) return null;

  if (variant === "compact") {
    return (
      <div className="space-y-4">
        {showContainer && (
          <div className="bg-navy rounded-2xl overflow-hidden border border-white/10 p-6 lg:p-8">
            <h3 className="text-gold-light font-bold tracking-wider uppercase text-sm mb-4">
              Container Shipping
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Departure</span>
                <span className="text-white font-bold">{container.departure_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Est. Arrival</span>
                <span className="text-white font-bold">{container.arrival_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Book By</span>
                <span className="text-gold-light font-bold">{container.booking_deadline}</span>
              </div>
            </div>
          </div>
        )}
        {showGP && (
          <div className="bg-navy rounded-2xl overflow-hidden border border-white/10 p-6 lg:p-8">
            <h3 className="text-gold-light font-bold tracking-wider uppercase text-sm mb-4">
              GP Shipping (Parcels)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Departure</span>
                <span className="text-white font-bold">{gp.departure_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Est. Arrival</span>
                <span className="text-white font-bold">{gp.arrival_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Book By</span>
                <span className="text-gold-light font-bold">{gp.booking_deadline}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Container Shipping */}
      {showContainer && (
        <div className="bg-navy rounded-2xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 lg:p-10 xl:p-12">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Next Container Departure
                </h2>
                <span className="text-2xl">🇬🇲</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-white/85 font-semibold w-36 lg:w-44">DEPARTURE DATE</span>
                  <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-lg lg:text-xl">{container.departure_date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/85 font-semibold w-36 lg:w-44">ARRIVAL DATE</span>
                  <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-lg lg:text-xl">{container.arrival_date}</span>
                </div>
              </div>

              <p className="mt-6 text-gold-light font-semibold">
                We must receive all shipments by {container.booking_deadline}
              </p>
              <p className="mt-2 text-white/75 text-sm">
                {container.departure_port} to {container.arrival_port}. Dates are estimated.
              </p>

              <Link
                href="/quote?service=cargo-shipping"
                className="inline-flex items-center mt-8 px-8 py-4 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Book Your Shipment
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="hidden lg:block lg:col-span-2 relative">
              <Image
                src="/Roro-transporting.jpg"
                alt="Container shipping"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* GP Shipping */}
      {showGP && (
        <div className="bg-navy rounded-2xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 lg:p-10 xl:p-12">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Next GP Departure
                </h2>
                <span className="text-2xl">🇸🇳 🇬🇲</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-white/85 font-semibold w-36 lg:w-44">DEPARTURE DATE</span>
                  <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-lg lg:text-xl">{gp.departure_date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/85 font-semibold w-36 lg:w-44">ARRIVAL DATE</span>
                  <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-lg lg:text-xl">{gp.arrival_date}</span>
                </div>
              </div>

              <p className="mt-6 text-gold-light font-semibold">
                Drop off parcels by {gp.booking_deadline}
              </p>
              <p className="mt-2 text-white/75 text-sm">
                {gp.departure_port} to {gp.arrival_port}. Consolidated parcel shipping.
              </p>

              <Link
                href="/quote?service=gp-shipping"
                className="inline-flex items-center mt-8 px-8 py-4 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
              >
                Send a Parcel
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="hidden lg:block lg:col-span-2 relative">
              <Image
                src="/fake.jpg"
                alt="GP parcel shipping"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
