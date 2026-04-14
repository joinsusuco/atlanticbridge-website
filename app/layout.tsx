import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import FloatingDepartureBannerWrapper from "@/components/FloatingDepartureBannerWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atlanticbridgeus.com"),
  alternates: {
    canonical: "/",
  },
  title: "Atlantic Bridge | Ship to Gambia from USA - Vehicles, Products & Cargo",
  description:
    "Ship to Gambia from USA. Export vehicles, products, and cargo to Banjul. Buy American cars, furniture, and bulk goods with reliable shipping to West Africa.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Atlantic Bridge | Ship to Gambia from USA",
    description:
      "Ship cars, products, and cargo from USA to Gambia. Export vehicles to Banjul with reliable West Africa shipping services.",
    url: "https://atlanticbridgeus.com",
    siteName: "Atlantic Bridge",
    images: [
      {
        url: "https://atlanticbridgeus.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlantic Bridge - US to Gambia Sourcing & Export",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Bridge | Ship to Gambia from USA",
    description:
      "Ship cars, products, and cargo from USA to Gambia. Export to Banjul with reliable West Africa shipping.",
    images: ["https://atlanticbridgeus.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atlantic Bridge",
  url: "https://atlanticbridgeus.com",
  logo: "https://atlanticbridgeus.com/logo.svg",
  description:
    "US-based sourcing and export company connecting American supply with Gambian demand.",
  email: "info@atlanticbridgeus.com",
  sameAs: [],
  serviceArea: {
    "@type": "Place",
    name: "The Gambia",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sourcing & Shipping Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Sourcing",
          description: "Furniture, appliances, and goods from US suppliers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bulk Purchasing",
          description: "Food staples, retail stock, and wholesale supply",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vehicle Procurement",
          description: "Cars, trucks, and heavy equipment from US dealers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vehicle Shipping",
          description: "RoRo and container shipping to The Gambia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cargo Shipping",
          description: "Freight forwarding from USA to The Gambia",
        },
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} antialiased`}
    >
      <head>
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CursorFollower />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingDepartureBannerWrapper />
      </body>
    </html>
  );
}
