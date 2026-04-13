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
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
