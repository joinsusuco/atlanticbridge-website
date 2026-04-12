"use client";

import { useIsMaximized } from "@/hooks/useIsMaximized";
import DepartureBanner from "./DepartureBanner";

export default function DepartureSection() {
  const isMaximized = useIsMaximized();

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
        <DepartureBanner variant="full" />
      </div>
    </section>
  );
}
