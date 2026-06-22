import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/bulk-purchasing",
  },
  title: "Bulk Import & Wholesale Shipping to Gambia | Kalajulas Xpress",
  description:
    "Import bulk goods from USA to Gambia. Wholesale food, retail stock, and commercial products shipped to Banjul. Container shipping to West Africa.",
  openGraph: {
    title: "Bulk Import to Gambia from USA | Kalajulas Xpress",
    description:
      "Wholesale bulk shipping from USA to Gambia. Import food and retail goods to Banjul.",
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

export default function BulkPurchasingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
