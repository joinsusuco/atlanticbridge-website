import Link from "next/link";

const lastUpdated = "April 12, 2026";

const sections = [
  {
    title: "1. Agreement to These Terms",
    content: [
      "These Terms & Conditions govern your use of the Atlantic Bridge website and your interactions with us through this website. By accessing the website, submitting a quote request, contacting us, subscribing to communications, or otherwise using the site, you agree to these Terms.",
      "If you do not agree to these Terms, do not use the website.",
    ],
  },
  {
    title: "2. Business Scope",
    content: [
      "Atlantic Bridge provides information about sourcing, export support, vehicle procurement, vehicle shipping, cargo shipping, and related business services between the United States and The Gambia.",
      "Website content is provided for general business and informational purposes. Availability of any service depends on review, acceptance, operational feasibility, legal compliance, carrier availability, and any additional conditions Atlantic Bridge may require.",
    ],
  },
  {
    title: "3. No Binding Quote or Booking Through Website Alone",
    content: [
      "Submitting a quote request, contact form, or other inquiry through this website does not create a contract, booking, shipment commitment, procurement obligation, fiduciary relationship, or guarantee of service.",
      "Any quote, estimate, timeline, pricing, route, service scope, or availability information provided through the website or by email is preliminary unless and until Atlantic Bridge expressly confirms the arrangement in writing and any required deposit, documents, approvals, or other conditions are satisfied.",
    ],
  },
  {
    title: "4. User Responsibilities",
    content: [
      "You agree to provide accurate, complete, and current information. You are responsible for reviewing all quote details, shipment information, product or vehicle specifications, destination requirements, and contact information you provide to us.",
      "You agree not to submit unlawful, fraudulent, infringing, misleading, abusive, prohibited, or unsafe requests, content, goods, data, or instructions through this website.",
      "You are responsible for obtaining and maintaining rights, authority, and permissions necessary for any goods, products, vehicles, communications, instructions, or information you ask us to evaluate or handle.",
    ],
  },
  {
    title: "5. Prohibited Goods and Compliance",
    content: [
      "Atlantic Bridge may refuse, suspend, or cancel any inquiry, transaction, sourcing request, booking, or shipment that in our sole discretion presents legal, regulatory, customs, sanctions, fraud, payment, safety, reputational, operational, or documentation concerns.",
      "You may not use our website or services in connection with goods or conduct prohibited by applicable laws, regulations, export controls, carrier rules, customs restrictions, or sanctions requirements.",
      "Atlantic Bridge does not undertake to independently verify the legality of every item or transaction. Compliance responsibility remains with the customer, consignor, owner, purchaser, or other responsible party unless Atlantic Bridge expressly agrees otherwise in writing.",
    ],
  },
  {
    title: "6. Quotes, Pricing, Duties, and Fees",
    content: [
      "Quotes and price estimates may change due to supplier pricing, freight rates, documentation costs, handling costs, port conditions, carrier changes, fuel surcharges, exchange rates, taxes, duties, customs requirements, insurance, storage, inland transport, delays, or other factors outside Atlantic Bridge's control.",
      "Unless expressly stated otherwise in writing, quotes do not include import duties, local taxes, destination clearing charges, storage, demurrage, penalties, inspection fees, government charges, or destination-side expenses.",
      "Atlantic Bridge may revise or withdraw quotes before final written acceptance and payment confirmation.",
    ],
  },
  {
    title: "7. Payment and Deposits",
    content: [
      "Atlantic Bridge may require deposits, staged payments, documentary verification, cleared funds, or other preconditions before starting procurement, booking, export handling, or shipping-related work.",
      "Failure to make timely payment may result in delay, suspension, cancellation, additional charges, or release holds where permitted by law and contract.",
      "Unless otherwise stated in a written service agreement, deposits and amounts spent or committed on your behalf may be non-refundable once Atlantic Bridge has begun performance, procurement, booking, or supplier/carrier engagement.",
    ],
  },
  {
    title: "8. Timelines, Delays, and No Guaranteed Delivery Date",
    content: [
      "Shipping, procurement, export, and delivery timelines are estimates only. They are affected by suppliers, ports, shipping lines, customs, weather, congestion, labor issues, inspections, regulatory actions, route disruptions, documentation issues, and other external factors.",
      "Atlantic Bridge does not guarantee any exact delivery, departure, arrival, clearance, or release date unless expressly agreed in a separate written contract signed by an authorized representative.",
    ],
  },
  {
    title: "9. Third Parties",
    content: [
      "Atlantic Bridge may rely on or coordinate with suppliers, dealers, carriers, freight providers, customs brokers, clearing agents, warehouses, insurers, payment processors, software vendors, and other third parties.",
      "Atlantic Bridge is not responsible for acts, omissions, insolvency, service failures, interruptions, delays, price changes, or misconduct of third parties except to the extent required by non-waivable law or expressly assumed by written agreement.",
    ],
  },
  {
    title: "10. Website Content and No Professional Advice",
    content: [
      "Website content is provided on an informational basis only and may be updated, corrected, removed, or changed at any time without notice.",
      "Nothing on this website constitutes legal, tax, customs, insurance, financial, investment, compliance, or professional advice. You should consult your own advisors where appropriate.",
    ],
  },
  {
    title: "11. Intellectual Property",
    content: [
      "All website content, including branding, text, graphics, design elements, images, layouts, and other materials, is owned by Atlantic Bridge or used with permission and is protected by applicable intellectual property laws.",
      "You may not copy, reproduce, modify, distribute, republish, frame, scrape, or exploit website content for commercial purposes without prior written permission.",
    ],
  },
  {
    title: "12. Acceptable Use",
    content: [
      "You may not use the website in a way that interferes with site operation, attempts to gain unauthorized access, tests vulnerabilities without authorization, transmits malicious code, harvests data, impersonates another person, or submits spam or abusive requests.",
      "Atlantic Bridge may block, restrict, suspend, or terminate access to the website or any submission channel at any time in its sole discretion.",
    ],
  },
  {
    title: "13. Disclaimer of Warranties",
    content: [
      "The website and all website content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express, implied, statutory, or otherwise.",
      "To the fullest extent permitted by law, Atlantic Bridge disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, availability, security, and uninterrupted use.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, Atlantic Bridge and its owners, officers, employees, contractors, agents, affiliates, and service providers shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of profits, revenue, business opportunity, goodwill, data, or anticipated savings, arising out of or related to the website or any inquiry, quote, communication, shipment, sourcing activity, or related service.",
      "To the fullest extent permitted by law, if Atlantic Bridge is found liable for any claim arising out of or relating to the website alone, our aggregate liability shall not exceed the greater of one hundred U.S. dollars (US $100) or the amount you actually paid directly to Atlantic Bridge for the specific service giving rise to the claim.",
      "Nothing in these Terms excludes liability that cannot be excluded under applicable law.",
    ],
  },
  {
    title: "15. Indemnification",
    content: [
      "You agree to defend, indemnify, and hold harmless Atlantic Bridge and its owners, officers, employees, contractors, agents, affiliates, and service providers from and against claims, liabilities, damages, losses, costs, and expenses, including reasonable legal fees, arising out of or related to your use of the website, your submissions, your goods or requested transactions, your violation of these Terms, or your violation of any law or third-party rights.",
    ],
  },
  {
    title: "16. Termination and Suspension",
    content: [
      "Atlantic Bridge may suspend or terminate website access, communications, quote discussions, or prospective business engagement at any time, with or without notice, where we reasonably determine that continuing the interaction is not in our business, operational, legal, or security interests.",
    ],
  },
  {
    title: "17. Governing Law and Venue",
    content: [
      "These Terms are governed by the laws of the State of Washington, without regard to conflict-of-law principles.",
      "To the fullest extent permitted by law, any dispute arising out of or relating to these Terms or the website shall be brought exclusively in the state or federal courts located in Washington, and you consent to the jurisdiction and venue of those courts.",
    ],
  },
  {
    title: "18. Changes to These Terms",
    content: [
      "Atlantic Bridge may revise these Terms at any time by posting an updated version on this page. The updated Terms become effective when posted unless a later date is stated. Continued use of the website after the updated Terms are posted constitutes acceptance of the revised Terms to the extent permitted by law.",
    ],
  },
  {
    title: "19. Contact",
    content: [
      "Questions about these Terms may be directed to Atlantic Bridge at info@atlanticbridgeus.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/85" />

        <div className="relative px-6 sm:px-8 lg:px-6 xl:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              Terms &amp; Conditions
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              These Terms govern use of the Atlantic Bridge website, quote requests, and related
              interactions with our business.
            </p>
            <p className="mt-4 text-white/75 text-sm">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="px-6 sm:px-8 lg:px-6 xl:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
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
                  href="/privacy"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-navy font-bold hover:bg-gold-light transition-all"
                >
                  View Privacy Policy
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
