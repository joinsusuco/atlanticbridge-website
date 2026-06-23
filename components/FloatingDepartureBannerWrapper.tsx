"use client";

import { usePathname } from "next/navigation";
import FloatingDepartureBanner from "./FloatingDepartureBanner";

export default function FloatingDepartureBannerWrapper() {
  const pathname = usePathname();

  // Don't show on homepage or quote flow where it can obstruct form actions on mobile
  if (pathname === "/" || pathname === "/quote" || pathname.startsWith("/admin")) return null;

  return <FloatingDepartureBanner />;
}
