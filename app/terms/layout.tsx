import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/terms",
  },
  title: "Terms & Conditions | Atlantic Bridge",
  description:
    "Read the Atlantic Bridge Terms & Conditions governing website use, quote requests, service estimates, limitations of liability, and business terms.",
  openGraph: {
    title: "Terms & Conditions | Atlantic Bridge",
    description:
      "Atlantic Bridge Terms & Conditions for website use, quote requests, and related business services.",
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

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
