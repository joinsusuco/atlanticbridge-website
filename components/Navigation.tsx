"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  {
    href: "/services/product-sourcing",
    label: "Product Sourcing",
    description: "Furniture, appliances & goods",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    href: "/services/bulk-purchasing",
    label: "Bulk Purchasing",
    description: "Food staples, retail stock & wholesale supply",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    href: "/services/vehicle-procurement",
    label: "Vehicle Procurement",
    description: "Cars, trucks & machinery",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 9l2.5-5h9l4 5M3 9h18v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
  },
  {
    href: "/services/vehicle-shipping",
    label: "Vehicle Shipping",
    description: "Vehicle export to The Gambia",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m0 0L3 9m6-6l6 6M21 14l-3-3m0 0l-3 3m3-3v10" />
      </svg>
    ),
  },
  {
    href: "/services/cargo-shipping",
    label: "Cargo Shipping",
    description: "Freight forwarding to The Gambia",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy">
      <nav className="px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-[7.5%]">
        <div className="flex items-center justify-between h-[78px] sm:h-[88px] xl:h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 sm:gap-2 h-full min-w-0">
            <Image
              src="/logo.svg"
              alt="Atlantic Bridge"
              width={100}
              height={100}
              className="w-[58px] h-auto sm:w-[72px] sm:h-auto xl:w-[100px] xl:h-auto object-contain object-left flex-shrink-0 self-center"
              priority
            />
            <span
              className="text-[1.45rem] leading-none sm:text-3xl font-bold tracking-tight text-gold truncate"
            >
              Atlantic Bridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-bold tracking-wide transition-colors text-white hover:text-gold"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-lg font-bold tracking-wide transition-colors text-white hover:text-gold"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
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
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
                  isServicesOpen
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-4 scale-95"
                }`}
              >
                <div className="p-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl text-navy hover:bg-navy hover:text-white group transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors text-gold group-hover:text-white">
                        {service.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{service.label}</div>
                        <div className="text-sm text-gray-500 group-hover:text-white/70">
                          {service.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 p-3 bg-gray-50">
                  <Link
                    href="/services"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
                  >
                    View all services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-bold tracking-wide transition-colors text-white hover:text-gold"
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    const id = link.href.substring(2);
                    const element = document.getElementById(id);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Phone */}
          <div className="hidden xl:flex items-center gap-6">
            {/* Phone Contact - hidden until 2xl */}
            <div className="hidden 2xl:flex items-center gap-3">
              <a
                href="tel:+12064247818"
                className="w-12 h-12 rounded-lg bg-navy-light/50 border border-white/10 flex items-center justify-center hover:border-gold/50 transition-all duration-200"
              >
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-xs text-white/60 uppercase tracking-wide">Call Us</span>
                <a href="tel:+12064247818" className="text-white font-semibold hover:text-gold transition-colors">
                  +1 (206) 424-7818
                </a>
              </div>
            </div>

            {/* Divider - hidden until 2xl */}
            <div className="hidden 2xl:block h-10 w-px bg-white/20" />

            <Link
              href="/quote"
              className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Request a Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile/Tablet: CTA + Hamburger */}
          <div className="xl:hidden flex items-center gap-4">
            <Link
              href="/quote"
              className="hidden min-[980px]:inline-flex items-center px-4 py-2 text-sm font-bold rounded-full bg-gold text-navy hover:bg-gold-light transition-all duration-200"
            >
              Request a Quote
            </Link>
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-7 h-5 relative flex flex-col justify-between items-end">
                <span
                  className={`block h-0.5 bg-white transition-all duration-300 origin-right ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-[9px] -translate-x-[2px]" : "w-7"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gold transition-all duration-300 ${
                    isMobileMenuOpen ? "w-0 opacity-0" : "w-[85%]"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-all duration-300 origin-right ${
                    isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[9px] -translate-x-[2px]" : "w-7"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden fixed inset-0 top-0 bg-navy z-40 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.svg"
                alt="Atlantic Bridge"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-gold">
                Atlantic Bridge
              </span>
            </Link>
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col p-6 gap-2">
            <Link
              href="/"
              className="text-lg font-medium text-white py-3 border-b border-white/10 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-white/10">
              <button
                className="flex items-center justify-between w-full text-lg font-medium text-white py-3 hover:text-gold transition-colors"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isMobileServicesOpen ? "rotate-180" : ""
                  }`}
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
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isMobileServicesOpen ? "max-h-80" : "max-h-0"
                }`}
              >
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center gap-3 pl-4 py-3 text-white/80 hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-gold">{service.icon}</span>
                    <span>{service.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-white py-3 border-b border-white/10 hover:text-gold transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (link.href.startsWith("/#")) {
                    const id = link.href.substring(2);
                    setTimeout(() => {
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 300);
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-full bg-gold text-navy hover:bg-gold-light active:scale-95 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
