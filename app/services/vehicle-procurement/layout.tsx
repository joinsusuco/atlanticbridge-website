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
  },
};

export default function VehicleProcurementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
