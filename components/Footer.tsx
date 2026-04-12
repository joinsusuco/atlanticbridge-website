"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];


export default function Footer() {
  const isMaximized = useIsMaximized();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToPrivacy) {
      setErrorMessage("Please agree to the Privacy Policy");
      setSubscribeStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "footer",
          website: "", // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubscribeStatus("success");
      setEmail("");
      setAgreedToPrivacy(false);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscribeStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-logistics-multimodal.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/95" />

      {/* Main Footer Content */}
      <div className="relative">
        <div className="py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Atlantic Bridge"
                  width={60}
                  height={60}
                  className="w-14 h-14 object-contain"
                />
                <span className="text-xl font-bold text-gold">
                  Atlantic Bridge
                </span>
              </Link>
              <p className="mt-4 text-white/60 text-base leading-relaxed">
                Connecting US supply with Gambian demand. Sourcing products, vehicles, and bulk goods through a structured, reliable process.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/50 text-base mb-1">Address:</p>
                  <p className="text-white/80 text-base">
                    United States
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-base mb-1">Phone:</p>
                  <a
                    href="tel:+12025551234"
                    className="text-white/80 text-base hover:text-gold transition-colors"
                  >
                    +1 (202) 555-1234
                  </a>
                </div>
                <div>
                  <p className="text-white/50 text-base mb-1">Email:</p>
                  <a
                    href="mailto:info@atlanticbridgeus.com"
                    className="text-white/80 text-base hover:text-gold transition-colors"
                  >
                    info@atlanticbridgeus.com
                  </a>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center text-white/70 hover:text-gold transition-colors text-base group"
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
                      <svg
                        className="w-4 h-4 mr-2 text-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Stay Updated</h3>
              <p className="text-white/60 text-base mb-4">
                Subscribe to get the latest updates on shipping and sourcing.
              </p>
              {subscribeStatus === "success" ? (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">
                    Thanks for subscribing!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-1 top-1 bottom-1 px-3 bg-gold hover:bg-gold-light rounded-md transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <svg className="w-5 h-5 text-navy animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-navy"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent text-gold focus:ring-gold focus:ring-offset-0"
                    />
                    <span className="text-white/50 text-xs">
                      I agree to the{" "}
                      <Link href="/privacy" className="underline hover:text-white">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {subscribeStatus === "error" && (
                    <p className="text-red-400 text-xs">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="py-6 px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm">
                Copyright © {currentYear} Atlantic Bridge. All Rights Reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/terms"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
