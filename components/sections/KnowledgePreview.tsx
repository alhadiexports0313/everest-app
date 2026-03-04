"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const cards = [
  {
    title: "Benefits",
    urdu: "فوائد",
    slug: "benefits",
    cta: "Explore Insights",
    ctaUrdu: "مزید جانیں",
    image: "/images/products/product_13.jpg",
    imageAlt: "Everest Organic Shilajit jar with mountain backdrop",
    description:
      "Discover how Shilajet supports daily energy, resilience, and overall wellness.",
    descriptionUrdu:
      "سلاجیت روزمرہ توانائی، برداشت اور مجموعی ویلنَس میں مددگار ہے۔",
  },
  {
    title: "Usage",
    urdu: "استعمال",
    slug: "usage",
    cta: "Read the Full Guide",
    ctaUrdu: "مکمل رہنمائی",
    image: "/images/products/product_12.jpg",
    imageAlt: "Premium Shilajet resin texture for usage guidance",
    description:
      "Learn ideal timing, dosage, and safe routines for consistent results.",
    descriptionUrdu:
      "صحیح وقت، مقدار اور محفوظ روزمرہ طریقۂ استعمال جانیں۔",
  },
  {
    title: "Environmental Respect",
    urdu: "ماحولیاتی احترام",
    slug: "environmental-respect",
    cta: "Discover More",
    ctaUrdu: "دریافت کریں",
    image: "/images/products/product_23.jpg",
    imageAlt: "Everest Organic Shilajit crafted with ethical mountain sourcing",
    description:
      "Understand ethical sourcing and responsible harvesting practices.",
    descriptionUrdu:
      "ذمہ دار ذرائع اور قدرتی ماحول کے تحفظ کی اصولی روش سمجھیں۔",
  },
];

const urduKnowledgeRoutes: Record<string, string> = {
  benefits: "understanding-shilajet",
  usage: "usage-guide",
  "environmental-respect": "nature-respect",
};

export default function KnowledgePreview() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-stone-50 px-4 py-1.5 text-xs font-semibold text-primary-700 ${
              isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.3em]"
            }`}
          >
            {isUrdu ? "علمی جھلک" : "Knowledge Preview"}
          </div>
          <h2 className={`font-display text-display-3 font-bold text-charcoal-900 mt-5 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "بلاگ اور علمی مرکز" : "Blog & Knowledge Hub"}
          </h2>
          <p className={`text-lg text-stone-700 leading-relaxed font-light mt-4 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "وضاحت، ویلنَس اور خلوص کے لیے مختصر مگر معتبر تحریریں۔"
              : "Short reads crafted for clarity, wellness, and authenticity."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
              className="group relative rounded-2xl border border-stone-200/60 bg-white/80 p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-premium"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-200/0 via-amber-300/40 to-amber-200/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-amber-200/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Link
                href={
                  isUrdu
                    ? `/knowledge/${urduKnowledgeRoutes[card.slug] ?? card.slug}?lang=ur`
                    : `/${card.slug}`
                }
                className={`relative block h-full ${isUrdu ? "text-right" : "text-left"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/60 bg-stone-100 shadow-soft">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover lux-image transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                </div>
                <div className={`inline-flex items-center rounded-full border border-primary-700/20 bg-primary-700/5 px-3 py-1 text-xs font-semibold text-primary-700 mt-5 ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? card.urdu : card.title}
                </div>
                <h3 className={`font-display text-2xl font-bold text-charcoal-900 mt-4 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? card.urdu : card.title}
                </h3>
                <p className={`text-stone-700 leading-relaxed font-light mt-4 ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? card.descriptionUrdu : card.description}
                </p>
                <div
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold text-white lux-gold-button shadow-premium transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${
                    isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.25em]"
                  }`}
                >
                  {isUrdu ? card.ctaUrdu : card.cta}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
