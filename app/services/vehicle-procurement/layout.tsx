import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/vehicle-procurement",
  },
  title: "Buy American Cars & Import to Gambia | Atlantic Bridge",
  description:
    "Buy used cars from USA and ship to Gambia. Import American vehicles, trucks, and SUVs to Banjul. Affordable US cars for West Africa with inspection included.",
  openGraph: {
    title: "Buy American Cars for Gambia | Atlantic Bridge",
    description:
      "Buy cars from USA and import to Gambia. American vehicles shipped to Banjul, West Africa.",
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

export default function VehicleProcurementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
