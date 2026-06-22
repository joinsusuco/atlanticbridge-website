import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/quote",
  },
  title: "Get a Quote - Ship to Gambia from USA | Kalajulas Xpress",
  description:
    "Get a free shipping quote to Gambia. Export cars, cargo, and products from USA to Banjul. Instant pricing for vehicle shipping and freight to West Africa.",
  openGraph: {
    title: "Get a Quote | Ship to Gambia from USA",
    description:
      "Free quote for shipping cars, cargo, and products from USA to Gambia.",
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

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
