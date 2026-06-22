import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/vehicle-shipping",
  },
  title: "Ship Car from USA to Gambia | RoRo & Container | Kalajulas Xpress",
  description:
    "Ship your car from USA to Gambia. Export vehicles to Banjul via RoRo or container shipping. Affordable car shipping to West Africa with customs support.",
  openGraph: {
    title: "Ship Car from USA to Gambia | Kalajulas Xpress",
    description:
      "Export your vehicle from USA to Gambia. RoRo and container shipping to Banjul port.",
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

export default function VehicleShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
