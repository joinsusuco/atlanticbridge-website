import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/product-sourcing",
  },
  title: "Buy & Import Products from USA to Gambia | Kalajulas Xpress",
  description:
    "Import furniture, appliances, and electronics from America to Gambia. Buy from US suppliers with shipping to Banjul. Quality products delivered to West Africa.",
  openGraph: {
    title: "Import Products from USA to Gambia | Kalajulas Xpress",
    description:
      "Buy furniture, appliances, and electronics from USA. Import to Gambia with reliable shipping to Banjul.",
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

export default function ProductSourcingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
