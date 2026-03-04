"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  tone?: "light" | "dark";
};

export default function LanguageSwitcher({ tone = "light" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const isUrdu = locale === "ur";
  const isDark = tone === "dark";

  return (
    <div
      dir="ltr"
      className={`relative inline-flex items-center rounded-full border p-1 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-[0_0_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors duration-300 ${
        isDark ? "border-white/20 bg-white/10 text-white" : "border-stone-200/80 bg-white text-stone-700"
      }`}
      role="group"
      aria-label={t("header.languageLabel")}
    >
      <span
        className={`absolute inset-y-1 w-1/2 rounded-full bg-gradient-to-r from-[#C6A052] to-[#E2C07B] shadow-[0_10px_30px_rgba(198,160,82,0.35)] transition-transform duration-300 ${
          isUrdu ? "translate-x-full" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`relative z-10 flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
          isUrdu
            ? isDark
              ? "text-white/70 hover:text-white"
              : "text-stone-500 hover:text-stone-900"
            : "text-black"
        }`}
        aria-pressed={!isUrdu}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ur")}
        className={`relative z-10 flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
          isUrdu
            ? "text-black"
            : isDark
              ? "text-white/70 hover:text-white"
              : "text-stone-500 hover:text-stone-900"
        }`}
        aria-pressed={isUrdu}
      >
        اردو
      </button>
    </div>
  );
}
