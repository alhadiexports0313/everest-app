"use client";

import { ReactNode } from "react";

interface TrustBarItem {
  icon?: ReactNode;
  label: string;
}

interface TrustBarProps {
  items: TrustBarItem[];
}

export default function TrustBar({ items }: TrustBarProps) {
  return (
    <div className="w-full border-b border-stone-200 bg-white">
      <div className="container-custom flex flex-wrap items-center justify-center gap-4 py-3 text-xs sm:text-sm text-stone-700">
        {items.map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50"
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
