"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const corePoints = [
  "Naturally formed in the Karakoram and Himalayan ranges",
  "Bio-mineral complex shaped over centuries",
  "Contains 85+ trace minerals in bioavailable form",
  "No synthetic additives or fillers",
  "Supports cellular balance and metabolic resilience",
];

const majorMinerals = [
  { name: "Iron", detail: "Oxygen transport and energy metabolism" },
  { name: "Magnesium", detail: "Muscle function and nervous-system balance" },
  { name: "Calcium", detail: "Bone strength and cellular signaling" },
  { name: "Zinc", detail: "Immune function and hormonal balance" },
  { name: "Selenium", detail: "Antioxidant protection and cellular defense" },
  { name: "Potassium", detail: "Electrolyte balance and hydration support" },
];

const traceElements = [
  "Chromium",
  "Cobalt",
  "Nickel",
  "Vanadium",
  "Lithium",
  "Molybdenum",
];

const benefits = [
  {
    title: "Energy & Stamina",
    description:
      "Supports mitochondrial efficiency and sustained energy without stimulants, helping the body maintain steady performance.",
  },
  {
    title: "Immunity Support",
    description:
      "Contributes to antioxidant defense and mineral-dependent immune signaling for daily resilience.",
  },
  {
    title: "Hormonal Balance",
    description:
      "Provides trace minerals involved in endocrine regulation and healthy stress response.",
  },
  {
    title: "Cognitive Clarity",
    description:
      "Promotes mental focus through mineral support and balanced cellular energy production.",
  },
  {
    title: "Anti-inflammatory Effects",
    description:
      "Helps maintain inflammatory balance via fulvic compounds and mineral cofactors.",
  },
  {
    title: "Longevity & Anti-aging",
    description:
      "Supports healthy aging by reinforcing cellular repair pathways and oxidative balance.",
  },
];

const certifications = [
  "ISO 22000 certified food safety management",
  "GMP-compliant manufacturing controls",
  "HACCP-based hazard analysis and monitoring",
  "Heavy metal testing for safety assurance",
  "Verified mineral composition and potency",
  "Transparent COA availability on request",
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function BenefitsPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="section-padding bg-stone-950 text-white"
    >
      <div className="container-custom">
        <motion.div {...reveal} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            Everest Organic Shilajit
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-6">
            Shilajit Benefits & Mineral Composition – The Scientific Guide by Everest Organic
            Shilajit
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mt-6">
            A refined, evidence-led overview of authentic Himalayan Shilajit, its mineral
            richness, and the physiological roles that drive credibility in modern
            nutraceutical standards.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                The Power Inside Real Shilajit
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <ul className="mt-6 grid gap-4 text-white/75 leading-relaxed">
              {corePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_13.jpg"
              alt="Everest Organic Shilajit jar with mountain backdrop"
              fill
              className="object-cover lux-image"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Mineral Composition
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                  Major Minerals
                </p>
                <ul className="mt-5 space-y-4 text-white/75">
                  {majorMinerals.map((mineral) => (
                    <li
                      key={mineral.name}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                    >
                      <span className="text-amber-200 font-semibold">{mineral.name}</span>
                      <span className="block text-sm text-white/70 mt-1">
                        {mineral.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                  Trace Elements
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {traceElements.map((element) => (
                    <div
                      key={element}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white/80"
                    >
                      {element}
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mt-6">
                  The matrix of trace minerals works as a cofactor network supporting
                  enzymatic activity and nutrient delivery throughout the body.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_12.jpg"
              alt="Everest Organic Shilajit resin texture close-up"
              fill
              className="object-cover lux-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Fulvic Acid Explained
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
              <p>
                Everest Organic Shilajit contains <span className="text-amber-200">40–50%</span>{" "}
                fulvic acid, a key bioactive component that helps deliver minerals at the
                cellular level.
              </p>
              <ul className="grid gap-3">
                <li className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  Mineral chelation for improved bioavailability
                </li>
                <li className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  Supports mitochondrial ATP production
                </li>
                <li className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  Anti-inflammatory and oxidative balance support
                </li>
                <li className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  Natural detox pathways and cellular repair
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Real Health Benefits
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5"
                >
                  <h3 className="font-display text-lg font-semibold text-amber-200">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Lab Testing & Authenticity
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {certifications.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-6">
              Each batch is documented with traceable quality records to align with
              international nutraceutical expectations.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
