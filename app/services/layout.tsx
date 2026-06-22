import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  title: "Shipping & Export Services to Gambia | Kalajulas Xpress",
  description:
    "Ship to Gambia from USA. Vehicle export, cargo shipping, product sourcing, and bulk import services. Reliable shipping to Banjul, West Africa.",
  openGraph: {
    title: "Shipping & Export Services to Gambia | Kalajulas Xpress",
    description:
      "Ship cars, cargo, and products from USA to Gambia. Export services to Banjul, West Africa.",
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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
