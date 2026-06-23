"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ShippingSchedule } from "@/config/shipping-schedule";
import { defaultContainerSchedule, defaultGPSchedule } from "@/config/shipping-schedule";

interface DepartureBannerProps {
  variant?: "full" | "compact";
}

export default function DepartureBanner({ variant = "full" }: DepartureBannerProps) {
  const [container, setContainer] = useState<ShippingSchedule>(defaultContainerSchedule);
  const [gp, setGp] = useState<ShippingSchedule>(defaultGPSchedule);
  const [activeTab, setActiveTab] = useState<"container" | "gp">("container");

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

  const active = activeTab === "container" ? container : gp;
  const hasBothTabs = showContainer && showGP;

  // Default to whichever is visible if only one
  useEffect(() => {
    if (!showContainer && showGP) setActiveTab("gp");
    if (showContainer && !showGP) setActiveTab("container");
  }, [showContainer, showGP]);

  if (variant === "compact") {
    return (
      <div className="bg-navy rounded-2xl overflow-hidden border border-white/10 p-6 lg:p-8">
        {hasBothTabs && (
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setActiveTab("container")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "container"
                  ? "bg-gold text-navy"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Container
            </button>
            <button
              onClick={() => setActiveTab("gp")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "gp"
                  ? "bg-gold text-navy"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              GP Parcels
            </button>
          </div>
        )}
        <h3 className="text-gold-light font-bold tracking-wider uppercase text-sm mb-4">
          {activeTab === "container" ? "Container Shipping" : "GP Shipping"}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Departure</span>
            <span className="text-white font-bold">{active.departure_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Est. Arrival</span>
            <span className="text-white font-bold">{active.arrival_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Book By</span>
            <span className="text-gold-light font-bold">{active.booking_deadline}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy rounded-2xl overflow-hidden">
      <div className="p-8 lg:p-10 xl:p-12">
        {/* Tabs */}
        {hasBothTabs && (
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("container")}
              className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all ${
                activeTab === "container"
                  ? "bg-gold text-navy"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Container Shipping
            </button>
            <button
              onClick={() => setActiveTab("gp")}
              className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all ${
                activeTab === "gp"
                  ? "bg-gold text-navy"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              GP Shipping (Parcels)
            </button>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left: Dates */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                {activeTab === "container" ? "Next Container Departure" : "Next GP Departure"}
              </h2>
              <span className="text-2xl">{activeTab === "container" ? "🇬🇲" : "🇸🇳 🇬🇲"}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-white/85 font-semibold w-36 lg:w-44">DEPARTURE DATE</span>
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-bold text-lg lg:text-xl">{active.departure_date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/85 font-semibold w-36 lg:w-44">ARRIVAL DATE</span>
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-bold text-lg lg:text-xl">{active.arrival_date}</span>
              </div>
            </div>

            <p className="mt-6 text-gold-light font-semibold">
              {activeTab === "container"
                ? `We must receive all shipments by ${active.booking_deadline}`
                : `Drop off parcels by ${active.booking_deadline}`}
            </p>
            <p className="mt-2 text-white/75 text-sm">
              {active.departure_port} to {active.arrival_port}. Dates are estimated.
            </p>

            <Link
              href={activeTab === "container" ? "/quote?service=cargo-shipping" : "/quote?service=gp-shipping"}
              className="inline-flex items-center mt-8 px-8 py-4 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group"
            >
              {activeTab === "container" ? "Book Your Shipment" : "Send a Parcel"}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Route visual */}
          <div className="hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm">{active.departure_port}</p>
                  <p className="text-white/50 text-xs mt-1">Departure</p>
                </div>

                <div className="flex-1 mx-6 relative">
                  <div className="border-t-2 border-dashed border-gold/40" />
                  <svg className="w-5 h-5 text-gold absolute right-0 -top-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm">{active.arrival_port}</p>
                  <p className="text-white/50 text-xs mt-1">Destination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
