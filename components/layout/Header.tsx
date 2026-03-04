"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, Search, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale } = useLanguage();

  const navItems = [
    { label: t("header.nav.products"), href: "/products" },
    { label: t("header.nav.authenticity"), href: "/authenticity-quality" },
    { label: t("header.nav.knowledge"), href: "/knowledge-hub" },
    { label: t("header.nav.about"), href: "/about" },
    { label: t("header.nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-forest backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[76px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
              <Image
                src="/images/brand/logo.jpeg"
                alt="Everest Organic Shilajit logo"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="hidden sm:block leading-tight">
              <div
                className={`text-[18px] font-semibold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-white" : "text-charcoal-900"
                }`}
              >
                {t("header.brand.name")}
              </div>
              <div
                className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isScrolled ? "text-stone-300" : "text-stone-500"
                }`}
              >
                {t("header.brand.tagline")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[14px] font-medium tracking-wide transition-colors duration-300 group ${
                  isScrolled
                    ? "text-stone-500 hover:text-amber-300"
                    : "text-charcoal-700 hover:text-primary-700"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-400 group-hover:w-full ${
                    isScrolled ? "bg-amber-300" : "bg-primary-700"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Language */}
            <div
              className={`hidden sm:flex items-center gap-2 transition-colors duration-300 ${
                isScrolled ? "text-white/80" : "text-stone-600"
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <LanguageSwitcher tone={isScrolled ? "dark" : "light"} />
            </div>

            {/* Search */}
            {/* <button
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-white hover:text-amber-300 hover:bg-white/10"
                  : "text-charcoal-600 hover:text-primary-700 hover:bg-stone-100/70"
              }`}
              aria-label={t("header.searchLabel")}
            >
              <Search className="w-5 h-5" />
            </button> */}

            {/* Cart */}
            <button
              className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-white hover:text-amber-300 hover:bg-white/10"
                  : "text-charcoal-600 hover:text-primary-700 hover:bg-stone-100/70"
              }`}
              aria-label={t("header.cartLabel")}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-white" />
            </button>

            {/* CTA */}
            <Link
              href="/products"
              className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] ${
                isScrolled
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-primary-800 text-white hover:bg-primary-700"
              }`}
            >
              {t("header.orderNow")}
            </Link>

            {/* Mobile Button */}
            <button
              className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-charcoal-700 hover:bg-stone-100"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("header.menuLabel")}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden pb-6 pt-4 border-t ${
                isScrolled ? "border-white/10" : "border-stone-200"
              }`}
            >
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      isScrolled
                        ? "text-white hover:text-amber-300"
                        : "text-charcoal-700 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-3">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-stone-400">
                    {t("header.languageLabel")}
                  </span>
                  <LanguageSwitcher tone={isScrolled ? "dark" : "light"} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
