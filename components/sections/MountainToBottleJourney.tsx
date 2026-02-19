"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Extraction",
    urdu: "استخراج",
    image: "/images/product/4) Local Harvester Story (NO logo).jpg",
    description: "Harvested pure Shilajit resin from pristine Himalayan rocks.",
  },
  {
    title: "Cleaning",
    urdu: "صفائی",
    image: "/images/product/",
    description: "Careful removal of impurities and natural debris.",
  },
  {
    title: "Purification",
    urdu: "تطہیر",
    image: "/images/product/purification.jpg",
    description: "Natural purification process to retain minerals and potency.",
  },
  {
    title: "Drying",
    urdu: "خشک کرنا",
    image: "/images/product/drying.jpg",
    description: "Sun-dried under controlled conditions for maximum quality.",
  },
  {
    title: "Packaging",
    urdu: "پیکنگ",
    image: "/images/product/packaging.jpg",
    description: "Premium eco-friendly packaging for safe delivery to customers.",
  },
];

export default function MountainToBottleJourney() {
  return (
    <section className="section-padding bg-white/70">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-4 tracking-tight">
            Mountain → To → Bottle Journey
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            From pristine Himalayan extraction to premium packaging, each step is
            carefully controlled.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-stone-200/70" />
          <div className="space-y-8">
            {steps.map((step, index) => {
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                  className="relative pl-12 sm:pl-16"
                >
                  <div className="absolute left-[6px] sm:left-[10px] top-6 h-3 w-3 rounded-full bg-amber-500 shadow-soft ring-4 ring-white" />
                  <div className="rounded-2xl border border-stone-200/50 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-amber-200/70 hover:shadow-[0_18px_48px_rgba(212,165,116,0.18)]">
                    <div className="grid gap-5 sm:grid-cols-[160px_1fr] sm:items-center">
                      <div className="relative h-32 w-full overflow-hidden rounded-xl border border-stone-200/40 bg-stone-100">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-charcoal-900 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="font-urdu text-base text-stone-700 mt-1">
                          {step.urdu}
                        </p>
                        <p className="text-sm text-stone-600 leading-relaxed mt-3">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
