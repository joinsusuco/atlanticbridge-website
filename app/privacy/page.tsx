import Link from "next/link";

const lastUpdated = "April 12, 2026";

const sections = [
  {
    title: "1. Scope",
    content: [
      "This Privacy Policy explains how Atlantic Bridge collects, uses, stores, and discloses information when you visit our website, request a quote, contact us, subscribe to our newsletter, communicate with us, or otherwise engage with our services.",
      "This policy applies to information collected through the Atlantic Bridge website and related communications. It does not apply to third-party websites, platforms, payment providers, shipping carriers, customs authorities, or other services that we do not control.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "We may collect contact information such as your name, email address, phone number, country, and communication preferences.",
      "We may collect request and transaction-related information such as the service you are interested in, shipment details, vehicle or product details, budgets, timelines, notes, and other information you provide when requesting a quote or contacting us.",
      "We may collect photos and images you voluntarily upload when requesting a quote. These images are stored securely in private cloud storage and are used solely to assist in providing accurate quotes and service assessments. Photos may contain metadata such as location information, device details, or timestamps embedded by your device. We recommend reviewing and removing sensitive metadata before uploading if privacy is a concern.",
      "We may collect technical and usage information such as IP address, browser and device information, user agent, and similar request metadata used for security, fraud prevention, and service administration.",
      "If you email us directly or if emails are forwarded to our business inbox, we may retain the contents of those communications and related header information for customer-service, operations, recordkeeping, and security purposes.",
      "We may collect newsletter subscription information, including your email address, subscription status, source of signup, and related communication metadata.",
    ],
  },
  {
    title: "3. How We Use Information",
    content: [
      "We use information to respond to quote requests, provide sourcing or shipping information, prepare proposals, communicate with customers, manage inquiries, and operate our business.",
      "We use information to administer the website, improve user experience, monitor system performance, prevent abuse, investigate suspicious activity, and protect our business, users, and partners.",
      "We may use your contact information to send service-related communications, responses to your inquiries, transactional updates, and newsletter or marketing communications where you have requested or consented to receive them.",
      "We may use information to enforce our Terms, comply with legal obligations, establish or defend legal claims, and maintain business records.",
    ],
  },
  {
    title: "4. Legal Bases and Business Purpose",
    content: [
      "Where applicable, we process information because it is necessary to take steps at your request before entering into a business relationship, to perform our contractual and operational obligations, to comply with legal requirements, or to pursue legitimate business interests such as fraud prevention, quote administration, customer communications, and service improvement.",
      "If consent is required for a particular communication or use, we rely on that consent where provided.",
    ],
  },
  {
    title: "5. How We Share Information",
    content: [
      "We do not sell personal information for money. We may disclose information to service providers and business partners that help us operate the website and our business, including website hosting providers, email and communications vendors, cloud database/storage providers, and other operational vendors.",
      "We may share information with shipping lines, freight providers, customs agents, clearing agents, logistics partners, insurers, payment providers, legal advisors, and other third parties where reasonably necessary to evaluate, quote, arrange, administer, or support a requested service.",
      "We may disclose information when required by law, subpoena, court order, regulatory request, or when we believe disclosure is reasonably necessary to protect rights, property, safety, systems, or business operations.",
      "In the event of a merger, acquisition, financing, sale, reorganization, or other transfer of some or all business assets, information may be transferred as part of that transaction, subject to applicable law.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain information for as long as reasonably necessary for the purposes described in this policy, including quote administration, customer support, recordkeeping, legal compliance, dispute resolution, fraud prevention, and enforcement of our agreements.",
      "The precise retention period depends on the type of information, the nature of the request or transaction, operational needs, and applicable legal requirements.",
    ],
  },
  {
    title: "7. Cookies and Similar Technologies",
    content: [
      "We may use basic website technologies necessary to operate the site, secure forms, maintain performance, and understand technical usage patterns. We do not promise that every browser or device interaction will be cookie-free.",
      "If we add analytics, advertising, or similar tracking technologies in the future, we may update this Privacy Policy and any related notices accordingly.",
    ],
  },
  {
    title: "8. Security",
    content: [
      "We use reasonable administrative, technical, and organizational measures intended to protect information against unauthorized access, loss, misuse, alteration, or disclosure. However, no method of transmission, storage, or internet-based processing is completely secure, and we do not guarantee absolute security.",
      "You are responsible for using caution when sending information online and for avoiding unnecessary disclosure of highly sensitive data through website forms unless specifically requested by us through a secure workflow.",
    ],
  },
  {
    title: "9. Sensitive and Health-Related Information",
    content: [
      "Our website and standard quote/contact workflows are not intended to solicit sensitive personal information, such as health information, government identification numbers, financial account credentials, or other data that is not reasonably necessary for a shipping or sourcing inquiry.",
      "Please do not submit sensitive or health-related information through general website forms unless we specifically request it for a defined operational purpose and provide appropriate instructions.",
    ],
  },
  {
    title: "10. Children",
    content: [
      "Our website and services are intended for adults and business users, not children under 13. We do not knowingly collect personal information from children under 13 through this website. If you believe a child has submitted information to us, contact us so we can review and address the matter.",
    ],
  },
  {
    title: "11. International and Cross-Border Use",
    content: [
      "Atlantic Bridge operates in a cross-border business context involving the United States and The Gambia. Information may be processed, accessed, or stored in the United States or other jurisdictions where our vendors or service providers operate.",
      "By using the website or submitting information to us, you understand that your information may be transferred to and processed in jurisdictions that may have data protection rules different from those in your location.",
    ],
  },
  {
    title: "12. Your Choices and Rights",
    content: [
      "You may contact us to request that we update or correct certain information you have provided to us.",
      "You may unsubscribe from marketing or newsletter communications by following the unsubscribe instructions in the message or by contacting us directly.",
      "Depending on where you live, you may have legal rights relating to access, correction, deletion, portability, objection, appeal, or restriction. Those rights are subject to legal exceptions, verification requirements, and operational limitations.",
      "To submit a privacy-related request, contact us using the information below. We may require reasonable verification before acting on a request, and we may deny or limit requests where permitted by law.",
    ],
  },
  {
    title: "13. Nevada, California, and Other State Disclosures",
    content: [
      "Residents of certain states may have additional privacy rights under applicable law. Where those laws apply, we will process qualifying requests in accordance with applicable legal requirements and available exemptions.",
      "Nothing in this policy is intended to waive any right, defense, exemption, or limitation available to Atlantic Bridge under applicable law.",
    ],
  },
  {
    title: "14. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective or last-updated date. Continued use of the website after changes are posted indicates acceptance of the updated policy to the extent permitted by law.",
    ],
  },
  {
    title: "15. Contact Us",
    content: [
      "If you have questions about this Privacy Policy or want to submit a privacy-related request, contact Atlantic Bridge at info@atlanticbridgeus.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-logistics-multimodal.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/85" />

        <div className="relative px-6 sm:px-8 lg:px-6 xl:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              Privacy Policy
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              This policy explains how Atlantic Bridge collects, uses, protects, and shares
              information in connection with our website, quotes, communications, and related
              services.
            </p>
            <p className="mt-4 text-white/75 text-sm">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="px-6 sm:px-8 lg:px-6 xl:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
              <div className="mb-10 p-6 rounded-2xl bg-navy/5 border border-navy/10">
                <p className="text-sm text-gray-700 leading-7">
                  This policy is designed to describe our current website and business practices in
                  good faith. It is not legal advice to you, and your rights may vary depending on
                  your location and the nature of your interaction with Atlantic Bridge.
                </p>
              </div>

              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.content.map((paragraph) => (
                        <p key={paragraph} className="text-gray-700 leading-8">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-navy font-bold hover:bg-gold-light transition-all"
                >
                  View Terms &amp; Conditions
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all"
                >
                  Contact Atlantic Bridge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
