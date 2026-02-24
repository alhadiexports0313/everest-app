"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const corePoints = [
  "Shilajit is one of nature’s most complex mineral-rich substances.",
  "It forms naturally over centuries in the Karakoram and Himalayan mountain rocks, where plant and microbial matter decompose under high pressure.",
  "True Shilajit resin, such as that from Golden Shilajit Pakistan, contains more than 85 trace minerals and essential organic compounds that help your body maintain balance, recovery, and energy production.",
  "Unlike synthetic supplements, Shilajit is a natural bio-mineral complex — it doesn’t add foreign chemicals, it restores what your body already needs.",
];

const majorMinerals = [
  { name: "Iron (Fe)", detail: "Supports blood formation and oxygen flow." },
  { name: "Magnesium (Mg)", detail: "Improves muscle recovery and nerve function." },
  { name: "Calcium (Ca)", detail: "Strengthens bones and supports enzyme activity." },
  { name: "Zinc (Zn)", detail: "Promotes immune health and testosterone balance." },
  { name: "Copper (Cu)", detail: "Helps collagen formation and antioxidant defense." },
  { name: "Manganese (Mn)", detail: "Supports metabolism and bone health." },
  { name: "Selenium (Se)", detail: "Protects cells from oxidative stress." },
  { name: "Potassium (K)", detail: "Maintains electrolyte balance and heart health." },
];

const traceElements = [
  "Chromium",
  "Cobalt",
  "Nickel",
  "Vanadium",
  "Molybdenum",
  "Lithium",
];

const fulvicBenefits = [
  "Boost nutrient absorption.",
  "Support mitochondrial energy (ATP) production.",
  "Reduce inflammation and oxidative stress.",
  "Detoxify heavy metals from the body naturally.",
];

const healthBenefits = [
  {
    title: "Boosts Natural Energy and Recovery",
    description:
      "Shilajit improves cellular energy (ATP) by supporting mitochondrial function. This leads to steady endurance and faster post-workout recovery.",
  },
  {
    title: "Supports Hormonal Balance in Men",
    description:
      "Zinc, selenium, and fulvic acid together help maintain healthy testosterone levels, stamina, and performance without synthetic boosters.",
  },
  {
    title: "Improves Mental Focus and Clarity",
    description:
      "The iron and magnesium content supports oxygen flow and neural signaling, helping with focus and reduced fatigue.",
  },
  {
    title: "Enhances Immunity and Metabolism",
    description:
      "Shilajit’s mineral complex strengthens the immune system, helps nutrient absorption, and supports digestive health.",
  },
  {
    title: "Reduces Inflammation and Toxin Load",
    description:
      "Fulvic and humic acids bind harmful metals, aiding detoxification and cellular repair.",
  },
  {
    title: "Promotes Longevity and Anti-Aging",
    description:
      "Its antioxidant compounds protect against oxidative stress, slowing cell damage and promoting natural vitality.",
  },
];

const compositionBreakdown = [
  "Fulvic Acid: 40–50% (bioactive compound)",
  "Humic Substances: 15–20%",
  "Trace Minerals: 85+ types",
  "Amino Acids & Plant Residues: <10%",
  "Dibenzo-α-pyrones: Natural antioxidants that support energy balance",
];

const labTesting = [
  "Every batch tested by Eurofins (July 2025) and Midwest Labs USA",
  "Certified under ISO 22000, GMP, and HACCP",
  "Zero harmful metals or microbial contamination",
  "Verified fulvic acid and mineral composition",
];

const usageGuidance = [
  "Take a pea-sized amount (250–500 mg) daily.",
  "In winter, use hot water for faster dissolving.",
  "In summer, use normal room-temperature water.",
  "Color varies naturally — light golden (250 mg) and dark brown (500 mg).",
  "Stir until fully dissolved before drinking.",
  "Consistency matters more than quantity.",
];

const groupBenefits = [
  "For Men: Boosts stamina, recovery, and testosterone regulation.",
  "For Women: Enhances focus, metabolism, and hormonal stability.",
  "For Athletes: Improves endurance, muscle recovery, and oxygen efficiency.",
  "For Older Adults: Supports energy, memory, and overall vitality.",
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
            Golden Shilajit Pakistan
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-6">
            Shilajit Benefits and Minerals: The Complete Scientific Guide
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mt-6">
            The Power Inside Real Shilajit
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
              alt="A jar of Golden Shilajit with a mountain in the background"
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
                What Minerals Are Found in Pure Shilajit
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Each gram of real Shilajit resin holds a unique combination of organic and ionic
              minerals in bioavailable form — easily absorbed at a cellular level.
            </p>
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
                  These natural minerals are not added — they are inherent to the mountain layers
                  where Shilajit forms, giving it unmatched nutritional depth.
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
              alt="Brown and blue stone fragment in Shilajit mineral stone"
              fill
              className="object-cover lux-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Fulvic Acid – The Key Bioactive Compound
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
              <p>
                The most important active component of Shilajit is Fulvic Acid, a natural
                chelator and antioxidant. It binds minerals into absorbable forms and carries
                them deep into cells.
              </p>
              <ul className="grid gap-3">
                {fulvicBenefits.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/70">
                Every jar of Golden Shilajit Pakistan is tested for fulvic acid concentration
                through Eurofins-certified methods, ensuring consistency and authenticity.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-12">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_2.jpg"
              alt="Fulvic acid from Golden Shilajit on top of a white table"
              fill
              className="object-cover lux-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Real Health Benefits of Pure Shilajit Resin
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Unlike marketing claims, real benefits are slow, natural, and measurable over time.
              Here’s what verified users and scientific reviews support:
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {healthBenefits.map((benefit) => (
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

        <motion.div {...reveal} className="mt-12">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_3.jpg"
              alt="Woman riding on man's back on green field"
              fill
              className="object-cover lux-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Shilajit Composition in Simple Terms
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {compositionBreakdown.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-6">
              These ratios vary slightly with altitude and origin — Pakistan’s Karakoram Shilajit
              is known for its balanced fulvic content and low contamination levels compared to
              raw or unrefined sources.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Why Lab-Tested Shilajit Matters
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Not all Shilajit is safe. Some unverified resins from markets contain heavy metals
              like lead or arsenic. That’s why Golden Shilajit Pakistan ensures:
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {labTesting.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-6">
              This commitment to testing and transparency separates real Shilajit from unsafe
              imitations sold under fake “Himalayan” claims.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                How to Use Shilajit for Best Absorption
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {usageGuidance.map((item) => (
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

        <motion.div {...reveal} className="mt-12">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="/images/products/product_1.jpg"
              alt="Topless man in black pants holding black and yellow exercise equipment"
              fill
              className="object-cover lux-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <motion.div {...reveal} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Shilajit Benefits for Different Groups
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
              {groupBenefits.map((item) => (
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
                Global Recognition of Pakistani Shilajit
              </h2>
              <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <p className="text-white/70 leading-relaxed mt-6">
              Pakistan’s Karakoram and Himalayan mountain belts produce some of the richest and
              safest Shilajit in the world. International labs recognize Golden Shilajit
              Pakistan’s product as one of the few verified Shilajit resins meeting global
              nutraceutical standards.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              We export to the USA, EU, UK, Canada, UAE, and Saudi Arabia through
              www.goldenshilajiit.com with full COA verification.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
