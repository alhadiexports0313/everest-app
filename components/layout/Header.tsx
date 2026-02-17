"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Products", href: "/products" },
    { label: "Authenticity & Quality", href: "/authenticity-quality" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-stone-200/50">
      <nav className="container-custom section-padding py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            aria-label="Everest Organic Shilajet Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg opacity-10 group-hover:opacity-15 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white px-3 py-2 rounded-lg font-display font-bold text-xl shadow-soft">
                E
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-xl font-bold text-charcoal-900 tracking-tight">
                Everest Organic
              </div>
              <div className="text-xs text-stone-600 font-medium">
                Himalayan Shilajet
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-charcoal-700 hover:text-primary-700 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-700 to-accent-500 group-hover:w-full transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <Globe2 className="w-4 h-4 text-stone-500" />
              <LanguageSwitcher
                languages={[
                  { code: "en", label: "EN" },
                  { code: "ur", label: "اردو" },
                ]}
                current="en"
              />
            </div>
            <button
              className="p-2.5 text-charcoal-600 hover:text-primary-700 transition-colors duration-300 rounded-lg hover:bg-stone-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="relative p-2.5 text-charcoal-600 hover:text-primary-700 transition-colors duration-300 rounded-lg hover:bg-stone-100"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 text-charcoal-600 hover:text-primary-700 transition-colors duration-300 rounded-lg hover:bg-stone-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-6 border-t border-stone-200 pt-6"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-charcoal-700 hover:text-primary-700 transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
