"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const dosageGuidelines = [
  { label: "Beginners", value: "250 mg (pea-sized)" },
  { label: "Experienced Users", value: "500 mg" },
  { label: "Frequency", value: "Once daily" },
];

const consumptionMethods = [
  { label: "Winter", value: "Dissolve in warm water" },
  { label: "Summer", value: "Mix with room-temperature water" },
  { label: "Option", value: "Can mix with milk" },
  { label: "Method", value: "Stir until fully dissolved" },
  { label: "Avoid", value: "Do not use boiling water" },
];

const bestTime = [
  { label: "Morning", value: "Empty stomach for sustained energy" },
  { label: "Pre-Workout", value: "30–45 minutes before training for endurance" },
  { label: "Evening", value: "Avoid late-night use if sensitive" },
];

const safetyNotes = [
  { label: "Pregnancy", value: "Not for pregnant women" },
  { label: "Medication", value: "Consult a physician if on medication" },
  { label: "Authenticity", value: "Avoid unverified market resins" },
  { label: "Storage", value: "Store in a cool, dry place" },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function UsagePage() {
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
            Usage Guide
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-6">
            Usage & Daily Routine – Everest Organic Shilajit
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mt-6">
            Professional guidance designed for refined daily use, with a focus on safety,
            consistency, and a credible nutraceutical experience.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Proper Dosage
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid gap-4 text-white/75">
              {dosageGuidelines.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base text-white/80">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_9.jpg"
              alt="Everest Organic Shilajit premium jar"
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
                How to Consume
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {consumptionMethods.map((method) => (
                <div
                  key={method.label}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                    {method.label}
                  </p>
                  <p className="text-sm text-white/75 mt-2">{method.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Best Time to Take
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {bestTime.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                    {item.label}
                  </p>
                  <p className="text-sm text-white/75 mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Safety Precautions
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {safetyNotes.map((note) => (
                <div
                  key={note.label}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70 font-semibold">
                    {note.label}
                  </p>
                  <p className="text-sm text-white/75 mt-2">{note.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
