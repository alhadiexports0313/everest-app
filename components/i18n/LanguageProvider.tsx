"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, messages, translate } from "@/lib/i18n";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  getMessage: <T = unknown>(key: string) => T;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const dir = locale === "ur" ? "rtl" : "ltr";
  document.documentElement.lang = locale;
  document.documentElement.dir = dir;
}

export default function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", next);
      document.cookie = `locale=${next}; path=/; max-age=31536000`;
    }
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("lang");
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(nextUrl);
    router.refresh();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlLocale = searchParams?.get("lang");
    const storedLocale = window.localStorage.getItem("locale");
    const nextLocale =
      urlLocale === "en" || urlLocale === "ur"
        ? urlLocale
        : storedLocale === "en" || storedLocale === "ur"
          ? storedLocale
          : null;
    if (nextLocale && nextLocale !== locale) {
      setLocale(nextLocale);
    }
  }, [searchParams, locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const dir = locale === "ur" ? "rtl" : "ltr";
    return {
      locale,
      dir,
      t: (key) => translate(locale, key),
      getMessage: (key) => {
        const parts = key.split(".");
        let value: any = messages[locale];
        for (const part of parts) {
          value = value?.[part];
        }
        return value;
      },
      setLocale,
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
