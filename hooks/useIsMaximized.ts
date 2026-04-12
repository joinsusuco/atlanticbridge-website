"use client";

import { useState, useEffect } from "react";

export function useIsMaximized(threshold = 0.95): boolean {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = () => {
      // Compare window width to available screen width
      const ratio = window.innerWidth / window.screen.availWidth;
      setIsMaximized(ratio >= threshold);
    };

    // Check on mount
    checkMaximized();

    // Check on resize
    window.addEventListener("resize", checkMaximized);

    return () => window.removeEventListener("resize", checkMaximized);
  }, [threshold]);

  return isMaximized;
}
