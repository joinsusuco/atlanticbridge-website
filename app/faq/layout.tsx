import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/faq",
  },
  title: "FAQ - Shipping from USA to Gambia | Atlantic Bridge",
  description:
    "FAQ about shipping to Gambia from USA. How to ship cars, cargo, and products to Banjul. Costs, timelines, and export process to West Africa explained.",
  openGraph: {
    title: "FAQ - Shipping to Gambia from USA | Atlantic Bridge",
    description:
      "Common questions about shipping cars, cargo, and products from USA to Gambia.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Atlantic Bridge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atlantic Bridge is a US-based sourcing, procurement, and export company serving The Gambia. We help buyers access American products, vehicles, and bulk goods through a structured, transparent, and reliable process.",
      },
    },
    {
      "@type": "Question",
      name: "How long does shipping to The Gambia take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ocean freight from Seattle-Tacoma to Banjul typically takes 5-7 weeks. This varies based on shipping line schedules and any transit stops.",
      },
    },
    {
      "@type": "Question",
      name: "What types of vehicles can you procure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We procure cars, SUVs, trucks, vans, and heavy equipment including construction machinery and agricultural vehicles. We source from dealers, auctions, private sellers, and fleet sales.",
      },
    },
    {
      "@type": "Question",
      name: "What shipping methods are available for vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer RoRo (Roll-on/Roll-off) for drivable vehicles - the most cost-effective option - and container shipping for maximum protection of high-value vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept bank wire transfers and other secure payment methods. All payment options are outlined in your quote.",
      },
    },
    {
      "@type": "Question",
      name: "Do you require a deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we typically require a deposit to begin procurement (usually 50% of the total cost). The remaining balance is due before shipping.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle customs clearance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We handle all US export documentation and coordinate shipping logistics. For customs clearance in The Gambia, we can connect you with trusted local clearing agents.",
      },
    },
    {
      "@type": "Question",
      name: "What types of products can you source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We source a wide range of products including furniture, appliances, electronics, household goods, business equipment, building materials, and more.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
