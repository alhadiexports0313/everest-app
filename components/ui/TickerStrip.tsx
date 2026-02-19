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
    //<div className="w-full overflow-hidden border-y border-stone-200/60 bg-white/90 backdrop-blur-md">
      <div className= "bg-gradient-forest backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div
        ref={containerRef}
        className="flex w-max animate-[ticker_var(--ticker-duration)_linear_infinite]"
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-2.5 text-[16px] font-medium tracking-[0.18em] text-amber-300 whitespace-nowrap"
          >
            <span className="h-1 w-1 rounded-full bg-amber-500/70" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
