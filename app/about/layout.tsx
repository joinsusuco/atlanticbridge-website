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
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
