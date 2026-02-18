"use client";

import { motion } from "framer-motion";
import { Mountain, Droplet, Filter, Wind, Package } from "lucide-react";

const steps = [
  {
    title: "Extraction",
    urdu: "استخراج",
    icon: Mountain,
  },
  {
    title: "Cleaning",
    urdu: "صفائی",
    icon: Droplet,
  },
  {
    title: "Purification",
    urdu: "تطہیر",
    icon: Filter,
  },
  {
    title: "Drying",
    urdu: "خشک کرنا",
    icon: Wind,
  },
  {
    title: "Packaging",
    urdu: "پیکنگ",
    icon: Package,
  },
];

export default function MountainToBottleJourney() {
  return (
    <section className="section-padding bg-stone-50">
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
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-stone-200/80" />
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
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
                  <div className="rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-amber-200/70 hover:shadow-[0_18px_48px_rgba(212,165,116,0.18)]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 shadow-soft">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-charcoal-900 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="font-urdu text-base text-stone-700">
                          {step.urdu}
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
