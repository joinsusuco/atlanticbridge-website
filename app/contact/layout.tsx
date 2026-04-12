import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact Us | Ship to Gambia from USA | Atlantic Bridge",
  description:
    "Contact Atlantic Bridge for shipping to Gambia. Questions about exporting cars, cargo, or products from USA to Banjul? Get a response within 24 hours.",
  openGraph: {
    title: "Contact Atlantic Bridge | USA to Gambia Shipping",
    description:
      "Contact us about shipping from USA to Gambia. Cars, cargo, and products to Banjul.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
