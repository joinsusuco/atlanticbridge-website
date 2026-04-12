import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/vehicle-shipping",
  },
  title: "Ship Car from USA to Gambia | RoRo & Container | Atlantic Bridge",
  description:
    "Ship your car from USA to Gambia. Export vehicles to Banjul via RoRo or container shipping. Affordable car shipping to West Africa with customs support.",
  openGraph: {
    title: "Ship Car from USA to Gambia | Atlantic Bridge",
    description:
      "Export your vehicle from USA to Gambia. RoRo and container shipping to Banjul port.",
  },
};

export default function VehicleShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
