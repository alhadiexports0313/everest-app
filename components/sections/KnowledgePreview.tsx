"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Benefits",
    urdu: "فوائد",
    description:
      "Discover how Shilajet supports daily energy, resilience, and overall wellness.",
    descriptionUrdu:
      "شلجت روزمرہ توانائی، قوت اور مجموعی صحت میں معاون ثابت ہوتی ہے۔",
  },
  {
    title: "Usage",
    urdu: "استعمال",
    description:
      "Learn ideal timing, dosage, and safe routines for consistent results.",
    descriptionUrdu:
      "صحیح وقت، مقدار اور محفوظ استعمال کی رہنمائی حاصل کریں۔",
  },
  {
    title: "Environmental Respect",
    urdu: "ماحولیاتی احترام",
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
              className="rounded-2xl glass-card border border-stone-200/50 shadow-soft p-7"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
