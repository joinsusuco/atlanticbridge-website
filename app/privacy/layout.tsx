import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },
  title: "Privacy Policy | Atlantic Bridge",
  description:
    "Read the Atlantic Bridge Privacy Policy covering information collection, use, communications, data retention, and customer rights.",
  openGraph: {
    title: "Privacy Policy | Atlantic Bridge",
    description:
      "Atlantic Bridge Privacy Policy for quote requests, contact submissions, newsletter subscriptions, and related website activity.",
    images: [
      {
        url: "https://atlanticbridgeus.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlantic Bridge - US to Gambia Sourcing & Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://atlanticbridgeus.com/og-image.png"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
