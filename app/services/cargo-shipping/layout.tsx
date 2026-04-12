import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/cargo-shipping",
  },
  title: "Cargo Shipping from USA to Gambia | Freight to Banjul | Atlantic Bridge",
  description:
    "Ship cargo from USA to Gambia. Freight forwarding to Banjul port. LCL and container shipping to West Africa. Reliable cargo export services.",
  openGraph: {
    title: "Cargo Shipping USA to Gambia | Atlantic Bridge",
    description:
      "Ship freight and cargo from USA to Gambia. Export to Banjul, West Africa.",
  },
};

export default function CargoShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
