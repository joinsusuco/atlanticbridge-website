"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function CursorFollower() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverButton, setIsOverButton] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Clear any pending hide timeout - cursor is back
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Show cursor and update position
    setIsVisible(true);
    setCursorPos({ x: e.clientX, y: e.clientY });

    // Check if over a button or link
    const target = e.target as HTMLElement;
    const isButton = target.closest("a, button");
    setIsOverButton(!!isButton);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Small delay before hiding to handle edge cases
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }, []);

  const handleVisibilityChange = useCallback(() => {
    // When tab becomes visible again, wait for mouse movement
    if (document.visibilityState === "visible") {
      // Keep invisible until mouse moves
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also detect when mouse re-enters the document
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleVisibilityChange]);

  return (
    <div
      className={`pointer-events-none fixed z-[9999] rounded-full border-2 border-gold/60 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        width: isOverButton ? 60 : 32,
        height: isOverButton ? 60 : 32,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease-out, height 0.2s ease-out, opacity 0.3s",
      }}
    >
      <div
        className={`absolute inset-1 rounded-full bg-gold/20 ${
          isOverButton ? "" : "animate-ping"
        }`}
      />
    </div>
  );
}
