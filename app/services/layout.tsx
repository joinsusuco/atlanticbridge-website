import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  title: "Shipping & Export Services to Gambia | Atlantic Bridge",
  description:
    "Ship to Gambia from USA. Vehicle export, cargo shipping, product sourcing, and bulk import services. Reliable shipping to Banjul, West Africa.",
  openGraph: {
    title: "Shipping & Export Services to Gambia | Atlantic Bridge",
    description:
      "Ship cars, cargo, and products from USA to Gambia. Export services to Banjul, West Africa.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
