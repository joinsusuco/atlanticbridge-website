import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/product-sourcing",
  },
  title: "Buy & Import Products from USA to Gambia | Atlantic Bridge",
  description:
    "Import furniture, appliances, and electronics from America to Gambia. Buy from US suppliers with shipping to Banjul. Quality products delivered to West Africa.",
  openGraph: {
    title: "Import Products from USA to Gambia | Atlantic Bridge",
    description:
      "Buy furniture, appliances, and electronics from USA. Import to Gambia with reliable shipping to Banjul.",
  },
};

export default function ProductSourcingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
