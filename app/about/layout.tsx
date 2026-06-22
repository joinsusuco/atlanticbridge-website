import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About Kalajulas Xpress | USA to Gambia Shipping Company",
  description:
    "About Kalajulas Xpress - your trusted partner for shipping from USA to Gambia. Export vehicles, cargo, and products to Banjul with a reliable US-based company.",
  openGraph: {
    title: "About Kalajulas Xpress | USA to Gambia Shipping",
    description:
      "Trusted shipping company for exports from USA to Gambia. Vehicles, cargo, and products to Banjul.",
    images: [
      {
        url: "https://kalajulasxpress.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kalajulas Xpress - US to Gambia Sourcing & Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://kalajulasxpress.com/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
