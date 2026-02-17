"use client";

import { usePathname, useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  languages: { code: string; label: string }[];
  current: string;
}

export default function LanguageSwitcher({
  languages,
  current,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (code: string) => {
    if (code === current) return;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    params.set("lang", code);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-flex rounded-full border border-stone-200 bg-white p-1 text-xs sm:text-sm">
      {languages.map((lang) => {
        const active = lang.code === current;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            className={[
              "px-3 py-1 rounded-full transition-colors",
              active
                ? "bg-primary-700 text-white"
                : "text-stone-700 hover:bg-stone-100",
            ].join(" ")}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
