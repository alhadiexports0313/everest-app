"use client";

import { ReactNode, useEffect, useRef } from "react";

interface TickerStripProps {
  items: ReactNode[];
  speed?: number;
}

export default function TickerStrip({ items, speed = 40 }: TickerStripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    const animationDuration = (items.length || 1) * speed;
    container.style.setProperty(
      "--ticker-duration",
      `${animationDuration}s`
    );
  }, [items.length, speed]);

  const content = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-stone-200 bg-white">
      <div
        ref={containerRef}
        className="flex animate-[ticker_var(--ticker-duration)_linear_infinite]"
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-6 py-3 text-sm text-stone-700 whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
