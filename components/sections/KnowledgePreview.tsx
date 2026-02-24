"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    title: "Benefits",
    urdu: "فوائد",
    slug: "benefits",
    cta: "Explore Insights",
    description:
      "Discover how Shilajet supports daily energy, resilience, and overall wellness.",
    descriptionUrdu:
      "شلجت روزمرہ توانائی، قوت اور مجموعی صحت میں معاون ثابت ہوتی ہے۔",
  },
  {
    title: "Usage",
    urdu: "استعمال",
    slug: "usage",
    cta: "Read the Full Guide",
    description:
      "Learn ideal timing, dosage, and safe routines for consistent results.",
    descriptionUrdu:
      "صحیح وقت، مقدار اور محفوظ استعمال کی رہنمائی حاصل کریں۔",
  },
  {
    title: "Environmental Respect",
    urdu: "ماحولیاتی احترام",
    slug: "environmental-respect",
    cta: "Discover More",
    description:
      "Understand ethical sourcing and responsible harvesting practices.",
    descriptionUrdu:
      "ذمہ دار ذرائع اور قدرتی ماحول کی حفاظت کے اصول جانیں۔",
  },
];

export default function KnowledgePreview() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-stone-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-700">
            Knowledge Preview
          </div>
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mt-5 tracking-tight">
            Blog & Knowledge Hub
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light mt-4">
            Short reads crafted for clarity, wellness, and authenticity.
          </p>
          <p className="font-urdu text-base text-stone-600 mt-3">
            صحت، معیار اور علم پر مبنی مختصر تحریریں
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
              <Link href={`/knowledge-hub/${card.slug}`} className="relative block h-full">
                <div className="inline-flex items-center rounded-full border border-primary-700/20 bg-primary-700/5 px-3 py-1 text-xs font-semibold text-primary-700">
                  {card.title}
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mt-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="font-urdu text-base text-stone-600 mt-1">
                  {card.urdu}
                </p>
                <p className="text-stone-700 leading-relaxed font-light mt-4">
                  {card.description}
                </p>
                <p className="font-urdu text-sm text-stone-600 mt-3">
                  {card.descriptionUrdu}
                </p>
                <div className="mt-6 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white lux-gold-button shadow-premium transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                  {card.cta}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
