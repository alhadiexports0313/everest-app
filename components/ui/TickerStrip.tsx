"use client";

import { ReactNode, useEffect, useRef } from "react";

interface TickerStripProps {
  items: ReactNode[];
  speed?: number; // lower = faster
}

interface VerticalTickerProps {
  items: ReactNode[];
  speed?: number; // lower = faster
  className?: string;
  variant?: "default" | "minimal";
  itemClassName?: string;
  textClassName?: string;
}

/* ===============================
   Horizontal Ticker (FAST FIXED)
================================ */

export default function TickerStrip({
  items,
  speed = 10, // ⚡ lower value = faster
}: TickerStripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // ✅ FIXED duration (no multiplication)
    container.style.setProperty("--ticker-duration", `${speed}s`);
  }, [speed]);

  const content = [...items, ...items];

  return (
    <div className="overflow-hidden bg-gradient-forest backdrop-blur-xl border-b border-white/10">
      <div
        ref={containerRef}
        className="flex w-max animate-[ticker_var(--ticker-duration)_linear_infinite]"
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 text-amber-300 whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===============================
   Vertical Ticker (REAL FAST)
================================ */

export function VerticalTicker({
  items,
  speed = 12, // ⚡ try 8 for very fast, 15 medium, 20 slow
  className,
  variant = "default",
  itemClassName,
  textClassName,
}: VerticalTickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // ✅ FIXED short duration
    container.style.setProperty("--ticker-duration", `${speed}s`);
  }, [speed]);

  const content = [...items, ...items];
  const isMinimal = variant === "minimal";

  return (
    <div className={`group relative overflow-hidden ${className ?? ""}`}>
      <div
        ref={containerRef}
        className="flex flex-col animate-[ticker-vertical_var(--ticker-duration)_linear_infinite] will-change-transform group-hover:[animation-play-state:paused]"
      >
        {content.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-3 transition-all ${
              isMinimal ? "justify-center" : "gap-3"
            } ${itemClassName ?? ""}`}
          >
            <div className={`${textClassName ?? ""}`}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}