import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/bulk-purchasing",
  },
  title: "Bulk Import & Wholesale Shipping to Gambia | Atlantic Bridge",
  description:
    "Import bulk goods from USA to Gambia. Wholesale food, retail stock, and commercial products shipped to Banjul. Container shipping to West Africa.",
  openGraph: {
    title: "Bulk Import to Gambia from USA | Atlantic Bridge",
    description:
      "Wholesale bulk shipping from USA to Gambia. Import food and retail goods to Banjul.",
  },
};

export default function BulkPurchasingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
