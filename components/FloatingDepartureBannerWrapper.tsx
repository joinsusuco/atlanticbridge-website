"use client";

import { usePathname } from "next/navigation";
import FloatingDepartureBanner from "./FloatingDepartureBanner";

export default function FloatingDepartureBannerWrapper() {
  const pathname = usePathname();

  // Don't show on homepage (it has its own departure section)
  if (pathname === "/") return null;

  return <FloatingDepartureBanner />;
}
