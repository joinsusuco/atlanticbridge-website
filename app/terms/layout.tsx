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
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
