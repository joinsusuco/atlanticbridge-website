"use client";

import { useIsMaximized } from "@/hooks/useIsMaximized";

const steps = [
  {
    number: "01",
    title: "Submit Your Request",
    description:
      "Tell us what you need, whether it is a product, bulk order, vehicle, or machinery request.",
  },
  {
    number: "02",
    title: "We Review and Quote",
    description:
      "We confirm sourcing or shipping details and provide a structured quote.",
  },
  {
    number: "03",
    title: "Procurement, Export & Shipping",
    description:
      "Once approved, we handle purchasing, documentation, export, and shipping coordination.",
  },
  {
    number: "04",
    title: "Arrival in The Gambia",
    description:
      "Your goods or vehicles arrive ready for pickup, release, or final handover.",
  },
];

export default function HowItWorks() {
  const isMaximized = useIsMaximized();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-navy relative scroll-mt-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/80" />
      <div
        className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold font-bold tracking-wider uppercase text-base">
            Our Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            How It Works
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            A clear, structured process from your first inquiry to final delivery.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 lg:mt-20">
          {/* Desktop: Horizontal timeline */}
          <div className="hidden lg:block">
            {/* Steps grid */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <>
                      {/* Background line */}
                      <div className="absolute top-8 left-1/2 w-full h-0.5 bg-white/20" />
                      {/* Gold progress line - first half of steps */}
                      {index < 2 && (
                        <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gold" />
                      )}
                    </>
                  )}

                  {/* Number circle */}
                  <div className={`w-16 h-16 rounded-full bg-navy border-2 flex items-center justify-center mx-auto relative z-10 ${
                    index <= 2 ? "border-gold" : "border-white/30"
                  }`}>
                    <span className={`font-bold text-lg ${index <= 2 ? "text-gold" : "text-white/50"}`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mt-6">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                {/* Number + Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-navy border-2 border-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-white/10 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
