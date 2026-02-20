"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Gem, Mountain } from "lucide-react";

const benefits = [
  {
    title: "Energy & Stamina",
    urdu: "توانائی اور استقامت",
    icon: Sparkles,
  },
  {
    title: "Strength Support",
    urdu: "قوت میں مدد",
    icon: Shield,
  },
  {
    title: "Mineral Rich",
    urdu: "معدنیات سے بھرپور",
    icon: Gem,
  },
  {
    title: "Traditional Heritage",
    urdu: "روایتی ورثہ",
    icon: Mountain,
  },
];

export default function BenefitsGrid() {
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
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-4 tracking-tight">
            Wellness Benefits
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Highlighting the core wellness advantages of authentic Himalayan
            Shilajit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                className="group rounded-2xl border border-stone-200/60 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-amber-200/70 hover:shadow-[0_14px_36px_rgba(212,165,116,0.16)]"
              >
                <div className="p-7">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 shadow-soft transition-transform duration-700 group-hover:scale-[1.02]">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="font-urdu text-base text-stone-700">{benefit.urdu}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-stone-500">
            Consult a professional before use.
          </p>
          <p className="font-urdu text-sm text-stone-500 mt-2">
            استعمال سے پہلے ماہر سے مشورہ کریں۔
          </p>
        </div>
      </div>
    </section>
  );
}
