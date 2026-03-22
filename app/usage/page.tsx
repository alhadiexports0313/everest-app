"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const identifyReal = [
  "Dissolves completely in water.",
  "Has an earthy smell and slightly bitter taste.",
  "Comes in a sealed glass jar with a batch code.",
  "Is lab-tested by Eurofins and Midwest Labs.",
];

const dosageGuidelines = [
  "Take a pea-sized amount (about 250–500 mg) once a day.",
  "Beginners can start with half the dose for the first few days.",
  "Active users or athletes can take up to twice daily, but only with lab-tested Shilajit.",
];

const seasonalInstructions = [
  { label: "In Winter", value: "Use hot water for better dissolving and absorption." },
  { label: "In Summer", value: "Use normal room-temperature water for best consistency." },
];

const naturalBehavior = [
  "Shilajit is a natural resin, so it may take a little time to fully dissolve.",
  "250 mg dose: Light golden-yellow.",
  "500 mg dose: Deep dark brown.",
  "These variations are natural and confirm authenticity — not inconsistency.",
];

const preparationSteps = [
  "Use the Everest Organic Shilajit stainless spoon provided with the jar.",
  "Take one pea-sized portion.",
  "Mix it in water, milk, or green tea depending on your preference.",
  "Stir until it dissolves completely, then drink it on an empty stomach in the morning.",
];

const whatToAvoid = [
  "Don’t mix with alcohol or artificial supplements.",
  "Don’t use boiling water.",
  "Don’t expose the jar to sunlight or moisture.",
  "Avoid taking it immediately after coffee.",
];

const storageTips = [
  "Keep the jar tightly closed after every use.",
  "Store in a cool, dry place below 25°C.",
  "Do not refrigerate.",
  "Always use the provided spoon to prevent contamination.",
];

const durationUse = [
  "Use daily for at least 4–6 weeks for visible results.",
  "After 3 months, take a 1-week break before continuing.",
  "Shilajit works gradually by restoring mineral balance and energy production in the body.",
];

const whatToExpect = [
  "Higher daily energy",
  "Better stamina and recovery",
  "Improved focus and mental clarity",
  "Balanced mood and reduced fatigue",
];

const trustReasons = [
  "Manufactured by Himalayan Innate Pvt Ltd",
  "Tested by Eurofins (July 2025) and Midwest Labs USA",
  "Certified under ISO 22000, ISO 9001, GMP, and HACCP",
  "Sourced from Himalayan Mountains Pakistan",
  "Processed in a controlled R&D facility in Abbottabad",
  "Every jar carries a traceable batch code and verified Certificate of Analysis to confirm purity and safety.",
];

const faqs = [
  {
    question: "Can women use Shilajit?",
    answer: "Yes, it helps with energy, metabolism, and focus for both men and women.",
  },
  {
    question: "What is the best time to take Shilajit?",
    answer: "Morning on an empty stomach, or before exercise for best results.",
  },
  {
    question: "How do I know if Shilajit is pure?",
    answer: "It dissolves fully, has a natural earthy aroma, and comes with a lab report.",
  },
  {
    question: "Can I take it every day?",
    answer: "Yes, daily use is safe and beneficial when using lab-tested Shilajit.",
  },
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
            Everest Organic Shilajit Pakistan
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-6">
            How to Use Real Shilajit – Complete Guide by Everest Organic Shilajit Pakistan
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mt-6">
            Why Usage Matters
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Even the purest Shilajit needs to be used correctly to deliver results. This guide
            explains how to take Shilajit, how much to use, and how to prepare it so your body
            absorbs all its minerals and fulvic acid naturally.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Identify Real Shilajit Before Use
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Before using, confirm that your product is pure resin, not capsule or powder.
            </p>
            <ul className="mt-6 grid gap-4 text-white/75 leading-relaxed">
              {identifyReal.map((item) => (
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
              src="/images/products/product_9.jpg"
              alt="Everest Organic Shilajit premium jar"
              fill
              className="object-cover lux-image"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Correct Dosage
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {dosageGuidelines.map((item) => (
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
                How to Prepare and Take Shilajit
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {preparationSteps.map((item) => (
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
                Seasonal Instructions
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {seasonalInstructions.map((item) => (
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
                Natural Behavior of Real Shilajit
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {naturalBehavior.map((item) => (
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
                What to Avoid
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {whatToAvoid.map((item) => (
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
                Storage Tips
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {storageTips.map((item) => (
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
                Duration of Use
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {durationUse.map((item) => (
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
                What to Expect
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {whatToExpect.map((item) => (
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
                Why Everest Organic Shilajit Pakistan Is Trusted
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {trustReasons.map((item) => (
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
                Frequently Asked Questions
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 text-white/75">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  <p className="text-sm font-semibold text-amber-200">{item.question}</p>
                  <p className="text-sm text-white/70 mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                For International Customers
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Everest Organic Shilajit Pakistan ships worldwide through
              www.everestorganicshilajiit.com. All international orders include verified lab
              certificates, global shipping, and secure payments.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
