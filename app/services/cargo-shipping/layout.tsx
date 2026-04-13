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

export default function CargoShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
