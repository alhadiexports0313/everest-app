"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ethicalSourcing = [
  "Sourced from Gilgit-Baltistan mountain belts",
  "Responsible collection methods",
  "No ecosystem damage",
];

const sustainableHarvesting = [
  "Seasonal collection",
  "Controlled extraction",
  "Preservation of rock layers",
];

const ecoPackaging = [
  "Minimal plastic usage",
  "Recyclable glass jars",
  "Sustainable labeling materials",
];

const communitySupport = [
  "Supporting local mountain communities",
  "Fair trade sourcing",
  "Economic empowerment",
];

const minimalFootprint = [
  "Low-impact processing",
  "Clean purification methods",
  "Zero chemical additives",
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function EnvironmentalRespectClient() {
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
            Environmental Respect
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-6">
            Ethical Sourcing & Environmental Standards
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mt-6">
            A globally aware, responsibility-first approach to Himalayan sourcing that
            protects ecosystems, honors communities, and maintains premium nutraceutical
            standards.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Ethical Sourcing
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <ul className="mt-6 grid gap-4 text-white/75 leading-relaxed">
              {ethicalSourcing.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_11.jpg"
              alt="Everest Organic Shilajit sourced from Gilgit-Baltistan"
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
                Sustainable Harvesting
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-white/75">
              {sustainableHarvesting.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Eco-Friendly Packaging
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-white/75">
              {ecoPackaging.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Community Support
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-white/75">
              {communitySupport.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Minimal Environmental Footprint
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-white/75">
              {minimalFootprint.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
              Transparency & Trust
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-4">
              Stewardship is part of our quality standard
            </h2>
            <p className="text-white/70 leading-relaxed mt-4 max-w-2xl mx-auto">
              Every step is designed to meet international nutraceutical expectations while
              preserving the mountain ecosystems that define authentic Shilajit.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-white lux-gold-button shadow-premium transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              Request Sustainability Details
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
