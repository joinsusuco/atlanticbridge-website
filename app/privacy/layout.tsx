import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },
  title: "Privacy Policy | Kalajulas Xpress",
  description:
    "Read the Kalajulas Xpress Privacy Policy covering information collection, use, communications, data retention, and customer rights.",
  openGraph: {
    title: "Privacy Policy | Kalajulas Xpress",
    description:
      "Kalajulas Xpress Privacy Policy for quote requests, contact submissions, newsletter subscriptions, and related website activity.",
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
