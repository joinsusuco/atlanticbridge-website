import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services/gp-shipping",
  },
  title: "GP Shipping Seattle to Senegal & Gambia | Grand Passager | Kalajulas Xpress",
  description:
    "Consolidated parcel shipping (GP/groupage) between Seattle and West Africa. Send parcels to Senegal and Gambia. Affordable two-way shipping service.",
  openGraph: {
    title: "GP Shipping Seattle to Senegal & Gambia | Kalajulas Xpress",
    description:
      "Consolidated parcel shipping between Seattle and West Africa. Affordable two-way GP service to Senegal and Gambia.",
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

export default function GPShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
