import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/quote",
  },
  title: "Get a Quote - Ship to Gambia from USA | Atlantic Bridge",
  description:
    "Get a free shipping quote to Gambia. Export cars, cargo, and products from USA to Banjul. Instant pricing for vehicle shipping and freight to West Africa.",
  openGraph: {
    title: "Get a Quote | Ship to Gambia from USA",
    description:
      "Free quote for shipping cars, cargo, and products from USA to Gambia.",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
