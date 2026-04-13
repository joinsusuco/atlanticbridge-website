import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About Atlantic Bridge | USA to Gambia Shipping Company",
  description:
    "About Atlantic Bridge - your trusted partner for shipping from USA to Gambia. Export vehicles, cargo, and products to Banjul with a reliable US-based company.",
  openGraph: {
    title: "About Atlantic Bridge | USA to Gambia Shipping",
    description:
      "Trusted shipping company for exports from USA to Gambia. Vehicles, cargo, and products to Banjul.",
    images: [
      {
        url: "https://atlanticbridgeus.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlantic Bridge - US to Gambia Sourcing & Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://atlanticbridgeus.com/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
